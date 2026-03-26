import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dalify.in";

export const metadata: Metadata = {
  title: "Contact Dalify — Get in Touch | Organic Food Support",
  description:
    "Reach out to Dalify for order support, bulk inquiries, or partnership opportunities. " +
    "We respond within 24 hours.",
  alternates: { canonical: `${SITE_URL}/pages/contact` },
  openGraph: {
    title: "Contact Dalify — Get in Touch | Organic Food Support",
    description:
      "Reach out to Dalify for order support, bulk inquiries, or partnership opportunities. " +
      "We respond within 24 hours.",
    url: `${SITE_URL}/pages/contact`,
  },
};

export default function ContactPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Contact", url: `${SITE_URL}/pages/contact` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      {/* Contact content — to be filled from contact-page.md */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-heading text-4xl mb-6">Contact Us</h1>
        <p className="text-gray-700">
          Have a question or need help with your order? We&apos;re happy to
          assist. Reach us at{" "}
          <a href="mailto:hello@dalify.in" className="underline">
            hello@dalify.in
          </a>
          .
        </p>
      </div>
    </>
  );
}
