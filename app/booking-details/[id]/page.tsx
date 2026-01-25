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
import { CheckCircle2, AlertCircle, Clock, MapPin, Award } from "lucide-react"
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
    const resolveParams = async () => {
      const resolvedParams = await params
      setResolvedParams(resolvedParams)
    }
    resolveParams()
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
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-slate-50 text-slate-700 border-slate-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5" />
      case "pending":
        return <Clock className="w-5 h-5" />
      case "cancelled":
        return <AlertCircle className="w-5 h-5" />
      default:
        return null
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
  const completedReqs = bookingReqs.filter((req) => req.is_completed).length
  const totalReqs = requirements.length

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-1">{center.name}</h1>
                <p className="text-sm text-muted-foreground">Booking ID: {booking.id.slice(0, 8)}...</p>
              </div>
              <Badge
                className={`${getStatusColor(booking.status)} border flex w-fit gap-2 px-4 py-2 text-sm font-medium`}
              >
                {getStatusIcon(booking.status)}
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Course Overview Card */}
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Course Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="text-xs font-medium">Location</span>
                      </div>
                      <p className="font-semibold text-lg">{center.location}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-medium">Duration</span>
                      </div>
                      <p className="font-semibold text-lg">{center.duration_days} days</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Award className="w-4 h-4" />
                        <span className="text-xs font-medium">Rating</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="font-semibold text-lg">{center.rating}</p>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="text-xs font-medium">Booked On</span>
                      </div>
                      <p className="font-semibold text-sm">{new Date(booking.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Requirements Progress */}
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Documentation Progress</CardTitle>
                    <span className="text-sm font-semibold text-primary">
                      {completedReqs} of {totalReqs} completed
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-linear-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${totalReqs > 0 ? (completedReqs / totalReqs) * 100 : 0}%` }}
                    />
                  </div>

                  {requirements.length > 0 ? (
                    <div className="space-y-3">
                      {requirements.map((req) => {
                        const bookingReq = bookingReqs.find((br) => br.requirement_id === req.id)
                        const isCompleted = bookingReq?.is_completed || false
                        return (
                          <div
                            key={req.id}
                            className="flex items-start gap-4 p-4 bg-white rounded-lg border border-slate-200 hover:border-primary/30 transition-colors"
                          >
                            <div className="shrink-0 pt-0.5">
                              <Checkbox checked={isCompleted} disabled className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <p
                                    className={`font-medium ${isCompleted ? "line-through text-muted-foreground" : ""}`}
                                  >
                                    {req.requirement_name}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {req.requirement_type}
                                    {!req.is_mandatory && " • Optional"}
                                  </p>
                                </div>
                                {isCompleted && (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No requirements found</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="border-0 shadow-sm sticky top-24 h-fit">
                <CardHeader className="pb-4 border-b border-slate-100">
                  <CardTitle className="text-lg">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {/* Training Center Info */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Training Center
                      </p>
                      <p className="text-sm font-semibold text-foreground mt-1">{center.name}</p>
                    </div>
                  </div>

                  {/* Key Details */}
                  <div className="space-y-3 py-4 border-y border-slate-100">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Duration</span>
                      <span className="font-semibold">{center.duration_days} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Location</span>
                      <span className="font-semibold text-right">{center.location}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge variant="outline" className="text-xs capitalize">
                        {booking.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Course Fee</span>
                      <span className="font-semibold">${price}</span>
                    </div>
                    <div className="pt-3 border-t border-slate-100">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="text-xl font-bold text-primary">${price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-4">
                    <Link href="/dashboard" className="block w-full">
                      <Button className="w-full bg-primary hover:bg-primary/90">Back to Dashboard</Button>
                    </Link>
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
