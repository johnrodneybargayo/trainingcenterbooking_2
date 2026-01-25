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
  ('550e8400-e29b-41d4-a716-446655440027', 'Cebu Pacific Maritime Academy', 'Comprehensive maritime training serving the Philippines'' major shipping industry.', 'Cebu', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', 85000, 19, 4.5, 145, 32),
  ('550e8400-e29b-41d4-a716-446655440028', 'Philippine Seamans Institute', 'Entry-level and advanced training for all categories of maritime workers.', 'Manila', 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80', 65000, 15, 4.4, 156, 36),
  
  -- Poland (2 centers)
  ('550e8400-e29b-41d4-a716-446655440029', 'Gdansk Maritime University', 'Advanced European maritime engineering and officer training programs.', 'Gdansk', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80', 135000, 26, 4.7, 213, 28),
  ('550e8400-e29b-41d4-a716-446655440030', 'Baltic Sea Maritime Academy', 'Specialized training in Baltic operations, ice navigation, and regional maritime safety.', 'Gdansk', 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80', 125000, 22, 4.6, 178, 30);

-- Insert refund policies for all 21 new training centers
INSERT INTO public.refund_policies (training_center_id, days_before_training, refund_percentage, description)
VALUES
  -- Standard refund policy for all new centers (repeated for each center ID)
  ('550e8400-e29b-41d4-a716-446655440010', 30, 100, '30+ days before training - Full refund'),
  ('550e8400-e29b-41d4-a716-446655440010', 14, 50, '15-29 days before training - 50 percent refund'),
  ('550e8400-e29b-41d4-a716-446655440010', 6, 25, '7-14 days before training - 25 percent refund'),
  ('550e8400-e29b-41d4-a716-446655440010', 0, 0, 'Less than 7 days - No refund');
