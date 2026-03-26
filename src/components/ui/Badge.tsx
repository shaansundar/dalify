import type { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning";

interface BadgeProps {
  readonly variant?: BadgeVariant;
  readonly children: ReactNode;
  readonly className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-cream-dark text-charcoal",
  success: "bg-green-muted text-green",
  warning: "bg-gold-muted text-gold",
};

export function Badge({
  variant = "default",
  className = "",
  children,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
