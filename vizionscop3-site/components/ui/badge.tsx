import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-[var(--radius-sm)] px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-deep-space)] text-[var(--color-signal-white)] border border-[var(--color-void-gray)]",
        primary:
          "bg-[var(--color-electric-cyan)]/10 text-[var(--color-electric-cyan)] border border-[var(--color-electric-cyan)]/30",
        secondary:
          "bg-[var(--color-plasma-violet)]/10 text-[var(--color-plasma-violet)] border border-[var(--color-plasma-violet)]/30",
        success:
          "bg-[var(--color-circuit-green)]/10 text-[var(--color-circuit-green)] border border-[var(--color-circuit-green)]/30",
        warning:
          "bg-[var(--color-solar-gold)]/10 text-[var(--color-solar-gold)] border border-[var(--color-solar-gold)]/30",
        outline:
          "border border-[var(--color-void-gray)] text-[var(--color-echo-gray)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
