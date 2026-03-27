import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dalify.in";

export const metadata: Metadata = {
  title: "Shipping Policy — Delivery Timelines & Charges",
  description:
    "Dalify shipping policy — free delivery on orders above ₹499, delivery timelines by city, order tracking, and Cash on Delivery info.",
  alternates: { canonical: `${SITE_URL}/policies/shipping` },
};

export default function ShippingPolicyPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Shipping Policy", url: `${SITE_URL}/policies/shipping` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Shipping Policy" }]}
      />

      <h1 className="mt-6 font-heading text-3xl font-semibold text-charcoal md:text-4xl">
        Shipping Policy
      </h1>
      <p className="mt-2 text-sm text-charcoal-muted">Last updated: March 2026</p>

      <div className="mt-8 space-y-8 text-sm text-charcoal-muted leading-relaxed">
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            Order Processing
          </h2>
          <p className="mt-3">
            Orders are processed Monday to Saturday. Orders placed before{" "}
            <strong className="text-charcoal">2:00 PM IST</strong> on a business
            day are typically dispatched the same day. Orders placed after 2:00
            PM or on Sundays and public holidays are dispatched the next business
            day.
          </p>
          <p className="mt-2">
            You will receive a dispatch confirmation email with tracking details
            once your order ships.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            Delivery Timelines
          </h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cream-dark">
                  <th className="py-2 pr-4 text-left font-medium text-charcoal">
                    Location
                  </th>
                  <th className="py-2 pl-4 text-left font-medium text-charcoal">
                    Estimated Delivery
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-cream-dark/50">
                  <td className="py-2 pr-4">
                    Metro cities (Mumbai, Delhi, Bangalore, Chennai, Hyderabad,
                    Kolkata)
                  </td>
                  <td className="py-2 pl-4">2–3 business days</td>
                </tr>
                <tr className="border-b border-cream-dark/50">
                  <td className="py-2 pr-4">Tier-2 cities</td>
                  <td className="py-2 pl-4">3–5 business days</td>
                </tr>
                <tr className="border-b border-cream-dark/50">
                  <td className="py-2 pr-4">Tier-3 cities and towns</td>
                  <td className="py-2 pl-4">4–6 business days</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Remote and rural areas</td>
                  <td className="py-2 pl-4">5–7 business days</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2">
            These are estimates. Actual delivery may vary due to weather, carrier
            delays, or other circumstances beyond our control.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            Shipping Charges
          </h2>
          <ul className="mt-3 ml-5 list-disc space-y-1">
            <li>
              <strong className="text-charcoal">Free shipping</strong> on all
              orders above{" "}
              <strong className="text-charcoal">{"\u20B9"}499</strong>
            </li>
            <li>
              <strong className="text-charcoal">
                {"\u20B9"}49 flat shipping fee
              </strong>{" "}
              on orders below {"\u20B9"}499
            </li>
          </ul>
          <p className="mt-2">
            Shipping fees (if any) are displayed at checkout before payment.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            Tracking Your Order
          </h2>
          <p className="mt-3">Track your order via:</p>
          <ul className="mt-2 ml-5 list-disc space-y-1">
            <li>The tracking link in your dispatch email</li>
            <li>The My Orders section of your Dalify account</li>
            <li>
              Directly on the carrier website using the AWB/tracking number
              provided
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            Delivery Attempts
          </h2>
          <p className="mt-3">
            Our courier will make up to 2 delivery attempts. If both fail, the
            package is returned to our facility. We will contact you to
            reschedule delivery ({"\u20B9"}49 re-delivery fee) or issue a refund
            (excluding original shipping fee).
          </p>
          <p className="mt-2">
            Ensure your delivery address and phone number are accurate at the
            time of ordering.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            Cash on Delivery (COD)
          </h2>
          <p className="mt-3">
            COD is available for orders up to{" "}
            <strong className="text-charcoal">{"\u20B9"}2,000</strong> in
            eligible pin codes. COD availability is shown at checkout. We are not
            responsible for failed COD delivery attempts due to customer
            unavailability.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            Damaged Shipments
          </h2>
          <p className="mt-3">If your order arrives visibly damaged, please:</p>
          <ol className="mt-2 ml-5 list-decimal space-y-1">
            <li>Photograph the package before opening</li>
            <li>Open in front of the delivery executive if possible</li>
            <li>
              Contact us at{" "}
              <a
                href="mailto:support@dalify.in"
                className="text-green hover:underline"
              >
                support@dalify.in
              </a>{" "}
              within 48 hours of delivery
            </li>
          </ol>
          <p className="mt-2">
            We will arrange a replacement or refund promptly.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            Shipping Restrictions
          </h2>
          <p className="mt-3">
            We currently ship to all serviceable pin codes within India. We do
            not ship internationally at this time. Certain remote areas or
            restricted zones may not be serviceable — you will be notified at
            checkout if your pin code is not currently serviceable.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            Contact
          </h2>
          <p className="mt-3">
            For shipping-related queries:{" "}
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
