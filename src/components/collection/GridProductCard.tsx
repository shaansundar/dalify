import Link from "next/link";
import { formatPrice } from "@/lib/utils/format-price";
import { Badge } from "@/components/ui/Badge";

interface GridProductCardProps {
  readonly handle: string;
  readonly title: string;
  readonly vendor: string;
  readonly price: string;
  readonly currencyCode: string;
  readonly compareAtPrice?: string | null;
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly availableForSale: boolean;
}

export function GridProductCard({
  handle,
  title,
  vendor,
  price,
  currencyCode,
  compareAtPrice,
  imageSrc,
  imageAlt,
  availableForSale,
}: GridProductCardProps) {
  const hasDiscount =
    compareAtPrice && parseFloat(compareAtPrice) > parseFloat(price);

  return (
    <div className="group overflow-hidden rounded-lg bg-warm-white shadow-card transition-shadow duration-150 hover:shadow-card-hover">
      <Link href={`/products/${handle}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-cream-dark">
          {imageSrc ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={imageSrc}
              alt={imageAlt ?? title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="px-4 text-center font-heading text-lg text-charcoal-muted">
                {title}
              </span>
            </div>
          )}

          {!availableForSale && (
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal/40">
              <Badge className="bg-charcoal text-warm-white">Sold Out</Badge>
            </div>
          )}

          {hasDiscount && availableForSale && (
            <div className="absolute left-2 top-2">
              <Badge variant="warning">Sale</Badge>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        {vendor && (
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-charcoal-muted">
            {vendor}
          </p>
        )}
        <Link href={`/products/${handle}`}>
          <h3 className="line-clamp-2 text-sm font-medium text-charcoal transition-colors group-hover:text-green">
            {title}
          </h3>
        </Link>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-semibold text-charcoal">
            {formatPrice(price, currencyCode)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-charcoal-muted line-through">
              {formatPrice(compareAtPrice, currencyCode)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
