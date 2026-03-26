# Dalify Klaviyo Email Templates

## 1. Welcome Email

### Subject Lines (A/B Test)
- **A:** Welcome to Dalify — your kitchen just got a whole lot more organic 🌿
- **B:** Your first order deserves 10% off — welcome to Dalify

---

### HTML Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Dalify</title>
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
            <td style="background-color:#f0ebe0; padding: 40px 40px 32px; text-align:center;">
              <p style="margin:0 0 8px; color:#7a6245; font-family: Arial, sans-serif; font-size:13px; letter-spacing:1px; text-transform:uppercase;">Welcome to the family</p>
              <h2 style="margin:0 0 20px; color:#2d5016; font-family: Georgia, serif; font-size:30px; font-weight:normal; line-height:1.3;">Good food starts<br>with honest ingredients.</h2>
              <p style="margin:0; color:#5a4a35; font-family: Arial, sans-serif; font-size:16px; line-height:1.7;">We're so glad you're here. At Dalify, every spice, grain, and pulse we carry is certified organic — sourced directly from farmers who grow the way your grandparents would recognise.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px 40px 32px;">
              <h3 style="margin:0 0 16px; color:#2d5016; font-family: Georgia, serif; font-size:20px; font-weight:normal;">Why Dalify?</h3>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #ede8df; font-family: Arial, sans-serif; font-size:15px; color:#3d3d3d; vertical-align:top;">
                    <strong style="color:#2d5016;">🌿&nbsp; 100% Certified Organic</strong><br>
                    <span style="color:#6b6b6b;">No synthetic pesticides, no hidden additives — ever.</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #ede8df; font-family: Arial, sans-serif; font-size:15px; color:#3d3d3d; vertical-align:top;">
                    <strong style="color:#2d5016;">🌾&nbsp; Straight from the Farm</strong><br>
                    <span style="color:#6b6b6b;">We work directly with growers across India — you know exactly where your food comes from.</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0; font-family: Arial, sans-serif; font-size:15px; color:#3d3d3d; vertical-align:top;">
                    <strong style="color:#2d5016;">📦&nbsp; Delivered Fresh</strong><br>
                    <span style="color:#6b6b6b;">Packed in small batches to preserve aroma, flavour, and nutrition.</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Discount Banner -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0ebe0; border-radius:6px; border-left:4px solid #2d5016;">
                <tr>
                  <td style="padding: 24px 28px;">
                    <p style="margin:0 0 6px; font-family: Arial, sans-serif; font-size:13px; color:#7a6245; letter-spacing:1px; text-transform:uppercase;">Welcome Gift</p>
                    <p style="margin:0 0 12px; font-family: Georgia, serif; font-size:22px; color:#2d5016;">10% off your first order</p>
                    <p style="margin:0 0 16px; font-family: Arial, sans-serif; font-size:14px; color:#5a4a35;">Use code <strong>WELCOME10</strong> at checkout. Valid for 14 days.</p>
                    <a href="{{ shop.url }}/collections/all" style="display:inline-block; background-color:#2d5016; color:#ffffff; font-family: Arial, sans-serif; font-size:15px; font-weight:bold; text-decoration:none; padding:14px 32px; border-radius:4px; letter-spacing:0.5px;">Shop Now</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Collections -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <p style="margin:0 0 20px; font-family: Georgia, serif; font-size:18px; color:#2d5016;">Start exploring</p>
              <table width="100%" cellpadding="0" cellspacing="8" border="0">
                <tr>
                  <td width="33%" style="text-align:center; padding:12px 8px; background-color:#faf7f2; border-radius:6px;">
                    <p style="margin:0 0 4px; font-size:24px;">🫙</p>
                    <a href="{{ shop.url }}/collections/spices" style="display:block; font-family: Arial, sans-serif; font-size:14px; color:#2d5016; text-decoration:none; font-weight:bold;">Spices</a>
                  </td>
                  <td width="33%" style="text-align:center; padding:12px 8px; background-color:#faf7f2; border-radius:6px;">
                    <p style="margin:0 0 4px; font-size:24px;">🌾</p>
                    <a href="{{ shop.url }}/collections/grains-pulses" style="display:block; font-family: Arial, sans-serif; font-size:14px; color:#2d5016; text-decoration:none; font-weight:bold;">Grains & Pulses</a>
                  </td>
                  <td width="33%" style="text-align:center; padding:12px 8px; background-color:#faf7f2; border-radius:6px;">
                    <p style="margin:0 0 4px; font-size:24px;">⚡</p>
                    <a href="{{ shop.url }}/collections/instant-mixes" style="display:block; font-family: Arial, sans-serif; font-size:14px; color:#2d5016; text-decoration:none; font-weight:bold;">Instant Mixes</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f5f1eb; padding: 28px 40px; text-align:center; border-top:1px solid #ede8df;">
              <p style="margin:0 0 8px; font-family: Arial, sans-serif; font-size:13px; color:#8a7a65;">Questions? We're here for you.</p>
              <a href="mailto:hello@dalify.in" style="font-family: Arial, sans-serif; font-size:13px; color:#2d5016; text-decoration:none;">hello@dalify.in</a>
              <p style="margin:16px 0 0; font-family: Arial, sans-serif; font-size:11px; color:#aaa;">
                You're receiving this because you signed up at Dalify.in<br>
                <a href="{{ unsubscribe_url }}" style="color:#aaa;">Unsubscribe</a> &nbsp;|&nbsp;
                <a href="{{ shop.url }}/pages/privacy-policy" style="color:#aaa;">Privacy Policy</a>
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

### Plain-Text Fallback

```
Welcome to Dalify!

We're so glad you're here.

At Dalify, every spice, grain, and pulse is certified organic — sourced directly from farmers across India who grow the way your grandparents would recognise.

WHY DALIFY?
- 100% Certified Organic: No synthetic pesticides, no hidden additives.
- Straight from the Farm: We work directly with growers — you know exactly where your food comes from.
- Delivered Fresh: Packed in small batches to preserve aroma, flavour, and nutrition.

YOUR WELCOME GIFT
Use code WELCOME10 for 10% off your first order.
Valid for 14 days from today.

Shop now: {{ shop.url }}/collections/all

Browse our collections:
- Spices: {{ shop.url }}/collections/spices
- Grains & Pulses: {{ shop.url }}/collections/grains-pulses
- Instant Mixes: {{ shop.url }}/collections/instant-mixes

Questions? Email us at hello@dalify.in

You received this email because you signed up at Dalify.in.
Unsubscribe: {{ unsubscribe_url }}
```

---

---

## 2. Abandoned Cart — Email 1 (1 hour after abandonment)

### Subject Lines (A/B Test)
- **A:** You left something behind — your cart misses you
- **B:** Still thinking it over? Your organic picks are waiting

---

### HTML Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your cart is waiting</title>
</head>
<body style="margin:0; padding:0; background-color:#faf7f2; font-family: Georgia, 'Times New Roman', serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#faf7f2;">
    <tr>
      <td align="center" style="padding: 40px 20px;">

        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:8px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color:#2d5016; padding: 28px 40px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-family: Georgia, serif; font-size:26px; font-weight:normal; letter-spacing:2px;">DALIFY</h1>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding: 40px 40px 24px; text-align:center;">
              <p style="margin:0 0 8px; color:#7a6245; font-family: Arial, sans-serif; font-size:13px; letter-spacing:1px; text-transform:uppercase;">Your cart</p>
              <h2 style="margin:0 0 16px; color:#2d5016; font-family: Georgia, serif; font-size:26px; font-weight:normal;">You left something good behind.</h2>
              <p style="margin:0; color:#5a4a35; font-family: Arial, sans-serif; font-size:15px; line-height:1.7;">Hey {{ first_name | default: "there" }}, we noticed you had some great items in your cart. Life gets busy — we get it. Your organic picks are still here whenever you're ready.</p>
            </td>
          </tr>

          <!-- Cart Items -->
          <tr>
            <td style="padding: 0 40px 32px;">
              <p style="margin:0 0 16px; font-family: Arial, sans-serif; font-size:13px; color:#7a6245; letter-spacing:1px; text-transform:uppercase;">In your cart</p>
              {% for line_item in checkout.line_items %}
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px; border:1px solid #ede8df; border-radius:6px; overflow:hidden;">
                <tr>
                  <td width="72" style="padding:12px;">
                    <img src="{{ line_item.image | img_url: '72x72', crop: 'center' }}" width="72" height="72" alt="{{ line_item.title }}" style="display:block; border-radius:4px;">
                  </td>
                  <td style="padding:12px 16px 12px 0; vertical-align:middle;">
                    <p style="margin:0 0 4px; font-family: Arial, sans-serif; font-size:15px; color:#2d2d2d; font-weight:bold;">{{ line_item.title }}</p>
                    <p style="margin:0; font-family: Arial, sans-serif; font-size:13px; color:#7a6245;">Qty: {{ line_item.quantity }} &nbsp;·&nbsp; ₹{{ line_item.price | money_without_currency }}</p>
                  </td>
                </tr>
              </table>
              {% endfor %}
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 0 40px 40px; text-align:center;">
              <a href="{{ checkout_url }}" style="display:inline-block; background-color:#2d5016; color:#ffffff; font-family: Arial, sans-serif; font-size:15px; font-weight:bold; text-decoration:none; padding:16px 40px; border-radius:4px; letter-spacing:0.5px;">Complete My Order</a>
              <p style="margin:20px 0 0; font-family: Arial, sans-serif; font-size:13px; color:#8a7a65;">Fresh, organic, and worth it — we promise.</p>
            </td>
          </tr>

          <!-- Trust note -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0ebe0; border-radius:6px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <p style="margin:0; font-family: Arial, sans-serif; font-size:14px; color:#5a4a35; line-height:1.7;">
                      <strong style="color:#2d5016;">Why organic matters:</strong> Conventional spices often contain pesticide residue that you can't see, smell, or taste. Our certified organic products are tested and guaranteed clean — because your family deserves nothing less.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f5f1eb; padding: 28px 40px; text-align:center; border-top:1px solid #ede8df;">
              <p style="margin:0 0 8px; font-family: Arial, sans-serif; font-size:13px; color:#8a7a65;">Need help choosing? We'd love to help.</p>
              <a href="mailto:hello@dalify.in" style="font-family: Arial, sans-serif; font-size:13px; color:#2d5016; text-decoration:none;">hello@dalify.in</a>
              <p style="margin:16px 0 0; font-family: Arial, sans-serif; font-size:11px; color:#aaa;">
                <a href="{{ unsubscribe_url }}" style="color:#aaa;">Unsubscribe</a> &nbsp;|&nbsp;
                <a href="{{ shop.url }}/pages/privacy-policy" style="color:#aaa;">Privacy Policy</a>
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

### Plain-Text Fallback

```
Hey {{ first_name | default: "there" }},

You left something in your Dalify cart — and we wanted to make sure you didn't forget.

YOUR CART:
{% for line_item in checkout.line_items %}
- {{ line_item.title }} (Qty: {{ line_item.quantity }}) — ₹{{ line_item.price | money_without_currency }}
{% endfor %}

Complete your order here: {{ checkout_url }}

WHY ORGANIC MATTERS
Conventional spices often contain pesticide residue that you can't see, smell, or taste. Our certified organic products are tested and guaranteed clean — because your family deserves nothing less.

Questions? Email us: hello@dalify.in

Unsubscribe: {{ unsubscribe_url }}
```

---

---

## 3. Abandoned Cart — Email 2 (24 hours after abandonment)

### Subject Lines (A/B Test)
- **A:** Last chance — free shipping on your forgotten cart
- **B:** We'll sweeten the deal: your cart + a little extra

---

### HTML Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>A little extra for you</title>
</head>
<body style="margin:0; padding:0; background-color:#faf7f2; font-family: Georgia, 'Times New Roman', serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#faf7f2;">
    <tr>
      <td align="center" style="padding: 40px 20px;">

        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:8px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color:#2d5016; padding: 28px 40px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-family: Georgia, serif; font-size:26px; font-weight:normal; letter-spacing:2px;">DALIFY</h1>
            </td>
          </tr>

          <!-- Urgency Hero -->
          <tr>
            <td style="background-color:#f0ebe0; padding: 36px 40px 28px; text-align:center;">
              <p style="margin:0 0 8px; color:#7a6245; font-family: Arial, sans-serif; font-size:13px; letter-spacing:1px; text-transform:uppercase;">Still thinking?</p>
              <h2 style="margin:0 0 16px; color:#2d5016; font-family: Georgia, serif; font-size:28px; font-weight:normal; line-height:1.3;">We're making it even easier<br>to say yes.</h2>
              <p style="margin:0; color:#5a4a35; font-family: Arial, sans-serif; font-size:15px; line-height:1.7;">Your cart is still saved, {{ first_name | default: "friend" }}. And because we really believe in what's in it, we're throwing in <strong>free shipping</strong> on your order today.</p>
            </td>
          </tr>

          <!-- Offer Banner -->
          <tr>
            <td style="padding: 32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#2d5016; border-radius:6px;">
                <tr>
                  <td style="padding: 28px 32px; text-align:center;">
                    <p style="margin:0 0 6px; font-family: Arial, sans-serif; font-size:13px; color:#c8e6a0; letter-spacing:1px; text-transform:uppercase;">For you, today only</p>
                    <p style="margin:0 0 12px; font-family: Georgia, serif; font-size:26px; color:#ffffff; font-weight:normal;">Free Shipping</p>
                    <p style="margin:0 0 20px; font-family: Arial, sans-serif; font-size:14px; color:#c8e6a0;">Use code <strong>FREESHIP</strong> at checkout &nbsp;·&nbsp; Expires in 24 hours</p>
                    <a href="{{ checkout_url }}" style="display:inline-block; background-color:#ffffff; color:#2d5016; font-family: Arial, sans-serif; font-size:15px; font-weight:bold; text-decoration:none; padding:14px 36px; border-radius:4px; letter-spacing:0.5px;">Claim My Free Shipping</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Cart Items -->
          <tr>
            <td style="padding: 0 40px 32px;">
              <p style="margin:0 0 16px; font-family: Arial, sans-serif; font-size:13px; color:#7a6245; letter-spacing:1px; text-transform:uppercase;">Still in your cart</p>
              {% for line_item in checkout.line_items %}
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px; border:1px solid #ede8df; border-radius:6px;">
                <tr>
                  <td width="64" style="padding:10px;">
                    <img src="{{ line_item.image | img_url: '64x64', crop: 'center' }}" width="64" height="64" alt="{{ line_item.title }}" style="display:block; border-radius:4px;">
                  </td>
                  <td style="padding:10px 14px 10px 0; vertical-align:middle;">
                    <p style="margin:0 0 4px; font-family: Arial, sans-serif; font-size:14px; color:#2d2d2d; font-weight:bold;">{{ line_item.title }}</p>
                    <p style="margin:0; font-family: Arial, sans-serif; font-size:13px; color:#7a6245;">Qty: {{ line_item.quantity }}</p>
                  </td>
                </tr>
              </table>
              {% endfor %}
            </td>
          </tr>

          <!-- Social proof / reassurance -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <p style="margin:0 0 16px; font-family: Georgia, serif; font-size:16px; color:#2d5016;">What our customers say</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #ede8df; border-radius:6px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <p style="margin:0 0 8px; font-family: Arial, sans-serif; font-size:14px; color:#3d3d3d; line-height:1.7; font-style:italic;">"The turmeric from Dalify is unlike anything I've bought from a supermarket. You can actually smell the difference — and I feel good knowing exactly where it came from."</p>
                    <p style="margin:0; font-family: Arial, sans-serif; font-size:13px; color:#7a6245; font-weight:bold;">— Meera R., Bangalore</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f5f1eb; padding: 28px 40px; text-align:center; border-top:1px solid #ede8df;">
              <p style="margin:0 0 8px; font-family: Arial, sans-serif; font-size:13px; color:#8a7a65;">We're always here if you have questions.</p>
              <a href="mailto:hello@dalify.in" style="font-family: Arial, sans-serif; font-size:13px; color:#2d5016; text-decoration:none;">hello@dalify.in</a>
              <p style="margin:16px 0 0; font-family: Arial, sans-serif; font-size:11px; color:#aaa;">
                This is our final reminder about your cart — promise.<br>
                <a href="{{ unsubscribe_url }}" style="color:#aaa;">Unsubscribe</a> &nbsp;|&nbsp;
                <a href="{{ shop.url }}/pages/privacy-policy" style="color:#aaa;">Privacy Policy</a>
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

### Plain-Text Fallback

```
Hey {{ first_name | default: "friend" }},

Your Dalify cart is still waiting — and we want to make it a little easier to complete your order.

TODAY ONLY: FREE SHIPPING on your cart.
Use code FREESHIP at checkout. Expires in 24 hours.

Complete your order: {{ checkout_url }}

YOUR CART:
{% for line_item in checkout.line_items %}
- {{ line_item.title }} (Qty: {{ line_item.quantity }})
{% endfor %}

WHAT OUR CUSTOMERS SAY:
"The turmeric from Dalify is unlike anything I've bought from a supermarket. You can actually smell the difference — and I feel good knowing exactly where it came from."
— Meera R., Bangalore

This is our final reminder about your cart — we won't email again about this one.

Questions? hello@dalify.in
Unsubscribe: {{ unsubscribe_url }}
```

---

## Klaviyo Setup Notes

### Flow Configuration

**Welcome Email**
- Trigger: List Subscribe (Signup form / checkout email capture)
- Send delay: Immediate (0 min)
- Filter: None (send to all new subscribers)

**Abandoned Cart Flow**
- Trigger: Checkout Started (Shopify integration)
- Email 1: 1 hour after trigger
- Email 2: 24 hours after trigger
- Exit condition: Placed Order (stop sequence if purchase made)
- Filter: Email not suppressed / unsubscribed

### Liquid Variables Used
- `{{ first_name | default: "there" }}` — personalisation with fallback
- `{{ checkout.line_items }}` — cart item loop
- `{{ checkout_url }}` — Klaviyo's checkout recovery URL
- `{{ shop.url }}` — store base URL
- `{{ unsubscribe_url }}` — Klaviyo unsubscribe link
- `{{ line_item.image | img_url: '72x72', crop: 'center' }}` — product image

### Discount Codes
- **WELCOME10** — 10% off, one-time use per customer, 14-day expiry
- **FREESHIP** — Free shipping, one-time use per customer, 24-hour expiry

Create both codes in Shopify > Discounts before activating flows.
