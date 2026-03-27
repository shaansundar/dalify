"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

/** Map route segments to display labels */
const SEGMENT_LABELS: Record<string, string> = {
  admin: "Admin",
  dashboard: "Dashboard",
  products: "Products",
  collections: "Collections",
  orders: "Orders",
  inventory: "Inventory",
  new: "New",
};

function segmentLabel(segment: string): string {
  return SEGMENT_LABELS[segment] ?? decodeURIComponent(segment);
}

export function AdminBreadcrumb() {
  const pathname = usePathname();

  // Split pathname into segments, filter empties
  const segments = pathname.split("/").filter(Boolean);

  // Build breadcrumb items from segments
  const crumbs = segments.map((segment, index) => ({
    label: segmentLabel(segment),
    href: `/${segments.slice(0, index + 1).join("/")}`,
    isLast: index === segments.length - 1,
  }));

  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-sm">
        {crumbs.map((crumb) => (
          <li key={crumb.href} className="flex items-center gap-1">
            {crumb.isLast ? (
              <span className="font-medium text-charcoal" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <>
                <Link
                  href={crumb.href}
                  className="text-charcoal-muted hover:text-charcoal transition-colors"
                >
                  {crumb.label}
                </Link>
                <ChevronRight className="h-3 w-3 text-charcoal-muted" />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
