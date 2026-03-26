import Link from "next/link";
import { Container } from "@/components/ui/Container";

interface CollectionHeaderProps {
  readonly title: string;
  readonly description?: string;
  readonly imageUrl?: string;
  readonly productCount: number;
}

export function CollectionHeader({
  title,
  description,
  imageUrl,
  productCount,
}: CollectionHeaderProps) {
  return (
    <section className="border-b border-cream-dark bg-cream py-10 sm:py-14">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-1.5 text-sm text-charcoal-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-charcoal">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-charcoal">
              {title}
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h1 className="font-heading text-3xl font-semibold text-charcoal sm:text-4xl">
              {title}
            </h1>
            {description && (
              <p className="mt-3 text-base leading-relaxed text-charcoal-muted">
                {description}
              </p>
            )}
          </div>

          {imageUrl && (
            <div className="hidden h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg md:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={title}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>

        <p className="mt-4 text-sm text-charcoal-muted">
          {productCount} {productCount === 1 ? "product" : "products"}
        </p>
      </Container>
    </section>
  );
}
