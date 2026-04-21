"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Turnstile } from "@marsidev/react-turnstile";
import { cn } from "@/lib/utils";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  organization: z.string().optional(),
  organizationType: z.string().min(1, "Please select an organization type"),
  projectType: z.array(z.string()).min(1, "Please select at least one project type"),
  budgetRange: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().min(20, "Please provide more details about your project"),
  turnstileToken: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const organizationTypes = [
  { value: "nonprofit", label: "Nonprofit" },
  { value: "small-business", label: "Small Business" },
  { value: "corporate", label: "Corporate" },
  { value: "enterprise", label: "Enterprise" },
  { value: "government", label: "Government" },
  { value: "startup", label: "Startup" },
  { value: "other", label: "Other" },
];

const projectTypes = [
  { value: "web-development", label: "Web Development" },
  { value: "mobile-app", label: "Mobile Application" },
  { value: "custom-software", label: "Custom Software" },
  { value: "database", label: "Database Engineering" },
  { value: "ai-infrastructure", label: "AI Infrastructure" },
  { value: "consulting", label: "Technology Consulting" },
];

const budgetRanges = [
  { value: "under-25k", label: "Under $25,000" },
  { value: "25k-50k", label: "$25,000 - $50,000" },
  { value: "50k-100k", label: "$50,000 - $100,000" },
  { value: "100k-250k", label: "$100,000 - $250,000" },
  { value: "250k-plus", label: "$250,000+" },
  { value: "not-sure", label: "Not sure yet" },
];

const timelines = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-month", label: "Within 1 month" },
  { value: "1-3-months", label: "1-3 months" },
  { value: "3-6-months", label: "3-6 months" },
  { value: "6-plus-months", label: "6+ months" },
  { value: "flexible", label: "Flexible" },
];

export function ContactForm() {
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [selectedProjectTypes, setSelectedProjectTypes] = React.useState<string[]>([]);
  const [turnstileToken, setTurnstileToken] = React.useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = React.useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      projectType: [],
    },
  });

  const toggleProjectType = (value: string) => {
    const newTypes = selectedProjectTypes.includes(value)
      ? selectedProjectTypes.filter((t) => t !== value)
      : [...selectedProjectTypes, value];
    setSelectedProjectTypes(newTypes);
    setValue("projectType", newTypes);
  };

  const onSubmit = async (data: ContactFormData) => {
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          turnstileToken: turnstileToken ?? undefined,
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setStatus("success");
      reset();
      setSelectedProjectTypes([]);
      setTurnstileToken(null);
      setTurnstileKey((k) => k + 1);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      aria-describedby="contact-form-status"
    >
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="rounded-[var(--radius-lg)] border border-[var(--color-circuit-green)]/50 bg-[var(--color-circuit-green)]/10 p-8 text-center"
          >
            <CheckCircle className="mx-auto mb-4 h-12 w-12 text-[var(--color-circuit-green)]" />
            <h3 className="mb-2 font-[var(--font-display)] text-xl font-semibold text-[var(--color-signal-white)]">
              Message Sent!
            </h3>
            <p className="mb-4 text-[var(--color-echo-gray)]">
              We&apos;ll get back to you within one business day.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => setStatus("idle")}
            >
              Send Another Message
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Name & Email */}
            <div className="grid gap-6 md:grid-cols-2">
              <FormField label="Name" error={errors.name?.message} required>
                <Input
                  {...register("name")}
                  placeholder="Your name"
                  className={cn(errors.name && "border-red-500")}
                />
              </FormField>

              <FormField label="Email" error={errors.email?.message} required>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="your@email.com"
                  className={cn(errors.email && "border-red-500")}
                />
              </FormField>
            </div>

            {/* Organization & Type */}
            <div className="grid gap-6 md:grid-cols-2">
              <FormField label="Organization" error={errors.organization?.message}>
                <Input
                  {...register("organization")}
                  placeholder="Company or organization name"
                />
              </FormField>

              <FormField
                label="Organization Type"
                error={errors.organizationType?.message}
                required
              >
                <Select
                  {...register("organizationType")}
                  options={organizationTypes}
                  placeholder="Select type"
                  className={cn(errors.organizationType && "border-red-500")}
                />
              </FormField>
            </div>

            {/* Project Types */}
            <FormField
              label="Project Type"
              error={errors.projectType?.message}
              required
            >
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => toggleProjectType(type.value)}
                    className={cn(
                      "rounded-[var(--radius-md)] border-2 px-4 py-2 text-sm font-medium transition-all duration-[var(--duration-fast)]",
                      selectedProjectTypes.includes(type.value)
                        ? "border-[var(--color-electric-cyan)] bg-[var(--color-electric-cyan)]/10 text-[var(--color-electric-cyan)]"
                        : "border-[var(--color-void-gray)] text-[var(--color-echo-gray)] hover:border-[var(--color-echo-gray)]"
                    )}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </FormField>

            {/* Budget & Timeline */}
            <div className="grid gap-6 md:grid-cols-2">
              <FormField label="Budget Range" error={errors.budgetRange?.message}>
                <Select
                  {...register("budgetRange")}
                  options={budgetRanges}
                  placeholder="Select budget range"
                />
              </FormField>

              <FormField label="Timeline" error={errors.timeline?.message}>
                <Select
                  {...register("timeline")}
                  options={timelines}
                  placeholder="Select timeline"
                />
              </FormField>
            </div>

            {/* Description */}
            <FormField
              label="Project Description"
              error={errors.description?.message}
              required
            >
              <Textarea
                {...register("description")}
                placeholder="Tell us about your project, goals, and any specific requirements..."
                rows={5}
                className={cn(errors.description && "border-red-500")}
              />
            </FormField>

            {TURNSTILE_SITE_KEY && (
              <div className="flex justify-center">
                <Turnstile
                  key={turnstileKey}
                  siteKey={TURNSTILE_SITE_KEY}
                  onSuccess={(token) => setTurnstileToken(token)}
                />
              </div>
            )}

            <div id="contact-form-status" className="sr-only" aria-live="polite">
              {status === "loading" && "Sending message."}
              {status === "success" && "Message sent successfully."}
              {status === "error" && "Error sending message."}
            </div>

            {/* Error message */}
            {status === "error" && (
              <div
                role="alert"
                className="flex items-center gap-2 rounded-[var(--radius-md)] border border-red-500/50 bg-red-500/10 p-4 text-red-400"
              >
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p>
                  {TURNSTILE_SITE_KEY && !turnstileToken
                    ? "Please complete the verification above."
                    : "Something went wrong. Please try again or email us directly."}
                </p>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[var(--color-signal-white)]">
        {label}
        {required && <span className="ml-1 text-[var(--color-electric-cyan)]">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
