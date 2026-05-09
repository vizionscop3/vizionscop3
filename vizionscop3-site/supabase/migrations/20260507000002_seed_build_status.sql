BEGIN;

INSERT INTO public.build_status (current_focus, messages, is_live)
SELECT
  'VizionScop3 V2 public launch',
  '[
    "Shipping polish: accessibility + performance",
    "Contact form monitored",
    "Constellation map live"
  ]'::jsonb,
  TRUE
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      public.build_status
    LIMIT
      1
  );

COMMIT;
