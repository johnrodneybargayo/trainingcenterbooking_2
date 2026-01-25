-- Create profiles table for user information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  user_type TEXT DEFAULT 'student', -- 'student', 'admin', 'training_center_admin'
  training_center_id UUID,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Create training centers table
CREATE TABLE IF NOT EXISTS public.training_centers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT,
  price_cents INTEGER NOT NULL,
  duration_days INTEGER NOT NULL,
  rating DECIMAL(3,2) DEFAULT 4.5,
  reviews_count INTEGER DEFAULT 0,
  capacity INTEGER DEFAULT 30,
  admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.training_centers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "training_centers_select_all" ON public.training_centers FOR SELECT USING (true);
CREATE POLICY "training_centers_update_own_admin" ON public.training_centers FOR UPDATE USING (auth.uid() = admin_id);

-- Create requirements table
CREATE TABLE IF NOT EXISTS public.requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  training_center_id UUID NOT NULL REFERENCES public.training_centers(id) ON DELETE CASCADE,
  requirement_name TEXT NOT NULL,
  requirement_type TEXT NOT NULL,
  is_mandatory BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.requirements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "requirements_select_all" ON public.requirements FOR SELECT USING (true);

-- Create refund policies table
CREATE TABLE IF NOT EXISTS public.refund_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  training_center_id UUID NOT NULL REFERENCES public.training_centers(id) ON DELETE CASCADE,
  days_before_training INTEGER NOT NULL,
  refund_percentage INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.refund_policies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "refund_policies_select_all" ON public.refund_policies FOR SELECT USING (true);

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  training_center_id UUID NOT NULL REFERENCES public.training_centers(id) ON DELETE CASCADE,
  booking_date TIMESTAMPTZ NOT NULL,
  training_start_date TIMESTAMPTZ,
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
  payment_id TEXT,
  price_cents INTEGER NOT NULL,
  convenience_fee_cents INTEGER DEFAULT 0,
  refund_amount_cents INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  cancelled_at TIMESTAMPTZ
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "bookings_select_own" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "bookings_insert_own" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "bookings_update_own" ON public.bookings FOR UPDATE USING (auth.uid() = user_id);

-- Create booking requirements table (tracking which requirements are completed)
CREATE TABLE IF NOT EXISTS public.booking_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  requirement_id UUID NOT NULL REFERENCES public.requirements(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT false,
  document_url TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.booking_requirements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "booking_requirements_select_own" ON public.booking_requirements FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.bookings WHERE bookings.id = booking_requirements.booking_id AND bookings.user_id = auth.uid()));
CREATE POLICY "booking_requirements_update_own" ON public.booking_requirements FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.bookings WHERE bookings.id = booking_requirements.booking_id AND bookings.user_id = auth.uid()));
