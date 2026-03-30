/**
 * Structured data (JSON-LD) builders for schema.org types.
 * All functions return plain objects ready to be serialised by <JsonLd />.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dalify.in";
const BRAND_NAME = "Dalify";

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------

interface MoneyLike {
  readonly amount: string;
  readonly currencyCode: string;
}

interface ImageLike {
  readonly url: string;
  readonly altText: string | null;
}

interface VariantLike {
  readonly availableForSale: boolean;
  readonly price: MoneyLike;
}

interface ProductLike {
  readonly handle: string;
  readonly title: string;
  readonly description: string;
  readonly vendor: string;
  readonly featuredImage: ImageLike | null;
  readonly priceRange: {
    readonly minVariantPrice: MoneyLike;
    readonly maxVariantPrice: MoneyLike;
  };
  readonly variants: {
    readonly edges: ReadonlyArray<{ readonly node: VariantLike }>;
  };
}

interface CollectionLike {
  readonly handle: string;
  readonly title: string;
  readonly description: string;
  readonly image: ImageLike | null;
}

// ---------------------------------------------------------------------------
// WebSite + Organization (homepage)
// ---------------------------------------------------------------------------

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      "https://www.instagram.com/dalify",
      "https://www.facebook.com/dalify",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
  };
}

// ---------------------------------------------------------------------------
// Product page
// ---------------------------------------------------------------------------

export function buildProductSchema(product: ProductLike) {
  const url = `${SITE_URL}/products/${product.handle}`;
  const firstVariant = product.variants.edges[0]?.node;
  const inStock =
    product.variants.edges.some((e) => e.node.availableForSale) ?? false;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    url,
    brand: {
      "@type": "Brand",
      name: product.vendor || BRAND_NAME,
    },
    image: product.featuredImage?.url ?? undefined,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      price: firstVariant?.price.amount ?? product.priceRange.minVariantPrice.amount,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: BRAND_NAME,
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Collection page
// ---------------------------------------------------------------------------

export function buildCollectionPageSchema(collection: CollectionLike) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.title,
    description: collection.description,
    url: `${SITE_URL}/collections/${collection.handle}`,
    image: collection.image?.url ?? undefined,
    provider: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: SITE_URL,
    },
  };
}

// ---------------------------------------------------------------------------
// FAQPage
// ---------------------------------------------------------------------------

interface FAQItem {
  readonly question: string;
  readonly answer: string;
}

export function buildFAQSchema(items: ReadonlyArray<FAQItem>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ---------------------------------------------------------------------------
// AboutPage
// ---------------------------------------------------------------------------

export function buildAboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Dalify",
    url: `${SITE_URL}/about`,
    description:
      "Dalify is an Indian D2C organic food brand bringing FSSAI-certified " +
      "organic spices, grains, pulses, and instant mixes directly from certified farms to consumers.",
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
  };
}

// ---------------------------------------------------------------------------
// ContactPage
// ---------------------------------------------------------------------------

export function buildContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Dalify",
    url: `${SITE_URL}/contact`,
    description:
      "Contact Dalify for order support, bulk inquiries, or partnership opportunities. " +
      "We respond within 24 hours.",
    mainEntity: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: SITE_URL,
      email: "support@dalify.in",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "support@dalify.in",
          availableLanguage: ["English", "Hindi"],
          hoursAvailable: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "09:00",
            closes: "18:00",
          },
        },
      ],
    },
  };
}

// ---------------------------------------------------------------------------
// BreadcrumbList
// ---------------------------------------------------------------------------

interface BreadcrumbItem {
  readonly name: string;
  readonly url: string;
}

export function buildBreadcrumbSchema(items: ReadonlyArray<BreadcrumbItem>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
