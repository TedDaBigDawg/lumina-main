-- Seed script for Lumina Main Site
-- Run this after setting up your PostgreSQL database

-- Insert sample parishes
INSERT INTO "Parish" (id, name, location, description, "websiteUrl", featured, slug, "createdAt", "updatedAt") VALUES
(
  gen_random_uuid(),
  'St. Mary''s Catholic Church',
  'Austin, TX',
  'A vibrant parish community in the heart of Austin, serving families for over 50 years with traditional and contemporary worship.',
  'https://stmarys-austin.org',
  true,
  'st-marys-austin',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Holy Spirit Parish',
  'Dallas, TX',
  'Growing parish community focused on youth ministry and community outreach programs.',
  'https://holyspirit-dallas.org',
  true,
  'holy-spirit-dallas',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'St. Joseph''s Cathedral',
  'Houston, TX',
  'Historic cathedral parish serving downtown Houston with a rich tradition of liturgical excellence.',
  NULL,
  false,
  'st-josephs-houston',
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'Our Lady of Guadalupe',
  'San Antonio, TX',
  'Bilingual parish community celebrating Hispanic heritage and Catholic traditions.',
  'https://olg-sanantonio.org',
  false,
  'our-lady-guadalupe-sa',
  NOW(),
  NOW()
);

-- Insert sample demo requests
INSERT INTO "DemoRequest" (id, name, "parishName", location, phone, email, message, "createdAt") VALUES
(
  gen_random_uuid(),
  'Fr. Miguel Rodriguez',
  'Our Lady of Peace',
  'El Paso, TX',
  '(915) 555-0123',
  'pastor@olp-elpaso.org',
  'We are a growing Hispanic parish looking for better ways to communicate with our bilingual community and manage our volunteer programs.',
  NOW()
),
(
  gen_random_uuid(),
  'Sarah Johnson',
  'St. Patrick''s Church',
  'Fort Worth, TX',
  '(817) 555-0456',
  'admin@stpatricks-fw.org',
  'Need help managing our large volunteer program and multiple ministries. Currently using spreadsheets and it''s getting overwhelming.',
  NOW()
),
(
  gen_random_uuid(),
  'Deacon Mark Thompson',
  'Sacred Heart Parish',
  'Corpus Christi, TX',
  NULL,
  'deacon@sacredheart-cc.org',
  'Interested in the communication features for our parish newsletter and event coordination.',
  NOW()
);

-- Insert sample feedback
INSERT INTO "Feedback" (id, name, email, message, "isPublic", "createdAt") VALUES
(
  gen_random_uuid(),
  'Fr. Michael Chen',
  'pastor@stmichael-austin.org',
  'Lumina has completely transformed how we manage our parish. The volunteer coordination features alone have saved us hours each week! Our parishioners love how easy it is to sign up for ministries.',
  true,
  NOW()
),
(
  gen_random_uuid(),
  'Maria Santos',
  'maria.santos@gmail.com',
  'Love the clean interface and how easy it is for our elderly parishioners to use. The large fonts and simple navigation make it accessible for everyone in our community.',
  true,
  NOW()
),
(
  gen_random_uuid(),
  'Parish Administrator',
  'admin@holytrinity.org',
  'The event management system is fantastic. We can now coordinate our multiple weekly events without conflicts, and families can easily see what''s happening.',
  true,
  NOW()
),
(
  gen_random_uuid(),
  NULL,
  NULL,
  'Would love to see more integration with existing church management systems like ParishSoft.',
  false,
  NOW()
),
(
  gen_random_uuid(),
  'Jennifer Walsh',
  'jwalsh@stanne-parish.org',
  'As a youth minister, I appreciate how Lumina helps me organize events and communicate with parents. The permission slip feature is a game-changer!',
  true,
  NOW()
),
(
  gen_random_uuid(),
  'Fr. David Kim',
  NULL,
  'The prayer request feature has brought our community closer together. People feel more connected knowing their intentions are being shared and prayed for.',
  true,
  NOW()
);
