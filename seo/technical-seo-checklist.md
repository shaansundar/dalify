# Dalify — Technical SEO Checklist
## Shopify (Dawn Theme) — Pre-Launch & Ongoing

**Scope:** Covers all built-in Shopify SEO features + gaps to supplement manually.
**Standard:** All items must pass before submitting sitemap to Google Search Console.

---

## 1. Crawlability & Indexability

| # | Check | How to Verify | Status |
|---|-------|---------------|--------|
| 1.1 | `robots.txt` allows all product, collection, and page paths | Visit `yourdomain.com/robots.txt` — confirm `/products/`, `/collections/`, `/pages/` are NOT blocked | ☐ |
| 1.2 | `/cart`, `/checkout`, `/account`, `/search` are disallowed in `robots.txt` | Same file — these should appear under `Disallow:` | ☐ |
| 1.3 | Sitemap exists at `/sitemap.xml` | Visit `yourdomain.com/sitemap.xml` — confirm products, collections, pages, blogs are listed | ☐ |
| 1.4 | Sitemap submitted to Google Search Console | GSC → Sitemaps → Add `sitemap.xml` → verify green tick | ☐ |
| 1.5 | No orphan pages (all important pages linked from at least one other page) | Check nav menu + footer links cover all collections and key pages | ☐ |
| 1.6 | Pagination handled correctly (Shopify auto-adds `?page=2` — verify no `noindex` added unintentionally) | GSC → Coverage → check paginated collection pages are indexed | ☐ |

---

## 2. Meta Tags & Titles

| # | Check | How to Verify | Status |
|---|-------|---------------|--------|
| 2.1 | Homepage meta title set (50–60 chars) | Shopify Admin → Online Store → Preferences | ☐ |
| 2.2 | Homepage meta description set (150–160 chars) | Same location | ☐ |
| 2.3 | All products have unique meta titles and descriptions | Cross-check against `product-seo-metadata.csv` — each row must be entered in the product editor | ☐ |
| 2.4 | All collections have unique meta titles and descriptions | Cross-check against `collection-seo-metadata.md` — enter under each collection's **Search engine listing** section | ☐ |
| 2.5 | No duplicate meta titles across pages | Screaming Frog or Sitebulb crawl after launch — flag duplicates | ☐ |
| 2.6 | No meta titles truncated below 50 chars or over 60 chars | Manual review of `product-seo-metadata.csv` and collection doc | ☐ |

---

## 3. URL Structure

| # | Check | How to Verify | Status |
|---|-------|---------------|--------|
| 3.1 | All product URL handles are lowercase and hyphen-separated (no underscores) | Review `product-seo-metadata.csv` column `url_handle` | ☐ |
| 3.2 | All collection URL handles match the taxonomy defined in `product-taxonomy.md` | Compare collection slugs in admin vs. taxonomy doc | ☐ |
| 3.3 | No URL handle longer than 60 characters | Spot check longest handles in CSV | ☐ |
| 3.4 | Redirects set for any changed handles (use Shopify's built-in redirect manager) | Shopify Admin → Online Store → Navigation → URL Redirects | ☐ |

---

## 4. Structured Data (Schema Markup)

| # | Check | How to Verify | Status |
|---|-------|---------------|--------|
| 4.1 | `Product` schema present on all product pages (Dawn outputs this natively) | Google Rich Results Test on 3+ product URLs — confirm `Product` detected | ☐ |
| 4.2 | `Product` schema includes `name`, `description`, `image`, `brand`, `offers` (price + currency + availability) | Rich Results Test detail panel | ☐ |
| 4.3 | `BreadcrumbList` schema present on product and collection pages (Dawn default) | Rich Results Test — confirm breadcrumbs detected | ☐ |
| 4.4 | `Organization` JSON-LD added to `layout/theme.liquid` (see `homepage-seo-optimization.md` §5) | View page source → search for `"@type":"Organization"` | ☐ |
| 4.5 | `WebSite` schema with `SearchAction` present (enables Google Sitelinks searchbox) | Rich Results Test on homepage | ☐ |
| 4.6 | No schema validation errors or warnings | Google Rich Results Test — zero red errors | ☐ |

---

## 5. On-Page Heading Structure

| # | Check | How to Verify | Status |
|---|-------|---------------|--------|
| 5.1 | Homepage has exactly one `<h1>` | Browser DevTools → Elements → search `h1` | ☐ |
| 5.2 | Each product page `<h1>` is the product name (Dawn default) | View any product page source | ☐ |
| 5.3 | Each collection page `<h1>` is the collection title (Dawn default) | View any collection page source | ☐ |
| 5.4 | No heading levels skipped (H1 → H2 → H3, not H1 → H3) | Browser DevTools or ahrefs SEO toolbar | ☐ |

---

## 6. Image Optimisation

| # | Check | How to Verify | Status |
|---|-------|---------------|--------|
| 6.1 | All product images uploaded in WebP format (Shopify CDN converts JPEG/PNG to WebP automatically — verify) | View product page image source — URL should end in `.webp` or have `format=webp` param | ☐ |
| 6.2 | All product images have ALT text following pattern: `[Product Name] — Organic, FSSAI Certified \| Dalify` | Shopify product editor → each image → ALT text field | ☐ |
| 6.3 | Hero image on homepage has descriptive ALT text | Theme customizer → Hero banner → Image ALT text | ☐ |
| 6.4 | No image file larger than 1 MB before upload (Shopify resizes, but smaller source = faster processing) | Check before bulk upload | ☐ |
| 6.5 | Logo image ALT text set to `Dalify — Organic D2C Food Brand` | Theme customizer → Header → Logo ALT | ☐ |

---

## 7. Page Speed & Core Web Vitals

| # | Check | Target | How to Verify | Status |
|---|-------|--------|---------------|--------|
| 7.1 | Mobile LCP (Largest Contentful Paint) | < 2.5 s | PageSpeed Insights → Mobile tab | ☐ |
| 7.2 | Mobile CLS (Cumulative Layout Shift) | < 0.1 | PageSpeed Insights → Mobile tab | ☐ |
| 7.3 | Mobile INP (Interaction to Next Paint) | < 200 ms | PageSpeed Insights → Mobile tab | ☐ |
| 7.4 | Mobile PageSpeed score | > 70 | PageSpeed Insights → Mobile tab | ☐ |
| 7.5 | No render-blocking scripts from installed apps | PageSpeed → Opportunities → "Eliminate render-blocking resources" | ☐ |
| 7.6 | Lazy loading enabled for below-the-fold images (Dawn default) | View page source — `loading="lazy"` on non-hero images | ☐ |

---

## 8. Mobile & Accessibility

| # | Check | How to Verify | Status |
|---|-------|---------------|--------|
| 8.1 | Store is fully responsive on mobile (320 px to 428 px viewports) | Chrome DevTools → responsive mode → test collection + product + checkout | ☐ |
| 8.2 | Tap targets (buttons, links) are at least 48×48 px on mobile | DevTools → Lighthouse → Accessibility audit | ☐ |
| 8.3 | Sufficient colour contrast on all text (WCAG AA — 4.5:1 ratio minimum) | Lighthouse accessibility audit | ☐ |
| 8.4 | Viewport meta tag present (`<meta name="viewport" content="width=device-width, initial-scale=1">`) | Dawn theme includes this by default — verify in theme.liquid | ☐ |

---

## 9. Canonical Tags & Duplicate Content

| # | Check | How to Verify | Status |
|---|-------|---------------|--------|
| 9.1 | All product pages have a self-referencing canonical tag (Dawn outputs this natively) | View product page source → search `rel="canonical"` | ☐ |
| 9.2 | Filtered/sorted collection URLs (e.g. `?sort_by=price-ascending`) are canonicalised to the base collection URL | View filtered page source → canonical should point to unfiltered URL | ☐ |
| 9.3 | `www` vs non-`www` redirects to one canonical version | Visit both — one should 301 to the other | ☐ |
| 9.4 | `HTTP` redirects to `HTTPS` | Visit `http://` URL — should 301 to `https://` | ☐ |

---

## 10. Analytics & Tracking

| # | Check | How to Verify | Status |
|---|-------|---------------|--------|
| 10.1 | GA4 property created with IST timezone and INR currency | GA4 Admin → Property settings | ☐ |
| 10.2 | GA4 connected to Shopify via Google & YouTube channel or GTM (see `ga4-setup-guide.md`) | GA4 Realtime report → visit store → confirm active user appears | ☐ |
| 10.3 | GA4 Enhanced E-commerce events firing: `view_item`, `add_to_cart`, `begin_checkout`, `purchase` | GA4 DebugView → walk through a test purchase | ☐ |
| 10.4 | Meta Pixel installed and firing `PageView`, `ViewContent`, `AddToCart`, `Purchase` (see `meta-pixel-setup-guide.md`) | Meta Events Manager → Test Events tab | ☐ |
| 10.5 | Conversions API enabled (server-side redundancy for iOS 14+ users) | Facebook & Instagram channel → Data sharing → CAPI toggle ON | ☐ |
| 10.6 | Google Search Console property verified and sitemap submitted | GSC → Coverage → no critical errors | ☐ |
| 10.7 | `purchase` event fires on order confirmation — **requires Shopify Customer Events API** (see note below) | GA4 DebugView → purchase event with `transaction_id` after test order | ☐ |

---

## 11. Shopify-Specific Built-In SEO Features (Verify Active)

Dawn theme and Shopify core handle the following automatically. Verify each is not accidentally disabled.

| Feature | Where to Check |
|---------|---------------|
| Auto-generated sitemap at `/sitemap.xml` | Visit the URL — should return XML |
| Auto-generated `robots.txt` | Visit `/robots.txt` |
| SSL/HTTPS on all pages | Shopify Admin → Domains → SSL certificate status |
| Canonical tags on all pages | View source of product and collection pages |
| Product schema JSON-LD on product pages | Rich Results Test |
| 301 redirect when product URL handle is changed | Shopify prompts to create a redirect — always accept |
| Breadcrumb navigation (assistive for BreadcrumbList schema) | Dawn collection/product pages show breadcrumbs visually |

---

## 12. Post-Launch Monitoring Checklist (First 30 Days)

| Week | Action |
|------|--------|
| Week 1 | Submit sitemap to GSC; verify index coverage report shows products and collections |
| Week 1 | Check GSC → Core Web Vitals → fix any pages flagged as "Poor" |
| Week 2 | Review GSC → Performance → top queries; confirm target keywords are appearing |
| Week 2 | Check GA4 → E-commerce → purchase funnel for any drop-off anomalies |
| Week 3 | Run PageSpeed Insights on 5 product pages; address any regressions |
| Week 4 | Review GA4 → Traffic acquisition → Organic search share vs Direct vs Paid |
| Month 1 end | Export GSC impressions and clicks for baseline; set monthly targets |

---

## 13. Pre-Launch Static Asset Checklist (Next.js — Action Required)

The following static files are **referenced in code but do not yet exist** in `/public/`. They must be created before launch.

| File | Size | Purpose | Status |
|------|------|---------|--------|
| `/public/favicon.ico` | 32×32 px | Browser tab icon (legacy) | ⚠️ Missing |
| `/public/icon.svg` | Scalable | Browser tab icon (modern, auto-scales) | ⚠️ Missing |
| `/public/icon-192.png` | 192×192 px | Android home screen / PWA icon | ⚠️ Missing |
| `/public/icon-512.png` | 512×512 px | Android splash / PWA icon | ⚠️ Missing |
| `/public/apple-icon.png` | 180×180 px | iOS "Add to Home Screen" icon | ⚠️ Missing |
| `/public/logo.png` | 512×512 px min | Organization schema `logo` field — referenced in structured data (homepage, about, contact); used by Google Knowledge Panel | ⚠️ Missing |
| `/public/og-home.jpg` | 1200×630 px | ~~Replaced by dynamic `src/app/(storefront)/opengraph-image.tsx` — no longer needed~~ | ✅ N/A |

### Notes

- **OG image**: Replaced by server-generated `src/app/(storefront)/opengraph-image.tsx` (Next.js file-based OG convention). Dynamic images are generated at edge runtime — no static file needed.
- **Favicon/icon files**: Referenced in `src/app/layout.tsx` `icons` metadata block. Without them, browsers will show a blank tab icon and iOS bookmarks will have no icon.
- **`logo.png`**: Referenced in `src/lib/seo/structured-data.ts` (`buildOrganizationSchema`, `buildAboutPageSchema`). A missing logo means Google's rich results parser receives a 404 for the logo URL, which may suppress the Knowledge Panel logo. Use the same 512×512 source as the PWA icons — export as a square PNG on white or transparent background.
- **Recommended workflow**: Export all icon sizes from Figma using the Dalify logo mark on a `#2D6A4F` (green) background. Use [RealFaviconGenerator](https://realfavicongenerator.net) to generate the full favicon set from a 512×512 PNG source.

---

### Note on `purchase` event (item 10.7)

Dalify uses Shopify's hosted checkout. After payment, the customer lands on Shopify's order confirmation page — not a Next.js route. The `trackPurchase()` helper in `src/lib/analytics.ts` is intentionally retained for future use but **cannot fire from within the Next.js app**.

To fire `purchase` / `Purchase` on order confirmation, use **Shopify Customer Events** (the recommended approach for headless Shopify):

1. Shopify Admin → **Settings** → **Customer events** → **Add custom pixel**
2. Paste the following pixel script:

```js
analytics.subscribe("checkout_completed", (event) => {
  const order = event.data.checkout;
  const items = order.lineItems.map((line) => ({
    item_id: line.variant?.product?.id ?? "",
    item_name: line.title,
    price: parseFloat(line.variant?.price?.amount ?? "0"),
    quantity: line.quantity,
  }));

  // GA4
  if (typeof gtag === "function") {
    gtag("event", "purchase", {
      transaction_id: order.order?.id ?? order.token,
      value: parseFloat(order.totalPrice?.amount ?? "0"),
      currency: order.totalPrice?.currencyCode ?? "INR",
      items,
    });
  }

  // Meta Pixel
  if (typeof fbq === "function") {
    fbq("track", "Purchase", {
      value: parseFloat(order.totalPrice?.amount ?? "0"),
      currency: order.totalPrice?.currencyCode ?? "INR",
      content_ids: items.map((i) => i.item_id),
      content_type: "product",
      num_items: items.reduce((s, i) => s + i.quantity, 0),
    });
  }
});
```

3. Save and publish the pixel.
4. Place a test order and verify the `purchase` event appears in GA4 DebugView with correct `transaction_id` and `value`.

**Alternative (lower effort):** Install Shopify's official **Google & YouTube** channel and **Facebook & Instagram** channel. Both channels auto-wire `purchase` / `Purchase` events natively through their own pixel injection without custom code.

---

*Last updated: 2026-03-30 | For Dalify Next.js storefront*
