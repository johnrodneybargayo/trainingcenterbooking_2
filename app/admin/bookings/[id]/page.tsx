"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Booking, TrainingCenter, Requirement } from "@/lib/products"
import { mockBookings } from "@/lib/mock-data"

export default function AdminBookingDetailsPage({
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
  const [isUpdating, setIsUpdating] = useState(false)
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

      // Check if user is admin
      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", data.session.user.id).single()

      if (profileData?.user_type !== "admin" && profileData?.user_type !== "training_center_admin") {
        router.push("/dashboard")
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
        let bookingData = null
        let centerData = null

        // Try Supabase first
        const { data: sbBooking } = await supabase.from("bookings").select("*").eq("id", resolvedParams.id).single()

        if (sbBooking) {
          bookingData = sbBooking
          const { data: sbCenter } = await supabase
            .from("training_centers")
            .select("*")
            .eq("id", sbBooking.training_center_id)
            .single()
          centerData = sbCenter
        } else {
          // Fallback to mock data
          const mockBooking = mockBookings.find((b) => b.id === resolvedParams.id)
          if (mockBooking) {
            bookingData = mockBooking
            centerData = mockBooking.training_center
          }
        }

        if (!bookingData) {
          router.push("/admin/dashboard")
          return
        }

        setBooking(bookingData)
        setCenter(centerData)

        // Fetch requirements
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
        // Try mock data as last resort
        const mockBooking = mockBookings.find((b) => b.id === resolvedParams.id)
        if (mockBooking) {
          setBooking(mockBooking)
          setCenter(mockBooking.training_center || null)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [resolvedParams, user, supabase])

  const handleStatusChange = async (newStatus: string) => {
    if (!booking) return
    setIsUpdating(true)
    try {
      const { error } = await supabase
        .from("bookings")
        .update({
          status: newStatus,
          cancelled_at: newStatus === "cancelled" ? new Date().toISOString() : null,
        })
        .eq("id", booking.id)

      if (error) throw error
      setBooking({ ...booking, status: newStatus })
      alert(`Booking status updated to ${newStatus}`)
    } catch (error) {
      console.error("Error updating booking:", error)
      alert("Failed to update booking status")
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
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
  const mandatoryCompleted = bookingReqs.filter((br) => {
    const req = requirements.find((r) => r.id === br.requirement_id)
    return req?.is_mandatory && br.is_completed
  }).length
  const mandatoryTotal = requirements.filter((r) => r.is_mandatory).length

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Booking Details</h1>
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
                        <p className="text-sm text-muted-foreground">Training Center</p>
                        <p className="font-medium">{center.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{center.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-medium">{center.duration_days} days</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Capacity</p>
                        <p className="font-medium">{center.capacity} students</p>
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
                  <CardTitle>Documentation Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {requirements.length > 0 ? (
                    requirements.map((req) => {
                      const bookingReq = bookingReqs.find((br) => br.requirement_id === req.id)
                      return (
                        <div
                          key={req.id}
                          className="flex items-start gap-3 p-3 border border-border rounded-lg bg-muted/30"
                        >
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                              bookingReq?.is_completed ? "border-green-600 bg-green-600" : "border-gray-300"
                            }`}
                          >
                            {bookingReq?.is_completed && <span className="text-white text-sm">✓</span>}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{req.requirement_name}</p>
                            <p className="text-sm text-muted-foreground">
                              Type: {req.requirement_type}
                              {!req.is_mandatory && " (Optional)"}
                            </p>
                          </div>
                          {bookingReq?.is_completed && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Completed
                            </Badge>
                          )}
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-muted-foreground">No requirements found</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Actions Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Change Status</p>
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant={booking.status === "pending" ? "default" : "outline"}
                        onClick={() => handleStatusChange("pending")}
                        disabled={isUpdating}
                      >
                        Pending
                      </Button>
                      <Button
                        size="sm"
                        variant={booking.status === "confirmed" ? "default" : "outline"}
                        onClick={() => handleStatusChange("confirmed")}
                        disabled={isUpdating}
                      >
                        Confirmed
                      </Button>
                      <Button
                        size="sm"
                        variant={booking.status === "completed" ? "default" : "outline"}
                        onClick={() => handleStatusChange("completed")}
                        disabled={isUpdating}
                      >
                        Completed
                      </Button>
                      <Button
                        size="sm"
                        variant={booking.status === "cancelled" ? "default" : "destructive"}
                        onClick={() => handleStatusChange("cancelled")}
                        disabled={isUpdating}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-3">
                      Documents Submitted: {mandatoryCompleted}/{mandatoryTotal} mandatory
                    </p>
                    <Link href="/admin/dashboard">
                      <Button variant="outline" className="w-full bg-transparent">
                        Back to Dashboard
                      </Button>
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
