import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { searchProducts } from "@/lib/shopify";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductGrid } from "@/components/collection/ProductGrid";
import { SearchInput } from "@/components/search/SearchInput";

export const metadata: Metadata = {
  title: "Search | Dalify",
  description: "Search our collection of premium organic Indian food products.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const query = typeof sp.q === "string" ? sp.q.trim() : "";

  let products: Awaited<ReturnType<typeof searchProducts>>["products"] = [];
  let hasResults = false;

  if (query.length >= 2) {
    try {
      const result = await searchProducts(query, 24);
      products = result.products;
      hasResults = true;
    } catch {
      // Search failed — show empty state
    }
  }

  return (
    <Container className="py-8 sm:py-12">
      <div className="mb-6">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Search" }]}
        />
      </div>

      <h1 className="mb-6 font-heading text-3xl font-semibold text-charcoal">
        Search
      </h1>

      {/* Search input with predictive results */}
      <div className="mx-auto mb-10 max-w-xl">
        <Suspense>
          <SearchInput initialQuery={query} />
        </Suspense>
      </div>

      {/* Results */}
      {query.length >= 2 && hasResults && (
        <>
          <p className="mb-6 text-sm text-charcoal-muted">
            {products.length}{" "}
            {products.length === 1 ? "result" : "results"} for{" "}
            <span className="font-medium text-charcoal">&ldquo;{query}&rdquo;</span>
          </p>
          <ProductGrid products={products} />
        </>
      )}

      {/* Empty state */}
      {query.length >= 2 && hasResults && products.length === 0 && (
        <div className="py-16 text-center">
          <p className="font-heading text-xl text-charcoal-muted">
            No products found for &ldquo;{query}&rdquo;
          </p>
          <p className="mt-3 text-sm text-charcoal-muted">
            Try a different search term or browse our{" "}
            <Link href="/" className="text-green underline hover:text-green-light">
              collections
            </Link>
            .
          </p>
        </div>
      )}

      {/* Initial state — no query */}
      {query.length < 2 && (
        <div className="py-16 text-center">
          <p className="font-heading text-xl text-charcoal-muted">
            What are you looking for?
          </p>
          <p className="mt-3 text-sm text-charcoal-muted">
            Search for spices, grains, pulses, instant mixes, and more.
          </p>
        </div>
      )}
    </Container>
  );
}
