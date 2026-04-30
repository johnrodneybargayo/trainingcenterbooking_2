"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  BarChart3,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  Settings,
  Download,
  Eye,
} from "lucide-react"
import type { Booking, TrainingCenter } from "@/lib/products"

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [bookings, setBookings] = useState<(Booking & { training_center?: TrainingCenter })[]>([])
  const [trainingCenters, setTrainingCenters] = useState<TrainingCenter[]>([])
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalRevenue: 0,
    activeTrainingCenters: 0,
    totalStudents: 0,
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

      if (profileData?.user_type !== "admin") {
        router.push("/dashboard")
        return
      }

      setUser(data.session.user)

      // Fetch all bookings
      const { data: bookingsData } = await supabase.from("bookings").select("*").order("created_at", { ascending: false })

      // Fetch all training centers
      const { data: centersData } = await supabase.from("training_centers").select("*")

      if (bookingsData && centersData) {
        // Fetch training center details for each booking
        const bookingsWithCenters = await Promise.all(
          bookingsData.map(async (booking) => {
            const centerData = centersData.find((c) => c.id === booking.training_center_id)
            return {
              ...booking,
              training_center: centerData,
            }
          }),
        )
        setBookings(bookingsWithCenters)
        setTrainingCenters(centersData)

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
          activeTrainingCenters: centersData.length,
          totalStudents: total,
        })
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [supabase, router])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300"
      case "confirmed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
      case "pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case "confirmed":
        return <CheckCircle2 className="w-5 h-5 text-blue-600" />
      case "pending":
        return <Clock className="w-5 h-5 text-amber-600" />
      case "cancelled":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />
    }
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Loading admin dashboard...</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">System Dashboard</h1>
                <p className="text-muted-foreground text-lg">Monitor platform activity and manage all training centers</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export Data</span>
                </Button>
                <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-8">
            <Card className="border border-border/50 lg:col-span-1">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Bookings</p>
                    <p className="text-3xl font-bold">{stats.totalBookings}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-950">
                    <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50 lg:col-span-1">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Pending</p>
                    <p className="text-3xl font-bold text-amber-600">{stats.pendingBookings}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-100 dark:bg-amber-950">
                    <Clock className="w-6 h-6 text-amber-600 dark:text-amber-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50 lg:col-span-1">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Completed</p>
                    <p className="text-3xl font-bold text-green-600">{stats.completedBookings}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-100 dark:bg-green-950">
                    <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50 lg:col-span-1">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold text-primary">${(stats.totalRevenue / 100).toFixed(0)}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50 lg:col-span-1">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Training Centers</p>
                    <p className="text-3xl font-bold">{stats.activeTrainingCenters}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-950">
                    <Users className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50 lg:col-span-1">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Students</p>
                    <p className="text-3xl font-bold">{stats.totalStudents}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-pink-100 dark:bg-pink-950">
                    <TrendingUp className="w-6 h-6 text-pink-600 dark:text-pink-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Bookings */}
          <Card className="border border-border/50 mb-8">
            <CardHeader className="border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Recent Bookings</CardTitle>
                <Badge variant="outline">{bookings.length} Total</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {bookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <div className="space-y-3 md:space-y-0">
                    {bookings.slice(0, 10).map((booking) => (
                      <div
                        key={booking.id}
                        className="hidden md:grid grid-cols-7 gap-4 items-center p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors text-sm first:border-t-2"
                      >
                        <div>
                          <p className="font-medium">{booking.training_center?.name || "Unknown"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground truncate">{booking.user_id.slice(0, 12)}</p>
                        </div>
                        <div>
                          <p className="font-semibold">${(booking.price_cents / 100).toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">
                            {new Date(booking.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(booking.status)}
                          <Badge className={`${getStatusColor(booking.status)} text-xs`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="col-span-2 text-right">
                          <Link href={`/admin/bookings/${booking.id}`}>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile View */}
                  <div className="md:hidden space-y-3">
                    {bookings.slice(0, 10).map((booking) => (
                      <div key={booking.id} className="p-4 border border-border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="font-medium">{booking.training_center?.name || "Unknown"}</p>
                            <p className="text-xs text-muted-foreground">{booking.user_id.slice(0, 12)}</p>
                          </div>
                          <Badge className={`${getStatusColor(booking.status)} text-xs`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{new Date(booking.created_at).toLocaleDateString()}</span>
                          <span className="font-semibold">${(booking.price_cents / 100).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">No bookings found</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Training Centers Overview */}
          <Card className="border border-border/50">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-xl">Training Centers</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {trainingCenters.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trainingCenters.map((center) => (
                    <div key={center.id} className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                      <h3 className="font-semibold mb-2">{center.name}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Location:</span>
                          <span className="font-medium">{center.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Rating:</span>
                          <span className="font-medium">{center.rating.toFixed(1)}/5.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Capacity:</span>
                          <span className="font-medium">{center.capacity} students</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Price:</span>
                          <span className="font-medium">${(center.price_cents / 100).toFixed(0)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No training centers configured</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
