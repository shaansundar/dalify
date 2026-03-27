import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dalify.in";

export const metadata: Metadata = {
  title: "Refund & Return Policy — Easy 7-Day Returns",
  description:
    "Dalify refund and return policy — how to return organic food products and receive refunds within 5–7 business days.",
  alternates: { canonical: `${SITE_URL}/policies/refund` },
};

export default function RefundPolicyPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Refund & Return Policy", url: `${SITE_URL}/policies/refund` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Refund & Return Policy" },
        ]}
      />

      <h1 className="mt-6 font-heading text-3xl font-semibold text-charcoal md:text-4xl">
        Refund &amp; Return Policy
      </h1>
      <p className="mt-2 text-sm text-charcoal-muted">Last updated: March 2026</p>

      <div className="mt-8 space-y-8 text-sm text-charcoal-muted leading-relaxed">
        <p>
          We want you to be completely satisfied with every Dalify purchase. This
          policy explains when and how you can return products and receive a
          refund.
        </p>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            Eligibility for Returns
          </h2>
          <p className="mt-3">
            You may return a product within{" "}
            <strong className="text-charcoal">7 days of the delivery date</strong>{" "}
            if:
          </p>
          <ol className="mt-2 ml-5 list-decimal space-y-1">
            <li>The product arrived damaged or broken</li>
            <li>
              The product is defective (spoiled, contaminated, discoloured,
              off-odour)
            </li>
            <li>You received the wrong product</li>
            <li>The product significantly differs from its description</li>
          </ol>
          <p className="mt-3">
            We also accept returns on{" "}
            <strong className="text-charcoal">opened products</strong> if you
            have a genuine quality concern — just contact us and describe the
            issue.
          </p>
          <div className="mt-3">
            <p className="font-medium text-charcoal">Not eligible for returns:</p>
            <ul className="mt-1 ml-5 list-disc space-y-1">
              <li>Change of mind after opening</li>
              <li>Products returned after 7 days without prior communication</li>
              <li>Products damaged due to improper storage after delivery</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            How to Initiate a Return
          </h2>
          <ol className="mt-3 ml-5 list-decimal space-y-1">
            <li>
              Email{" "}
              <a
                href="mailto:support@dalify.in"
                className="text-green hover:underline"
              >
                support@dalify.in
              </a>{" "}
              with your order number and the issue
            </li>
            <li>Attach photos of the product (required for damaged/defective claims)</li>
            <li>Our team will respond within 24 hours</li>
            <li>
              If approved, we&apos;ll arrange a free pickup from your delivery
              address
            </li>
            <li>Refund is processed once the product is received and inspected</li>
          </ol>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            Refund Timeline
          </h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cream-dark">
                  <th className="py-2 pr-4 text-left font-medium text-charcoal">
                    Refund Method
                  </th>
                  <th className="py-2 pl-4 text-left font-medium text-charcoal">
                    Processing Time
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-cream-dark/50">
                  <td className="py-2 pr-4">Original payment method (card/UPI)</td>
                  <td className="py-2 pl-4">
                    5–7 business days after return receipt
                  </td>
                </tr>
                <tr className="border-b border-cream-dark/50">
                  <td className="py-2 pr-4">Cash on Delivery orders</td>
                  <td className="py-2 pl-4">
                    Bank transfer within 7–10 business days
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Dalify store credit</td>
                  <td className="py-2 pl-4">Instant upon return approval</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            Refunds may take an additional 2–3 days to reflect in your account
            depending on your bank or payment provider.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            Replacements
          </h2>
          <p className="mt-3">
            If you prefer a replacement over a refund, we&apos;ll ship the
            replacement product once we&apos;ve arranged pickup of the original.
            Replacements are dispatched within 2 business days of return
            approval.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            Partial Refunds
          </h2>
          <p className="mt-3">
            If only part of your order is eligible for a refund, we&apos;ll
            refund only the affected items. Shipping charges are refunded only if
            the entire order is returned due to our error.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            Non-Returnable Items
          </h2>
          <ul className="mt-3 ml-5 list-disc space-y-1">
            <li>Products that have been fully consumed</li>
            <li>Gift cards and promotional credits</li>
            <li>Products explicitly marked &ldquo;Final Sale&rdquo;</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            Contact
          </h2>
          <p className="mt-3">
            For return-related queries:{" "}
            <a
              href="mailto:support@dalify.in"
              className="text-green hover:underline"
            >
              support@dalify.in
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
