# VizionScop3 site — Next.js 15 (App Router)

Stack: Next 15, React 18, Tailwind 3, Framer Motion, Supabase, Resend, hCaptcha.

See repo-root `VizionScop3_PRD_V2.md`, `VizionScop3_TRD.md`, `VizionScop3_ERD.md`.

## Local

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

## Supabase

Apply migrations in `supabase/migrations/` via Supabase CLI (`supabase db push`) or SQL editor.
