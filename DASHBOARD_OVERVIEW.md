# Dashboard Overview - MarineHub

This document outlines the three professional dashboards in MarineHub for different user roles.

## Dashboard Types

### 1. Student Dashboard (`/dashboard`)
**Purpose:** For seafarers and trainees to track their course enrollments and progress

**Key Features:**
- View all personal bookings in one place
- Track booking status (pending, confirmed, completed, cancelled)
- See course details, location, and pricing
- View booking dates and payment information
- Quick access to booking details page
- Empty state with CTA to browse training centers

**Statistics Displayed:**
- Total Bookings
- Completed Courses
- Pending Courses

**What Students See:**
- Beautiful card layout of their enrollments
- Status badges with color coding
- Training center information (name, description, location)
- Quick action buttons to view details
- Mobile-responsive grid layout

---

### 2. Training Center Admin Dashboard (`/training-center-admin/dashboard`)
**Purpose:** For training center owners/managers to manage their specific training program

**Key Features:**
- Real-time enrollment statistics
- Student management interface
- Document verification system
- Revenue tracking
- Course analytics
- Quick actions panel
- Center details overview
- Recent enrollments list with status filtering

**Statistics Displayed:**
- Total Enrolled Students
- Completed Courses (graduates)
- Pending Documents (awaiting uploads)
- Average Rating (out of 5.0)
- Total Revenue (monthly/period)

**Quick Actions Available:**
- Verify Documents
- Manage Students
- View Analytics
- Schedule Class
- Edit Center Details

**What Training Center Admins See:**
- 5-card stat grid with visual indicators
- Recent enrollments with icons and status badges
- Student count and revenue metrics
- Center information sidebar
- Quick action buttons for common tasks
- Mobile-responsive dashboard

---

### 3. System Admin Dashboard (`/admin/dashboard`)
**Purpose:** For platform administrators to oversee all training centers and bookings

**Key Features:**
- System-wide statistics
- All bookings from all training centers
- Training center management overview
- Platform revenue tracking
- Data export functionality
- Settings access
- View as student simulation

**Statistics Displayed:**
- Total Bookings (system-wide)
- Pending Bookings (needing attention)
- Completed Bookings
- Total Revenue (platform-wide)
- Active Training Centers
- Total Students

**What System Admins See:**
- 6-card comprehensive stat grid
- Recent bookings from all centers (last 10)
- Training centers grid with key metrics
- Export data button
- Settings button for system configuration
- Mobile-optimized responsive layout

---

## How Users Access Each Dashboard

### Login Routing
1. User logs in at `/auth/login`
2. System checks `user_type` in profiles:
   - `student` → redirects to `/dashboard`
   - `training_center_admin` → redirects to `/training-center-admin/dashboard`
   - `admin` → redirects to `/admin/dashboard`

### Navigation
- **Navbar** shows different options based on user role
- **Settings menu** provides role-specific options
- **Quick links** in each dashboard for common actions

---

## Visual Design

All dashboards feature:
- **Modern gradient backgrounds** for visual appeal
- **Color-coded status badges** for quick scanning
- **Icon indicators** for visual hierarchy
- **Responsive grid layouts** for mobile/tablet/desktop
- **Hover effects** for interactive feedback
- **Loading states** with spinners
- **Empty states** with clear CTAs

### Color Scheme
- Primary actions: Blue gradients
- Success/Completed: Green
- Pending/Warning: Amber/Yellow
- Cancelled/Error: Red
- Revenue: Teal/Primary

---

## Data Relationships

### Student Dashboard
Queries:
- User's bookings from `bookings` table
- Training center details from `training_centers` table
- Filters by logged-in user ID

### Training Center Admin Dashboard
Queries:
- Training center data from `training_centers` table
- Bookings for that specific center
- User profile to verify `training_center_admin` role

### System Admin Dashboard
Queries:
- All bookings (no filters)
- All training centers
- User profile to verify `admin` role

---

## Mobile Responsiveness

### Breakpoints Used
- **Mobile:** xs-sm (up to 640px)
- **Tablet:** md (640px - 1024px)
- **Desktop:** lg (1024px+)

### Mobile Optimizations
- Stacked stat cards (1 column)
- Hidden labels on mobile buttons
- Simplified table layouts
- Touch-friendly button sizes
- Responsive font sizes

---

## Sample Data Integration

Each dashboard automatically:
1. Checks user authentication
2. Verifies user role
3. Fetches relevant data from Supabase
4. Calculates statistics
5. Formats currencies and dates
6. Renders with proper loading states

---

## Security Features

- **Authentication required:** All dashboards check session
- **Role-based access:** Users redirected to correct dashboard
- **Data filtering:** Each user sees only their relevant data
- **Server-side queries:** Supabase RLS handles data access

---

## Features To Come

- Real-time notifications
- Bulk actions
- Custom reporting
- Advanced analytics
- Document management
- Chat/messaging system
- Calendar integration
- Automated reports

---

## Access URLs

| Dashboard | URL | Role | Status |
|-----------|-----|------|--------|
| Student | `/dashboard` | student | Active |
| Training Center Admin | `/training-center-admin/dashboard` | training_center_admin | Active |
| System Admin | `/admin/dashboard` | admin | Active |
