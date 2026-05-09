# VizionScop3 LLC — Website V2
## Technical Requirements Document (TRD)

**Version:** 1.0
**Companion to:** VizionScop3_PRD_V2.md
**Owner:** Denward Lee Aulder (Vizion)
**Last Updated:** May 2026
**Status:** Implementation-Ready
**Target Build Window:** 5 days

---

## 1. Document Purpose

This TRD translates the PRD into engineering specifications. Where the PRD answers *what* and *why*, this document answers *how*.

**Read order for Cursor:**
1. `VizionScop3_PRD_V2.md` (product spec)
2. `VizionScop3_TRD.md` (this document — technical spec)
3. `VizionScop3_ERD.md` (data model)
4. `.cursorrules` (coding standards)

When this document and the PRD conflict, the PRD wins for product intent and this TRD wins for technical execution.

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT                              │
│  Next.js 15 App Router (SSR + RSC + Static Generation)      │
└──────────┬──────────────────────────────────────────────────┘
           │ HTTPS
┌──────────▼──────────────────────────────────────────────────┐
│                      VERCEL EDGE                            │
│  - Edge functions for API routes                            │
│  - Static asset CDN                                         │
│  - Image optimization                                       │
└──────────┬──────────────────────────────────────────────────┘
           │
   ┌───────┴────────┬──────────────┬──────────────┐
   │                │              │              │
┌──▼────────┐  ┌────▼──────┐  ┌────▼──────┐  ┌───▼────────┐
│ SUPABASE  │  │  RESEND   │  │  CAL.COM  │  │   GITHUB   │
│ Postgres  │  │   Email   │  │   Embed   │  │     API    │
│           │  │           │  │           │  │  (V2.5)    │
└───────────┘  └───────────┘  └───────────┘  └────────────┘
           │
┌──────────▼──────────────────────────────────────────────────┐
│                  OBSERVABILITY                              │
│  - Sentry (errors)                                          │
│  - Vercel Analytics (performance + traffic)                 │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Rendering Strategy

| Page | Strategy | Reasoning |
|---|---|---|
| `/` Home | Static (SSG) with ISR (revalidate: 3600) | Content rarely changes; ISR for ticker updates |
| `/work` | Static (SSG) with ISR (revalidate: 3600) | Constellation data is config-driven |
| `/work/[slug]` | Static (SSG) with `generateStaticParams` | Three known slugs |
| `/about` | Static (SSG) | Pure content |
| `/contact` | Static shell + client form | Form is interactive only |
| `/privacy` | Static (SSG) | Legal content |
| `/terms` | Static (SSG) | Legal content |
| `/api/contact` | Edge runtime | Form submission |
| `/api/build-status` | Edge runtime, cache 300s | Live ticker data (V2.5) |

**Rule:** Default to Server Components and static generation. Only use `'use client'` for: forms, interactive maps, animation orchestration, theme morphing context.

### 2.3 Folder Structure

```
vizionscop3-site/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                    # Home (RSC)
│   │   ├── about/page.tsx              # About (RSC)
│   │   ├── work/
│   │   │   ├── page.tsx                # Work index (RSC, with client constellation)
│   │   │   └── [slug]/
│   │   │       ├── page.tsx            # Project detail (RSC)
│   │   │       └── generateStaticParams.ts
│   │   ├── contact/
│   │   │   ├── page.tsx                # Contact shell (RSC)
│   │   │   └── ContactForm.tsx         # Form (Client)
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── layout.tsx                  # Marketing layout (Header + Footer)
│   │   └── loading.tsx
│   ├── api/
│   │   ├── contact/route.ts            # POST contact submission
│   │   └── build-status/route.ts       # GET live ticker (V2.5)
│   ├── layout.tsx                      # Root layout
│   ├── globals.css                     # Tokens + Tailwind
│   ├── sitemap.ts                      # Dynamic sitemap
│   ├── robots.ts                       # Dynamic robots.txt
│   ├── manifest.ts                     # PWA manifest
│   ├── opengraph-image.tsx             # Default OG
│   ├── error.tsx                       # Global error boundary
│   └── not-found.tsx                   # 404 page
├── components/
│   ├── ui/                             # Primitives
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   └── Icon.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileNav.tsx
│   │   └── Container.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── LiveBuildTicker.tsx
│   │   ├── FeaturedWork.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── MethodSection.tsx
│   │   ├── FounderBlock.tsx
│   │   └── CTABlock.tsx
│   ├── work/
│   │   ├── ConstellationMap.tsx        # Client (SVG-based)
│   │   ├── ConstellationMobile.tsx     # Mobile fallback
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectHero.tsx
│   │   ├── ProjectGlance.tsx
│   │   ├── TechStackBadges.tsx
│   │   └── NextProjectNav.tsx
│   ├── motion/
│   │   ├── ProjectMorpher.tsx          # Living Portfolio system
│   │   ├── FadeIn.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── CountUp.tsx
│   │   └── CursorHalo.tsx
│   ├── forms/
│   │   ├── ContactForm.tsx
│   │   └── FormField.tsx
│   └── brand/
│       ├── Logo.tsx
│       └── Ankh.tsx                    # Includes easter egg
├── lib/
│   ├── projects/
│   │   ├── data.ts                     # Project content (single source)
│   │   ├── themes.ts                   # Color signatures per project
│   │   └── types.ts
│   ├── theme/
│   │   ├── ThemeProvider.tsx           # Client context for morphing
│   │   └── useProjectTheme.ts
│   ├── email/
│   │   └── resend.ts                   # Resend client + templates
│   ├── validation/
│   │   └── contact.schema.ts           # Zod schema
│   ├── seo/
│   │   ├── metadata.ts                 # generateMetadata helpers
│   │   └── jsonLd.ts                   # Schema.org generators
│   ├── analytics/
│   │   └── events.ts
│   ├── env.ts                          # Validated env vars
│   ├── constants.ts                    # Site config, nav, social
│   └── utils.ts                        # cn(), formatters
├── content/
│   ├── projects/
│   │   ├── the-masjid.mdx              # Optional: long-form case study
│   │   ├── t-trac.mdx
│   │   └── vizionfit-pro.mdx
│   └── about.mdx
├── public/
│   ├── images/
│   │   ├── projects/                   # Project hero + screenshots
│   │   ├── og/                         # OG images per page
│   │   └── brand/                      # Logo, ankh
│   ├── favicon.ico
│   ├── icon.png
│   └── apple-icon.png
├── styles/
│   └── tokens.css                      # CSS custom properties
├── types/
│   └── global.d.ts
├── .env.local.example
├── .env.local
├── .eslintrc.json
├── .prettierrc
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── README.md
├── VizionScop3_PRD_V2.md
├── VizionScop3_TRD.md
├── VizionScop3_ERD.md
└── .cursorrules
```

---

## 3. Technology Stack (Locked)

### 3.1 Runtime

```json
{
  "node": "20.x",
  "npm": "10.x"
}
```

### 3.2 Core Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "framer-motion": "^11.0.0",
    "react-hook-form": "^7.51.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.23.0",
    "resend": "^3.2.0",
    "@supabase/supabase-js": "^2.43.0",
    "lucide-react": "^0.378.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0",
    "@sentry/nextjs": "^8.0.0",
    "@vercel/analytics": "^1.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^15.0.0",
    "prettier": "^3.2.0",
    "prettier-plugin-tailwindcss": "^0.5.0"
  }
}
```

### 3.3 Why Each Dependency

- **Next.js 15** — App Router, RSC, built-in image/font optimization, edge runtime
- **Framer Motion** — Declarative animation, `prefers-reduced-motion` support, layout animations
- **React Hook Form + Zod** — Type-safe forms, server-side validation parity
- **Resend** — Modern transactional email with React Email templates, generous free tier
- **Supabase** — Postgres backend for contact submissions and build status (free tier sufficient for V2)
- **Lucide React** — Consistent icon library, tree-shakable
- **clsx + tailwind-merge** — Composes the `cn()` utility properly
- **Sentry** — Error monitoring; free tier covers V2 traffic
- **Vercel Analytics** — Zero-config performance and traffic metrics

### 3.4 Banned for V2

Do not introduce any of the following without written justification:
- Sanity, Contentful, or any headless CMS (use TS data files + MDX)
- GSAP (Framer Motion is sufficient)
- Three.js, React Three Fiber (CSS hero is the V2 approach)
- Redux, Zustand, Jotai (use React Context for theme morphing only)
- styled-components, emotion (Tailwind only)
- Lodash, Moment, date-fns (use native APIs)

---

## 4. Environment Configuration

### 4.1 Required Environment Variables

```bash
# .env.local.example

# Site
NEXT_PUBLIC_SITE_URL=https://vizionscop3.com
NEXT_PUBLIC_SITE_NAME="VizionScop3 LLC"

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Resend (transactional email)
RESEND_API_KEY=
RESEND_FROM_EMAIL=contact@vizionscop3.com
RESEND_TO_EMAIL=vizion@vizionscop3.com

# Cal.com
NEXT_PUBLIC_CAL_USERNAME=vizionscop3

# Sentry
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=

# GitHub (V2.5 — for live build ticker)
GITHUB_TOKEN=
GITHUB_USERNAME=vizionscop3

# Optional: hCaptcha for form spam protection
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=
HCAPTCHA_SECRET_KEY=
```

### 4.2 Environment Validation

Use Zod to validate environment variables on startup. Fail loudly if anything is missing in production.

```ts
// lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.string().email(),
  RESEND_TO_EMAIL: z.string().email(),
  // ... etc
})

export const env = envSchema.parse(process.env)
```

---

## 5. Data Layer

### 5.1 Static Data (TypeScript files)

For V2, all content that doesn't need a database lives in typed TS files. This is faster than a CMS and version-controlled.

**Project data structure:**

```ts
// lib/projects/types.ts
export type ProjectStatus = 'live' | 'beta' | 'in-development'

export type ProjectTheme = {
  primary: string
  accent: string
  surface: string
  motion: 'breathing' | 'precise' | 'kinetic' | 'normal'
}

export type Project = {
  slug: 'the-masjid' | 't-trac' | 'vizionfit-pro'
  name: string
  tagline: string
  status: ProjectStatus
  description: string
  heroImage: string
  galleryImages: string[]
  liveUrl: string | null
  githubUrl: string | null
  appStoreUrl: string | null
  playStoreUrl: string | null
  industry: string
  platform: ('web' | 'ios' | 'android' | 'desktop')[]
  timeline: string
  techStack: TechCategory[]
  challenge: string
  approach: string
  outcome: string
  metrics: ProjectMetric[]
  theme: ProjectTheme
  featured: boolean
  order: number
}

export type TechCategory = {
  category: 'Frontend' | 'Backend' | 'AI/ML' | 'Database' | 'Mobile' | 'Infrastructure'
  technologies: string[]
}

export type ProjectMetric = {
  label: string
  value: string
  highlight: boolean
}
```

**Constellation connections:**

```ts
// lib/projects/constellation.ts
export type ConstellationEdge = {
  from: Project['slug']
  to: Project['slug']
  sharedTech: string[]
  weight: number  // 1-3, controls line thickness
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
    sharedTech: ['Supabase', 'React Native', 'Mobile'],
    weight: 3
  },
  {
    from: 'the-masjid',
    to: 'vizionfit-pro',
    sharedTech: ['Anthropic API', 'AI'],
    weight: 2
  }
]
```

### 5.2 Dynamic Data (Supabase Postgres)

Two tables for V2 — see ERD for full schema. Quick summary:

- `contact_submissions` — captures all form submissions
- `build_status` — single-row table that powers the live ticker

### 5.3 Data Access Patterns

**Server-side reads (RSC):**
```ts
// Use Supabase server client in Server Components
import { createServerClient } from '@/lib/supabase/server'

export async function ProjectPage() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('build_status')
    .select('*')
    .single()
  // ...
}
```

**Server-side writes (API routes):**
```ts
// Use service-role key for inserts (rate-limited at edge)
import { createServiceClient } from '@/lib/supabase/service'

export async function POST(req: Request) {
  const supabase = createServiceClient()
  // validate input
  // insert
}
```

**Never:**
- Expose service role key client-side
- Allow direct client-side writes to contact_submissions
- Query Supabase from Client Components

---

## 6. Component Specifications

### 6.1 Living Portfolio Morphing System

**File:** `components/motion/ProjectMorpher.tsx`

**Behavior:**
- Wraps the entire site in a theme context
- Listens for hover (desktop) or tap (mobile) on project cards
- Updates CSS custom properties on `:root` to morph theme
- Auto-reverts after 4s on tap, immediately on hover end
- Respects `prefers-reduced-motion` (color shift only, no motion timing changes)

**Implementation:**

```tsx
// lib/theme/ThemeProvider.tsx
'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { projectThemes } from '@/lib/projects/themes'
import type { Project } from '@/lib/projects/types'

type ThemeContextValue = {
  activeProject: Project['slug'] | null
  setActiveProject: (slug: Project['slug'] | null) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeProject, setActiveProject] = useState<Project['slug'] | null>(null)

  useEffect(() => {
    const theme = activeProject
      ? projectThemes[activeProject]
      : projectThemes.default

    const root = document.documentElement
    root.style.setProperty('--theme-primary', theme.primary)
    root.style.setProperty('--theme-accent', theme.accent)
    root.style.setProperty('--theme-surface', theme.surface)
    root.dataset.theme = activeProject ?? 'default'
  }, [activeProject])

  return (
    <ThemeContext.Provider value={{ activeProject, setActiveProject }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useProjectTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useProjectTheme must be used within ThemeProvider')
  return ctx
}
```

**Usage on project cards:**

```tsx
// components/work/ProjectCard.tsx
'use client'
import { useProjectTheme } from '@/lib/theme/ThemeProvider'

export function ProjectCard({ project }: { project: Project }) {
  const { setActiveProject } = useProjectTheme()

  return (
    <article
      onMouseEnter={() => setActiveProject(project.slug)}
      onMouseLeave={() => setActiveProject(null)}
      onTouchStart={() => {
        setActiveProject(project.slug)
        setTimeout(() => setActiveProject(null), 4000)
      }}
    >
      {/* card content */}
    </article>
  )
}
```

### 6.2 Constellation Map

**File:** `components/work/ConstellationMap.tsx`

**Approach:** Custom SVG with Framer Motion, not React Flow (lighter, more control).

**Layout algorithm for V2 (3 nodes):**
- Equilateral triangle layout, calculated relative to viewport
- Center of triangle at 50% width, 50% height of container
- Container: 600px tall on desktop, full width
- Node radius: 80px

**Coordinates (3-project layout):**
```
Project 1 (top):    centerX,                centerY - 180
Project 2 (bottom-left):  centerX - 200,    centerY + 130
Project 3 (bottom-right): centerX + 200,    centerY + 130
```

**Node behavior:**
- Each node is an SVG `<g>` with circle background, project logo, label
- Subtle pulse animation (scale 1 → 1.04 → 1, 2s loop)
- Hover: scale 1.1, show full project info card adjacent
- Click: navigate to `/work/[slug]`

**Edge behavior:**
- SVG `<line>` between connected nodes
- Default opacity 0.3, stroke width by weight
- Hover edge: opacity 1, show shared tech tooltip
- Highlight: when filtering by tech, edges with that tech glow

**Mobile breakpoint:** Below 640px, render `ConstellationMobile.tsx` instead — vertical stack of project cards with shared tech badges between them.

**Implementation skeleton:**

```tsx
// components/work/ConstellationMap.tsx
'use client'
import { motion } from 'framer-motion'
import { projects } from '@/lib/projects/data'
import { edges } from '@/lib/projects/constellation'
import Link from 'next/link'

export function ConstellationMap() {
  const positions = calculatePositions(projects.length)

  return (
    <svg viewBox="0 0 1200 600" className="w-full h-[600px]">
      {/* Edges first (rendered behind nodes) */}
      {edges.map(edge => (
        <motion.line
          key={`${edge.from}-${edge.to}`}
          x1={positions[edge.from].x}
          y1={positions[edge.from].y}
          x2={positions[edge.to].x}
          y2={positions[edge.to].y}
          stroke="var(--theme-primary)"
          strokeWidth={edge.weight}
          strokeOpacity={0.3}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      ))}

      {/* Nodes */}
      {projects.map(project => (
        <ConstellationNode
          key={project.slug}
          project={project}
          position={positions[project.slug]}
        />
      ))}
    </svg>
  )
}
```

### 6.3 Live Build Ticker

**File:** `components/sections/LiveBuildTicker.tsx`

**V2 (static config-driven):**
```tsx
// lib/constants.ts
export const buildStatus = {
  isLive: true,
  messages: [
    'Currently shipping: T-Trac Phase 4 beta',
    'Now accepting Q3 project briefs',
    'The Masjid: 36,313+ hadiths indexed',
    'New: Constellation map of all current builds'
  ]
}
```

**V2.5 (GitHub API enhanced):**
- Edge route `/api/build-status` fetches latest commit
- Caches 5 minutes
- Falls back to static config on error

**Component behavior:**
- 32px tall horizontal strip
- Pulsing green dot (Circuit Green) on left
- Auto-rotating messages, 4s hold each, fade transition
- Sticks to top of page on home, below header on other pages

### 6.4 Contact Form

**File:** `components/forms/ContactForm.tsx`

**Tech:** React Hook Form + Zod schema (shared between client and server validation).

**Fields:**

```ts
// lib/validation/contact.schema.ts
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  organization: z.string().max(200).optional(),
  organizationType: z.enum(['nonprofit', 'small_business', 'corporate', 'enterprise', 'other']),
  projectTypes: z.array(z.enum(['web', 'mobile', 'software', 'ai', 'database', 'consulting', 'other'])).min(1),
  budgetRange: z.enum(['under_10k', '10_50k', '50_150k', '150k_plus', 'unsure']),
  timeline: z.enum(['asap', '1_3_months', '3_6_months', 'flexible']),
  description: z.string().min(20).max(5000),
  hcaptchaToken: z.string().optional()
})

export type ContactFormInput = z.infer<typeof contactSchema>
```

**Submission flow:**
1. Client validates with Zod
2. POST to `/api/contact`
3. Server re-validates (never trust client)
4. Insert into Supabase `contact_submissions`
5. Send notification email to Vizion via Resend
6. Send confirmation email to submitter
7. Return success
8. Client shows success state, optionally embeds Cal.com

**Spam mitigation:**
- hCaptcha or Cloudflare Turnstile required in production
- Honeypot field (`website_url` — must be empty)
- Rate limit: 3 submissions per hour per IP (handled at edge)

### 6.5 Hero Background (CSS Mesh Gradient)

**File:** `components/sections/Hero.tsx`

**Approach for V2:** Pure CSS animated mesh gradient, no JS.

```css
/* In globals.css */
.hero-mesh {
  background:
    radial-gradient(at 20% 30%, var(--color-electric-cyan) 0px, transparent 50%),
    radial-gradient(at 80% 20%, var(--color-plasma-violet) 0px, transparent 50%),
    radial-gradient(at 60% 80%, var(--color-circuit-green) 0px, transparent 50%);
  filter: blur(80px) saturate(1.2);
  opacity: 0.25;
  animation: mesh-drift 20s ease-in-out infinite;
}

@keyframes mesh-drift {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(-5%, 5%) rotate(120deg); }
  66% { transform: translate(5%, -5%) rotate(240deg); }
}

@media (prefers-reduced-motion: reduce) {
  .hero-mesh { animation: none; }
}
```

### 6.6 Cursor Halo

**File:** `components/motion/CursorHalo.tsx`

**Behavior:**
- Only on desktop (`window.matchMedia('(hover: hover)')`)
- Only on home hero (mounted conditionally on home page)
- 32px translucent circle following cursor with spring physics
- Disappears on scroll past hero

```tsx
'use client'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export function CursorHalo() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 25, stiffness: 700 })
  const springY = useSpring(y, { damping: 25, stiffness: 700 })

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 16)
      y.set(e.clientY - 16)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="fixed top-0 left-0 w-8 h-8 rounded-full bg-electric-cyan/20 backdrop-blur-sm pointer-events-none z-50 mix-blend-screen"
      aria-hidden
    />
  )
}
```

### 6.7 Count-Up Numbers

**File:** `components/motion/CountUp.tsx`

```tsx
'use client'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

export function CountUp({ value, duration = 2 }: { value: number; duration?: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString())
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      animate(count, value, { duration, ease: 'easeOut' })
    }
  }, [inView, value, duration])

  return <motion.span ref={ref}>{rounded}</motion.span>
}
```

---

## 7. API Specifications

### 7.1 POST /api/contact

**Purpose:** Receive contact form submissions.

**Request:**
```http
POST /api/contact
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "organization": "Acme Nonprofit",
  "organizationType": "nonprofit",
  "projectTypes": ["web", "ai"],
  "budgetRange": "50_150k",
  "timeline": "3_6_months",
  "description": "We need a donor management platform with AI-powered insights...",
  "hcaptchaToken": "..."
}
```

**Success Response:**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "submissionId": "uuid"
}
```

**Error Response:**
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "success": false,
  "error": "validation_failed",
  "details": [...]
}
```

**Implementation flow:**

```ts
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validation/contact.schema'
import { createServiceClient } from '@/lib/supabase/service'
import { sendContactEmail } from '@/lib/email/resend'
import { rateLimit } from '@/lib/security/rate-limit'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  // 1. Rate limit
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const allowed = await rateLimit(ip, 3, 3600)
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: 'rate_limit_exceeded' },
      { status: 429 }
    )
  }

  // 2. Parse and validate
  const body = await req.json()
  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { success: false, error: 'validation_failed', details: result.error.flatten() },
      { status: 400 }
    )
  }

  // 3. Verify hCaptcha (production only)
  if (process.env.NODE_ENV === 'production') {
    const captchaValid = await verifyHCaptcha(result.data.hcaptchaToken)
    if (!captchaValid) {
      return NextResponse.json(
        { success: false, error: 'captcha_failed' },
        { status: 400 }
      )
    }
  }

  // 4. Insert to Supabase
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert({
      name: result.data.name,
      email: result.data.email,
      organization: result.data.organization,
      organization_type: result.data.organizationType,
      project_types: result.data.projectTypes,
      budget_range: result.data.budgetRange,
      timeline: result.data.timeline,
      description: result.data.description,
      ip_address: ip,
      user_agent: req.headers.get('user-agent') ?? '',
      status: 'new'
    })
    .select()
    .single()

  if (error) {
    Sentry.captureException(error)
    return NextResponse.json(
      { success: false, error: 'database_error' },
      { status: 500 }
    )
  }

  // 5. Send emails (notification + confirmation)
  await Promise.all([
    sendContactEmail.notification(data),
    sendContactEmail.confirmation(data)
  ])

  // 6. Return success
  return NextResponse.json({ success: true, submissionId: data.id })
}
```

### 7.2 GET /api/build-status (V2.5)

**Purpose:** Power live ticker with real GitHub data.

**Request:**
```http
GET /api/build-status
```

**Response:**
```http
HTTP/1.1 200 OK
Cache-Control: public, s-maxage=300, stale-while-revalidate=600

{
  "lastCommit": {
    "repo": "vizionscop3/t-trac",
    "message": "feat: add dosage history view",
    "timestamp": "2026-05-07T14:23:11Z",
    "url": "https://github.com/..."
  },
  "currentFocus": "T-Trac Phase 4 beta",
  "messages": [...]
}
```

**Implementation:** Edge route with 5-minute cache. Falls back to static config on GitHub API failure.

---

## 8. Performance Engineering

### 8.1 Bundle Size Targets

| Asset Type | Budget |
|---|---|
| First-load JS | < 100KB gzipped |
| Total JS | < 200KB gzipped |
| Total CSS | < 40KB gzipped |
| Hero image (above fold) | < 100KB |
| Project hero images | < 200KB each |

### 8.2 Image Strategy

- **Format:** AVIF first, WebP fallback, JPEG legacy fallback (next/image handles this)
- **Sizing:** Use `sizes` attribute on every image with appropriate breakpoints
- **Loading:** `priority` on hero only, `loading="lazy"` everywhere else
- **Placeholders:** `placeholder="blur"` with low-quality image placeholder (LQIP)
- **Responsive:** Multiple resolutions generated automatically by next/image

```tsx
import Image from 'next/image'

<Image
  src="/images/projects/the-masjid-hero.jpg"
  alt="The Masjid app interface showing prayer times"
  width={1920}
  height={1080}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
  placeholder="blur"
  blurDataURL="..."
  priority={isHero}
/>
```

### 8.3 Font Loading

```ts
// app/layout.tsx
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap'
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap'
})
```

### 8.4 Code Splitting

- Route-based splitting is automatic with App Router
- Lazy load Constellation Map (only on /work):
  ```ts
  const ConstellationMap = dynamic(
    () => import('@/components/work/ConstellationMap'),
    { ssr: false, loading: () => <ConstellationSkeleton /> }
  )
  ```
- Lazy load Cal.com embed (only when triggered)

### 8.5 Caching Strategy

| Resource | Cache Strategy |
|---|---|
| Static pages | ISR with 1-hour revalidation |
| `/api/build-status` | Edge cache 5 min, SWR 10 min |
| Static assets | Vercel CDN (immutable, 1 year) |
| Project images | Optimized + cached at edge |
| Fonts | Preloaded, cached 1 year |

### 8.6 Lighthouse Targets (Enforced)

| Metric | Target | Action if Failed |
|---|---|---|
| Performance | ≥ 95 | Block deploy |
| Accessibility | 100 | Block deploy |
| Best Practices | 100 | Block deploy |
| SEO | 100 | Block deploy |
| LCP | < 2.0s | Investigate hero |
| TTI | < 2.5s | Investigate JS bundle |
| CLS | < 0.05 | Fix layout shifts |
| TBT | < 200ms | Reduce main-thread work |

Run `lighthouse` in CI on Day 5 morning.

---

## 9. Accessibility Implementation

### 9.1 Required Behaviors

- All interactive elements: keyboard operable + focus visible
- Skip-to-content link in header
- Heading hierarchy maintained (one h1 per page, no skipped levels)
- Color contrast: 4.5:1 text minimum, 3:1 UI minimum
- All images have alt text (decorative images: `alt=""` and `aria-hidden`)
- Form fields have associated labels (no placeholder-only labels)
- Error messages linked via `aria-describedby`
- Loading states announced via `aria-live`
- `prefers-reduced-motion` respected on all animations
- `prefers-color-scheme` respected (dark theme is default)

### 9.2 Constellation Map Accessibility

The map presents a unique a11y challenge. Solutions:

1. **Hidden semantic equivalent:** Beneath the SVG, render a screen-reader-only structured list:
   ```html
   <div className="sr-only">
     <h2>Project Constellation</h2>
     <ul>
       <li>The Masjid: connected to T-Trac via Anthropic API and Pinecone</li>
       <li>T-Trac: connected to The Masjid and VizionFit Pro</li>
       <li>VizionFit Pro: connected to T-Trac via Supabase</li>
     </ul>
   </div>
   ```

2. **Keyboard navigation:** Tab cycles through nodes; Enter activates; Arrow keys move between connected nodes.

3. **Focus indicators:** Each node has visible focus ring with high contrast.

### 9.3 Living Portfolio Morphing Accessibility

- Color shifts must not be the only meaning conveyed
- Each project card has explicit text labels
- Theme transitions disabled when `prefers-reduced-motion: reduce`
- Color contrast maintained in every theme variation (test all themes against WCAG)

### 9.4 Testing

- Run `axe-core` in development
- Manual keyboard-only test on all pages before launch
- VoiceOver test on iOS for mobile experience
- NVDA test on Windows desktop

---

## 10. SEO Implementation

### 10.1 Metadata per Page

```ts
// lib/seo/metadata.ts
import type { Metadata } from 'next'

export function buildMetadata({
  title,
  description,
  path,
  image
}: MetadataInput): Metadata {
  const url = `${env.NEXT_PUBLIC_SITE_URL}${path}`
  const ogImage = image ?? '/og/default.png'

  return {
    title: `${title} | VizionScop3 LLC`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'VizionScop3 LLC',
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    },
    robots: {
      index: true,
      follow: true
    }
  }
}
```

### 10.2 JSON-LD Schemas

**On every page (Organization):**
```ts
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "VizionScop3 LLC",
  "url": "https://vizionscop3.com",
  "logo": "https://vizionscop3.com/logo.png",
  "founder": {
    "@type": "Person",
    "name": "Denward Lee Aulder"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Brooklyn",
    "addressRegion": "NY",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contact@vizionscop3.com",
    "contactType": "customer support"
  },
  "sameAs": [
    "https://github.com/vizionscop3",
    "https://linkedin.com/company/vizionscop3"
  ]
}
```

**On project pages (CreativeWork):**
```ts
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "The Masjid",
  "creator": { "@type": "Organization", "name": "VizionScop3 LLC" },
  "description": "...",
  "datePublished": "2024-...",
  "image": "..."
}
```

### 10.3 Sitemap Generation

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { projects } from '@/lib/projects/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!
  const now = new Date()

  return [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/work`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...projects.map(p => ({
      url: `${baseUrl}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8
    })),
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 }
  ]
}
```

---

## 11. Security

### 11.1 Headers (next.config.ts)

```ts
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cal.com https://*.sentry.io",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://*.supabase.co https://*.sentry.io https://api.resend.com https://hcaptcha.com https://*.hcaptcha.com",
      "frame-src 'self' https://cal.com https://*.cal.com https://hcaptcha.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ')
  }
]

export default {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  }
}
```

### 11.2 Input Sanitization

- All form input validated with Zod (server-side, never trust client)
- HTML in user content sanitized with DOMPurify (only relevant if user content is rendered)
- URL parameters validated before use
- SQL injection prevented by Supabase parameterized queries (never raw SQL)

### 11.3 Rate Limiting

Implement at edge using Upstash Redis or Vercel KV:

```ts
// lib/security/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export const contactLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1h'),  // 3 per hour
  analytics: true
})

export async function rateLimit(identifier: string) {
  const { success, limit, remaining, reset } = await contactLimiter.limit(identifier)
  return { success, limit, remaining, reset }
}
```

**V2 simpler alternative:** Use a Supabase row-count check (last hour) keyed on IP. Trade-off: not atomic but adequate for V2 traffic.

### 11.4 Secret Management

- All secrets in Vercel environment variables
- Never commit `.env.local`
- Service role key only in server-side code (API routes)
- Rotate Resend and Supabase keys quarterly

---

## 12. Testing Strategy

### 12.1 V2 Scope (Minimal Viable Testing)

Given the 5-day timeline, full test coverage is not realistic. V2 testing priorities:

1. **Type safety** — TypeScript strict mode catches most issues
2. **Manual testing** — Day 5 across browsers, devices, viewports
3. **Lighthouse CI** — Automated on PR
4. **axe-core** — Accessibility issues caught in dev
5. **Critical path smoke test** — Manual contact form submission test before launch

### 12.2 V3 Testing (Add Post-Launch)

- Vitest unit tests for utilities (`cn`, formatters, validation)
- Playwright E2E for critical paths (contact form, project navigation)
- Visual regression with Chromatic or Percy
- Component tests with Testing Library

### 12.3 Manual Test Checklist (Day 5)

- [ ] Contact form submission delivers email to inbox
- [ ] Confirmation email arrives in submitter inbox
- [ ] Cal.com embed loads and books test slot
- [ ] All project links to live builds work (Masjid, T-Trac, VizionFit Pro)
- [ ] Living Portfolio morphing works on Chrome, Safari, Firefox (desktop)
- [ ] Living Portfolio works on iOS Safari and Chrome Android
- [ ] Constellation Map readable and interactive on desktop
- [ ] Mobile constellation fallback works on iPhone SE (smallest target)
- [ ] All forms have working validation messages
- [ ] 404 page displays correctly on bad URLs
- [ ] Privacy and Terms pages load
- [ ] OpenGraph preview works on LinkedIn, iMessage, Slack, Twitter
- [ ] Lighthouse: Home, Work, Project Detail, About, Contact all 95+
- [ ] Keyboard-only navigation works through entire site
- [ ] VoiceOver reads home page correctly
- [ ] No console errors or warnings on any page
- [ ] DNS verified, SSL active, custom domain primary

---

## 13. Deployment & DevOps

### 13.1 Repository Setup

```bash
# Initialize repo
git init
git remote add origin git@github.com:vizionscop3/vizionscop3-site.git

# Branch protection (configure in GitHub):
# - main: require PR, require Lighthouse CI pass
# - dev: working branch
```

### 13.2 Vercel Configuration

1. Import repo to Vercel
2. Configure environment variables (all from `.env.local.example`)
3. Set production branch to `main`
4. Enable Vercel Analytics
5. Add custom domain (vizionscop3.com)
6. Verify SSL active before public launch

### 13.3 Custom Domain Setup (Day 1 — critical)

```
1. Purchase domain (Namecheap, Cloudflare Registrar, or similar)
2. In Vercel project: Settings → Domains → Add "vizionscop3.com"
3. Configure DNS at registrar:
   - A record: @ → 76.76.21.21
   - CNAME: www → cname.vercel-dns.com
4. Wait for propagation (can take 1-24 hours — start Day 1!)
5. Verify SSL certificate auto-provisioned
6. Force HTTPS in Vercel settings
```

### 13.4 CI/CD Pipeline

`.github/workflows/ci.yml`:
```yaml
name: CI
on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run build

  lighthouse:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v4
      - run: npx @lhci/cli@latest autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

### 13.5 Monitoring

- **Sentry** captures errors with source maps
- **Vercel Analytics** captures Core Web Vitals
- **Vercel Logs** captures API route invocations
- **Supabase Dashboard** monitors database health
- **Resend Dashboard** monitors email delivery

### 13.6 Post-Launch Health Checks

Within 24 hours of launch:
- [ ] Test contact form from real network
- [ ] Verify analytics events firing
- [ ] Check Sentry for any errors
- [ ] Confirm Apple Developer Program reviewer can access site
- [ ] Test on real iPhone, real Android, real iPad
- [ ] Submit to Google Search Console
- [ ] Submit sitemap.xml to Google
- [ ] Verify schema.org with Google Rich Results test

---

## 14. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| DNS propagation delays past Day 5 | Medium | High | Buy domain Day 0, configure Day 1 |
| Constellation Map performance issues | Low | Medium | Mobile fallback ready; SVG is lightweight |
| Form spam after launch | High | Low | hCaptcha + rate limiting from day one |
| Resend free tier exhausted | Low | Low | 3,000 emails/month free, 10K paid plan ready |
| Supabase free tier exhausted | Very Low | Low | Free tier covers 50K MAU |
| Lighthouse score drops with animations | Medium | Medium | Test after each animation; remove if regression |
| Apple rejects application due to incomplete site | Low | High | Run compliance checklist (PRD §13) twice |
| Copy not ready by Day 5 | Medium | Medium | Use placeholder warnings; ship with iteration plan |

---

## 15. Cursor Implementation Prompts (Ready to Use)

### Prompt 1: Day 1 Bootstrap
```
Read VizionScop3_PRD_V2.md, VizionScop3_TRD.md, VizionScop3_ERD.md, and .cursorrules.
We're starting Day 1 of a 5-day ship.
Bootstrap the Next.js 15 project per Section 2.3 folder structure and
Section 3.2 dependencies. Configure design tokens in styles/tokens.css and
tailwind.config.ts per the V1 PRD design system. Do not install any dependency
listed in Section 3.4. Create stub pages for all 7 routes. Set up Header and
Footer components. Stop when local dev server is running with all routes navigable.
```

### Prompt 2: Theme System
```
Implement Section 6.1 (Living Portfolio Morphing System) exactly as specified.
Create lib/projects/themes.ts, lib/theme/ThemeProvider.tsx, and the useProjectTheme
hook. Wire ThemeProvider into the marketing layout. Verify CSS variables update on
the document root when activeProject changes.
```

### Prompt 3: Project Data
```
Implement Section 5.1 (Static Data). Create lib/projects/types.ts with all
type definitions, then lib/projects/data.ts with three placeholder projects
matching the slugs the-masjid, t-trac, vizionfit-pro. Use [PLACEHOLDER]
markers for any content I need to fill in. Do not invent metrics or quotes.
```

### Prompt 4: Constellation Map
```
Implement Section 6.2 (Constellation Map). Build the desktop SVG version first
with the equilateral triangle layout. Test that node hover triggers theme morphing
via the existing ThemeProvider. Then build ConstellationMobile.tsx as the under-640px
fallback. Add the screen-reader-only structured list per Section 9.2.
```

### Prompt 5: Contact API
```
Implement Section 7.1 (POST /api/contact). Use the Zod schema from Section 6.4.
Implement rate limiting per Section 11.3 (use Upstash Redis if available, otherwise
fall back to a Supabase-based count check). Send notification and confirmation
emails per Section 7.1 step 5. Return appropriate status codes.
```

---

**End of TRD**

*This document is the engineering source of truth. Update it as decisions evolve.*
