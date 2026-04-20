import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            "flex h-11 w-full appearance-none rounded-[var(--radius-md)] border-2 border-[var(--color-void-gray)] bg-[var(--color-deep-space)] px-4 py-2 pr-10 text-base text-[var(--color-signal-white)] transition-colors duration-[var(--duration-fast)]",
            "focus:border-[var(--color-electric-cyan)] focus:outline-none focus:ring-2 focus:ring-[var(--color-electric-cyan)]/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="text-[var(--color-echo-gray)]">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-echo-gray)]" />
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
