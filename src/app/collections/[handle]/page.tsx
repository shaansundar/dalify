import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCollectionByHandle, getCollections } from "@/lib/shopify";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildCollectionPageSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/structured-data";
import { Container } from "@/components/ui/Container";
import { CollectionHeader } from "@/components/collection/CollectionHeader";
import { ProductGrid } from "@/components/collection/ProductGrid";
import { SortDropdown, parseSortValue } from "@/components/collection/SortDropdown";
import { FilterSidebar } from "@/components/collection/FilterSidebar";
import { ActiveFilters } from "@/components/collection/ActiveFilters";
import { LoadMoreButton } from "@/components/collection/LoadMoreButton";
import type { Product } from "@/lib/shopify/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dalify.in";
const PRODUCTS_PER_PAGE = 16;

// ---------------------------------------------------------------------------
// Static paths
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  try {
    const collections = await getCollections(50);
    return collections.map((c) => ({ handle: c.handle }));
  } catch {
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
// Helpers
// ---------------------------------------------------------------------------

function extractUniqueTags(
  products: ReadonlyArray<Product>,
): ReadonlyArray<string> {
  const tagSet = new Set<string>();
  for (const product of products) {
    for (const tag of product.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

function buildFilters(
  sp: Record<string, string | string[] | undefined>,
): Array<Record<string, unknown>> {
  const filters: Array<Record<string, unknown>> = [];
  if (sp.available === "true") {
    filters.push({ available: true });
  }
  const tag = typeof sp.tag === "string" ? sp.tag : undefined;
  if (tag) {
    filters.push({ tag });
  }
  return filters;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { handle } = await params;
  const sp = await searchParams;

  const sortParam = typeof sp.sort === "string" ? sp.sort : null;
  const afterParam = typeof sp.after === "string" ? sp.after : undefined;
  const { sortKey, reverse } = parseSortValue(sortParam);
  const filters = buildFilters(sp);

  const { collection, products, pageInfo } = await getCollectionByHandle(
    handle,
    {
      first: PRODUCTS_PER_PAGE,
      after: afterParam,
      sortKey,
      reverse,
      filters: filters.length > 0 ? filters : undefined,
    },
  );

  if (!collection) {
    notFound();
  }

  const collectionSchema = buildCollectionPageSchema(collection);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: collection.title, url: `${SITE_URL}/collections/${handle}` },
  ]);

  const availableTags = extractUniqueTags(products);

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />

      <CollectionHeader
        title={collection.title}
        description={collection.description}
        imageUrl={collection.image?.url}
        productCount={products.length}
      />

      <Container className="py-8 sm:py-12">
        {/* Toolbar: mobile filter toggle + sort */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <Suspense>
            <FilterSidebar availableTags={availableTags} />
          </Suspense>
          <Suspense>
            <SortDropdown />
          </Suspense>
        </div>

        {/* Active filter pills */}
        <Suspense>
          <div className="mb-6">
            <ActiveFilters />
          </div>
        </Suspense>

        {/* Product grid */}
        <ProductGrid products={products} />

        <Suspense>
          <LoadMoreButton
            endCursor={pageInfo.endCursor ?? ""}
            hasNextPage={pageInfo.hasNextPage}
            currentCount={products.length}
            totalLabel={`Showing ${products.length} products`}
          />
        </Suspense>
      </Container>
    </>
  );
}
