"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

interface LoadMoreButtonProps {
  readonly endCursor: string;
  readonly hasNextPage: boolean;
  readonly currentCount: number;
  readonly totalLabel?: string;
}

export function LoadMoreButton({
  endCursor,
  hasNextPage,
  currentCount,
  totalLabel,
}: LoadMoreButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleLoadMore = useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("after", endCursor);
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  }, [router, searchParams, endCursor]);

  return (
    <div className="mt-10 flex flex-col items-center gap-3">
      {totalLabel && (
        <p className="text-sm text-charcoal-muted">{totalLabel}</p>
      )}

      {hasNextPage && (
        <button
          type="button"
          onClick={handleLoadMore}
          disabled={isPending}
          className="rounded-md border border-charcoal bg-transparent px-8 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-charcoal hover:text-warm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-2 disabled:opacity-50"
        >
          {isPending ? "Loading..." : "Load More"}
        </button>
      )}

      {!hasNextPage && currentCount > 0 && (
        <p className="text-sm text-charcoal-muted">
          Showing all {currentCount} products
        </p>
      )}
    </div>
  );
}
