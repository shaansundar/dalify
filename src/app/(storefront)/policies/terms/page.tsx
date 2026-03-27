import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dalify.in";

export const metadata: Metadata = {
  title: "Terms of Service — User Agreement",
  description:
    "Dalify terms of service — the agreement governing your use of dalify.in, purchases, returns, and account access.",
  alternates: { canonical: `${SITE_URL}/policies/terms` },
};

export default function TermsPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Terms of Service", url: `${SITE_URL}/policies/terms` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
      />

      <h1 className="mt-6 font-heading text-3xl font-semibold text-charcoal md:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-charcoal-muted">Last updated: March 2026</p>

      <div className="mt-8 space-y-8 text-sm text-charcoal-muted leading-relaxed">
        <p>
          Please read these Terms carefully before using dalify.in. By accessing
          or using our website or placing an order, you agree to be bound by
          these Terms.
        </p>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            1. The Parties
          </h2>
          <p className="mt-3">
            These Terms constitute an agreement between you
            (&ldquo;Customer&rdquo;, &ldquo;you&rdquo;) and Dalify Foods Pvt.
            Ltd. (&ldquo;Dalify&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), a
            company incorporated in India.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            2. Use of the Website
          </h2>
          <p className="mt-3">
            You may use our website for lawful personal purposes only. You agree
            not to:
          </p>
          <ul className="mt-2 ml-5 list-disc space-y-1">
            <li>Use the website for any unlawful or fraudulent purpose</li>
            <li>Transmit harmful, offensive, or infringing content</li>
            <li>Attempt to gain unauthorised access to any part of the website</li>
            <li>
              Use automated tools to scrape, crawl, or copy content without
              permission
            </li>
            <li>
              Resell or commercially exploit our products without written
              authorisation
            </li>
          </ul>
          <p className="mt-2">
            We reserve the right to suspend or terminate access for violations.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            3. Orders and Pricing
          </h2>
          <ul className="mt-3 ml-5 list-disc space-y-1">
            <li>
              Prices are listed in Indian Rupees (INR) and are inclusive of GST
              unless stated otherwise
            </li>
            <li>
              We reserve the right to refuse or cancel orders in cases of pricing
              errors, suspected fraud, or stock unavailability
            </li>
            <li>An order confirmation email constitutes acceptance of your order</li>
            <li>Availability is subject to stock and may change without notice</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            4. Payment
          </h2>
          <p className="mt-3">
            Payments are processed by Razorpay. By making a payment, you also
            agree to Razorpay&apos;s terms and privacy policy. We do not store
            sensitive payment information.
          </p>
          <p className="mt-2">
            For COD orders, payment is due at the time of delivery. We reserve
            the right to withdraw COD availability at any time.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            5. Delivery
          </h2>
          <p className="mt-3">
            Delivery timelines are estimates. We are not liable for delays caused
            by courier partners, natural disasters, strikes, or other
            circumstances beyond our control. Risk of loss transfers to you upon
            delivery.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            6. Intellectual Property
          </h2>
          <p className="mt-3">
            All content on dalify.in — including text, images, logos, product
            descriptions, and design — is the property of Dalify Foods Pvt. Ltd.
            or its licensors and is protected by Indian and international
            intellectual property law.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            7. Product Information
          </h2>
          <p className="mt-3">
            We make every effort to ensure product descriptions, images, and
            nutritional information are accurate. However, we cannot guarantee
            that all information is error-free. If you receive a product that
            substantially differs from its description, please contact us within
            7 days.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            8. Limitation of Liability
          </h2>
          <p className="mt-3">
            To the maximum extent permitted by applicable law, Dalify&apos;s
            total liability to you for any claim arising from your use of our
            services shall not exceed the amount you paid for the relevant order.
          </p>
          <p className="mt-2">
            We are not liable for indirect, incidental, or consequential damages,
            loss of profits, or data loss. Nothing in these Terms limits
            liability for death or personal injury caused by negligence.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            9. Governing Law and Dispute Resolution
          </h2>
          <p className="mt-3">
            These Terms are governed by the laws of India. Before initiating
            legal proceedings, parties agree to attempt resolution through
            good-faith negotiation for 30 days.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            10. Changes to Terms
          </h2>
          <p className="mt-3">
            We may modify these Terms at any time. Continued use of our services
            constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            11. Contact
          </h2>
          <p className="mt-3">
            For questions about these Terms:{" "}
            <a href="mailto:legal@dalify.in" className="text-green hover:underline">
              legal@dalify.in
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
