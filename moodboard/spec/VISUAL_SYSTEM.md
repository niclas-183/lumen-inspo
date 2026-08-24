# Lumen Visual System — locked

Status: **frozen**. Every value here exists as a variable in `../tokens.css`; that file is the machine-readable source of truth. This document says *why* and *how to use* each value. If prose and `tokens.css` ever disagree, `tokens.css` wins.

Scope: internal moodboard + hero directions A/B/C. Not a full product design system.

Evidence base: 150-site corpus coding (99 Health, 39 SaaS, 12 Brand, 24 Aug 2026; see `design/health-findings.md`, `design/saas-brand-findings.md` on PRs [#3](https://github.com/niclas-183/lumen-inspo/pull/3) and [#4](https://github.com/niclas-183/lumen-inspo/pull/4)). The corpus is light (58.6% Health / 60.8% SaaS+Brand), muted (63.6% / 86.3%), cool, and splits fields into clinical-white / editorial-paper / tech-black. Lumen adopts exactly these three fields and adds what the corpus under-delivers: warmth (13%), visible privacy (5%), impartiality, and a first-screen forward artifact.

---

## 1. Color

Three page fields, one ink family per field, one accent. No gradients anywhere. Never pure `#FFFFFF` or `#000000` — pure white reads as unstyled browser default, pure black clips photography shadows.

| token | hex | role |
|---|---|---|
| `--color_clinical_white` | `#F6F7F5` | Direction B page field; raised UI panels sitting on paper |
| `--color_editorial_paper` | `#F1EDE4` | Direction C page field; the system's warmth carrier — warmth comes from this field + photography, never from adding chroma |
| `--color_tech_black` | `#101412` | Direction A page field. Green-cast near-black: at 72px serif sizes a neutral `#111` looks blue on most LCDs; the 2-point green cast keeps it organic |
| `--color_ink` | `#1A1F1C` | headlines/body on light fields |
| `--color_ink_secondary` | `#4A524D` | sublines on light |
| `--color_ink_muted` | `#6A716B` | captions, meta on light |
| `--color_paper_ink` | `#F2F4F1` | text on tech_black |
| `--color_paper_ink_dim` | `#B8BFB9` | secondary text on tech_black |
| `--color_accent` | `#2E5E4E` | the only accent on light fields: CTA fill, text links. Muted clinical green — health-coded without wellness-teal or medical-blue clichés |
| `--color_accent_on_dark` | `#8FBFA9` | kickers and links on tech_black |
| `--color_line` / `--color_line_dark` | `#DDE1DB` / `#2A312C` | 1px hairlines; the system separates with hairlines, not with boxes-in-boxes |
| `--color_surface_raised` | `#FCFCFB` | dashboard module cards |

**Data palette** (`data_sleep #5B7FA6`, `data_activity #4E8A70`, `data_bioage #A87B3B`, `data_labs #7A8B96`, `data_alert #B4593C`): exists **only inside original Lumen dashboard wireframes**. Marketing surfaces never borrow data colors as decoration. `data_alert` appears at most once per module — an alert that is everywhere is an alarm, not information.

Contrast (WCAG 2.x, computed): `ink` on `clinical_white` 15.6:1 · `ink` on `editorial_paper` 14.3:1 · `accent` on `clinical_white` 6.9:1 · `accent` on `editorial_paper` 6.4:1 · `ink_secondary` on `editorial_paper` 6.9:1 · `paper_ink` on `tech_black` 16.8:1 · `paper_ink_dim` on `tech_black` 9.9:1 · `accent_on_dark` on `tech_black` 9.0:1 · `ink_muted` on `clinical_white` 4.7:1 (caption sizes only). Anything below 4.5:1 is banned for text.

**Do:** Direction B hero — `clinical_white` field, `ink` headline, one `accent` button, dashboard cards in `surface_raised` with `line` hairlines; the only saturated pixels on screen are the five data hues inside the wireframe, which is what makes the wireframe read as the living part of the page.
**Don't:** a teal-to-purple gradient behind the headline with white text — that is the generic-AI-landing register (banned in IMPLEMENTATION.md) and it kills the fluency effect of one dark sentence on one quiet field.

---

## 2. Type

Two families plus a mono, all Google Fonts (self-hostable, license-clean — see `ASSETS.md`).

- **Newsreader** (variable, `opsz` axis, weight 500) — display and headlines only, 26px and up. Justification against the references: it delivers the same high-contrast editorial-serif authority register that Function and Levels buy with licensed faces (Reckless/Tiempos territory) and Typology gets from its Parisian serif, but its cool, narrow drawing avoids the food-brand softness of the obvious free alternative (Fraunces). Locked. Optical size axis must be active (`font-optical-sizing: auto`) — that is the feature that makes it editorial at 72px instead of bookish.
- **IBM Plex Sans** (400/500/600) — body, UI, navigation, buttons. Justification: an engineered grotesque with true tabular figures — Lumen's credibility lives in numerals (biomarkers, bio-age deltas), and Plex renders `44,6` in a dashboard without digit-width wobble; it also escapes the Inter-on-white default the corpus is saturated with. Locked. Weight 700 is banned; emphasis comes from size and space, not from blackness.
- **IBM Plex Mono** (400/500) — kickers, data labels, meta lines. Uppercase + `0.06em` tracking at 12px only. Same superfamily, so the mono never fights the sans.

Scale (desktop; rem values in `tokens.css`): 72 / 56 / 36 / 26 / 19 / 16 / 13 / 12. One scale for all three directions — the directions differ in field and anchor, not in typography.

Numerals in data contexts always use `font-variant-numeric: tabular-nums`. German conventions everywhere: decimal comma (`44,6`), thin-space thousands (`8 412`), „German quotes".

**Do:** Direction A headline — Newsreader 500 at 72px, `-0.01em`, two lines max on `tech_black`; the serif *is* the warmth on this field, no image needed.
**Don't:** Newsreader for a dashboard axis label — serif at 12px reads as a newspaper footnote, not an instrument; data labels are Plex Mono uppercase.

---

## 3. Space, layout, radius, elevation

- **8pt scale** `--space_0 … --space_10` (4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192). The 4px step exists only inside data-viz internals (bar gaps, tick offsets). Any margin/padding not on this scale is a bug.
- **Grid:** 12 columns, 1200px max container, 32px gutter. Margins 64 (≥1440) / 48 (≥1024) / 32 (≥768) / 20 (375). Breakpoints: 1440, 1024, 768, 375.
- **Vertical rhythm:** moodboard sections separated by `--space_9` (128px); hero-internal blocks by `--space_4`/`--space_5`. Generosity is measured here — "premium" is banned as a word; 128px between sections is its replacement.
- **Radius:** 2 (chips) / 6 (buttons) / 12 (cards, photos) / 20 (outer device frame). Clinical means small radii; anything rounder than 20px drifts toward consumer-wellness. Pills (`radius_full`) only for 8px status dots.
- **Elevation:** exactly one shadow (`--shadow_card`), only on light fields, only on dashboard cards and the forward-artifact card. Nothing floats on `tech_black` — dark-field separation uses `line_dark` hairlines.

**Do:** dashboard module — `surface_raised`, `radius_md`, `shadow_card`, internal padding `--space_4`.
**Don't:** stacked "glassmorphism" cards with blur and three shadow layers — depth theater signals template, and Sillence says design look is the rejection filter.

---

## 4. Motion

Almost none, and the restraint is the message: instruments do not bounce.

- Hover: 120ms color/opacity.
- Section entrance: one fade-up per section max — opacity 0→1, translateY 8px→0, 200ms, `cubic-bezier(0.2, 0, 0, 1)`, triggered once.
- Banned: parallax, scroll-jacking, autoplay video, marquees, animated gradients, number counters counting up, skeleton shimmer.
- `prefers-reduced-motion: reduce` zeroes all durations (already in `tokens.css`).

---

## 5. Photography

Sources: only the eight vendored files in `../assets/photos/` (verified licenses in `ASSETS.md`). Every photo gets `filter: saturate(0.85)` (`--photo_saturate`) — the corpus register is muted, and stock sources arrive 10–20% too saturated. No duotones, no color grading beyond that single filter, no overlays except `--photo_overlay_dark` when text must sit on a photo (Direction C full-bleed variant only).

Subject rules (already enforced in the vendored selection — listed so future swaps hold the line):

1. Adults, quiet, specific. Hands, labs, offices, morning light, mid-distance figures.
2. No direct-to-camera grins, no gym-bro, no spa-cute, no influencer wellness, no smoothie bowls.
3. Faces appear in at most two assets (`person_window_daylight`, `labs_pipette_researcher`); everywhere else people are anonymous by composition (distance, back, crop) — which is also the privacy stance made visual.
4. Light is natural and directional (window, fog, overcast). No studio strobes, no golden-hour flare (one candidate was rejected for exactly this).
5. Crops at `radius_md` inside cards; full-bleed only in Direction C.

**Do:** `office_window_quiet.jpg` beside B2B copy — a single person working in a Berlin library window, film grain, nobody performing for the camera; belonging without a grin.
**Don't:** a stock photo of two colleagues high-fiving over a laptop (a rejected candidate literally titled "doing high-five coworking") — Fiske-warmth cannot be faked with teeth.

---

## 6. Iconography & illustration

- Icons: **Lucide**, 1.5px stroke, 16/20/24px, `currentColor` only. Exact set in `ASSETS.md` (12 icons). No filled icons, no two-tone.
- Illustration: **none**. Corpus: illustration-anchored health heroes are 2%. OpenDoodles/blobs are a stated non-goal. The only "drawings" in the system are original data wireframes.
- Logos of other companies: only inside „Referenz — nicht Lumen" tiles, never inside a Lumen pattern tile.

---

## 7. Language & tone (for placeholder copy on the moodboard)

German, Sie-Form, verb-led, no exclamation marks, no "Jetzt"-urgency. Numbers are precise (`38 Biomarker`, not `viele Werte`). Every promise sentence must be one that a Betriebsärztin could read without wincing: no diagnosis claims, no "länger leben" guarantees. The words „Sicherheit", „anonymisiert", „keine Einzeldaten" are part of the visual system — they appear in fixed hero slots (see `DIRECTIONS.md`), not in footers.
