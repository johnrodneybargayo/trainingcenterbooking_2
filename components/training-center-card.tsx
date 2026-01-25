"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import TrainingCenterModal from "./training-center-modal"
import type { TrainingCenter } from "@/lib/products"

interface TrainingCenterCardProps extends TrainingCenter {}

export default function TrainingCenterCard({
  id,
  name,
  location,
  image_url,
  price_cents,
  duration_days,
  rating,
  reviews_count,
  description,
}: TrainingCenterCardProps) {
  const [showModal, setShowModal] = useState(false)
  const price = (price_cents / 100).toFixed(2)

  return (
    <>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col bg-card hover:border-secondary">
        <div
          className="relative w-full h-56 bg-linear-to-br from-primary/20 to-secondary/20 overflow-hidden"
          onClick={() => setShowModal(true)}
        >
          <img
            src={image_url || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
        </div>

        <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div onClick={() => setShowModal(true)} className="space-y-2">
            <div>
              <h3 className="font-semibold text-lg text-card-foreground line-clamp-1 leading-tight">{name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{location}</p>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{description}</p>
          </div>

          <div className="space-y-3 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-amber-500">★</span>
                <span className="font-semibold text-sm">{rating}</span>
                <span className="text-xs text-muted-foreground">({reviews_count} reviews)</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {duration_days} days
              </Badge>
            </div>

            <div className="flex items-end justify-between pt-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Starting from</p>
                <p className="text-2xl font-bold text-primary">${price}</p>
              </div>
              <Button size="sm" onClick={() => setShowModal(true)} className="gap-2">
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal for detailed view */}
      {showModal && <TrainingCenterModal trainingCenterId={id} open={showModal} onOpenChange={setShowModal} />}
    </>
  )
}
