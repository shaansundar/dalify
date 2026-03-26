"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function ActiveFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const availability = searchParams.get("available");
  const tag = searchParams.get("tag");
  const sort = searchParams.get("sort");

  const filters: Array<{ label: string; paramKey: string }> = [];

  if (availability === "true") {
    filters.push({ label: "In Stock", paramKey: "available" });
  }
  if (tag) {
    filters.push({ label: `Tag: ${tag}`, paramKey: "tag" });
  }

  const removeFilter = useCallback(
    (paramKey: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(paramKey);
      params.delete("after"); // reset pagination
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const clearAll = useCallback(() => {
    const params = new URLSearchParams();
    if (sort) {
      params.set("sort", sort);
    }
    const qs = params.toString();
    router.push(qs ? `?${qs}` : ".", { scroll: false });
  }, [router, sort]);

  if (filters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((f) => (
        <button
          key={f.paramKey}
          type="button"
          onClick={() => removeFilter(f.paramKey)}
          className="inline-flex items-center gap-1 rounded-full bg-cream-dark px-3 py-1 text-xs font-medium text-charcoal transition-colors hover:bg-sand-light"
        >
          {f.label}
          <span aria-hidden="true" className="text-charcoal-muted">
            &times;
          </span>
        </button>
      ))}
      <button
        type="button"
        onClick={clearAll}
        className="text-xs font-medium text-charcoal-muted underline transition-colors hover:text-charcoal"
      >
        Clear all
      </button>
    </div>
  );
}
