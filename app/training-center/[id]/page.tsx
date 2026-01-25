"use client"

import { useEffect, useState, use } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Users, Star } from "lucide-react"
import Link from "next/link"
import type { TrainingCenter } from "@/lib/products"

export default function TrainingCenterPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [center, setCenter] = useState<TrainingCenter | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("training_centers")
          .select("*")
          .eq("id", id)
          .single()

        if (error) throw error
        setCenter(data)
      } catch (error) {
        console.error("Error fetching training center:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id, supabase])

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </>
    )
  }

  if (!center) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Training Center Not Found</h1>
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <div className="w-full h-full bg-muted flex items-center justify-center">
                    {center.image_url ? (
                        <img src={center.image_url} alt={center.name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-muted-foreground">No Image</span>
                    )}
                </div>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl mb-2">{center.name}</CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    {center.location}
                  </div>
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  ${(center.price_cents / 100).toFixed(2)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{center.duration_days} Days</span>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{center.capacity} Seats</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{center.rating} ({center.reviews_count})</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-muted-foreground">{center.description}</p>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" asChild>
                    <Link href="/">Back</Link>
                </Button>
                <Button asChild>
                  <Link href={`/booking/${center.id}`}>Book Now</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
