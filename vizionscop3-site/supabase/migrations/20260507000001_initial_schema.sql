-- VizionScop3 — initial schema (ERD §7)
BEGIN;

CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  organization text,
  organization_type text NOT NULL,
  project_types text[] NOT NULL,
  budget_range text NOT NULL,
  timeline text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  ip_address text,
  user_agent text,
  referrer text,
  responded_at timestamptz,
  internal_notes text
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions (created_at DESC);

CREATE OR REPLACE FUNCTION public.set_updated_at ()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS contact_submissions_updated ON public.contact_submissions;

CREATE TRIGGER contact_submissions_updated
BEFORE UPDATE ON public.contact_submissions
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at ();

CREATE TABLE IF NOT EXISTS public.build_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
  updated_at timestamptz NOT NULL DEFAULT now(),
  current_focus text NOT NULL,
  messages jsonb NOT NULL DEFAULT '[]'::jsonb,
  last_commit jsonb,
  is_live boolean NOT NULL DEFAULT true
);

DROP TRIGGER IF EXISTS build_status_updated ON public.build_status;

CREATE TRIGGER build_status_updated
BEFORE UPDATE ON public.build_status
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at ();

CREATE TABLE IF NOT EXISTS public.rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
  identifier text NOT NULL,
  action text NOT NULL,
  count int NOT NULL DEFAULT 0,
  window_start timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier_action ON public.rate_limits (identifier, action);

COMMIT;
