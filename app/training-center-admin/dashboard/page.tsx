"use client"

import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, CheckCircle2, Clock, DollarSign, TrendingUp, AlertCircle, Users } from "lucide-react"
import type { Booking, TrainingCenter } from "@/lib/products"

const DEMO_CENTER: TrainingCenter = {
  id: "tc-001",
  name: "Maritime Academy Singapore",
  location: "Singapore",
  description: "Leading maritime training institution with state-of-the-art facilities",
  image_url: "/maritime-training-center.jpg",
  price_cents: 299900,
  duration_days: 30,
  rating: 4.8,
  reviews_count: 45,
  capacity: 50,
}

const DEMO_CENTER_BOOKINGS: Booking[] = [
  {
    id: "booking-001",
    user_id: "user-001",
    training_center_id: "tc-001",
    booking_date: new Date().toISOString(),
    status: "confirmed",
    payment_id: "pay-001",
    price_cents: 299900,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "booking-005",
    user_id: "user-005",
    training_center_id: "tc-001",
    booking_date: new Date().toISOString(),
    status: "pending",
    payment_id: null,
    price_cents: 299900,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
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
  },
]

export default function TrainingCenterAdminDashboard() {
  const trainingCenter = DEMO_CENTER
  const bookings = DEMO_CENTER_BOOKINGS

  const stats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter((b) => b.status === "pending").length,
    confirmedBookings: bookings.filter((b) => b.status === "confirmed").length,
    completedBookings: bookings.filter((b) => b.status === "completed").length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.price_cents, 0),
    capacity: trainingCenter.capacity,
    enrolled: bookings.filter((b) => b.status === "confirmed" || b.status === "completed").length,
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
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Pending Approvals",
      value: stats.pendingBookings,
      icon: Clock,
      color: "text-amber-600",
    },
    {
      title: "Confirmed Enrollments",
      value: stats.confirmedBookings,
      icon: CheckCircle2,
      color: "text-blue-600",
    },
    {
      title: "Completed",
      value: stats.completedBookings,
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      title: "Total Revenue",
      value: `$${(stats.totalRevenue / 100).toFixed(2)}`,
      icon: DollarSign,
      color: "text-emerald-600",
    },
    {
      title: "Capacity",
      value: `${stats.enrolled}/${stats.capacity}`,
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{trainingCenter.name}</h1>
                <p className="text-muted-foreground text-sm mt-1">{trainingCenter.location}</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {statCards.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.title} className="border border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
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

          {/* Bookings Management */}
          <Card className="border border-border/50">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-xl md:text-2xl">Booking Management</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="all">All ({stats.totalBookings})</TabsTrigger>
                  <TabsTrigger value="pending">Pending ({stats.pendingBookings})</TabsTrigger>
                  <TabsTrigger value="confirmed">Confirmed ({stats.confirmedBookings})</TabsTrigger>
                  <TabsTrigger value="completed">Completed ({stats.completedBookings})</TabsTrigger>
                </TabsList>

                {["all", "pending", "confirmed", "completed"].map((tab) => {
                  const filteredBookings = tab === "all" ? bookings : bookings.filter((b) => b.status === tab)

                  return (
                    <TabsContent key={tab} value={tab}>
                      {filteredBookings.length > 0 ? (
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-border">
                                <th className="text-left py-3 px-4 font-semibold">Booking ID</th>
                                <th className="text-left py-3 px-4 font-semibold">Student</th>
                                <th className="text-left py-3 px-4 font-semibold">Price</th>
                                <th className="text-left py-3 px-4 font-semibold">Booking Date</th>
                                <th className="text-left py-3 px-4 font-semibold">Status</th>
                                <th className="text-left py-3 px-4 font-semibold">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredBookings.map((booking) => (
                                <tr
                                  key={booking.id}
                                  className="border-b border-border hover:bg-muted/50 transition-colors"
                                >
                                  <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                                    {booking.id.substring(0, 8)}...
                                  </td>
                                  <td className="py-3 px-4 text-muted-foreground text-xs truncate max-w-xs">
                                    {booking.user_id.substring(0, 20)}...
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
                                    <Button size="sm" variant="outline" className="bg-transparent">
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
                          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                          <p className="text-muted-foreground">
                            No {tab === "all" ? "bookings" : `${tab} bookings`} found
                          </p>
                        </div>
                      )}
                    </TabsContent>
                  )
                })}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
