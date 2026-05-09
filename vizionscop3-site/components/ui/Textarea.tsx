import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string;
  };

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const autoId = React.useId();
    const areaId = id ?? autoId;
    return (
      <div className="space-y-1.5">
        {label ? (
          <label
            htmlFor={areaId}
            className="text-sm font-medium text-[var(--color-signal-white)]"
          >
            {label}
          </label>
        ) : null}
        <textarea
          id={areaId}
          ref={ref}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${areaId}-error` : undefined}
          className={cn(
            "flex min-h-[120px] w-full rounded-[var(--radius-md)] border-2 border-[var(--color-void-gray)] bg-[var(--color-deep-space)] px-4 py-3 text-base text-[var(--color-signal-white)] placeholder:text-[var(--color-echo-gray)] transition-colors duration-[var(--duration-fast)]",
            "focus:border-[var(--color-electric-cyan)] focus:outline-none focus:ring-2 focus:ring-[var(--color-electric-cyan)]/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "resize-y",
            error && "border-red-500",
            className
          )}
          {...props}
        />
        {error ? (
          <p id={`${areaId}-error`} className="text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
