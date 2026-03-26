import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dalify.in";

export const metadata: Metadata = {
  title: "FAQ — Organic Food Questions Answered | Dalify",
  description:
    "Common questions about Dalify organic spices, grains, and pulses. " +
    "Shipping, FSSAI certification, returns, and more — answered here.",
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    title: "FAQ — Organic Food Questions Answered | Dalify",
    description:
      "Common questions about Dalify organic spices, grains, and pulses. " +
      "Shipping, FSSAI certification, returns, and more — answered here.",
    url: `${SITE_URL}/faq`,
  },
};

export default function FaqPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "FAQ", url: `${SITE_URL}/faq` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      {/* FAQ content — to be filled from faq-page.md */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-heading text-4xl mb-6">Frequently Asked Questions</h1>
        <p className="text-gray-700">
          Find answers to common questions about our organic products, delivery,
          certifications, and return policy.
        </p>
      </div>
    </>
  );
}
