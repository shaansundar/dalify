"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils/format-price";
import { trackSearch } from "@/lib/analytics";

interface PredictiveProduct {
  readonly handle: string;
  readonly title: string;
  readonly featuredImage: {
    readonly url: string;
    readonly altText: string | null;
  } | null;
  readonly priceRange: {
    readonly minVariantPrice: {
      readonly amount: string;
      readonly currencyCode: string;
    };
  };
}

interface SearchInputProps {
  readonly initialQuery?: string;
}

export function SearchInput({ initialQuery = "" }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [predictions, setPredictions] = useState<
    ReadonlyArray<PredictiveProduct>
  >([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close predictions when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowPredictions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced predictive search
  const fetchPredictions = useCallback(async (q: string) => {
    if (q.length < 2) {
      setPredictions([]);
      return;
    }

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setPredictions(data.products ?? []);
        setShowPredictions(true);
      }
    } catch {
      // Predictive search is best-effort
    }
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      setActiveIndex(-1);

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        fetchPredictions(value);
      }, 300);
    },
    [fetchPredictions],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (trimmed.length < 2) return;
      setShowPredictions(false);
      trackSearch(trimmed);
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    },
    [router, query],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showPredictions || predictions.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < predictions.length - 1 ? prev + 1 : 0,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : predictions.length - 1,
        );
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        const product = predictions[activeIndex];
        setShowPredictions(false);
        router.push(`/products/${product.handle}`);
      } else if (e.key === "Escape") {
        setShowPredictions(false);
      }
    },
    [showPredictions, predictions, activeIndex, router],
  );

  // Sync with URL on mount
  useEffect(() => {
    const q = searchParams?.get("q") ?? null;
    if (q && q !== query) {
      setQuery(q);
    }
    // Only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => predictions.length > 0 && setShowPredictions(true)}
            placeholder="Search for spices, grains, pulses..."
            className="w-full rounded-lg border border-cream-dark bg-warm-white py-3 pl-11 pr-4 text-base text-charcoal placeholder:text-charcoal-muted focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
            aria-label="Search products"
            aria-expanded={showPredictions && predictions.length > 0}
            aria-controls="search-predictions"
            aria-activedescendant={
              activeIndex >= 0 ? `prediction-${activeIndex}` : undefined
            }
            role="combobox"
            autoComplete="off"
          />
          <svg
            className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal-muted"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </form>

      {/* Predictive results dropdown */}
      {showPredictions && predictions.length > 0 && (
        <ul
          id="search-predictions"
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-80 overflow-y-auto rounded-lg border border-cream-dark bg-warm-white shadow-card-hover"
        >
          {predictions.slice(0, 5).map((product, index) => (
            <li
              key={product.handle}
              id={`prediction-${index}`}
              role="option"
              aria-selected={index === activeIndex}
            >
              <Link
                href={`/products/${product.handle}`}
                onClick={() => setShowPredictions(false)}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                  index === activeIndex
                    ? "bg-cream"
                    : "hover:bg-cream"
                }`}
              >
                <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded bg-cream-dark">
                  {product.featuredImage ? (
                    <Image
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText ?? product.title}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-charcoal-muted">
                      ?
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-charcoal">
                    {product.title}
                  </p>
                  <p className="text-sm text-charcoal-muted">
                    {formatPrice(
                      product.priceRange.minVariantPrice.amount,
                      product.priceRange.minVariantPrice.currencyCode,
                    )}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
