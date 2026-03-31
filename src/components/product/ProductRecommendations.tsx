import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils/format-price";

interface RecommendedProduct {
  readonly id: string;
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

interface ProductRecommendationsProps {
  readonly products: ReadonlyArray<RecommendedProduct>;
}

export function ProductRecommendations({
  products,
}: ProductRecommendationsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-cream-dark pt-12">
      <h2 className="mb-6 font-heading text-2xl font-semibold text-charcoal">
        You may also like
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
        {products.slice(0, 8).map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.handle}`}
            className="group w-48 flex-shrink-0 snap-start"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg bg-cream-dark">
              {product.featuredImage ? (
                <Image
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText ?? product.title}
                  fill
                  sizes="192px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="px-3 text-center text-sm text-charcoal-muted">
                    {product.title}
                  </span>
                </div>
              )}
            </div>
            <h3 className="mt-2 line-clamp-2 text-sm font-medium text-charcoal transition-colors group-hover:text-green">
              {product.title}
            </h3>
            <p className="mt-1 text-sm font-semibold text-charcoal">
              {formatPrice(
                product.priceRange.minVariantPrice.amount,
                product.priceRange.minVariantPrice.currencyCode,
              )}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
