/**
 * JsonLd — Renders a JSON-LD <script> block for structured data.
 *
 * Usage:
 *   <JsonLd data={{ "@context": "https://schema.org", "@type": "Product", ... }} />
 */
export function JsonLd({ data }: { readonly data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
