export interface TrainingCenter {
  id: string
  name: string
  description: string
  location: string
  image_url: string
  price_cents: number
  duration_days: number
  rating: number
  reviews_count: number
  capacity: number
  created_at?: string
  updated_at?: string
}

export interface Requirement {
  id: string
  training_center_id: string
  requirement_name: string
  requirement_type: string
  is_mandatory: boolean
}

export interface Booking {
  id: string
  user_id: string
  training_center_id: string
  booking_date: string
  training_start_date?: string
  status: string
  payment_id: string | null
  price_cents: number
  convenience_fee_cents?: number
  refund_amount_cents?: number
  created_at: string
  cancelled_at?: string
}

export interface RefundPolicy {
  id: string
  training_center_id: string
  days_before_training: number
  refund_percentage: number
  description: string
}

export interface Profile {
  id: string
  first_name: string | null
  last_name: string | null
  email: string | null
  phone: string | null
  company: string | null
  user_type: "student" | "admin" | "training_center_admin"
  training_center_id: string | null
  created_at: string
}
