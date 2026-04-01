# Homepage SEO Optimization — Dalify

## 1. Meta Tags

### Meta Title
```
Dalify — Organic Spices, Grains & Pulses | Shop Online India
```
**Character count:** 58 | **Target keyword:** organic spices online India

### Meta Description
```
Shop certified organic spices, whole grains, pulses & instant mixes at Dalify. FSSAI-approved. Free shipping on orders above ₹499. Order now.
```
**Character count:** 153 | **CTA:** Order now | **USPs:** FSSAI-approved, free shipping threshold

### Implementation (Next.js storefront)
Already live in `src/app/(storefront)/page.tsx` — `export const metadata` block. To change, edit that file directly. No Shopify Admin step required.

---

## 2. H1 / H2 Heading Structure

The Next.js homepage uses these sections for visible headings. Recommended structure:

```
H1: Pure Organic. Straight from the Source.
    [Subline]: FSSAI-certified spices, grains, pulses & instant mixes — delivered to your door.

H2: Shop by Category
    [Collections grid: Spices | Whole Grains | Pulses | Instant Mixes]

H2: Why Dalify?
    [Trust signals: Certified Organic | No Additives | Sourced Directly | FSSAI Approved]

H2: Bestsellers
    [Featured products: Turmeric Powder, Organic Chana Dal, Basmati Rice...]

H2: What Our Customers Say
    [Reviews section]

H2: From Our Blog / Learn About Organic Living
    [3 blog post cards — optional, strengthens topical authority]
```

### Notes
- Only one H1 per page. Make it brand-positioning, not keyword-stuffed.
- H2s organize sections for both users and crawlers.
- Include primary keywords naturally in H2 text (e.g., "Shop by Category" is fine; avoid forcing "buy organic spices online" unnaturally).

---

## 3. Hero Section Copy Suggestions

### Option A — Benefit-Led
```
Headline: Real Organic. Zero Compromise.
Subheadline: Farm-sourced spices, grains & pulses with FSSAI certification — because your family deserves the real thing.
CTA Button: Shop Now
Secondary CTA: See All Products
```

### Option B — Origin-Led
```
Headline: From Indian Farms to Your Kitchen
Subheadline: Certified organic turmeric, dal, basmati & more — no middlemen, no additives.
CTA Button: Explore Products
```

### Option C — Urgency / Offer-Led
```
Headline: Eat Clean. Live Well.
Subheadline: Organic spices & pantry staples — FSSAI approved, free shipping above ₹499.
CTA Button: Shop Now  |  [Free Shipping Banner]
```

**Recommendation:** Option A for brand authority; use Option C during launch/promotional periods.

---

## 4. Internal Linking Strategy

### Key Links to Include on the Homepage

| Link Text | Destination | Purpose |
|-----------|-------------|---------|
| Organic Spices | `/collections/organic-spices` | Collection SEO + navigation |
| Whole Grains | `/collections/whole-grains` | Collection SEO + navigation |
| Pulses & Lentils | `/collections/pulses-lentils` | Collection SEO + navigation |
| Instant Mixes | `/collections/instant-mixes` | Collection SEO + navigation |
| Organic Turmeric Powder | `/products/organic-turmeric-powder` | Bestseller product direct link |
| About Dalify | `/pages/about` | E-E-A-T / brand trust |
| FSSAI Certification | `/pages/about#fssai` or `/pages/certifications` | Trust anchor |
| Blog (if available) | `/blogs/news` or `/blogs/recipes` | Topical authority |

### Internal Linking Best Practices
- Use **descriptive anchor text** — avoid "click here" or bare URLs.
- Navigation menu and footer should link to all top-level collections.
- Product cards in "Bestsellers" section should link directly to product pages.
- Add a **"Recently Viewed"** or **"You May Also Like"** section to increase pages per session.

---

## 5. Additional On-Page SEO Elements

### Schema / Structured Data (Next.js storefront)
The following JSON-LD schemas are already implemented and live:

| Schema | File | Page |
|--------|------|------|
| `WebSite` + `SearchAction` | `src/lib/seo/structured-data.ts` → `buildWebSiteSchema()` | Homepage |
| `Organization` | `src/lib/seo/structured-data.ts` → `buildOrganizationSchema()` | Homepage |
| `ItemList` (featured products) | `src/lib/seo/structured-data.ts` → `buildItemListSchema()` | Homepage |
| `Product` + `Offer` | `buildProductSchema()` | Product pages |
| `CollectionPage` | `buildCollectionPageSchema()` | Collection pages |
| `BreadcrumbList` | `buildBreadcrumbSchema()` | Product + collection pages |
| `FAQPage` | `buildFAQSchema()` | FAQ page |
| `AboutPage` | `buildAboutPageSchema()` | About page |
| `ContactPage` | `buildContactPageSchema()` | Contact page |

**Verify after launch:**
1. Use [Google Rich Results Test](https://search.google.com/test/rich-results) and enter your homepage URL.
2. Confirm `WebSite` and `Organization` schemas are detected without errors.
3. Test a product URL — confirm `Product` schema with `Offer.availability` and `Offer.price` is valid.
4. Test FAQ page — confirm `FAQPage` schema renders all Q&A pairs.

### Image Alt Text (Hero + Featured Products)
- Hero image: `alt="Organic spices and grains from Dalify — FSSAI certified"`
- Product images: `alt="[Product Name] — Organic, FSSAI Certified | Dalify"`
- Logo: `alt="Dalify — Organic D2C Food Brand"`

### Page Speed Recommendations (Core Web Vitals)
- **AVIF/WebP automatic** — `next.config.ts` sets `formats: ["image/avif", "image/webp"]`; all product images from `cdn.shopify.com` are served in the optimal format automatically.
- **Lazy loading** — `next/image` lazy-loads all images by default; only the main product gallery uses `priority` to preload the LCP image.
- **All storefront `<img>` tags replaced** — `ImageGallery`, `GridProductCard`, `CollectionHeader`, `ProductRecommendations`, `ProductCard`, `CartDrawer`, and `SearchInput` all use `next/image` with responsive `sizes`.
- Minimize homepage sections — 5–7 sections max to keep LCP fast.
- Test with [PageSpeed Insights](https://pagespeed.web.dev) targeting >70 mobile score.

---

## 6. Sitemap & Crawlability (Next.js storefront)

The sitemap is auto-generated by `src/app/sitemap.ts` — it fetches all products and collections from Shopify at build time and emits `/sitemap.xml`.

1. After deployment, visit `https://dalify.in/sitemap.xml` — confirm product and collection URLs appear.
2. Submit the sitemap to **Google Search Console**:
   - GSC → **Sitemaps** → Add `sitemap.xml` → Submit.
3. Confirm `robots.txt` at `/robots.txt` — it's generated by `src/app/robots.ts` and blocks `/api/`, `/admin`, `/cart`, `/checkout`, `/account`, `/search`, `/_next/`.

---

## 7. Google Search Console Setup (Prerequisite for SEO Monitoring)

1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. Click **Add Property** → select **URL prefix** → enter your store URL.
3. Verify ownership via **HTML tag** method:
   - Copy the `<meta name="google-site-verification" content="XXX">` tag.
   - Add it to `src/app/layout.tsx` inside the `metadata` export:
     ```ts
     verification: {
       google: "YOUR_VERIFICATION_CODE",
     },
     ```
   - Deploy the change, then click **Verify** in GSC.
4. Alternative: verify via DNS TXT record (no code deployment needed).
5. Submit sitemap (see Section 6 above).

**Key GSC Reports to Monitor:**
- **Performance**: impressions, clicks, avg. position for target keywords
- **Coverage**: indexed vs. excluded pages
- **Core Web Vitals**: mobile/desktop scores
- **Rich Results**: product schema validation

---

*Last updated: 2026-03-31 | For Dalify Next.js 15 storefront*
