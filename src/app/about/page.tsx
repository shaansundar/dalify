import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
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
      <Container className="py-12 md:py-16">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />

        <article className="mx-auto mt-8 max-w-3xl">
          <h1 className="font-heading text-4xl font-semibold text-charcoal md:text-5xl">
            About Dalify
          </h1>

          {/* Hero section */}
          <section className="mt-8 space-y-4 text-charcoal-muted leading-relaxed">
            <h2 className="font-heading text-2xl font-semibold text-charcoal">
              From Indian Fields to Your Kitchen
            </h2>
            <p>
              At Dalify, we believe that the food you eat should be as pure as the
              intentions behind it. We started with a simple question: why is it so
              hard to find truly organic, genuinely unadulterated spices and grains
              in India?
            </p>
            <p>The answer led us to the farms.</p>
            <p>
              We visited turmeric growers in Salem, cumin fields in Rajasthan, urad
              dal farmers in Madhya Pradesh, and rice paddies across the Kaveri delta.
              What we found was beautiful, honest produce — and a broken supply chain
              that buried it under middlemen, artificial colours, and questionable
              storage.
            </p>
            <p className="font-medium text-charcoal">So we decided to fix that.</p>
          </section>

          <hr className="my-10 border-cream-dark" />

          {/* Who We Are */}
          <section className="space-y-4 text-charcoal-muted leading-relaxed">
            <h2 className="font-heading text-2xl font-semibold text-charcoal">
              Who We Are
            </h2>
            <p>
              Dalify is a small, passionate team of food lovers, farmers&apos;
              advocates, and supply chain obsessives. We work directly with certified
              organic farmers across India to bring you spices, pulses, grains, and
              instant mixes that are:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <strong className="text-charcoal">Certified organic</strong> —
                verified through third-party FSSAI-approved certifications
              </li>
              <li>
                <strong className="text-charcoal">Minimally processed</strong> —
                cleaned, sorted, and packed. Nothing added.
              </li>
              <li>
                <strong className="text-charcoal">Traceable</strong> — we know
                exactly which farm every batch comes from
              </li>
              <li>
                <strong className="text-charcoal">Fair trade</strong> — farmers
                receive fair prices. Better for them, better for you.
              </li>
            </ul>
          </section>

          <hr className="my-10 border-cream-dark" />

          {/* Philosophy */}
          <section className="space-y-6 text-charcoal-muted leading-relaxed">
            <h2 className="font-heading text-2xl font-semibold text-charcoal">
              Our Philosophy
            </h2>

            <div className="space-y-3">
              <h3 className="font-heading text-xl font-medium text-charcoal">
                Organic Isn&apos;t a Trend. It&apos;s Common Sense.
              </h3>
              <p>
                Traditional Indian farming was organic by default. Generations of
                farmers grew crops without synthetic pesticides or chemical
                fertilisers. Somewhere along the way, the pressure to produce more,
                faster, cheaper pushed farming away from those roots.
              </p>
              <p>
                We&apos;re helping bring it back — not out of nostalgia, but because
                the science is clear: organic produce is better for your health,
                better for the soil, and better for the farmers who grow it.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-heading text-xl font-medium text-charcoal">
                Farm-to-Table, Actually
              </h3>
              <p>
                When we say farm-to-table, we mean it. Our supply chain looks like
                this:
              </p>
              <div className="rounded-lg border border-cream-dark bg-cream/30 px-6 py-4 text-center font-medium text-charcoal">
                Certified Organic Farm → Quality Check → Our Facility → Your
                Doorstep
              </div>
              <p>
                No unnecessary warehousing. No extended cold chains that degrade
                nutrition. No blending with conventional produce. What you order is
                what was grown.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-heading text-xl font-medium text-charcoal">
                FSSAI Compliance, Always
              </h3>
              <p>
                Every Dalify product is manufactured and packed in FSSAI-licensed
                facilities. Our organic certifications are renewed annually and
                available for review. We hold ourselves to the highest standards
                because your health depends on it.
              </p>
            </div>
          </section>

          <hr className="my-10 border-cream-dark" />

          {/* Comparison table */}
          <section className="space-y-4">
            <h2 className="font-heading text-2xl font-semibold text-charcoal">
              Why Dalify?
            </h2>
            <p className="text-charcoal-muted leading-relaxed">
              There are other organic food brands out there. Here&apos;s what makes
              us different:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-cream-dark">
                    <th className="py-3 pr-4 text-left font-medium text-charcoal-muted">
                      What others do
                    </th>
                    <th className="py-3 pl-4 text-left font-medium text-green">
                      What Dalify does
                    </th>
                  </tr>
                </thead>
                <tbody className="text-charcoal-muted">
                  <tr className="border-b border-cream-dark/50">
                    <td className="py-3 pr-4">Source from aggregators</td>
                    <td className="py-3 pl-4 font-medium text-charcoal">
                      Direct farmer partnerships
                    </td>
                  </tr>
                  <tr className="border-b border-cream-dark/50">
                    <td className="py-3 pr-4">
                      Vague &ldquo;natural&rdquo; claims
                    </td>
                    <td className="py-3 pl-4 font-medium text-charcoal">
                      Certified organic with documentation
                    </td>
                  </tr>
                  <tr className="border-b border-cream-dark/50">
                    <td className="py-3 pr-4">Premium pricing for premium profit</td>
                    <td className="py-3 pl-4 font-medium text-charcoal">
                      Fair price for premium quality
                    </td>
                  </tr>
                  <tr className="border-b border-cream-dark/50">
                    <td className="py-3 pr-4">Generic packaging</td>
                    <td className="py-3 pl-4 font-medium text-charcoal">
                      Batch-coded, traceable packaging
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Limited product range</td>
                    <td className="py-3 pl-4 font-medium text-charcoal">
                      Full pantry — spices, grains, pulses, instant mixes
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <hr className="my-10 border-cream-dark" />

          {/* Products overview */}
          <section className="space-y-4 text-charcoal-muted leading-relaxed">
            <h2 className="font-heading text-2xl font-semibold text-charcoal">
              Our Products
            </h2>
            <p>We cover your entire Indian pantry:</p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                <strong className="text-charcoal">Spices &amp; Masalas</strong> —
                From everyday haldi and jeera to regional blends
              </li>
              <li>
                <strong className="text-charcoal">Pulses &amp; Dals</strong> —
                Moong, masoor, urad, chana, and more
              </li>
              <li>
                <strong className="text-charcoal">Grains &amp; Rice</strong> —
                Basmati, brown rice, millets, atta
              </li>
              <li>
                <strong className="text-charcoal">Instant Mixes</strong> — Idli,
                dosa, upma, and more — organic, convenient, delicious
              </li>
            </ul>
            <p>
              Every product is available in sizes that make sense for real Indian
              households.
            </p>
          </section>

          <hr className="my-10 border-cream-dark" />

          {/* Commitment */}
          <section className="space-y-4 text-charcoal-muted leading-relaxed">
            <h2 className="font-heading text-2xl font-semibold text-charcoal">
              Our Commitment to You
            </h2>
            <p>
              We&apos;re a small team. When you write to us, a real person reads your
              message. When something isn&apos;t right, we make it right — no
              questions asked.
            </p>
            <p>
              We&apos;re building Dalify for the long term, one honest product at a
              time. Thank you for being part of this.
            </p>
          </section>

          {/* CTA */}
          <div className="mt-12 rounded-lg border border-cream-dark bg-cream/30 p-8 text-center">
            <p className="font-heading text-xl font-semibold text-charcoal italic">
              Dalify — Organic. Honest. Indian.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/collections/all"
                className="rounded-md bg-green px-6 py-2.5 text-sm font-medium text-warm-white transition-colors hover:bg-green-light"
              >
                Shop Our Products
              </Link>
              <Link
                href="/contact"
                className="rounded-md border border-charcoal px-6 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-charcoal hover:text-warm-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </article>
      </Container>
    </>
  );
}
