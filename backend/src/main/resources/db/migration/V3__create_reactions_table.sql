CREATE TABLE IF NOT EXISTS reactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    listing_id  UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    -- The reaction type
    -- VOUCH    = "I can verify this person is real and human"
    -- LOVE     = "I appreciate this creator's work and ethics"
    -- DISLIKE  = "This listing seems low quality or unhelpful"
    -- PISSED   = "I believe this person is lying about AI usage - flag for review"
    reaction_type TEXT NOT NULL
                  CHECK (reaction_type IN ('VOUCH', 'LOVE', 'DISLIKE', 'PISSED')),
    -- When they last reacted (updates if they change their reaction)
    reacted_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    -- ONE reaction per user per listing.
    -- If the same user tries to react twice to the same listing, Postgres rejects it.
    -- To change a reaction, Spring Boot will UPDATE the existing row, not INSERT a new one.
    CONSTRAINT unique_user_listing_reaction UNIQUE (user_id, listing_id)
);

-- Index for quickly counting reactions by type on a listing
-- e.g. "how many VOUCHes does listing X have?"
CREATE INDEX idx_reactions_listing_id ON reactions(listing_id);

-- Index for quickly finding all reactions by a specific user
CREATE INDEX idx_reactions_user_id ON reactions(user_id);