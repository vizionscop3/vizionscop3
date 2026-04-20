# VizionScop3 LLC — Business Website
## Product Requirements Document (PRD)

**Version:** 1.0
**Owner:** Denward Lee Aulder (Vizion), Founder & CEO
**Last Updated:** April 2026
**Status:** Ready for Implementation
**Target IDE:** Cursor (AI-native development)

---

## 1. Executive Summary

VizionScop3 LLC requires a professional, innovative, and revolutionary business website that positions the company as a premier AI-native technology solutions provider. The site must communicate technical excellence, creative vision, and enterprise readiness to a diverse client base ranging from nonprofits to Fortune 500 enterprises.

This website replaces the personal portfolio as the primary business-facing digital presence. Where the portfolio showcases individual craft, the business site must convey **organizational capability, scalability, and trust**.

### 1.1 Vision Statement
> "VizionScop3 is where AI-native engineering meets visionary design — we build the digital infrastructure that carries organizations into their future."

### 1.2 Mission
Deliver world-class technology solutions (web, mobile, software, databases, AI infrastructure) to nonprofits, small businesses, corporations, and enterprises through an AI-accelerated development methodology that produces enterprise quality at startup speed.

### 1.3 Success Definition
A website that converts visitors into qualified leads, demonstrates proof of capability through completed work, and establishes VizionScop3 as a credible, innovative partner to organizations at every scale.

---

## 2. Goals & Objectives

### 2.1 Primary Business Goals
1. **Lead Generation** — Convert at least 5% of qualified visitors into consultation requests
2. **Credibility Building** — Position VizionScop3 as an enterprise-ready tech partner
3. **Portfolio Showcase** — Display 50+ client projects with measurable outcomes
4. **Service Clarity** — Clearly articulate six core service verticals
5. **Market Differentiation** — Communicate the "AI-native" methodology as a competitive advantage

### 2.2 User Experience Goals
1. Visitors understand what VizionScop3 does within **5 seconds** of landing
2. Interface feels **distinctly modern** — not another SaaS template
3. Navigation is intuitive across all audience types (nonprofit → enterprise)
4. Site performs exceptionally on mobile (60%+ of traffic expected)
5. Accessibility meets WCAG 2.1 AA standards

### 2.3 Technical Goals
1. Lighthouse Performance score: **95+**
2. First Contentful Paint: **< 1.2s**
3. Time to Interactive: **< 2.5s**
4. SEO-optimized with full schema markup
5. Zero runtime errors in production

---

## 3. Target Audience

### 3.1 Primary Personas

**Persona 1: Nonprofit Director "Naomi"**
- Runs a community organization with limited tech budget
- Needs: Website, donor management, simple CRM
- Pain: Intimidated by tech jargon, needs trust signals
- Decision drivers: Mission alignment, affordability, social proof

**Persona 2: Small Business Owner "Marcus"**
- Operates a growing service business (10-50 employees)
- Needs: Custom web app, automation, mobile presence
- Pain: Outgrown off-the-shelf tools, needs custom solutions
- Decision drivers: ROI, speed of delivery, ongoing support

**Persona 3: Corporate Product Lead "Priya"**
- Manages digital products at mid-to-large company
- Needs: AI integration, custom software, scalable infrastructure
- Pain: Internal teams backlogged, needs trusted external partner
- Decision drivers: Technical depth, past enterprise work, security posture

**Persona 4: Enterprise Procurement "Edward"**
- Sources vendors for large enterprises and government
- Needs: Vetted technology partners with compliance readiness
- Pain: Risk aversion, needs documented capability
- Decision drivers: Security clearance, certifications, case studies

### 3.2 Audience Segmentation on Site
The homepage must elegantly accommodate all four personas without fragmenting the experience. A "Who We Serve" section will let visitors self-identify and route to relevant proof points.

---

## 4. Brand Identity & Design Philosophy

### 4.1 Brand Voice
- **Confident but not arrogant** — We've done the work
- **Visionary but grounded** — Future-focused with proven results
- **Technical but human** — Expert language without exclusion
- **Innovative but reliable** — Revolutionary approach, enterprise stability

### 4.2 Design Aesthetic: "Neo-Futurist Enterprise"

An evolution of Vizion's signature "Material Neubrutomorphism" philosophy, adapted for enterprise credibility:

- **Bold geometric foundations** — strong grids, confident whitespace
- **Luminous depth** — subtle glows, layered glass effects
- **Kinetic storytelling** — purposeful motion that reveals information
- **Cosmic undertones** — nodding to Vizion's creative DNA without overwhelming business context
- **Engineered precision** — pixel-perfect alignment, mathematical harmony

### 4.3 Color System

**Primary Palette**
- Vizion Obsidian: `#0A0A0F` (primary background)
- Vizion Deep Space: `#12121A` (surface elevation)
- Vizion Midnight: `#1A1A2E` (elevated cards)

**Accent Palette**
- Electric Cyan: `#00F0FF` (primary action, innovation)
- Plasma Violet: `#7C3AED` (secondary, creative work)
- Solar Gold: `#FFB800` (highlights, success states)
- Circuit Green: `#00FF88` (data, AI indicators)

**Neutral Palette**
- Signal White: `#FAFAFA` (primary text on dark)
- Echo Gray: `#9CA3AF` (secondary text)
- Void Gray: `#374151` (borders, dividers)

### 4.4 Typography

**Display / Headlines**
- Primary: `Space Grotesk` (weights 500, 600, 700)
- Used for: Hero statements, section headers, impact text

**Body / UI**
- Primary: `Inter` (weights 400, 500, 600)
- Used for: Paragraphs, navigation, UI labels

**Mono / Technical**
- Primary: `JetBrains Mono` (weights 400, 500)
- Used for: Code snippets, technical specs, metric numerals

### 4.5 Motion Principles
- **Purposeful** — Every animation communicates meaning
- **Responsive** — 60fps minimum, respects `prefers-reduced-motion`
- **Tiered** — Macro (page transitions), Meso (section reveals), Micro (hover states)
- **Signature** — At least one memorable motion moment per page

---

## 5. Information Architecture

### 5.1 Primary Navigation
```
├── Home
├── Services
│   ├── Web Development
│   ├── Mobile Applications
│   ├── Custom Software
│   ├── Database Engineering
│   ├── AI Infrastructure
│   └── Technology Consulting
├── Work (Portfolio)
│   ├── All Projects
│   ├── By Industry
│   └── Case Studies
├── Industries
│   ├── Nonprofits
│   ├── Small Business
│   ├── Corporate
│   └── Enterprise & Government
├── About
│   ├── Our Story
│   ├── Methodology
│   ├── Team
│   └── Careers
├── Insights (Blog)
└── Contact
```

### 5.2 Footer Navigation
- Company (About, Careers, Press)
- Services (full service list)
- Resources (Blog, Case Studies, Documentation)
- Legal (Privacy, Terms, Accessibility)
- Connect (LinkedIn, GitHub, Email)

### 5.3 Conversion Pathways
Every page must surface at least one primary CTA and one secondary CTA:
- **Primary:** "Start a Project" / "Schedule Consultation"
- **Secondary:** "View Our Work" / "Download Capabilities Deck"

---

## 6. Page-by-Page Specifications

### 6.1 Homepage

**Purpose:** Immediately communicate value, capability, and differentiation.

**Sections (in order):**

**6.1.1 Hero Section**
- Full-viewport height with subtle animated background (particle field or geometric mesh)
- Headline: "Engineering the Future. Delivered Today."
- Subheadline: "VizionScop3 builds AI-native technology solutions for organizations ready to lead."
- Primary CTA: "Start Your Project"
- Secondary CTA: "Explore Our Work"
- Live metric counter strip: "50+ Clients • 200+ Projects Shipped • 6 Core Practices"

**6.1.2 Value Proposition Strip**
- Three columns: "AI-Native", "Enterprise-Ready", "Velocity-Driven"
- Each with icon, headline, one-sentence description

**6.1.3 Services Overview**
- 6-card grid showcasing core services
- Each card: Icon, title, one-line description, hover reveals more detail
- Services: Web, Mobile, Software, Databases, AI Infrastructure, Consulting
- Each card links to its dedicated service page

**6.1.4 Featured Work**
- Horizontal scrolling showcase of 5-8 signature projects
- Each project: Hero image/video, client name (or "Confidential" for NDA), category, one-line impact statement
- "View All Work" CTA at end

**6.1.5 Who We Serve**
- Four-tile layout: Nonprofits, Small Business, Corporate, Enterprise
- Each tile: representative imagery, headline, brief value proposition, "See how" link

**6.1.6 The VizionScop3 Method**
- Visual workflow showing AI-native development process
- Four phases: Discover → Architect → Build → Evolve
- Emphasize speed + quality advantage

**6.1.7 Social Proof**
- Client logo wall (or placeholder "Trusted By" section until logos approved)
- 2-3 rotating testimonial quotes with attribution
- Key metrics: "99.8% Uptime • 4.9/5 Client Satisfaction • 14-day Average MVP"

**6.1.8 Insights Preview**
- 3 latest blog posts / case studies
- Each with hero image, category tag, title, read time

**6.1.9 Final CTA Section**
- Large, bold "Ready to build what's next?"
- Dual CTA: "Start a Project" / "Schedule Consultation"
- Contact information footer

### 6.2 Services Hub Page

**Purpose:** Give comprehensive overview of all service offerings.

**Sections:**
- Hero with rotating service descriptors
- Full service grid (6 detailed cards)
- "How We Engage" — engagement models (Project, Retainer, Embedded)
- "Our Technology Stack" — visual grid of technologies we work with
- FAQ section
- CTA block

### 6.3 Individual Service Pages (×6)

**Template applies to:** Web Development, Mobile Applications, Custom Software, Database Engineering, AI Infrastructure, Technology Consulting

**Sections:**
- Service hero (bold title, specific value proposition, "What We Build" subheader)
- Capability breakdown (what's included, technologies used, typical timelines)
- Process overview (how we deliver this specific service)
- Relevant case studies (3-4 filtered by service type)
- Pricing framework (project ranges, engagement models)
- Service-specific FAQ
- CTA to consultation

### 6.4 Work/Portfolio Page

**Purpose:** Comprehensive proof of delivery capability.

**Features:**
- Filterable grid (by service, industry, technology)
- Each project card: hero visual, title, client (or anonymized), category tags, brief outcome
- Click-through to detailed case study
- Search functionality
- Sort options (Recent, Featured, By Industry)

### 6.5 Individual Case Study Pages

**Template structure:**
- Client logo / project hero image
- At-a-glance panel: Client, Industry, Timeline, Technologies, Team Size
- Challenge: 2-3 paragraphs on the problem
- Approach: Methodology and technical strategy
- Solution: Detailed build description with visuals
- Outcomes: Quantified results with metric cards
- Testimonial from client (when available)
- "Next Project" navigation
- CTA: "Start Your Project"

### 6.6 Industries Pages (×4)

**Template applies to:** Nonprofits, Small Business, Corporate, Enterprise & Government

**Structure:**
- Industry-specific hero with tailored messaging
- Challenges we solve (unique to this industry)
- Relevant services (filtered)
- Featured case studies from this industry
- Industry-specific testimonials
- Compliance/certifications relevant to this segment (especially Enterprise)
- Industry-specific CTA

**Special note for Enterprise page:** Highlight founder's Top Secret clearance, government-readiness, and security posture.

### 6.7 About Page

**Sections:**
- Founder introduction: Vizion's story (military service → tech entrepreneurship → AI-native leadership)
- Company origin and vision
- Core values (4-6 principles)
- Methodology deep-dive (the VizionScop3 Method)
- Team section (currently founder-led, structured to scale)
- Company milestones timeline
- CTA to work together

### 6.8 Insights/Blog Page

**Purpose:** Thought leadership and SEO.

**Features:**
- Category filtering (AI, Engineering, Design, Business, Case Studies)
- Featured article hero
- Grid of articles with previews
- Search functionality
- Newsletter signup integration

### 6.9 Contact Page

**Sections:**
- Hero: "Let's build something extraordinary."
- Contact form with fields: Name, Email, Organization, Organization Type (dropdown), Project Type (multi-select), Budget Range, Timeline, Project Description
- Direct contact info: Email, LinkedIn, scheduling link (Calendly or similar)
- Response time expectation: "We respond within one business day."
- Office information (Brooklyn, NY — remote-first)
- Alternative engagement: "Prefer to talk first? Schedule a 30-min discovery call."

---

## 7. Technical Specifications

### 7.1 Technology Stack

**Frontend Framework**
- **Next.js 15+** (App Router, React Server Components)
- **TypeScript** (strict mode)
- **Tailwind CSS** (for utility-first styling)
- **Framer Motion** (for sophisticated animations)
- **Three.js / React Three Fiber** (for hero 3D elements if applicable)
- **GSAP** (for advanced scroll animations)

**Content Management**
- **Sanity.io** or **Contentful** (headless CMS for portfolio, blog, case studies)
- **MDX** support for rich blog content

**Hosting & Infrastructure**
- **Vercel** (primary deployment)
- **Cloudflare** (CDN, DDoS protection, analytics)
- **Supabase** (contact form submissions, lead capture)

**Analytics & Monitoring**
- **Vercel Analytics** (performance)
- **Plausible** or **Fathom** (privacy-first analytics)
- **Sentry** (error monitoring)
- **Hotjar** or **Microsoft Clarity** (heatmaps)

**Forms & Integrations**
- **Resend** (transactional email)
- **Calendly** or **Cal.com** (scheduling)
- **HubSpot** or **Pipedrive** (CRM integration for leads)

### 7.2 Performance Requirements

| Metric | Target |
|---|---|
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| First Contentful Paint | < 1.2s |
| Largest Contentful Paint | < 2.0s |
| Time to Interactive | < 2.5s |
| Cumulative Layout Shift | < 0.05 |
| Total Blocking Time | < 200ms |

### 7.3 SEO Requirements

- Full schema.org markup (Organization, Service, Article, Person, LocalBusiness)
- OpenGraph and Twitter Card meta tags on every page
- Dynamic sitemap.xml generation
- robots.txt with clear directives
- Canonical URLs
- Semantic HTML5 structure
- Optimized meta descriptions per page
- Alt text for all imagery
- Structured breadcrumb navigation

### 7.4 Accessibility Requirements

- WCAG 2.1 Level AA compliance
- Keyboard navigation for all interactions
- Screen reader compatibility (ARIA labels, landmarks)
- Focus indicators on all interactive elements
- Color contrast ratios: 4.5:1 minimum (text), 3:1 (UI)
- `prefers-reduced-motion` respected
- Skip-to-content links
- Form validation with clear error messaging
- Video captions where applicable

### 7.5 Security Requirements

- HTTPS everywhere (HSTS enabled)
- Content Security Policy headers
- XSS protection headers
- Form submission rate limiting
- Bot protection (hCaptcha or Cloudflare Turnstile)
- Environment variables for all secrets
- No client-side exposure of API keys
- Regular dependency auditing

### 7.6 Browser Support

- Chrome/Edge (last 2 major versions)
- Safari (last 2 major versions)
- Firefox (last 2 major versions)
- Mobile Safari (iOS 15+)
- Chrome Android (last 2 versions)
- Graceful degradation for older browsers

### 7.7 Responsive Breakpoints

```
Mobile:     320px - 639px
Tablet:     640px - 1023px
Laptop:     1024px - 1279px
Desktop:    1280px - 1535px
Wide:       1536px+
```

---

## 8. Content Requirements

### 8.1 Copy Needed

| Content Type | Estimated Volume |
|---|---|
| Homepage copy | ~800 words |
| Service pages (×6) | ~600 words each |
| Industry pages (×4) | ~500 words each |
| About page | ~1,200 words |
| Case studies (initial 8-10) | ~800 words each |
| Blog launch content (5 articles) | ~1,500 words each |
| Legal pages | ~2,000 words total |

### 8.2 Visual Assets Needed

- 8-10 project hero images (1920×1080)
- Client logos (vector format preferred)
- Team photo of founder (high-res professional)
- Service illustrations or iconography (custom)
- Optional: Brand video for homepage hero
- Social sharing images per page (1200×630)
- Favicon suite (16×16 through 512×512)

### 8.3 Content Voice Guidelines

- Active voice, present tense
- Sentences under 25 words when possible
- Industry-specific language calibrated per audience
- No buzzword stacking ("synergistic AI-powered blockchain solutions")
- Prefer concrete claims ("Built for 10M+ users") over vague ones ("highly scalable")
- Technical accuracy is non-negotiable

---

## 9. User Experience Flows

### 9.1 Primary Conversion Flow

```
Homepage → Services (specific) → Case Study → Contact Form → Confirmation → Calendar Booking
```

### 9.2 Research Flow (Enterprise Procurement)

```
Homepage → About → Industries (Enterprise) → Case Studies → Capabilities Download → Contact
```

### 9.3 Discovery Flow (Small Business)

```
Homepage → Industries (Small Business) → Relevant Service → Pricing Framework → Contact
```

### 9.4 Talent Flow (Future Hires)

```
Homepage → About → Careers → Open Roles → Application
```

---

## 10. Integrations

### 10.1 Required Integrations

- **Email System** — Transactional emails (Resend recommended)
- **Calendar** — Consultation booking (Cal.com recommended)
- **CRM** — Lead capture and management
- **Analytics** — Multiple providers (Vercel + privacy-first + heatmaps)
- **Error Monitoring** — Sentry
- **Social Login** (optional) — For client portal in future phase

### 10.2 Future Phase Integrations

- Client portal (post-launch)
- Live chat (Intercom or custom)
- Documentation platform
- Support ticketing system

---

## 11. Implementation Phases

### Phase 1 — Foundation (Week 1)
- Project setup, repository, CI/CD pipeline
- Design system implementation (tokens, components)
- Core layout components (Header, Footer, Navigation)
- Homepage build
- Contact page with working form
- Deployment to staging

**Deliverable:** Live staging site with homepage and contact flow functional.

### Phase 2 — Services & About (Week 2)
- Services hub page
- All 6 individual service pages
- About page
- Industries hub and 4 industry pages
- SEO implementation
- Analytics integration

**Deliverable:** All static marketing pages complete and SEO-optimized.

### Phase 3 — Portfolio & Content (Week 3)
- CMS setup and content modeling
- Work/portfolio page with filtering
- Case study template and initial 8-10 case studies
- Blog infrastructure
- 5 launch blog articles
- Content migration

**Deliverable:** Full portfolio and content system operational.

### Phase 4 — Polish & Launch (Week 4)
- Motion and animation polish
- Performance optimization
- Accessibility audit and fixes
- Cross-browser testing
- Security audit
- Final content review
- Production deployment
- Post-launch monitoring setup

**Deliverable:** Production website live at vizionscop3.com.

---

## 12. Success Metrics & KPIs

### 12.1 Launch Metrics (Month 1)
- 1,000+ unique visitors
- 50+ qualified lead form submissions
- Average session duration: 2+ minutes
- Bounce rate: Under 50%
- Mobile traffic: 60%+

### 12.2 Growth Metrics (Month 3)
- 5,000+ monthly unique visitors
- 150+ monthly lead submissions
- 10+ consultation bookings per month
- Organic search traffic: 40%+ of total
- Top 10 Google ranking for 5+ target keywords

### 12.3 Business Metrics (Month 6)
- 10+ closed deals attributable to website
- $150K+ in pipeline sourced from site
- 3+ enterprise RFP invitations
- 20%+ month-over-month traffic growth
- Brand search volume growth

---

## 13. Risks & Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| Content production delays | High | Start content creation in parallel with Phase 1 |
| Client logo approvals | Medium | Design "Trusted By" placeholder that works without logos |
| Performance degradation from motion | Medium | Implement progressive enhancement; test on low-end devices |
| Scope creep | High | Lock v1 spec; maintain v2 backlog for new ideas |
| Accessibility issues | High | Audit at each phase; use axe-core in CI |
| Copy that feels generic | Medium | Founder review all copy; avoid templated language |

---

## 14. Post-Launch Roadmap (V2 Considerations)

- Client portal for active engagements
- Public GitHub integration showing open-source contributions
- Interactive service configurator ("Build Your Engagement")
- Live cost estimator for common project types
- Embedded AI assistant for visitor queries
- Video content library (case study videos)
- Podcast or interview series
- Multilingual support (Spanish priority)
- Community platform for nonprofit clients
- Partnership/affiliate program page

---

## 15. Development Notes for Cursor IDE

### 15.1 Cursor-Specific Workflow Recommendations

**Project Bootstrap**
```bash
npx create-next-app@latest vizionscop3-site --typescript --tailwind --app --eslint
cd vizionscop3-site
npm install framer-motion @sanity/client next-sanity lucide-react
```

**Folder Structure**
```
vizionscop3-site/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                 # Homepage
│   │   ├── about/
│   │   ├── services/
│   │   ├── work/
│   │   ├── industries/
│   │   ├── insights/
│   │   └── contact/
│   ├── api/
│   │   └── contact/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                          # Base design system
│   ├── sections/                    # Page sections
│   ├── layout/                      # Header, Footer, Nav
│   └── motion/                      # Animation components
├── lib/
│   ├── sanity.ts
│   ├── utils.ts
│   └── constants.ts
├── content/                         # If using MDX
├── public/
│   ├── assets/
│   └── fonts/
└── styles/
    └── tokens.css                   # Design tokens
```

**Cursor AI Instructions**
When using Cursor for implementation:
1. Reference this PRD in the project root
2. Use the design tokens in `styles/tokens.css` as source of truth
3. Build components mobile-first, then enhance for larger viewports
4. Every interactive element needs keyboard + screen reader testing
5. Run Lighthouse after every major section completion

### 15.2 Design Token Seed

```css
/* styles/tokens.css */
:root {
  /* Colors */
  --color-obsidian: #0A0A0F;
  --color-deep-space: #12121A;
  --color-midnight: #1A1A2E;
  --color-electric-cyan: #00F0FF;
  --color-plasma-violet: #7C3AED;
  --color-solar-gold: #FFB800;
  --color-circuit-green: #00FF88;
  --color-signal-white: #FAFAFA;
  --color-echo-gray: #9CA3AF;
  --color-void-gray: #374151;

  /* Typography */
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;
  --space-32: 8rem;

  /* Border radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.75rem;
  --radius-lg: 1.25rem;
  --radius-xl: 2rem;

  /* Shadows */
  --shadow-glow-cyan: 0 0 24px rgba(0, 240, 255, 0.25);
  --shadow-glow-violet: 0 0 24px rgba(124, 58, 237, 0.25);
  --shadow-elevation-1: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-elevation-2: 0 8px 24px rgba(0, 0, 0, 0.4);
  --shadow-elevation-3: 0 16px 48px rgba(0, 0, 0, 0.5);

  /* Motion */
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
  --duration-fast: 200ms;
  --duration-normal: 400ms;
  --duration-slow: 800ms;
}
```

### 15.3 Component Development Priorities

Build components in this order for maximum reusability:

1. **Primitives** — Button, Link, Badge, Tag, Icon
2. **Layout** — Container, Grid, Stack, Section
3. **Navigation** — Header, Mobile Menu, Footer, Breadcrumbs
4. **Content** — Heading, Prose, Quote, Code Block
5. **Cards** — Service Card, Project Card, Article Card, Testimonial Card
6. **Forms** — Input, Textarea, Select, Checkbox, Form Field, Contact Form
7. **Motion** — Fade In, Slide In, Stagger, Parallax, Scroll Reveal
8. **Sections** — Hero, Feature Grid, CTA Block, Logo Wall, Stats Strip
9. **Templates** — Page layouts, case study template, service template
10. **Pages** — Assembled from all above

---

## 16. Appendix

### 16.1 Reference & Inspiration

Sites to study for specific qualities (not to copy):
- **Linear.app** — For clean enterprise aesthetics
- **Vercel.com** — For technical credibility and motion
- **Stripe.com** — For service page clarity
- **Work & Co** — For case study presentation
- **Instrument.com** — For creative technology positioning
- **Basic Agency** — For bold typography and grid
- **Active Theory** — For kinetic signature moments

### 16.2 Open Questions for Stakeholder Review

1. Is "VizionScop3" always stylized this way, or are variations acceptable?
2. Are any existing client NDAs prohibiting case study publication?
3. What is the launch date target?
4. Is there an existing design system or brand bible to align with?
5. Should the site support multiple languages at launch?
6. What is the budget ceiling for premium tools (CMS, analytics)?
7. Who owns content writing — internal, Claude-assisted, or contracted writer?
8. Will the site need a client portal at launch or post-launch?

### 16.3 Glossary

- **AI-Native** — Development methodology where AI tooling is integral, not supplemental
- **Material Neubrutomorphism** — Vizion's signature design aesthetic blending Material Design principles with neo-brutalist confidence and neumorphic depth
- **RSC** — React Server Components
- **WCAG** — Web Content Accessibility Guidelines
- **LCP** — Largest Contentful Paint (Core Web Vital)
- **TTI** — Time to Interactive

---

## 17. Approval & Sign-Off

| Role | Name | Status | Date |
|---|---|---|---|
| Founder & CEO | Denward Lee Aulder (Vizion) | Pending | — |
| Technical Lead | TBD | Pending | — |
| Design Lead | TBD | Pending | — |

---

**End of Document**

*This PRD is a living document. Version history and changes are tracked in the project repository.*
