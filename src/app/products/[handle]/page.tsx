import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductByHandle, getProducts } from "@/lib/shopify";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildProductSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dalify.in";

// ---------------------------------------------------------------------------
// Static paths — pre-render all products at build time
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  try {
    const { products } = await getProducts({ first: 250 });
    return products.map((p) => ({ handle: p.handle }));
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
  const product = await getProductByHandle(handle);

  if (!product) {
    return { title: "Product Not Found" };
  }

  // Prefer Shopify SEO fields; fall back to product title/description
  const title = product.seo.title ?? `${product.title} | Dalify`;
  const description =
    product.seo.description ??
    `${product.description.slice(0, 155)}…`;

  const canonicalUrl = `${SITE_URL}/products/${handle}`;
  const ogImage = product.featuredImage?.url;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: ogImage ? [{ url: ogImage, alt: product.title }] : [],
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

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const productSchema = buildProductSchema(product);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Products", url: `${SITE_URL}/collections/all` },
    { name: product.title, url: `${SITE_URL}/products/${handle}` },
  ]);

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      {/* Product UI — to be implemented by FrontendDeveloper */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-heading text-3xl">{product.title}</h1>
        <p className="mt-4 text-gray-600">{product.description}</p>
      </div>
    </>
  );
}
