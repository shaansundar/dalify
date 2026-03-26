import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "./ProductCard";

const PLACEHOLDER_PRODUCTS = [
  {
    title: "Organic Turmeric Powder",
    handle: "organic-turmeric-powder",
    price: "149.00",
  },
  {
    title: "Premium Basmati Rice",
    handle: "premium-basmati-rice-1kg",
    price: "289.00",
  },
  {
    title: "Toor Dal",
    handle: "toor-dal-500g",
    price: "129.00",
  },
  {
    title: "Instant Dosa Mix",
    handle: "instant-dosa-mix",
    price: "99.00",
  },
  {
    title: "Garam Masala",
    handle: "garam-masala",
    price: "179.00",
  },
  {
    title: "Ragi Flour",
    handle: "ragi-flour-500g",
    price: "109.00",
  },
] as const;

export function ProductHighlights() {
  return (
    <section
      className="bg-cream py-section-sm md:py-section"
      aria-labelledby="bestsellers-heading"
    >
      <Container>
        <div className="flex items-end justify-between">
          <div>
            <h2
              id="bestsellers-heading"
              className="font-heading text-3xl font-semibold text-charcoal md:text-4xl"
            >
              Bestsellers
            </h2>
            <p className="mt-2 text-charcoal-muted">
              Our most loved farm-fresh staples.
            </p>
          </div>
          <Link
            href="/collections/all"
            className="hidden text-sm font-medium text-green transition-colors hover:text-green-light sm:inline-flex sm:items-center"
          >
            View all
            <svg
              className="ml-1 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </Container>

      <div className="mt-8 overflow-x-auto">
        <div className="flex snap-x snap-mandatory gap-5 px-4 pb-4 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {PLACEHOLDER_PRODUCTS.map((product) => (
            <ProductCard key={product.handle} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
