import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/structured-data";
import { ContactForm } from "@/components/contact/ContactForm";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dalify.in";

export const metadata: Metadata = {
  title: "Contact Dalify — Get in Touch | Organic Food Support",
  description:
    "Reach out to Dalify for order support, bulk inquiries, or partnership opportunities. " +
    "We respond within 24 hours.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact Dalify — Get in Touch | Organic Food Support",
    description:
      "Reach out to Dalify for order support, bulk inquiries, or partnership opportunities. " +
      "We respond within 24 hours.",
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Contact", url: `${SITE_URL}/contact` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <Container className="py-12 md:py-16">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        />

        <div className="mx-auto mt-8 max-w-3xl">
          <h1 className="font-heading text-4xl font-semibold text-charcoal md:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-charcoal-muted leading-relaxed">
            Whether you have a question about an order, want to know more about
            our sourcing, or just want to say hello — we&apos;re here.
          </p>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {/* Contact info */}
            <div className="space-y-8">
              <section>
                <h2 className="font-heading text-lg font-semibold text-charcoal">
                  Customer Support
                </h2>
                <p className="mt-1 text-sm text-charcoal-muted">
                  For order-related queries, returns, and general questions.
                </p>
                <dl className="mt-3 space-y-2 text-sm">
                  <div>
                    <dt className="font-medium text-charcoal">Email</dt>
                    <dd>
                      <a
                        href="mailto:support@dalify.in"
                        className="text-green hover:underline"
                      >
                        support@dalify.in
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-charcoal">Response time</dt>
                    <dd className="text-charcoal-muted">
                      Within 24 hours on business days
                    </dd>
                  </div>
                </dl>
              </section>

              <section>
                <h2 className="font-heading text-lg font-semibold text-charcoal">
                  Business &amp; Partnerships
                </h2>
                <p className="mt-1 text-sm text-charcoal-muted">
                  For wholesale inquiries, brand collaborations, or press.
                </p>
                <dl className="mt-3 text-sm">
                  <dt className="font-medium text-charcoal">Email</dt>
                  <dd>
                    <a
                      href="mailto:hello@dalify.in"
                      className="text-green hover:underline"
                    >
                      hello@dalify.in
                    </a>
                  </dd>
                </dl>
              </section>

              <section>
                <h2 className="font-heading text-lg font-semibold text-charcoal">
                  Support Hours
                </h2>
                <dl className="mt-3 space-y-1 text-sm text-charcoal-muted">
                  <div>
                    <dt className="inline font-medium text-charcoal">
                      Monday to Saturday:
                    </dt>{" "}
                    <dd className="inline">9:00 AM – 6:00 PM IST</dd>
                  </div>
                  <div>
                    <dt className="inline font-medium text-charcoal">
                      Sunday:
                    </dt>{" "}
                    <dd className="inline">
                      Closed (email queries answered next business day)
                    </dd>
                  </div>
                </dl>
              </section>

              <section>
                <h2 className="font-heading text-lg font-semibold text-charcoal">
                  Our Office
                </h2>
                <address className="mt-3 text-sm not-italic text-charcoal-muted leading-relaxed">
                  Dalify Foods Pvt. Ltd.
                  <br />
                  India
                </address>
                <p className="mt-2 text-xs text-charcoal-muted italic">
                  We do not have a retail storefront. All orders are fulfilled
                  online.
                </p>
              </section>

              <p className="text-sm text-charcoal-muted">
                Before reaching out, you might find your answer in our{" "}
                <Link href="/faq" className="text-green hover:underline">
                  FAQ page
                </Link>
                .
              </p>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="font-heading text-lg font-semibold text-charcoal">
                Send Us a Message
              </h2>
              <div className="mt-4">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
