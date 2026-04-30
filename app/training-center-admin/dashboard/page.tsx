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
  Calendar,
  FileCheck,
  AlertCircle,
  Eye,
  Download,
} from "lucide-react"
import type { Booking, TrainingCenter } from "@/lib/products"

export default function TrainingCenterAdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [trainingCenter, setTrainingCenter] = useState<TrainingCenter | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [stats, setStats] = useState({
    totalEnrolled: 0,
    completedCourses: 0,
    pendingRequirements: 0,
    averageRating: 0,
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

      // Get user profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.session.user.id)
        .single()

      if (profileData?.user_type !== "training_center_admin") {
        router.push("/dashboard")
        return
      }

      setUser(data.session.user)

      // Get training center data
      if (profileData?.training_center_id) {
        const { data: centerData } = await supabase
          .from("training_centers")
          .select("*")
          .eq("id", profileData.training_center_id)
          .single()

        setTrainingCenter(centerData)

        // Fetch bookings for this center
        const { data: bookingsData } = await supabase
          .from("bookings")
          .select("*")
          .eq("training_center_id", profileData.training_center_id)
          .order("created_at", { ascending: false })

        if (bookingsData) {
          setBookings(bookingsData)

          const completed = bookingsData.filter((b) => b.status === "completed").length
          const pending = bookingsData.filter((b) => b.status === "pending").length
          const revenue = bookingsData.reduce((sum, b) => sum + b.price_cents, 0)

          setStats({
            totalEnrolled: bookingsData.length,
            completedCourses: completed,
            pendingRequirements: pending,
            averageRating: centerData?.rating || 0,
            totalRevenue: revenue,
          })
        }
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
        return "✓"
      case "confirmed":
        return "→"
      case "pending":
        return "⏳"
      case "cancelled":
        return "✕"
      default:
        return "?"
    }
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
              <div>
                <h1 className="text-4xl font-bold mb-2">{trainingCenter?.name || "Training Center"}</h1>
                <p className="text-muted-foreground text-lg">Manage your training program and student enrollments</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export Reports</span>
                </Button>
                <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Eye className="w-4 h-4 mr-2" />
                  View as Student
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 mb-8">
            <Card className="border border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Enrolled</p>
                    <p className="text-3xl md:text-4xl font-bold">{stats.totalEnrolled}</p>
                    <p className="text-xs text-muted-foreground mt-2">Active students</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-950">
                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Completed</p>
                    <p className="text-3xl md:text-4xl font-bold text-green-600">{stats.completedCourses}</p>
                    <p className="text-xs text-muted-foreground mt-2">Graduated students</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-100 dark:bg-green-950">
                    <FileCheck className="w-6 h-6 text-green-600 dark:text-green-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Pending Docs</p>
                    <p className="text-3xl md:text-4xl font-bold text-amber-600">{stats.pendingRequirements}</p>
                    <p className="text-xs text-muted-foreground mt-2">Awaiting uploads</p>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-100 dark:bg-amber-950">
                    <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Avg Rating</p>
                    <p className="text-3xl md:text-4xl font-bold">{stats.averageRating.toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground mt-2">Out of 5.0</p>
                  </div>
                  <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-950">
                    <BarChart3 className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Revenue</p>
                    <p className="text-3xl md:text-4xl font-bold text-primary">
                      ${(stats.totalRevenue / 100).toFixed(0)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">This month</p>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Enrollments */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="border border-border/50">
                <CardHeader className="border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Recent Enrollments</CardTitle>
                    <Badge variant="outline">{bookings.length} Total</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {bookings.length > 0 ? (
                    <div className="space-y-3">
                      {bookings.slice(0, 8).map((booking) => (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                                {getStatusIcon(booking.status)}
                              </div>
                              <div>
                                <p className="font-medium text-sm">Student ID: {booking.user_id.slice(0, 8)}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(booking.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="font-semibold text-sm">${(booking.price_cents / 100).toFixed(2)}</p>
                            </div>
                            <Badge className={`${getStatusColor(booking.status)} text-xs`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                      <p className="text-muted-foreground">No enrollments yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card className="border border-border/50 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-transparent text-foreground hover:bg-primary/10 border border-border">
                    <FileCheck className="w-4 h-4 mr-2" />
                    Verify Documents
                  </Button>
                  <Button className="w-full justify-start bg-transparent text-foreground hover:bg-primary/10 border border-border">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Students
                  </Button>
                  <Button className="w-full justify-start bg-transparent text-foreground hover:bg-primary/10 border border-border">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button className="w-full justify-start bg-transparent text-foreground hover:bg-primary/10 border border-border">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Class
                  </Button>
                </CardContent>
              </Card>

              {/* Center Info */}
              <Card className="border border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Center Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Location</p>
                    <p className="font-medium">{trainingCenter?.location || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Capacity</p>
                    <p className="font-medium">{trainingCenter?.capacity || 0} students</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Course Duration</p>
                    <p className="font-medium">{trainingCenter?.duration_days || 0} days</p>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Edit Center Details
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
