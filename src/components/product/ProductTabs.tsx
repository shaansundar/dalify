"use client";

import { useState } from "react";

interface ProductTabsProps {
  readonly descriptionHtml: string;
  readonly vendor: string;
  readonly productType: string;
  readonly tags: ReadonlyArray<string>;
}

const TAB_KEYS = ["description", "details", "shipping"] as const;
type TabKey = (typeof TAB_KEYS)[number];

const TAB_LABELS: Record<TabKey, string> = {
  description: "Description",
  details: "Details",
  shipping: "Shipping",
};

export function ProductTabs({
  descriptionHtml,
  vendor,
  productType,
  tags,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("description");

  return (
    <div>
      {/* Tab headers */}
      <div
        className="flex border-b border-cream-dark"
        role="tablist"
        aria-label="Product information"
      >
        {TAB_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={activeTab === key}
            aria-controls={`tabpanel-${key}`}
            id={`tab-${key}`}
            onClick={() => setActiveTab(key)}
            className={`px-5 py-3 text-sm font-medium transition-colors ${
              activeTab === key
                ? "border-b-2 border-green text-green"
                : "text-charcoal-muted hover:text-charcoal"
            }`}
          >
            {TAB_LABELS[key]}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div className="py-6">
        {activeTab === "description" && (
          <div
            id="tabpanel-description"
            role="tabpanel"
            aria-labelledby="tab-description"
            className="prose prose-sm max-w-none text-charcoal-light prose-headings:font-heading prose-headings:text-charcoal"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        )}

        {activeTab === "details" && (
          <div
            id="tabpanel-details"
            role="tabpanel"
            aria-labelledby="tab-details"
          >
            <dl className="space-y-3">
              {vendor && (
                <div className="flex gap-3">
                  <dt className="w-28 flex-shrink-0 text-sm font-medium text-charcoal-muted">
                    Vendor
                  </dt>
                  <dd className="text-sm text-charcoal">{vendor}</dd>
                </div>
              )}
              {productType && (
                <div className="flex gap-3">
                  <dt className="w-28 flex-shrink-0 text-sm font-medium text-charcoal-muted">
                    Type
                  </dt>
                  <dd className="text-sm text-charcoal">{productType}</dd>
                </div>
              )}
              {tags.length > 0 && (
                <div className="flex gap-3">
                  <dt className="w-28 flex-shrink-0 text-sm font-medium text-charcoal-muted">
                    Tags
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-cream-dark px-2.5 py-0.5 text-xs text-charcoal"
                      >
                        {tag}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        )}

        {activeTab === "shipping" && (
          <div
            id="tabpanel-shipping"
            role="tabpanel"
            aria-labelledby="tab-shipping"
            className="space-y-3 text-sm text-charcoal-light"
          >
            <p>
              We ship across India via standard and express delivery.
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>Standard delivery: 5-7 business days</li>
              <li>Express delivery: 2-3 business days</li>
              <li>Free shipping on orders above ₹499</li>
            </ul>
            <p>
              Orders placed before 2 PM IST are typically dispatched the same
              day.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
