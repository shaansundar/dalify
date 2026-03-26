"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

interface FilterSidebarProps {
  readonly availableTags: ReadonlyArray<string>;
}

export function FilterSidebar({ availableTags }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const currentTag = searchParams.get("tag");
  const currentAvailable = searchParams.get("available");

  const applyFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      params.delete("after"); // reset pagination on filter change
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const filterContent = (
    <div className="space-y-6">
      {/* Availability */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
          Availability
        </h3>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-charcoal">
          <input
            type="checkbox"
            checked={currentAvailable === "true"}
            onChange={(e) =>
              applyFilter("available", e.target.checked ? "true" : null)
            }
            className="h-4 w-4 rounded border-cream-dark text-green accent-green focus:ring-green"
          />
          In Stock Only
        </label>
      </div>

      {/* Tags */}
      {availableTags.length > 0 && (
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
            Category
          </h3>
          <div className="space-y-1.5">
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() =>
                  applyFilter("tag", currentTag === tag ? null : tag)
                }
                className={`block w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                  currentTag === tag
                    ? "bg-green-muted font-medium text-green"
                    : "text-charcoal hover:bg-cream-dark"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-md border border-cream-dark bg-warm-white px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-cream md:hidden"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
        Filters
      </button>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-charcoal/40"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close filters"
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] overflow-y-auto rounded-t-2xl bg-warm-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold text-charcoal">
                Filters
              </h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-charcoal-muted"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-56 flex-shrink-0 md:block">
        <h2 className="mb-4 font-heading text-lg font-semibold text-charcoal">
          Filters
        </h2>
        {filterContent}
      </aside>
    </>
  );
}
