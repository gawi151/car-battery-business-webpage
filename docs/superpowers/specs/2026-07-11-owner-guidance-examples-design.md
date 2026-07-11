# Owner Guidance Examples Design

Date: 2026-07-11

## Goal

Expand each of the six red owner-information cards into a plain-language interview aid that helps a non-marketing owner understand the decision, recognize possible answers, and formulate a publishable sentence without treating examples as confirmed business facts.

## Scope

Modify the six existing `.owner-todo` cards in `index.html`, add supporting presentation rules to `assets/site.css`, and extend `tests/verify-site.mjs`. Preserve the current public copy, section order, red card locations, contact details, analytics, and responsive behavior.

## Shared card structure

Every owner card contains these elements in this order:

1. Existing label: `DO UZUPEŁNIENIA Z WŁAŚCICIELEM`.
2. A short decision heading phrased in ordinary language.
3. The current direct question.
4. Guidance label: `PRZYKŁADY — NIE PUBLIKOWAĆ`.
5. A compact bulleted list of possible answers.
6. Template label: `SZABLON ODPOWIEDZI`.
7. A sample final sentence with bracketed blanks.
8. Notes label: `POTWIERDZONA ODPOWIEDŹ` followed by a visible blank writing area.

Examples and templates are editorial aids, not claims. The warning text appears in every card rather than relying on the surrounding red color.

## Card content

### 1. Service area

Decision heading: `Gdzie dokładnie realizowany jest dojazd?`

Examples:

- całe Katowice;
- tylko wskazane dzielnice;
- promień określony w kilometrach od Giszowca;
- dalsze lokalizacje po indywidualnym uzgodnieniu.

Template:

`Dojazd realizujemy na terenie [obszar]. Obsługę poza tym obszarem [zasada].`

### 2. Test, travel fee, and timing

Decision heading: `Co klient zapłaci i jak szybko można przyjechać?`

Examples are grouped by topic:

- test: bezpłatny zawsze / bezpłatny przy zakupie / płatny osobno;
- travel: bezpłatny / fixed fee / dependent on distance;
- timing: same day when available / agreed time window / individually scheduled.

The visible Polish wording uses `stała kwota` instead of the English phrase `fixed fee`.

Template:

`Test [zasada odpłatności]. Dojazd kosztuje [kwota lub zasada]. Zwykle możemy przyjechać [czas lub sposób ustalenia terminu].`

### 3. Battery availability

Decision heading: `Jak potwierdzana jest dostępność właściwego akumulatora?`

Examples:

- confirmation during the call after vehicle details are provided;
- confirmation after checking registration number or VIN;
- common models available immediately;
- unavailable models ordered for an agreed date.

Template:

`Dostępność potwierdzamy po podaniu [dane pojazdu]. [Zasada dla produktu niedostępnego od ręki].`

### 4. Payment and sales documents

Decision heading: `Jak klient może zapłacić i jaki dokument otrzyma?`

Examples:

- cash;
- card;
- BLIK;
- bank transfer;
- receipt;
- VAT invoice after providing the required details.

Template:

`Akceptujemy [formy płatności]. Klient otrzymuje [paragon/fakturę i zasady].`

### 5. Warranty

Decision heading: `Jak działa gwarancja i zgłoszenie problemu?`

Examples:

- manufacturer warranty for the period shown in the product documents;
- separate installation warranty, if offered;
- first contact by phone;
- required proof of purchase or warranty document;
- diagnostic appointment agreed individually.

Template:

`Akumulator jest objęty gwarancją [okres i podmiot]. Problem należy zgłosić [sposób], przygotowując [wymagane dokumenty].`

### 6. Other purchase or service conditions

Decision heading: `Czy klient powinien znać jeszcze inne warunki?`

Examples:

- collection or deposit rules for the old battery;
- safe access to the vehicle and parking requirements;
- Start-Stop adaptation or coding, if applicable;
- cancellation or changed-arrival rules;
- vehicle types or situations the service does not cover.

Template:

`Przed realizacją klient powinien wiedzieć, że [warunek]. W przypadku [sytuacja] obowiązuje [zasada].`

## Visual design

- Keep the existing pale-red card, dark-red border, and dark-red primary label.
- Decision headings use the page's navy color and are visually stronger than question text.
- Examples sit in a slightly darker red-tinted inset panel with compact bullets.
- Templates use a white inset panel with a dashed border so bracketed blanks look instructional rather than final.
- The confirmed-answer area is a minimum of two ruled lines suitable for printing or discussing on screen.
- Labels remain readable without color and use normal Polish capitalization except for the established uppercase editorial labels.
- Cards stack naturally on mobile with no horizontal scrolling.

## Accessibility

- Use headings or `<strong>` labels, paragraphs, and semantic lists.
- Do not use disabled inputs or fake form controls.
- Do not encode meaning with red alone.
- Keep body text at the site's normal readable size.
- Bracketed blanks are text examples, not required form fields.

## Verification

Automated checks assert that:

- there are still exactly six owner cards;
- every card contains the examples, template, and confirmed-answer labels;
- each card has a semantic list of possible answers;
- all six decision headings and templates are present;
- the new inset and writing-area classes have visible styles and are not hidden;
- existing site checks continue to pass.

Visual verification covers desktop and mobile views of representative cards in the hero, process, contact, and FAQ sections. The cards must remain scannable despite becoming taller, and the primary phone CTA must remain above the first hero card.

