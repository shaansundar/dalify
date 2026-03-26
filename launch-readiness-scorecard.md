# Dalify — Launch Readiness Scorecard

Day 6 deliverable for the 1-week D2C build sprint.

---

## How to Use

This scorecard is the **go/no-go decision document** for Day 7 launch. Each category contains pass/fail criteria. The launch decision follows the rules at the bottom.

**Scoring:**
- **PASS** — Criterion fully met
- **PARTIAL** — Partially met with a documented workaround
- **FAIL** — Not met; blocks launch if in a Critical category

---

## Category 1: Store Foundation (Critical)

All items must PASS to launch.

| # | Criterion | Evidence Required | Status |
|---|-----------|-------------------|--------|
| SF-1 | Shopify store is on a paid plan | Settings → Plan shows active subscription | ☐ |
| SF-2 | Custom domain connected and resolving | Browser loads `dalify.in` (or chosen domain) over HTTPS | ☐ |
| SF-3 | SSL certificate active | Padlock icon in browser; no mixed-content warnings | ☐ |
| SF-4 | Store password protection removed | Store is publicly accessible (no password page) | ☐ |
| SF-5 | Dawn theme is the active/published theme | Online Store → Themes shows Dawn as live | ☐ |

**Category verdict:** ☐ PASS / ☐ FAIL

---

## Category 2: Product Catalog (Critical)

| # | Criterion | Evidence Required | Status |
|---|-----------|-------------------|--------|
| PC-1 | ≥ 100 SKUs published and visible | Products → All → filter "Active": count ≥ 100 | ☐ |
| PC-2 | All published products have images | Spot-check 10 random products; no placeholder/missing images | ☐ |
| PC-3 | All published products have descriptions | Spot-check 10 random products; descriptions present and coherent | ☐ |
| PC-4 | Products organized into collections | Collections page shows logical groupings | ☐ |
| PC-5 | Product prices are correct | Spot-check 10 products; prices match intended pricing | ☐ |
| PC-6 | Inventory tracking enabled | Settings → check "Track quantity" is on for tracked products | ☐ |

**Category verdict:** ☐ PASS / ☐ FAIL

---

## Category 3: Payments (Critical)

| # | Criterion | Evidence Required | Status |
|---|-----------|-------------------|--------|
| PM-1 | ≥ 2 payment methods active | Razorpay (UPI + Card) + COD both enabled | ☐ |
| PM-2 | Razorpay is in PRODUCTION mode | Razorpay Dashboard → Mode shows "Live" (NOT test) | ☐ |
| PM-3 | Razorpay production API keys set in Shopify | Settings → Payments → Razorpay shows live credentials | ☐ |
| PM-4 | COD active | Settings → Payments → Manual methods → COD enabled | ☐ |
| PM-5 | Test payment successful (production) | Place one real small-value order; payment captured | ☐ |
| PM-6 | Bogus Gateway removed | Settings → Payments → no test gateway active | ☐ |

**Category verdict:** ☐ PASS / ☐ FAIL

---

## Category 4: Shipping (Critical)

| # | Criterion | Evidence Required | Status |
|---|-----------|-------------------|--------|
| SH-1 | Shipping zones configured for India | Settings → Shipping → India zone with rates | ☐ |
| SH-2 | Free shipping ≥ INR 499 active | Place test order ≥ 499; shipping shows Free | ☐ |
| SH-3 | Flat INR 49 < 499 active | Place test order < 499; shipping shows INR 49 | ☐ |
| SH-4 | Shiprocket integration active | Shiprocket app installed; orders syncing | ☐ |
| SH-5 | Test shipping label generated | One test order processed through Shiprocket with label PDF | ☐ |

**Category verdict:** ☐ PASS / ☐ FAIL

---

## Category 5: Checkout & Order Flow (Critical)

| # | Criterion | Evidence Required | Status |
|---|-----------|-------------------|--------|
| CO-1 | End-to-end order completes (UPI) | Test order → confirmation page → email received | ☐ |
| CO-2 | End-to-end order completes (Card) | Test order → confirmation page → email received | ☐ |
| CO-3 | End-to-end order completes (COD) | Test order → confirmation page → email received | ☐ |
| CO-4 | Order confirmation email sends | Email received within 2 minutes of order | ☐ |
| CO-5 | Guest checkout works | Complete order without creating an account | ☐ |
| CO-6 | Mobile checkout works | Complete order on iOS Safari or Android Chrome | ☐ |

**Category verdict:** ☐ PASS / ☐ FAIL

---

## Category 6: Email & Marketing (High)

| # | Criterion | Evidence Required | Status |
|---|-----------|-------------------|--------|
| EM-1 | Klaviyo connected to Shopify | Klaviyo dashboard shows Shopify integration active | ☐ |
| EM-2 | Welcome email flow active | Trigger test signup → email received | ☐ |
| EM-3 | Abandoned cart flow active | Flow is "Live" in Klaviyo (timing can be adjusted post-launch) | ☐ |
| EM-4 | Transactional emails working | Order confirmation, shipping confirmation templates verified | ☐ |

**Category verdict:** ☐ PASS / ☐ PARTIAL / ☐ FAIL

---

## Category 7: Analytics & Tracking (High)

| # | Criterion | Evidence Required | Status |
|---|-----------|-------------------|--------|
| AT-1 | GA4 property created and connected | GA4 Realtime shows visits when browsing the store | ☐ |
| AT-2 | GA4 e-commerce events firing | AddToCart, BeginCheckout, Purchase events visible | ☐ |
| AT-3 | Meta Pixel installed | Facebook Pixel Helper shows PageView event | ☐ |
| AT-4 | Meta Pixel e-commerce events | ViewContent, AddToCart, Purchase events firing | ☐ |

**Category verdict:** ☐ PASS / ☐ PARTIAL / ☐ FAIL

---

## Category 8: Legal & Compliance (Critical)

| # | Criterion | Evidence Required | Status |
|---|-----------|-------------------|--------|
| LC-1 | Privacy Policy published | Accessible from footer link | ☐ |
| LC-2 | Terms of Service published | Accessible from footer link | ☐ |
| LC-3 | Refund/Return Policy published | Accessible from footer link | ☐ |
| LC-4 | Contact information visible | Email or phone on Contact page and/or footer | ☐ |
| LC-5 | FSSAI license number displayed | Visible on footer or About page (required for food products) | ☐ |

**Category verdict:** ☐ PASS / ☐ FAIL

---

## Category 9: Performance (High)

| # | Criterion | Evidence Required | Status |
|---|-----------|-------------------|--------|
| PF-1 | Lighthouse Mobile ≥ 70 (homepage) | Lighthouse report screenshot | ☐ |
| PF-2 | LCP < 3.0s on mobile (homepage) | Lighthouse or PageSpeed Insights report | ☐ |
| PF-3 | No render-blocking third-party JS | Lighthouse diagnostics: no blocking resources flagged | ☐ |
| PF-4 | Hero image optimized (< 200 KB) | DevTools Network tab → check image size | ☐ |

See [Performance Verification Guide](./performance-guide.md) for detailed testing instructions.

**Category verdict:** ☐ PASS / ☐ PARTIAL / ☐ FAIL

---

## Category 10: Mobile Experience (Critical)

| # | Criterion | Evidence Required | Status |
|---|-----------|-------------------|--------|
| MX-1 | Homepage renders correctly on iOS Safari | Visual check — no overflow, images load | ☐ |
| MX-2 | Homepage renders correctly on Android Chrome | Visual check — matches iOS | ☐ |
| MX-3 | Product page usable on mobile | Images, description, Add to Cart all work | ☐ |
| MX-4 | Checkout completable on mobile | Full flow works (tested in Category 5 CO-6) | ☐ |
| MX-5 | Navigation works on mobile | Hamburger menu opens/closes, all links work | ☐ |

**Category verdict:** ☐ PASS / ☐ FAIL

---

## Launch Decision Matrix

| Outcome | Rule |
|---------|------|
| **GO** | All Critical categories PASS **and** no more than 1 High category is PARTIAL (with documented workaround) |
| **CONDITIONAL GO** | All Critical categories PASS **but** 2+ High categories are PARTIAL — launch with post-launch fix plan documented |
| **NO GO** | Any Critical category FAILs — fix before launching |

---

## Final Verdict

| Category | Type | Verdict |
|----------|------|---------|
| 1. Store Foundation | Critical | ☐ |
| 2. Product Catalog | Critical | ☐ |
| 3. Payments | Critical | ☐ |
| 4. Shipping | Critical | ☐ |
| 5. Checkout & Order Flow | Critical | ☐ |
| 6. Email & Marketing | High | ☐ |
| 7. Analytics & Tracking | High | ☐ |
| 8. Legal & Compliance | Critical | ☐ |
| 9. Performance | High | ☐ |
| 10. Mobile Experience | Critical | ☐ |

**Decision:** ☐ GO / ☐ CONDITIONAL GO / ☐ NO GO

**Decision maker:** _______________
**Date:** _______________
**Notes:** _______________

---

## Post-Launch Immediate Monitoring (First 24 Hours)

If launch decision is GO or CONDITIONAL GO, monitor these within the first 24 hours:

| # | Check | When | How |
|---|-------|------|-----|
| PL-1 | First real order processes successfully | Within first few orders | Shopify Admin → Orders |
| PL-2 | Payment capture works (no test mode leaks) | First paid order | Razorpay Dashboard → Payments |
| PL-3 | Shiprocket syncs real orders | First order + 10 min | Shiprocket → Orders → New |
| PL-4 | GA4 receiving real traffic | 30 min post-launch | GA4 Realtime report |
| PL-5 | No 5xx errors | First 2 hours | Shopify Admin → Analytics; browser console |
| PL-6 | Welcome email sends to real signups | First signup | Check Klaviyo → Flows → Welcome |
| PL-7 | Site is indexed by Google | 24–48 hours | Search `site:dalify.in` on Google |
