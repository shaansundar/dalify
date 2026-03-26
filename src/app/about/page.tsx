import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dalify.in";

export const metadata: Metadata = {
  title: "About Dalify — Certified Organic Food, Straight from Indian Farms",
  description:
    "Learn about Dalify — our mission to bring FSSAI-certified organic spices, grains, " +
    "and pulses directly from Indian farms to your kitchen. No middlemen, no additives.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About Dalify — Certified Organic Food, Straight from Indian Farms",
    description:
      "Learn about Dalify — our mission to bring FSSAI-certified organic spices, grains, " +
      "and pulses directly from Indian farms to your kitchen. No middlemen, no additives.",
    url: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "About", url: `${SITE_URL}/about` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      {/* About page content — to be filled from about-page.md */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-heading text-4xl mb-6">About Dalify</h1>
        <p className="text-gray-700 leading-relaxed">
          Dalify is a certified organic D2C brand bringing pure spices, whole
          grains, pulses, and instant mixes directly from small Indian farms to
          your kitchen. FSSAI-approved. No middlemen. No additives.
        </p>
      </div>
    </>
  );
}
