import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCollectionByHandle, getCollections } from "@/lib/shopify";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildCollectionPageSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dalify.in";

// ---------------------------------------------------------------------------
// Static paths — pre-render all collections at build time
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  try {
    const collections = await getCollections(50);
    return collections.map((c) => ({ handle: c.handle }));
  } catch {
    // Shopify credentials not available at build time — pages render on demand
    return [];
  }
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const { collection } = await getCollectionByHandle(handle, { first: 1 });

  if (!collection) {
    return { title: "Collection Not Found" };
  }

  // Prefer Shopify SEO fields; fall back to collection title/description
  const title = collection.seo.title ?? `${collection.title} | Dalify`;
  const description =
    collection.seo.description ??
    `${collection.description.slice(0, 155)}…`;

  const canonicalUrl = `${SITE_URL}/collections/${handle}`;
  const ogImage = collection.image?.url;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: ogImage ? [{ url: ogImage, alt: collection.title }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const { collection, products } = await getCollectionByHandle(handle);

  if (!collection) {
    notFound();
  }

  const collectionSchema = buildCollectionPageSchema(collection);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: collection.title, url: `${SITE_URL}/collections/${handle}` },
  ]);

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />
      {/* Collection UI — to be implemented by FrontendDeveloper */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-heading text-3xl">{collection.title}</h1>
        {collection.description && (
          <p className="mt-4 text-gray-600">{collection.description}</p>
        )}
        <p className="mt-2 text-sm text-gray-400">{products.length} products</p>
      </div>
    </>
  );
}
