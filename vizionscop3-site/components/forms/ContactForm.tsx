"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { CalEmbedGate } from "@/components/forms/CalEmbedGate";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import {
  contactSchema,
  type ContactFormInput,
} from "@/lib/validation/contact.schema";

export function ContactForm() {
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ?? "";
  const captchaRef = useRef<HCaptcha | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const defaultValues = useMemo(
    (): ContactFormInput => ({
      name: "",
      email: "",
      organization: "",
      organizationType: "small_business",
      projectTypes: [],
      budgetRange: "unsure",
      timeline: "flexible",
      description: "",
      websiteUrl: "",
      hcaptchaToken: "",
    }),
    [],
  );

  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: "onChange",
  });

  const { isDirty } = form.formState;

  const submitPayload = useCallback(
    async (payload: ContactFormInput) => {
      setServerError(null);
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const body = (await res.json().catch(() => null)) as {
            error?: string;
          } | null;
          throw new Error(body?.error ?? "Submission failed");
        }
        setStatus("success");
        form.reset(defaultValues);
      } catch (e) {
        setStatus("error");
        setServerError(e instanceof Error ? e.message : "Something went wrong");
      }
    },
    [defaultValues, form],
  );

  const onSubmit = form.handleSubmit(async (data) => {
    setStatus("idle");
    if (siteKey) {
      try {
        const hc = captchaRef.current;
        if (!hc?.isReady()) {
          throw new Error(
            "Security check is still loading. Please wait a moment and try again.",
          );
        }
        const result = await hc.execute({ async: true });
        const token = result.response;
        if (!token) {
          throw new Error("Please complete the security verification.");
        }
        await submitPayload({ ...data, hcaptchaToken: token });
        hc.resetCaptcha();
      } catch (e) {
        captchaRef.current?.resetCaptcha();
        setStatus("error");
        setServerError(
          e instanceof Error ? e.message : "Verification failed. Try again.",
        );
      }
      return;
    }
    await submitPayload(data);
  });

  const onCaptchaError = useCallback((err: string) => {
    setStatus("error");
    setServerError(`Captcha error: ${err}`);
  }, []);

  if (status === "success") {
    return (
      <div className="rounded-lg border border-[var(--color-circuit-green)] bg-[var(--color-deep-space)] p-8">
        <h2 className="font-display text-2xl font-semibold text-[var(--color-signal-white)]">
          Received — thank you.
        </h2>
        <p className="mt-3 text-[var(--color-echo-gray)]">
          We review every message within one business day. A confirmation email
          is on the way.
        </p>
        <div className="mt-8 rounded-lg border border-[var(--color-void-gray)] bg-[var(--color-obsidian)] p-4">
          <p className="text-sm font-medium text-[var(--color-signal-white)]">
            Prefer to book directly?
          </p>
          <CalEmbedGate />
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6"
      noValidate
      aria-busy={form.formState.isSubmitting}
    >
      <div aria-live="polite" className="sr-only">
        {form.formState.isSubmitting ? "Submitting form" : ""}
      </div>
      <input
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden
        {...form.register("websiteUrl")}
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Input label="Full name" {...form.register("name")} error={form.formState.errors.name?.message} />
        <Input label="Email" type="email" {...form.register("email")} error={form.formState.errors.email?.message} />
      </div>
      <Input
        label="Organization (optional)"
        {...form.register("organization")}
        error={form.formState.errors.organization?.message}
      />
      <Select
        label="Organization type"
        options={[
          { value: "nonprofit", label: "Nonprofit" },
          { value: "small_business", label: "Small business" },
          { value: "corporate", label: "Corporate" },
          { value: "enterprise", label: "Enterprise" },
          { value: "other", label: "Other" },
        ]}
        {...form.register("organizationType")}
        error={form.formState.errors.organizationType?.message}
      />
      <fieldset className="space-y-2">
        <legend className="text-xs font-semibold uppercase tracking-wide text-[var(--color-echo-gray)]">
          Project types
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {(
            [
              "web",
              "mobile",
              "software",
              "ai",
              "database",
              "consulting",
              "other",
            ] as const
          ).map((id) => (
            <label key={id} className="flex items-center gap-2 text-sm text-[var(--color-echo-gray)]">
              <input
                type="checkbox"
                value={id}
                {...form.register("projectTypes")}
                className="h-4 w-4 rounded border-[var(--color-void-gray)]"
              />
              <span className="capitalize">{id.replace("_", " ")}</span>
            </label>
          ))}
        </div>
        {form.formState.errors.projectTypes ? (
          <p className="text-sm text-red-400" role="alert">
            {form.formState.errors.projectTypes.message as string}
          </p>
        ) : null}
      </fieldset>
      <div className="grid gap-6 md:grid-cols-2">
        <Select
          label="Budget range"
          options={[
            { value: "under_10k", label: "Under $10k" },
            { value: "10_50k", label: "$10k – $50k" },
            { value: "50_150k", label: "$50k – $150k" },
            { value: "150k_plus", label: "$150k+" },
            { value: "unsure", label: "Not sure yet" },
          ]}
          {...form.register("budgetRange")}
          error={form.formState.errors.budgetRange?.message}
        />
        <Select
          label="Timeline"
          options={[
            { value: "asap", label: "ASAP" },
            { value: "1_3_months", label: "1–3 months" },
            { value: "3_6_months", label: "3–6 months" },
            { value: "flexible", label: "Flexible" },
          ]}
          {...form.register("timeline")}
          error={form.formState.errors.timeline?.message}
        />
      </div>
      <Textarea
        label="Project description"
        rows={6}
        {...form.register("description")}
        error={form.formState.errors.description?.message}
      />
      {siteKey ? (
        isDirty ? (
          <HCaptcha
            ref={captchaRef}
            size="invisible"
            sitekey={siteKey}
            theme="dark"
            onError={onCaptchaError}
          />
        ) : null
      ) : (
        <p className="text-xs text-[var(--color-echo-gray)]">
          hCaptcha is not configured in this environment.
        </p>
      )}
      {status === "error" && serverError ? (
        <p className="text-sm text-red-400" role="alert">
          {serverError}
        </p>
      ) : null}
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Sending…" : "Send message"}
      </Button>
      <p className="text-xs text-[var(--color-echo-gray)]">
        By submitting, you agree we may email you about this inquiry. See{" "}
        <a
          href="/privacy"
          className="font-medium text-[var(--color-signal-white)] underline decoration-[var(--color-electric-cyan)] decoration-1 underline-offset-2"
        >
          Privacy
        </a>
        .
      </p>
    </form>
  );
}
