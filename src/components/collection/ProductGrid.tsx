import type { Product } from "@/lib/shopify/types";
import { GridProductCard } from "./GridProductCard";

interface ProductGridProps {
  readonly products: ReadonlyArray<Product>;
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-heading text-xl text-charcoal-muted">
          No products found
        </p>
        <p className="mt-2 text-sm text-charcoal-muted">
          Try adjusting your filters or browse all collections.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <GridProductCard
          key={product.id}
          handle={product.handle}
          title={product.title}
          vendor={product.vendor}
          price={product.priceRange.minVariantPrice.amount}
          currencyCode={product.priceRange.minVariantPrice.currencyCode}
          compareAtPrice={
            product.compareAtPriceRange.minVariantPrice.amount !== "0.0"
              ? product.compareAtPriceRange.minVariantPrice.amount
              : null
          }
          imageSrc={product.featuredImage?.url}
          imageAlt={product.featuredImage?.altText ?? undefined}
          availableForSale={product.availableForSale}
        />
      ))}
    </div>
  );
}
