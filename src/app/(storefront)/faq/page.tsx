import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/structured-data";
import { FaqAccordion } from "@/components/faq/FaqAccordion";

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

const FAQ_SECTIONS = [
  {
    title: "Ordering & Products",
    items: [
      {
        question: "What products does Dalify sell?",
        answer:
          "Dalify sells certified organic spices, pulses, grains, and instant mixes for the Indian kitchen. Our range covers everyday staples like turmeric, cumin, and moong dal, as well as regional specialities and convenient instant mixes for idli, dosa, upma, and more.",
      },
      {
        question: "Are your products really organic?",
        answer:
          "Yes. All Dalify products are sourced from farms certified under India\u2019s National Programme for Organic Production (NPOP) or equivalent FSSAI-recognised certification bodies. We conduct annual audits and maintain traceability from farm to pack. Certifications are available on request.",
      },
      {
        question:
          "Do you add any preservatives, colours, or flavour enhancers?",
        answer:
          "Never. Our products contain only what nature put in them. No preservatives, no artificial colours, no anti-caking agents, no flavour enhancers. The ingredient list on every Dalify product is exactly one ingredient long.",
      },
      {
        question: "What size packs are available?",
        answer:
          "Most products are available in 250g, 500g, and 1kg options. A few seasonal or specialty items come in 100g trial packs. Pack sizes are clearly listed on each product page.",
      },
      {
        question: "Do you offer wholesale or bulk orders?",
        answer:
          "We currently focus on direct-to-consumer orders. If you\u2019re interested in bulk quantities for a restaurant, cloud kitchen, or retail arrangement, please write to hello@dalify.in and we\u2019ll work something out.",
      },
    ],
  },
  {
    title: "Shipping & Delivery",
    items: [
      {
        question: "Where do you deliver?",
        answer:
          "We deliver across India \u2014 all states and union territories covered through our logistics partner Shiprocket. We currently do not ship internationally, but this is on our roadmap.",
      },
      {
        question: "How long does delivery take?",
        answer:
          "Metro cities (Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata): 2\u20133 business days. Tier-2 cities: 3\u20135 business days. Remote or rural areas: 5\u20137 business days. These are estimates and may vary based on location and seasonal demand.",
      },
      {
        question: "How do I track my order?",
        answer:
          "Once your order ships, you\u2019ll receive a tracking link via email and SMS. You can also log into your Dalify account and view order status under My Orders. For any tracking issues, email support@dalify.in.",
      },
      {
        question: "What is the shipping charge?",
        answer:
          "Shipping is free on orders above \u20b9499. For orders below \u20b9499, a flat shipping fee of \u20b949 applies.",
      },
      {
        question: "Do you offer express or same-day delivery?",
        answer:
          "Currently we offer standard delivery only. Express delivery options are being explored for select cities \u2014 subscribe to our newsletter to be notified when it\u2019s available.",
      },
    ],
  },
  {
    title: "Payments",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept UPI (Google Pay, PhonePe, Paytm, BHIM), Credit & Debit Cards (Visa, Mastercard, Rupay, Amex), Net Banking, Cash on Delivery (COD) for orders up to \u20b92,000, Wallets (Paytm, Mobikwik), and EMI on qualifying credit cards for orders above \u20b91,000.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes. All payments are processed through Razorpay, a PCI-DSS Level 1 certified payment gateway. We do not store any card or UPI information on our servers.",
      },
      {
        question: "Is Cash on Delivery available everywhere?",
        answer:
          "COD is available in most serviceable pin codes for orders up to \u20b92,000. If COD is not available for your pin code, it will not appear as a payment option at checkout.",
      },
      {
        question:
          "I was charged but my order wasn\u2019t placed. What do I do?",
        answer:
          "If your payment was debited but you didn\u2019t receive an order confirmation email, the amount will typically be auto-reversed to your account within 5\u20137 business days. If it isn\u2019t, email support@dalify.in with your payment reference number and we\u2019ll resolve it promptly.",
      },
    ],
  },
  {
    title: "Returns & Refunds",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "We accept returns within 7 days of delivery for damaged or defective products, products significantly different from what was described, and wrong items shipped. Opened products can be returned if you believe there is a quality issue.",
      },
      {
        question: "How do I initiate a return?",
        answer:
          "Email support@dalify.in with your order number, a brief description of the issue, and photos of the product (if damaged or wrong item). Our team will respond within 24 hours and arrange a free pickup if the return is approved.",
      },
      {
        question: "When will I get my refund?",
        answer:
          "Refunds are processed within 5\u20137 business days after we receive and inspect the returned item. The amount is refunded to your original payment method. UPI and card refunds may take an additional 2\u20133 days to reflect depending on your bank.",
      },
      {
        question: "What if my order arrived damaged?",
        answer:
          "Email support@dalify.in with your order number and a photo of the damaged package within 48 hours of delivery. We\u2019ll send a replacement or issue a full refund \u2014 your choice.",
      },
    ],
  },
  {
    title: "Product Quality & Certifications",
    items: [
      {
        question: "How do I know your products are genuinely organic?",
        answer:
          "We work exclusively with NPOP-certified farms and FSSAI-licensed processing facilities. Our packaging includes batch codes linked to farm-level records. If you ever want to verify the certification for a specific product, email us with the batch code and we\u2019ll provide documentation.",
      },
      {
        question: "What is NPOP?",
        answer:
          "NPOP stands for National Programme for Organic Production \u2014 India\u2019s official organic certification system administered by APEDA under the Ministry of Commerce. It is equivalent to EU and USDA organic standards.",
      },
      {
        question: "Do your products contain allergens?",
        answer:
          "Our facility handles various grains, pulses, and tree nuts. While we maintain strict hygiene protocols, cross-contamination cannot be completely ruled out. Each product page lists applicable allergen advisories. If you have a severe allergy, please contact us before ordering.",
      },
      {
        question: "How should I store your products?",
        answer:
          "Store in a cool, dry place away from direct sunlight. For opened packets, transfer to an airtight container. Most spices retain optimal flavour for 12\u201318 months; pulses and grains for 12\u201324 months. Best before dates are printed on all packs.",
      },
    ],
  },
  {
    title: "Account & Support",
    items: [
      {
        question: "Do I need an account to order?",
        answer:
          "No \u2014 you can check out as a guest. However, creating an account gives you easy order tracking, faster future checkouts, and access to exclusive member offers.",
      },
      {
        question: "How do I contact customer support?",
        answer:
          "Email: support@dalify.in (we respond within 24 hours). WhatsApp: available Mon\u2013Sat, 9am\u20136pm IST. Or use the contact form on our website.",
      },
      {
        question: "Do you have a loyalty or referral programme?",
        answer:
          "We\u2019re working on a loyalty programme. Subscribe to our newsletter to be notified at launch. Referral links are available for existing customers \u2014 contact us to get yours.",
      },
    ],
  },
] as const;

export default function FaqPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "FAQ", url: `${SITE_URL}/faq` },
  ]);

  // Build FAQ structured data for Google rich results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_SECTIONS.flatMap((section) =>
      section.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    ),
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={faqSchema} />
      <Container className="py-12 md:py-16">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />

        <div className="mx-auto mt-8 max-w-3xl">
          <h1 className="font-heading text-4xl font-semibold text-charcoal md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-charcoal-muted leading-relaxed">
            Find answers to common questions about our organic products,
            delivery, certifications, and return policy.
          </p>

          <div className="mt-10 space-y-10">
            {FAQ_SECTIONS.map((section) => (
              <section key={section.title}>
                <h2 className="font-heading text-xl font-semibold text-charcoal">
                  {section.title}
                </h2>
                <div className="mt-4">
                  <FaqAccordion items={section.items} />
                </div>
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-lg border border-cream-dark bg-cream/30 p-8 text-center">
            <p className="text-charcoal-muted">
              Can&apos;t find your answer?
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-block rounded-md bg-green px-6 py-2.5 text-sm font-medium text-warm-white transition-colors hover:bg-green-light"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
