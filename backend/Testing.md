# CDFxLabs — Test Data Reference

This document catalogs all seed data inserted via V5 and V6 migrations.
Use these IDs when manually testing endpoints in Swagger, Postman, or curl.

## ID Conventions

| Entity | ID Pattern |
|--------|-----------|
| Users | `00000000-0000-0000-0000-0000000000XX` |
| Listings | `10000000-0000-0000-0000-0000000000XX` |

This makes test data instantly recognizable in logs and DB queries — any UUID
starting with `00000000` or `10000000` is seed data.

---

## Users — Sorted by ID

### Existing 5 (from V5)

| ID | Name | Type | AI Stance | State | Listing? | Notes |
|----|------|------|-----------|-------|----------|-------|
| `...001` | Giovanni (Admin) | DEVELOPER | ETHICAL_AI | IL | Yes (VERIFIED) | **ADMIN role.** Use for testing admin-only endpoints. |
| `...002` | Maya Chen | ARTIST | NO_AI | NY | Yes (VERIFIED) | Standard verified artist with positive engagement. |
| `...003` | Marcus Webb | MUSICIAN | ETHICAL_AI | CA | Yes (PENDING) | Pending listing — test approval workflow. |
| `...004` | Priya Patel | BUSINESS_OWNER | NO_AI | TX | Yes (VERIFIED) | Verified small business. Good "happy path" data. |
| `...005` | Suspicious Account | OTHER | NO_AI | FL | Yes (REJECTED) | Rejected listing with rejection_reason populated. |

### Added in V6

| ID | Name | Type | AI Stance | State | Listing? | Notes |
|----|------|------|-----------|-------|----------|-------|
| `...006` | Jamie Rodriguez | ARTIST | NO_AI | OR | **No** | Active user, no listing. Test "user without listing" queries. |
| `...007` | Theodore Blackwood | WRITER | NO_AI | ME | Yes (VERIFIED) | Paid member. Test subscription filtering. |
| `...008` | Nora Whitfield | FILMMAKER | ETHICAL_AI | CA | Yes (VERIFIED) | Paid member, filmmaker category. |
| `...009` | Devon Park | DEVELOPER | ETHICAL_AI | WA | **No** | Active dev, no listing. Game dev field. |
| `...010` | Carmen Vasquez | BUSINESS_OWNER | NO_AI | NM | Yes (VERIFIED) | Verified handmade goods business. |
| `...011` | Russell Bain | SUPPORTER | NO_AI | IL | **No** | Supporter type. Reacts but doesn't create. |
| `...012` | Yuki Tanaka | MUSICIAN | NO_AI | HI | Yes (VERIFIED) | High-engagement target. 3 reactions on listing. |
| `...013` | Elias Frome | ARTIST | ETHICAL_AI | VT | Yes (PENDING) | Pending listing. Use for approval testing. |
| `...014` | Anonymous Writer 42 | WRITER | NO_AI | NV | Yes (REJECTED) | **Flagged for review.** Bad actor test case. |
| `...015` | Inez Okafor | BUSINESS_OWNER | NO_AI | GA | Yes (VERIFIED) | Paid member. Aromatics business. |
| `...016` | Cassidy Lin | FILMMAKER | NO_AI | CO | **No** | Active filmmaker, no listing yet. |
| `...017` | Hollis Brennan | MUSICIAN | ETHICAL_AI | TN | Yes (VERIFIED) | Has both positive AND a PISSED reaction. |
| `...018` | Sage Kowalski | DEVELOPER | ETHICAL_AI | MA | Yes (VERIFIED) | Paid member. Open source developer. |
| `...019` | Real Human Artist 99 | ARTIST | NO_AI | AZ | Yes (REJECTED) | **Flagged.** UNDER_18 age. Bot-like behavior. |
| `...020` | Patricia Wells | SUPPORTER | NO_AI | MI | **No** | OVER_50 demographic. Test age filtering. |
| `...021` | Bram Holloway | BUSINESS_OWNER | NO_AI | WI | Yes (VERIFIED) | Verified woodworking business. |
| `...022` | Mira Acharya | WRITER | NO_AI | NJ | **No** | UNDER 25 writer, no listing. |
| `...023` | Quinn Albright | OTHER | NO_AI | PA | **No** | OTHER user_type. Edge case for filters. |
| `...024` | DJ Suspicious | MUSICIAN | ETHICAL_AI | NV | Yes (REJECTED) | **Flagged.** Got 3 PISSED reactions. Community moderation test. |
| `...025` | Rowan Castellanos | ARTIST | NO_AI | NC | Yes (VERIFIED) | Paid member. **Most-engaged listing** (4 reactions). |

---

## Test Scenarios by Use Case

### Authentication & Authorization

| Scenario | User ID |
|----------|---------|
| Admin user for protected endpoints | `...001` |
| Regular user (cannot access admin routes) | `...002` |
| Flagged user (test "is this user trustworthy" logic) | `...014`, `...019`, `...024` |
| Paid member (test premium-only endpoints) | `...007`, `...008`, `...015`, `...018`, `...025` |

### Listing Filters

| Filter | Listing IDs to expect |
|--------|----------------------|
| All VERIFIED listings | `...001, 002, 004, 007, 008, 010, 012, 015, 017, 018, 021, 025` (12) |
| All PENDING listings | `...003, 013` (2) |
| All REJECTED listings | `...005, 014, 019, 024` (4) |
| NO_AI category | majority — see ai_usage column |
| ETHICAL_AI category | `...001, 003, 008, 013, 017, 018, 024` (7) |
| State = NY | Listing `...002` |
| State = CA | Listings `...003, 008` |
| State = TX | Listing `...004` |

### Reaction System

| Test Case | Use these |
|-----------|-----------|
| Listing with most VOUCHes | `...012` (Yuki Tanaka) — 2 vouches |
| Listing with most PISSED reactions | `...024` (DJ Suspicious) — 3 pissed + 1 dislike |
| Listing with no reactions | `...013` (Elias Frome - PENDING listing) |
| Test UNIQUE(user_id, listing_id) constraint | Try inserting a second reaction from user `...001` to listing `...001` — should fail |

### User Queries

| Test Case | User IDs |
|-----------|---------|
| Users without listings | `...006, 009, 011, 016, 020, 022, 023` (7 users) |
| Users in Illinois | `...001, 011` |
| Users in California | `...003, 008` |
| Users by user_type = ARTIST | `...002, 006, 013, 019, 025` |
| Users by user_type = MUSICIAN | `...003, 012, 017, 024` |
| Users with age_range = UNDER_18 | `...019` |
| Users with age_range = OVER_50 | `...011, 020` |

---

## Quick curl Examples

```bash
# Health check
curl http://localhost:8080/api/health

# Get all verified listings
curl http://localhost:8080/api/listings?status=VERIFIED

# Get specific listing
curl http://localhost:8080/api/listings/10000000-0000-0000-0000-000000000012

# Get listings in California
curl http://localhost:8080/api/listings?state=CA

# Get NO_AI listings
curl http://localhost:8080/api/listings?aiUsage=NO_AI
```

---

## Data Constraints Quick Reference

When creating new test data, these constraints apply:

| Field | Valid Values |
|-------|--------------|
| `user.role` | `USER`, `ADMIN` |
| `user.user_type` | `ARTIST`, `MUSICIAN`, `WRITER`, `FILMMAKER`, `DEVELOPER`, `BUSINESS_OWNER`, `SUPPORTER`, `OTHER` |
| `user.ai_usage` | `NO_AI`, `ETHICAL_AI` |
| `user.age_range` | `UNDER_18`, `18_TO_25`, `26_TO_35`, `36_TO_50`, `OVER_50`, `PREFER_NOT_TO_SAY` |
| `listing.ai_usage` | `NO_AI`, `ETHICAL_AI` |
| `listing.status` | `PENDING`, `VERIFIED`, `REJECTED` |
| `reaction.reaction_type` | `VOUCH`, `LOVE`, `DISLIKE`, `PISSED` |

---

## Adding More Test Data

Do NOT modify V5 or V6. Create a new migration `V{n}__additional_test_data.sql`
following the same patterns. Always check existing UNIQUE constraints:

- One listing per user (`UNIQUE` on `listings.user_id`)
- One reaction per user per listing (`UNIQUE` on `reactions(user_id, listing_id)`)
- Unique `supabase_uid` per user