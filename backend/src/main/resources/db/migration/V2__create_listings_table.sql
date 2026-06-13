CREATE TABLE IF NOT EXISTS listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    -- One listing per user. UNIQUE on user_id enforces this at DB level.
    -- Even if Spring Boot somehow allows a second insert, Postgres will reject it.
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    -- What kind of entity this is
    -- ARTIST, MUSICIAN, WRITER, FILMMAKER, DEVELOPER, BUSINESS, OTHER
    listing_type TEXT NOT NULL DEFAULT 'ARTIST',
    -- The public name of this listing (could be a business name or artist name)
    name TEXT NOT NULL,
    -- Short one-liner shown on directory cards (max enforced at app layer)
    summary TEXT NOT NULL,
    -- Longer description shown on full listing page
    description TEXT,
    -- AI usage category - mirrors what will show on user profile too
    -- NO_AI = zero AI used in creative work
    -- ETHICAL_AI = uses AI tools but not to replace human creativity or steal from artists
    ai_usage TEXT NOT NULL DEFAULT 'NO_AI'
             CHECK (ai_usage IN ('NO_AI', 'ETHICAL_AI')),
    -- US state where this creator/business operates
    -- Two-letter code: IL, CA, NY etc.
    state TEXT,
    -- Specific social media links - validated at app layer before insert
    -- NULL means they didn't provide that link - all optional except personal_site
    personal_site_url   TEXT,           -- their main portfolio/website
    tiktok_url          TEXT,
    youtube_url         TEXT,
    status TEXT NOT NULL DEFAULT 'PENDING'
           CHECK (status IN ('PENDING', 'VERIFIED', 'REJECTED')),
    rejection_reason TEXT,
    -- Audit fields
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index on status so filtering VERIFIED listings is fast
CREATE INDEX idx_listings_status ON listings(status);

-- Index on state for the state-by-state map feature
CREATE INDEX idx_listings_state ON listings(state);

-- Index on ai_usage for the NO_AI vs ETHICAL_AI tab filtering
CREATE INDEX idx_listings_ai_usage ON listings(ai_usage);