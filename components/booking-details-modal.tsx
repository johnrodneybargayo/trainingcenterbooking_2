"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2, Clock, MapPin, Award, AlertCircle, User, Phone, Mail } from "lucide-react"
import type { Booking, TrainingCenter, Requirement, Profile } from "@/lib/products"
import { mockBookings, mockTrainingCenters, getUserById } from "@/lib/mock-data"

interface BookingDetailsModalProps {
  bookingId: string | null
  initialBooking?: Booking
  open: boolean
  onOpenChange: (open: boolean) => void
  isAdminView?: boolean
}

export default function BookingDetailsModal({
  bookingId,
  initialBooking,
  open,
  onOpenChange,
  isAdminView = false,
}: BookingDetailsModalProps) {
  const [booking, setBooking] = useState<Booking | null>(initialBooking || null)
  const [center, setCenter] = useState<TrainingCenter | null>(null)
  const [requirements, setRequirements] = useState<Requirement[]>([])
  const [bookingReqs, setBookingReqs] = useState<any[]>([])
  const [student, setStudent] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (!open || !bookingId) return

    const fetchData = async () => {
      setIsLoading(true)
      try {
        let bookingData = initialBooking
        let centerData = initialBooking?.training_center || null

        // 1. Fetch Booking if not provided
        if (!bookingData) {
          const { data: sbBooking, error: sbError } = await supabase
            .from("bookings")
            .select("*, training_center:training_centers(*)")
            .eq("id", bookingId)
            .single()

          if (sbBooking) {
            bookingData = sbBooking
            centerData = sbBooking.training_center
          } else {
            // Fallback to mock
            const mock = mockBookings.find((b) => b.id === bookingId)
            if (mock) {
              bookingData = mock
              centerData = mock.training_center
            }
          }
        }

        if (!bookingData) {
          console.error("Booking not found")
          return
        }

        setBooking(bookingData)
        setCenter(centerData)

        // 2. Fetch Student Info (if admin view)
        if (isAdminView && bookingData.user_id) {
           // Try Supabase
           const { data: sbUser } = await supabase
             .from("profiles")
             .select("*")
             .eq("id", bookingData.user_id)
             .single()
           
           if (sbUser) {
             setStudent(sbUser)
           } else {
             // Mock user
             const mockUser = getUserById(bookingData.user_id)
             if (mockUser) setStudent(mockUser)
           }
        }

        // 3. Fetch Requirements
        // Try Supabase
        const { data: reqsData, error: reqsError } = await supabase
          .from("requirements")
          .select("*")
          .eq("training_center_id", bookingData.training_center_id)

        if (!reqsError && reqsData) {
          setRequirements(reqsData)
        } else {
           // No mock requirements in lib currently, so empty array or could add mock
           setRequirements([])
        }

        // 4. Fetch Booking Requirements Status
        const { data: brData, error: brError } = await supabase
          .from("booking_requirements")
          .select("*")
          .eq("booking_id", bookingId)
        
        if (!brError && brData) {
          setBookingReqs(brData)
        } else {
          setBookingReqs([])
        }

      } catch (error) {
        console.error("Error fetching details:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [open, bookingId, initialBooking, isAdminView, supabase])

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
        return <CheckCircle2 className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "cancelled":
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  if (!bookingId) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Booking Details</DialogTitle>
          <DialogDescription>
             ID: {bookingId.slice(0, 8)}...
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="py-12 text-center text-muted-foreground">Loading details...</div>
        ) : !booking || !center ? (
          <div className="py-12 text-center text-destructive">Failed to load booking details.</div>
        ) : (
          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
               <div>
                  <h3 className="font-semibold text-lg">{center.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                     <MapPin className="w-4 h-4" />
                     {center.location}
                  </div>
               </div>
               <div className="flex flex-col items-end gap-2">
                  <Badge className={`${getStatusColor(booking.status)} flex gap-2`}>
                    {getStatusIcon(booking.status)}
                    <span className="capitalize">{booking.status}</span>
                  </Badge>
                  <span className="text-sm font-semibold">${(booking.price_cents / 100).toFixed(2)}</span>
               </div>
            </div>

            {/* Student Info (Admin View) */}
            {isAdminView && student && (
              <div className="space-y-3">
                 <h4 className="font-medium flex items-center gap-2">
                    <User className="w-4 h-4" /> Student Information
                 </h4>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border rounded-lg">
                    <div>
                       <p className="text-xs text-muted-foreground">Name</p>
                       <p className="font-medium">{student.first_name} {student.last_name}</p>
                    </div>
                    <div>
                       <p className="text-xs text-muted-foreground">Company</p>
                       <p className="font-medium">{student.company || "N/A"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                       <Mail className="w-3 h-3 text-muted-foreground" />
                       <span className="text-sm">{student.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Phone className="w-3 h-3 text-muted-foreground" />
                       <span className="text-sm">{student.phone || "N/A"}</span>
                    </div>
                 </div>
              </div>
            )}

            {/* Course Details Grid */}
            <div className="grid grid-cols-2 gap-4">
               <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Duration</p>
                  <div className="flex items-center gap-2">
                     <Clock className="w-4 h-4 text-primary" />
                     <span className="font-medium">{center.duration_days} days</span>
                  </div>
               </div>
               <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Rating</p>
                  <div className="flex items-center gap-2">
                     <Award className="w-4 h-4 text-amber-500" />
                     <span className="font-medium">{center.rating} / 5.0</span>
                  </div>
               </div>
               <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Booking Date</p>
                  <span className="font-medium text-sm">
                     {new Date(booking.created_at).toLocaleDateString()}
                  </span>
               </div>
               <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Training Start</p>
                  <span className="font-medium text-sm">
                     {booking.training_start_date ? new Date(booking.training_start_date).toLocaleDateString() : "TBD"}
                  </span>
               </div>
            </div>

            {/* Requirements Section */}
            {!isAdminView && requirements.length > 0 && (
               <div className="space-y-3">
                  <h4 className="font-medium">Documentation Status</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                     {requirements.map((req) => {
                        const isCompleted = bookingReqs.some(br => br.requirement_id === req.id && br.is_completed)
                        return (
                           <div key={req.id} className="flex items-center gap-3 p-2 text-sm border rounded hover:bg-muted/50">
                              <Checkbox checked={isCompleted} disabled className="w-4 h-4" />
                              <span className={isCompleted ? "line-through text-muted-foreground" : ""}>
                                 {req.requirement_name}
                              </span>
                           </div>
                        )
                     })}
                  </div>
               </div>
            )}

            <div className="flex justify-end gap-2 pt-4 border-t">
               <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
