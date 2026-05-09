# VizionScop3 LLC — Website V2 (Portfolio-First, Ship This Week)
## Product Requirements Document

**Version:** 2.0 (supersedes V1)
**Owner:** Denward Lee Aulder (Vizion), Founder & CEO
**Last Updated:** May 2026
**Status:** READY TO BUILD — 5-day ship target
**Primary Use Case:** Live business presence for Apple Developer Program application
**Target IDE:** Cursor

---

## 1. Strategic Reframe

### What changed from V1

V1 was an enterprise-credibility marketing site. V2 is a **portfolio-first business showcase** that doubles as proof of operation for Apple's Developer Program review.

This site has **one job:** when an Apple reviewer or any visitor lands here, they must immediately understand:
1. VizionScop3 is a real, operating technology business
2. It has shipped real, deployable products
3. The work is serious, the craft is high, and the vision is distinct

Everything else (deep service pages, blog, complex CMS) is **deferred to V3.**

### The four feelings, mapped to specific moments

You said you want all four feelings. Here's how each is delivered without diluting the others:

| Feeling | Where it lives |
|---|---|
| **"This ships real work"** (credibility) | Hero metrics strip, live project links, GitHub integration, founder bio |
| **"Holy shit, this site is alive"** (innovation) | Living Portfolio morphing, Constellation Map, ambient audio toggle |
| **"I want to work with them"** (warmth) | Founder voice in copy, project storytelling, simple contact |
| **"Different level"** (premium) | Restraint, typography, motion polish, silence around the work |

**The unifying principle:** restraint creates premium, motion creates aliveness, real work creates credibility, your voice creates warmth. None of these fight each other.

---

## 2. Scope (Locked for V2)

### What we're building

- **5 pages total** — Home, Work (portfolio), Project Detail (template, used 3x), About, Contact
- **3 anchor projects** — The Masjid, T-Trac, VizionFit Pro
- **3 signature interactions** — Living Portfolio morphing, Constellation Map, Live Build ticker
- **Full responsive** — mobile-first, tested 375px through 1920px
- **Apple-ready compliance** — proper LLC identification, contact info, privacy policy

### What we're NOT building in V2

These are explicitly deferred — do not let scope creep them in:

- Blog / Insights / CMS (Sanity setup)
- Individual service pages (services live as a single section on home)
- Industry pages (Nonprofits/SMB/Corporate/Enterprise)
- Client portal
- Interactive service configurator
- AI chatbot / conversational flow
- Multi-language support
- Newsletter system
- Career page

We will note V3 placement for each in Section 14.

---

## 3. Five-Day Build Schedule

This is the only realistic path to a live, polished site this week.

### Day 1 — Foundation (Monday)
- Project bootstrap (Next.js 15, TypeScript, Tailwind, Framer Motion)
- Design tokens and base layout
- Header, Footer, basic routing
- Deploy skeleton to Vercel (custom domain configured)
- **End of day:** Live URL, navigable shell, real domain pointing

### Day 2 — Home Page (Tuesday)
- Hero with kinetic background
- Live Build ticker
- Featured Work strip (3 projects)
- Services section (compact, single page)
- About preview
- CTA block
- **End of day:** Home page complete and polished

### Day 3 — Work Pages (Wednesday)
- Constellation Map view (work index page)
- Project detail template
- Build out The Masjid, T-Trac, VizionFit Pro project pages
- Living Portfolio morphing system
- **End of day:** All portfolio pages live and interactive

### Day 4 — About + Contact + Polish (Thursday)
- About page (founder story, values, methodology)
- Contact page with working form (Resend integration)
- Privacy Policy + Terms (required for Apple)
- 404 + error pages
- Cross-page motion polish
- **End of day:** All pages complete

### Day 5 — Launch Prep (Friday)
- Performance audit (Lighthouse 95+ pass)
- Accessibility audit
- SEO + OpenGraph
- Cross-browser testing
- Mobile testing on real devices
- DNS verified, SSL active
- Submit Apple Developer Program application
- **End of day:** SHIPPED

---

## 4. Apple Developer Program Compliance Checklist

Apple's reviewers verify your business is legitimate. The site MUST display:

- [ ] **Legal entity name** "VizionScop3 LLC" in footer
- [ ] **Physical business address** (Brooklyn, NY — use registered LLC address)
- [ ] **Working contact email** at your business domain
- [ ] **Phone number** (Google Voice business number is fine)
- [ ] **Privacy Policy** linked from footer
- [ ] **Terms of Service** linked from footer
- [ ] **Clear description** of services offered
- [ ] **Real domain** (vizionscop3.com or similar — not Vercel subdomain)
- [ ] **HTTPS** with valid SSL certificate
- [ ] **Professional appearance** with no placeholder content
- [ ] **About page** explaining the business and founder
- [ ] **Portfolio of real work** demonstrating capability

These are non-negotiable. They go on the Day 1 setup list.

---

## 5. Site Architecture (Lean V2)

```
vizionscop3.com/
├── /                         # Home
├── /work                     # Portfolio (Constellation view)
│   ├── /work/the-masjid     # Project detail
│   ├── /work/t-trac         # Project detail
│   └── /work/vizionfit-pro  # Project detail
├── /about                    # Founder + company story
├── /contact                  # Contact form + scheduling
├── /privacy                  # Privacy policy
└── /terms                    # Terms of service
```

**That's it.** Eight URLs, three of which are project detail pages from a single template.

---

## 6. Signature Interactions (The Three That Carry the Site)

These are the three moments that make this site unmistakable. Each is scoped to be buildable in a day.

### 6.1 The Living Portfolio (Morphing System)

**What it is:** When a visitor hovers over (desktop) or taps (mobile) a project card on the home page or work page, the entire site momentarily takes on that project's color signature. The background shifts, accent colors adapt, motion timing recalibrates. It's like the site is "tuning into" the project.

**Why it works:** Most portfolios show range by listing things. Yours *demonstrates* range by *transforming*. It says: "I don't just build different products — I think in different aesthetics."

**Project signatures:**

| Project | Hue | Mood | Motion |
|---|---|---|---|
| **The Masjid** | Deep emerald + warm gold | Sacred, contemplative, calm | Slow, breathing |
| **T-Trac** | Clinical blue + signal cyan | Precise, data-forward, trustworthy | Sharp, immediate |
| **VizionFit Pro** | Electric red + solar gold | Kinetic, powerful, alive | Energetic, bouncy |

**Implementation:**
- CSS custom properties for theme variables
- Framer Motion `animate` on the document body or a wrapper
- 600ms transition with `ease-out-expo`
- Reverts to default theme when hover ends or 4 seconds after tap
- Respects `prefers-reduced-motion` (color shift only, no motion changes)

**Code shape:**
```tsx
// app/(marketing)/components/ProjectMorpher.tsx
'use client'
import { motion, useReducedMotion } from 'framer-motion'

const projectThemes = {
  masjid: { primary: '#10B981', accent: '#F59E0B', timing: 'slow' },
  ttrac: { primary: '#0EA5E9', accent: '#00F0FF', timing: 'fast' },
  vizionfit: { primary: '#EF4444', accent: '#FFB800', timing: 'energetic' },
  default: { primary: '#00F0FF', accent: '#7C3AED', timing: 'normal' }
}

// Apply theme to root via CSS variables on hover/tap
```

### 6.2 The Constellation Map (Work Page)

**What it is:** The /work page renders projects as nodes in a connected constellation. Lines between them show shared technologies (Anthropic API, Supabase, React Native, Pinecone). Drag to pan. Tap a node to enter that project. Tap a connection line to highlight all projects sharing that technology.

**Why it works:** It tells the story of your technical architecture in a single glance. Visitors don't just see three projects — they see your *system*. It's a portfolio that reads as a technical thesis.

**Three nodes for V2 (designed to scale to 10+ in V3):**
- **The Masjid** — connected to: Anthropic, Pinecone, RAG, mobile
- **T-Trac** — connected to: Anthropic, Supabase, Pinecone, React Native, healthcare
- **VizionFit Pro** — connected to: Anthropic, Supabase, mobile, AI fitness

**Shared edges visible at launch:**
- Anthropic API connects all three
- Pinecone connects Masjid + T-Trac
- Supabase connects T-Trac + VizionFit Pro
- Mobile-first connects all three

**Implementation:**
- React Flow OR custom SVG with `<line>` and `<circle>` elements
- Recommend: simple custom SVG for V2 (lighter, full control), React Flow for V3 if scaling
- Nodes are draggable on desktop, tappable on mobile
- Mobile fallback: stacked card layout if viewport < 640px (the constellation doesn't read at small sizes)
- Subtle pulsing on each node (1.5s loop) using Framer Motion
- Connection lines have 30% opacity until hovered, then 100%

**Mobile alternative:** Below 640px, render projects as a vertical stack with a small "shared tech" badge row beneath each, so the relationship story is preserved without the spatial layout.

### 6.3 The Live Build Ticker

**What it is:** A persistent narrow strip (top of page or above footer) showing real-time activity from your work. "Currently shipping: T-Trac Phase 4 beta." "Last commit: 2 hours ago." "Active project: VizionScop3 Business Platform."

**Why it works:** Static portfolios feel like museums. This makes the site feel like a living workshop. Visitors see *momentum* — that you're not pitching past work, you're building right now.

**Data sources (lightest possible):**
- **Static config** for V2 — a `siteConfig.ts` file with current focus that you edit weekly
- **GitHub API** (V2.5 if time permits) — pulls latest public commit timestamp
- **Manual override** always available

**Implementation:**
- Slim 32px tall strip with mono font
- Auto-rotating messages (4 second hold each)
- "Live" indicator (pulsing green dot — Circuit Green)
- Subtle, never distracting from main content

**Example messages:**
```
LIVE → Currently shipping: T-Trac Phase 4 beta
LIVE → Last commit pushed 2h ago
LIVE → Now accepting Q3 project briefs
LIVE → The Masjid: 36,313+ hadiths indexed
```

---

## 7. Page-by-Page Specifications

### 7.1 Home Page

**Goal:** Within 5 seconds, visitors know what VizionScop3 is, that the work is real, and that something interesting is happening.

**Sections (in order, mobile-first):**

**7.1.1 Live Build Ticker (top strip)**
- Always visible
- 32px height, mono font, dark background

**7.1.2 Hero**
- Full viewport height on desktop, 90vh on mobile
- Headline: "Engineering the future. Shipping it today."
- Subheadline: "VizionScop3 is an AI-native technology studio building serious tools for nonprofits, businesses, and enterprises."
- Primary CTA: "See the work" → /work
- Secondary CTA: "Start a project" → /contact
- Background: subtle animated mesh gradient (CSS or Three.js — see Section 8)
- Below the fold indicator: "Scroll" with subtle bounce

**7.1.3 Founder Identity Strip**
- Three pills with quick credibility signals:
  - "U.S. Air Force veteran"
  - "Top Secret clearance"
  - "Brooklyn, NY"
- Sets tone immediately: this is a real person, with real credentials, in a real place

**7.1.4 Featured Work (Living Portfolio)**
- 3-card horizontal scroll on desktop, vertical stack on mobile
- Each card:
  - Project hero image/screenshot
  - Project name
  - One-line value statement
  - Tech stack badges (3-4 max)
  - "Explore →" arrow
- Hover/tap triggers Living Portfolio morphing
- "View full portfolio" CTA below leading to /work

**7.1.5 What We Build (Compact Services)**
- Single section, 6 service tiles in a 2x3 (mobile: 1 column, desktop: 3 columns)
- Each tile is small: icon + title + 1 sentence
  1. Web Development
  2. iOS & Android Apps
  3. Custom Software
  4. AI Infrastructure
  5. Database Engineering
  6. Technology Consulting
- No links to deep service pages (those are V3) — instead, a single "Discuss your project" CTA below

**7.1.6 The Method (Single visual block)**
- Four-stage horizontal flow: **Discover → Architect → Build → Evolve**
- One sentence per stage
- Visual: animated connecting lines between stages

**7.1.7 Founder Block**
- Photo of Vizion + 2-paragraph intro
- Quote pulled from About page
- "About VizionScop3 →" link

**7.1.8 Final CTA**
- Large "Ready to build something real?"
- Dual CTA: "Start a project" / "Schedule a 30-min call"

### 7.2 Work Page (/work)

**Goal:** Immerse visitors in the constellation. Show that the projects are connected, intentional, and built on shared infrastructure.

**Sections:**

**7.2.1 Page Hero (compact)**
- Headline: "Three projects. One thesis."
- Subhead: "Every VizionScop3 product is AI-native, mobile-first, and built to ship. Explore how they connect."

**7.2.2 The Constellation**
- Full-width interactive map (desktop)
- Stacked card list (mobile)
- Filter chips above: "Show all" / "AI/ML" / "Mobile" / "Healthcare"
- Tapping a node navigates to the project detail page

**7.2.3 Below the constellation**
- Brief text: "Want to see something in particular? Reach out — much of our work is under NDA but we share generously in conversation."

### 7.3 Project Detail Pages (×3)

**Template — same structure for The Masjid, T-Trac, VizionFit Pro**

**7.3.1 Hero**
- Project name, role ("Designed and built by Vizion / VizionScop3")
- One-line statement of what it is
- Status pill: "Live" / "In Beta" / "In Development"
- Hero image or video loop of the product
- Two CTAs:
  - **Primary: "View the live build →"** (deep link to deployed app, GitHub, or product site)
  - **Secondary: "Read the case study"** (smooth scrolls to detail below)

**7.3.2 At-a-glance panel**
- Type, Platform, Tech stack, Timeline, Status, Industry
- Clean horizontal panel with mono font

**7.3.3 The Why (Challenge)**
- 2-3 paragraphs on why this exists, who it's for, what problem it solves

**7.3.4 The How (Approach)**
- Technical architecture overview
- Visual: simple architecture diagram (SVG)
- Key technical decisions explained

**7.3.5 Selected Screens / Demos**
- 4-6 screenshots with brief captions
- For T-Trac: respect health privacy — show UI shell, not real user data

**7.3.6 The Outcome**
- What shipped, what users get, what's next
- Quantified where possible (hadith count, beta tester count, etc.)

**7.3.7 Tech Stack Detail**
- Full list of technologies, presented as elegant badges
- Linked to docs where appropriate

**7.3.8 Next Project**
- "Next: [adjacent project]" navigation
- Maintains constellation continuity

#### Project-specific notes

**The Masjid:**
- Lead with: "An Islamic prayer companion built on RAG over 36,313+ hadiths"
- CTA: link to App Store, Play Store, or web app
- Tone: reverent, calm, technically rigorous
- Tech anchors: Anthropic API, Pinecone vector DB, RAG architecture, location services

**T-Trac:**
- Lead with: "HRT medication tracking built for transgender men, with HIPAA compliance built in"
- CTA: link to Expo beta or waitlist signup
- Tone: clinical, trustworthy, precise
- Tech anchors: React Native/Expo, Supabase, Pinecone, Auth0, mandated reporting compliance
- **Important:** Frame the case study with care — health data privacy is the lead, not an aside

**VizionFit Pro:**
- Lead with: "An AI fitness platform combining Charles Glass and Jeff Cavaliere methodologies"
- CTA: link to current product status (waitlist, beta, or marketing page)
- Tone: kinetic, energetic, expert-driven
- Tech anchors: Mobile, AI personalization, fitness science integration

### 7.4 About Page (/about)

**Goal:** Make visitors feel they know the person behind the work.

**Sections:**

**7.4.1 Hero**
- Photo of Vizion (professional, full-body or strong portrait)
- Name, title, location
- One-sentence positioning: "Building the digital infrastructure for organizations ready to lead."

**7.4.2 The Origin**
- 3-4 paragraphs in your voice
- Cover: military service → Pursuit AI Native Program → first builds → founding VizionScop3
- Personal but professional — this is what makes the site warm

**7.4.3 What we believe**
- 4-6 short principles, each one line:
  - "AI-native is not a buzzword. It's a methodology."
  - "Real ships beat perfect demos."
  - "Design language has integrity."
  - "Speed without quality is debt."
  - (Customize from your actual values)

**7.4.4 The Method (expanded from home)**
- Same Discover → Architect → Build → Evolve frame
- One paragraph per phase

**7.4.5 The Stack**
- Visual grid of technologies you build with
- Grouped: Frontend, Backend, AI/ML, Mobile, Infrastructure
- Small, dense, technical — proves depth

**7.4.6 Final block**
- "Want to build something real?"
- CTAs to /contact and /work

### 7.5 Contact Page (/contact)

**Goal:** Make it dead simple to start a conversation.

**Sections:**

**7.5.1 Hero**
- "Let's talk."
- Subhead: "Tell me about what you're building. I respond within one business day."

**7.5.2 Form (single column, generous spacing)**
- Name (required)
- Email (required)
- Organization name
- Organization type (dropdown: Nonprofit / Small Business / Corporate / Enterprise / Other)
- Project type (multi-select: Web / Mobile / Software / AI / Database / Consulting / Other)
- Budget range (dropdown: Under $10K / $10-50K / $50-150K / $150K+)
- Timeline (dropdown: ASAP / 1-3 months / 3-6 months / Flexible)
- Tell me about your project (textarea, required)
- Submit button

**7.5.3 Alternative contact**
- Email: hello@vizionscop3.com (or your domain)
- "Prefer to talk first? Schedule a 30-min discovery call →" (Cal.com link)

**7.5.4 What happens next**
- 1-2-3 numbered list:
  1. I review your inquiry within one business day
  2. We schedule a brief call to align on scope
  3. You receive a written proposal within 5 business days

### 7.6 Privacy Policy + Terms (/privacy, /terms)

**Use a generator** (Termly, iubenda, or similar) for V2. Customize with:
- VizionScop3 LLC as the entity
- Brooklyn, NY business address
- Contact email
- Specific data collection: contact form, analytics

These do not need to be beautiful — they need to be **present, accurate, and complete** for Apple review.

---

## 8. Design System (V2 — Refined from V1)

The V1 tokens still apply. Refinements for portfolio-first context:

### 8.1 Hero Background Approach

For Day-1 ship speed, choose ONE:

**Option A — Pure CSS (recommended for speed)**
- Animated mesh gradient using `radial-gradient` and CSS animation
- Zero JS, zero performance cost
- Beautiful, modern, maintainable

**Option B — Three.js / R3F (only if Day 1 has buffer)**
- Subtle particle field or shader plane
- More distinct but adds 80kb+ to bundle
- Recommend deferring to V2.5

**Verdict for this week: Option A.** Ship speed matters more than maximum visual ambition.

### 8.2 Project Theme System

Each project gets a `theme.ts` config:

```ts
// lib/projects/themes.ts
export const projectThemes = {
  masjid: {
    primary: '#10B981',     // emerald
    accent: '#F59E0B',      // gold
    surface: '#0A1F1C',
    motion: 'breathing',
    audio: '/audio/masjid-ambient.mp3' // optional V2.5
  },
  ttrac: {
    primary: '#0EA5E9',     // sky blue
    accent: '#00F0FF',      // cyan
    surface: '#0A1929',
    motion: 'precise',
    audio: '/audio/ttrac-ambient.mp3'
  },
  vizionfit: {
    primary: '#EF4444',     // red
    accent: '#FFB800',      // gold
    surface: '#1A0808',
    motion: 'kinetic',
    audio: '/audio/vizionfit-ambient.mp3'
  }
}
```

This config drives: project cards, project detail pages, and the Living Portfolio morphing on hover.

---

## 9. Standout Polish Details (Cheap, High-Impact)

These are the small details that take 30 minutes each but massively elevate perceived quality. Build all of them.

1. **Cursor halo on desktop** — A subtle 32px translucent circle follows the cursor on the home page hero only. Vanishes on scroll.

2. **Numbers count up on scroll** — Hadith count, project count, etc. animate from 0 to value on viewport entry. Mono font with subtle glow.

3. **Smart skeleton states** — When project pages load, skeleton matches final layout exactly (not generic gray boxes). Uses the project's theme color in the shimmer.

4. **404 page with personality** — "This page is still in the workshop." With a small ankh mark animation. Routes back to /work.

5. **Form success state** — After submission, replace the form with a celebratory message using Solar Gold accent. Includes calendar link as next step.

6. **Project tech badges** — Hover any tech badge to see a tooltip explaining what it is and why it was chosen for that project. Tiny detail, huge polish signal.

7. **Smooth in-page anchor scrolling** — Every CTA that scrolls to a section uses a custom easing (0.8s ease-out-expo). The site *feels* expensive.

8. **Image lazy loading with blur-up** — Use `next/image` with `placeholder="blur"` for all project screenshots. No layout shift, ever.

9. **Footer ankh easter egg** — The ankh mark in the footer pulses subtly. Click it 3 times → small modal with a personal note from Vizion. Aligns with your brand DNA without being weird.

10. **"Now playing" indicator on About page** — A tiny audio toggle that plays subtle ambient (one of your healing frequencies) while reading the founder story. Off by default, with a clear toggle. Visitors who turn it on never forget the site.

---

## 10. Technical Stack (V2 — Minimal)

```
Framework:    Next.js 15 (App Router)
Language:     TypeScript (strict)
Styling:      Tailwind CSS v3 + custom tokens
Motion:       Framer Motion
Forms:        React Hook Form + Zod
Email:        Resend
Scheduling:   Cal.com (embed)
Hosting:      Vercel
Domain:       Custom domain (Cloudflare DNS)
Analytics:    Vercel Analytics (zero config)
Errors:       Sentry (free tier)
Icons:        Lucide React
Fonts:        Space Grotesk + Inter + JetBrains Mono via next/font
```

**Deferred from V1, do NOT install in V2:**
- Sanity / any CMS (use static content + MDX if needed)
- GSAP (Framer Motion handles everything)
- Three.js / R3F (CSS hero is enough)
- HubSpot/Pipedrive integrations
- Hotjar / Plausible (Vercel Analytics is enough for V2)

---

## 11. Performance Budgets (Same as V1, Enforced)

| Metric | Target |
|---|---|
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| LCP | < 2.0s |
| TTI | < 2.5s |
| CLS | < 0.05 |
| Total JS bundle | < 200KB gzipped |

Run Lighthouse on Day 5 morning. Fix anything that fails before launch.

---

## 12. Content Required (Realistic Volume)

| Content | Volume | Source |
|---|---|---|
| Home copy | ~400 words | Write this week |
| Work intro | ~50 words | Write this week |
| 3 project case studies | ~600 words each | Write this week — you have the context |
| About story | ~600 words | Write this week — your story |
| Contact copy | ~100 words | Write this week |
| Privacy + Terms | ~2,000 words | Generator + customize |

**Realistic copy time: 6-8 hours total.** Block one evening for it.

### Content production tip

Use Claude (in another session) to draft each section based on your existing project context. Then revise to your voice. Don't write from scratch — revise from drafts.

---

## 13. Apple Developer Program Alignment

Specific things on this site that help your application:

1. **Footer entity disclosure:** "© 2026 VizionScop3 LLC. Brooklyn, NY."
2. **About page founder credentials:** Air Force veteran, Top Secret clearance, Brooklyn-based
3. **Mobile work prominently shown:** T-Trac (React Native) and VizionFit Pro on home + work
4. **Privacy Policy:** Required by Apple and listed in account application
5. **Working contact email at custom domain:** Apple verifies the domain matches business
6. **Real, deployed work:** The Masjid case study with App Store link (if available)
7. **No placeholder content:** Every word, every image, every link must be real on launch

When you submit your D-U-N-S Number application and Apple Developer Program enrollment, they will visit this site. Make sure every link works, every image loads, every page renders.

---

## 14. V3 Roadmap (Built When You Have Time)

These are the things explicitly NOT in V2, with target priority:

### V2.5 (Add within 2-4 weeks of launch)
- GitHub API integration in Live Build ticker
- Project ambient audio system
- Tech stack tooltips
- Newsletter capture

### V3.0 (1-3 months after launch)
- Full service pages (Web, Mobile, Software, AI, Database, Consulting)
- Industries pages (Nonprofits, SMB, Corporate, Enterprise)
- Blog / Insights with Sanity CMS
- Conversational service flow (Anthropic API)
- Client portal authentication
- Three.js hero option
- Multi-language support (Spanish first)
- Career page + applications

### V4.0 (Long-term)
- Live cost estimator
- Public GitHub stats integration
- Podcast / video content library
- Community platform
- Affiliate / partnership program

---

## 15. Day-by-Day Build Checklist

### Day 1 Setup
- [ ] `npx create-next-app@latest` with TypeScript, Tailwind, App Router
- [ ] Install: framer-motion, react-hook-form, zod, resend, lucide-react
- [ ] Configure design tokens in `globals.css`
- [ ] Configure `tailwind.config.ts` with color palette
- [ ] Set up Header, Footer, root layout
- [ ] Create stub pages for all 7 routes
- [ ] Connect custom domain via Vercel + Cloudflare
- [ ] Verify SSL active

### Day 2 Home
- [ ] Hero with CSS animated mesh gradient
- [ ] Live Build ticker component
- [ ] Featured Work (3-card scroll)
- [ ] Founder identity strip
- [ ] Services compact grid
- [ ] Method section
- [ ] Founder block
- [ ] Final CTA

### Day 3 Work
- [ ] Constellation Map component (desktop)
- [ ] Mobile stacked alternative
- [ ] Project detail template
- [ ] Living Portfolio morphing system
- [ ] The Masjid project page
- [ ] T-Trac project page
- [ ] VizionFit Pro project page

### Day 4 About + Contact
- [ ] About page with founder story
- [ ] Method expanded
- [ ] Stack visualization
- [ ] Contact form with React Hook Form + Zod
- [ ] Resend email integration
- [ ] Form success state
- [ ] Cal.com embed
- [ ] Privacy policy
- [ ] Terms of service
- [ ] 404 page
- [ ] Error boundary pages

### Day 5 Polish + Launch
- [ ] Cursor halo on home hero
- [ ] Numbers count up animation
- [ ] Skeleton loaders
- [ ] Form success polish
- [ ] Tech badge tooltips
- [ ] Footer ankh easter egg
- [ ] OpenGraph images for all pages
- [ ] Schema.org JSON-LD
- [ ] Sitemap.xml
- [ ] robots.txt
- [ ] Lighthouse audit (must pass)
- [ ] Accessibility audit (axe-core)
- [ ] Mobile device testing
- [ ] Cross-browser testing
- [ ] Submit Apple Developer application

---

## 16. Risks for V2 Specifically

| Risk | Mitigation |
|---|---|
| Constellation Map too complex for Day 3 | Custom SVG fallback ready; simple stacked grid is acceptable backup |
| Living Portfolio motion janky on mobile | Disable morphing on touch devices; color-only on hover |
| Domain DNS propagation delays | Buy/configure domain Day 1, not Day 5 |
| Copy isn't ready by Day 5 | Use placeholder warning blocks; ship structurally complete site |
| Apple rejection due to incomplete site | Run through Section 13 checklist twice before submitting |
| Performance regression from animations | Test Lighthouse after each interaction added; remove anything that drops score |

---

## 17. Cursor Implementation Notes

When prompting Cursor for this build:

1. **Start with:** "Read VizionScop3_PRD_V2.md and the .cursorrules file. We're building Day 1 of a 5-day ship. Start with project bootstrap and base layout."

2. **For each section, reference the PRD:** "Build Section 7.1.4 Featured Work using the Living Portfolio morphing system from Section 6.1."

3. **When AI suggests scope expansion, redirect:** "That's V3. V2 ships Friday. What's the simplest version that works?"

4. **For copy:** Don't let Cursor invent client names, metrics, or quotes. Use bracketed placeholders for anything that needs your real input.

5. **Test as you go:** After each section, run `npm run dev`, check on mobile (375px), check accessibility tab. Don't accumulate debt.

---

## 18. Sign-Off Checklist Before Launch

Before pushing to production Friday afternoon:

- [ ] All 8 URLs render without errors
- [ ] Contact form delivers emails to your inbox (test it)
- [ ] Cal.com embed works
- [ ] Living Portfolio morphing tested on Chrome, Safari, Firefox
- [ ] Constellation Map readable on desktop, gracefully degrades on mobile
- [ ] Lighthouse Performance ≥ 95 on home, work, project detail
- [ ] Accessibility ≥ 100 on every page
- [ ] All links to live builds (Masjid, T-Trac, VizionFit Pro) work
- [ ] Privacy and Terms pages present and accurate
- [ ] Footer shows VizionScop3 LLC + address + contact
- [ ] Custom domain active with valid SSL
- [ ] No console errors or warnings
- [ ] Tested on real iPhone and real Android device
- [ ] OpenGraph preview tested on LinkedIn / iMessage / Slack
- [ ] Submit to Google Search Console
- [ ] Submit Apple Developer Program application

---

**End of V2 PRD**

*This is the lean, focused, ship-this-week plan. V1 is the long-term roadmap; V2 is the launch.*
