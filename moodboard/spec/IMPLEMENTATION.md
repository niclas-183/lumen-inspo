# Implementation brief — addressed to Grok 4.6

You are implementing the internal Lumen moodboard from a frozen spec. Every taste decision has been made; your job is fidelity and craft. Where you feel an urge to improve, re-read the spec — the restraint is intentional. If something is genuinely unbuildable as specified, leave an HTML comment `<!-- SPEC-KONFLIKT: ... -->` at the spot and pick the closest compliant option; do not silently redesign.

## Read order

1. `../tokens.css` — the values. Import as-is, first stylesheet. Do not edit.
2. `VISUAL_SYSTEM.md` — how values are used (contrast pairs, photo filter, motion caps).
3. `DIRECTIONS.md` — the three hero mocks you will build as static tiles, incl. the binding dashboard wireframe spec.
4. `MOODBOARD.md` — page structure and all German captions, verbatim.
5. `ASSETS.md` — fonts link, icon whitelist, photos (already vendored), reference-capture list.

## Stack

Static HTML + CSS. **No React, no build step, no framework, no Tailwind.** Reasons: the artifact is one page with zero state; a build chain adds drift surface between tokens and output; and reviewers must be able to open `index.html` from disk. Vanilla JS is allowed for exactly two things, both optional: (1) the once-per-section fade-up via `IntersectionObserver` (must respect `prefers-reduced-motion`), (2) the sticky section index highlight. Hard cap ~40 lines, no dependencies.

Charts in the dashboard wireframe: hand-written inline SVG or plain divs. No chart libraries.

## File tree (target)

```
moodboard/
  index.html
  tokens.css              (exists — do not modify)
  moodboard.css           (all page styles; only var(--…) values from tokens.css)
  moodboard.js            (optional, ≤ ~40 lines)
  assets/
    photos/               (exists — 8 files, do not re-compress)
    referenz/             (you create — captures per ASSETS.md §4)
    icons/                (inline SVGs if you prefer files over inline markup)
  spec/                   (exists — the documents you are reading)
  README.md               (exists)
```

## Quality bar (each is checked in review)

1. **Token discipline:** `moodboard.css` contains no raw hex, no raw px for space/radius/type outside `var()` — grep-clean: `rg '#[0-9a-fA-F]{3,6}' moodboard.css` returns nothing.
2. **Typography:** Newsreader ≥ 26px only, `font-optical-sizing: auto`; Plex 700 nowhere; `tabular-nums` on every number in the dashboard; German quotes „ ", decimal commas, thin-space thousands (`8 412`).
3. **Hero mocks match `DIRECTIONS.md` literally** — copy strings, character-counted, unchanged; one CTA per mock; privacy/impartiality/artifact slots present and labeled.
4. **Dashboard:** the four modules exactly as specified; exactly one `data_alert` dot; privacy footer row present; zero resemblance to Bevel/Oura/Whoop/Apple-Health screenshots (no rings, no donuts).
5. **Referenz framing:** every capture inside the `tech_black` label bar `REFERENZ — NICHT LUMEN · BRAND · URL`; Equinox additionally gets the 2px `data_alert` border; bot-walled sites become text tiles with the composition notes — never a faked or stale screenshot, never an unbranded crop.
6. **Photos:** vendored files only, every `<img>` wrapped with `filter: saturate(var(--photo_saturate))`, alt texts in German describing content (not "image of").
7. **Accessibility floor:** semantic landmarks/headings, all text-color pairs from the contrast table in `VISUAL_SYSTEM.md §1`, focus-visible styles on links, `prefers-reduced-motion` kills all animation.
8. **Weight:** page loads with no layout shift (explicit `width`/`height` on images); total non-photo payload < 100KB; no external requests except Google Fonts and (at build time) the captures.
9. **Print:** the page must print legibly (it will be handed to stakeholders as PDF) — add a minimal `@media print` that drops shadows and the section index.

## Forbidden shortcuts (instant rejection)

- Lorem ipsum or any placeholder text — every string exists in `MOODBOARD.md`/`DIRECTIONS.md`.
- Generic AI-landing styling: purple/indigo gradients, glassmorphism, glow shadows, emoji in headings, hero blobs.
- Inter-on-white-with-blue-buttons defaults — the fonts and the accent are locked; using anything else means the tokens were bypassed.
- Dummy charts that look like Apple Health / competitor clones, screenshot-tracing, or importing a charting library's default theme.
- Un-branding a reference capture (cropping logos, recoloring) or placing competitor UI inside a Lumen phone/browser frame.
- Countdown timers, fake scarcity, fabricated testimonials, invented certifications/logos, a fake downloadable PDF in the artifact slot (it stays `SLOT — ARTEFAKT FOLGT`).
- Adding sections, a fourth direction, extra icons, extra colors, "bonus" dark mode.

## Definition of done

`index.html` opens from disk with all nine sections of `MOODBOARD.md` in order, all captions verbatim German, three direction mocks pixel-faithful to `DIRECTIONS.md`, reference captures labeled (or text-fallbacks), and the checks above pass. The design director will review against this list line by line — the standard is: a senior brand designer finds nothing to fix except things this spec already fixed.
