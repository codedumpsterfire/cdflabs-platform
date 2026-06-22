-- V6: Additional seed data for richer testing
-- Adds 20 more users (IDs 6-25), 13 listings, and reactions across the dataset.
-- NOTE: instagram_url is NOT a column on listings (matches V2 schema exactly).

-- =============================================
-- USERS (20 more)
-- =============================================
INSERT INTO users (id, supabase_uid, display_name, role, user_type, ai_usage, state, age_range, creative_field, active, flagged_for_review, paid_member)
VALUES
    ('00000000-0000-0000-0000-000000000006', 'fake-supabase-uid-user-006', 'Jamie Rodriguez',
     'USER', 'ARTIST', 'NO_AI', 'OR', '18_TO_25', 'Oil Painting', true, false, false),

    ('00000000-0000-0000-0000-000000000007', 'fake-supabase-uid-user-007', 'Theodore Blackwood',
     'USER', 'WRITER', 'NO_AI', 'ME', '36_TO_50', 'Fiction Writing', true, false, true),

    ('00000000-0000-0000-0000-000000000008', 'fake-supabase-uid-user-008', 'Nora Whitfield',
     'USER', 'FILMMAKER', 'ETHICAL_AI', 'CA', '36_TO_50', 'Documentary Film', true, false, true),

    ('00000000-0000-0000-0000-000000000009', 'fake-supabase-uid-user-009', 'Devon Park',
     'USER', 'DEVELOPER', 'ETHICAL_AI', 'WA', '26_TO_35', 'Game Development', true, false, false),

    ('00000000-0000-0000-0000-000000000010', 'fake-supabase-uid-user-010', 'Carmen Vasquez',
     'USER', 'BUSINESS_OWNER', 'NO_AI', 'NM', '36_TO_50', 'Textile Goods', true, false, false),

    ('00000000-0000-0000-0000-000000000011', 'fake-supabase-uid-user-011', 'Russell Bain',
     'USER', 'SUPPORTER', 'NO_AI', 'IL', 'OVER_50', null, true, false, true),

    ('00000000-0000-0000-0000-000000000012', 'fake-supabase-uid-user-012', 'Yuki Tanaka',
     'USER', 'MUSICIAN', 'NO_AI', 'HI', '26_TO_35', 'Jazz Composition', true, false, false),

    ('00000000-0000-0000-0000-000000000013', 'fake-supabase-uid-user-013', 'Elias Frome',
     'USER', 'ARTIST', 'ETHICAL_AI', 'VT', '26_TO_35', 'Digital Illustration', true, false, false),

    ('00000000-0000-0000-0000-000000000014', 'fake-supabase-uid-user-014', 'Anonymous Writer 42',
     'USER', 'WRITER', 'NO_AI', 'NV', 'PREFER_NOT_TO_SAY', null, true, true, false),

    ('00000000-0000-0000-0000-000000000015', 'fake-supabase-uid-user-015', 'Inez Okafor',
     'USER', 'BUSINESS_OWNER', 'NO_AI', 'GA', '36_TO_50', 'Soap & Candles', true, false, true),

    ('00000000-0000-0000-0000-000000000016', 'fake-supabase-uid-user-016', 'Cassidy Lin',
     'USER', 'FILMMAKER', 'NO_AI', 'CO', '18_TO_25', 'Short Film', true, false, false),

    ('00000000-0000-0000-0000-000000000017', 'fake-supabase-uid-user-017', 'Hollis Brennan',
     'USER', 'MUSICIAN', 'ETHICAL_AI', 'TN', '26_TO_35', 'Folk Music', true, false, false),

    ('00000000-0000-0000-0000-000000000018', 'fake-supabase-uid-user-018', 'Sage Kowalski',
     'USER', 'DEVELOPER', 'ETHICAL_AI', 'MA', '26_TO_35', 'Open Source Tools', true, false, true),

    ('00000000-0000-0000-0000-000000000019', 'fake-supabase-uid-user-019', 'Real Human Artist 99',
     'USER', 'ARTIST', 'NO_AI', 'AZ', 'UNDER_18', 'Digital Art', true, true, false),

    ('00000000-0000-0000-0000-000000000020', 'fake-supabase-uid-user-020', 'Patricia Wells',
     'USER', 'SUPPORTER', 'NO_AI', 'MI', 'OVER_50', null, true, false, false),

    ('00000000-0000-0000-0000-000000000021', 'fake-supabase-uid-user-021', 'Bram Holloway',
     'USER', 'BUSINESS_OWNER', 'NO_AI', 'WI', '36_TO_50', 'Woodworking', true, false, false),

    ('00000000-0000-0000-0000-000000000022', 'fake-supabase-uid-user-022', 'Mira Acharya',
     'USER', 'WRITER', 'NO_AI', 'NJ', '18_TO_25', 'Poetry', true, false, false),

    ('00000000-0000-0000-0000-000000000023', 'fake-supabase-uid-user-023', 'Quinn Albright',
     'USER', 'OTHER', 'NO_AI', 'PA', '26_TO_35', null, true, false, false),

    ('00000000-0000-0000-0000-000000000024', 'fake-supabase-uid-user-024', 'DJ Suspicious',
     'USER', 'MUSICIAN', 'ETHICAL_AI', 'NV', 'PREFER_NOT_TO_SAY', 'DJ Mixing', true, true, false),

    ('00000000-0000-0000-0000-000000000025', 'fake-supabase-uid-user-025', 'Rowan Castellanos',
     'USER', 'ARTIST', 'NO_AI', 'NC', '26_TO_35', 'Printmaking', true, false, true);


-- =============================================
-- LISTINGS (13 - instagram_url column removed, matches actual V2 schema)
-- Users 6, 9, 11, 16, 20, 22, 23 intentionally have NO listing
-- =============================================
INSERT INTO listings (id, user_id, listing_type, name, summary, description, ai_usage, state, personal_site_url, status)
VALUES
    ('10000000-0000-0000-0000-000000000007',
     '00000000-0000-0000-0000-000000000007',
     'WRITER', 'Blackwood Fiction',
     'Literary fiction author. Three novels, all written by hand and edited without AI.',
     'I write contemporary literary fiction focused on rural New England. My books are written longhand first, then typed and revised. No AI in any part of my process.',
     'NO_AI', 'ME', 'https://blackwoodfiction.com', 'VERIFIED'),

    ('10000000-0000-0000-0000-000000000008',
     '00000000-0000-0000-0000-000000000008',
     'FILMMAKER', 'Whitfield Documentary',
     'Independent documentary filmmaker. AI used only for transcription assistance.',
     'I direct documentary films about climate change and indigenous rights. AI helps transcribe hours of interview footage. Creative direction, editing, and storytelling remain entirely human.',
     'ETHICAL_AI', 'CA', 'https://whitfielddocumentary.com', 'VERIFIED'),

    ('10000000-0000-0000-0000-000000000010',
     '00000000-0000-0000-0000-000000000010',
     'BUSINESS', 'Vasquez Textiles',
     'Hand-woven textiles using traditional Southwestern techniques.',
     'Family textile business spanning three generations. Every piece is woven on traditional looms in Santa Fe. No AI in design, marketing, or production.',
     'NO_AI', 'NM', 'https://vasqueztextiles.com', 'VERIFIED'),

    ('10000000-0000-0000-0000-000000000012',
     '00000000-0000-0000-0000-000000000012',
     'MUSICIAN', 'Yuki Tanaka Quartet',
     'Live jazz composition and performance. Zero AI in writing or recording.',
     'Pianist and composer leading a jazz quartet. All compositions written by hand at the piano. Recordings made live to tape.',
     'NO_AI', 'HI', 'https://yukitanaka.bandcamp.com', 'VERIFIED'),

    ('10000000-0000-0000-0000-000000000013',
     '00000000-0000-0000-0000-000000000013',
     'ARTIST', 'Frome Studio',
     'Digital illustrator. AI used only as a sketching reference tool.',
     'I draw editorial illustrations digitally. Occasionally use AI to generate quick reference compositions which I then redraw entirely from scratch. Final art is fully hand-drawn.',
     'ETHICAL_AI', 'VT', 'https://fromestudio.com', 'PENDING'),

    ('10000000-0000-0000-0000-000000000014',
     '00000000-0000-0000-0000-000000000014',
     'WRITER', 'Anonymous Stories',
     'I write stories. No AI. Trust me.',
     'Stories.',
     'NO_AI', 'NV', null, 'REJECTED'),

    ('10000000-0000-0000-0000-000000000015',
     '00000000-0000-0000-0000-000000000015',
     'BUSINESS', 'Okafor Aromatics',
     'Artisan soaps and candles using African botanicals.',
     'Family-owned small business making soaps and candles using traditional West African ingredients. All products handmade in Atlanta. No AI used anywhere.',
     'NO_AI', 'GA', 'https://okaforaromatics.com', 'VERIFIED'),

    ('10000000-0000-0000-0000-000000000017',
     '00000000-0000-0000-0000-000000000017',
     'MUSICIAN', 'Hollis Brennan Folk',
     'Folk singer-songwriter. AI used only for noise reduction on home recordings.',
     'I write and perform folk songs from a home studio in Nashville. AI noise reduction helps clean up vocal takes. All writing, performance, and arrangement is human.',
     'ETHICAL_AI', 'TN', 'https://hollisbrennan.com', 'VERIFIED'),

    ('10000000-0000-0000-0000-000000000018',
     '00000000-0000-0000-0000-000000000018',
     'DEVELOPER', 'Kowalski Open Tools',
     'Open source developer tools. AI assists with documentation only.',
     'I build open source CLI tools for developers. Code is written entirely by hand. AI helps generate first-draft documentation which I then heavily edit.',
     'ETHICAL_AI', 'MA', 'https://kowalski.dev', 'VERIFIED'),

    ('10000000-0000-0000-0000-000000000019',
     '00000000-0000-0000-0000-000000000019',
     'ARTIST', 'Real Human Art Co',
     'Real human making real art.',
     'I am real human.',
     'NO_AI', 'AZ', null, 'REJECTED'),

    ('10000000-0000-0000-0000-000000000021',
     '00000000-0000-0000-0000-000000000021',
     'BUSINESS', 'Holloway Woodworks',
     'Handmade furniture from sustainably harvested Wisconsin hardwood.',
     'Custom furniture maker working out of a small shop in northern Wisconsin. Every piece designed and built by hand. No AI used in design, marketing, or production.',
     'NO_AI', 'WI', 'https://hollowaywoodworks.com', 'VERIFIED'),

    ('10000000-0000-0000-0000-000000000024',
     '00000000-0000-0000-0000-000000000024',
     'MUSICIAN', 'DJ Suspicious Beats',
     'Beats.',
     'I make beats with AI but its ethical because I said so.',
     'ETHICAL_AI', 'NV', null, 'REJECTED'),

    ('10000000-0000-0000-0000-000000000025',
     '00000000-0000-0000-0000-000000000025',
     'ARTIST', 'Castellanos Printmaking',
     'Traditional linocut and woodblock printmaking. Every pull by hand.',
     'I make limited edition prints using traditional relief printmaking techniques. Carving and printing done by hand in my studio in Asheville. Zero AI in any part of my process.',
     'NO_AI', 'NC', 'https://castellanosprints.com', 'VERIFIED');


-- =============================================
-- Update rejection reasons for rejected listings
-- =============================================
UPDATE listings
SET rejection_reason = 'Insufficient detail in description. No verifiable links provided.'
WHERE id = '10000000-0000-0000-0000-000000000014';

UPDATE listings
SET rejection_reason = 'Account flagged. Profile created hours before listing submission. No external presence verifiable.'
WHERE id = '10000000-0000-0000-0000-000000000019';

UPDATE listings
SET rejection_reason = 'Self-declared use of AI for music generation contradicts ETHICAL_AI category. No transparency about process.'
WHERE id = '10000000-0000-0000-0000-000000000024';


-- =============================================
-- REACTIONS
-- =============================================
INSERT INTO reactions (user_id, listing_id, reaction_type)
VALUES
    ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000007', 'VOUCH'),
    ('00000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000007', 'LOVE'),
    ('00000000-0000-0000-0000-000000000020', '10000000-0000-0000-0000-000000000007', 'LOVE'),

    ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000008', 'VOUCH'),
    ('00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000008', 'LOVE'),

    ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000012', 'VOUCH'),
    ('00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000012', 'VOUCH'),
    ('00000000-0000-0000-0000-000000000017', '10000000-0000-0000-0000-000000000012', 'LOVE'),

    ('00000000-0000-0000-0000-000000000011', '10000000-0000-0000-0000-000000000015', 'LOVE'),
    ('00000000-0000-0000-0000-000000000020', '10000000-0000-0000-0000-000000000015', 'LOVE'),

    ('00000000-0000-0000-0000-000000000012', '10000000-0000-0000-0000-000000000017', 'LOVE'),
    ('00000000-0000-0000-0000-000000000019', '10000000-0000-0000-0000-000000000017', 'PISSED'),

    ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000018', 'VOUCH'),
    ('00000000-0000-0000-0000-000000000009', '10000000-0000-0000-0000-000000000018', 'LOVE'),

    ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000024', 'PISSED'),
    ('00000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000024', 'PISSED'),
    ('00000000-0000-0000-0000-000000000012', '10000000-0000-0000-0000-000000000024', 'PISSED'),
    ('00000000-0000-0000-0000-000000000017', '10000000-0000-0000-0000-000000000024', 'DISLIKE'),

    ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000025', 'VOUCH'),
    ('00000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000025', 'VOUCH'),
    ('00000000-0000-0000-0000-000000000011', '10000000-0000-0000-0000-000000000025', 'LOVE'),
    ('00000000-0000-0000-0000-000000000020', '10000000-0000-0000-0000-000000000025', 'LOVE');