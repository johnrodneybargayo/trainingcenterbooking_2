"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import RequirementsUpload from "@/components/requirements-upload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2, Circle, AlertCircle, Clock, DollarSign } from "lucide-react"
import type { TrainingCenter, Requirement } from "@/lib/products"

export default function BookingPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const [center, setCenter] = useState<TrainingCenter | null>(null)
  const [requirements, setRequirements] = useState<Requirement[]>([])
  const [user, setUser] = useState<any>(null)
  const [completedReqs, setCompletedReqs] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingCreated, setBookingCreated] = useState(false)
  const [bookingId, setBookingId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

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
    if (!id || !user) return

    const fetchData = async () => {
      try {
        const { data: centerData } = await supabase.from("training_centers").select("*").eq("id", id).single()

        setCenter(centerData)

        const { data: reqData } = await supabase.from("requirements").select("*").eq("training_center_id", id)

        setRequirements(reqData || [])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id, user, supabase])

  const toggleRequirement = (id: string) => {
    const newSet = new Set(completedReqs)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setCompletedReqs(newSet)
  }

  const mandatoryReqs = requirements.filter((r) => r.is_mandatory)
  const optionalReqs = requirements.filter((r) => !r.is_mandatory)
  const allMandatoryComplete = mandatoryReqs.every((r) => completedReqs.has(r.id))
  const price = (center?.price_cents / 100).toFixed(2)
  const convenienceFee = Math.round((center?.price_cents || 0) * 0.02)
  const totalPrice = (center?.price_cents || 0) + convenienceFee

  const handleCreateBooking = async () => {
    if (!allMandatoryComplete || !center || !user) return

    setIsSubmitting(true)
    try {
      // Create booking with pending status
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .insert({
          user_id: user.id,
          training_center_id: id,
          booking_date: new Date().toISOString(),
          status: "pending",
          price_cents: center.price_cents,
        })
        .select()
        .single()

      if (bookingError) throw bookingError

      // Create booking requirements
      if (bookingData) {
        for (const req of requirements) {
          await supabase.from("booking_requirements").insert({
            booking_id: bookingData.id,
            requirement_id: req.id,
            is_completed: false,
            document_url: null,
          })
        }
        setBookingId(bookingData.id)
        setBookingCreated(true)
      }
    } catch (error) {
      console.error("Error creating booking:", error)
      alert("Failed to create booking. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading || !user) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </main>
      </>
    )
  }

  if (!center) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <Card className="w-96">
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Training center not found</p>
              <Button onClick={() => router.push("/")} className="w-full mt-4">
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-balance mb-2">{center.name}</h1>
            <p className="text-muted-foreground text-lg">
              {bookingCreated
                ? "Upload your documents to confirm enrollment"
                : "Complete your enrollment with required documentation"}
            </p>
          </div>

          {bookingCreated && bookingId ? (
            <div className="space-y-6">
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Booking created successfully! Now upload your required documents.
                </AlertDescription>
              </Alert>
              <RequirementsUpload
                bookingId={bookingId}
                requirements={requirements}
                onComplete={() => router.push("/dashboard")}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Course Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Course Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Duration</p>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="font-semibold">{center.duration_days} days</span>
                        </div>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Location</p>
                        <span className="font-semibold text-sm">{center.location}</span>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Rating</p>
                        <span className="font-semibold">★ {center.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{center.description}</p>
                  </CardContent>
                </Card>

                {/* Mandatory Requirements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                      Mandatory Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mandatoryReqs.length > 0 ? (
                      mandatoryReqs.map((req) => (
                        <div
                          key={req.id}
                          className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer group"
                          onClick={() => toggleRequirement(req.id)}
                        >
                          <Checkbox
                            checked={completedReqs.has(req.id)}
                            onCheckedChange={() => toggleRequirement(req.id)}
                            className="h-5 w-5 mt-0.5"
                          />
                          <div className="flex-1">
                            <label className="font-medium text-sm cursor-pointer block">{req.requirement_name}</label>
                            <p className="text-xs text-muted-foreground mt-1">{req.requirement_type}</p>
                          </div>
                          {completedReqs.has(req.id) && (
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground py-4 text-center">No mandatory documents required</p>
                    )}
                  </CardContent>
                </Card>

                {/* Optional Requirements */}
                {optionalReqs.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Circle className="w-5 h-5 text-muted-foreground" />
                        Optional Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {optionalReqs.map((req) => (
                        <div
                          key={req.id}
                          className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                          onClick={() => toggleRequirement(req.id)}
                        >
                          <Checkbox
                            checked={completedReqs.has(req.id)}
                            onCheckedChange={() => toggleRequirement(req.id)}
                            className="h-5 w-5 mt-0.5"
                          />
                          <div className="flex-1">
                            <label className="font-medium text-sm cursor-pointer block">{req.requirement_name}</label>
                            <p className="text-xs text-muted-foreground mt-1">{req.requirement_type}</p>
                          </div>
                          {completedReqs.has(req.id) && (
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar - Booking Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Details */}
                    <div className="space-y-3 pb-4 border-b border-border">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Training Center</p>
                        <p className="font-semibold text-sm">{center.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Duration</p>
                        <p className="font-semibold text-sm">{center.duration_days} days</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Location</p>
                        <p className="font-semibold text-sm">{center.location}</p>
                      </div>
                    </div>

                    {/* Progress */}
                    <div>
                      <p className="text-sm font-semibold mb-2 flex items-center justify-between">
                        <span>Documents Required</span>
                        <Badge variant="outline" className="text-xs">
                          {completedReqs.size}/{mandatoryReqs.length}
                        </Badge>
                      </p>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all"
                          style={{
                            width: `${mandatoryReqs.length > 0 ? (completedReqs.size / mandatoryReqs.length) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-3 pt-2 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Course Price</span>
                        <span className="font-semibold">${price}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Convenience Fee (2%)</span>
                        <span className="font-semibold text-xs">${(convenienceFee / 100).toFixed(2)}</span>
                      </div>
                      <div className="pt-3 border-t border-border flex items-center justify-between">
                        <span className="font-semibold">Total</span>
                        <div className="flex items-baseline gap-1">
                          <DollarSign className="w-4 h-4 text-primary" />
                          <span className="text-2xl font-bold text-primary">{(totalPrice / 100).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Warning */}
                    {!allMandatoryComplete && (
                      <Alert className="bg-amber-50 border-amber-200">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <AlertDescription className="text-amber-800 text-sm">
                          Complete all mandatory documents to proceed
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* CTA Button */}
                    <Button
                      onClick={handleCreateBooking}
                      disabled={!allMandatoryComplete || isSubmitting}
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    >
                      {isSubmitting ? "Creating Booking..." : "Proceed to Payment"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">Secure payment powered by Stripe</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
