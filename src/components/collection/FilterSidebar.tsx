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
      params.delete("after");
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const filterContent = (
    <div className="space-y-5">
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
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

      {availableTags.length > 0 && (
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
            Category
          </h3>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() =>
                  applyFilter("tag", currentTag === tag ? null : tag)
                }
                className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                  currentTag === tag
                    ? "border-green bg-green-muted font-medium text-green"
                    : "border-cream-dark text-charcoal hover:border-charcoal-muted"
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
      {/* Mobile: toggle button */}
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

      {/* Mobile: bottom drawer */}
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
                className="text-2xl leading-none text-charcoal-muted"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}

      {/* Desktop: horizontal filter bar */}
      <div className="hidden md:block">{filterContent}</div>
    </>
  );
}
