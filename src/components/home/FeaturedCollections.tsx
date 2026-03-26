import { Container } from "@/components/ui/Container";
import { CollectionCard } from "./CollectionCard";

const COLLECTIONS = [
  {
    title: "Spices",
    description:
      "Whole, ground, and blended masalas to bring authentic flavour to every dish.",
    href: "/collections/spices",
    imagePlaceholderColor: "bg-gold-muted",
  },
  {
    title: "Grains",
    description:
      "Premium rice, millets, and stone-ground flours from Indian farmlands.",
    href: "/collections/grains",
    imagePlaceholderColor: "bg-sand-light",
  },
  {
    title: "Pulses",
    description:
      "Protein-rich dals, lentils, and legumes for everyday nutrition.",
    href: "/collections/pulses",
    imagePlaceholderColor: "bg-green-muted",
  },
  {
    title: "Instant Mixes",
    description:
      "Ready-to-cook breakfast, snack, and meal mixes for busy kitchens.",
    href: "/collections/instant-mixes",
    imagePlaceholderColor: "bg-cream-dark",
  },
] as const;

export function FeaturedCollections() {
  return (
    <section className="py-section-sm md:py-section" aria-labelledby="collections-heading">
      <Container>
        <div className="text-center">
          <h2
            id="collections-heading"
            className="font-heading text-3xl font-semibold text-charcoal md:text-4xl"
          >
            Shop by Category
          </h2>
          <p className="mx-auto mt-3 max-w-md text-charcoal-muted">
            Explore our carefully curated range of organic staples.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {COLLECTIONS.map((collection) => (
            <CollectionCard key={collection.href} {...collection} />
          ))}
        </div>
      </Container>
    </section>
  );
}
