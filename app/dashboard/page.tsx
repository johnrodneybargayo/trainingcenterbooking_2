"use client"

import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BookOpen, CheckCircle2, Clock, DollarSign, MapPin, AlertCircle } from "lucide-react"
import type { Booking, TrainingCenter } from "@/lib/products"

const DEMO_USER_BOOKINGS: (Booking & { training_center?: TrainingCenter })[] = [
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
      description: "Leading maritime training institution with state-of-the-art facilities",
      image_url: "/maritime-training-center.jpg",
      price_cents: 299900,
      duration_days: 30,
      rating: 4.8,
      reviews_count: 45,
      capacity: 50,
    },
  },
  {
    id: "booking-006",
    user_id: "user-001",
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
      description: "Comprehensive nautical officer programs for seafarers",
      image_url: "/nautical-training.jpg",
      price_cents: 189900,
      duration_days: 21,
      rating: 4.6,
      reviews_count: 32,
      capacity: 40,
    },
  },
]

export default function DashboardPage() {
  const bookings = DEMO_USER_BOOKINGS

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

  const stats = [
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: BookOpen,
      color: "text-primary",
    },
    {
      label: "Completed",
      value: bookings.filter((b) => b.status === "completed").length,
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      label: "Pending",
      value: bookings.filter((b) => b.status === "pending").length,
      icon: Clock,
      color: "text-amber-600",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">My Bookings</h1>
            </div>
            <p className="text-muted-foreground text-lg">Manage your training center enrollments</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className="border border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                        <Icon className="w-6 h-6" />
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
              <CardTitle className="text-xl md:text-2xl">Your Training Enrollments</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="group p-4 md:p-6 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        {/* Left Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="flex-shrink-0 mt-1">{getStatusIcon(booking.status)}</div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-lg md:text-xl text-card-foreground truncate">
                                {booking.training_center?.name || "Unknown Center"}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {booking.training_center?.description?.substring(0, 80)}...
                              </p>
                            </div>
                          </div>

                          {/* Details Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                              <span className="text-muted-foreground">
                                {booking.training_center?.location || "Unknown"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                              <span className="text-muted-foreground">
                                {new Date(booking.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <DollarSign className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                              <span className="font-semibold">${(booking.price_cents / 100).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Actions */}
                        <div className="flex flex-col gap-2 items-start md:items-end">
                          <Badge className={`${getStatusColor(booking.status)} text-xs md:text-sm px-3 py-1`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                          <Button variant="outline" size="sm" className="text-xs md:text-sm bg-transparent">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 md:py-16">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-lg mb-6">You haven't booked any training centers yet</p>
                  <Link href="/">
                    <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      Browse Training Centers
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
