import type { TrainingCenter, Booking, Profile, Requirement } from "@/lib/products"

// Mock Training Centers
export const mockTrainingCenters: TrainingCenter[] = [
  {
    id: "center-001",
    name: "Maritime Academy International",
    description:
      "Leading maritime training institute offering comprehensive courses in navigation, marine engineering, and seafarer safety.",
    location: "Rotterdam, Netherlands",
    image_url: "/maritime-training-center.jpg",
    price_cents: 180000, // $1,800
    duration_days: 14,
    rating: 4.8,
    reviews_count: 247,
    capacity: 30,
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "center-002",
    name: "Global Shipping Institute",
    description: "Specialized in officer certification programs and advanced maritime competency training.",
    location: "Singapore",
    image_url: "/nautical-training.jpg",
    price_cents: 220000, // $2,200
    duration_days: 21,
    rating: 4.6,
    reviews_count: 189,
    capacity: 25,
    created_at: "2024-02-20T00:00:00Z",
    updated_at: "2024-02-20T00:00:00Z",
  },
  {
    id: "center-003",
    name: "Ocean Engineering Training Center",
    description: "Experts in marine engineering, vessel operations, and technical maritime skills.",
    location: "Dubai, UAE",
    image_url: "/marine-engineering-training.jpg",
    price_cents: 200000, // $2,000
    duration_days: 28,
    rating: 4.7,
    reviews_count: 156,
    capacity: 20,
    created_at: "2024-03-10T00:00:00Z",
    updated_at: "2024-03-10T00:00:00Z",
  },
  {
    id: "center-004",
    name: "Advanced Maritime Solutions",
    description: "Comprehensive safety and survival training for maritime professionals.",
    location: "Mumbai, India",
    image_url: "/maritime-training-center.jpg",
    price_cents: 150000, // $1,500
    duration_days: 10,
    rating: 4.5,
    reviews_count: 203,
    capacity: 35,
    created_at: "2024-04-05T00:00:00Z",
    updated_at: "2024-04-05T00:00:00Z",
  },
  {
    id: "center-005",
    name: "SeaCrew Academy",
    description: "Focused on crew management, STCW compliance, and bridge operations training.",
    location: "Manila, Philippines",
    image_url: "/nautical-training.jpg",
    price_cents: 170000, // $1,700
    duration_days: 12,
    rating: 4.4,
    reviews_count: 134,
    capacity: 32,
    created_at: "2024-05-12T00:00:00Z",
    updated_at: "2024-05-12T00:00:00Z",
  },
]

// Mock Courses
export const mockCourses = [
  {
    id: "course-001",
    training_center_id: "center-001",
    name: "Basic Safety Training (BST)",
    description: "STCW compliant basic safety training course",
    duration_hours: 42,
    capacity: 30,
  },
  {
    id: "course-002",
    training_center_id: "center-001",
    name: "Advanced Firefighting",
    description: "Advanced firefighting and emergency response",
    duration_hours: 40,
    capacity: 20,
  },
  {
    id: "course-003",
    training_center_id: "center-002",
    name: "Officer of the Watch (OOW)",
    description: "Officer certification program",
    duration_hours: 120,
    capacity: 25,
  },
  {
    id: "course-004",
    training_center_id: "center-002",
    name: "Chief Engineer Preparation",
    description: "Chief engineer officer certification",
    duration_hours: 240,
    capacity: 15,
  },
  {
    id: "course-005",
    training_center_id: "center-003",
    name: "Marine Engineering Fundamentals",
    description: "Core marine engineering principles",
    duration_hours: 120,
    capacity: 20,
  },
  {
    id: "course-006",
    training_center_id: "center-003",
    name: "Diesel Engine Management",
    description: "Main engine and auxiliary systems management",
    duration_hours: 80,
    capacity: 18,
  },
  {
    id: "course-007",
    training_center_id: "center-004",
    name: "Sea Survival Training",
    description: "Personal survival techniques and survival craft operation",
    duration_hours: 30,
    capacity: 35,
  },
  {
    id: "course-008",
    training_center_id: "center-004",
    name: "Medical First Aid at Sea",
    description: "Medical training for seafarers",
    duration_hours: 50,
    capacity: 25,
  },
  {
    id: "course-009",
    training_center_id: "center-005",
    name: "Bridge Resource Management",
    description: "Effective bridge team communication and coordination",
    duration_hours: 35,
    capacity: 32,
  },
  {
    id: "course-010",
    training_center_id: "center-005",
    name: "Navigation & Passage Planning",
    description: "Advanced navigation and route planning",
    duration_hours: 60,
    capacity: 28,
  },
]

// Mock Requirements
export const mockRequirements: Requirement[] = [
  {
    id: "req-001",
    training_center_id: "center-001",
    requirement_name: "Passport Copy",
    requirement_type: "document",
    is_mandatory: true,
  },
  {
    id: "req-002",
    training_center_id: "center-001",
    requirement_name: "Seaman's Book",
    requirement_type: "document",
    is_mandatory: true,
  },
  {
    id: "req-003",
    training_center_id: "center-001",
    requirement_name: "Medical Certificate",
    requirement_type: "document",
    is_mandatory: true,
  },
  {
    id: "req-004",
    training_center_id: "center-002",
    requirement_name: "Passport Copy",
    requirement_type: "document",
    is_mandatory: true,
  },
  {
    id: "req-005",
    training_center_id: "center-003",
    requirement_name: "Engineering License",
    requirement_type: "document",
    is_mandatory: true,
  },
]

// Mock Users - Students
export const mockStudents: Profile[] = [
  {
    id: "user-001",
    first_name: "Ahmed",
    last_name: "Hassan",
    email: "ahmed.hassan@maritime.com",
    phone: "+971501234567",
    company: "Emirates Shipping",
    user_type: "student",
    training_center_id: null,
    created_at: "2024-01-10T00:00:00Z",
  },
  {
    id: "user-002",
    first_name: "Maria",
    last_name: "Santos",
    email: "maria.santos@oceanceeds.com",
    phone: "+60123456789",
    company: "Ocean Fleet Ltd",
    user_type: "student",
    training_center_id: null,
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "user-003",
    first_name: "James",
    last_name: "Wilson",
    email: "james.wilson@shipco.uk",
    phone: "+447911123456",
    company: "Wilson Shipping Group",
    user_type: "student",
    training_center_id: null,
    created_at: "2024-02-05T00:00:00Z",
  },
  {
    id: "user-004",
    first_name: "Priya",
    last_name: "Sharma",
    email: "priya.sharma@indianship.com",
    phone: "+919876543210",
    company: "Indian Maritime Corp",
    user_type: "student",
    training_center_id: null,
    created_at: "2024-02-20T00:00:00Z",
  },
  {
    id: "user-005",
    first_name: "Carlos",
    last_name: "Rodriguez",
    email: "carlos.rodriguez@latinship.es",
    phone: "+34912345678",
    company: "Latin Shipping Co",
    user_type: "student",
    training_center_id: null,
    created_at: "2024-03-10T00:00:00Z",
  },
  {
    id: "user-006",
    first_name: "Lin",
    last_name: "Chen",
    email: "lin.chen@asianmarine.cn",
    phone: "+8613800138000",
    company: "Asian Marine Services",
    user_type: "student",
    training_center_id: null,
    created_at: "2024-03-25T00:00:00Z",
  },
]

// Mock Users - Training Center Admins
export const mockCenterAdmins: Profile[] = [
  {
    id: "admin-center-001",
    first_name: "Robert",
    last_name: "van der Berg",
    email: "robert@maritimeacademy.nl",
    phone: "+31104567890",
    company: "Maritime Academy International",
    user_type: "training_center_admin",
    training_center_id: "center-001",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "admin-center-002",
    first_name: "Deepak",
    last_name: "Patel",
    email: "deepak@globalshipping.sg",
    phone: "+6565123456",
    company: "Global Shipping Institute",
    user_type: "training_center_admin",
    training_center_id: "center-002",
    created_at: "2024-02-01T00:00:00Z",
  },
  {
    id: "admin-center-003",
    first_name: "Fatima",
    last_name: "Al-Mansouri",
    email: "fatima@oceanengineering.ae",
    phone: "+97143456789",
    company: "Ocean Engineering Training Center",
    user_type: "training_center_admin",
    training_center_id: "center-003",
    created_at: "2024-03-01T00:00:00Z",
  },
  {
    id: "admin-center-004",
    first_name: "Rajesh",
    last_name: "Kumar",
    email: "rajesh@advancedmaritime.in",
    phone: "+919112345678",
    company: "Advanced Maritime Solutions",
    user_type: "training_center_admin",
    training_center_id: "center-004",
    created_at: "2024-04-01T00:00:00Z",
  },
  {
    id: "admin-center-005",
    first_name: "Anna",
    last_name: "Fernandez",
    email: "anna@seacrew.ph",
    phone: "+639178901234",
    company: "SeaCrew Academy",
    user_type: "training_center_admin",
    training_center_id: "center-005",
    created_at: "2024-05-01T00:00:00Z",
  },
]

// Mock Users - Platform Admin
export const mockPlatformAdmins: Profile[] = [
  {
    id: "admin-platform-001",
    first_name: "Sarah",
    last_name: "Thompson",
    email: "sarah@trainingcenterbooking.com",
    phone: "+44201234567",
    company: "Training Center Booking Platform",
    user_type: "admin",
    training_center_id: null,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "admin-platform-002",
    first_name: "Michael",
    last_name: "Zhang",
    email: "michael@trainingcenterbooking.com",
    phone: "+86108123456",
    company: "Training Center Booking Platform",
    user_type: "admin",
    training_center_id: null,
    created_at: "2024-01-01T00:00:00Z",
  },
]

// Mock Bookings
export const mockBookings: (Booking & { training_center?: TrainingCenter })[] = [
  {
    id: "booking-001",
    user_id: "user-001",
    training_center_id: "center-001",
    booking_date: "2024-01-20T10:30:00Z",
    training_start_date: "2024-02-15T08:00:00Z",
    status: "confirmed",
    payment_id: "pay-001",
    price_cents: 180000,
    convenience_fee_cents: 5400,
    created_at: "2024-01-20T10:30:00Z",
    training_center: mockTrainingCenters.find(c => c.id === "center-001")
  },
  {
    id: "booking-002",
    user_id: "user-002",
    training_center_id: "center-002",
    booking_date: "2024-01-25T14:15:00Z",
    training_start_date: "2024-03-01T08:00:00Z",
    status: "confirmed",
    payment_id: "pay-002",
    price_cents: 220000,
    convenience_fee_cents: 6600,
    created_at: "2024-01-25T14:15:00Z",
    training_center: mockTrainingCenters.find(c => c.id === "center-002")
  },
  {
    id: "booking-003",
    user_id: "user-003",
    training_center_id: "center-003",
    booking_date: "2024-02-01T09:45:00Z",
    training_start_date: "2024-03-15T08:00:00Z",
    status: "pending",
    payment_id: null,
    price_cents: 200000,
    convenience_fee_cents: 6000,
    created_at: "2024-02-01T09:45:00Z",
    training_center: mockTrainingCenters.find(c => c.id === "center-003")
  },
  {
    id: "booking-004",
    user_id: "user-004",
    training_center_id: "center-001",
    booking_date: "2024-02-05T11:20:00Z",
    training_start_date: "2024-02-25T08:00:00Z",
    status: "confirmed",
    payment_id: "pay-004",
    price_cents: 180000,
    convenience_fee_cents: 5400,
    created_at: "2024-02-05T11:20:00Z",
    training_center: mockTrainingCenters.find(c => c.id === "center-001")
  },
  {
    id: "booking-005",
    user_id: "user-005",
    training_center_id: "center-004",
    booking_date: "2024-02-10T13:30:00Z",
    training_start_date: "2024-03-05T08:00:00Z",
    status: "completed",
    payment_id: "pay-005",
    price_cents: 150000,
    convenience_fee_cents: 4500,
    created_at: "2024-02-10T13:30:00Z",
    training_center: mockTrainingCenters.find(c => c.id === "center-004")
  },
  {
    id: "booking-006",
    user_id: "user-006",
    training_center_id: "center-002",
    booking_date: "2024-02-15T10:00:00Z",
    training_start_date: "2024-04-01T08:00:00Z",
    status: "confirmed",
    payment_id: "pay-006",
    price_cents: 220000,
    convenience_fee_cents: 6600,
    created_at: "2024-02-15T10:00:00Z",
    training_center: mockTrainingCenters.find(c => c.id === "center-002")
  },
  {
    id: "booking-007",
    user_id: "user-001",
    training_center_id: "center-005",
    booking_date: "2024-02-20T15:45:00Z",
    training_start_date: "2024-04-10T08:00:00Z",
    status: "confirmed",
    payment_id: "pay-007",
    price_cents: 170000,
    convenience_fee_cents: 5100,
    created_at: "2024-02-20T15:45:00Z",
    training_center: mockTrainingCenters.find(c => c.id === "center-005")
  },
  {
    id: "booking-008",
    user_id: "user-003",
    training_center_id: "center-004",
    booking_date: "2024-02-22T12:15:00Z",
    training_start_date: "2024-03-20T08:00:00Z",
    status: "pending",
    payment_id: null,
    price_cents: 150000,
    convenience_fee_cents: 4500,
    created_at: "2024-02-22T12:15:00Z",
    training_center: mockTrainingCenters.find(c => c.id === "center-004")
  },
  {
    id: "booking-009",
    user_id: "user-002",
    training_center_id: "center-003",
    booking_date: "2024-02-25T16:30:00Z",
    training_start_date: "2024-05-01T08:00:00Z",
    status: "confirmed",
    payment_id: "pay-009",
    price_cents: 200000,
    convenience_fee_cents: 6000,
    created_at: "2024-02-25T16:30:00Z",
    training_center: mockTrainingCenters.find(c => c.id === "center-003")
  },
  {
    id: "booking-010",
    user_id: "user-004",
    training_center_id: "center-005",
    booking_date: "2024-03-01T08:00:00Z",
    training_start_date: "2024-04-15T08:00:00Z",
    status: "completed",
    payment_id: "pay-010",
    price_cents: 170000,
    convenience_fee_cents: 5100,
    created_at: "2024-03-01T08:00:00Z",
    training_center: mockTrainingCenters.find(c => c.id === "center-005")
  },
]

// Helper functions for dashboard stats
export const getBookingStats = () => {
  const totalBookings = mockBookings.length
  const confirmedBookings = mockBookings.filter((b) => b.status === "confirmed").length
  const completedBookings = mockBookings.filter((b) => b.status === "completed").length
  const pendingBookings = mockBookings.filter((b) => b.status === "pending").length
  const totalRevenue = mockBookings.reduce((sum, b) => sum + b.price_cents + (b.convenience_fee_cents || 0), 0)

  return {
    totalBookings,
    confirmedBookings,
    completedBookings,
    pendingBookings,
    totalRevenue,
    averageRevenue: totalRevenue / totalBookings,
  }
}

export const getBookingsByCenter = (centerId: string) => {
  return mockBookings.filter((b) => b.training_center_id === centerId)
}

export const getCenterById = (centerId: string) => {
  return mockTrainingCenters.find((c) => c.id === centerId)
}

export const getUserById = (userId: string) => {
  return (
    mockStudents.find((u) => u.id === userId) ||
    mockCenterAdmins.find((u) => u.id === userId) ||
    mockPlatformAdmins.find((u) => u.id === userId)
  )
}
