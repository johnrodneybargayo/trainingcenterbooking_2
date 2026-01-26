"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, Clock, MapPin, Users, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import type { TrainingCenter } from "@/lib/products"
import { mockTrainingCenters } from "@/lib/mock-data"

interface TrainingCenterModalProps {
  trainingCenterId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface Requirement {
  id: string
  requirement_name: string
  is_mandatory: boolean
}

export default function TrainingCenterModal({ trainingCenterId, open, onOpenChange }: TrainingCenterModalProps) {
  const [trainingCenter, setTrainingCenter] = useState<TrainingCenter | null>(null)
  const [requirements, setRequirements] = useState<Requirement[]>([])
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current user
        const { data } = await supabase.auth.getSession()
        setUser(data?.session?.user || null)

        // Fetch training center details
        const { data: centerData, error: centerError } = await supabase
          .from("training_centers")
          .select("*")
          .eq("id", trainingCenterId)
          .single()

        if (centerError) {
          console.warn("Supabase error fetching center, falling back to mock data:", centerError)
          throw centerError
        }
        setTrainingCenter(centerData)

        // Fetch requirements
        const { data: reqData, error: reqError } = await supabase
          .from("requirements")
          .select("*")
          .eq("training_center_id", trainingCenterId)

        if (reqError) {
           console.warn("Supabase error fetching requirements:", reqError)
           // Don't throw for requirements, just empty array or mock if we had it
        }
        setRequirements(reqData || [])
      } catch (error) {
        console.error("Error fetching data:", error)
        // Fallback to mock data
        const mockCenter = mockTrainingCenters.find(c => c.id === trainingCenterId)
        if (mockCenter) {
           setTrainingCenter(mockCenter)
           // We don't have mock requirements in the provided file, so empty array is fine
           setRequirements([])
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (open) {
      fetchData()
    }
  }, [open, trainingCenterId, supabase])

  const handleBookClick = () => {
    if (!user) {
      router.push(`/auth/login?redirect=/booking/${trainingCenterId}`)
    } else {
      router.push(`/booking/${trainingCenterId}`)
    }
  }

  if (!trainingCenter) return null

  const price = (trainingCenter.price_cents / 100).toFixed(2)
  const mandatoryReqs = requirements.filter((r) => r.is_mandatory)
  const optionalReqs = requirements.filter((r) => !r.is_mandatory)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{trainingCenter.name}</DialogTitle>
          <DialogDescription>{trainingCenter.location}</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="py-8 text-center text-muted-foreground">Loading details...</div>
        ) : (
          <div className="space-y-6">
            {/* Image */}
            <div className="w-full h-64 bg-muted rounded-lg overflow-hidden">
              <img
                src={trainingCenter.image_url || "/placeholder.svg"}
                alt={trainingCenter.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">About this course</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{trainingCenter.description}</p>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
                <div className="text-sm">
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="font-semibold">{trainingCenter.duration_days} days</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Users className="w-5 h-5 text-primary" />
                <div className="text-sm">
                  <p className="text-xs text-muted-foreground">Capacity</p>
                  <p className="font-semibold">{trainingCenter.capacity} spots</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <MapPin className="w-5 h-5 text-primary" />
                <div className="text-sm">
                  <p className="text-xs text-muted-foreground">Rating</p>
                  <p className="font-semibold">★ {trainingCenter.rating}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <AlertCircle className="w-5 h-5 text-primary" />
                <div className="text-sm">
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="font-semibold">${price}</p>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-3">
              <h3 className="font-semibold">Requirements</h3>

              {mandatoryReqs.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-amber-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> Mandatory Documents
                  </p>
                  <div className="space-y-2">
                    {mandatoryReqs.map((req) => (
                      <div
                        key={req.id}
                        className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800"
                      >
                        <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                        <span className="text-sm text-card-foreground">{req.requirement_name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {optionalReqs.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <Circle className="w-4 h-4" /> Optional Documents
                  </p>
                  <div className="space-y-2">
                    {optionalReqs.map((req) => (
                      <div key={req.id} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                        <Circle className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                        <span className="text-sm text-muted-foreground">{req.requirement_name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pricing and Action */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Total price</span>
                <span className="text-3xl font-bold text-primary">${price}</span>
              </div>
              <Button onClick={handleBookClick} size="lg" className="w-full">
                {user ? "Book Now" : "Login to Book"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
