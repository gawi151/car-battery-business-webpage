# Homepage Modernization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modernize the homepage, privacy policy, and 404 page around the approved diagnosis-first battery-service direction, with original assets, shared CSS, preserved analytics consent behavior, and verified performance/accessibility.

**Architecture:** Keep the site static and replace Tailwind plus page-specific style blocks with one hand-authored shared stylesheet. Rebuild the homepage sections with semantic class names and final copy from the design spec, then apply the same visual system to `404.html` and `privacy-policy.html`. Move analytics consent behavior into one shared script so privacy controls work consistently across pages without loading Umami before consent.

**Tech Stack:** Static HTML, hand-authored CSS in `assets/site.css`, vanilla JavaScript in `assets/analytics-consent.js`, generated/original WebP assets processed with Python Pillow, local verification with Python HTTP server plus Lighthouse/axe where available.

---

## File Structure

- Create: `assets/site.css`
  - Single CSS source of truth. Contains design tokens, layout primitives, homepage sections, shared footer, consent banner, privacy page, and 404 page styling.
- Create: `assets/analytics-consent.js`
  - Shared vanilla JS extracted from the current homepage inline script. Loads Umami only after accepted consent, supports reject/settings actions on all pages.
- Create: `assets/hero-battery-diagnosis-640.webp`
- Create: `assets/hero-battery-diagnosis-960.webp`
- Create: `assets/hero-battery-diagnosis-1280.webp`
  - Original generated hero visual. Used above the fold with explicit `width`, `height`, `srcset`, `sizes`, and `fetchpriority="high"`.
- Create: `assets/contact-office-service-800.webp`
- Create: `assets/contact-office-service-1200.webp`
  - Original generated contact/office visual. Used below the fold with lazy loading.
- Modify: `index.html`
  - Remove Google Fonts, Tailwind stylesheet, inline CSS, old stock/attribution image, Flaticon icons, and old utility-heavy section markup.
  - Add shared CSS/JS, updated metadata/structured data, final homepage copy, retained contact tracking attributes, and footer without attribution links.
- Modify: `404.html`
  - Replace one-off inline styling with shared site shell, modern 404 content, shared footer, and consent banner/script.
- Modify: `privacy-policy.html`
  - Replace Tailwind styling with shared site shell. Preserve legal content except for required updates after removing Google Fonts and adding shared consent behavior.
- Modify: `llms.txt`
  - Update business summary and service wording to match the diagnosis-first positioning.
- Modify: `llms-full.txt`
  - Update detailed service summary, office wording, and contact model to avoid implying a workshop or instant emergency service.
- Modify: `sitemap.xml`
  - Update homepage `lastmod` to `2026-07-05`.
- Delete after reference scan passes:
  - `assets/input.css`
  - `assets/output.css`
  - `assets/hero.webp`
  - `assets/contact-directions-illustration.webp`
  - `assets/ic_analyze.svg`
  - `assets/ic_check.svg`
  - `assets/ic_recycle.svg`
  - `assets/ic_shopping.svg`
  - `assets/ic_tools.svg`

## Implementation Rules

- Keep the final copy truthful for a single-person business.
- Do not use these terms in public copy: `warsztat`, `punkt wymiany`, `pogotowie`, `24/7`.
- Do not promise guaranteed response times, instant help, or walk-in service.
- Do not encourage customers to drive to the office before calling.
- Keep the phone number visible in the hero and contact areas.
- Make the secondary hero CTA scroll to `#jak-dzialamy`.
- Do not repeat the `Jak działamy` steps in the contact section.
- Remove footer attribution links only after the Freepik/Flaticon references are gone from HTML, CSS, metadata, structured data, and asset references.
- Use system fonts only. Update privacy wording so it no longer claims Google Fonts are loaded.
- Keep existing real brand/product assets unless a reference scan shows a rights or attribution problem.

---

### Task 1: Baseline Checks

**Files:**
- Read: `index.html`
- Read: `404.html`
- Read: `privacy-policy.html`
- Read: `llms.txt`
- Read: `llms-full.txt`
- Read: `assets/`

- [ ] **Step 1: Confirm worktree state**

Run:

```powershell
git status --short
```

Expected: no output.

- [ ] **Step 2: Record current asset and CSS references**

Run:

```powershell
rg -n "output\.css|input\.css|fonts\.googleapis|Freepik|Flaticon|ic_|hero\.webp|contact-directions-illustration|warsztat|punkt wymiany|pogotowie|24/7" index.html 404.html privacy-policy.html llms.txt llms-full.txt assets
```

Expected: matches for the current Tailwind, Google Fonts, Freepik/Flaticon, old asset references, and old positioning files. Save the output in the implementation notes for comparison.

- [ ] **Step 3: Confirm image processing support**

Run:

```powershell
@'
from PIL import Image
print("Pillow available")
'@ | python -
```

Expected:

```text
Pillow available
```

---

### Task 2: Create Shared CSS Source

**Files:**
- Create: `assets/site.css`

- [ ] **Step 1: Add the shared stylesheet**

Create `assets/site.css` with this source structure. During implementation, use these class names exactly in the HTML tasks so selectors stay stable:

```css
/*
Site CSS source of truth. There is no Tailwind build step.
Edit this file directly; index.html, 404.html, and privacy-policy.html all reference it.
*/
:root {
  color-scheme: light;
  --color-navy: #0f3470;
  --color-navy-strong: #082653;
  --color-blue: #2f6fb3;
  --color-blue-soft: #eaf3fb;
  --color-blue-soft-2: #f5f9fd;
  --color-yellow: #f2c230;
  --color-yellow-strong: #e0a90f;
  --color-ink: #102033;
  --color-muted: #53657a;
  --color-border: #d7e3ef;
  --color-white: #ffffff;
  --shadow-soft: 0 18px 44px rgb(8 38 83 / 0.14);
  --shadow-rail: 0 18px 40px -22px rgb(15 52 112 / 0.65);
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --container: 72rem;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--color-blue-soft-2);
  color: var(--color-ink);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.6;
}

img,
svg {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
}

a:focus-visible,
button:focus-visible {
  outline: 3px solid var(--color-yellow);
  outline-offset: 3px;
}

.page-shell {
  min-height: 100vh;
}

.section {
  padding: clamp(3rem, 7vw, 5.5rem) 1.25rem;
}

.container {
  width: min(100%, var(--container));
  margin-inline: auto;
}

.section-heading {
  margin: 0;
  color: var(--color-navy);
  font-size: clamp(2rem, 5vw, 3.25rem);
  line-height: 1.08;
  text-wrap: balance;
}

.section-heading::after {
  content: "";
  display: block;
  width: 5.5rem;
  height: 0.25rem;
  margin-top: 1rem;
  border-radius: 999px;
  background: var(--color-yellow);
}

.section-lead {
  max-width: 48rem;
  margin: 1.25rem 0 0;
  color: var(--color-muted);
  font-size: 1.125rem;
}

.button {
  display: inline-flex;
  min-height: 3rem;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.75rem 1.2rem;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  font-weight: 800;
  line-height: 1.2;
  text-align: center;
  text-decoration: none;
}

.button-primary {
  background: var(--color-yellow);
  color: var(--color-navy-strong);
}

.button-primary:hover,
.button-primary:focus-visible {
  background: #ffd84d;
}

.button-secondary {
  border-color: rgb(255 255 255 / 0.58);
  color: var(--color-white);
}

.button-secondary:hover,
.button-secondary:focus-visible {
  background: rgb(255 255 255 / 0.1);
  border-color: var(--color-white);
}

.button-outline {
  border-color: var(--color-border);
  background: var(--color-white);
  color: var(--color-navy);
}

.button-outline:hover,
.button-outline:focus-visible {
  border-color: var(--color-yellow);
  background: var(--color-blue-soft);
}

.hero {
  background: linear-gradient(135deg, #2f6fb3 0%, #245d9b 58%, #194b84 100%);
  color: var(--color-white);
}

.hero-grid {
  display: grid;
  gap: 2rem;
  align-items: center;
}

.hero-title {
  max-width: 46rem;
  margin: 0;
  font-size: clamp(2.4rem, 8vw, 4.85rem);
  line-height: 1.02;
  text-wrap: balance;
}

.hero-copy {
  max-width: 42rem;
  margin: 1.25rem 0 0;
  color: rgb(255 255 255 / 0.9);
  font-size: clamp(1.08rem, 2vw, 1.35rem);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1.75rem;
}

.hero-media {
  overflow: hidden;
  border-radius: var(--radius-md);
  background: rgb(255 255 255 / 0.12);
  box-shadow: var(--shadow-soft);
}

.hero-media img {
  width: 100%;
  height: auto;
  aspect-ratio: 1280 / 900;
  object-fit: cover;
}

.trust-rail {
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
}

.trust-list {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.trust-list li {
  display: flex;
  min-height: 3.5rem;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-blue-soft);
  color: var(--color-navy);
  font-weight: 800;
}

.trust-list li::before {
  content: "";
  width: 0.7rem;
  height: 0.7rem;
  flex: 0 0 auto;
  border-radius: 999px;
  background: var(--color-yellow);
}

.steps-grid,
.services-grid,
.battery-grid {
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
}

.step-card,
.service-card,
.battery-card,
.policy-card,
.not-found-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-white);
  box-shadow: 0 12px 32px rgb(8 38 83 / 0.08);
}

.step-card,
.service-card,
.battery-card {
  padding: 1.25rem;
}

.step-number {
  display: inline-flex;
  width: 2.25rem;
  height: 2.25rem;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: var(--color-navy);
  color: var(--color-yellow);
  font-weight: 900;
}

.card-title {
  margin: 1rem 0 0;
  color: var(--color-navy);
  font-size: 1.2rem;
  line-height: 1.25;
}

.card-copy {
  margin: 0.6rem 0 0;
  color: var(--color-muted);
}

.inline-phone {
  margin-top: 1.5rem;
  color: var(--color-navy);
  font-weight: 800;
}

.inline-phone a {
  color: var(--color-navy);
  text-underline-offset: 0.2em;
}

.band-white {
  background: var(--color-white);
}

.band-soft {
  background: var(--color-blue-soft-2);
}

.brand-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 1.75rem 2.5rem;
  align-items: center;
  margin-top: 2rem;
}

.brand-strip img {
  width: auto;
  max-width: 10rem;
  max-height: 3.25rem;
  object-fit: contain;
  filter: saturate(0.92);
}

.battery-card img {
  width: 100%;
  height: 12rem;
  object-fit: contain;
  margin-bottom: 1rem;
}

.contact-section {
  background: var(--color-white);
}

.contact-heading {
  margin: 0;
  color: var(--color-navy);
  font-size: clamp(2.4rem, 7vw, 4rem);
  font-weight: 800;
  line-height: 1.05;
  text-wrap: balance;
}

.contact-heading::after {
  content: "";
  display: block;
  width: 5.75rem;
  height: 0.25rem;
  margin-top: 1.5rem;
  border-radius: 999px;
  background: var(--color-yellow);
}

.contact-lead {
  max-width: 56rem;
  margin: 1.75rem 0 0;
  color: var(--color-ink);
  font-size: 1.125rem;
}

.contact-action-rail {
  display: grid;
  margin-top: 3rem;
  overflow: hidden;
  border-radius: var(--radius-md);
  background: var(--color-navy);
  box-shadow: var(--shadow-rail);
}

.contact-action {
  display: flex;
  min-height: 6.75rem;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  color: var(--color-white);
  text-decoration: none;
}

.contact-action + .contact-action {
  border-top: 1px solid rgb(255 255 255 / 0.24);
}

.contact-action:hover,
.contact-action:focus-visible {
  background: rgb(255 255 255 / 0.08);
}

.contact-action-icon {
  display: inline-flex;
  width: 4rem;
  height: 4rem;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-yellow);
  border-radius: 999px;
  color: var(--color-yellow);
}

.contact-action-icon svg {
  width: 2rem;
  height: 2rem;
}

.contact-action strong,
.contact-action-value,
.contact-action-note {
  display: block;
}

.contact-action strong {
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0;
}

.contact-action-value {
  margin-top: 0.25rem;
  font-size: clamp(1.35rem, 4vw, 2rem);
  font-weight: 900;
  line-height: 1.1;
}

.contact-action-email .contact-action-value {
  overflow-wrap: anywhere;
  font-size: clamp(1rem, 3vw, 1.55rem);
}

.contact-action-note {
  margin-top: 0.3rem;
  color: rgb(255 255 255 / 0.75);
  font-size: 0.95rem;
}

.location-panel {
  display: grid;
  gap: 1.5rem;
  margin-top: 2rem;
  align-items: center;
}

.location-content {
  padding: 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-blue-soft);
}

.location-content h3 {
  margin: 0;
  color: var(--color-navy);
  font-size: 1.25rem;
}

.location-hours,
.privacy-hint {
  margin-top: 1rem;
  color: var(--color-muted);
}

.directions-button {
  margin-top: 1.25rem;
}

.location-illustration {
  overflow: hidden;
  border-radius: var(--radius-md);
  background: var(--color-blue-soft);
}

.location-illustration img {
  width: 100%;
  aspect-ratio: 1200 / 800;
  object-fit: cover;
}

.site-footer {
  padding: 2rem 1.25rem;
  background: var(--color-navy-strong);
  color: var(--color-white);
  text-align: center;
}

.footer-business {
  margin: 0;
  font-weight: 800;
}

.footer-meta,
.privacy-note {
  margin: 0.6rem auto 0;
  max-width: 58rem;
  color: rgb(255 255 255 / 0.78);
  font-size: 0.9rem;
}

.site-footer a,
.privacy-note a {
  color: var(--color-white);
  font-weight: 800;
  text-underline-offset: 0.2em;
}

.privacy-settings {
  margin-top: 0.75rem;
  border: 1px solid rgb(255 255 255 / 0.45);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-white);
  cursor: pointer;
  font: inherit;
  font-weight: 800;
  padding: 0.55rem 0.85rem;
}

.analytics-consent {
  position: fixed;
  inset: auto 1rem 1rem;
  z-index: 20;
}

.analytics-consent[hidden] {
  display: none;
}

.analytics-consent__inner {
  display: grid;
  gap: 1rem;
  max-width: 44rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-white);
  box-shadow: var(--shadow-soft);
}

.analytics-consent p {
  margin: 0;
  color: var(--color-ink);
}

.analytics-consent a {
  color: var(--color-navy);
  font-weight: 800;
}

.analytics-consent__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.analytics-consent button {
  min-height: 2.75rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font: inherit;
  font-weight: 800;
  padding: 0.65rem 1rem;
}

.analytics-consent__reject {
  border: 1px solid var(--color-border);
  background: var(--color-white);
  color: var(--color-navy);
}

.analytics-consent__accept {
  border: 1px solid var(--color-yellow);
  background: var(--color-yellow);
  color: var(--color-navy-strong);
}

.legal-header {
  background: var(--color-blue);
  color: var(--color-white);
}

.legal-header a {
  color: var(--color-white);
  font-weight: 800;
  text-underline-offset: 0.2em;
}

.policy {
  max-width: 58rem;
}

.policy-card {
  padding: clamp(1.25rem, 4vw, 2rem);
}

.policy h2 {
  margin: 1.75rem 0 0;
  color: var(--color-navy);
  font-size: 1.25rem;
  line-height: 1.3;
}

.policy h2:first-child {
  margin-top: 0;
}

.policy p,
.policy li {
  color: var(--color-ink);
}

.policy ul {
  margin-top: 0.75rem;
  padding-left: 1.25rem;
}

.policy a {
  color: var(--color-navy);
  font-weight: 800;
  text-underline-offset: 0.2em;
}

.not-found-wrap {
  display: grid;
  min-height: 100vh;
  align-items: center;
  padding: 1.25rem;
  background: var(--color-blue);
}

.not-found-card {
  width: min(100%, 48rem);
  margin: auto;
  padding: clamp(1.5rem, 5vw, 2.75rem);
  border-top: 0.25rem solid var(--color-yellow);
  text-align: center;
}

.not-found-card h1 {
  margin: 0;
  color: var(--color-navy);
  font-size: clamp(2.2rem, 8vw, 4rem);
  line-height: 1.05;
}

.not-found-card p {
  color: var(--color-muted);
}

.not-found-card .footer-business {
  color: var(--color-navy);
}

@media (min-width: 48rem) {
  .hero-grid {
    grid-template-columns: minmax(0, 1.05fr) minmax(20rem, 0.8fr);
  }

  .trust-list,
  .steps-grid,
  .battery-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .contact-action-rail {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .contact-action + .contact-action {
    border-top: 0;
    border-left: 1px solid rgb(255 255 255 / 0.24);
  }

  .location-panel {
    grid-template-columns: minmax(0, 0.9fr) minmax(18rem, 0.7fr);
  }

  .analytics-consent__inner {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
}

@media (max-width: 42rem) {
  .hero-actions,
  .analytics-consent__actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .button,
  .analytics-consent button {
    width: 100%;
  }

  .contact-action {
    min-height: 5.75rem;
  }

  .contact-action-icon {
    width: 3rem;
    height: 3rem;
  }

  .contact-action-icon svg {
    width: 1.45rem;
    height: 1.45rem;
  }
}
```

- [ ] **Step 2: Commit shared CSS**

Run:

```powershell
git add assets/site.css
git commit -m "feat: add shared site stylesheet"
```

Expected: commit succeeds.

---

### Task 3: Create Shared Analytics Consent Script

**Files:**
- Create: `assets/analytics-consent.js`
- Later modify references in: `index.html`, `404.html`, `privacy-policy.html`

- [ ] **Step 1: Add the shared JavaScript file**

Create `assets/analytics-consent.js` by extracting the current inline consent script into this exact standalone file:

```javascript
(function () {
  var storageKey = "akumulatory_analytics_consent";
  var acceptedValue = "accepted";
  var rejectedValue = "rejected";
  var rejectionReminderMs = 24 * 60 * 60 * 1000;
  var umamiScriptSrc = "https://cloud.umami.is/script.js";
  var umamiWebsiteId = "0304e7de-a321-4985-9ac1-b251be5c31c3";
  var banner = document.getElementById("analytics-consent");
  var acceptButton = document.querySelector("[data-analytics-accept]");
  var rejectButton = document.querySelector("[data-analytics-reject]");
  var settingsButtons = document.querySelectorAll("[data-analytics-settings]");

  function getPreference() {
    var rawPreference;

    try {
      rawPreference = window.localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }

    if (!rawPreference) {
      return null;
    }

    try {
      return JSON.parse(rawPreference);
    } catch (error) {
      if (rawPreference === acceptedValue || rawPreference === rejectedValue) {
        return {
          value: rawPreference,
          rejectedAt: rawPreference === rejectedValue ? 0 : null
        };
      }
    }

    return null;
  }

  function setPreference(value) {
    var now = Date.now();
    var preference = {
      value: value,
      updatedAt: now
    };

    if (value === rejectedValue) {
      preference.rejectedAt = now;
    }

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(preference));
    } catch (error) {
      return false;
    }

    return true;
  }

  function isRejectedPreferenceCurrent(preference) {
    return Boolean(
      preference &&
      preference.value === rejectedValue &&
      typeof preference.rejectedAt === "number" &&
      !isRejectedPreferenceExpired(preference)
    );
  }

  function isRejectedPreferenceExpired(preference) {
    return Date.now() - preference.rejectedAt >= rejectionReminderMs;
  }

  function hasUmamiLoaded() {
    return Boolean(document.querySelector('script[src="' + umamiScriptSrc + '"]'));
  }

  function loadUmami() {
    if (hasUmamiLoaded()) {
      return;
    }

    var script = document.createElement("script");
    script.defer = true;
    script.src = umamiScriptSrc;
    script.setAttribute("data-website-id", umamiWebsiteId);
    script.setAttribute("data-analytics-umami", "true");
    document.head.appendChild(script);
  }

  function showBanner() {
    if (banner) {
      banner.hidden = false;
    }
  }

  function hideBanner() {
    if (banner) {
      banner.hidden = true;
    }
  }

  function acceptAnalytics() {
    setPreference(acceptedValue);
    hideBanner();
    loadUmami();
  }

  function rejectAnalytics() {
    var hadLoadedUmami = hasUmamiLoaded();
    setPreference(rejectedValue);
    hideBanner();

    if (hadLoadedUmami) {
      window.location.reload();
    }
  }

  if (acceptButton) {
    acceptButton.addEventListener("click", acceptAnalytics);
  }

  if (rejectButton) {
    rejectButton.addEventListener("click", rejectAnalytics);
  }

  settingsButtons.forEach(function (button) {
    button.addEventListener("click", showBanner);
  });

  var preference = getPreference();

  if (preference && preference.value === acceptedValue) {
    loadUmami();
  } else if (!isRejectedPreferenceCurrent(preference)) {
    showBanner();
  }
}());
```

- [ ] **Step 2: Commit shared script**

Run:

```powershell
git add assets/analytics-consent.js
git commit -m "feat: share analytics consent script"
```

Expected: commit succeeds.

---

### Task 4: Generate and Optimize Original Assets

**Files:**
- Create: `assets/hero-battery-diagnosis-640.webp`
- Create: `assets/hero-battery-diagnosis-960.webp`
- Create: `assets/hero-battery-diagnosis-1280.webp`
- Create: `assets/contact-office-service-800.webp`
- Create: `assets/contact-office-service-1200.webp`

- [ ] **Step 1: Generate hero source image**

Use the image generation tool with this prompt:

```text
Realistic editorial photo for a Polish car battery service website. A mechanic checks a car battery with a compact diagnostic tester beside a parked everyday passenger car, outdoors near a residential parking area, calm trustworthy mood, no visible brand logos, no workshop bay, no emergency lights, no text, natural daylight, medium blue and yellow visual accents, clean composition with space for website layout, landscape 16:11.
```

Expected: the tool returns one local image path.

- [ ] **Step 2: Save the hero source temporarily**

Copy the generated hero image to `assets/hero-battery-diagnosis-source.png`. This temporary source file is used only for conversion and must not be committed.

- [ ] **Step 3: Generate contact/office source image**

Use the image generation tool with this prompt:

```text
Clean original illustration for a Polish local business contact section. A residential building parking area with a parked car and a small office location cue, calm professional style, medium blue and navy palette with small yellow accents, no text, no maps, no brand logos, no workshop equipment, no emergency service cues, landscape 3:2.
```

Expected: the tool returns one local image path.

- [ ] **Step 4: Save the contact source temporarily**

Copy the generated contact image to `assets/contact-office-service-source.png`. This temporary source file is used only for conversion and must not be committed.

- [ ] **Step 5: Convert generated sources to WebP variants**

Run:

```powershell
@'
from pathlib import Path
from PIL import Image, ImageOps

jobs = [
    ("assets/hero-battery-diagnosis-source.png", "assets/hero-battery-diagnosis-640.webp", (640, 450)),
    ("assets/hero-battery-diagnosis-source.png", "assets/hero-battery-diagnosis-960.webp", (960, 675)),
    ("assets/hero-battery-diagnosis-source.png", "assets/hero-battery-diagnosis-1280.webp", (1280, 900)),
    ("assets/contact-office-service-source.png", "assets/contact-office-service-800.webp", (800, 533)),
    ("assets/contact-office-service-source.png", "assets/contact-office-service-1200.webp", (1200, 800)),
]

for source, target, size in jobs:
    image = Image.open(source).convert("RGB")
    image = ImageOps.fit(image, size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    image.save(target, "WEBP", quality=82, method=6)
    print(f"{target}: {size[0]}x{size[1]}")
'@ | python -
```

Expected:

```text
assets/hero-battery-diagnosis-640.webp: 640x450
assets/hero-battery-diagnosis-960.webp: 960x675
assets/hero-battery-diagnosis-1280.webp: 1280x900
assets/contact-office-service-800.webp: 800x533
assets/contact-office-service-1200.webp: 1200x800
```

- [ ] **Step 6: Remove temporary PNG sources**

Run:

```powershell
Remove-Item -LiteralPath assets\hero-battery-diagnosis-source.png,assets\contact-office-service-source.png
```

Expected: command exits 0 and both temporary PNG files are gone.

- [ ] **Step 7: Commit generated assets**

Run:

```powershell
git add assets/hero-battery-diagnosis-640.webp assets/hero-battery-diagnosis-960.webp assets/hero-battery-diagnosis-1280.webp assets/contact-office-service-800.webp assets/contact-office-service-1200.webp
git commit -m "feat: add original site visuals"
```

Expected: commit succeeds.

---

### Task 5: Rebuild Homepage Head, Metadata, and Structured Data

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace stylesheet and font links**

In `index.html`, remove:

```html
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
<link href="./assets/output.css" rel="stylesheet">
```

Add:

```html
<link href="./assets/site.css" rel="stylesheet">
```

- [ ] **Step 2: Remove the inline `<style>` block**

Delete the entire inline stylesheet from `index.html` because `assets/site.css` now owns all page styles.

- [ ] **Step 3: Update title and meta description**

Use:

```html
<title>Akumulatory Katowice - test, dobór i montaż przy aucie</title>
<meta name="description"
    content="Akumulator w Katowicach? Zadzwoń, opisz objawy i sprawdź, czy potrzebny jest test, dobór lub montaż akumulatora przy aucie.">
<meta name="keywords" content="akumulatory Katowice, test akumulatora, montaż akumulatora Katowice">
```

- [ ] **Step 4: Update structured data image and descriptions**

In the JSON-LD script, replace `https://akumulatory-katowice.pl/assets/hero.webp` with:

```json
"https://akumulatory-katowice.pl/assets/hero-battery-diagnosis-1280.webp"
```

Use these JSON string values:

```json
"name": "Akumulatory Katowice - test, dobór i montaż przy aucie"
```

```json
"description": "Test, dobór i montaż akumulatorów przy aucie w Katowicach i okolicach."
```

```json
"specialty": "Akumulatory Katowice - test, dobór i montaż przy aucie"
```

```json
"alternateName": [
  "Akumulatory Katowice",
  "Test i montaż akumulatorów przy aucie"
]
```

- [ ] **Step 5: Commit head and metadata changes**

Run:

```powershell
git add index.html
git commit -m "feat: update homepage metadata"
```

Expected: commit succeeds.

---

### Task 6: Rebuild Homepage Body Sections

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace current body class**

Change:

```html
<body class="bg-gray-100">
```

To:

```html
<body class="page-shell">
```

- [ ] **Step 2: Replace old homepage content with final section structure**

Replace the content inside `<main>` before the footer with these sections. Keep the existing JSON-LD script in `<head>` and the shared footer added in the next step.

```html
<header class="hero section">
    <div class="container hero-grid">
        <div>
            <h1 class="hero-title">Auto nie odpala? Sprawdźmy, czy winny jest akumulator.</h1>
            <p class="hero-copy">Zadzwoń, opisz objawy, a pomożemy ustalić, czy potrzebny jest nowy akumulator, test lub montaż przy aucie.</p>
            <div class="hero-actions">
                <a class="button button-primary" href="tel:+48501436661" data-umami-event="hero-phone-cta">Zadzwoń: 501&nbsp;436&nbsp;661</a>
                <a class="button button-secondary" href="#jak-dzialamy" data-umami-event="hero-how-it-works-secondary-cta">Jak działamy</a>
            </div>
        </div>
        <div class="hero-media">
            <img src="./assets/hero-battery-diagnosis-960.webp"
                srcset="./assets/hero-battery-diagnosis-640.webp 640w, ./assets/hero-battery-diagnosis-960.webp 960w, ./assets/hero-battery-diagnosis-1280.webp 1280w"
                sizes="(min-width: 768px) 42vw, 100vw"
                alt="Test akumulatora przy samochodzie"
                width="1280" height="900"
                fetchpriority="high" decoding="async">
        </div>
    </div>
</header>

<section class="trust-rail section" aria-label="Najważniejsze zasady obsługi">
    <div class="container">
        <ul class="trust-list">
            <li>Bez wymiany w ciemno</li>
            <li>Darmowy test akumulatora</li>
            <li>Dobór do auta i budżetu</li>
        </ul>
    </div>
</section>

<section id="jak-dzialamy" class="section band-soft" aria-labelledby="how-heading">
    <div class="container">
        <h2 id="how-heading" class="section-heading">Jak działamy</h2>
        <p class="section-lead">Najpierw ustalamy, co dzieje się z autem. Dopiero potem dobieramy test, akumulator albo montaż przy samochodzie.</p>
        <div class="steps-grid">
            <article class="step-card">
                <span class="step-number">1</span>
                <h3 class="card-title">Zadzwoń i opisz objawy</h3>
                <p class="card-copy">Ustalimy, czy problem może dotyczyć akumulatora.</p>
            </article>
            <article class="step-card">
                <span class="step-number">2</span>
                <h3 class="card-title">Sprawdzimy akumulator i dobierzemy rozwiązanie</h3>
                <p class="card-copy">Test oraz dobór wykonujemy z myślą o konkretnym aucie, jego wyposażeniu i budżecie.</p>
            </article>
            <article class="step-card">
                <span class="step-number">3</span>
                <h3 class="card-title">Ustalimy montaż przy aucie</h3>
                <p class="card-copy">Z dojazdem do klienta albo po umówieniu przy biurze firmy.</p>
            </article>
        </div>
        <p class="inline-phone">Masz pytanie? <a href="tel:+48501436661" data-umami-event="how-phone-inline">Zadzwoń: 501&nbsp;436&nbsp;661</a></p>
    </div>
</section>

<section class="section band-white" aria-labelledby="services-heading">
    <div class="container">
        <h2 id="services-heading" class="section-heading">Co możemy dla Ciebie zrobić</h2>
        <div class="services-grid">
            <article class="service-card">
                <h3 class="card-title">Darmowy test akumulatora</h3>
                <p class="card-copy">Sprawdzamy, czy problemem jest akumulator, ładowanie czy sposób użytkowania.</p>
            </article>
            <article class="service-card">
                <h3 class="card-title">Dobór właściwego modelu</h3>
                <p class="card-copy">Dobieramy akumulator do auta, wyposażenia, sposobu jazdy i budżetu.</p>
            </article>
            <article class="service-card">
                <h3 class="card-title">Montaż przy aucie</h3>
                <p class="card-copy">Montaż wykonujemy po wcześniejszym ustaleniu szczegółów telefonicznie.</p>
            </article>
            <article class="service-card">
                <h3 class="card-title">Odbiór starego akumulatora</h3>
                <p class="card-copy">Zużyty akumulator możesz zostawić do odpowiedniego recyklingu.</p>
            </article>
        </div>
    </div>
</section>

<section class="section band-soft" aria-labelledby="brands-heading">
    <div class="container">
        <h2 id="brands-heading" class="section-heading">Sprawdzone marki pod ręką</h2>
        <p class="section-lead">Exide, Varta, Bosch, Centra i inne marki dobierane praktycznie do samochodu, sposobu jazdy i ceny.</p>
        <div class="brand-strip" aria-label="Marki akumulatorów">
            <img src="./assets/exide_logo_blue_300x99.webp" alt="Exide Technologies" width="300" height="99" loading="lazy" decoding="async">
            <img src="./assets/varta-logo-1024x168.webp" alt="Varta" width="1024" height="168" loading="lazy" decoding="async">
            <img src="./assets/bosch_logo.webp" alt="Bosch" width="800" height="189" loading="lazy" decoding="async">
            <img src="./assets/centra_logo.webp" alt="Centra" width="1920" height="916" loading="lazy" decoding="async">
        </div>
    </div>
</section>

<section class="section band-white" aria-labelledby="battery-types-heading">
    <div class="container">
        <h2 id="battery-types-heading" class="section-heading">Rodzaje akumulatorów</h2>
        <div class="battery-grid">
            <article class="battery-card">
                <img src="./assets/varta-car-battery.webp" alt="Przykładowy akumulator samochodowy" width="500" height="500" loading="lazy" decoding="async">
                <h3 class="card-title">Samochodowe</h3>
                <p class="card-copy">Do aut osobowych, dostawczych i systemów Start-Stop.</p>
            </article>
            <article class="battery-card">
                <img src="./assets/exide_mc_agm_ready.webp" alt="Przykładowy akumulator motocyklowy" width="650" height="650" loading="lazy" decoding="async">
                <h3 class="card-title">Motocyklowe</h3>
                <p class="card-copy">Na sezon, do regularnej jazdy i pewnego rozruchu.</p>
            </article>
            <article class="battery-card">
                <img src="./assets/traction-battery.webp" alt="Przykładowy akumulator trakcyjny" width="615" height="415" loading="lazy" decoding="async">
                <h3 class="card-title">Trakcyjne</h3>
                <p class="card-copy">Do pracy, maszyn, wózków i zastosowań specjalnych.</p>
            </article>
        </div>
    </div>
</section>
```

- [ ] **Step 3: Commit homepage body sections**

Run:

```powershell
git add index.html
git commit -m "feat: rebuild homepage sections"
```

Expected: commit succeeds.

---

### Task 7: Update Contact Section and Shared Footer

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace contact heading and lead copy**

Use:

```html
<section id="kontakt" class="contact-section section" aria-labelledby="contact-heading">
    <div class="container">
        <h2 id="contact-heading" class="contact-heading">Kontakt i biuro</h2>
        <p class="contact-lead">Biuro firmy znajduje się przy ul. Miłej 8 w Katowicach-Giszowcu. Montaż i test akumulatora wykonujemy przy aucie: z dojazdem do klienta albo po umówieniu przy biurze.</p>
```

- [ ] **Step 2: Keep contact rail actions but update labels**

Use the existing inline phone/email/map SVGs and tracking attributes. The three rail labels must be:

```html
<strong>Zadzwoń</strong>
<span class="contact-action-value">501&nbsp;436&nbsp;661</span>
```

```html
<strong>Napisz</strong>
<span class="contact-action-value">dariusz.cieszynski@wp.pl</span>
```

```html
<strong>Adres biura / mapa</strong>
<span class="contact-action-note">Miła 8, Katowice-Giszowiec</span>
```

- [ ] **Step 3: Replace location panel copy and image**

Use:

```html
<div class="location-panel">
    <div class="location-content">
        <h3>Miła 8, 40-464 Katowice (Giszowiec)</h3>
        <p>Godziny: pon.-pt. 9:00-21:00, sob. 9:00-20:00, niedz. 9:00-15:00</p>
        <a class="button button-primary directions-button"
            href="https://www.google.com/maps/dir/?api=1&destination=Mi%C5%82a%208%2C%2040-464%20Katowice"
            target="_blank" rel="noopener noreferrer" data-umami-event="contact-directions-button-cta">Otwórz adres biura w Google Maps</a>
        <p class="privacy-hint">Mapa Google otworzy się po kliknięciu.</p>
    </div>
    <div class="location-illustration" aria-hidden="true">
        <img src="./assets/contact-office-service-800.webp"
            srcset="./assets/contact-office-service-800.webp 800w, ./assets/contact-office-service-1200.webp 1200w"
            sizes="(min-width: 768px) 40vw, 100vw"
            alt="" width="1200" height="800" loading="lazy" decoding="async">
    </div>
</div>
```

- [ ] **Step 4: Replace footer attribution with neutral legal/footer block**

Use:

```html
<footer class="site-footer">
    <div class="container">
        <p class="footer-business">Sprzedaż Artykułów Przemysłowych Dariusz Cieszyński</p>
        <p class="footer-meta">NIP: 9541006332 · REGON: 363046529 · Miła 8, 40-464 Katowice (Giszowiec)</p>
        <div id="prywatnosc" class="privacy-note">
            <p>Strona uruchamia statystyki odwiedzin dopiero po zgodzie. Korzysta też z linku do Google Maps oraz linków telefonicznych i email. Szczegóły opisuje <a href="./privacy-policy.html">polityka prywatności</a>.</p>
            <button class="privacy-settings" type="button" data-analytics-settings>Ustawienia prywatności</button>
        </div>
    </div>
</footer>
```

- [ ] **Step 5: Replace inline consent script with shared script reference**

Keep the consent banner markup and replace the inline `<script>...</script>` block with:

```html
<script src="./assets/analytics-consent.js" defer></script>
```

- [ ] **Step 6: Commit contact and footer updates**

Run:

```powershell
git add index.html
git commit -m "feat: update contact and footer copy"
```

Expected: commit succeeds.

---

### Task 8: Modernize 404 Page

**Files:**
- Modify: `404.html`

- [ ] **Step 1: Replace the whole 404 document**

Replace `404.html` with:

```html
<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, follow">
    <title>Nie znaleziono strony - Akumulatory Katowice</title>
    <link rel="icon" type="image/png" href="./assets/favicon/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/svg+xml" href="./assets/favicon/favicon.svg">
    <link rel="shortcut icon" href="./assets/favicon/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="./assets/favicon/apple-touch-icon.png">
    <link rel="manifest" href="./assets/favicon/site.webmanifest">
    <link href="./assets/site.css" rel="stylesheet">
</head>

<body class="page-shell">
    <main class="not-found-wrap">
        <section class="not-found-card" aria-labelledby="not-found-heading">
            <p class="footer-business">Akumulatory Katowice</p>
            <h1 id="not-found-heading">Nie znaleziono strony</h1>
            <p>Ten adres nie prowadzi już do aktywnej podstrony. Wróć na stronę główną albo zadzwoń, jeśli chcesz zapytać o akumulator.</p>
            <nav class="hero-actions" aria-label="Najważniejsze linki">
                <a class="button button-primary" href="/">Wróć na stronę główną</a>
                <a class="button button-outline" href="tel:+48501436661" data-umami-event="not-found-phone-cta">Zadzwoń: 501&nbsp;436&nbsp;661</a>
            </nav>
            <p><a href="/privacy-policy.html">Polityka prywatności</a></p>
        </section>
    </main>

    <section id="analytics-consent" class="analytics-consent" aria-label="Zgoda na statystyki" hidden>
        <div class="analytics-consent__inner">
            <p>Pomóż nam sprawdzić, czy strona jest przydatna. Za zgodą uruchomimy anonimowe statystyki odwiedzin bez reklam i profilowania.
                <a href="./privacy-policy.html">Polityka prywatności</a></p>
            <div class="analytics-consent__actions">
                <button class="analytics-consent__reject" type="button" data-analytics-reject>Odrzuć</button>
                <button class="analytics-consent__accept" type="button" data-analytics-accept>Akceptuję statystyki</button>
            </div>
        </div>
    </section>
    <script src="./assets/analytics-consent.js" defer></script>
</body>

</html>
```

- [ ] **Step 2: Commit 404 update**

Run:

```powershell
git add 404.html
git commit -m "feat: modernize 404 page"
```

Expected: commit succeeds.

---

### Task 9: Modernize Privacy Policy Page

**Files:**
- Modify: `privacy-policy.html`

- [ ] **Step 1: Replace Tailwind link and inline body font style**

Remove:

```html
<link href="./assets/output.css" rel="stylesheet">
```

Remove the inline `<style>` block. Add:

```html
<link href="./assets/site.css" rel="stylesheet">
```

- [ ] **Step 2: Replace body/header/article classes with shared classes**

Use:

```html
<body class="page-shell">
    <main>
        <header class="legal-header section">
            <div class="container">
                <a href="./index.html">Wróć na stronę główną</a>
                <h1 class="hero-title">Polityka prywatności</h1>
                <p class="hero-copy">Informacje o danych przetwarzanych przy korzystaniu ze strony i kontakcie z firmą.</p>
                <p class="hero-copy">Ostatnia aktualizacja: 5 lipca 2026 r.</p>
            </div>
        </header>

        <article class="policy section container">
            <section class="policy-card">
```

Keep the existing policy headings and legal content inside `policy-card`, except for the specific wording changes below.

- [ ] **Step 3: Update external-service wording after removing Google Fonts**

Replace the current paragraph beginning `Strona główna i strona błędu 404 ładują Google Fonts` with:

```html
<p>Strona korzysta z czcionek systemowych i nie pobiera Google Fonts. Strona główna zawiera link do wyznaczania
    trasy w Google Maps. Nie osadzamy mapy Google na stronie; Google Maps jest ładowane dopiero po
    kliknięciu zewnętrznego linku dojazdu.
    Po kliknięciu linku dojazdu przeglądarka łączy się z usługami Google.
    Google może wtedy przetwarzać dane techniczne, informacje o korzystaniu z usług Google oraz
    wykorzystywać pliki cookie lub podobne technologie.</p>
```

- [ ] **Step 4: Update cookie wording after removing Google Fonts**

Replace the sentence beginning `Google Fonts powoduje połączenie` with:

```html
Strona korzysta z czcionek systemowych, więc nie łączy się z Google Fonts. Google Maps może korzystać z
plików cookie lub podobnych technologii po kliknięciu zewnętrznego linku dojazdu, zgodnie z zasadami
Google.
```

Keep the rest of the paragraph unchanged.

- [ ] **Step 5: Add shared footer and consent banner**

After `</article>` and before `</main>`, add:

```html
<footer class="site-footer">
    <div class="container">
        <p class="footer-business">Sprzedaż Artykułów Przemysłowych Dariusz Cieszyński</p>
        <p class="footer-meta">NIP: 9541006332 · REGON: 363046529 · Miła 8, 40-464 Katowice (Giszowiec)</p>
        <div class="privacy-note">
            <p>Możesz wrócić do wyboru statystyk odwiedzin w dowolnym momencie.</p>
            <button class="privacy-settings" type="button" data-analytics-settings>Ustawienia prywatności</button>
        </div>
    </div>
</footer>
```

Before `</body>`, add the same consent banner used on `index.html`, with the privacy link set to `./privacy-policy.html`, followed by:

```html
<script src="./assets/analytics-consent.js" defer></script>
```

- [ ] **Step 6: Commit privacy update**

Run:

```powershell
git add privacy-policy.html
git commit -m "feat: modernize privacy policy page"
```

Expected: commit succeeds.

---

### Task 10: Update Machine-Readable Business Summaries and Sitemap

**Files:**
- Modify: `llms.txt`
- Modify: `llms-full.txt`
- Modify: `sitemap.xml`

- [ ] **Step 1: Update `llms.txt` summary**

Replace the opening summary with:

```markdown
> Test, dobór i montaż akumulatorów przy aucie w Katowicach i okolicach. Zadzwoń, opisz objawy, a firma pomoże ustalić, czy potrzebny jest nowy akumulator, test lub montaż z dojazdem do klienta albo po umówieniu przy biurze.
```

Replace service bullets with:

```markdown
## Usługi

### Darmowy test akumulatora

- Sprawdzenie, czy problemem jest akumulator, ładowanie czy sposób użytkowania
- Diagnoza przed wymianą akumulatora

### Dobór właściwego modelu

- Dobór do auta, wyposażenia, sposobu jazdy i budżetu
- Marki m.in. Exide Technologies, Varta, Bosch i Centra

### Montaż przy aucie

- Montaż po wcześniejszym ustaleniu szczegółów telefonicznie
- Z dojazdem do klienta albo po umówieniu przy biurze firmy

### Recykling

- Możliwość zostawienia zużytego akumulatora do odpowiedniego recyklingu
```

- [ ] **Step 2: Update `llms-full.txt` positioning**

Use these frontmatter values:

```yaml
business_type: "test, dobór i montaż akumulatorów przy aucie"
services: ["test akumulatora", "dobór akumulatora", "montaż przy aucie", "recykling"]
```

Use this main heading and subtitle:

```markdown
# Akumulatory Katowice: Test, Dobór i Montaż Przy Aucie

**Zadzwoń, opisz objawy i ustal kolejny krok bez wymiany w ciemno**
```

Use this contact wording:

```markdown
Biuro firmy znajduje się przy ul. Miłej 8 w Katowicach-Giszowcu. Montaż i test akumulatora wykonujemy przy aucie: z dojazdem do klienta albo po umówieniu przy biurze.
```

- [ ] **Step 3: Update sitemap date**

In `sitemap.xml`, change:

```xml
<lastmod>2026-07-04</lastmod>
```

To:

```xml
<lastmod>2026-07-05</lastmod>
```

- [ ] **Step 4: Commit summary and sitemap updates**

Run:

```powershell
git add llms.txt llms-full.txt sitemap.xml
git commit -m "docs: update public business summaries"
```

Expected: commit succeeds.

---

### Task 11: Remove Tailwind and Attribution-Bound Assets

**Files:**
- Delete: `assets/input.css`
- Delete: `assets/output.css`
- Delete: `assets/hero.webp`
- Delete: `assets/contact-directions-illustration.webp`
- Delete: `assets/ic_analyze.svg`
- Delete: `assets/ic_check.svg`
- Delete: `assets/ic_recycle.svg`
- Delete: `assets/ic_shopping.svg`
- Delete: `assets/ic_tools.svg`
- Modify: `index.html`
- Modify: `privacy-policy.html`
- Modify: `404.html`

- [ ] **Step 1: Scan references before deleting**

Run:

```powershell
rg -n "output\.css|input\.css|fonts\.googleapis|Freepik|Flaticon|ic_|hero\.webp|contact-directions-illustration" index.html 404.html privacy-policy.html llms.txt llms-full.txt assets
```

Expected: no output and exit code 1.

- [ ] **Step 2: Delete unused files**

Run:

```powershell
Remove-Item -LiteralPath assets\input.css,assets\output.css,assets\hero.webp,assets\contact-directions-illustration.webp,assets\ic_analyze.svg,assets\ic_check.svg,assets\ic_recycle.svg,assets\ic_shopping.svg,assets\ic_tools.svg
```

Expected: command exits 0.

- [ ] **Step 3: Confirm deleted files are not referenced**

Run:

```powershell
rg -n "output\.css|input\.css|fonts\.googleapis|Freepik|Flaticon|ic_|hero\.webp|contact-directions-illustration" index.html 404.html privacy-policy.html llms.txt llms-full.txt assets
```

Expected: no output and exit code 1.

- [ ] **Step 4: Commit cleanup**

Run:

```powershell
git add index.html 404.html privacy-policy.html llms.txt llms-full.txt assets
git commit -m "chore: remove legacy css and attributed assets"
```

Expected: commit succeeds.

---

### Task 12: Static Integrity Verification

**Files:**
- Verify: `index.html`
- Verify: `404.html`
- Verify: `privacy-policy.html`
- Verify: `assets/site.css`
- Verify: `assets/analytics-consent.js`
- Verify: `assets/`

- [ ] **Step 1: Check forbidden and misleading wording**

Run:

```powershell
rg -n "\b(warsztat|punkt wymiany|pogotowie|24/7)\b|10 min|natychmiast|od ręki|błyskawicznie" index.html 404.html privacy-policy.html llms.txt llms-full.txt
```

Expected: no output and exit code 1.

- [ ] **Step 2: Check required visible copy**

Run:

```powershell
rg -n "Auto nie odpala\?|Sprawdźmy, czy winny jest akumulator|Jak działamy|Bez wymiany w ciemno|Kontakt i biuro|Biuro firmy znajduje się przy ul\. Miłej 8|Montaż i test akumulatora wykonujemy przy aucie|Godziny: pon\.-pt\. 9:00-21:00" index.html
```

Expected: at least one match for every phrase in the pattern.

- [ ] **Step 3: Check local asset references exist**

Run:

```powershell
@'
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

class RefParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []
    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name in {"src", "href"} and value:
                self.refs.append(value)

missing = []
root = Path.cwd().resolve()
for html_path in [Path("index.html"), Path("404.html"), Path("privacy-policy.html")]:
    parser = RefParser()
    parser.feed(html_path.read_text(encoding="utf-8"))
    for ref in parser.refs:
        parsed = urlparse(ref)
        if parsed.scheme or ref.startswith("#") or ref.startswith("tel:") or ref.startswith("mailto:"):
            continue
        if ref.startswith("/"):
            local = (root / ref.lstrip("/")).resolve()
        else:
            local = (html_path.parent / ref).resolve()
        if not local.exists():
            missing.append(f"{html_path}: {ref}")

if missing:
    print("\n".join(missing))
    raise SystemExit(1)

print("all relative refs exist")
'@ | python -
```

Expected:

```text
all relative refs exist
```

- [ ] **Step 4: Check page and asset size budgets**

Run:

```powershell
@'
from pathlib import Path

limits = {
    "index.html": 45000,
    "404.html": 9000,
    "privacy-policy.html": 22000,
    "assets/site.css": 24000,
    "assets/analytics-consent.js": 5500,
    "assets/hero-battery-diagnosis-1280.webp": 180000,
    "assets/contact-office-service-1200.webp": 180000,
}

failed = []
for path, limit in limits.items():
    size = Path(path).stat().st_size
    print(f"{path}: {size} bytes")
    if size > limit:
        failed.append(f"{path} is {size} bytes, limit {limit}")

if failed:
    print("\n".join(failed))
    raise SystemExit(1)

print("size budgets passed")
'@ | python -
```

Expected: each listed file is printed and final line is:

```text
size budgets passed
```

- [ ] **Step 5: Check git state after static verification**

Run:

```powershell
git status --short
```

Expected: no output.

---

### Task 13: Browser, Accessibility, and Performance Verification

**Files:**
- Verify in browser: `index.html`
- Verify in browser: `404.html`
- Verify in browser: `privacy-policy.html`

- [ ] **Step 1: Start local static server**

Run:

```powershell
Start-Process -WindowStyle Hidden -FilePath python -ArgumentList "-m","http.server","8000" -WorkingDirectory (Get-Location)
```

Expected: background Python server starts for `http://127.0.0.1:8000/`.

- [ ] **Step 2: Run Lighthouse audit**

Run:

```powershell
npx --yes lighthouse http://127.0.0.1:8000/ --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless" --output=json --output-path=.superpowers/reports/lighthouse-home.json
```

Expected: command exits 0 and `.superpowers/reports/lighthouse-home.json` exists. Performance, accessibility, best-practices, and SEO scores should be `0.9` or higher. If Chrome is unavailable in the environment, capture the error text and complete the manual checks in the following steps.

- [ ] **Step 3: Run supporting-page Lighthouse audits**

Run:

```powershell
npx --yes lighthouse http://127.0.0.1:8000/privacy-policy.html --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless" --output=json --output-path=.superpowers/reports/lighthouse-privacy.json
npx --yes lighthouse http://127.0.0.1:8000/404.html --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless" --output=json --output-path=.superpowers/reports/lighthouse-404.json
```

Expected: both commands exit 0 and reports exist. Scores should be `0.9` or higher. If Chrome is unavailable in the environment, capture the error text and complete the manual checks in the following steps.

- [ ] **Step 4: Verify consent behavior manually**

In the browser console on `http://127.0.0.1:8000/`, run:

```javascript
localStorage.removeItem("akumulatory_analytics_consent");
document.querySelector('script[data-analytics-umami]');
```

Expected: result is `null` before accepting consent.

Click `Odrzuć`, reload, and run:

```javascript
document.querySelector('script[data-analytics-umami]');
```

Expected: result is `null`.

Click `Ustawienia prywatności`, then `Akceptuję statystyki`, and run:

```javascript
document.querySelector('script[data-analytics-umami]') !== null;
```

Expected: result is `true`.

- [ ] **Step 5: Verify responsive visual layout**

Use the in-app browser or Playwright viewport controls. Check:

```text
Desktop 1440x1000:
- Hero phone CTA visible above fold.
- Hero secondary CTA points to #jak-dzialamy and scrolls to the section.
- Dark navy appears primarily in contact/footer/action areas.
- Contact action rail contains phone, email, and office/map.
- Footer has no Freepik or Flaticon attribution.

Mobile 390x844:
- Hero heading, copy, and both CTAs fit without overlap.
- Trust rail items stack cleanly.
- Jak działamy cards are readable.
- Contact rail actions fit, including email wrapping.
- Cookie consent banner does not cover primary hero CTA after first decision.
```

- [ ] **Step 6: Verify keyboard and semantics**

Manual checks:

```text
- Tab order reaches hero phone CTA, Jak działamy CTA, inline phone link, contact phone, email, map, privacy settings, and consent buttons.
- Focus outline is visible on every interactive element.
- There is exactly one h1 on each page.
- Homepage heading order is h1 then h2 sections then h3 cards.
- Decorative contact illustration has empty alt.
- Hero image has meaningful alt text.
- All touch targets are at least 44px tall.
- At 200% browser zoom, text remains readable and controls do not overlap.
```

- [ ] **Step 7: Check console and network**

In browser DevTools:

```text
- No console errors on /, /privacy-policy.html, or /404.html.
- No request to fonts.googleapis.com or fonts.gstatic.com.
- No request to cloud.umami.is before consent is accepted.
- No 404s for local CSS, JS, image, favicon, or manifest assets.
```

- [ ] **Step 8: Commit verification notes only if a durable file was added**

Do not commit `.superpowers/reports/` because `.superpowers/` is ignored. If a durable verification note is added under `docs/`, commit it with:

```powershell
git add docs
git commit -m "docs: record modernization verification"
```

Expected: commit succeeds only when a durable docs file was intentionally added.

---

### Task 14: Final Review Before Completion

**Files:**
- Review: all modified files

- [ ] **Step 1: Review final diff**

Run:

```powershell
git status --short
git log --oneline -8
git diff --stat HEAD~10..HEAD
```

Expected: worktree is clean, recent commits correspond to this plan, and diff stat only covers planned files/assets.

- [ ] **Step 2: Run final reference scan**

Run:

```powershell
rg -n "output\.css|input\.css|fonts\.googleapis|fonts\.gstatic|Freepik|Flaticon|ic_|hero\.webp|contact-directions-illustration" index.html 404.html privacy-policy.html llms.txt llms-full.txt assets
```

Expected: no output and exit code 1.

- [ ] **Step 3: Run final copy scan**

Run:

```powershell
rg -n "\b(warsztat|punkt wymiany|pogotowie|24/7)\b|10 min|natychmiast|od ręki|błyskawicznie" index.html 404.html privacy-policy.html llms.txt llms-full.txt
```

Expected: no output and exit code 1.

- [ ] **Step 4: Prepare completion summary**

Summarize:

```text
- Homepage was rebuilt around diagnosis-first copy and medium-blue/dark-navy visual hierarchy.
- Contact section now says Kontakt i biuro and clarifies that work happens przy aucie.
- 404 and privacy policy now share the same visual system.
- Tailwind and Google Fonts were removed.
- Freepik/Flaticon references and old attributed assets were removed after reference scans.
- Lighthouse or manual a11y/performance results were recorded.
```

Use `superpowers:verification-before-completion` before claiming the work is complete.
