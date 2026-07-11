import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const index = read("index.html");
const privacy = read("privacy-policy.html");
const notFound = read("404.html");
const sitemap = read("sitemap.xml");
const css = read("assets/site.css");
const consent = read("assets/analytics-consent.js");
const mobileCallBar = read("assets/mobile-call-bar.js");
const publisher = read("scripts/publish-gh-pages.mjs");

function assertFooterOutsideMain(html, page) {
  const mainClose = html.indexOf("</main>");
  const footerOpen = html.indexOf('<footer class="site-footer"');
  assert.ok(mainClose !== -1 && footerOpen > mainClose, `${page}: footer must be outside main`);
}

function assertFooterContactEvents(html, page) {
  const footer = html.slice(html.indexOf('<footer class="site-footer"'));
  assert.match(footer, /href="tel:\+48501436661"[^>]+data-umami-event="footer-phone-cta"/, `${page}: footer phone link must be tracked`);
  assert.match(footer, /href="mailto:dariusz\.cieszynski@wp\.pl"[^>]+data-umami-event="footer-email-cta"/, `${page}: footer email link must be tracked`);
}

function assertConsentBeforeMain(html, page) {
  assert.match(
    html,
    /<section id="analytics-consent"[^>]+aria-labelledby="analytics-consent-title"/,
    `${page}: consent region needs an accessible heading`
  );
  assert.ok(
    html.indexOf('id="analytics-consent"') < html.indexOf("<main"),
    `${page}: consent must be early in DOM order`
  );
}

function assertLocalReferencesExist(html, page) {
  const references = [
    ...html.matchAll(/(?:href|src)="\.\/([^"#?]+)"/g),
    ...html.matchAll(/(?:href|src)="\/([^"#?]*)"/g)
  ];

  for (const reference of references) {
    const path = reference[1] || "index.html";
    assert.doesNotThrow(() => read(path), `${page}: local asset/link must exist: ${path}`);
  }
}

assertFooterOutsideMain(index, "index.html");
assertFooterOutsideMain(privacy, "privacy-policy.html");
assertFooterContactEvents(index, "index.html");
assertFooterContactEvents(privacy, "privacy-policy.html");

assert.doesNotMatch(index, /"priceRange"/, "schema must omit unverified priceRange");
assert.doesNotMatch(index, /"openingHoursSpecification"/, "schema must not treat contact hours as opening hours");
assert.match(sitemap, /https:\/\/akumulatory-katowice\.pl\/privacy-policy\.html/, "sitemap must include privacy page");
assert.doesNotMatch(index, /class="brand-strip"\s+aria-label=/, "generic brand div must not have aria-label");
assertConsentBeforeMain(index, "index.html");
assertConsentBeforeMain(privacy, "privacy-policy.html");
assertConsentBeforeMain(notFound, "404.html");
const heroArea = index.match(/<p class="hero-area">([^<]+)<\/p>/);
assert.ok(heroArea, "homepage must contain a visible .hero-area paragraph");
assert.match(
  heroArea[1],
  /Katowice-Giszowiec/,
  "hero area must retain the confirmed Katowice-Giszowiec service location"
);
assert.match(
  index,
  /Test i wymiana akumulatora[\s\S]*z dojazdem[\s\S]*w Katowicach/,
  "hero must lead with test and replacement"
);
assert.match(index, />Jak wygląda usługa<\/a>/, "secondary hero CTA must describe navigation");
assert.equal(
  (index.match(/DO UZUPEŁNIENIA Z WŁAŚCICIELEM/g) || []).length,
  6,
  "homepage must show six owner placeholders"
);
for (const label of [
  "PRZYKŁADY — NIE PUBLIKOWAĆ",
  "SZABLON ODPOWIEDZI",
  "POTWIERDZONA ODPOWIEDŹ"
]) {
  assert.equal(
    (index.match(new RegExp(label, "g")) || []).length,
    6,
    `${label} must appear in every owner card`
  );
}
for (const className of [
  "owner-todo__heading",
  "owner-todo__examples",
  "owner-todo__template",
  "owner-todo__answer"
]) {
  assert.equal(
    (index.match(new RegExp(`class="${className}`, "g")) || []).length,
    6,
    `${className} must appear in every owner card`
  );
}
assert.equal(
  (index.match(/class="owner-todo__examples">[\s\S]*?<ul>/g) || []).length,
  6,
  "every owner card must present examples as a semantic list"
);
for (const heading of [
  "Gdzie dokładnie realizowany jest dojazd?",
  "Co klient zapłaci i jak szybko można przyjechać?",
  "Jak potwierdzana jest dostępność właściwego akumulatora?",
  "Jak klient może zapłacić i jaki dokument otrzyma?",
  "Jak działa gwarancja i zgłoszenie problemu?",
  "Czy klient powinien znać jeszcze inne warunki?"
]) {
  assert.match(index, new RegExp(heading.replace(/[?]/g, "\\?")), `missing owner heading: ${heading}`);
}
for (const ownerQuestion of [
  /darmowy bez zakupu/i,
  /koszt dojazdu/i,
  /czas dojazdu/i,
  /obszar dojazdu/i,
  /dostępność akumulatora/i,
  /formy płatności/i,
  /warancja/i
]) {
  assert.match(index, ownerQuestion, `homepage must ask owner question: ${ownerQuestion}`);
}
assert.doesNotMatch(
  index,
  /Darmowy test przed wymianą/,
  "homepage must remove the unqualified free-test claim"
);
assert.doesNotMatch(index, /bez sugerowania rozbudowanego warsztatu ani zespołu/, "owner copy must be positive and customer-facing");
assert.match(index, /class="mobile-call-bar"/, "homepage needs a mobile call bar");
assert.match(index, /data-hero-phone-cta/, "hero phone link must be observable by the mobile call bar script");
assert.match(index, /assets\/mobile-call-bar\.js/, "homepage must load the mobile call bar script");
assert.match(mobileCallBar, /IntersectionObserver/, "mobile call bar must track hero CTA visibility");
assert.match(
  css,
  /\.mobile-call-bar-visible\s+\.mobile-call-bar\s*\{[^}]*display:\s*flex;/s,
  "mobile call bar must only display after its visibility class is applied"
);
assert.match(css, /prefers-reduced-motion:\s*reduce/, "CSS needs reduced-motion handling");
assert.match(
  css,
  /\.not-found-visual img\s*\{[^}]*height:\s*auto;/s,
  "404 image must preserve its intrinsic aspect ratio"
);
assert.match(
  css,
  /\.owner-todo\s*\{[^}]*background:\s*#fff1f2;[^}]*border:/s,
  "owner placeholders need a pale red background and border"
);
assert.match(
  css,
  /\.owner-todo__label\s*\{[^}]*color:\s*#991b1b;/s,
  "owner placeholder labels need dark red text"
);
assert.doesNotMatch(
  css,
  /\.owner-todo\s*\{[^}]*display:\s*none;/s,
  "owner placeholders must remain visible"
);
assert.match(css, /\.owner-todo__examples\s*\{[^}]*background:/s, "owner examples need a visible inset panel");
assert.match(css, /\.owner-todo__template\s*\{[^}]*border:/s, "owner templates need a visible boundary");
assert.match(css, /\.owner-todo__answer span\s*\{[^}]*border-bottom:/s, "confirmed answers need writing lines");
assert.match(consent, /previouslyFocusedElement/, "consent script must track the settings trigger");
assert.match(consent, /\.focus\(\)/, "consent script must move and restore focus");
assert.match(publisher, /--dry-run/, "publisher must support a non-pushing dry run");
assert.match(publisher, /tests\/verify-site\.mjs/, "publisher must run site checks before publishing");
assert.match(publisher, /worktree add/, "publisher must isolate the gh-pages checkout");
assert.match(publisher, /HEAD:gh-pages/, "publisher must push only the isolated deployment commit");
for (const publicFile of ["index.html", "404.html", "privacy-policy.html", "robots.txt", "sitemap.xml", "llms.txt", "llms-full.txt", "CNAME"]) {
  assert.match(publisher, new RegExp(`"${publicFile.replace(".", "\\.")}"`), `publisher allowlist must include ${publicFile}`);
}

const jsonLdMatch = index.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert.ok(jsonLdMatch, "homepage must contain JSON-LD");
assert.doesNotThrow(() => JSON.parse(jsonLdMatch[1]), "JSON-LD must parse as JSON");

assertLocalReferencesExist(index, "index.html");
assertLocalReferencesExist(privacy, "privacy-policy.html");
assertLocalReferencesExist(notFound, "404.html");

console.log("Static site checks passed");
