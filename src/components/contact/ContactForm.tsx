"use client";

import { useState, useCallback, type FormEvent } from "react";

const SUBJECT_OPTIONS = [
  "General Inquiry",
  "Order Issue",
  "Return Request",
  "Product Question",
  "Wholesale",
  "Press & Media",
  "Other",
] as const;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In production, this would POST to a Shopify contact form endpoint
    // or a custom API route. For now, show success state.
    setSubmitted(true);
  }, []);

  if (submitted) {
    return (
      <div className="rounded-lg border border-green/30 bg-green/5 p-6 text-center">
        <p className="font-heading text-lg font-semibold text-green">
          Message Sent!
        </p>
        <p className="mt-2 text-sm text-charcoal-muted">
          Thank you for reaching out. We&apos;ll get back to you within 24
          hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm text-green underline hover:text-green-light"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium text-charcoal"
        >
          Your Name <span className="text-error">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          className="mt-1 block w-full rounded-md border border-cream-dark bg-warm-white px-3 py-2.5 text-sm text-charcoal placeholder:text-charcoal-muted/50 focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium text-charcoal"
        >
          Email Address <span className="text-error">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full rounded-md border border-cream-dark bg-warm-white px-3 py-2.5 text-sm text-charcoal placeholder:text-charcoal-muted/50 focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="contact-order"
          className="block text-sm font-medium text-charcoal"
        >
          Order Number{" "}
          <span className="text-charcoal-muted font-normal">(optional)</span>
        </label>
        <input
          id="contact-order"
          name="orderNumber"
          type="text"
          className="mt-1 block w-full rounded-md border border-cream-dark bg-warm-white px-3 py-2.5 text-sm text-charcoal placeholder:text-charcoal-muted/50 focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
          placeholder="#1001"
        />
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="block text-sm font-medium text-charcoal"
        >
          Subject
        </label>
        <select
          id="contact-subject"
          name="subject"
          className="mt-1 block w-full rounded-md border border-cream-dark bg-warm-white px-3 py-2.5 text-sm text-charcoal focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
        >
          {SUBJECT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-charcoal"
        >
          Message <span className="text-error">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="mt-1 block w-full resize-y rounded-md border border-cream-dark bg-warm-white px-3 py-2.5 text-sm text-charcoal placeholder:text-charcoal-muted/50 focus:border-green focus:outline-none focus:ring-1 focus:ring-green"
          placeholder="How can we help?"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-gold px-6 py-3 text-sm font-semibold text-warm-white transition-colors hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
      >
        Send Message
      </button>
    </form>
  );
}
