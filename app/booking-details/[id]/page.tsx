"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import type { Booking, TrainingCenter, Requirement } from "@/lib/products"

export default function BookingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [booking, setBooking] = useState<Booking | null>(null)
  const [center, setCenter] = useState<TrainingCenter | null>(null)
  const [requirements, setRequirements] = useState<Requirement[]>([])
  const [bookingReqs, setBookingReqs] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)

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
          .eq("id", resolvedParams.id)
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

        const { data: reqsData } = await supabase
          .from("requirements")
          .select("*")
          .eq("training_center_id", bookingData.training_center_id)

        setRequirements(reqsData || [])

        const { data: bookingReqsData } = await supabase
          .from("booking_requirements")
          .select("*")
          .eq("booking_id", resolvedParams.id)

        setBookingReqs(bookingReqsData || [])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [resolvedParams, user, supabase])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">{center.name}</h1>
              <p className="text-muted-foreground">Booking ID: {booking.id.slice(0, 8)}...</p>
            </div>
            <Badge className={getStatusColor(booking.status)}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Booking Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Booking Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{center.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-medium">{center.duration_days} days</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Booking Date</p>
                        <p className="font-medium">{new Date(booking.created_at).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Course Fee</p>
                        <p className="font-medium">${price}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Requirements Checklist */}
              <Card>
                <CardHeader>
                  <CardTitle>Required Documentation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {requirements.length > 0 ? (
                    requirements.map((req) => {
                      const bookingReq = bookingReqs.find((br) => br.requirement_id === req.id)
                      return (
                        <div key={req.id} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                          <Checkbox checked={bookingReq?.is_completed || false} disabled className="mt-1" />
                          <div className="flex-1">
                            <p className="font-medium">{req.requirement_name}</p>
                            <p className="text-sm text-muted-foreground">
                              Type: {req.requirement_type}
                              {!req.is_mandatory && " (Optional)"}
                            </p>
                          </div>
                          {bookingReq?.is_completed && <span className="text-green-600 font-bold">✓</span>}
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-muted-foreground">No requirements found</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 pb-4 border-b border-border">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Course</span>
                      <span className="font-medium">{center.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <span className="font-medium capitalize">{booking.status}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pb-4 border-b border-border">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Course Fee</span>
                      <span className="font-medium">${price}</span>
                    </div>
                  </div>

                  <Link href="/dashboard">
                    <Button variant="outline" className="w-full bg-transparent">
                      Back to Dashboard
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
