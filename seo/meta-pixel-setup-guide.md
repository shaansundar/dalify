# Meta Pixel Setup Guide for Dalify Shopify Store

## Overview

This guide covers installing Meta Pixel (formerly Facebook Pixel) on Dalify's Shopify store to track conversions and enable Meta ad retargeting. Estimated setup time: 30–45 minutes.

---

## Part 1: Create the Meta Pixel

### Step 1.1: Access Meta Events Manager

1. Go to [business.facebook.com](https://business.facebook.com) and log in.
2. In the top navigation, click the grid icon → **Events Manager**.
3. Click **+ Connect Data Sources** (green button).
4. Select **Web** → Click **Connect**.
5. Select **Meta Pixel** → Click **Connect**.

### Step 1.2: Create the Pixel

1. Enter pixel name: `Dalify - Shopify`
2. Enter your Shopify store URL (e.g., `dalify.in` or your myshopify URL).
3. Click **Create Pixel**.
4. You will see your **Pixel ID** (a 15–16 digit number) — copy and save this.

---

## Part 2: Install Meta Pixel on Shopify (Native Integration)

Shopify has a native Meta integration that handles Pixel + Conversions API without manual code.

### Step 2.1: Install the Facebook & Instagram Channel

1. In Shopify Admin → **Apps** → **App and sales channel settings**.
2. Search for **Facebook & Instagram** (by Meta).
3. Click **Add channel** → **Add sales channel**.
4. Click **Start setup** and connect your Facebook Business Account.

### Step 2.2: Connect Your Pixel

1. In the Facebook & Instagram channel settings, go to **Data sharing**.
2. Select your **Meta Pixel** from the dropdown (the one created in Part 1).
3. Set data sharing level to **Maximum** — this enables the Conversions API alongside browser pixel.
4. Click **Save**.

### Step 2.3: Enable Conversions API (Server-Side — Recommended)

The Conversions API sends events server-side, bypassing ad blockers and iOS 14+ restrictions.

1. In the Facebook & Instagram channel → **Data sharing** → toggle **Conversions API** ON.
2. Shopify handles this natively — no additional code needed.
3. This creates **event deduplication** so purchase events aren't double-counted.

---

## Part 3: Conversion Events to Track

These are the standard Meta events Shopify's integration fires automatically:

| Meta Standard Event | Trigger | Purpose |
|--------------------|---------|---------|
| `ViewContent` | Product page viewed | Awareness retargeting |
| `AddToCart` | Item added to cart | Cart abandonment audiences |
| `InitiateCheckout` | Checkout started | High-intent retargeting |
| `AddPaymentInfo` | Payment details entered | Near-purchase audience |
| `Purchase` | Order confirmed | Conversion tracking, ROAS |
| `Search` | Site search used | Interest signals |
| `PageView` | Any page loaded | General retargeting |

### Marking Purchase as a Conversion in Ads Manager

1. Meta Business Manager → **Events Manager** → select your pixel.
2. Click **Aggregated Event Measurement** (required post-iOS 14).
3. Click **Configure Web Events**.
4. Add these events in priority order:
   1. `Purchase` (highest priority)
   2. `InitiateCheckout`
   3. `AddToCart`
   4. `ViewContent`
5. Click **Submit**.

---

## Part 4: Verify with Meta Pixel Helper

### Step 4.1: Install the Chrome Extension

1. In Chrome, go to the [Meta Pixel Helper extension](https://chrome.google.com/webstore/detail/meta-pixel-helper) and install it.
2. The extension icon appears in your Chrome toolbar.

### Step 4.2: Test Your Pixel

1. Visit your Shopify storefront.
2. Click the Pixel Helper icon — you should see:
   - ✅ `PageView` event fired
   - Your Pixel ID listed
3. Navigate to a product page:
   - ✅ `ViewContent` event should fire
4. Add a product to cart:
   - ✅ `AddToCart` event should fire
5. Start checkout:
   - ✅ `InitiateCheckout` event should fire

### Step 4.3: Test Purchase Event

1. Use Shopify's Bogus Gateway (Admin → Settings → Payments → Bogus Gateway).
2. Complete a test purchase using card number `1` and any expiry/CVV.
3. On the order confirmation page, Pixel Helper should show:
   - ✅ `Purchase` event with `value` and `currency` parameters

### Step 4.4: Verify in Events Manager

1. Meta Events Manager → select your pixel.
2. Click **Test Events** tab.
3. Enter your store URL and click **Open Website**.
4. Browse and add to cart — events appear in real-time in the right panel.
5. Check that event parameters (content_ids, value, currency) are populated correctly.

---

## Part 5: Custom Audiences for Dalify

Create these retargeting audiences in Meta Ads Manager → **Audiences** → **Create Audience** → **Custom Audience** → **Website**:

| Audience Name | Rule | Lookback Window |
|--------------|------|----------------|
| All Website Visitors | All URL traffic | 30 days |
| Product Viewers | `ViewContent` event | 14 days |
| Cart Abandoners | `AddToCart` AND NOT `Purchase` | 7 days |
| Checkout Abandoners | `InitiateCheckout` AND NOT `Purchase` | 7 days |
| Purchasers | `Purchase` event | 180 days |
| High-Value Purchasers | `Purchase` with value > ₹1000 | 90 days |

### Lookalike Audiences (Create After 100+ Purchasers)

1. Ads Manager → **Audiences** → **Create** → **Lookalike Audience**.
2. Source: `Purchasers (180 days)`.
3. Location: India.
4. Audience size: 1% (most similar).
5. Name: `Dalify - Purchaser Lookalike 1% India`.

---

## Part 6: iOS 14+ and Privacy Compliance

### Verify Domain in Meta Business Manager

1. Meta Business Manager → **Business Settings** → **Brand Safety** → **Domains**.
2. Click **Add** → enter your domain (e.g., `dalify.in`).
3. Choose **DNS verification** or **HTML file upload** method.
4. Follow verification steps and click **Verify**.

### Aggregated Event Measurement

Post-iOS 14, Meta limits tracking to 8 conversion events per domain. Prioritize:
1. Purchase
2. InitiateCheckout
3. AddToCart
4. ViewContent

This is configured in Events Manager → **Aggregated Event Measurement** (see Part 3).

---

## Part 7: GDPR / Indian Privacy Compliance Note

- India's Digital Personal Data Protection (DPDP) Act 2023 is in effect.
- Recommend adding a **cookie consent banner** before the Pixel fires.
- Shopify apps like **Pandectes GDPR Compliance** or **CookieYes** can gate the Pixel based on consent.
- For now, ensure your Privacy Policy mentions Meta Pixel data collection.

---

## Troubleshooting

| Issue | Likely Cause | Fix |
|-------|-------------|-----|
| No `Purchase` event | Test with Bogus Gateway first | Ensure Bogus Gateway is active for tests |
| Duplicate events | Browser pixel + Conversions API both firing | Enable deduplication via `event_id` — Shopify handles this automatically |
| Wrong currency | Pixel fires with USD | Confirm Shopify store currency is set to INR |
| Pixel Helper shows no pixel | Pixel not installed | Re-check Facebook & Instagram channel data sharing settings |

---

*Last updated: 2026-03-25 | For Dalify Shopify (Dawn theme)*
