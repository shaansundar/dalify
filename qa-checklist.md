# Dalify — Comprehensive QA Checklist

Day 6 deliverable for the 1-week D2C build sprint.

---

## How to Use This Checklist

1. Execute **all Critical items** before launch — any failure blocks go-live
2. Execute **all High items** — failures should be fixed unless a workaround exists
3. **Medium items** are logged but do not block launch
4. Mark each item: ✅ Pass, ❌ Fail, ⏭️ N/A
5. For payment and order flow details, refer to the [Checkout Test Plan](./checkout-test-plan.md)

**Devices required:**
- iPhone (Safari) — test on iOS 16+
- Android phone (Chrome) — test on Android 12+
- Desktop Chrome (latest)
- Desktop Firefox (latest)

---

## 1. Mobile QA — iOS Safari

| # | Check | Expected | Status |
|---|-------|----------|--------|
| M-iOS-1 | Homepage loads fully | Hero banner, product grid, navigation visible; no horizontal scroll | ☐ |
| M-iOS-2 | Hamburger menu opens/closes | Menu slides in, all links work, closes on tap outside | ☐ |
| M-iOS-3 | Product grid layout | 2-column grid, images load, prices visible | ☐ |
| M-iOS-4 | Product detail page | Images swipeable, description readable, Add to Cart button visible above fold | ☐ |
| M-iOS-5 | Touch targets ≥ 44×44px | All buttons and links are tappable without mis-taps | ☐ |
| M-iOS-6 | Scroll behavior | Smooth scrolling, no stuck/jank on collection pages | ☐ |
| M-iOS-7 | Images load correctly | Product images sharp (not blurry), lazy-loaded below fold | ☐ |
| M-iOS-8 | Cart drawer interaction | Opens on add, shows correct items, quantity +/- works | ☐ |
| M-iOS-9 | Checkout form usability | Keyboard matches input type (email, tel, number for pincode) | ☐ |
| M-iOS-10 | Footer links work | About, FAQ, Policies, Contact all navigate correctly | ☐ |
| M-iOS-11 | Sticky header (if enabled) | Navigation remains accessible on scroll | ☐ |
| M-iOS-12 | Announcement bar readable | Text not truncated, dismissible if configured | ☐ |
| M-iOS-13 | Safe area / notch | Content not obscured by iPhone notch or home indicator | ☐ |

**Priority:** Critical (M-iOS-1 through M-iOS-9), High (M-iOS-10 through M-iOS-13)

---

## 2. Mobile QA — Android Chrome

| # | Check | Expected | Status |
|---|-------|----------|--------|
| M-AND-1 | Homepage loads fully | Same as iOS; no horizontal overflow | ☐ |
| M-AND-2 | Navigation menu | Hamburger opens/closes correctly | ☐ |
| M-AND-3 | Product grid layout | 2-column grid, consistent with iOS | ☐ |
| M-AND-4 | Product detail page | Image gallery, description, CTA visible | ☐ |
| M-AND-5 | Touch targets | All interactive elements tappable | ☐ |
| M-AND-6 | Scroll behavior | No jank, pull-to-refresh doesn't interfere | ☐ |
| M-AND-7 | Images load correctly | Progressive loading, correct aspect ratios | ☐ |
| M-AND-8 | Cart interaction | Add, remove, quantity change all work | ☐ |
| M-AND-9 | Checkout form | Auto-fill works, correct keyboard types | ☐ |
| M-AND-10 | UPI deep-link | UPI payment opens GPay/PhonePe/Paytm app | ☐ |
| M-AND-11 | Back button behavior | Android back navigates correctly (doesn't exit checkout unexpectedly) | ☐ |

**Priority:** Critical (M-AND-1 through M-AND-10), High (M-AND-11)

---

## 3. Desktop QA — Chrome

| # | Check | Expected | Status |
|---|-------|----------|--------|
| D-CH-1 | Homepage layout | Hero, featured products, collections grid render correctly | ☐ |
| D-CH-2 | Navigation | Top nav shows all menu items; dropdowns work on hover/click | ☐ |
| D-CH-3 | Collection pages | Product grid (3-4 columns), sort/filter if enabled | ☐ |
| D-CH-4 | Product detail page | Image gallery (click to zoom), variant selector, Add to Cart | ☐ |
| D-CH-5 | Search functionality | Search icon opens overlay/page; returns relevant results | ☐ |
| D-CH-6 | Cart page / drawer | Shows items, quantities, subtotal; Checkout button works | ☐ |
| D-CH-7 | About page | Content loads, images render, no broken layout | ☐ |
| D-CH-8 | FAQ page | All questions expandable/collapsible, answers readable | ☐ |
| D-CH-9 | Contact page | Form fields present (or email/phone displayed) | ☐ |
| D-CH-10 | Privacy Policy page | Full text loads, scrollable | ☐ |
| D-CH-11 | Terms of Service page | Full text loads | ☐ |
| D-CH-12 | Refund Policy page | Full text loads | ☐ |
| D-CH-13 | Footer | All links work; social icons link correctly; copyright present | ☐ |
| D-CH-14 | 404 page | Non-existent URL shows branded 404, not broken layout | ☐ |
| D-CH-15 | Favicon & browser tab | Dalify favicon shows; page title is correct | ☐ |

**Priority:** Critical (D-CH-1 through D-CH-6), High (D-CH-7 through D-CH-15)

---

## 4. Desktop QA — Firefox

| # | Check | Expected | Status |
|---|-------|----------|--------|
| D-FF-1 | Homepage layout | Matches Chrome rendering | ☐ |
| D-FF-2 | Navigation | Dropdowns, hover states work correctly | ☐ |
| D-FF-3 | Product pages | Image gallery, variant selectors functional | ☐ |
| D-FF-4 | Checkout flow | Full flow completes without errors | ☐ |
| D-FF-5 | Cart functionality | Add, remove, quantity changes work | ☐ |
| D-FF-6 | CSS rendering | No layout shifts, broken flexbox, or font issues | ☐ |

**Priority:** High (all)

---

## 5. Payment Testing

Refer to [Checkout Test Plan — Payment Tests](./checkout-test-plan.md) for detailed step-by-step scenarios. Summary checklist:

| # | Check | Expected | Status |
|---|-------|----------|--------|
| PAY-1 | UPI payment (Razorpay test mode) | Payment completes; order created in Shopify | ☐ |
| PAY-2 | Card payment (test card) | Payment completes; order created | ☐ |
| PAY-3 | COD order placement | Order created with "payment pending" status | ☐ |
| PAY-4 | Payment failure handling | Error message shown; no orphan order; retry works | ☐ |
| PAY-5 | Razorpay overlay renders on mobile | Modal/redirect works on both iOS and Android | ☐ |
| PAY-6 | Razorpay overlay renders on desktop | Modal/redirect works on Chrome and Firefox | ☐ |
| PAY-7 | Order amounts match | Cart total = checkout total = Razorpay amount = Shopify order amount | ☐ |

**Priority:** All Critical

---

## 6. Order Flow Testing

Refer to [Checkout Test Plan — Order Flow](./checkout-test-plan.md) for detailed steps.

| # | Check | Expected | Status |
|---|-------|----------|--------|
| ORD-1 | Place order → confirmation page | Thank you page with order number, correct summary | ☐ |
| ORD-2 | Confirmation email received | Within 2 minutes; correct items, total, address | ☐ |
| ORD-3 | Order appears in Shopify Admin | Order visible in Orders list with correct status | ☐ |
| ORD-4 | Shiprocket sync | Order appears in Shiprocket within 10 minutes | ☐ |
| ORD-5 | Shiprocket label generation | Label PDF generates with correct sender/receiver | ☐ |
| ORD-6 | Tracking number syncs to Shopify | Fulfillment status updates; customer gets tracking email | ☐ |
| ORD-7 | Customer tracking link works | Link shows shipment status page | ☐ |
| ORD-8 | Shipping rate correct | Free ≥ INR 499, INR 49 below threshold | ☐ |

**Priority:** Critical (ORD-1 through ORD-5), High (ORD-6 through ORD-8)

---

## 7. Klaviyo Email Flow Testing

| # | Check | Expected | Status |
|---|-------|----------|--------|
| KLV-1 | Welcome email triggers on signup | Email received within 5 min of newsletter/account signup | ☐ |
| KLV-2 | Welcome email renders correctly | Desktop + mobile; images load, CTA button works | ☐ |
| KLV-3 | Welcome email discount code works | 10% off code applies at checkout | ☐ |
| KLV-4 | Abandoned cart email #1 triggers | Sent ~4 hours after cart abandonment | ☐ |
| KLV-5 | Abandoned cart email #1 content | Shows abandoned products, CTA links back to cart | ☐ |
| KLV-6 | Abandoned cart email #2 triggers | Sent ~24 hours after abandonment (if #1 not converted) | ☐ |
| KLV-7 | Abandoned cart email #2 content | Urgency messaging, product images, CTA works | ☐ |
| KLV-8 | Unsubscribe link works | All emails have working unsubscribe; user is removed from flow | ☐ |
| KLV-9 | Klaviyo ↔ Shopify sync | Customer data syncs (email, order history, segments) | ☐ |

**How to test abandoned cart:**
1. Add items to cart on the storefront
2. Enter email at checkout but do NOT complete payment
3. Wait 4+ hours (or temporarily shorten the delay in Klaviyo flow settings)
4. Check that the first abandoned cart email arrives
5. Do not click the email CTA; wait for the second email

**Priority:** Critical (KLV-1, KLV-4), High (all others)

---

## 8. Edge Cases

| # | Scenario | Expected Behavior | Status |
|---|----------|-------------------|--------|
| EDGE-1 | Empty cart → Checkout | Redirect to cart page or "Your cart is empty" message | ☐ |
| EDGE-2 | Invalid discount code | "Invalid discount code" error; no price change | ☐ |
| EDGE-3 | Expired discount code | Clear error message; cannot apply | ☐ |
| EDGE-4 | Out-of-stock product in cart | Error at checkout; product marked unavailable | ☐ |
| EDGE-5 | Quantity exceeds inventory | Cannot add more than available stock | ☐ |
| EDGE-6 | Non-deliverable pincode | "No shipping available" or equivalent error at checkout | ☐ |
| EDGE-7 | Extremely long product name/address | No layout overflow; text truncates gracefully | ☐ |
| EDGE-8 | Double-click Add to Cart | Only adds one quantity (or shows feedback on second click) | ☐ |
| EDGE-9 | Concurrent sessions (two tabs) | Cart state consistent across tabs on refresh | ☐ |
| EDGE-10 | Network interruption mid-checkout | Graceful error; no duplicate orders or charges | ☐ |
| EDGE-11 | COD order above limit (if set) | COD option hidden or error shown | ☐ |
| EDGE-12 | Special characters in address fields | Form accepts valid characters (e.g., apartment #, floor /) | ☐ |

**Priority:** Critical (EDGE-1, EDGE-4, EDGE-10), High (EDGE-2 through EDGE-6), Medium (EDGE-7 through EDGE-12)

---

## 9. SEO & Analytics Verification

| # | Check | Expected | Status |
|---|-------|----------|--------|
| SEO-1 | Homepage meta title | Dalify brand name + keyword (≤ 60 chars) | ☐ |
| SEO-2 | Homepage meta description | Compelling description (≤ 160 chars) | ☐ |
| SEO-3 | Product pages have unique titles | Each product has a distinct meta title | ☐ |
| SEO-4 | Collection pages have meta tags | Title and description set per collection | ☐ |
| SEO-5 | Canonical URLs present | No duplicate content issues | ☐ |
| SEO-6 | Sitemap accessible | `/sitemap.xml` returns valid XML | ☐ |
| SEO-7 | Robots.txt correct | `/robots.txt` allows crawling; no accidental disallow | ☐ |
| SEO-8 | GA4 tracking fires | Visit pages → check GA4 Realtime → events appear | ☐ |
| SEO-9 | Meta Pixel fires | Use Facebook Pixel Helper extension → verify PageView, ViewContent, AddToCart, Purchase events | ☐ |
| SEO-10 | Structured data (JSON-LD) | Product pages have Product schema; test with Google Rich Results Test | ☐ |
| SEO-11 | Image alt text present | All product images have descriptive alt text | ☐ |
| SEO-12 | No broken links | Run a broken link checker across the site | ☐ |

**Priority:** Critical (SEO-8, SEO-9), High (SEO-1 through SEO-7, SEO-10), Medium (SEO-11, SEO-12)

---

## 10. Legal & Compliance

| # | Check | Expected | Status |
|---|-------|----------|--------|
| LEG-1 | Privacy Policy published | Accessible from footer; covers data collection, cookies, third-party sharing | ☐ |
| LEG-2 | Terms of Service published | Accessible from footer; covers purchase terms, liability | ☐ |
| LEG-3 | Refund/Return Policy published | Accessible from footer; covers timeframe, conditions, process | ☐ |
| LEG-4 | Contact information visible | Email/phone/address accessible on Contact page and footer | ☐ |
| LEG-5 | Cookie consent (if applicable) | Banner appears for new visitors; respects choice | ☐ |
| LEG-6 | FSSAI license number displayed | Required for food products; visible on homepage footer or About page | ☐ |
| LEG-7 | GST number displayed (if applicable) | Shown on invoices if registered | ☐ |

**Priority:** Critical (LEG-1 through LEG-4, LEG-6), Medium (LEG-5, LEG-7)

---

## Test Execution Summary

| Category | Total | Critical | High | Medium | Passed | Failed |
|----------|-------|----------|------|--------|--------|--------|
| Mobile iOS | 13 | 9 | 4 | 0 | /13 | /13 |
| Mobile Android | 11 | 10 | 1 | 0 | /11 | /11 |
| Desktop Chrome | 15 | 6 | 9 | 0 | /15 | /15 |
| Desktop Firefox | 6 | 0 | 6 | 0 | /6 | /6 |
| Payments | 7 | 7 | 0 | 0 | /7 | /7 |
| Order Flow | 8 | 5 | 3 | 0 | /8 | /8 |
| Klaviyo Emails | 9 | 2 | 7 | 0 | /9 | /9 |
| Edge Cases | 12 | 3 | 4 | 5 | /12 | /12 |
| SEO & Analytics | 12 | 2 | 8 | 2 | /12 | /12 |
| Legal & Compliance | 7 | 5 | 0 | 2 | /7 | /7 |
| **Total** | **100** | **49** | **42** | **9** | **/100** | **/100** |

**Launch gate:** All 49 Critical items must pass. No more than 5 High items may fail (with documented workarounds).

---

## Execution Notes

| Date | Tester | Category | Issues Found | Blockers |
|------|--------|----------|-------------|----------|
| | | | | |
