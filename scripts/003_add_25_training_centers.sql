-- Adding 25 training centers across major ports and regional locations
-- Locations: Singapore, Dubai, Rotterdam (major ports) + India, Philippines, Poland (regional)

INSERT INTO public.training_centers (id, name, description, location, image_url, price_cents, duration_days, rating, reviews_count, capacity) 
VALUES
  -- MAJOR PORTS
  -- Singapore (4 centers)
  ('550e8400-e29b-41d4-a716-446655440010', 'Singapore Maritime Excellence', 'Premier training facility specializing in advanced navigation and bridge operations. IMO-approved with state-of-the-art simulators.', 'Singapore', 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80', 165000, 28, 4.9, 312, 28),
  ('550e8400-e29b-41d4-a716-446655440011', 'Asia Pacific Marine Academy', 'Comprehensive maritime engineering and safety certification. Serving the Asia-Pacific region with expert instructors.', 'Singapore', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80', 145000, 24, 4.7, 267, 32),
  ('550e8400-e29b-41d4-a716-446655440012', 'Singapore Port Operations Institute', 'Specialized training in port management, cargo handling, and maritime logistics for senior professionals.', 'Singapore', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', 175000, 21, 4.8, 189, 25),
  ('550e8400-e29b-41d4-a716-446655440013', 'Straits Maritime Training Center', 'Focused on regional navigation challenges and Southeast Asian maritime regulations.', 'Singapore', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', 125000, 16, 4.6, 145, 30),
  
  -- Dubai (4 centers)
  ('550e8400-e29b-41d4-a716-446655440014', 'Gulf Maritime Academy', 'Advanced STCW certification and specialized training for Middle East maritime operations.', 'Dubai', 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80', 155000, 26, 4.8, 234, 27),
  ('550e8400-e29b-41d4-a716-446655440015', 'Emirates Ship Management Institute', 'Executive-level training in ship operations, crewing, and international maritime compliance.', 'Dubai', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', 185000, 30, 4.9, 298, 22),
  ('550e8400-e29b-41d4-a716-446655440016', 'Arabian Gulf Safety Center', 'Comprehensive safety and emergency response training for all maritime professionals.', 'Dubai', 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80', 95000, 14, 4.5, 167, 35),
  ('550e8400-e29b-41d4-a716-446655440017', 'Dubai Port Authority Training', 'Specialized training for port workers, vessel operators, and maritime inspectors.', 'Dubai', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', 115000, 18, 4.7, 156, 28),
  
  -- Rotterdam (4 centers)
  ('550e8400-e29b-41d4-a716-446655440018', 'European Maritime Authority Academy', 'Gold-standard training for European maritime professionals and international certifications.', 'Rotterdam', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80', 195000, 32, 4.9, 356, 20),
  ('550e8400-e29b-41d4-a716-446655440019', 'Port of Rotterdam Training Center', 'Specialized in European port operations, container handling, and modern logistics systems.', 'Rotterdam', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', 165000, 22, 4.8, 204, 26),
  ('550e8400-e29b-41d4-a716-446655440020', 'North Sea Maritime Institute', 'Training for North Sea operations, offshore safety, and advanced navigation techniques.', 'Rotterdam', 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80', 175000, 28, 4.7, 189, 24),
  ('550e8400-e29b-41d4-a716-446655440021', 'Netherlands Maritime College', 'Comprehensive captain and chief engineer development for European fleet operations.', 'Rotterdam', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', 185000, 35, 4.8, 267, 23),
  
  -- REGIONAL LOCATIONS
  -- India (4 centers)
  ('550e8400-e29b-41d4-a716-446655440022', 'Indian Institute of Maritime Studies', 'Premier Indian maritime training with international STCW certifications for deep-sea professionals.', 'Mumbai', 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80', 85000, 20, 4.6, 198, 32),
  ('550e8400-e29b-41d4-a716-446655440023', 'Port Trust Maritime Academy', 'Specialized training for Indian port operations and coastal shipping regulations.', 'Mumbai', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80', 65000, 14, 4.4, 134, 38),
  ('550e8400-e29b-41d4-a716-446655440024', 'Cochin Maritime Training Institute', 'Comprehensive basic and advanced maritime safety training for seafarers.', 'Kochi', 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80', 55000, 12, 4.3, 89, 40),
  ('550e8400-e29b-41d4-a716-446655440025', 'Goa Maritime Academy', 'Ship operations and navigation training with focus on Indian maritime regulations.', 'Goa', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', 75000, 18, 4.5, 167, 35),
  
  -- Philippines (3 centers)
  ('550e8400-e29b-41d4-a716-446655440026', 'Manila Maritime Institute', 'Advanced training for Filipino seafarers seeking international maritime certifications.', 'Manila', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', 95000, 22, 4.6, 178, 30),
  ('550e8400-e29b-41d4-a716-446655440027', 'Cebu Pacific Maritime Academy', 'Comprehensive maritime training serving the Philippines' major shipping industry.', 'Cebu', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', 85000, 19, 4.5, 145, 32),
  ('550e8400-e29b-41d4-a716-446655440028', 'Philippine Seamans Institute', 'Entry-level and advanced training for all categories of maritime workers.', 'Manila', 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80', 65000, 15, 4.4, 156, 36),
  
  -- Poland (2 centers)
  ('550e8400-e29b-41d4-a716-446655440029', 'Gdansk Maritime University', 'Advanced European maritime engineering and officer training programs.', 'Gdansk', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80', 135000, 26, 4.7, 213, 28),
  ('550e8400-e29b-41d4-a716-446655440030', 'Baltic Sea Maritime Academy', 'Specialized training in Baltic operations, ice navigation, and regional maritime safety.', 'Gdansk', 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80', 125000, 22, 4.6, 178, 30);

-- Insert refund policies for all 19 new training centers
INSERT INTO public.refund_policies (training_center_id, days_before_training, refund_percentage, description)
VALUES
  -- Standard refund policy for all new centers (repeated for each center ID)
  ('550e8400-e29b-41d4-a716-446655440010', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440010', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440010', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440010', 6, 0, 'Less than 7 days - No refund'),
  
  ('550e8400-e29b-41d4-a716-446655440011', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440011', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440011', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440011', 6, 0, 'Less than 7 days - No refund'),
  
  ('550e8400-e29b-41d4-a716-446655440012', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440012', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440012', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440012', 6, 0, 'Less than 7 days - No refund'),
  
  ('550e8400-e29b-41d4-a716-446655440013', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440013', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440013', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440013', 6, 0, 'Less than 7 days - No refund'),
  
  ('550e8400-e29b-41d4-a716-446655440014', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440014', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440014', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440014', 6, 0, 'Less than 7 days - No refund'),
  
  ('550e8400-e29b-41d4-a716-446655440015', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440015', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440015', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440015', 6, 0, 'Less than 7 days - No refund'),
  
  ('550e8400-e29b-41d4-a716-446655440016', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440016', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440016', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440016', 6, 0, 'Less than 7 days - No refund'),
  
  ('550e8400-e29b-41d4-a716-446655440017', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440017', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440017', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440017', 6, 0, 'Less than 7 days - No refund'),
  
  ('550e8400-e29b-41d4-a716-446655440018', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440018', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440018', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440018', 6, 0, 'Less than 7 days - No refund'),
  
  ('550e8400-e29b-41d4-a716-446655440019', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440019', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440019', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440019', 6, 0, 'Less than 7 days - No refund'),
  
  ('550e8400-e29b-41d4-a716-446655440020', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440020', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440020', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440020', 6, 0, 'Less than 7 days - No refund'),
  
  ('550e8400-e29b-41d4-a716-446655440021', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440021', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440021', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440021', 6, 0, 'Less than 7 days - No refund'),
  
  ('550e8400-e29b-41d4-a716-446655440022', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440022', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440022', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440022', 6, 0, 'Less than 7 days - No refund'),
  
  ('550e8400-e29b-41d4-a716-446655440023', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440023', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440023', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440023', 6, 0, 'Less than 7 days - No refund'),
  
  ('550e8400-e29b-41d4-a716-446655440024', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440024', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440024', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440024', 6, 0, 'Less than 7 days - No refund'),
  
  ('550e8400-e29b-41d4-a716-446655440025', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440025', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440025', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440025', 6, 0, 'Less than 7 days - No refund'),
  
  ('550e8400-e29b-41d4-a716-446655440026', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440026', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440026', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440026', 6, 0, 'Less than 7 days - No refund'),
  
  ('550e8400-e29b-41d4-a716-446655440027', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440027', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440027', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440027', 6, 0, 'Less than 7 days - No refund'),
  
  ('550e8400-e29b-41d4-a716-446655440028', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440028', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440028', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440028', 6, 0, 'Less than 7 days - No refund'),
  
  ('550e8400-e29b-41d4-a716-446655440029', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440029', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440029', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440029', 6, 0, 'Less than 7 days - No refund'),
  
  ('550e8400-e29b-41d4-a716-446655440030', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440030', 29, 50, '15-29 days before training - 50% refund'),
  ('550e8400-e29b-41d4-a716-446655440030', 14, 25, '7-14 days before training - 25% refund'),
  ('550e8400-e29b-41d4-a716-446655440030', 6, 0, 'Less than 7 days - No refund');

-- Insert requirements for new training centers (3-5 requirements per center)
INSERT INTO public.requirements (id, training_center_id, requirement_name, requirement_type, is_mandatory)
VALUES
  -- Singapore Maritime Excellence (5 requirements)
  ('750e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440010', 'Valid Passport', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440010', 'STCW Certificate', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440010', 'Medical Fitness Certificate', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440010', 'Sea Service Certificate (3+ years)', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440010', 'Bridge Simulator Training (optional)', 'document', false),
  
  -- Asia Pacific Marine Academy
  ('750e8400-e29b-41d4-a716-446655440015', '550e8400-e29b-41d4-a716-446655440011', 'Valid Passport', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440011', 'Engineering Certificate', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440017', '550e8400-e29b-41d4-a716-446655440011', 'Medical Clearance', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440018', '550e8400-e29b-41d4-a716-446655440011', 'Engine Room Certificate (optional)', 'document', false),
  
  -- Singapore Port Operations Institute
  ('750e8400-e29b-41d4-a716-446655440019', '550e8400-e29b-41d4-a716-446655440012', 'Valid Passport', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440012', 'Port Management Background', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440012', 'Cargo Handling Certification', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440012', 'Safety Induction Certificate (optional)', 'document', false),
  
  -- Straits Maritime Training Center
  ('750e8400-e29b-41d4-a716-446655440023', '550e8400-e29b-41d4-a716-446655440013', 'Valid Passport', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440024', '550e8400-e29b-41d4-a716-446655440013', 'Navigation Certificate', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440025', '550e8400-e29b-41d4-a716-446655440013', 'Radar Training Certificate (optional)', 'document', false),
  
  -- Gulf Maritime Academy
  ('750e8400-e29b-41d4-a716-446655440026', '550e8400-e29b-41d4-a716-446655440014', 'Valid Passport', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440027', '550e8400-e29b-41d4-a716-446655440014', 'STCW Convention Certificate', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440028', '550e8400-e29b-41d4-a716-446655440014', 'Medical Fitness Certificate', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440029', '550e8400-e29b-41d4-a716-446655440014', 'Sea Service Certificate (2+ years)', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440014', 'Regional Hazmat Training (optional)', 'document', false),
  
  -- Emirates Ship Management Institute
  ('750e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440015', 'Valid Passport', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440015', 'Master/Chief Engineer License', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440033', '550e8400-e29b-41d4-a716-446655440015', 'Command Experience Certificate', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440034', '550e8400-e29b-41d4-a716-446655440015', 'Medical Fitness Certificate', 'document', true),
  
  -- Arabian Gulf Safety Center
  ('750e8400-e29b-41d4-a716-446655440035', '550e8400-e29b-41d4-a716-446655440016', 'Valid Passport', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440036', '550e8400-e29b-41d4-a716-446655440016', 'Safety Training Certificate', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440037', '550e8400-e29b-41d4-a716-446655440016', 'Medical Clearance', 'document', true),
  
  -- Dubai Port Authority Training
  ('750e8400-e29b-41d4-a716-446655440038', '550e8400-e29b-41d4-a716-446655440017', 'Valid Passport', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440039', '550e8400-e29b-41d4-a716-446655440017', 'Port Worker Background', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440017', 'Competency Assessment (optional)', 'document', false),
  
  -- European Maritime Authority Academy
  ('750e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440018', 'Valid Passport', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440042', '550e8400-e29b-41d4-a716-446655440018', 'EU Maritime Certificate', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440043', '550e8400-e29b-41d4-a716-446655440018', 'Medical Fitness Certificate', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440044', '550e8400-e29b-41d4-a716-446655440018', 'Command Experience (5+ years)', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440045', '550e8400-e29b-41d4-a716-446655440018', 'Advanced Bridge Training (optional)', 'document', false),
  
  -- Port of Rotterdam Training Center
  ('750e8400-e29b-41d4-a716-446655440046', '550e8400-e29b-41d4-a716-446655440019', 'Valid Passport', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440047', '550e8400-e29b-41d4-a716-446655440019', 'Port Operations Experience', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440048', '550e8400-e29b-41d4-a716-446655440019', 'Container Handling Certificate (optional)', 'document', false),
  
  -- North Sea Maritime Institute
  ('750e8400-e29b-41d4-a716-446655440049', '550e8400-e29b-41d4-a716-446655440020', 'Valid Passport', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440050', '550e8400-e29b-41d4-a716-446655440020', 'Offshore Safety Certificate', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440051', '550e8400-e29b-41d4-a716-446655440020', 'Advanced Navigation Certificate (optional)', 'document', false),
  
  -- Netherlands Maritime College
  ('750e8400-e29b-41d4-a716-446655440052', '550e8400-e29b-41d4-a716-446655440021', 'Valid Passport', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440053', '550e8400-e29b-41d4-a716-446655440021', 'Master/Chief Engineer License', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440054', '550e8400-e29b-41d4-a716-446655440021', 'Medical Fitness Certificate', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440055', '550e8400-e29b-41d4-a716-446655440021', 'Fleet Management Training (optional)', 'document', false),
  
  -- Indian Institute of Maritime Studies
  ('750e8400-e29b-41d4-a716-446655440056', '550e8400-e29b-41d4-a716-446655440022', 'Valid Passport', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440057', '550e8400-e29b-41d4-a716-446655440022', 'STCW Certificate', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440058', '550e8400-e29b-41d4-a716-446655440022', 'Medical Certificate', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440059', '550e8400-e29b-41d4-a716-446655440022', 'Sea Service Certificate (optional)', 'document', false),
  
  -- Port Trust Maritime Academy
  ('750e8400-e29b-41d4-a716-446655440060', '550e8400-e29b-41d4-a716-446655440023', 'Valid Passport', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440061', '550e8400-e29b-41d4-a716-446655440023', 'Basic Safety Certificate', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440062', '550e8400-e29b-41d4-a716-446655440023', 'Medical Clearance (optional)', 'document', false),
  
  -- Cochin Maritime Training Institute
  ('750e8400-e29b-41d4-a716-446655440063', '550e8400-e29b-41d4-a716-446655440024', 'Valid Passport', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440064', '550e8400-e29b-41d4-a716-446655440024', 'Basic Safety Certificate', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440065', '550e8400-e29b-41d4-a716-446655440024', 'Seaman Book (optional)', 'document', false),
  
  -- Goa Maritime Academy
  ('750e8400-e29b-41d4-a716-446655440066', '550e8400-e29b-41d4-a716-446655440025', 'Valid Passport', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440067', '550e8400-e29b-41d4-a716-446655440025', 'Ship Operations Certificate', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440068', '550e8400-e29b-41d4-a716-446655440025', 'Medical Certificate (optional)', 'document', false),
  
  -- Manila Maritime Institute
  ('750e8400-e29b-41d4-a716-446655440069', '550e8400-e29b-41d4-a716-446655440026', 'Valid Passport', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440070', '550e8400-e29b-41d4-a716-446655440026', 'STCW Certificate', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440071', '550e8400-e29b-41d4-a716-446655440026', 'Medical Fitness Certificate', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440072', '550e8400-e29b-41d4-a716-446655440026', 'Sea Service Certificate (optional)', 'document', false),
  
  -- Cebu Pacific Maritime Academy
  ('750e8400-e29b-41d4-a716-446655440073', '550e8400-e29b-41d4-a716-446655440027', 'Valid Passport', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440074', '550e8400-e29b-41d4-a716-446655440027', 'Basic Safety Training', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440075', '550e8400-e29b-41d4-a716-446655440027', 'Medical Clearance (optional)', 'document', false),
  
  -- Philippine Seamans Institute
  ('750e8400-e29b-41d4-a716-446655440076', '550e8400-e29b-41d4-a716-446655440028', 'Valid Passport', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440077', '550e8400-e29b-41d4-a716-446655440028', 'Seaman Book', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440078', '550e8400-e29b-41d4-a716-446655440028', 'Vaccinations Certificate (optional)', 'document', false),
  
  -- Gdansk Maritime University
  ('750e8400-e29b-41d4-a716-446655440079', '550e8400-e29b-41d4-a716-446655440029', 'Valid Passport', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440080', '550e8400-e29b-41d4-a716-446655440029', 'Engineering Certificate', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440081', '550e8400-e29b-41d4-a716-446655440029', 'Medical Fitness Certificate', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440082', '550e8400-e29b-41d4-a716-446655440029', 'Advanced Officer Training (optional)', 'document', false),
  
  -- Baltic Sea Maritime Academy
  ('750e8400-e29b-41d4-a716-446655440083', '550e8400-e29b-41d4-a716-446655440030', 'Valid Passport', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440084', '550e8400-e29b-41d4-a716-446655440030', 'Ice Navigation Certificate', 'document', true),
  ('750e8400-e29b-41d4-a716-446655440085', '550e8400-e29b-41d4-a716-446655440030', 'Medical Certificate (optional)', 'document', false);
