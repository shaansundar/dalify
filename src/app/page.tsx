import { Hero } from "@/components/home/Hero";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { ProductHighlights } from "@/components/home/ProductHighlights";
import { ValuePropositions } from "@/components/home/ValuePropositions";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <ProductHighlights />
      <ValuePropositions />
    </>
  );
}
