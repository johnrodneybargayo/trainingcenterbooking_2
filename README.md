# MarineHub - Training Center Booking Platform

An Airbnb-like platform for booking professional marine training centers and seafarer courses. Built with Next.js, Supabase, Stripe, and Tailwind CSS.

## Features

### For Seafarers (Students)
- Browse training centers by location and course details
- View comprehensive course information and requirements
- Check refund and cancellation policies before booking
- Submit required documents during booking process
- Secure payment processing with Stripe
- Manage all bookings from personal dashboard
- Cancel bookings with automatic refund calculation
- Update profile information

### For Training Centers
- Admin dashboard with booking management
- View all student bookings and documentation status
- Update booking status (pending, confirmed, completed, cancelled)
- Monitor training center statistics and revenue
- Manage course requirements and mandatory documents
- Set custom refund policies

### Platform Features
- Row Level Security (RLS) for data protection
- Refund policy automation with convenience fee calculation
- Real-time booking status tracking
- Document requirement checklist
- Responsive design for mobile and desktop
- Email verification for sign-ups
- Secure authentication with Supabase Auth

## Tech Stack

- **Frontend**: Next.js 16+ (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Backend**: Supabase (PostgreSQL), Next.js Server Actions
- **Payment**: Stripe (Embedded Checkout)
- **Authentication**: Supabase Auth (Email/Password)
- **Deployment**: Vercel-ready

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Homepage with training centers grid
│   ├── auth/
│   │   ├── login/page.tsx        # Login page
│   │   ├── sign-up/page.tsx      # Sign-up page
│   │   └── sign-up-success/page.tsx
│   ├── training-center/[id]/page.tsx     # Center details & refund policy
│   ├── booking/[id]/page.tsx             # Requirements checklist
│   ├── payment/[bookingId]/page.tsx      # Stripe payment
│   ├── dashboard/page.tsx                # User bookings dashboard
│   ├── booking-details/[id]/page.tsx     # View booking details
│   ├── my-profile/page.tsx               # User profile management
│   ├── admin/
│   │   ├── dashboard/page.tsx    # Admin bookings overview
│   │   └── bookings/[id]/page.tsx # Admin booking management
│   └── globals.css               # Global styles
│
├── components/
│   ├── navbar.tsx               # Navigation with auth state
│   ├── training-center-card.tsx  # Training center card component
│   ├── refund-policy-card.tsx    # Refund policy display
│   ├── checkout.tsx             # Stripe embedded checkout
│   └── ui/                      # shadcn/ui components
│
├── lib/
│   ├── products.ts              # TypeScript interfaces
│   ├── stripe.ts                # Stripe client
│   ├── utils.ts                 # Utility functions
│   └── supabase/
│       ├── client.ts            # Browser Supabase client
│       └── server.ts            # Server Supabase client
│
├── scripts/
│   ├── 001_create_tables.sql    # Database schema
│   └── 002_insert_demo_data.sql # Demo data (6 training centers)
│
└── DATABASE_SETUP.md            # Database setup guide
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account and project
- Stripe account (development/test mode)

### Installation

1. **Clone or setup project**
   ```bash
   cd marinehub
   npm install
   ```

2. **Set up environment variables**
   Create `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
   ```

3. **Setup Supabase Database**
   - See `DATABASE_SETUP.md` for detailed instructions
   - Execute `scripts/001_create_tables.sql`
   - Execute `scripts/002_insert_demo_data.sql`

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to `http://localhost:3000`

## Usage

### Student Workflow
1. Sign up or login at `/auth/login`
2. Browse training centers on homepage
3. Click a training center to view details and refund policy
4. Click "Book Now" to start booking process
5. Complete required documents checklist
6. Proceed to payment with Stripe test card
7. View booking in dashboard

### Admin Workflow
1. Login with admin account
2. Navigate to `/admin/dashboard`
3. View all bookings and statistics
4. Click "View" on any booking to manage
5. Update booking status as needed

### Stripe Test Payment
Use card number: `4242 4242 4242 4242`
- Any future expiration date
- Any 3-digit CVC

## Database Schema Overview

### Key Tables
- **profiles** - User information (student/admin/training_center_admin)
- **training_centers** - Marine training center listings (6 demo centers)
- **requirements** - Course document requirements (23 total)
- **refund_policies** - Cancellation and refund rules per center
- **bookings** - Student bookings with payment tracking
- **booking_requirements** - Track document completion per booking

See `DATABASE_SETUP.md` for full schema details.

## Refund Policy

Standard refund policy applied to all training centers:
- **30+ days before training**: 100% refund
- **15-29 days before training**: 50% refund
- **7-14 days before training**: 25% refund
- **Less than 7 days**: No refund (except convenience fee)

2% convenience fee is applied and deducted from refunds.

## Key Features Explained

### Requirements Checklist
- Students must submit mandatory documents before booking
- Optional documents can enhance their application
- Documents tracked in `booking_requirements` table
- Admins can monitor completion status

### Refund Calculation
- Automatically calculated based on cancellation date
- Considers days until training start
- Applies convenience fee deduction
- Stored in `refund_amount_cents` field

### Role-Based Access
- **Student**: Browse, book, view own data (RLS enforced)
- **Training Center Admin**: Manage own center bookings
- **Platform Admin**: Full platform access

## Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Environment Variables
Set in Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## Future Enhancements

- Video training preview
- Student reviews and ratings
- Email notifications for bookings
- Calendar integration for training dates
- Document upload and storage
- Instructor management
- Payment disputes and refund approvals
- SMS notifications
- Multi-language support

## API Routes

The app uses Next.js Server Actions for backend operations:
- `/app/actions/stripe.ts` - Stripe checkout session creation

## Support

For database setup issues, refer to `DATABASE_SETUP.md`
For Stripe integration help, see Stripe documentation: https://stripe.com/docs

## License

MIT License - feel free to use this project as a template
