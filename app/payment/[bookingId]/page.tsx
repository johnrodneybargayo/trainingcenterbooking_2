"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Checkout from "@/components/checkout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Booking, TrainingCenter } from "@/lib/products"

export default function PaymentPage({
  params,
}: {
  params: Promise<{ bookingId: string }>
}) {
  const [booking, setBooking] = useState<Booking | null>(null)
  const [center, setCenter] = useState<TrainingCenter | null>(null)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()
  const [resolvedParams, setResolvedParams] = useState<{ bookingId: string } | null>(null)

  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session?.user) {
        router.push("/auth/login")
        return
      }
      setUser(data.session.user)
    }
    checkAuth()
  }, [supabase, router])

  useEffect(() => {
    if (!resolvedParams || !user) return

    const fetchData = async () => {
      try {
        const { data: bookingData } = await supabase
          .from("bookings")
          .select("*")
          .eq("id", resolvedParams.bookingId)
          .eq("user_id", user.id)
          .single()

        if (!bookingData) {
          router.push("/dashboard")
          return
        }

        setBooking(bookingData)

        const { data: centerData } = await supabase
          .from("training_centers")
          .select("*")
          .eq("id", bookingData.training_center_id)
          .single()

        setCenter(centerData)
      } catch (error) {
        console.error("Error fetching data:", error)
        router.push("/dashboard")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [resolvedParams, user, supabase, router])

  if (isLoading || !user) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </>
    )
  }

  if (!booking || !center) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Booking not found</p>
        </div>
      </>
    )
  }

  const price = (booking.price_cents / 100).toFixed(2)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Complete Your Payment</h1>
            <p className="text-muted-foreground">Secure payment for your training center enrollment</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <Checkout
                    trainingCenterId={center.id}
                    trainingCenterName={center.name}
                    priceInCents={booking.price_cents}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 pb-4 border-b border-border">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Course</span>
                      <span className="font-medium text-right max-w-xs">{center.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium">{center.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{center.duration_days} days</span>
                    </div>
                  </div>

                  <div className="space-y-2 pb-4 border-b border-border">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Course Fee</span>
                      <span className="font-medium">${price}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-3xl font-bold text-blue-600">${price}</span>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mt-4">
                    <p className="text-sm text-blue-800">
                      Your booking ID: <span className="font-mono font-semibold">{booking.id.slice(0, 8)}...</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
