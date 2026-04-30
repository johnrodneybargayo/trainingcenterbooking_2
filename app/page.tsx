"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Navbar from "@/components/navbar"
import TrainingCenterCard from "@/components/training-center-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"
import type { TrainingCenter } from "@/lib/products"

const MOCK_TRAINING_CENTERS: TrainingCenter[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Global Maritime Academy",
    description: "World-class maritime training center specializing in advanced navigation and ship management",
    location: "Singapore",
    image_url: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=500&h=400&fit=crop",
    price_cents: 350000,
    duration_days: 21,
    rating: 4.8,
    reviews_count: 245,
    capacity: 40,
    admin_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Blue Horizon Training Institute",
    description: "Comprehensive marine engineering and safety training programs",
    location: "Malta",
    image_url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=400&fit=crop",
    price_cents: 450000,
    duration_days: 30,
    rating: 4.7,
    reviews_count: 189,
    capacity: 35,
    admin_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "Advanced Maritime Institute",
    description: "Specialized training for chief engineers and master mariners with modern simulators",
    location: "Dubai",
    image_url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=500&h=400&fit=crop",
    price_cents: 550000,
    duration_days: 35,
    rating: 4.9,
    reviews_count: 320,
    capacity: 30,
    admin_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    name: "Pacific Naval Academy",
    description: "Focus on deck cadet training and nautical officer certification programs",
    location: "Philippines",
    image_url: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=500&h=400&fit=crop",
    price_cents: 280000,
    duration_days: 18,
    rating: 4.6,
    reviews_count: 156,
    capacity: 45,
    admin_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    name: "European Maritime College",
    description: "Premium maritime education with EU-certified courses and professional development",
    location: "Rotterdam",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop",
    price_cents: 520000,
    duration_days: 28,
    rating: 4.7,
    reviews_count: 267,
    capacity: 32,
    admin_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    name: "Ocean Safety Institute",
    description: "Safety, security and environmental protection training for maritime professionals",
    location: "Mumbai",
    image_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=400&fit=crop",
    price_cents: 220000,
    duration_days: 14,
    rating: 4.5,
    reviews_count: 98,
    capacity: 50,
    admin_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export default function HomePage() {
  const [trainingCenters, setTrainingCenters] = useState<TrainingCenter[]>([])
  const [filteredCenters, setFilteredCenters] = useState<TrainingCenter[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedDuration, setSelectedDuration] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 200000])
  const [selectedRating, setSelectedRating] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    const fetchTrainingCenters = async () => {
      try {
        const { data, error } = await supabase.from("training_centers").select("*")
        if (error) {
          console.error("Database error:", error)
          // Use mock data if database not set up
          setTrainingCenters(MOCK_TRAINING_CENTERS)
          setFilteredCenters(MOCK_TRAINING_CENTERS)
          throw error
        }
        setTrainingCenters(data || [])
        setFilteredCenters(data || [])
      } catch (error) {
        console.error("Error fetching training centers:", error)
        // Fallback to mock data
        setTrainingCenters(MOCK_TRAINING_CENTERS)
        setFilteredCenters(MOCK_TRAINING_CENTERS)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrainingCenters()
  }, [supabase])

  useEffect(() => {
    let filtered = trainingCenters

    if (searchQuery) {
      filtered = filtered.filter(
        (center) =>
          center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          center.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedLocation !== "all") {
      filtered = filtered.filter((center) => center.location === selectedLocation)
    }

    if (selectedDuration !== "all") {
      const duration = Number.parseInt(selectedDuration)
      if (selectedDuration === "short") {
        filtered = filtered.filter((center) => center.duration_days <= 14)
      } else if (selectedDuration === "medium") {
        filtered = filtered.filter((center) => center.duration_days > 14 && center.duration_days <= 30)
      } else if (selectedDuration === "long") {
        filtered = filtered.filter((center) => center.duration_days > 30)
      }
    }

    filtered = filtered.filter((center) => center.price_cents >= priceRange[0] && center.price_cents <= priceRange[1])

    if (selectedRating !== "all") {
      const rating = Number.parseFloat(selectedRating)
      filtered = filtered.filter((center) => center.rating >= rating)
    }

    setFilteredCenters(filtered)
  }, [searchQuery, selectedLocation, selectedDuration, priceRange, selectedRating, trainingCenters])

  const locations = Array.from(new Set(trainingCenters.map((center) => center.location)))
  const activeFilters = [
    selectedLocation !== "all" && selectedLocation,
    selectedDuration !== "all" && selectedDuration,
    selectedRating !== "all" && `${selectedRating}+ stars`,
  ].filter(Boolean)

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedLocation("all")
    setSelectedDuration("all")
    setPriceRange([0, 200000])
    setSelectedRating("all")
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/80 to-secondary text-primary-foreground py-16 md:py-24">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-grid-white/[0.2]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
              Professional Maritime Training
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance leading-tight">
              Find Your Perfect Marine Training Center
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 text-balance max-w-2xl mx-auto">
              Discover world-class training programs for Marine Engineers, Nautical Officers, and Seafarers
            </p>
          </div>
        </section>

        {/* Search Bar */}
        <section className="sticky top-16 z-30 bg-card border-b border-border shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search training centers, courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                className="md:hidden bg-transparent"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Mobile Filters */}
            {showMobileFilters && (
              <div className="md:hidden mt-4 space-y-3 pb-4 border-t border-border pt-4">
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Durations</SelectItem>
                    <SelectItem value="short">Short (1-14 days)</SelectItem>
                    <SelectItem value="medium">Medium (15-30 days)</SelectItem>
                    <SelectItem value="long">Long (30+ days)</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedRating} onValueChange={setSelectedRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="3.5">3.5+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </section>

        {/* Desktop Filters and Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32 space-y-6 bg-card p-6 rounded-lg border border-border">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center justify-between">
                    Filters
                    {activeFilters.length > 0 && (
                      <Button variant="ghost" size="sm" onClick={resetFilters} className="h-auto p-0 text-xs">
                        Clear all
                      </Button>
                    )}
                  </h3>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Duration</label>
                  <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Durations</SelectItem>
                      <SelectItem value="short">Short (1-14 days)</SelectItem>
                      <SelectItem value="medium">Medium (15-30 days)</SelectItem>
                      <SelectItem value="long">Long (30+ days)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Price Range</label>
                  <div className="pt-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={0}
                      max={200000}
                      step={10000}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>${(priceRange[0] / 100).toFixed(0)}</span>
                      <span>${(priceRange[1] / 100).toFixed(0)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Rating</label>
                  <Select value={selectedRating} onValueChange={setSelectedRating}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="3.5">3.5+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Active Filters */}
              {activeFilters.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeFilters.map((filter) => (
                    <Badge key={filter} variant="secondary" className="gap-1">
                      {filter}
                      <button onClick={resetFilters} className="ml-1 hover:opacity-70">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredCenters.length} of {trainingCenters.length} training centers
                </p>
              </div>

              {/* Grid */}
              {isLoading ? (
                <div className="text-center py-16">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="text-muted-foreground mt-4">Loading training centers...</p>
                </div>
              ) : filteredCenters.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {filteredCenters.map((center) => (
                    <TrainingCenterCard key={center.id} {...center} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg mb-4">No training centers found</p>
                  <Button variant="outline" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
