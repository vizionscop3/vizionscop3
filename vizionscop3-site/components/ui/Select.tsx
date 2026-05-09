import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  placeholder?: string;
  label?: string;
  error?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, label, error, id, ...props }, ref) => {
    const autoId = React.useId();
    const selectId = id ?? autoId;
    return (
      <div className="space-y-1.5">
        {label ? (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-[var(--color-signal-white)]"
          >
            {label}
          </label>
        ) : null}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${selectId}-error` : undefined}
            className={cn(
              "flex h-11 w-full appearance-none rounded-[var(--radius-md)] border-2 border-[var(--color-void-gray)] bg-[var(--color-deep-space)] px-4 py-2 pr-10 text-base text-[var(--color-signal-white)] transition-colors duration-[var(--duration-fast)]",
              "focus:border-[var(--color-electric-cyan)] focus:outline-none focus:ring-2 focus:ring-[var(--color-electric-cyan)]/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500",
              className
            )}
            {...props}
          >
            {placeholder ? (
              <option value="" disabled className="text-[var(--color-echo-gray)]">
                {placeholder}
              </option>
            ) : null}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-echo-gray)]" />
        </div>
        {error ? (
          <p id={`${selectId}-error`} className="text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
