import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils/format-price";

interface ProductCardProps {
  readonly title: string;
  readonly handle: string;
  readonly price: string;
  readonly currencyCode?: string;
  readonly imageSrc?: string;
  readonly imageAlt?: string;
}

export function ProductCard({
  title,
  handle,
  price,
  currencyCode = "INR",
  imageSrc,
  imageAlt,
}: ProductCardProps) {
  return (
    <div className="group w-[260px] flex-shrink-0 snap-start overflow-hidden rounded-lg bg-warm-white shadow-card transition-shadow duration-150 hover:shadow-card-hover sm:w-[280px]">
      <Link href={`/products/${handle}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-cream-dark">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? title}
              fill
              sizes="(min-width: 640px) 280px, 260px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-heading text-lg text-charcoal-muted">
                {title}
              </span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/products/${handle}`}>
          <h3 className="line-clamp-2 text-sm font-medium text-charcoal transition-colors group-hover:text-green">
            {title}
          </h3>
        </Link>
        <p className="mt-1.5 text-base font-semibold text-charcoal">
          {formatPrice(price, currencyCode)}
        </p>
        <button
          type="button"
          className="mt-3 w-full rounded-md bg-green px-4 py-2 text-sm font-medium text-warm-white transition-colors duration-150 hover:bg-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
