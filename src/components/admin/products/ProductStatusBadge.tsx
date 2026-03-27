import type { ProductStatus } from "@/lib/shopify-admin/types";

interface ProductStatusBadgeProps {
  readonly status: ProductStatus;
}

const STATUS_STYLES: Record<ProductStatus, string> = {
  ACTIVE: "bg-success/10 text-success",
  DRAFT: "bg-gold-muted text-gold",
  ARCHIVED: "bg-cream-dark text-charcoal-muted",
};

const STATUS_LABELS: Record<ProductStatus, string> = {
  ACTIVE: "Active",
  DRAFT: "Draft",
  ARCHIVED: "Archived",
};

export function ProductStatusBadge({ status }: ProductStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
