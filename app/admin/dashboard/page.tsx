"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart3, TrendingUp, Activity, AlertCircle, Users, Building2, Settings, Save, Shield } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { mockBookings, mockTrainingCenters, mockStudents } from "@/lib/mock-data"
import BookingDetailsModal from "@/components/booking-details-modal"

export default function AdminDashboard() {
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const bookings = mockBookings
  
  // Platform Settings State
  const [platformSettings, setPlatformSettings] = useState({
    platformFeePercentage: 10,
    allowNewRegistrations: true,
    maintenanceMode: false,
    requireAdminApprovalForCenters: true,
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveSettings = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  const stats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter((b) => b.status === "pending").length,
    completedBookings: bookings.filter((b) => b.status === "completed").length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.price_cents, 0),
    totalCenters: mockTrainingCenters.length,
    totalUsers: mockStudents.length,
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
      title: "Active Centers",
      value: stats.totalCenters,
      icon: Building2,
      color: "text-blue-600",
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
      <main className="min-h-screen bg-linear-to-br from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">Platform Admin</h1>
              </div>
              <p className="text-muted-foreground text-sm md:text-base">
                Manage training centers, users, and platform settings
              </p>
            </div>
            <Badge
              variant="outline"
              className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
            >
              Demo Mode
            </Badge>
          </div>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="centers">Training Centers</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

              {/* Recent Bookings */}
              <Card className="border border-border/50">
                <CardHeader className="border-b border-border/50">
                  <CardTitle className="text-xl md:text-2xl">Recent Bookings</CardTitle>
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
                          {bookings.slice(0, 10).map((booking) => (
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
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-xs bg-transparent"
                                  onClick={() => {
                                    setSelectedBookingId(booking.id)
                                    setShowModal(true)
                                  }}
                                >
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
            </TabsContent>

            <TabsContent value="centers">
              <Card>
                <CardHeader>
                  <CardTitle>Training Centers</CardTitle>
                  <CardDescription>Manage registered training centers and their status.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold">Name</th>
                          <th className="text-left py-3 px-4 font-semibold">Location</th>
                          <th className="text-left py-3 px-4 font-semibold">Capacity</th>
                          <th className="text-left py-3 px-4 font-semibold">Rating</th>
                          <th className="text-left py-3 px-4 font-semibold">Status</th>
                          <th className="text-left py-3 px-4 font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockTrainingCenters.map((center) => (
                          <tr key={center.id} className="border-b border-border hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium">{center.name}</td>
                            <td className="py-3 px-4 text-muted-foreground">{center.location}</td>
                            <td className="py-3 px-4">{center.capacity}</td>
                            <td className="py-3 px-4">{center.rating} ★</td>
                            <td className="py-3 px-4">
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300">
                                Active
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <Button variant="ghost" size="sm">Edit</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Registered Users</CardTitle>
                  <CardDescription>View and manage student accounts.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-semibold">Name</th>
                          <th className="text-left py-3 px-4 font-semibold">Email</th>
                          <th className="text-left py-3 px-4 font-semibold">Company</th>
                          <th className="text-left py-3 px-4 font-semibold">Phone</th>
                          <th className="text-left py-3 px-4 font-semibold">Joined</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockStudents.map((student) => (
                          <tr key={student.id} className="border-b border-border hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium">{student.first_name} {student.last_name}</td>
                            <td className="py-3 px-4 text-muted-foreground">{student.email}</td>
                            <td className="py-3 px-4">{student.company || "-"}</td>
                            <td className="py-3 px-4">{student.phone || "-"}</td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {new Date(student.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>Configure global platform parameters.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="platform-fee">Platform Fee (%)</Label>
                      <Input 
                        id="platform-fee" 
                        type="number"
                        value={platformSettings.platformFeePercentage} 
                        onChange={(e) => setPlatformSettings({...platformSettings, platformFeePercentage: parseInt(e.target.value) || 0})}
                      />
                      <p className="text-xs text-muted-foreground">Percentage taken from each booking.</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label className="text-base">Allow New Registrations</Label>
                      <p className="text-sm text-muted-foreground">
                        If disabled, new users cannot sign up.
                      </p>
                    </div>
                    <Switch 
                      checked={platformSettings.allowNewRegistrations}
                      onCheckedChange={(checked) => setPlatformSettings({...platformSettings, allowNewRegistrations: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label className="text-base">Require Admin Approval for Centers</Label>
                      <p className="text-sm text-muted-foreground">
                        New training centers must be approved before going live.
                      </p>
                    </div>
                    <Switch 
                      checked={platformSettings.requireAdminApprovalForCenters}
                      onCheckedChange={(checked) => setPlatformSettings({...platformSettings, requireAdminApprovalForCenters: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900 p-4">
                    <div className="space-y-0.5">
                      <Label className="text-base text-amber-900 dark:text-amber-100">Maintenance Mode</Label>
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        Disable all public access to the site.
                      </p>
                    </div>
                    <Switch 
                      checked={platformSettings.maintenanceMode}
                      onCheckedChange={(checked) => setPlatformSettings({...platformSettings, maintenanceMode: checked})}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings} disabled={isSaving}>
                    {isSaving ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <BookingDetailsModal 
          bookingId={selectedBookingId}
          open={showModal}
          onOpenChange={setShowModal}
          isAdminView={true}
        />
      </main>
    </>
  )
}
