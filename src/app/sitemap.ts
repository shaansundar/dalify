import type { MetadataRoute } from "next";
import { getProducts, getCollections } from "@/lib/shopify";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dalify.in";

const STATIC_PAGES: MetadataRoute.Sitemap = [
  {
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: `${SITE_URL}/about`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${SITE_URL}/faq`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    url: `${SITE_URL}/contact`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let products: Awaited<ReturnType<typeof getProducts>>["products"] = [];
  let collections: Awaited<ReturnType<typeof getCollections>> = [];

  try {
    [{ products }, collections] = await Promise.all([
      getProducts({ first: 250 }),
      getCollections(50),
    ]);
  } catch {
    // Shopify credentials not set — return static pages only
    return STATIC_PAGES;
  }

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.handle}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const collectionEntries: MetadataRoute.Sitemap = collections.map(
    (collection) => ({
      url: `${SITE_URL}/collections/${collection.handle}`,
      lastModified: new Date(collection.updatedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  return [...STATIC_PAGES, ...collectionEntries, ...productEntries];
}
