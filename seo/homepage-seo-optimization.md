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

### Implementation in Shopify
1. Shopify Admin → **Online Store** → **Preferences**.
2. Under **Title and meta description**, paste the above.
3. Click **Save**.

---

## 2. H1 / H2 Heading Structure

The Dawn theme uses the homepage sections for visible headings. Recommended structure:

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

### Schema / Structured Data
Shopify Dawn theme natively outputs:
- `Organization` schema (from store details)
- `WebSite` schema with `SearchAction` (enables Google Sitelinks searchbox)
- `Product` schema on product pages

**Verify** these are active:
1. Use [Google Rich Results Test](https://search.google.com/test/rich-results) and enter your homepage URL.
2. Confirm `WebSite` and `Organization` schemas are detected without errors.

**Supplement with** (add via Shopify theme `layout/theme.liquid`):
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Dalify",
  "url": "https://dalify.in",
  "logo": "https://dalify.in/path-to-logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": ["English", "Hindi"]
  },
  "sameAs": [
    "https://www.instagram.com/dalify",
    "https://www.facebook.com/dalify"
  ]
}
```

### Image Alt Text (Hero + Featured Products)
- Hero image: `alt="Organic spices and grains from Dalify — FSSAI certified"`
- Product images: `alt="[Product Name] — Organic, FSSAI Certified | Dalify"`
- Logo: `alt="Dalify — Organic D2C Food Brand"`

### Page Speed Recommendations (Core Web Vitals)
- Use WebP format for all homepage images (Dawn theme supports this natively).
- Lazy-load below-the-fold product card images.
- Minimize homepage sections — 5–7 sections max to keep LCP fast.
- Test with [PageSpeed Insights](https://pagespeed.web.dev) targeting >70 mobile score.

---

## 6. Sitemap & Crawlability

Shopify automatically generates a sitemap at `/sitemap.xml`. Verify:
1. Visit `yourdomain.com/sitemap.xml` — confirm products, collections, pages, and blog posts are listed.
2. Submit the sitemap to **Google Search Console**:
   - GSC → **Sitemaps** → Add `sitemap.xml` → Submit.
3. Confirm `robots.txt` at `/robots.txt` is not blocking crawlers (Shopify default is correct).

---

## 7. Google Search Console Setup (Prerequisite for SEO Monitoring)

1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. Click **Add Property** → select **URL prefix** → enter your store URL.
3. Verify ownership via **HTML tag** method:
   - Copy the `<meta name="google-site-verification"...>` tag.
   - In Shopify Admin → **Online Store** → **Preferences** → **Google Analytics** → paste in the additional scripts field (or add via GTM).
4. Click **Verify**.
5. Submit sitemap (see Section 6 above).

**Key GSC Reports to Monitor:**
- **Performance**: impressions, clicks, avg. position for target keywords
- **Coverage**: indexed vs. excluded pages
- **Core Web Vitals**: mobile/desktop scores
- **Rich Results**: product schema validation

---

*Last updated: 2026-03-25 | For Dalify Shopify (Dawn theme)*
