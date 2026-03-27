import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  readonly title: string;
  readonly description?: string;
  readonly icon?: React.ComponentType<{ readonly className?: string }>;
  readonly action?: ReactNode;
}

export function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-cream-dark bg-cream/50 px-6 py-16 text-center">
      <Icon className="mb-4 h-12 w-12 text-charcoal-muted/50" />
      <h3 className="font-heading text-lg font-semibold text-charcoal">
        {title}
      </h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-charcoal-muted">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
