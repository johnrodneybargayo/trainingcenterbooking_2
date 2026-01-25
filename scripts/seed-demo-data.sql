-- This script seeds the database with demo data for the training center booking platform

-- Insert Training Centers
INSERT INTO training_centers (id, name, description, location, image_url, price_cents, duration_days, rating, reviews_count, capacity, created_at, updated_at) VALUES
('center-001', 'Maritime Academy International', 'Leading maritime training institute offering comprehensive courses in navigation, marine engineering, and seafarer safety.', 'Rotterdam, Netherlands', '/maritime-training-center.jpg', 180000, 14, 4.8, 247, 30, '2024-01-15T00:00:00Z', '2024-01-15T00:00:00Z'),
('center-002', 'Global Shipping Institute', 'Specialized in officer certification programs and advanced maritime competency training.', 'Singapore', '/nautical-training.jpg', 220000, 21, 4.6, 189, 25, '2024-02-20T00:00:00Z', '2024-02-20T00:00:00Z'),
('center-003', 'Ocean Engineering Training Center', 'Experts in marine engineering, vessel operations, and technical maritime skills.', 'Dubai, UAE', '/marine-engineering-training.jpg', 200000, 28, 4.7, 156, 20, '2024-03-10T00:00:00Z', '2024-03-10T00:00:00Z'),
('center-004', 'Advanced Maritime Solutions', 'Comprehensive safety and survival training for maritime professionals.', 'Mumbai, India', '/maritime-training-center.jpg', 150000, 10, 4.5, 203, 35, '2024-04-05T00:00:00Z', '2024-04-05T00:00:00Z'),
('center-005', 'SeaCrew Academy', 'Focused on crew management, STCW compliance, and bridge operations training.', 'Manila, Philippines', '/nautical-training.jpg', 170000, 12, 4.4, 134, 32, '2024-05-12T00:00:00Z', '2024-05-12T00:00:00Z');

-- Insert Courses
INSERT INTO courses (id, training_center_id, name, description, duration_hours, capacity) VALUES
('course-001', 'center-001', 'Basic Safety Training (BST)', 'STCW compliant basic safety training course', 42, 30),
('course-002', 'center-001', 'Advanced Firefighting', 'Advanced firefighting and emergency response', 40, 20),
('course-003', 'center-002', 'Officer of the Watch (OOW)', 'Officer certification program', 168, 25),
('course-004', 'center-002', 'Chief Engineer Preparation', 'Chief engineer officer certification', 240, 15),
('course-005', 'center-003', 'Marine Engineering Fundamentals', 'Core marine engineering principles', 120, 20),
('course-006', 'center-003', 'Diesel Engine Management', 'Main engine and auxiliary systems management', 80, 18),
('course-007', 'center-004', 'Sea Survival Training', 'Personal survival techniques and survival craft operation', 30, 35),
('course-008', 'center-004', 'Medical First Aid at Sea', 'Medical training for seafarers', 50, 25),
('course-009', 'center-005', 'Bridge Resource Management', 'Effective bridge team communication and coordination', 35, 32),
('course-010', 'center-005', 'Navigation & Passage Planning', 'Advanced navigation and route planning', 60, 28);

-- Insert Students (User profiles with type 'student')
INSERT INTO profiles (id, first_name, last_name, email, phone, company, user_type, training_center_id, created_at) VALUES
('user-001', 'Ahmed', 'Hassan', 'ahmed.hassan@maritime.com', '+971501234567', 'Emirates Shipping', 'student', NULL, '2024-01-10T00:00:00Z'),
('user-002', 'Maria', 'Santos', 'maria.santos@oceanceeds.com', '+60123456789', 'Ocean Fleet Ltd', 'student', NULL, '2024-01-15T00:00:00Z'),
('user-003', 'James', 'Wilson', 'james.wilson@shipco.uk', '+447911123456', 'Wilson Shipping Group', 'student', NULL, '2024-02-05T00:00:00Z'),
('user-004', 'Priya', 'Sharma', 'priya.sharma@indianship.com', '+919876543210', 'Indian Maritime Corp', 'student', NULL, '2024-02-20T00:00:00Z'),
('user-005', 'Carlos', 'Rodriguez', 'carlos.rodriguez@latinship.es', '+34912345678', 'Latin Shipping Co', 'student', NULL, '2024-03-10T00:00:00Z'),
('user-006', 'Lin', 'Chen', 'lin.chen@asianmarine.cn', '+8613800138000', 'Asian Marine Services', 'student', NULL, '2024-03-25T00:00:00Z');

-- Insert Training Center Admins
INSERT INTO profiles (id, first_name, last_name, email, phone, company, user_type, training_center_id, created_at) VALUES
('admin-center-001', 'Robert', 'van der Berg', 'robert@maritimeacademy.nl', '+31104567890', 'Maritime Academy International', 'training_center_admin', 'center-001', '2024-01-01T00:00:00Z'),
('admin-center-002', 'Deepak', 'Patel', 'deepak@globalshipping.sg', '+6565123456', 'Global Shipping Institute', 'training_center_admin', 'center-002', '2024-02-01T00:00:00Z'),
('admin-center-003', 'Fatima', 'Al-Mansouri', 'fatima@oceanengineering.ae', '+97143456789', 'Ocean Engineering Training Center', 'training_center_admin', 'center-003', '2024-03-01T00:00:00Z'),
('admin-center-004', 'Rajesh', 'Kumar', 'rajesh@advancedmaritime.in', '+919112345678', 'Advanced Maritime Solutions', 'training_center_admin', 'center-004', '2024-04-01T00:00:00Z'),
('admin-center-005', 'Anna', 'Fernandez', 'anna@seacrew.ph', '+639178901234', 'SeaCrew Academy', 'training_center_admin', 'center-005', '2024-05-01T00:00:00Z');

-- Insert Platform Admins
INSERT INTO profiles (id, first_name, last_name, email, phone, company, user_type, training_center_id, created_at) VALUES
('admin-platform-001', 'Sarah', 'Thompson', 'sarah@trainingcenterbooking.com', '+44201234567', 'Training Center Booking Platform', 'admin', NULL, '2024-01-01T00:00:00Z'),
('admin-platform-002', 'Michael', 'Zhang', 'michael@trainingcenterbooking.com', '+86108123456', 'Training Center Booking Platform', 'admin', NULL, '2024-01-01T00:00:00Z');

-- Insert Bookings
INSERT INTO bookings (id, user_id, training_center_id, booking_date, training_start_date, status, payment_id, price_cents, convenience_fee_cents, created_at) VALUES
('booking-001', 'user-001', 'center-001', '2024-01-20T10:30:00Z', '2024-02-15T08:00:00Z', 'confirmed', 'pay-001', 180000, 5400, '2024-01-20T10:30:00Z'),
('booking-002', 'user-002', 'center-002', '2024-01-25T14:15:00Z', '2024-03-01T08:00:00Z', 'confirmed', 'pay-002', 220000, 6600, '2024-01-25T14:15:00Z'),
('booking-003', 'user-003', 'center-003', '2024-02-01T09:45:00Z', '2024-03-15T08:00:00Z', 'pending', NULL, 200000, 6000, '2024-02-01T09:45:00Z'),
('booking-004', 'user-004', 'center-001', '2024-02-05T11:20:00Z', '2024-02-25T08:00:00Z', 'confirmed', 'pay-004', 180000, 5400, '2024-02-05T11:20:00Z'),
('booking-005', 'user-005', 'center-004', '2024-02-10T13:30:00Z', '2024-03-05T08:00:00Z', 'completed', 'pay-005', 150000, 4500, '2024-02-10T13:30:00Z'),
('booking-006', 'user-006', 'center-002', '2024-02-15T10:00:00Z', '2024-04-01T08:00:00Z', 'confirmed', 'pay-006', 220000, 6600, '2024-02-15T10:00:00Z'),
('booking-007', 'user-001', 'center-005', '2024-02-20T15:45:00Z', '2024-04-10T08:00:00Z', 'confirmed', 'pay-007', 170000, 5100, '2024-02-20T15:45:00Z'),
('booking-008', 'user-003', 'center-004', '2024-02-22T12:15:00Z', '2024-03-20T08:00:00Z', 'pending', NULL, 150000, 4500, '2024-02-22T12:15:00Z'),
('booking-009', 'user-002', 'center-003', '2024-02-25T16:30:00Z', '2024-05-01T08:00:00Z', 'confirmed', 'pay-009', 200000, 6000, '2024-02-25T16:30:00Z'),
('booking-010', 'user-004', 'center-005', '2024-03-01T08:00:00Z', '2024-04-15T08:00:00Z', 'completed', 'pay-010', 170000, 5100, '2024-03-01T08:00:00Z');
