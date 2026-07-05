# Homepage Modernization Design

Date: 2026-07-05

## Goal

Modernize the homepage outside the already-refined contact/directions block so the whole page feels consistent, current, and credible.

The selected direction is based on the original `Fast Help` concept, but softened to avoid implying a 24/7 emergency battery service. The page should make urgent visitors feel they can get a clear answer, while protecting the reputation of an owner-run business by not promising instant rescue or workshop-style service.

## Concept Lineage

The original visual exploration included three full-page directions:

- `Fast Help`: dark, action-oriented, focused on a visitor whose car may not start.
- `Local Expert`: calmer, more advisory, focused on trust and practical experience.
- `Clean Product Guide`: more catalog-like, focused on battery categories and product scanning.

The selected base was `Fast Help`, but the final direction is not an emergency-service concept. The durable interpretation of that choice is:

- Keep the strong visual hierarchy and visible phone CTA from `Fast Help`.
- Replace urgent rescue wording with diagnosis-first wording.
- Use medium blue for the hero instead of full dark navy, so the first screen feels important but not alarmist.
- Reserve dark navy mostly for real action/contact areas.
- Explain that testing and mounting happen at the car, not in a public workshop.

Brainstorm mockups were temporary review artifacts and are ignored from Git. This spec is the source of truth for future agents.

## Positioning

Primary positioning:

> Diagnosis-first battery help in Katowice: call, describe the symptoms, and get a clear next step.

Do:

- Sound useful, calm, and competent.
- Make the phone number easy to find.
- Explain that testing and mounting happen at the car.
- Mention that service can happen with customer-location travel or by arrangement near the company office.
- Preserve the refined contact section style: navy, yellow accents, rounded rails, strong headings.

Avoid:

- Do not imply a public workshop, service bay, or walk-in garage.
- Do not use `warsztat`, `punkt wymiany`, `pogotowie`, `24/7`, or guaranteed response-time language.
- Do not encourage users to drive to the office without contacting first.
- Do not repeat the same process copy in multiple sections.

## Visual Direction

Use the existing contact section as the style anchor, but reduce full dark-navy usage across the rest of the page.

Color hierarchy:

- Medium blue hero background: important and calm, less emergency-coded than full navy.
- Dark navy: real actions and anchors, especially contact rail, footer, small badges, and selected emphasis.
- White/light blue: explanatory and readability-heavy sections.
- Yellow: primary CTA, heading underlines, and small highlights only.

Dark areas should have a purpose:

- Signal real action areas.
- Create confidence.
- Guide contact conversion.

They should not be used as decoration or to make every section feel urgent.

## Final Homepage Structure

### 1. Hero

Purpose: address the stressful user moment while promising diagnosis, not instant rescue.

Background: medium blue.

Headline:

> Auto nie odpala? Sprawdźmy, czy winny jest akumulator.

Support copy:

> Zadzwoń, opisz objawy, a pomożemy ustalić, czy potrzebny jest nowy akumulator, test lub montaż przy aucie.

Primary CTA:

> Zadzwoń: 501 436 661

Secondary CTA:

> Jak działamy

The secondary CTA should scroll to the `Jak działamy` section, not to the address/contact block.

### 2. Trust Marker Rail

Purpose: support the hero without repeating process copy.

Treatment: light blue or white surface with navy text. It should be visually lighter than the actual contact action rail.

Items:

- Bez wymiany w ciemno
- Darmowy test akumulatora
- Dobór do auta i budżetu

### 3. Jak działamy

Purpose: explain the operating model and prevent misunderstanding that there is a workshop.

Treatment: calm explanatory section, not a dark action rail.

Content:

1. Zadzwoń i opisz objawy
   Ustalimy, czy problem może dotyczyć akumulatora.

2. Sprawdzimy akumulator i dobierzemy rozwiązanie
   Test oraz dobór wykonujemy z myślą o konkretnym aucie, jego wyposażeniu i budżecie.

3. Ustalimy montaż przy aucie
   Z dojazdem do klienta albo po umówieniu przy biurze firmy.

Do not add a prominent phone button here. If the section needs a next action, use only a subtle inline mention:

> Masz pytanie? Zadzwoń: 501 436 661

### 4. Services

Purpose: explain concrete services without overmarketing.

Suggested heading:

> Co możemy dla Ciebie zrobić

Service cards/rows:

- Darmowy test akumulatora
  Sprawdzamy, czy problemem jest akumulator, ładowanie czy sposób użytkowania.

- Dobór właściwego modelu
  Dobieramy akumulator do auta, wyposażenia, sposobu jazdy i budżetu.

- Montaż przy aucie
  Montaż wykonujemy po wcześniejszym ustaleniu szczegółów telefonicznie.

- Odbiór starego akumulatora
  Zużyty akumulator możesz zostawić do odpowiedniego recyklingu.

### 5. Brands

Purpose: trust and availability signal.

Suggested heading:

> Sprawdzone marki pod ręką

Suggested copy:

> Exide, Varta, Bosch, Centra i inne marki dobierane praktycznie do samochodu, sposobu jazdy i ceny.

Use the existing logo assets. Keep the section visually restrained.

### 6. Battery Types

Purpose: make the offer scannable.

Suggested heading:

> Rodzaje akumulatorów

Items:

- Samochodowe
  Do aut osobowych, dostawczych i systemów Start-Stop.

- Motocyklowe
  Na sezon, do regularnej jazdy i pewnego rozruchu.

- Trakcyjne
  Do pracy, maszyn, wózków i zastosowań specjalnych.

### 7. Contact And Office

Purpose: operational contact details, not process education.

Heading:

> Kontakt i biuro

Copy:

> Biuro firmy znajduje się przy ul. Miłej 8 w Katowicach-Giszowcu. Montaż i test akumulatora wykonujemy przy aucie: z dojazdem do klienta albo po umówieniu przy biurze.

Action rail:

- Zadzwoń: 501 436 661
- Napisz: dariusz.cieszynski@wp.pl
- Adres biura / mapa: Miła 8, Katowice-Giszowiec

The map/directions action may remain, but label the destination as office/address rather than service point or workshop.

Include hours:

> Godziny: pon.-pt. 9:00-21:00, sob. 9:00-20:00, niedz. 9:00-15:00

Do not repeat the `Jak działamy` steps in the contact section.

### 8. Footer

Keep the existing business/legal information and privacy controls. Update visual styling only as needed to match the modernized page.

## Related Pages

The visual modernization applies to the supporting static pages too:

### 404 Page

Update `404.html` so it feels like the same business and visual system as the modernized homepage.

Requirements:

- Use the same medium-blue/navy/yellow system.
- Use the same heading scale, underline treatment, button styling, and footer treatment.
- Provide a clear route back to the homepage.
- Include a lightweight contact option if useful, but do not turn the 404 page into another full sales page.
- Do not introduce workshop, emergency-service, or guaranteed response-time language.

### Privacy Policy

Update `privacy-policy.html` visually so it no longer feels older than the homepage.

Requirements:

- Keep the legal/privacy content intact unless a specific content correction is needed.
- Use the same typography, page background, header treatment, footer treatment, and link styling as the modernized site.
- Keep the content highly readable; this page should not become visually heavy or marketing-like.
- Preserve the privacy settings button and consent-related wording.
- Keep contact/help placement consistent with the homepage where repeated contact information appears.

## Implementation Notes

- Keep the site static and continue using the existing asset set.
- Keep the redesigned contact components as the strongest style reference.
- Replace old generic service/card copy with the final copy in this spec.
- Update metadata only if the final visible copy materially changes page positioning.
- Preserve phone and email tracking attributes where existing analytics events are already present.
- Ensure mobile layout keeps phone CTA, `Jak działamy`, and contact actions easy to scan.
- Review the CSS strategy instead of blindly keeping or removing Tailwind.
- Current `assets/output.css` is about 32 KB uncompressed, so Tailwind is not an obvious page-weight emergency by itself.
- If the implementation becomes mostly custom section CSS, replace Tailwind utilities with a small hand-authored stylesheet and remove unused Tailwind output.
- If Tailwind utilities remain the fastest maintainable path, keep generated CSS small, purged, and shared consistently across `index.html`, `404.html`, and `privacy-policy.html`.
- Avoid duplicating large inline style blocks across pages; prefer shared CSS for the common visual system.

## Verification

Before implementation is accepted:

- Check desktop and mobile layouts visually.
- Confirm there is no `warsztat`, `pogotowie`, `24/7`, or guaranteed response-time wording.
- Confirm the office/address copy does not imply walk-in workshop service.
- Confirm hero CTA phone number is visible above the fold.
- Confirm secondary CTA scrolls to `Jak działamy`.
- Confirm contact section contains phone, email, office address, hours, and the office clarification copy.
- Confirm `404.html` and `privacy-policy.html` visually match the modernized homepage system.
- Run an accessibility audit with Lighthouse or axe where available.
- Manually verify keyboard navigation, visible focus states, semantic headings, link purpose, target sizes, and 200% zoom.
- Check color contrast for medium-blue hero text, yellow CTA text, navy rails, and footer links.
- Confirm decorative images/icons use empty alt text and meaningful images have useful alt text.
- Run a performance audit with Lighthouse where available.
- Check page weight for `index.html`, `404.html`, `privacy-policy.html`, CSS, fonts, scripts, and images.
- Keep CSS transfer small; if CSS grows materially beyond the current `assets/output.css` baseline, justify it or reduce it.
- Ensure the LCP image is correctly sized, uses explicit dimensions, and keeps high fetch priority only when above the fold.
- Ensure below-fold product/brand/contact images remain lazy-loaded with explicit dimensions.
- Confirm there are no console errors, broken local asset links, or unexpected layout shifts.
- Confirm analytics consent behavior still works and no analytics loads before consent.
