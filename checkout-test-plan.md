# Dalify — End-to-End Checkout Test Plan

Day 3 deliverable for the 1-week D2C build sprint.

---

## Overview

This test plan covers the complete customer journey from browsing to order confirmation. Execute all scenarios before going live (Day 6 QA pass). Use Shopify's **Bogus Gateway** or **test mode** for payment testing.

---

## Pre-Test Setup

Before running tests:

1. **Enable test payments:**
   - Go to **Settings → Payments**
   - For Razorpay: enable **Test mode** in your Razorpay dashboard and use test API keys in Shopify
   - Alternatively: activate **Shopify Bogus Gateway** (Settings → Payments → third-party providers → search "Bogus Gateway") for card testing
2. **Ensure COD is active:** Settings → Payments → Manual payment methods → Cash on Delivery
3. **Verify shipping rates:** Confirm both tiers are configured (Free ≥499, Flat 49 <499)
4. **Have test products:** At least 3 products published with prices spanning below and above INR 499
5. **Prepare test accounts:**
   - Guest email: use a personal email you can check
   - Registered account: create a customer account via the storefront

---

## Test Scenario Matrix

| # | Scenario | Payment | Account Type | Expected Shipping | Priority |
|---|----------|---------|--------------|-------------------|----------|
| 1 | Single item < INR 499 | UPI | Guest | INR 49 | Critical |
| 2 | Single item ≥ INR 499 | Card | Guest | Free | Critical |
| 3 | Multiple items, total ≥ INR 499 | COD | Guest | Free | Critical |
| 4 | Single item < INR 499 | Card | Registered | INR 49 | High |
| 5 | Multiple items, total < INR 499 | UPI | Registered | INR 49 | High |
| 6 | Cart with free shipping → remove item → below threshold | COD | Guest | INR 49 (should recalculate) | High |
| 7 | Apply discount code | Card | Guest | Verify discount reflected | Medium |
| 8 | Max-value COD order (≥ INR 5,000 if limit set) | COD | Guest | Verify COD blocked/warned | Medium |
| 9 | Order to a non-metro pincode | UPI | Guest | Free (≥499) | High |
| 10 | Order to a non-deliverable pincode | Any | Guest | Error / no shipping available | Medium |

---

## Test Flow 1: Browse → Add to Cart → Checkout → Payment → Confirmation

### Step-by-step for each scenario:

#### Phase 1: Browse & Add to Cart

| Step | Action | Expected Result | Pass? |
|------|--------|-----------------|-------|
| 1.1 | Open storefront homepage | Homepage loads, products visible | ☐ |
| 1.2 | Navigate to a collection page | Collection loads with product grid | ☐ |
| 1.3 | Click a product | Product detail page loads with: title, price, description, images, Add to Cart button | ☐ |
| 1.4 | Select quantity (if applicable) | Quantity selector works | ☐ |
| 1.5 | Click **Add to Cart** | Cart drawer/page opens showing item, quantity, price | ☐ |
| 1.6 | Verify cart subtotal | Subtotal matches product price × quantity | ☐ |
| 1.7 | Add another item (for multi-item scenarios) | Cart updates with both items and correct subtotal | ☐ |

#### Phase 2: Checkout — Shipping

| Step | Action | Expected Result | Pass? |
|------|--------|-----------------|-------|
| 2.1 | Click **Checkout** | Checkout page loads (Shopify checkout or custom) | ☐ |
| 2.2 | Enter contact email | Email field accepts valid email | ☐ |
| 2.3 | Enter shipping address (Indian address) | Address form accepts input; pincode auto-fills city/state | ☐ |
| 2.4 | Verify shipping rate displayed | Correct rate per scenario (Free or INR 49) | ☐ |
| 2.5 | Verify tax/GST line | Tax amount shown (or "included in price" note) | ☐ |
| 2.6 | Verify order total | Subtotal + Shipping + Tax = correct total | ☐ |

#### Phase 3: Payment

**UPI Payment (Razorpay):**

| Step | Action | Expected Result | Pass? |
|------|--------|-----------------|-------|
| 3a.1 | Select UPI as payment method | UPI option visible in Razorpay overlay | ☐ |
| 3a.2 | Enter UPI ID (test: `success@razorpay`) | UPI ID accepted | ☐ |
| 3a.3 | Complete payment | Payment processes → redirects to confirmation | ☐ |

**Card Payment (Razorpay or Bogus Gateway):**

| Step | Action | Expected Result | Pass? |
|------|--------|-----------------|-------|
| 3b.1 | Select Card as payment method | Card input fields appear | ☐ |
| 3b.2 | Enter test card details | Razorpay test: `4111 1111 1111 1111`, Exp: any future, CVV: any 3 digits. Bogus: Card number `1`, Name: `Bogus Gateway` | ☐ |
| 3b.3 | Submit payment | Payment processes → redirects to confirmation | ☐ |

**COD (Cash on Delivery):**

| Step | Action | Expected Result | Pass? |
|------|--------|-----------------|-------|
| 3c.1 | Select Cash on Delivery | COD option visible in payment methods | ☐ |
| 3c.2 | Complete order | Order placed immediately (no payment capture) | ☐ |
| 3c.3 | Verify COD tag on order | Shopify admin shows order as COD / payment pending | ☐ |

#### Phase 4: Order Confirmation

| Step | Action | Expected Result | Pass? |
|------|--------|-----------------|-------|
| 4.1 | Confirmation page loads | Thank you page with order number, summary | ☐ |
| 4.2 | Order number displayed | Format: `#1001` or similar | ☐ |
| 4.3 | Order summary correct | Items, quantities, prices, shipping, tax, total all correct | ☐ |
| 4.4 | Email confirmation received | Check test email inbox for order confirmation | ☐ |
| 4.5 | Email content correct | Email shows: order number, items, total, shipping address | ☐ |

---

## Test Flow 2: Guest Checkout vs Account Checkout

| Step | Action | Expected Result | Pass? |
|------|--------|-----------------|-------|
| G.1 | Checkout without logging in | Guest checkout flow works (email only, no account required) | ☐ |
| G.2 | Complete a guest order | Order confirmation received by email | ☐ |
| A.1 | Create an account on storefront | Account creation works; confirmation email received | ☐ |
| A.2 | Log in and add items to cart | Cart persists across login | ☐ |
| A.3 | Checkout while logged in | Shipping address auto-fills from account | ☐ |
| A.4 | Complete order while logged in | Order appears in **My Account → Order History** | ☐ |
| A.5 | Verify account order history | Past order visible with status and details | ☐ |

---

## Test Flow 3: Order Notification Emails

Verify all transactional emails are sent and formatted correctly.

| Email | Trigger | Check | Pass? |
|-------|---------|-------|-------|
| Order confirmation | Order placed | Received within 2 min; correct items/total | ☐ |
| Shipping confirmation | Order fulfilled in Shopify (or Shiprocket syncs tracking) | Received; contains tracking number and link | ☐ |
| Shipping update | Tracking status changes (in transit, out for delivery) | Received; status accurate | ☐ |
| Delivery confirmation | Order delivered | Received (if enabled) | ☐ |
| Account welcome | Customer creates account | Received; contains login link | ☐ |
| Password reset | Customer requests reset | Received; reset link works | ☐ |

**How to trigger shipping emails for testing:**
1. Place a test order
2. In Shopify Admin → Orders → select the order → **Mark as fulfilled**
3. Enter a test tracking number (e.g., `TEST123456`)
4. Check that the customer receives shipping confirmation email

---

## Test Flow 4: Shiprocket Order Sync & Label Generation

| Step | Action | Expected Result | Pass? |
|------|--------|-----------------|-------|
| S.1 | Place an order on the Shopify storefront | Order appears in Shopify Admin → Orders | ☐ |
| S.2 | Wait 5–10 minutes | Order syncs to Shiprocket → Orders → New | ☐ |
| S.3 | Process order in Shiprocket | Click Process → verify address, weight, dimensions | ☐ |
| S.4 | Select courier and create shipment | AWB number generated; tracking URL created | ☐ |
| S.5 | Generate shipping label | Label PDF downloads with correct sender/receiver info | ☐ |
| S.6 | Verify Shopify order updated | Order in Shopify shows fulfillment status + tracking number | ☐ |
| S.7 | Customer tracking link works | Clicking the tracking link shows shipment status | ☐ |

---

## Test Flow 5: Edge Cases & Error Handling

| # | Scenario | Expected Behavior | Pass? |
|---|----------|-------------------|-------|
| E.1 | Empty cart → click Checkout | Redirect to cart or show "cart is empty" message | ☐ |
| E.2 | Invalid email at checkout | Validation error shown | ☐ |
| E.3 | Invalid/incomplete address | Validation error; cannot proceed | ☐ |
| E.4 | Payment failure (use Razorpay test fail card) | Error message shown; order NOT created; user can retry | ☐ |
| E.5 | Browser back button during checkout | Returns to previous step without losing data | ☐ |
| E.6 | Refresh during checkout | Page reloads without duplicating order | ☐ |
| E.7 | Apply invalid discount code | Error: "Invalid discount code" | ☐ |
| E.8 | Product out of stock after adding to cart | Error at checkout: item unavailable | ☐ |
| E.9 | Network timeout during payment | Graceful error; no duplicate charge | ☐ |
| E.10 | Cart modification during checkout (another tab) | Checkout reflects updated cart on refresh | ☐ |

---

## Mobile-Specific Tests

All above tests should be repeated on mobile. Additionally:

| # | Check | Expected Result | Pass? |
|---|-------|-----------------|-------|
| M.1 | Product pages are responsive | Images, text, buttons fit mobile screen | ☐ |
| M.2 | Add to Cart works on mobile | Cart updates correctly | ☐ |
| M.3 | Checkout form is mobile-friendly | Inputs are tappable; keyboard type matches field (numeric for phone/pincode) | ☐ |
| M.4 | UPI payment on mobile | Deep-links to UPI app (GPay, PhonePe, Paytm) | ☐ |
| M.5 | Order confirmation page on mobile | Readable, scrollable, no overflow | ☐ |
| M.6 | Email opens correctly on mobile | Order confirmation email renders properly in Gmail/Outlook mobile | ☐ |

---

## Test Execution Log

Use this table to track test execution during the Day 6 QA pass.

| Date | Tester | Scenarios Passed | Scenarios Failed | Blockers | Notes |
|------|--------|-----------------|-----------------|----------|-------|
| | | /35 | /35 | | |

**Definition of Done:** All Critical and High priority scenarios pass. Medium priority failures are logged but do not block launch.

---

## Post-Test Actions

After completing the test pass:

1. **Switch Razorpay to production mode** — replace test API keys with live keys
2. **Remove Bogus Gateway** — disable in Settings → Payments
3. **Delete test orders** — Shopify Admin → Orders → select test orders → archive
4. **Verify production payment** — place one real small-value order (INR 1 product if possible) with a real card/UPI to confirm live payments work
5. **Document any known issues** — log in the QA checklist (Day 6 deliverable)
