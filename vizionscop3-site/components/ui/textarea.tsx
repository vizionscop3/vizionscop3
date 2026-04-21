import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-[var(--radius-md)] border-2 border-[var(--color-void-gray)] bg-[var(--color-deep-space)] px-4 py-3 text-base text-[var(--color-signal-white)] placeholder:text-[var(--color-echo-gray)] transition-colors duration-[var(--duration-fast)]",
          "focus:border-[var(--color-electric-cyan)] focus:outline-none focus:ring-2 focus:ring-[var(--color-electric-cyan)]/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
