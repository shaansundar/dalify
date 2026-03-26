export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="font-heading text-5xl font-semibold tracking-tight text-charcoal md:text-7xl">
        Dalify
      </h1>
      <p className="mt-4 max-w-lg text-lg text-charcoal-muted">
        Premium organic spices, grains, pulses, and instant mixes.
        Farm-fresh staples delivered to your door.
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="/collections/all"
          className="rounded-md bg-green px-6 py-3 text-sm font-medium text-warm-white transition-colors hover:bg-green-light"
        >
          Shop All
        </a>
        <a
          href="/pages/about"
          className="rounded-md border border-charcoal px-6 py-3 text-sm font-medium text-charcoal transition-colors hover:bg-cream"
        >
          Our Story
        </a>
      </div>
    </div>
  );
}
