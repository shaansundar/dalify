import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dalify.in";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Dalify privacy policy — how we collect, use, and protect your personal information.",
  alternates: { canonical: `${SITE_URL}/policies/privacy` },
};

export default function PrivacyPolicyPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Privacy Policy", url: `${SITE_URL}/policies/privacy` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />

      <h1 className="mt-6 font-heading text-3xl font-semibold text-charcoal md:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-charcoal-muted">Last updated: March 2026</p>

      <div className="mt-8 space-y-8 text-sm text-charcoal-muted leading-relaxed">
        <p>
          Dalify Foods Pvt. Ltd. (&ldquo;Dalify&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the website
          dalify.in and related mobile applications. This Privacy Policy explains
          how we collect, use, disclose, and protect your personal information
          when you use our services.
        </p>
        <p>
          This policy is compliant with the Information Technology Act, 2000 and
          the IT (Reasonable Security Practices) Rules, 2011, and reflects best
          practices aligned with the General Data Protection Regulation (GDPR).
        </p>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            1. Information We Collect
          </h2>
          <div className="mt-3 space-y-3">
            <div>
              <h3 className="font-medium text-charcoal">
                Information you provide directly:
              </h3>
              <ul className="mt-1 ml-5 list-disc space-y-1">
                <li>Name, email address, phone number</li>
                <li>Delivery address and billing address</li>
                <li>
                  Payment details (processed securely via Razorpay; we do not
                  store card numbers)
                </li>
                <li>Account credentials (if you create an account)</li>
                <li>
                  Communications you send us (emails, WhatsApp messages, contact
                  form submissions)
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-charcoal">
                Information collected automatically:
              </h3>
              <ul className="mt-1 ml-5 list-disc space-y-1">
                <li>Device and browser type, operating system</li>
                <li>IP address and approximate geographic location</li>
                <li>Pages visited, time spent, referring URLs</li>
                <li>Cookies and similar tracking technologies (see Section 6)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-charcoal">
                Information from third parties:
              </h3>
              <ul className="mt-1 ml-5 list-disc space-y-1">
                <li>Payment processors (transaction confirmation, not card details)</li>
                <li>Logistics partners (delivery status and address verification)</li>
                <li>Social media platforms (if you connect your account)</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            2. How We Use Your Information
          </h2>
          <ul className="mt-3 ml-5 list-disc space-y-1">
            <li>Process and fulfil your orders</li>
            <li>Send order confirmation, shipping, and delivery notifications</li>
            <li>Respond to your enquiries and provide customer support</li>
            <li>Process returns, refunds, and warranty claims</li>
            <li>Improve our website, products, and services</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Detect and prevent fraud or misuse</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            3. Legal Basis for Processing (GDPR)
          </h2>
          <ul className="mt-3 ml-5 list-disc space-y-1">
            <li>
              <strong className="text-charcoal">Contract performance:</strong> to
              process orders and deliver products
            </li>
            <li>
              <strong className="text-charcoal">Legitimate interests:</strong> to
              improve our services and prevent fraud
            </li>
            <li>
              <strong className="text-charcoal">Consent:</strong> for marketing
              communications
            </li>
            <li>
              <strong className="text-charcoal">Legal obligation:</strong> to
              comply with applicable laws
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            4. Sharing Your Information
          </h2>
          <p className="mt-3">
            We do not sell or rent your personal data. We share information only
            with:
          </p>
          <ul className="mt-2 ml-5 list-disc space-y-1">
            <li>Logistics partners (e.g., Shiprocket): to deliver your orders</li>
            <li>Payment processors (Razorpay): to process payments securely</li>
            <li>Email service providers (e.g., Klaviyo): to send transactional and marketing emails</li>
            <li>Analytics providers (e.g., Google Analytics): to understand website usage</li>
            <li>Legal authorities: when required by law or court order</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            5. Data Retention
          </h2>
          <p className="mt-3">
            We retain your personal information for as long as your account is
            active or as needed to provide services, comply with legal
            obligations (typically 7 years for financial records under Indian
            law), resolve disputes, and enforce our agreements.
          </p>
          <p className="mt-2">
            You may request deletion of your account and personal data at any
            time by contacting us at privacy@dalify.in.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            6. Cookies
          </h2>
          <ul className="mt-3 ml-5 list-disc space-y-1">
            <li>
              <strong className="text-charcoal">Essential cookies:</strong>{" "}
              required for the website to function (cart, login)
            </li>
            <li>
              <strong className="text-charcoal">Analytics cookies:</strong> to
              understand how visitors use our site
            </li>
            <li>
              <strong className="text-charcoal">Marketing cookies:</strong> to
              serve relevant advertising (with consent)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            7. Your Rights
          </h2>
          <p className="mt-3">
            Depending on your jurisdiction, you may have the right to access,
            correct, delete, restrict processing of, or request portability of
            your personal data. You may also object to processing or withdraw
            consent for marketing at any time.
          </p>
          <p className="mt-2">
            To exercise any of these rights, contact us at privacy@dalify.in. We
            will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            8. Data Security
          </h2>
          <p className="mt-3">
            We implement industry-standard security measures including SSL/TLS
            encryption, encrypted storage, access controls, and regular security
            audits. No method of transmission over the internet is 100% secure,
            but we strive to protect your data with robust measures.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            9. Children&apos;s Privacy
          </h2>
          <p className="mt-3">
            Our services are not directed to children under 18. We do not
            knowingly collect personal information from minors.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            10. Changes to This Policy
          </h2>
          <p className="mt-3">
            We may update this policy from time to time. Material changes will be
            communicated via email or a prominent notice on our website.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            11. Contact
          </h2>
          <p className="mt-3">
            For privacy-related queries or to exercise your rights:
          </p>
          <address className="mt-2 not-italic">
            <strong className="text-charcoal">Dalify Foods Pvt. Ltd.</strong>
            <br />
            Attn: Data Protection Officer
            <br />
            Email:{" "}
            <a href="mailto:privacy@dalify.in" className="text-green hover:underline">
              privacy@dalify.in
            </a>
          </address>
        </section>
      </div>
    </>
  );
}
