-- Account status flags
ALTER TABLE users ADD COLUMN IF NOT EXISTS active               BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE users ADD COLUMN IF NOT EXISTS flagged_for_review   BOOLEAN NOT NULL DEFAULT false;
-- Subscription
-- false = free tier, true = paid member (future feature)
ALTER TABLE users ADD COLUMN IF NOT EXISTS paid_member          BOOLEAN NOT NULL DEFAULT false;
-- What kind of creator/person they are
-- Replaces the boolean explosion (is_artist, is_business_owner etc.)
-- One column, mutually exclusive values, easy to filter and display
-- ARTIST, MUSICIAN, WRITER, FILMMAKER, DEVELOPER, BUSINESS_OWNER, SUPPORTER, OTHER
ALTER TABLE users ADD COLUMN IF NOT EXISTS user_type            TEXT NOT NULL DEFAULT 'OTHER'
                  CHECK (user_type IN ('ARTIST', 'MUSICIAN', 'WRITER', 'FILMMAKER', 'DEVELOPER', 'BUSINESS_OWNER', 'SUPPORTER', 'OTHER'));
-- AI usage stance - mirrors the listing's ai_usage field
-- Shows on their public profile page
-- NO_AI = they don't use AI in their creative work
-- ETHICAL_AI = they use AI tools ethically
ALTER TABLE users ADD COLUMN IF NOT EXISTS ai_usage             TEXT NOT NULL DEFAULT 'NO_AI'
                  CHECK (ai_usage IN ('NO_AI', 'ETHICAL_AI'));
-- US state where the user is based (two-letter code)
ALTER TABLE users ADD COLUMN IF NOT EXISTS state                TEXT;
-- Light demographic data for analytics
-- Age range instead of birthdate - less invasive, no PII concerns
-- Values: UNDER_18, 18_TO_25, 26_TO_35, 36_TO_50, OVER_50, PREFER_NOT_TO_SAY
ALTER TABLE users ADD COLUMN IF NOT EXISTS age_range            TEXT DEFAULT 'PREFER_NOT_TO_SAY';
-- What creative field they work in - free text for now
-- e.g. "Visual Art", "Music", "Writing", "Film", "Game Development"
ALTER TABLE users ADD COLUMN IF NOT EXISTS creative_field       TEXT;
-- Profile completion and last activity tracking
ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at           TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_seen_at         TIMESTAMP WITH TIME ZONE;
-- Index on state for regional analytics
CREATE INDEX IF NOT EXISTS idx_users_state ON users(state);
-- Index on user_type for filtering
CREATE INDEX IF NOT EXISTS idx_users_type ON users(user_type);