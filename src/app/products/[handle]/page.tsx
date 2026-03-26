import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getProductByHandle,
  getProducts,
  getProductRecommendations,
  flattenConnection,
} from "@/lib/shopify";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildProductSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/structured-data";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductRecommendations } from "@/components/product/ProductRecommendations";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dalify.in";

// ---------------------------------------------------------------------------
// Static paths
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  try {
    const { products } = await getProducts({ first: 250 });
    return products.map((p) => ({ handle: p.handle }));
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
  const product = await getProductByHandle(handle);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const title = product.seo.title ?? `${product.title} | Dalify`;
  const description =
    product.seo.description ?? `${product.description.slice(0, 155)}…`;
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

  const images = flattenConnection(product.images);
  const variants = flattenConnection(product.variants);

  // Fetch recommendations in parallel (non-blocking)
  let recommendations: Awaited<ReturnType<typeof getProductRecommendations>> =
    [];
  try {
    recommendations = await getProductRecommendations(product.id);
  } catch {
    // Recommendations are non-critical — degrade gracefully
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

      <Container className="py-8 sm:py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/collections/all" },
              { label: product.title },
            ]}
          />
        </div>

        {/* Product hero: gallery + info */}
        <ProductDetails
          title={product.title}
          vendor={product.vendor}
          images={images}
          variants={variants}
          availableForSale={product.availableForSale}
        />

        {/* Tabs: description, details, shipping */}
        <div className="mt-12">
          <ProductTabs
            descriptionHtml={product.descriptionHtml}
            vendor={product.vendor}
            productType={product.productType}
            tags={product.tags}
          />
        </div>

        {/* Recommendations */}
        <div className="mt-12">
          <ProductRecommendations products={recommendations} />
        </div>
      </Container>
    </>
  );
}
