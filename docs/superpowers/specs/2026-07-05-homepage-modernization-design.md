# Homepage Modernization Design

Date: 2026-07-05

## Goal

Modernize the homepage outside the already-refined contact/directions block so the whole page feels consistent, current, and credible.

The selected direction is based on the original `Fast Help` concept, but softened to avoid implying a 24/7 emergency battery service. The page should make urgent visitors feel they can get a clear answer, while protecting the reputation of an owner-run business by not promising instant rescue or workshop-style service.

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

## Implementation Notes

- Keep the site static and continue using the existing asset set.
- Keep the redesigned contact components as the strongest style reference.
- Replace old generic service/card copy with the final copy in this spec.
- Update metadata only if the final visible copy materially changes page positioning.
- Preserve phone and email tracking attributes where existing analytics events are already present.
- Ensure mobile layout keeps phone CTA, `Jak działamy`, and contact actions easy to scan.

## Verification

Before implementation is accepted:

- Check desktop and mobile layouts visually.
- Confirm there is no `warsztat`, `pogotowie`, `24/7`, or guaranteed response-time wording.
- Confirm the office/address copy does not imply walk-in workshop service.
- Confirm hero CTA phone number is visible above the fold.
- Confirm secondary CTA scrolls to `Jak działamy`.
- Confirm contact section contains phone, email, office address, hours, and the office clarification copy.
