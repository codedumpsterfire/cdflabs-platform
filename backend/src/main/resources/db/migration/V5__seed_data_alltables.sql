INSERT INTO users (id, supabase_uid, display_name, role, user_type, ai_usage, state, age_range, creative_field, active)
VALUES
    ('00000000-0000-0000-0000-000000000001',
     'fake-supabase-uid-admin-001',
     'Giovanni (Admin)',
     'ADMIN',
     'DEVELOPER',
     'ETHICAL_AI',
     'IL',
     '26_TO_35',
     'Software Development',
     true),

    ('00000000-0000-0000-0000-000000000002',
     'fake-supabase-uid-user-002',
     'Maya Chen',
     'USER',
     'ARTIST',
     'NO_AI',
     'NY',
     '26_TO_35',
     'Visual Art',
     true),

    ('00000000-0000-0000-0000-000000000003',
     'fake-supabase-uid-user-003',
     'Marcus Webb',
     'USER',
     'MUSICIAN',
     'ETHICAL_AI',
     'CA',
     '18_TO_25',
     'Music',
     true),

    ('00000000-0000-0000-0000-000000000004',
     'fake-supabase-uid-user-004',
     'Priya Patel',
     'USER',
     'BUSINESS_OWNER',
     'NO_AI',
     'TX',
     '36_TO_50',
     'Handmade Goods',
     true),

    ('00000000-0000-0000-0000-000000000005',
     'fake-supabase-uid-user-005',
     'Suspicious Account',
     'USER',
     'OTHER',
     'NO_AI',
     'FL',
     'PREFER_NOT_TO_SAY',
     null,
     true);

-- =============================================
-- LISTINGS
-- =============================================
INSERT INTO listings (id, user_id, listing_type, name, summary, description, ai_usage, state, personal_site_url, instagram_url, status)
VALUES
    ('10000000-0000-0000-0000-000000000001',
     '00000000-0000-0000-0000-000000000001',
     'DEVELOPER',
     'CDFxLabs',
     'Indie dev and tech consultancy. Human-built software only.',
     'Full stack developer building tools for the creative community. No generative AI used in client deliverables.',
     'ETHICAL_AI',
     'IL',
     'https://cdflabs.dev',
     'https://instagram.com/codedumpsterfire',
     'VERIFIED'),

    ('10000000-0000-0000-0000-000000000002',
     '00000000-0000-0000-0000-000000000002',
     'ARTIST',
     'Maya Chen Illustration',
     'Hand-drawn editorial illustration. Zero AI in my process.',
     'I create editorial illustrations using pen, ink, and digital tools. Every line is drawn by hand. I do not use AI image generators at any stage of my work.',
     'NO_AI',
     'NY',
     'https://mayachenillustration.com',
     'https://instagram.com/mayachendraws',
     'VERIFIED'),

    ('10000000-0000-0000-0000-000000000003',
     '00000000-0000-0000-0000-000000000003',
     'MUSICIAN',
     'Marcus Webb Music',
     'Original electronic music. I use AI for mastering assistance only.',
     'Producer and composer. I use AI-assisted mastering tools but all composition, arrangement, and performance is entirely human.',
     'ETHICAL_AI',
     'CA',
     'https://marcuswebb.bandcamp.com',
     null,
     'PENDING'),

    ('10000000-0000-0000-0000-000000000004',
     '00000000-0000-0000-0000-000000000004',
     'BUSINESS',
     'Priya Handmade',
     'Small batch handmade ceramics and candles. Everything made by hand in Austin TX.',
     'Family-run ceramics and candle business. All products handmade in small batches. No AI-generated designs, no AI copy, no AI anything.',
     'NO_AI',
     'TX',
     'https://priyahandmade.com',
     'https://instagram.com/priyahandmade',
     'VERIFIED'),

    ('10000000-0000-0000-0000-000000000005',
     '00000000-0000-0000-0000-000000000005',
     'ARTIST',
     'Totally Real Human Art',
     'Definitely human art made by human hands.',
     'Trust me I am a real human person who makes real art.',
     'NO_AI',
     'FL',
     null,
     null,
     'REJECTED');

UPDATE listings
SET rejection_reason = 'No verifiable links provided. Profile created seconds before submission. Suspected bot account.'
WHERE id = '10000000-0000-0000-0000-000000000005';

-- =============================================
-- REACTIONS
-- =============================================
INSERT INTO reactions (user_id, listing_id, reaction_type)
VALUES
    ('00000000-0000-0000-0000-000000000002',
     '10000000-0000-0000-0000-000000000001',
     'VOUCH'),

    ('00000000-0000-0000-0000-000000000003',
     '10000000-0000-0000-0000-000000000001',
     'LOVE'),

    ('00000000-0000-0000-0000-000000000001',
     '10000000-0000-0000-0000-000000000002',
     'VOUCH'),

    ('00000000-0000-0000-0000-000000000003',
     '10000000-0000-0000-0000-000000000002',
     'LOVE'),

    ('00000000-0000-0000-0000-000000000001',
     '10000000-0000-0000-0000-000000000004',
     'LOVE'),

    ('00000000-0000-0000-0000-000000000002',
     '10000000-0000-0000-0000-000000000005',
     'PISSED'),

    ('00000000-0000-0000-0000-000000000003',
     '10000000-0000-0000-0000-000000000005',
     'DISLIKE');
