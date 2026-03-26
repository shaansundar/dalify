# Dalify — Launch-Day Runbook

Day 7 deliverable for the 1-week D2C build sprint.

---

## Prerequisites

Before starting the launch procedure:

- [ ] **Launch Readiness Scorecard** verdict is **GO** or **CONDITIONAL GO** ([scorecard](./launch-readiness-scorecard.md))
- [ ] All Critical QA items passed ([QA checklist](./qa-checklist.md))
- [ ] Razorpay is in **production mode** with live API keys
- [ ] Bogus Gateway / test payment providers **removed**
- [ ] Test orders archived or deleted from Shopify Admin
- [ ] DNS for `dalify.in` pointed to Shopify (if not already done on Day 1)
- [ ] SSL certificate provisioned and active
- [ ] All legal pages published (Privacy Policy, Terms, Refund Policy)
- [ ] FSSAI license number displayed on site
- [ ] Klaviyo welcome + abandoned cart flows set to **Live**
- [ ] GA4 and Meta Pixel installed and verified

---

## Launch-Day Timeline

### T-2 hours: Pre-Launch Final Review (8:00 AM)

| # | Action | Owner | Status |
|---|--------|-------|--------|
| PRE-1 | Open the Launch Readiness Scorecard — confirm all Critical categories show PASS | Human | ☐ |
| PRE-2 | Proofread homepage: hero text, CTA, featured products, announcement bar | Human | ☐ |
| PRE-3 | Proofread 3 random product pages: title, description, price, images | Human | ☐ |
| PRE-4 | Verify About, FAQ, Contact pages load correctly | Human | ☐ |
| PRE-5 | Verify Privacy Policy, Terms, Refund Policy links in footer all work | Human | ☐ |
| PRE-6 | Confirm Razorpay Dashboard shows **Live** mode (not Test) | Human | ☐ |
| PRE-7 | Confirm Shopify Payments settings have **no test gateways** active | Human | ☐ |
| PRE-8 | Verify Shiprocket integration is connected and syncing | Human | ☐ |
| PRE-9 | Check Klaviyo: Welcome flow = Live, Abandoned Cart flow = Live | Human | ☐ |
| PRE-10 | Open GA4 Realtime — confirm it's receiving data from your browser session | Human | ☐ |
| PRE-11 | Open Meta Pixel Helper (Chrome extension) — verify PageView fires on homepage | Human | ☐ |
| PRE-12 | Take a screenshot of the current password-protected page as a "before" record | Human | ☐ |

**Gate:** All PRE items must pass. If any fail, fix before proceeding.

---

### T-0: Go Live (10:00 AM)

| # | Action | Owner | How | Status |
|---|--------|-------|-----|--------|
| GO-1 | **Remove store password** | Human | Shopify Admin → Online Store → Preferences → uncheck "Restrict access" → Save | ☐ |
| GO-2 | Verify `dalify.in` loads publicly | Human | Open in incognito browser — homepage should load, no password page | ☐ |
| GO-3 | Verify HTTPS active | Human | Check for padlock icon in browser; no mixed-content warnings in console | ☐ |
| GO-4 | Verify `www.dalify.in` redirects correctly | Human | Should redirect to `dalify.in` (or vice versa, whichever is primary) | ☐ |
| GO-5 | Submit sitemap to Google Search Console | Human | Search Console → Sitemaps → submit `https://dalify.in/sitemap.xml` | ☐ |
| GO-6 | Verify `robots.txt` allows crawling | Human | Visit `https://dalify.in/robots.txt` — should NOT block `/collections/` or `/products/` | ☐ |

**Store is now live.** Start the clock for post-launch monitoring.

---

### T+5 min: Smoke Test (10:05 AM)

| # | Action | Owner | Expected | Status |
|---|--------|-------|----------|--------|
| SMOKE-1 | Browse homepage on mobile (iOS Safari) | Human | Page loads correctly, no broken images | ☐ |
| SMOKE-2 | Browse homepage on mobile (Android Chrome) | Human | Page loads correctly, matches iOS | ☐ |
| SMOKE-3 | Browse homepage on desktop Chrome | Human | Full layout renders, nav works | ☐ |
| SMOKE-4 | Open one product page from each collection | Human | 4 products load with images, prices, Add to Cart | ☐ |
| SMOKE-5 | Add an item to cart | Human | Cart updates, item appears | ☐ |
| SMOKE-6 | Navigate to checkout | Human | Checkout page loads, shipping address form appears | ☐ |

**Gate:** If any SMOKE item fails, investigate immediately. If homepage is broken, consider re-enabling password while fixing (see Rollback Plan).

---

### T+15 min: Live Payment Verification (10:15 AM)

| # | Action | Owner | Expected | Status |
|---|--------|-------|----------|--------|
| PAY-1 | Place a real test order (small value item, UPI) | Human | Payment completes, order confirmation page shows | ☐ |
| PAY-2 | Check Razorpay Dashboard → Payments | Human | Payment captured (not in test mode) | ☐ |
| PAY-3 | Check Shopify Admin → Orders | Human | Order #1001 (or similar) visible with correct amounts | ☐ |
| PAY-4 | Check email inbox for order confirmation | Human | Confirmation email received within 2 minutes | ☐ |
| PAY-5 | Place a second real test order (COD) | Human | Order placed, confirmation email received | ☐ |
| PAY-6 | Verify COD order in Shopify | Human | Order shows "Payment pending" status | ☐ |

**Important:** Refund the UPI test order after verification via Razorpay Dashboard → Payments → select payment → Refund.

**Gate:** If live payments fail, check Razorpay API keys immediately. If Razorpay is down, enable Shopify Payments as fallback.

---

### T+30 min: Analytics Verification (10:30 AM)

| # | Action | Owner | Expected | Status |
|---|--------|-------|----------|--------|
| ANLY-1 | Open GA4 → Realtime | Human | Active users > 0; page_view events firing | ☐ |
| ANLY-2 | Check GA4 e-commerce events | Human | `add_to_cart`, `begin_checkout`, `purchase` events visible from test orders | ☐ |
| ANLY-3 | Open Facebook Events Manager | Human | PageView, ViewContent, AddToCart, Purchase events received | ☐ |
| ANLY-4 | Verify Meta Pixel on a product page | Human | Pixel Helper shows ViewContent event with correct content_id | ☐ |

---

### T+45 min: Shipping Integration Check (10:45 AM)

| # | Action | Owner | Expected | Status |
|---|--------|-------|----------|--------|
| SHIP-1 | Check Shiprocket → Orders → New | Human | Test orders synced from Shopify | ☐ |
| SHIP-2 | Process one test order in Shiprocket | Human | Select courier, generate AWB | ☐ |
| SHIP-3 | Generate shipping label | Human | Label PDF downloads with correct sender/receiver | ☐ |
| SHIP-4 | Verify tracking number in Shopify | Human | Order shows fulfillment with tracking | ☐ |

---

### T+1 hour: Email Flow Verification (11:00 AM)

| # | Action | Owner | Expected | Status |
|---|--------|-------|----------|--------|
| EMAIL-1 | Sign up for newsletter on the storefront | Human | Welcome email received within 5 minutes | ☐ |
| EMAIL-2 | Check welcome email renders correctly | Human | Logo, copy, 10% discount code, CTA button all work | ☐ |
| EMAIL-3 | Apply the welcome discount code at checkout | Human | 10% discount applies correctly | ☐ |
| EMAIL-4 | Verify Klaviyo shows new subscriber | Human | Subscriber visible in Klaviyo → Profiles | ☐ |

---

### T+2 hours: Monitoring Dashboard (12:00 PM)

Open these dashboards and keep them visible throughout the day:

| Dashboard | URL / Location | What to Watch |
|-----------|---------------|---------------|
| Shopify Admin → Analytics | Shopify Admin → Analytics → Live View | Real-time visitors, sessions, top pages |
| Shopify Admin → Orders | Shopify Admin → Orders | New orders, payment statuses |
| GA4 Realtime | GA4 property → Reports → Realtime | Active users, pages, events |
| Razorpay Dashboard | Razorpay → Transactions | Payment success rate, failed payments |
| Shiprocket Orders | Shiprocket → Orders → New | Orders syncing, processing queue |
| Klaviyo Dashboard | Klaviyo → Overview | Email sends, open rates, flow activity |
| Meta Events Manager | Business Manager → Events Manager | Pixel events, diagnostics |

---

### T+4 hours: Afternoon Check (2:00 PM)

| # | Check | Expected | Action if Failed | Status |
|---|-------|----------|-----------------|--------|
| AFT-1 | Orders are coming in (if marketing is active) | ≥ 1 real order | Review traffic sources; check if site is accessible | ☐ |
| AFT-2 | No 5xx errors in Shopify Analytics | Zero server errors | Check Shopify status page; contact support if needed | ☐ |
| AFT-3 | Payment success rate > 90% | Razorpay shows healthy capture rate | Check for gateway errors; verify API keys | ☐ |
| AFT-4 | Shiprocket orders syncing | All new orders appear in Shiprocket | Verify Shiprocket app is connected; re-sync if needed | ☐ |
| AFT-5 | No customer complaints about checkout | Check email/WhatsApp for complaints | Investigate specific flow; see QA checklist for regression | ☐ |
| AFT-6 | Abandoned cart flow triggered (if any carts abandoned) | Check Klaviyo → Flows → Abandoned Cart | Verify flow is Live; check Shopify ↔ Klaviyo sync | ☐ |

---

### T+8 hours: End of Day Review (6:00 PM)

| # | Metric | Value | Notes |
|---|--------|-------|-------|
| EOD-1 | Total orders | ___ | |
| EOD-2 | Total revenue | INR ___ | |
| EOD-3 | Unique visitors (GA4) | ___ | |
| EOD-4 | Conversion rate | ___% | Orders / Sessions × 100 |
| EOD-5 | Average order value | INR ___ | Revenue / Orders |
| EOD-6 | Payment failure count | ___ | Razorpay → Failed Payments |
| EOD-7 | New email subscribers | ___ | Klaviyo → Profiles → Today |
| EOD-8 | Abandoned carts | ___ | Shopify → Abandoned Checkouts |
| EOD-9 | Customer support tickets | ___ | Email/WhatsApp messages received |
| EOD-10 | Critical bugs found | ___ | List below |

**Critical bugs found on Day 1:**

| # | Bug Description | Severity | Status | Fix ETA |
|---|----------------|----------|--------|---------|
| | | | | |

---

### T+24 hours: Day 2 Morning Check (Next Day 10:00 AM)

| # | Check | Action |
|---|-------|--------|
| D2-1 | Google indexing | Search `site:dalify.in` — pages should start appearing |
| D2-2 | Overnight orders processed | Fulfill pending orders via Shiprocket |
| D2-3 | Abandoned cart emails sent | Check Klaviyo → Flows → Abandoned Cart → Activity |
| D2-4 | No error spikes overnight | Check Shopify Analytics for 5xx errors |
| D2-5 | Customer feedback review | Check email/WhatsApp for any complaints or questions |
| D2-6 | GA4 acquisition report | Review traffic sources (direct, organic, social, referral) |
| D2-7 | Meta Pixel health | Events Manager → Diagnostics → any warnings? |

---

## Rollback Plan

If critical issues are found after go-live:

### Severity 1: Site is completely broken (blank page, 500 errors)

1. **Re-enable store password** — Shopify Admin → Online Store → Preferences → check "Restrict access" → set a password → Save
2. Investigate: check Shopify Status Page, theme code, recent changes
3. If theme is broken: revert to previous theme version (Shopify Admin → Online Store → Themes → current theme → Actions → Duplicate first, then revert)
4. Remove password once fixed; re-run SMOKE tests

### Severity 2: Payments not working

1. Check Razorpay Dashboard — is the gateway down?
2. Verify API keys: Shopify Admin → Settings → Payments → Razorpay configuration
3. **Fallback:** Enable Shopify Payments (if available in India) or PayU as temporary alternative
4. COD should still work as a payment method during payment gateway issues
5. Post a site banner: "We're experiencing payment issues. Please use COD or try again shortly."

### Severity 3: Shipping integration broken (Shiprocket not syncing)

1. Check Shiprocket app status in Shopify Admin → Apps
2. Try disconnecting and reconnecting the Shiprocket integration
3. **Fallback:** Manually export orders from Shopify and import into Shiprocket via CSV
4. Process urgent orders manually until sync is restored

### Severity 4: Email flows not triggering

1. Check Klaviyo integration status: Klaviyo → Integrations → Shopify
2. Verify flows are set to "Live" (not Draft or Manual)
3. **Fallback:** Shopify's built-in transactional emails (order confirmation, shipping confirmation) will still work even if Klaviyo is down
4. Welcome and abandoned cart emails can be delayed — not a launch blocker

### Decision Matrix

| Severity | Customer Impact | Action | Continue Launch? |
|----------|----------------|--------|------------------|
| 1 (Site down) | Cannot access store | Enable password, fix, re-launch | NO — pause until fixed |
| 2 (Payments broken) | Cannot purchase | Switch gateway or enable COD-only | CONDITIONAL — COD only |
| 3 (Shipping broken) | Orders delayed | Manual fulfillment | YES — manual workaround |
| 4 (Emails broken) | No welcome/abandoned cart | Rely on Shopify transactional | YES — non-blocking |

---

## Week 2 Backlog Template

After launch, capture all non-critical items, improvements, and learnings for Week 2 prioritization.

### Bug Backlog

| # | Bug | Severity | Found On | Workaround | Fix Priority |
|---|-----|----------|----------|------------|-------------|
| W2-B1 | | | | | |
| W2-B2 | | | | | |
| W2-B3 | | | | | |

### Improvement Backlog

| # | Improvement | Category | Expected Impact | Priority |
|---|------------|----------|-----------------|----------|
| W2-I1 | Optimize product images further | Performance | Faster LCP | High |
| W2-I2 | Add product reviews/ratings | Social proof | Higher conversion | High |
| W2-I3 | Set up Google Shopping feed | Marketing | New traffic channel | Medium |
| W2-I4 | Add product recommendations ("You may also like") | Conversion | Higher AOV | Medium |
| W2-I5 | Implement WhatsApp order notifications | Customer experience | Faster support | Medium |
| W2-I6 | Add size/weight filter on collection pages | UX | Easier browsing | Low |
| W2-I7 | Set up order-confirmation SMS via Shiprocket | Customer experience | Reduced WISMO | Low |
| W2-I8 | Add loyalty/referral program | Retention | Repeat purchases | Low |

### Content Backlog

| # | Content Piece | Owner | Priority |
|---|--------------|-------|----------|
| W2-C1 | Blog post: "Why Organic Spices Matter" | ContentCreator | High |
| W2-C2 | Recipe content for product pages | ContentCreator | Medium |
| W2-C3 | Customer testimonials page | Human (collect), ContentCreator (format) | Medium |
| W2-C4 | Video: product sourcing story | Human | Low |

### Analytics & Optimization

| # | Task | Priority |
|---|------|----------|
| W2-A1 | Set up GA4 conversion events (purchase, add_to_cart) | High |
| W2-A2 | Create Looker Studio dashboard for daily KPIs | Medium |
| W2-A3 | Set up Google Search Console and monitor indexing | High |
| W2-A4 | A/B test homepage hero banner (2 variants) | Medium |
| W2-A5 | Review abandoned cart email performance after 7 days | Medium |

---

## Quick Reference: Key Logins & URLs

Fill in before launch day:

| Service | URL | Login Email | Notes |
|---------|-----|-------------|-------|
| Shopify Admin | `admin.shopify.com/store/dalify` | | |
| Razorpay Dashboard | `dashboard.razorpay.com` | | Live mode |
| Shiprocket | `app.shiprocket.in` | | |
| Klaviyo | `app.klaviyo.com` | | |
| GA4 | `analytics.google.com` | | Property: Dalify |
| Meta Business Manager | `business.facebook.com` | | Pixel ID: ___ |
| Google Search Console | `search.google.com/search-console` | | Property: dalify.in |
| Domain Registrar | ___ | | DNS management |

---

## Emergency Contacts

| Role | Name | Contact | When to Reach |
|------|------|---------|--------------|
| Shopify Support | — | Shopify Admin → Help | Site/platform issues |
| Razorpay Support | — | Razorpay Dashboard → Support | Payment failures |
| Shiprocket Support | — | Shiprocket → Help | Shipping/label issues |
| Domain Registrar | — | ___ | DNS issues |
| Store Owner | ___ | ___ | All critical decisions |
