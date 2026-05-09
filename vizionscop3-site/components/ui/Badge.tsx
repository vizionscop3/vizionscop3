import * as React from "react";
import { cn } from "@/lib/utils";

const variantClass = {
  default:
    "bg-[var(--color-deep-space)] text-[var(--color-signal-white)] border border-[var(--color-void-gray)]",
  primary:
    "bg-[var(--color-electric-cyan)]/10 text-[var(--color-electric-cyan)] border border-[var(--color-electric-cyan)]/30",
  secondary:
    "border border-[var(--color-plasma-violet)]/40 bg-[var(--color-plasma-violet)]/15 text-[var(--color-signal-white)]",
  success:
    "bg-[var(--color-circuit-green)]/10 text-[var(--color-circuit-green)] border border-[var(--color-circuit-green)]/30",
  warning:
    "bg-[var(--color-solar-gold)]/10 text-[var(--color-solar-gold)] border border-[var(--color-solar-gold)]/30",
  outline: "border border-[var(--color-void-gray)] text-[var(--color-echo-gray)]",
} as const;

const toneMap = {
  green: "success",
  gold: "warning",
  violet: "secondary",
  cyan: "primary",
  default: "default",
} as const;

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variantClass;
  /** Maps to semantic badge colors used by project cards */
  tone?: keyof typeof toneMap;
}

export function badgeVariants(opts: {
  variant?: keyof typeof variantClass;
  className?: string;
}) {
  const v = opts.variant ?? "default";
  return cn(
    "inline-flex items-center rounded-[var(--radius-sm)] px-2.5 py-0.5 text-xs font-medium transition-colors",
    variantClass[v],
    opts.className
  );
}

export function Badge({
  className,
  variant = "default",
  tone,
  ...props
}: BadgeProps) {
  const v =
    tone != null ? toneMap[tone] : variant;
  return (
    <div className={badgeVariants({ variant: v, className })} {...props} />
  );
}
