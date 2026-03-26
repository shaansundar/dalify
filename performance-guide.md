# Dalify — Performance Verification Guide

Day 6 deliverable for the 1-week D2C build sprint.

---

## Target Metrics

| Metric | Target | Acceptable | Poor |
|--------|--------|------------|------|
| **LCP** (Largest Contentful Paint) | < 2.5s | 2.5–4.0s | > 4.0s |
| **FID** (First Input Delay) | < 100ms | 100–300ms | > 300ms |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 0.1–0.25 | > 0.25 |
| **INP** (Interaction to Next Paint) | < 200ms | 200–500ms | > 500ms |
| **TTFB** (Time to First Byte) | < 800ms | 800–1800ms | > 1800ms |
| **Speed Index** | < 3.4s | 3.4–5.8s | > 5.8s |
| **Total Page Weight** | < 2 MB | 2–4 MB | > 4 MB |
| **Lighthouse Performance Score** | ≥ 80 | 60–79 | < 60 |

**Primary target: LCP < 2.5s on mobile.** Dawn theme achieves this out of the box when configured correctly. Deviations usually mean an oversized hero image, unoptimized app scripts, or too many third-party tags.

---

## Testing Tools

### 1. Google Lighthouse (Primary)

**How to run:**
1. Open Chrome → navigate to your Dalify store
2. Open DevTools (F12) → **Lighthouse** tab
3. Settings:
   - Mode: **Navigation**
   - Device: **Mobile** (test mobile first, then desktop)
   - Categories: **Performance** (minimum); also check Accessibility, SEO, Best Practices
4. Click **Analyze page load**
5. Record the scores for each page type

**Pages to test (minimum):**

| Page | URL Pattern | Priority |
|------|-------------|----------|
| Homepage | `/` | Critical |
| Collection page | `/collections/{name}` | Critical |
| Product detail page | `/products/{name}` | Critical |
| Cart page | `/cart` | High |
| About page | `/pages/about` | Medium |
| Search results | `/search?q=test` | Medium |

**Record results here:**

| Page | Device | Perf Score | LCP | FID/INP | CLS | Notes |
|------|--------|-----------|-----|---------|-----|-------|
| Homepage | Mobile | | | | | |
| Homepage | Desktop | | | | | |
| Collection | Mobile | | | | | |
| Collection | Desktop | | | | | |
| Product | Mobile | | | | | |
| Product | Desktop | | | | | |
| Cart | Mobile | | | | | |

### 2. PageSpeed Insights (Field + Lab Data)

**How to run:**
1. Go to [PageSpeed Insights](https://pagespeed.web.dev)
2. Enter your store URL
3. Review both **Lab data** (simulated) and **Field data** (real users, available after ~28 days of traffic)
4. Focus on Core Web Vitals (LCP, INP, CLS)

**Note:** Field data won't be available for a new store. Use Lab data for pre-launch verification.

### 3. WebPageTest (Advanced)

**How to run:**
1. Go to [WebPageTest](https://www.webpagetest.org)
2. Enter your store URL
3. Settings:
   - Test Location: **Mumbai, India** (closest to target audience)
   - Browser: **Chrome**
   - Connection: **4G** (simulates Indian mobile users)
   - Number of tests: **3** (take median result)
4. Review the waterfall chart for bottlenecks

**What to look for in the waterfall:**
- Hero image loading time (should be < 1s)
- Third-party script blocking (Razorpay, Klaviyo, GA4, Meta Pixel)
- Font loading delays
- Render-blocking CSS/JS

---

## Dawn Theme — Known Performance Pitfalls

Dawn is Shopify's fastest default theme (Lighthouse 95+ out of the box). These are the most common ways stores degrade its performance:

### Pitfall 1: Oversized Hero Images

**Symptom:** LCP > 3s; hero image is the LCP element
**Cause:** Uploading images larger than needed (e.g., 4000×3000px JPEG at 2 MB)
**Fix:**
- Maximum hero image size: **2048×1024px** for desktop, **1080×1080px** for mobile
- Format: WebP preferred (Shopify auto-converts if you upload JPEG/PNG)
- File size target: **< 200 KB** per hero image
- Use Shopify's built-in image CDN — it serves responsive sizes via `srcset`

**Verification:**
```
DevTools → Network tab → filter "img" → check hero image size and dimensions
```

### Pitfall 2: Too Many Shopify Apps

**Symptom:** Low Lighthouse score; excessive JavaScript in waterfall
**Cause:** Each Shopify app injects its own JS/CSS into the theme
**Fix:**
- Audit installed apps: remove any not actively used
- Required apps only: Shiprocket, Klaviyo, Razorpay
- Check for apps injecting scripts on every page (some apps only need scripts on specific pages)

**Verification:**
```
DevTools → Network tab → filter "JS" → identify scripts not from your theme or Shopify CDN
```

### Pitfall 3: Undeferred Third-Party Scripts

**Symptom:** High TBT (Total Blocking Time); FID/INP degraded
**Cause:** GA4, Meta Pixel, or Klaviyo scripts loading synchronously
**Fix:**
- GA4: Use `async` attribute (default if installed via Shopify's Google channel)
- Meta Pixel: Ensure the script has `async` or is loaded via Shopify's Facebook channel
- Klaviyo: Their snippet is async by default; verify no custom modifications broke this

**Verification:**
```
DevTools → Network tab → check "Initiator" column → ensure third-party scripts are not render-blocking
```

### Pitfall 4: Custom Fonts Loading Slowly

**Symptom:** Flash of Invisible Text (FOIT) or Flash of Unstyled Text (FOUT)
**Cause:** Custom web fonts loading from external CDN
**Fix:**
- Use Dawn's built-in system fonts (best performance)
- If custom fonts required: preload the primary font in `theme.liquid`:
  ```html
  <link rel="preload" href="{{ 'custom-font.woff2' | asset_url }}" as="font" type="font/woff2" crossorigin>
  ```
- Use `font-display: swap` to prevent FOIT

### Pitfall 5: Excessive Product Images per Page

**Symptom:** Slow collection pages; high total page weight
**Cause:** Collection grid loading all product images eagerly
**Fix:**
- Dawn uses native lazy loading (`loading="lazy"`) by default — verify this hasn't been overridden
- Limit products per page to **24** in collection template settings
- Ensure product images are optimized before upload (< 500 KB each)

### Pitfall 6: Unused CSS from Theme Customizations

**Symptom:** Lighthouse flags "Reduce unused CSS"
**Cause:** Theme editor customizations or app CSS loaded globally
**Fix:**
- Check `theme.liquid` and `base.css` for app-injected styles
- Remove CSS from uninstalled apps (Shopify doesn't always clean up)
- Use DevTools Coverage tab to identify unused CSS percentage

---

## Performance Optimization Checklist

Run through this checklist after initial Lighthouse testing:

| # | Optimization | Status | Impact |
|---|-------------|--------|--------|
| PERF-1 | Hero image < 200 KB, WebP format, correct dimensions | ☐ | High (LCP) |
| PERF-2 | Product images < 500 KB each | ☐ | Medium (page weight) |
| PERF-3 | Lazy loading enabled for below-fold images | ☐ | High (LCP, Speed Index) |
| PERF-4 | Only 3 essential apps installed (Shiprocket, Klaviyo, Razorpay) | ☐ | High (TBT, JS size) |
| PERF-5 | GA4 script loads async | ☐ | Medium (TBT) |
| PERF-6 | Meta Pixel loads async | ☐ | Medium (TBT) |
| PERF-7 | Klaviyo snippet is async (default) | ☐ | Low (verify only) |
| PERF-8 | Products per collection page ≤ 24 | ☐ | Medium (page weight) |
| PERF-9 | System fonts or preloaded custom fonts | ☐ | Medium (CLS, LCP) |
| PERF-10 | No render-blocking JS in `<head>` | ☐ | High (FID/INP) |
| PERF-11 | Shopify CDN serving images (no external image hosts) | ☐ | Medium (TTFB) |
| PERF-12 | Browser caching headers set (Shopify handles this; verify) | ☐ | Low (repeat visits) |

---

## Testing Protocol

### Step 1: Baseline Measurement

Before any optimizations, record Lighthouse scores for Homepage, Collection, and Product pages on mobile.

### Step 2: Identify LCP Element

1. Run Lighthouse → expand LCP diagnostic
2. Note which element is the LCP (usually hero image or first product image)
3. If LCP > 2.5s, optimize that specific element first

### Step 3: Check Third-Party Impact

1. DevTools → Network tab → disable cache → reload
2. Filter by domain — identify all non-Shopify requests
3. For each third-party script, note:
   - Load time
   - Size
   - Whether it's render-blocking

### Step 4: Optimize and Re-test

1. Apply fixes from the optimization checklist above
2. Re-run Lighthouse on the same pages
3. Compare scores — LCP should improve first

### Step 5: Mobile Network Simulation

1. DevTools → Network tab → Throttling → **Slow 3G** or **Fast 3G**
2. Reload the page — verify it still loads within 5 seconds on slow networks
3. This simulates tier-2/3 city users in India on patchy connections

---

## Summary: What "Good Enough for Launch" Looks Like

| Criterion | Minimum for Launch |
|-----------|-------------------|
| Lighthouse Mobile Performance | ≥ 70 (target ≥ 80) |
| LCP on mobile | < 3.0s (target < 2.5s) |
| CLS on mobile | < 0.15 (target < 0.1) |
| INP on mobile | < 300ms (target < 200ms) |
| Total page weight (homepage) | < 3 MB (target < 2 MB) |
| No render-blocking third-party JS | Yes |
| Hero image optimized | Yes |

If all "Minimum for Launch" criteria pass, performance is acceptable for Day 7 go-live. Continue optimizing post-launch using real field data from PageSpeed Insights (available after ~28 days of traffic).
