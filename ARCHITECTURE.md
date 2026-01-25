# MarineHub Architecture Guide

## System Overview

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    MarineHub Platform                       │
└─────────────────────────────────────────────────────────────┘

┌────────────── CLIENT TIER ──────────────┐
│     Next.js Frontend (React)            │
│  ├─ Homepage with Training Centers      │
│  ├─ Training Center Detail Pages        │
│  ├─ Booking Flow                        │
│  ├─ Payment Page (Stripe)               │
│  ├─ Student Dashboard                   │
│  ├─ Admin Dashboard                     │
│  └─ User Profile Management             │
└─────────────────────────────────────────┘
          ↓
┌────────────── API TIER ──────────────────┐
│   Next.js Server Actions                │
│  ├─ Stripe Checkout                     │
│  ├─ Data Validation                     │
│  └─ Business Logic                      │
└─────────────────────────────────────────┘
          ↓
┌────────────── DATA TIER ──────────────────┐
│   Supabase (PostgreSQL)                 │
│  ├─ profiles                            │
│  ├─ training_centers                    │
│  ├─ requirements                        │
│  ├─ refund_policies                     │
│  ├─ bookings                            │
│  └─ booking_requirements                │
└─────────────────────────────────────────┘

┌────────────── EXTERNAL SERVICES ────────┐
│  ├─ Stripe (Payments)                   │
│  └─ Supabase Auth (Authentication)      │
└─────────────────────────────────────────┘
\`\`\`

## Data Flow

### 1. User Registration & Login
\`\`\`
Student
  ↓
Sign Up Form → app/auth/sign-up/page.tsx
  ↓
Supabase Auth API
  ↓
auth.users table (Email verified)
  ↓
profiles table (User metadata)
  ↓
Session stored in cookies
  ↓
Redirect to Dashboard
\`\`\`

### 2. Browse & Book Training Center
\`\`\`
Homepage (app/page.tsx)
  ↓
Fetch training_centers from Supabase
  ↓
Filter by location/search
  ↓
Display TrainingCenterCard components
  ↓
Click → training-center/[id]/page.tsx
  ↓
Fetch center details + requirements + refund_policies
  ↓
Display RefundPolicyCard
  ↓
Click "Book Now" → booking/[id]/page.tsx
\`\`\`

### 3. Complete Booking & Payment
\`\`\`
booking/[id]/page.tsx
  ↓
Fetch requirements for training center
  ↓
User checks off mandatory documents
  ↓
Click "Proceed to Payment"
  ↓
Create booking record (status: pending)
  ↓
Create booking_requirements records
  ↓
Redirect to payment/[bookingId]/page.tsx
  ↓
Stripe Checkout Component
  ↓
User enters card (test: 4242 4242 4242 4242)
  ↓
Stripe processes payment
  ↓
Update booking status: confirmed
  ↓
Redirect to dashboard
\`\`\`

## Database Schema Relationships

\`\`\`
auth.users (Supabase managed)
    ↓ (1-to-1)
profiles
    - id (FK to auth.users)
    - user_type (student/admin/training_center_admin)
    - training_center_id (FK to training_centers)

training_centers (created by admins)
    ↓ (1-to-many)
    ├─ requirements
    │   - requirement_name
    │   - is_mandatory
    │
    ├─ refund_policies
    │   - days_before_training
    │   - refund_percentage
    │
    └─ bookings
        - user_id (FK to auth.users)
        - status (pending/confirmed/completed/cancelled)
        - price_cents
        - refund_amount_cents
            ↓ (1-to-many)
            └─ booking_requirements
                - requirement_id (FK to requirements)
                - is_completed
                - document_url
\`\`\`

## Component Hierarchy

\`\`\`
app/layout.tsx (Root)
  ├─ Navbar
  │   ├─ Logo
  │   ├─ Navigation Links
  │   └─ Auth Menu (Dropdown)
  │
  ├─ app/page.tsx (Homepage)
  │   ├─ Hero Section
  │   ├─ Search & Filters
  │   └─ TrainingCenterCard (Grid)
  │       ├─ Image
  │       ├─ Title
  │       ├─ Rating
  │       └─ Price
  │
  ├─ app/training-center/[id]/page.tsx
  │   ├─ Hero Image
  │   ├─ Course Details
  │   ├─ RequirementsList
  │   └─ RefundPolicyCard ← (NEW)
  │
  ├─ app/booking/[id]/page.tsx
  │   ├─ RequiredDocuments
  │   │   ├─ Mandatory Checklist
  │   │   └─ Optional Checklist
  │   └─ BookingSummary
  │
  ├─ app/payment/[bookingId]/page.tsx
  │   ├─ Checkout Component
  │   │   └─ Stripe Embedded
  │   └─ OrderSummary
  │
  ├─ app/dashboard/page.tsx
  │   ├─ Stats Cards
  │   └─ BookingsList
  │
  ├─ app/admin/dashboard/page.tsx
  │   ├─ StatsCards (Revenue, Bookings)
  │   └─ BookingsTable
  │
  └─ app/auth/
      ├─ login/page.tsx
      ├─ sign-up/page.tsx
      └─ sign-up-success/page.tsx
\`\`\`

## State Management

### Client State
\`\`\`
- Homepage filters (search, location)
- Booking form (checked requirements)
- UI state (loading, modals, dropdowns)
\`\`\`

### Server State
\`\`\`
- User authentication (via Supabase session cookies)
- Training center data (from Supabase)
- Booking data (from Supabase)
- User profile (from Supabase)
\`\`\`

### Session Flow
\`\`\`
User Signup
  ↓
Supabase Auth API
  ↓
Session token stored in cookie
  ↓
Each request includes cookie
  ↓
createClient() reads from cookie
  ↓
Access granted based on auth state
\`\`\`

## API Routes & Server Actions

\`\`\`
/app/actions/stripe.ts
  └─ startCheckoutSession(...)
      - Creates Stripe checkout session
      - Returns client secret
      - Server-only for security
\`\`\`

## External Integrations

### Stripe
\`\`\`
Frontend (checkout.tsx)
  ↓
EmbeddedCheckout Component
  ↓
Client Secret (from startCheckoutSession)
  ↓
Stripe.js Library
  ↓
Stripe Servers
  ↓
Payment Processing
  ↓
Status → Frontend
\`\`\`

### Supabase Auth
\`\`\`
User Signup/Login
  ↓
Email + Password
  ↓
Supabase Auth API
  ↓
Session Token
  ↓
Stored in Cookies
  ↓
Automatic in createClient()
\`\`\`

## Security Layers

### 1. Authentication
\`\`\`
Supabase Auth
  ↓
Email verification
  ↓
Session tokens
  ↓
Secure cookie storage
\`\`\`

### 2. Authorization
\`\`\`
Row Level Security (RLS) Policies
  ├─ profiles: Can only see own profile
  ├─ bookings: Can only see own bookings
  ├─ booking_requirements: Can only see own
  └─ training_centers: Public read
\`\`\`

### 3. Data Protection
\`\`\`
- Parameterized queries (Supabase)
- Input validation (TypeScript)
- HTTPS/TLS (Production)
- CSRF protection (Next.js)
\`\`\`

### 4. Payment Security
\`\`\`
- Stripe handles sensitive data
- Server-side checkout sessions
- Client secret validation
- Never store credit cards
\`\`\`

## Deployment Architecture

### Development
\`\`\`
npm run dev
  ↓
http://localhost:3000
  ↓
Supabase (dev project)
  ↓
Stripe (test mode)
\`\`\`

### Production
\`\`\`
Vercel
  ↓
Next.js App
  ↓
Supabase (production project)
  ↓
Stripe (live mode)
  ↓
Custom domain (optional)
\`\`\`

### Environment Variables
\`\`\`
Development (.env.local):
  NEXT_PUBLIC_SUPABASE_URL=dev_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=dev_key
  STRIPE_SECRET_KEY=sk_test_xxx
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx

Production (Vercel):
  NEXT_PUBLIC_SUPABASE_URL=prod_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=prod_key
  STRIPE_SECRET_KEY=sk_live_xxx
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
\`\`\`

## Performance Optimization

### Client-Side
\`\`\`
- Code splitting (Next.js automatic)
- Image optimization (next/image)
- CSS-in-JS (Tailwind - atomic)
- Component lazy loading
- Query caching patterns
\`\`\`

### Server-Side
\`\`\`
- Database indexes on foreign keys
- Efficient queries (select needed fields only)
- Pagination (future enhancement)
- Caching headers (future)
\`\`\`

### Network
\`\`\`
- Gzip compression (automatic)
- CDN via Vercel (automatic)
- CSS/JS minification (automatic)
- Image optimization (Vercel Images)
\`\`\`

## Error Handling

\`\`\`
Client Errors
  ├─ Network errors → Retry UI
  ├─ Validation errors → Form error messages
  └─ Auth errors → Redirect to login

Server Errors
  ├─ Database errors → 500 page
  ├─ Auth errors → 401 page
  └─ Validation errors → 400 page

Stripe Errors
  ├─ Payment declined → Show error message
  ├─ Invalid card → Form validation
  └─ Network error → Retry payment
\`\`\`

## Scaling Considerations

### Current Capacity
- ✅ 100+ concurrent users
- ✅ 1000+ bookings
- ✅ 100+ training centers

### Scale-Up Path
1. Add database read replicas (Supabase)
2. Implement caching layer (Redis)
3. Add CDN for static assets (Vercel)
4. Implement job queue (future)
5. Add analytics tracking (future)

## Monitoring & Logging

### Production Monitoring
\`\`\`
- Vercel Analytics (automatic)
- Supabase error logs
- Stripe error tracking
- Custom error boundaries
\`\`\`

### Debugging
\`\`\`
- Browser DevTools (client-side)
- Server logs (Vercel)
- Database logs (Supabase)
- Stripe Dashboard
\`\`\`

---

This architecture ensures:
- ✅ Security (RLS, Auth)
- ✅ Scalability (Serverless)
- ✅ Maintainability (Clear separation)
- ✅ Performance (Optimized queries)
- ✅ Reliability (Error handling)
