"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, CheckCircle2, Circle, AlertCircle } from "lucide-react"
import type { Requirement } from "@/lib/products"

interface RequirementsUploadProps {
  bookingId: string
  requirements: Requirement[]
  onComplete?: () => void
}

interface BookingRequirement {
  id: string
  requirement_id: string
  is_completed: boolean
  document_url: string | null
  requirement_name: string
  is_mandatory: boolean
}

export default function RequirementsUpload({ bookingId, requirements, onComplete }: RequirementsUploadProps) {
  const [bookingRequirements, setBookingRequirements] = useState<BookingRequirement[]>([])
  const [uploadingId, setUploadingId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const mandatoryReqs = bookingRequirements.filter((r) => r.is_mandatory)
  const optionalReqs = bookingRequirements.filter((r) => !r.is_mandatory)
  const mandatoryComplete = mandatoryReqs.every((r) => r.is_completed)

  const handleFileUpload = async (requirementId: string, file: File) => {
    if (!file) return

    setUploadingId(requirementId)
    try {
      const fileName = `${bookingId}/${requirementId}/${file.name}`
      const { error: uploadError } = await supabase.storage.from("booking-documents").upload(fileName, file)

      if (uploadError) throw uploadError

      const { data: publicUrl } = supabase.storage.from("booking-documents").getPublicUrl(fileName)

      // Update booking requirement
      const { error: updateError } = await supabase
        .from("booking_requirements")
        .update({
          is_completed: true,
          document_url: publicUrl.publicUrl,
        })
        .eq("requirement_id", requirementId)
        .eq("booking_id", bookingId)

      if (updateError) throw updateError

      setBookingRequirements((prev) =>
        prev.map((r) =>
          r.requirement_id === requirementId ? { ...r, is_completed: true, document_url: publicUrl.publicUrl } : r,
        ),
      )
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to upload document")
    } finally {
      setUploadingId(null)
    }
  }

  const handleSubmit = async () => {
    if (!mandatoryComplete) {
      alert("Please upload all mandatory documents")
      return
    }

    setIsLoading(true)
    try {
      const { error } = await supabase.from("bookings").update({ status: "confirmed" }).eq("id", bookingId)

      if (error) throw error
      onComplete?.()
    } catch (error) {
      console.error("Error confirming booking:", error)
      alert("Failed to confirm booking")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Training Requirements</CardTitle>
          <CardDescription>Upload all mandatory documents and optional certifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!mandatoryComplete && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                All mandatory documents must be uploaded before confirming your booking.
              </AlertDescription>
            </Alert>
          )}

          {mandatoryReqs.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <h3 className="font-semibold">Mandatory Documents</h3>
              </div>
              <div className="space-y-3">
                {mandatoryReqs.map((req) => (
                  <RequirementUploadItem
                    key={req.id}
                    requirement={req}
                    isUploading={uploadingId === req.requirement_id}
                    onUpload={(file) => handleFileUpload(req.requirement_id, file)}
                  />
                ))}
              </div>
            </div>
          )}

          {optionalReqs.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Circle className="w-5 h-5 text-muted-foreground" />
                <h3 className="font-semibold">Optional Documents</h3>
              </div>
              <div className="space-y-3">
                {optionalReqs.map((req) => (
                  <RequirementUploadItem
                    key={req.id}
                    requirement={req}
                    isUploading={uploadingId === req.requirement_id}
                    onUpload={(file) => handleFileUpload(req.requirement_id, file)}
                  />
                ))}
              </div>
            </div>
          )}

          <Button onClick={handleSubmit} disabled={!mandatoryComplete || isLoading} className="w-full" size="lg">
            {isLoading ? "Confirming..." : "Confirm Booking"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function RequirementUploadItem({
  requirement,
  isUploading,
  onUpload,
}: {
  requirement: BookingRequirement
  isUploading: boolean
  onUpload: (file: File) => void
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onUpload(file)
    }
  }

  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-start gap-3 flex-1">
        {requirement.is_completed ? (
          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
        ) : (
          <Circle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
        )}
        <div className="flex-1">
          <p className="font-medium text-sm">{requirement.requirement_name}</p>
          {requirement.is_completed && requirement.document_url && (
            <a
              href={requirement.document_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline"
            >
              View uploaded document
            </a>
          )}
        </div>
      </div>
      {!requirement.is_completed && (
        <label className="cursor-pointer">
          <input type="file" onChange={handleFileChange} disabled={isUploading} className="hidden" />
          <Button variant="outline" size="sm" disabled={isUploading} asChild>
            <span className="gap-2">
              <Upload className="w-4 h-4" />
              {isUploading ? "Uploading..." : "Upload"}
            </span>
          </Button>
        </label>
      )}
    </div>
  )
}
