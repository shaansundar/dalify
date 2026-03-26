import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section
      className="relative flex min-h-[50vh] items-center bg-cream md:min-h-[70vh]"
      aria-label="Hero"
    >
      {/* Background pattern — replaced with a real image later */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, var(--color-green) 0%, transparent 50%), " +
              "radial-gradient(circle at 80% 30%, var(--color-gold) 0%, transparent 40%)",
          }}
        />
      </div>

      <Container className="relative z-10 py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl md:text-6xl lg:text-7xl">
            Farm-Fresh Organic Staples, Delivered
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-charcoal-muted md:text-xl">
            Premium spices, grains, pulses, and instant mixes sourced directly
            from organic farms across India. Pure quality, from our fields to
            your kitchen.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/collections/all"
              className="inline-flex items-center rounded-md bg-green px-7 py-3 text-base font-medium text-warm-white transition-colors duration-150 hover:bg-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
            >
              Shop All Products
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-md border border-charcoal px-7 py-3 text-base font-medium text-charcoal transition-colors duration-150 hover:bg-cream-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-2"
            >
              Our Story
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
