BEGIN;

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.build_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read build_status" ON public.build_status;

CREATE POLICY "Public read build_status" ON public.build_status
  FOR SELECT
    TO anon, authenticated
    USING (TRUE);

COMMIT;
