"use client"

import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Activity, AlertCircle } from "lucide-react"
import type { Booking, TrainingCenter } from "@/lib/products"

const DEMO_BOOKINGS: (Booking & { training_center?: TrainingCenter })[] = [
  {
    id: "booking-001",
    user_id: "user-001",
    training_center_id: "tc-001",
    booking_date: new Date().toISOString(),
    status: "confirmed",
    payment_id: "pay-001",
    price_cents: 299900,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    training_center: {
      id: "tc-001",
      name: "Maritime Academy Singapore",
      location: "Singapore",
      description: "Leading maritime training institution",
      image_url: "/maritime-training-center.jpg",
      price_cents: 299900,
      duration_days: 30,
      rating: 4.8,
      reviews_count: 45,
      capacity: 50,
    },
  },
  {
    id: "booking-002",
    user_id: "user-002",
    training_center_id: "tc-002",
    booking_date: new Date().toISOString(),
    status: "pending",
    payment_id: null,
    price_cents: 189900,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    training_center: {
      id: "tc-002",
      name: "Pacific Nautical Training",
      location: "Philippines",
      description: "Comprehensive nautical officer programs",
      image_url: "/nautical-training.jpg",
      price_cents: 189900,
      duration_days: 21,
      rating: 4.6,
      reviews_count: 32,
      capacity: 40,
    },
  },
  {
    id: "booking-003",
    user_id: "user-003",
    training_center_id: "tc-001",
    booking_date: new Date().toISOString(),
    status: "completed",
    payment_id: "pay-003",
    price_cents: 299900,
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    training_center: {
      id: "tc-001",
      name: "Maritime Academy Singapore",
      location: "Singapore",
      description: "Leading maritime training institution",
      image_url: "/maritime-training-center.jpg",
      price_cents: 299900,
      duration_days: 30,
      rating: 4.8,
      reviews_count: 45,
      capacity: 50,
    },
  },
  {
    id: "booking-004",
    user_id: "user-004",
    training_center_id: "tc-003",
    booking_date: new Date().toISOString(),
    status: "confirmed",
    payment_id: "pay-004",
    price_cents: 149900,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    training_center: {
      id: "tc-003",
      name: "Mumbai Marine Institute",
      location: "India",
      description: "Expert vessel operations training",
      image_url: "/marine-institute-training.jpg",
      price_cents: 149900,
      duration_days: 14,
      rating: 4.5,
      reviews_count: 28,
      capacity: 35,
    },
  },
]

export default function AdminDashboard() {
  const bookings = DEMO_BOOKINGS

  const stats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter((b) => b.status === "pending").length,
    completedBookings: bookings.filter((b) => b.status === "completed").length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.price_cents, 0),
  }

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

  const statCards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: Activity,
      color: "text-primary",
    },
    {
      title: "Pending",
      value: stats.pendingBookings,
      icon: AlertCircle,
      color: "text-amber-600",
    },
    {
      title: "Completed",
      value: stats.completedBookings,
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Total Revenue",
      value: `$${(stats.totalRevenue / 100).toFixed(2)}`,
      icon: BarChart3,
      color: "text-emerald-600",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">System Admin Dashboard</h1>
              </div>
              <p className="text-muted-foreground text-sm md:text-base">
                Monitor all platform activity and manage training centers
              </p>
            </div>
            <Badge
              variant="outline"
              className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
            >
              Demo Mode
            </Badge>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.title} className="border border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">{stat.title}</p>
                        <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Bookings List */}
          <Card className="border border-border/50">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-xl md:text-2xl">All Bookings</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {bookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold">Training Center</th>
                        <th className="text-left py-3 px-4 font-semibold">Location</th>
                        <th className="text-left py-3 px-4 font-semibold">Price</th>
                        <th className="text-left py-3 px-4 font-semibold">Booking Date</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4 font-medium">{booking.training_center?.name || "Unknown"}</td>
                          <td className="py-3 px-4 text-muted-foreground text-sm">
                            {booking.training_center?.location}
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
                            <Button size="sm" variant="outline" className="text-xs bg-transparent">
                              View
                            </Button>
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
