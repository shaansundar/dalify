import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { ProductHighlights } from "@/components/home/ProductHighlights";
import { ValuePropositions } from "@/components/home/ValuePropositions";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildWebSiteSchema,
  buildOrganizationSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dalify.in";

export const metadata: Metadata = {
  title: "Dalify — Organic Spices, Grains & Pulses | Shop Online India",
  description:
    "Shop certified organic spices, whole grains, pulses & instant mixes at Dalify. " +
    "FSSAI-approved. Free shipping on orders above ₹499. Order now.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Dalify — Organic Spices, Grains & Pulses | Shop Online India",
    description:
      "Shop certified organic spices, whole grains, pulses & instant mixes at Dalify. " +
      "FSSAI-approved. Free shipping on orders above ₹499. Order now.",
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/og-home.jpg`, alt: "Dalify — Organic Food" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dalify — Organic Spices, Grains & Pulses | Shop Online India",
    description:
      "Shop certified organic spices, whole grains, pulses & instant mixes at Dalify. " +
      "FSSAI-approved. Free shipping on orders above ₹499. Order now.",
    images: [`${SITE_URL}/og-home.jpg`],
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildWebSiteSchema()} />
      <JsonLd data={buildOrganizationSchema()} />
      <JsonLd
        data={buildBreadcrumbSchema([{ name: "Home", url: SITE_URL }])}
      />
      <Hero />
      <FeaturedCollections />
      <ProductHighlights />
      <ValuePropositions />
    </>
  );
}
