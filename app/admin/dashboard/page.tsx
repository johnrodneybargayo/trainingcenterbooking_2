"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Booking, TrainingCenter } from "@/lib/products"

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [bookings, setBookings] = useState<(Booking & { training_center?: TrainingCenter })[]>([])
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalRevenue: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

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

      // Fetch bookings
      let query = supabase.from("bookings").select("*").order("created_at", { ascending: false })

      // If training center admin, filter by their center
      if (profileData?.user_type === "training_center_admin" && profileData?.training_center_id) {
        query = query.eq("training_center_id", profileData.training_center_id)
      }

      const { data: bookingsData } = await query

      if (bookingsData) {
        // Fetch training center details
        const bookingsWithCenters = await Promise.all(
          bookingsData.map(async (booking: Booking) => {
            const { data: centerData } = await supabase
              .from("training_centers")
              .select("*")
              .eq("id", booking.training_center_id)
              .single()
            return {
              ...booking,
              training_center: centerData,
            }
          }),
        )
        setBookings(bookingsWithCenters)

        // Calculate stats
        const total = bookingsWithCenters.length
        const pending = bookingsWithCenters.filter((b) => b.status === "pending").length
        const completed = bookingsWithCenters.filter((b) => b.status === "completed").length
        const revenue = bookingsWithCenters.reduce((sum, b) => sum + b.price_cents, 0)

        setStats({
          totalBookings: total,
          pendingBookings: pending,
          completedBookings: completed,
          totalRevenue: revenue,
        })
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [supabase, router])

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

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage training center bookings and monitor statistics</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.totalBookings}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-yellow-600">{stats.pendingBookings}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">{stats.completedBookings}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">${(stats.totalRevenue / 100).toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Bookings List */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              {bookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold">Training Center</th>
                        <th className="text-left py-3 px-4 font-semibold">Student Email</th>
                        <th className="text-left py-3 px-4 font-semibold">Price</th>
                        <th className="text-left py-3 px-4 font-semibold">Booking Date</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-4">{booking.training_center?.name || "Unknown"}</td>
                          <td className="py-3 px-4 text-muted-foreground text-xs truncate max-w-xs">
                            {booking.user_id}
                          </td>
                          <td className="py-3 px-4 font-medium">${(booking.price_cents / 100).toFixed(2)}</td>
                          <td className="py-3 px-4 text-muted-foreground text-sm">
                            {new Date(booking.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Link href={`/admin/bookings/${booking.id}`}>
                              <Button size="sm" variant="outline">
                                View
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No bookings found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
