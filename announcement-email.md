# Dalify — Launch Announcement Email

Day 7 deliverable for the 1-week D2C build sprint.
Send via Klaviyo as a one-time campaign to any pre-launch list or early subscribers.

---

## Subject Line Options (A/B Test)

| Variant | Subject Line | Preview Text |
|---------|-------------|-------------|
| **A** | We're live — organic goodness, delivered to your door | Dalify is here. Farm-fresh organic spices, grains, and pulses now shipping across India. |
| **B** | Dalify is open! Get 15% off your first order | Your kitchen deserves better. Pure organic spices and grains — order now. |
| **C** | From our farms to your kitchen — Dalify is now live | 100+ organic products. Free shipping over INR 499. Shop today. |

**Recommendation:** Test variant B (incentive-led) vs C (value-led) with a 50/50 split.

---

## Email Body — Variant B (Incentive-Led)

### HTML Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dalify is Live</title>
</head>
<body style="margin:0; padding:0; background-color:#faf7f2; font-family: Georgia, 'Times New Roman', serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#faf7f2;">
    <tr>
      <td align="center" style="padding: 40px 20px;">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:8px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color:#2d5016; padding: 32px 40px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-family: Georgia, serif; font-size:28px; font-weight:normal; letter-spacing:2px;">DALIFY</h1>
              <p style="margin:8px 0 0; color:#c8e6a0; font-size:13px; letter-spacing:1px; font-family: Arial, sans-serif;">ORGANIC FROM FARM TO YOUR TABLE</p>
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td style="background-color:#f0ebe0; padding: 48px 40px 40px; text-align:center;">
              <p style="margin:0 0 8px; color:#7a6245; font-family: Arial, sans-serif; font-size:13px; letter-spacing:2px; text-transform:uppercase;">We're officially open</p>
              <h2 style="margin:0 0 20px; color:#2d5016; font-family: Georgia, serif; font-size:32px; font-weight:normal; line-height:1.3;">Your kitchen deserves<br>honest ingredients.</h2>
              <p style="margin:0 0 28px; color:#5a4a35; font-family: Arial, sans-serif; font-size:16px; line-height:1.7;">Dalify is now live — bringing certified organic spices, grains, pulses, and instant mixes straight from Indian farms to your doorstep.</p>
              <a href="https://dalify.in" style="display:inline-block; background-color:#2d5016; color:#ffffff; font-family: Arial, sans-serif; font-size:16px; font-weight:bold; text-decoration:none; padding:16px 40px; border-radius:6px; letter-spacing:0.5px;">Shop Now</a>
            </td>
          </tr>

          <!-- First Order Incentive -->
          <tr>
            <td style="padding: 40px; text-align:center; border-bottom: 1px solid #e8e0d4;">
              <p style="margin:0 0 8px; color:#7a6245; font-family: Arial, sans-serif; font-size:12px; letter-spacing:2px; text-transform:uppercase;">Launch offer</p>
              <h3 style="margin:0 0 12px; color:#2d5016; font-family: Georgia, serif; font-size:28px; font-weight:normal;">15% off your first order</h3>
              <p style="margin:0 0 20px; color:#5a4a35; font-family: Arial, sans-serif; font-size:15px; line-height:1.6;">Use code <strong style="color:#2d5016; font-family: monospace; font-size:18px; letter-spacing:2px;">LAUNCH15</strong> at checkout.</p>
              <p style="margin:0; color:#9a8a75; font-family: Arial, sans-serif; font-size:13px;">Valid for 7 days. Minimum order INR 299.</p>
            </td>
          </tr>

          <!-- Featured Collections -->
          <tr>
            <td style="padding: 40px;">
              <h3 style="margin:0 0 24px; color:#2d5016; font-family: Georgia, serif; font-size:22px; font-weight:normal; text-align:center;">Explore Our Collections</h3>

              <!-- Collection Grid (2x2) -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="48%" style="padding: 0 2% 16px 0; vertical-align:top;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8f5ef; border-radius:6px; overflow:hidden;">
                      <tr>
                        <td style="padding: 24px; text-align:center;">
                          <p style="margin:0 0 4px; font-size:28px;">🌶️</p>
                          <h4 style="margin:0 0 8px; color:#2d5016; font-family: Georgia, serif; font-size:16px; font-weight:normal;">Spices</h4>
                          <p style="margin:0 0 12px; color:#7a6245; font-family: Arial, sans-serif; font-size:13px;">Whole, ground &amp; blended</p>
                          <a href="https://dalify.in/collections/spices" style="color:#2d5016; font-family: Arial, sans-serif; font-size:13px; font-weight:bold; text-decoration:none;">Shop Spices &rarr;</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="48%" style="padding: 0 0 16px 2%; vertical-align:top;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8f5ef; border-radius:6px; overflow:hidden;">
                      <tr>
                        <td style="padding: 24px; text-align:center;">
                          <p style="margin:0 0 4px; font-size:28px;">🌾</p>
                          <h4 style="margin:0 0 8px; color:#2d5016; font-family: Georgia, serif; font-size:16px; font-weight:normal;">Grains</h4>
                          <p style="margin:0 0 12px; color:#7a6245; font-family: Arial, sans-serif; font-size:13px;">Rice, millets &amp; flour</p>
                          <a href="https://dalify.in/collections/grains" style="color:#2d5016; font-family: Arial, sans-serif; font-size:13px; font-weight:bold; text-decoration:none;">Shop Grains &rarr;</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td width="48%" style="padding: 0 2% 0 0; vertical-align:top;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8f5ef; border-radius:6px; overflow:hidden;">
                      <tr>
                        <td style="padding: 24px; text-align:center;">
                          <p style="margin:0 0 4px; font-size:28px;">🫘</p>
                          <h4 style="margin:0 0 8px; color:#2d5016; font-family: Georgia, serif; font-size:16px; font-weight:normal;">Pulses</h4>
                          <p style="margin:0 0 12px; color:#7a6245; font-family: Arial, sans-serif; font-size:13px;">Dals, lentils &amp; legumes</p>
                          <a href="https://dalify.in/collections/pulses" style="color:#2d5016; font-family: Arial, sans-serif; font-size:13px; font-weight:bold; text-decoration:none;">Shop Pulses &rarr;</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="48%" style="padding: 0 0 0 2%; vertical-align:top;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8f5ef; border-radius:6px; overflow:hidden;">
                      <tr>
                        <td style="padding: 24px; text-align:center;">
                          <p style="margin:0 0 4px; font-size:28px;">🍳</p>
                          <h4 style="margin:0 0 8px; color:#2d5016; font-family: Georgia, serif; font-size:16px; font-weight:normal;">Instant Mixes</h4>
                          <p style="margin:0 0 12px; color:#7a6245; font-family: Arial, sans-serif; font-size:13px;">Ready-to-cook blends</p>
                          <a href="https://dalify.in/collections/instant-mixes" style="color:#2d5016; font-family: Arial, sans-serif; font-size:13px; font-weight:bold; text-decoration:none;">Shop Mixes &rarr;</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Why Dalify -->
          <tr>
            <td style="padding: 0 40px 40px; text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="33%" style="padding: 16px 8px; text-align:center; vertical-align:top;">
                    <p style="margin:0 0 8px; color:#2d5016; font-family: Arial, sans-serif; font-size:14px; font-weight:bold;">100% Organic</p>
                    <p style="margin:0; color:#7a6245; font-family: Arial, sans-serif; font-size:12px; line-height:1.5;">Certified organic, no chemicals, no shortcuts</p>
                  </td>
                  <td width="33%" style="padding: 16px 8px; text-align:center; vertical-align:top;">
                    <p style="margin:0 0 8px; color:#2d5016; font-family: Arial, sans-serif; font-size:14px; font-weight:bold;">Farm Direct</p>
                    <p style="margin:0; color:#7a6245; font-family: Arial, sans-serif; font-size:12px; line-height:1.5;">Sourced directly from Indian organic farms</p>
                  </td>
                  <td width="33%" style="padding: 16px 8px; text-align:center; vertical-align:top;">
                    <p style="margin:0 0 8px; color:#2d5016; font-family: Arial, sans-serif; font-size:14px; font-weight:bold;">Free Shipping</p>
                    <p style="margin:0; color:#7a6245; font-family: Arial, sans-serif; font-size:12px; line-height:1.5;">On all orders over INR 499</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="background-color:#2d5016; padding: 32px 40px; text-align:center;">
              <p style="margin:0 0 16px; color:#c8e6a0; font-family: Arial, sans-serif; font-size:15px;">100+ organic products. Farm-fresh quality. Delivered pan-India.</p>
              <a href="https://dalify.in" style="display:inline-block; background-color:#ffffff; color:#2d5016; font-family: Arial, sans-serif; font-size:16px; font-weight:bold; text-decoration:none; padding:14px 36px; border-radius:6px;">Visit Dalify</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; text-align:center; background-color:#f8f5ef;">
              <p style="margin:0 0 8px; color:#9a8a75; font-family: Arial, sans-serif; font-size:12px;">Dalify — Organic from Farm to Your Table</p>
              <p style="margin:0 0 8px; color:#9a8a75; font-family: Arial, sans-serif; font-size:12px;">
                <a href="https://dalify.in/pages/about" style="color:#7a6245; text-decoration:none;">About</a> &nbsp;|&nbsp;
                <a href="https://dalify.in/pages/faq" style="color:#7a6245; text-decoration:none;">FAQ</a> &nbsp;|&nbsp;
                <a href="https://dalify.in/pages/contact" style="color:#7a6245; text-decoration:none;">Contact</a>
              </p>
              <p style="margin:0; color:#b8a894; font-family: Arial, sans-serif; font-size:11px;">
                <a href="{{ unsubscribe_url }}" style="color:#b8a894; text-decoration:underline;">Unsubscribe</a> &nbsp;|&nbsp;
                <a href="{{ manage_preferences_url }}" style="color:#b8a894; text-decoration:underline;">Manage preferences</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
```

---

## Plain-Text Version

```
DALIFY — We're Live!

Your kitchen deserves honest ingredients.

Dalify is now open — bringing certified organic spices, grains, pulses, and instant mixes straight from Indian farms to your doorstep.

LAUNCH OFFER: 15% off your first order
Use code LAUNCH15 at checkout.
Valid for 7 days. Minimum order INR 299.

Shop now: https://dalify.in

---

EXPLORE OUR COLLECTIONS

Spices — Whole, ground & blended
https://dalify.in/collections/spices

Grains — Rice, millets & flour
https://dalify.in/collections/grains

Pulses — Dals, lentils & legumes
https://dalify.in/collections/pulses

Instant Mixes — Ready-to-cook blends
https://dalify.in/collections/instant-mixes

---

Why Dalify?
- 100% Organic: Certified, no chemicals
- Farm Direct: Sourced from Indian organic farms
- Free Shipping: On orders over INR 499

Visit us: https://dalify.in

---

Dalify — Organic from Farm to Your Table
Unsubscribe: {{ unsubscribe_url }}
```

---

## Klaviyo Campaign Setup Notes

1. **Audience:** Send to all profiles in the pre-launch list or newsletter subscribers
2. **Send time:** Schedule for launch day, 30 minutes after password is removed (allow smoke tests to pass first)
3. **A/B test:** Split subject lines B vs C with 20% test group, 2-hour winner wait, send winner to remaining 80%
4. **Discount code:** Create `LAUNCH15` in Shopify Admin → Discounts:
   - Type: Percentage — 15%
   - Minimum purchase: INR 299
   - Usage limit: 1 per customer
   - Active dates: Launch day → 7 days later
5. **UTM parameters:** Add to all links:
   - `utm_source=klaviyo`
   - `utm_medium=email`
   - `utm_campaign=launch_announcement`
6. **Reply-to:** Set to a monitored email address (not noreply)
