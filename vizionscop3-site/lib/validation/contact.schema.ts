import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be 100 characters or less"),
  email: z.string().email("Please enter a valid email address").max(255),
  organization: z
    .union([z.string().max(200), z.literal("")])
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
  organizationType: z.enum(
    [
      "nonprofit",
      "small_business",
      "corporate",
      "enterprise",
      "other",
    ],
    { errorMap: () => ({ message: "Please select an organization type" }) },
  ),
  projectTypes: z
    .array(
      z.enum([
        "web",
        "mobile",
        "software",
        "ai",
        "database",
        "consulting",
        "other",
      ]),
    )
    .min(1, "Please select at least one project type"),
  budgetRange: z.enum([
    "under_10k",
    "10_50k",
    "50_150k",
    "150k_plus",
    "unsure",
  ]),
  timeline: z.enum(["asap", "1_3_months", "3_6_months", "flexible"]),
  description: z
    .string()
    .min(20, "Please provide more detail (20 characters minimum)")
    .max(5000, "Description must be 5000 characters or less"),
  /** Honeypot — must be empty */
  websiteUrl: z.string().optional(),
  hcaptchaToken: z.string().optional(),
})
  .refine((d) => !d.websiteUrl?.length, {
    message: "Invalid submission",
    path: ["websiteUrl"],
  });

export type ContactFormInput = z.infer<typeof contactSchema>;
