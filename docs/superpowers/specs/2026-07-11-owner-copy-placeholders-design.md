# Owner Copy Placeholders Design

Date: 2026-07-11

## Goal

Update the homepage copy so it gives a clearer, more confident explanation of the mobile battery service while displaying every unknown owner-supplied fact as an unmistakable red placeholder in its intended final location.

## Scope

The work affects `index.html`, `assets/site.css`, and `tests/verify-site.mjs`. It does not change the privacy page, publishing workflow, analytics behavior, phone number, email address, company identifiers, address, brand list, or image assets.

## Confirmed copy changes

- Change the hero heading to `Test i wymiana akumulatora z dojazdem w Katowicach`.
- Explain that the customer calls with symptoms and that the battery and charging system are checked before replacement is proposed.
- Change the secondary hero CTA from `Wymiana z dojazdem` to `Jak wygląda usługa` while retaining its link to the process section.
- Replace repeated office and appointment caveats with one concise service-policy block.
- Retain the direct-owner positioning, known contact details, known company details, known office address, battery categories, and brand names.
- Rework the process into three customer-oriented steps: provide vehicle/symptoms/location, test battery and charging, replace only when needed.
- Replace repetitive FAQ content with the questions that require owner confirmation.

## Owner-information placeholders

Each unknown fact appears exactly where its final answer will live. Every placeholder uses the literal visible label `DO UZUPEŁNIENIA Z WŁAŚCICIELEM`, followed by a direct question. The questions cover:

1. Whether the battery and charging test is free without purchase, and whether a travel fee applies.
2. The usual response or arrival time and whether same-day service is offered.
3. The exact geographic service area outside Katowice-Giszowiec.
4. How battery availability is confirmed before travel.
5. Accepted payment methods and whether a receipt or VAT invoice is available.
6. Warranty terms for the battery and installation.

No answer, price, time, radius, payment method, stock promise, or warranty term may be inferred.

## Visual treatment

Owner placeholders are visually temporary and distinct from customer-facing content:

- pale red background;
- dark red left border and outline;
- dark red uppercase label;
- readable dark body text;
- no animation or dismiss control;
- full-width or card-width placement based on the surrounding section;
- responsive wrapping without horizontal overflow.

The red treatment is deliberately outside the site's normal blue/yellow visual language so the owner cannot mistake it for finished copy. Color is not the only signal; the visible label and question text communicate the placeholder state.

## Page structure

### Hero

Use only confirmed service wording. Add a compact red placeholder directly below the location line asking for the exact service area. The placeholder is visible above the fold on desktop when space permits and remains in natural reading order on mobile.

### Trust rail

Replace the unqualified `Darmowy test przed wymianą` claim with a factual `Test akumulatora i ładowania przed decyzją`. Keep the remaining service principles concise.

### Process

Use the revised three-step process. Place the test/travel-fee placeholder after the testing step and the response-time placeholder after the introductory copy or process list. Add one consolidated service-policy note explaining that work is performed at the vehicle, with travel or at Miła 8 after arranging it, and that Miła 8 is an office rather than a stationary workshop.

### Owner and brands

Keep the owner identity and direct-contact benefit. Remove the repeated standalone office warning. Add the battery-availability placeholder close to the brands section because availability is the practical question raised by the brand list.

### Contact

Keep the known telephone, email, address, and published contact hours, but do not present contact hours as service or opening hours. Remove duplicated non-workshop warnings. Add the payment/document placeholder beside the contact details.

### FAQ

Use a mixture of confirmed answers and red placeholders. Confirmed answers may explain what vehicle information to prepare and that diagnosis precedes replacement. Unknown commercial answers remain red. The warranty question appears here as a red placeholder.

## Accessibility

- Placeholder text must remain understandable without color.
- Use semantic headings or strong labels inside normal content containers.
- Do not use `role="alert"`, because these are editorial notes rather than urgent runtime errors.
- Maintain logical heading order and existing link semantics.
- Ensure red foreground/background choices have readable contrast.

## Verification

Automated tests will assert:

- the revised hero heading and secondary CTA are present;
- the old unqualified free-test claim is absent;
- all six owner questions and visible placeholder labels exist;
- placeholders are not hidden through CSS;
- red placeholder CSS includes a non-color text label and visible border treatment;
- the existing structural, analytics, local-reference, and JSON-LD checks still pass.

Visual verification will cover desktop and mobile-sized views of the hero, process, contact, and FAQ sections. The preview must make the red placeholders obvious while preserving readable customer content.

