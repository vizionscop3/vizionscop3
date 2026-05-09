# VizionScop3 LLC — Website V2
## Entity Relationship Document (ERD)

**Version:** 1.0
**Companion to:** VizionScop3_PRD_V2.md, VizionScop3_TRD.md
**Owner:** Denward Lee Aulder (Vizion)
**Last Updated:** May 2026
**Database:** Supabase (PostgreSQL 15)
**Status:** Implementation-Ready

---

## 1. Document Purpose

This ERD specifies the complete data model for the VizionScop3 V2 website. It covers:

- Database schema (Postgres tables, columns, types, constraints)
- Entity relationships
- Static data structures (TypeScript types for project content)
- Migration scripts
- Row-Level Security (RLS) policies
- Indexes and performance considerations

**V2 design philosophy:** Most "content" lives as TypeScript files (projects, services, copy), not in the database. The database stores only data that must be dynamic: contact submissions and live build status.

---

## 2. Data Layer Overview

### 2.1 What Lives Where

```
┌──────────────────────────────────────────────────────────────────┐
│                    STATIC TYPESCRIPT FILES                       │
│  (Version-controlled, deployed with the build)                   │
├──────────────────────────────────────────────────────────────────┤
│  lib/projects/data.ts          → Project content (3 projects)    │
│  lib/projects/themes.ts        → Color signatures                │
│  lib/projects/constellation.ts → Edges between projects          │
│  lib/constants.ts              → Site config, nav, social        │
│  content/projects/*.mdx        → Optional: long-form case studies│
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                    SUPABASE POSTGRES                             │
│  (Dynamic, runtime-mutable data)                                 │
├──────────────────────────────────────────────────────────────────┤
│  contact_submissions  → Inquiries from contact form              │
│  build_status         → Live ticker content (single row)         │
│  rate_limits          → IP-based rate limiting (V2 simple impl)  │
└──────────────────────────────────────────────────────────────────┘
```

### 2.2 Why This Split

- **TS files for content:** Faster development, type-safe, no runtime DB call, version-controlled, no CMS overhead
- **Postgres for dynamic data:** Required for form submissions and admin-mutable content
- **No CMS in V2:** Sanity/Contentful would add 1+ days to the build for content that rarely changes

---

## 3. Database Entity Diagram

### 3.1 Visual Schema

```
┌─────────────────────────────────────┐
│       contact_submissions           │
├─────────────────────────────────────┤
│ PK  id               UUID           │
│     created_at       TIMESTAMPTZ    │
│     updated_at       TIMESTAMPTZ    │
│     name             TEXT           │
│     email            TEXT           │
│     organization     TEXT NULL      │
│     organization_type ENUM          │
│     project_types    TEXT[]         │
│     budget_range     ENUM           │
│     timeline         ENUM           │
│     description      TEXT           │
│     status           ENUM           │
│     ip_address       TEXT NULL      │
│     user_agent       TEXT NULL      │
│     referrer         TEXT NULL      │
│     responded_at     TIMESTAMPTZ NULL│
│     internal_notes   TEXT NULL      │
└─────────────────────────────────────┘
              │
              │ (informal: not enforced)
              ▼
┌─────────────────────────────────────┐
│         rate_limits                 │
├─────────────────────────────────────┤
│ PK  id               UUID           │
│     identifier       TEXT (IP)      │
│     action           TEXT           │
│     count            INTEGER        │
│     window_start     TIMESTAMPTZ    │
│     created_at       TIMESTAMPTZ    │
└─────────────────────────────────────┘


┌─────────────────────────────────────┐
│         build_status                │
│  (single row, id = 'current')       │
├─────────────────────────────────────┤
│ PK  id               TEXT           │
│     updated_at       TIMESTAMPTZ    │
│     current_focus    TEXT           │
│     messages         JSONB          │
│     last_commit      JSONB NULL     │
│     is_live          BOOLEAN        │
└─────────────────────────────────────┘
```

### 3.2 Relationships

For V2, tables are functionally independent (no foreign keys). This is intentional:

- `contact_submissions` is self-contained
- `build_status` is a singleton config table
- `rate_limits` is operational only

Future V3 additions (newsletter_subscribers, blog_post_views, etc.) may introduce relationships.

---

## 4. Table Specifications

### 4.1 contact_submissions

**Purpose:** Capture all contact form submissions for review and CRM follow-up.

**Schema:**

```sql
-- Custom enum types
CREATE TYPE organization_type AS ENUM (
  'nonprofit',
  'small_business',
  'corporate',
  'enterprise',
  'other'
);

CREATE TYPE budget_range AS ENUM (
  'under_10k',
  '10_50k',
  '50_150k',
  '150k_plus',
  'unsure'
);

CREATE TYPE project_timeline AS ENUM (
  'asap',
  '1_3_months',
  '3_6_months',
  'flexible'
);

CREATE TYPE submission_status AS ENUM (
  'new',
  'reviewing',
  'responded',
  'qualified',
  'closed_won',
  'closed_lost',
  'spam'
);

-- Main table
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Submitter info
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  email TEXT NOT NULL CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  organization TEXT NULL CHECK (organization IS NULL OR char_length(organization) <= 200),
  organization_type organization_type NOT NULL,

  -- Project info
  project_types TEXT[] NOT NULL CHECK (array_length(project_types, 1) >= 1),
  budget_range budget_range NOT NULL,
  timeline project_timeline NOT NULL,
  description TEXT NOT NULL CHECK (char_length(description) BETWEEN 20 AND 5000),

  -- Operational metadata
  status submission_status NOT NULL DEFAULT 'new',
  ip_address TEXT NULL,
  user_agent TEXT NULL,
  referrer TEXT NULL,

  -- Internal CRM
  responded_at TIMESTAMPTZ NULL,
  internal_notes TEXT NULL
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Indexes
CREATE INDEX idx_contact_submissions_created_at
  ON contact_submissions (created_at DESC);

CREATE INDEX idx_contact_submissions_status
  ON contact_submissions (status)
  WHERE status IN ('new', 'reviewing');

CREATE INDEX idx_contact_submissions_email
  ON contact_submissions (email);

-- Spam detection helper (V2.5)
CREATE INDEX idx_contact_submissions_ip_recent
  ON contact_submissions (ip_address, created_at DESC)
  WHERE ip_address IS NOT NULL;
```

**Field-by-field documentation:**

| Field | Type | Constraints | Purpose |
|---|---|---|---|
| `id` | UUID | PK, auto-generated | Stable identifier |
| `created_at` | TIMESTAMPTZ | NOT NULL, default NOW() | Submission timestamp |
| `updated_at` | TIMESTAMPTZ | NOT NULL, auto-updated | Last modification |
| `name` | TEXT | NOT NULL, 2-100 chars | Submitter's name |
| `email` | TEXT | NOT NULL, valid format | Contact email |
| `organization` | TEXT | Optional, max 200 chars | Company/organization name |
| `organization_type` | ENUM | NOT NULL | Categorization for routing |
| `project_types` | TEXT[] | NOT NULL, ≥1 element | Multi-select services needed |
| `budget_range` | ENUM | NOT NULL | Qualification signal |
| `timeline` | ENUM | NOT NULL | Urgency indicator |
| `description` | TEXT | NOT NULL, 20-5000 chars | Project details |
| `status` | ENUM | NOT NULL, default 'new' | CRM workflow state |
| `ip_address` | TEXT | Nullable | Spam detection |
| `user_agent` | TEXT | Nullable | Browser fingerprint |
| `referrer` | TEXT | Nullable | Traffic source |
| `responded_at` | TIMESTAMPTZ | Nullable | Response tracking |
| `internal_notes` | TEXT | Nullable | Vizion's CRM notes |

**Status workflow:**

```
new → reviewing → responded → qualified → closed_won
                                      └→ closed_lost
                          └→ spam (terminal)
```

### 4.2 build_status

**Purpose:** Power the Live Build Ticker. Single-row config table that Vizion can update without redeploying.

**Schema:**

```sql
CREATE TABLE build_status (
  id TEXT PRIMARY KEY DEFAULT 'current',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Display content
  current_focus TEXT NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,

  -- Optional GitHub integration (V2.5)
  last_commit JSONB NULL,

  -- Master toggle
  is_live BOOLEAN NOT NULL DEFAULT TRUE,

  -- Constraint: enforce singleton
  CONSTRAINT singleton_check CHECK (id = 'current')
);

-- Auto-update updated_at
CREATE TRIGGER update_build_status_updated_at
  BEFORE UPDATE ON build_status
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Seed initial row
INSERT INTO build_status (id, current_focus, messages, is_live)
VALUES (
  'current',
  'T-Trac Phase 4 beta',
  '[
    "Currently shipping: T-Trac Phase 4 beta",
    "Now accepting Q3 project briefs",
    "The Masjid: 36,313+ hadiths indexed"
  ]'::jsonb,
  TRUE
);
```

**JSONB structures:**

`messages` (array of strings):
```json
[
  "Currently shipping: T-Trac Phase 4 beta",
  "Now accepting Q3 project briefs",
  "The Masjid: 36,313+ hadiths indexed"
]
```

`last_commit` (V2.5 GitHub integration):
```json
{
  "repo": "vizionscop3/t-trac",
  "message": "feat: add dosage history view",
  "sha": "a1b2c3d",
  "timestamp": "2026-05-07T14:23:11Z",
  "url": "https://github.com/vizionscop3/t-trac/commit/a1b2c3d"
}
```

### 4.3 rate_limits

**Purpose:** Simple IP-based rate limiting for contact form submissions when Upstash Redis is not available.

**Schema:**

```sql
CREATE TABLE rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL,
  action TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Composite index for fast lookups
CREATE UNIQUE INDEX idx_rate_limits_identifier_action_window
  ON rate_limits (identifier, action, window_start);

-- Cleanup index for old records
CREATE INDEX idx_rate_limits_window_start
  ON rate_limits (window_start);
```

**Usage pattern:**

```sql
-- On each submission, check rate
SELECT COUNT(*) FROM contact_submissions
WHERE ip_address = $1
  AND created_at > NOW() - INTERVAL '1 hour';

-- If count >= 3, reject

-- Daily cleanup of old rate limit records
DELETE FROM rate_limits WHERE window_start < NOW() - INTERVAL '24 hours';
```

**Note:** For V2, the simpler implementation queries `contact_submissions` directly by `ip_address + created_at`. The `rate_limits` table is staged for V2.5 if more granular limits are needed across multiple actions (newsletter, contact, etc.).

---

## 5. Row-Level Security (RLS)

### 5.1 Why RLS Matters

Supabase exposes tables via PostgREST. Without RLS, the anonymous key could read/write any row. RLS policies enforce access at the database level — defense in depth.

### 5.2 Policies

```sql
-- Enable RLS on all tables
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE build_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- ============================================
-- contact_submissions policies
-- ============================================

-- Anonymous users: NO READ access
-- (only service role can read submissions)

-- Anonymous users: NO INSERT via PostgREST
-- (inserts go through API route with service role key + validation)
-- This prevents bypassing server-side validation/captcha

-- Service role: full access (implicit, bypasses RLS)

-- ============================================
-- build_status policies
-- ============================================

-- Anonymous users: READ only
CREATE POLICY "Anyone can read build status"
  ON build_status
  FOR SELECT
  TO anon
  USING (is_live = TRUE);

-- Authenticated admin: full access
-- (V2.5: when admin auth is added)

-- Service role: full access (implicit)

-- ============================================
-- rate_limits policies
-- ============================================

-- No anonymous access — operational only
-- Service role: full access (implicit)
```

### 5.3 Why Inserts Go Through API Routes (Not Direct PostgREST)

For `contact_submissions`, we deliberately do NOT allow anonymous inserts via PostgREST because:

1. Server-side Zod validation needed
2. hCaptcha verification needed
3. Rate limiting needed
4. Email notifications need to fire
5. IP/user-agent must be captured server-side (not trusted from client)

The API route at `/api/contact` uses the **service role key** to bypass RLS and insert validated data.

---

## 6. Static TypeScript Data Models

These are not in the database. They live in version-controlled TS files. Here's the full type schema.

### 6.1 Project Type

**File:** `lib/projects/types.ts`

```typescript
/**
 * Project status — determines badge display
 */
export type ProjectStatus = 'live' | 'beta' | 'in-development'

/**
 * Project platform — drives icon and filtering
 */
export type ProjectPlatform = 'web' | 'ios' | 'android' | 'desktop'

/**
 * Project industry — drives filtering and routing
 */
export type ProjectIndustry =
  | 'religious'
  | 'healthcare'
  | 'fitness'
  | 'finance'
  | 'education'
  | 'enterprise'
  | 'nonprofit'
  | 'other'

/**
 * Tech category — for stack visualization
 */
export type TechCategory =
  | 'Frontend'
  | 'Backend'
  | 'AI/ML'
  | 'Database'
  | 'Mobile'
  | 'Infrastructure'
  | 'Authentication'
  | 'Compliance'

/**
 * Tech stack entry per project
 */
export interface ProjectTechStack {
  category: TechCategory
  technologies: string[]
}

/**
 * Color theme for Living Portfolio morphing
 */
export interface ProjectTheme {
  /** Primary hex color */
  primary: string
  /** Accent hex color */
  accent: string
  /** Surface (background) hex color */
  surface: string
  /** Motion personality */
  motion: 'breathing' | 'precise' | 'kinetic' | 'normal'
  /** Optional ambient audio path (V2.5) */
  audio?: string
}

/**
 * Quantified outcome metric
 */
export interface ProjectMetric {
  label: string
  value: string
  highlight: boolean
}

/**
 * External links per project
 */
export interface ProjectLinks {
  liveUrl?: string
  githubUrl?: string
  appStoreUrl?: string
  playStoreUrl?: string
  caseStudyUrl?: string
}

/**
 * Single screenshot in gallery
 */
export interface ProjectScreenshot {
  src: string
  alt: string
  caption?: string
  width: number
  height: number
}

/**
 * Full project entity
 */
export interface Project {
  // Identity
  slug: string
  name: string
  tagline: string

  // Status
  status: ProjectStatus
  featured: boolean
  order: number

  // Description
  description: string
  challenge: string
  approach: string
  outcome: string

  // Categorization
  industry: ProjectIndustry
  platform: ProjectPlatform[]
  timeline: string

  // Visual assets
  heroImage: ProjectScreenshot
  galleryImages: ProjectScreenshot[]
  logoIcon?: string

  // Tech
  techStack: ProjectTechStack[]
  metrics: ProjectMetric[]

  // Links
  links: ProjectLinks

  // Theme
  theme: ProjectTheme

  // SEO
  metaTitle?: string
  metaDescription?: string
}
```

### 6.2 Constellation Edge Type

**File:** `lib/projects/constellation.ts`

```typescript
import type { Project } from './types'

/**
 * Connection between two projects in the constellation
 */
export interface ConstellationEdge {
  from: Project['slug']
  to: Project['slug']
  /** Technologies/concepts shared between these projects */
  sharedTech: string[]
  /** Visual weight: 1 (thin) to 3 (thick) */
  weight: 1 | 2 | 3
}

export const edges: ConstellationEdge[] = [
  {
    from: 'the-masjid',
    to: 't-trac',
    sharedTech: ['Anthropic API', 'Pinecone', 'RAG'],
    weight: 3
  },
  {
    from: 't-trac',
    to: 'vizionfit-pro',
    sharedTech: ['Supabase', 'React Native', 'Mobile-first'],
    weight: 3
  },
  {
    from: 'the-masjid',
    to: 'vizionfit-pro',
    sharedTech: ['Anthropic API', 'AI Integration'],
    weight: 2
  }
]
```

### 6.3 Theme Data

**File:** `lib/projects/themes.ts`

```typescript
import type { ProjectTheme } from './types'

export const projectThemes: Record<string, ProjectTheme> = {
  'the-masjid': {
    primary: '#10B981',
    accent: '#F59E0B',
    surface: '#0A1F1C',
    motion: 'breathing'
  },
  't-trac': {
    primary: '#0EA5E9',
    accent: '#00F0FF',
    surface: '#0A1929',
    motion: 'precise'
  },
  'vizionfit-pro': {
    primary: '#EF4444',
    accent: '#FFB800',
    surface: '#1A0808',
    motion: 'kinetic'
  },
  default: {
    primary: '#00F0FF',
    accent: '#7C3AED',
    surface: '#0A0A0F',
    motion: 'normal'
  }
}
```

### 6.4 Sample Project Record

```typescript
// lib/projects/data.ts
import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'the-masjid',
    name: 'The Masjid',
    tagline: 'An Islamic prayer companion built on RAG over 36,313+ hadiths',

    status: 'live',
    featured: true,
    order: 1,

    description: 'A spiritually-grounded mobile application providing prayer times, qibla direction, and an AI-powered hadith research tool that surfaces authentic teachings through Retrieval-Augmented Generation.',

    challenge: '[PLACEHOLDER: 2-3 paragraphs on the gap in the market and the personal motivation]',
    approach: '[PLACEHOLDER: technical strategy — RAG architecture, hadith vectorization, location services, offline-first design]',
    outcome: '[PLACEHOLDER: deployment status, user reception, key features shipped]',

    industry: 'religious',
    platform: ['ios', 'android', 'web'],
    timeline: '[PLACEHOLDER: e.g., 6 months, ongoing]',

    heroImage: {
      src: '/images/projects/the-masjid/hero.jpg',
      alt: 'The Masjid app showing prayer times interface',
      width: 1920,
      height: 1080
    },
    galleryImages: [
      // [PLACEHOLDER: 4-6 screenshots]
    ],

    techStack: [
      {
        category: 'Mobile',
        technologies: ['React Native', 'Expo']
      },
      {
        category: 'AI/ML',
        technologies: ['Anthropic Claude API', 'RAG Architecture']
      },
      {
        category: 'Database',
        technologies: ['Pinecone (vector DB)', 'Supabase (PostgreSQL)']
      },
      {
        category: 'Infrastructure',
        technologies: ['Vercel', 'Edge Functions']
      }
    ],

    metrics: [
      { label: 'Hadiths Indexed', value: '36,313+', highlight: true },
      { label: 'Languages Supported', value: '[PLACEHOLDER]', highlight: false },
      { label: 'Active Users', value: '[PLACEHOLDER]', highlight: false }
    ],

    links: {
      liveUrl: '[PLACEHOLDER: production URL]',
      appStoreUrl: '[PLACEHOLDER: when published]',
      playStoreUrl: '[PLACEHOLDER: when published]'
    },

    theme: {
      primary: '#10B981',
      accent: '#F59E0B',
      surface: '#0A1F1C',
      motion: 'breathing'
    }
  }
  // t-trac, vizionfit-pro entries follow same shape
]

/**
 * Helper: get project by slug with type narrowing
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

/**
 * Helper: featured projects sorted by order
 */
export function getFeaturedProjects(): Project[] {
  return projects
    .filter(p => p.featured)
    .sort((a, b) => a.order - b.order)
}
```

### 6.5 Service Type (for compact home grid)

**File:** `lib/services/types.ts`

```typescript
export type ServiceCategory =
  | 'web'
  | 'mobile'
  | 'software'
  | 'ai'
  | 'database'
  | 'consulting'

export interface Service {
  id: ServiceCategory
  name: string
  shortDescription: string
  icon: string  // Lucide icon name
  order: number
}

export const services: Service[] = [
  {
    id: 'web',
    name: 'Web Development',
    shortDescription: 'Modern, performant websites and web applications.',
    icon: 'Globe',
    order: 1
  },
  {
    id: 'mobile',
    name: 'iOS & Android Apps',
    shortDescription: 'Native and cross-platform mobile experiences.',
    icon: 'Smartphone',
    order: 2
  },
  {
    id: 'software',
    name: 'Custom Software',
    shortDescription: 'Tailored systems built for your specific operations.',
    icon: 'Code2',
    order: 3
  },
  {
    id: 'ai',
    name: 'AI Infrastructure',
    shortDescription: 'RAG pipelines, vector search, LLM integration.',
    icon: 'Sparkles',
    order: 4
  },
  {
    id: 'database',
    name: 'Database Engineering',
    shortDescription: 'Scalable data architecture, ETL, and analytics.',
    icon: 'Database',
    order: 5
  },
  {
    id: 'consulting',
    name: 'Technology Consulting',
    shortDescription: 'Strategic advisory for AI-native transformations.',
    icon: 'Compass',
    order: 6
  }
]
```

### 6.6 Site Configuration

**File:** `lib/constants.ts`

```typescript
export const siteConfig = {
  // Identity
  name: 'VizionScop3 LLC',
  legalName: 'VizionScop3 LLC',
  domain: 'vizionscop3.com',
  url: 'https://vizionscop3.com',

  // Founder
  founder: {
    name: 'Denward Lee Aulder',
    handle: 'Vizion',
    title: 'Founder & CEO'
  },

  // Contact
  contact: {
    email: 'hello@vizionscop3.com',
    phone: '[PLACEHOLDER]',
    address: {
      city: 'Brooklyn',
      state: 'NY',
      country: 'US'
    }
  },

  // Social
  social: {
    github: 'https://github.com/vizionscop3',
    linkedin: '[PLACEHOLDER]',
    twitter: '[PLACEHOLDER]'
  },

  // Calendar
  calendar: {
    username: 'vizionscop3',
    embedUrl: 'https://cal.com/vizionscop3/30min'
  }
} as const

export const navigation = {
  primary: [
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ],
  footer: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' }
  ]
}

export const credibilityPills = [
  'U.S. Air Force veteran',
  'Top Secret clearance',
  'Brooklyn, NY'
] as const
```

---

## 7. Migrations

### 7.1 Migration File Structure

```
supabase/
├── migrations/
│   ├── 20260507000001_initial_schema.sql
│   ├── 20260507000002_seed_build_status.sql
│   └── 20260507000003_rls_policies.sql
└── seed.sql
```

### 7.2 Migration 001 — Initial Schema

```sql
-- supabase/migrations/20260507000001_initial_schema.sql

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Shared updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Enums
CREATE TYPE organization_type AS ENUM (
  'nonprofit', 'small_business', 'corporate', 'enterprise', 'other'
);

CREATE TYPE budget_range AS ENUM (
  'under_10k', '10_50k', '50_150k', '150k_plus', 'unsure'
);

CREATE TYPE project_timeline AS ENUM (
  'asap', '1_3_months', '3_6_months', 'flexible'
);

CREATE TYPE submission_status AS ENUM (
  'new', 'reviewing', 'responded', 'qualified', 'closed_won', 'closed_lost', 'spam'
);

-- contact_submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  email TEXT NOT NULL CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  organization TEXT NULL CHECK (organization IS NULL OR char_length(organization) <= 200),
  organization_type organization_type NOT NULL,
  project_types TEXT[] NOT NULL CHECK (array_length(project_types, 1) >= 1),
  budget_range budget_range NOT NULL,
  timeline project_timeline NOT NULL,
  description TEXT NOT NULL CHECK (char_length(description) BETWEEN 20 AND 5000),
  status submission_status NOT NULL DEFAULT 'new',
  ip_address TEXT NULL,
  user_agent TEXT NULL,
  referrer TEXT NULL,
  responded_at TIMESTAMPTZ NULL,
  internal_notes TEXT NULL
);

CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_contact_submissions_created_at
  ON contact_submissions (created_at DESC);

CREATE INDEX idx_contact_submissions_status
  ON contact_submissions (status)
  WHERE status IN ('new', 'reviewing');

CREATE INDEX idx_contact_submissions_email
  ON contact_submissions (email);

CREATE INDEX idx_contact_submissions_ip_recent
  ON contact_submissions (ip_address, created_at DESC)
  WHERE ip_address IS NOT NULL;

-- build_status
CREATE TABLE build_status (
  id TEXT PRIMARY KEY DEFAULT 'current',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_focus TEXT NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  last_commit JSONB NULL,
  is_live BOOLEAN NOT NULL DEFAULT TRUE,
  CONSTRAINT singleton_check CHECK (id = 'current')
);

CREATE TRIGGER update_build_status_updated_at
  BEFORE UPDATE ON build_status
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- rate_limits
CREATE TABLE rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL,
  action TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_rate_limits_identifier_action_window
  ON rate_limits (identifier, action, window_start);

CREATE INDEX idx_rate_limits_window_start
  ON rate_limits (window_start);
```

### 7.3 Migration 002 — Seed Data

```sql
-- supabase/migrations/20260507000002_seed_build_status.sql

INSERT INTO build_status (id, current_focus, messages, is_live)
VALUES (
  'current',
  'T-Trac Phase 4 beta',
  '[
    "Currently shipping: T-Trac Phase 4 beta",
    "Now accepting Q3 project briefs",
    "The Masjid: 36,313+ hadiths indexed",
    "VizionScop3 — engineering the future, shipping it today"
  ]'::jsonb,
  TRUE
)
ON CONFLICT (id) DO NOTHING;
```

### 7.4 Migration 003 — RLS Policies

```sql
-- supabase/migrations/20260507000003_rls_policies.sql

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE build_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- build_status: anonymous read access for live ticker
CREATE POLICY "Anyone can read live build status"
  ON build_status
  FOR SELECT
  TO anon
  USING (is_live = TRUE);

-- All other access requires service role
-- (no explicit policies needed; default deny applies)
```

---

## 8. Query Patterns

### 8.1 Common Queries

**Read live build status (server, RSC):**
```ts
const { data, error } = await supabase
  .from('build_status')
  .select('current_focus, messages, last_commit')
  .eq('id', 'current')
  .eq('is_live', true)
  .single()
```

**Insert contact submission (server, API route):**
```ts
const { data, error } = await supabase
  .from('contact_submissions')
  .insert({
    name: input.name,
    email: input.email,
    organization: input.organization,
    organization_type: input.organizationType,
    project_types: input.projectTypes,
    budget_range: input.budgetRange,
    timeline: input.timeline,
    description: input.description,
    ip_address: ip,
    user_agent: userAgent,
    referrer: referrer
  })
  .select()
  .single()
```

**Check rate limit (server, API route):**
```ts
const { count } = await supabase
  .from('contact_submissions')
  .select('id', { count: 'exact', head: true })
  .eq('ip_address', ip)
  .gte('created_at', new Date(Date.now() - 3600_000).toISOString())

const allowed = (count ?? 0) < 3
```

**Update submission status (admin, future):**
```ts
const { data, error } = await supabase
  .from('contact_submissions')
  .update({ status: 'responded', responded_at: new Date().toISOString() })
  .eq('id', submissionId)
  .select()
  .single()
```

### 8.2 Performance Notes

- All common queries hit indexes (created_at, status, email, ip_address)
- `single()` is used when expecting exactly 1 row
- `.select('id', { count: 'exact', head: true })` is the cheapest way to count
- JSONB queries on `build_status.messages` use `->` and `->>` operators if needed

---

## 9. Backup & Recovery

### 9.1 Supabase Backups

- **Free tier:** Daily automatic backups (7-day retention)
- **Pro tier:** Daily backups (30-day retention) + point-in-time recovery

### 9.2 Backup Strategy

V2 is sufficient on free tier. Monitor `contact_submissions` row count; upgrade if approaching limits.

### 9.3 Disaster Recovery

If database is lost:
1. Restore from Supabase backup
2. Re-run seed migration if needed
3. Static content (TS files) is in git — redeploy from main branch

---

## 10. Future Schema Considerations (V3+)

These tables are NOT built in V2 but the schema is reserved:

### 10.1 newsletter_subscribers (V2.5)
```
- id UUID
- email TEXT UNIQUE
- subscribed_at TIMESTAMPTZ
- unsubscribed_at TIMESTAMPTZ NULL
- source TEXT  -- where they signed up
- confirmed BOOLEAN
- confirmation_token TEXT
```

### 10.2 blog_posts (V3 — when CMS-free MDX outgrows)
```
- id UUID
- slug TEXT UNIQUE
- title TEXT
- excerpt TEXT
- content TEXT  -- MDX
- author TEXT
- published_at TIMESTAMPTZ
- updated_at TIMESTAMPTZ
- status ENUM ('draft', 'published', 'archived')
- featured BOOLEAN
- tags TEXT[]
- view_count INTEGER
```

### 10.3 client_portal_users (V3)
```
- id UUID
- email TEXT UNIQUE
- name TEXT
- organization TEXT
- role ENUM ('client', 'admin', 'viewer')
- created_at TIMESTAMPTZ
- last_login_at TIMESTAMPTZ
- linked_submission_id UUID REFERENCES contact_submissions(id)
```

### 10.4 projects (V3 — when content moves to DB)
At that point, the TypeScript `Project` type maps directly to a `projects` table.

---

## 11. Validation Schema (Source of Truth)

The Zod schema in `lib/validation/contact.schema.ts` is the **single source of truth** for what is valid. Database constraints mirror it. If they ever diverge, the Zod schema wins (update the DB to match).

```typescript
// lib/validation/contact.schema.ts
import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be 100 characters or less'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255),

  organization: z
    .string()
    .max(200)
    .optional()
    .or(z.literal('')),

  organizationType: z.enum([
    'nonprofit',
    'small_business',
    'corporate',
    'enterprise',
    'other'
  ], { errorMap: () => ({ message: 'Please select an organization type' }) }),

  projectTypes: z
    .array(z.enum([
      'web',
      'mobile',
      'software',
      'ai',
      'database',
      'consulting',
      'other'
    ]))
    .min(1, 'Please select at least one project type'),

  budgetRange: z.enum([
    'under_10k',
    '10_50k',
    '50_150k',
    '150k_plus',
    'unsure'
  ]),

  timeline: z.enum([
    'asap',
    '1_3_months',
    '3_6_months',
    'flexible'
  ]),

  description: z
    .string()
    .min(20, 'Please provide more detail (20 characters minimum)')
    .max(5000, 'Description must be 5000 characters or less'),

  // Anti-spam
  websiteUrl: z.string().max(0).optional(),  // honeypot — must be empty
  hcaptchaToken: z.string().min(1).optional()  // required in production
})

export type ContactFormInput = z.infer<typeof contactSchema>
```

---

## 12. Cursor Implementation Notes

### 12.1 Setup Sequence (Day 1)

```bash
# 1. Create Supabase project at supabase.com
# 2. Get connection details from dashboard
# 3. Install Supabase CLI
npm install -g supabase

# 4. Link local repo to remote project
supabase init
supabase link --project-ref <project-ref>

# 5. Apply migrations
supabase db push

# 6. Verify tables exist in Supabase dashboard
```

### 12.2 Type Generation

Auto-generate TypeScript types from the database:

```bash
supabase gen types typescript --project-id <project-id> > lib/supabase/database.types.ts
```

Then import:

```ts
import type { Database } from '@/lib/supabase/database.types'
type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row']
```

### 12.3 Supabase Client Setup

Two clients — never mix:

**Browser client (anon key, RLS-respecting):**
```ts
// lib/supabase/client.ts
'use client'
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './database.types'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**Server client (service role, bypasses RLS):**
```ts
// lib/supabase/service.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

export function createServiceClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}
```

**Critical rule:** `createServiceClient` is ONLY used in API routes and Server Actions. Never imported into Client Components.

---

**End of ERD**

*This document defines all data structures — TS types and database schema — that power VizionScop3 V2. Update it as the schema evolves.*
