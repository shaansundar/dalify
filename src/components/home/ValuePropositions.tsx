import { Container } from "@/components/ui/Container";

const PROPOSITIONS = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "100% Organic",
    description: "Certified organic, free from chemicals and pesticides.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
      </svg>
    ),
    title: "Farm to Door",
    description: "Sourced directly from farms, delivered fresh to your home.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Pan-India Delivery",
    description: "Fast, reliable shipping to every corner of the country.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: "Quality Guaranteed",
    description: "Rigorous quality checks at every step of the supply chain.",
  },
] as const;

export function ValuePropositions() {
  return (
    <section className="border-t border-cream-dark py-12 md:py-16" aria-label="Value propositions">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {PROPOSITIONS.map((prop) => (
            <div key={prop.title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-muted text-green">
                {prop.icon}
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-charcoal">
                {prop.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-charcoal-muted">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
