# Hero Directions A / B / C — fully specified

Three mutually exclusive first screens. Each direction owns exactly one anchor — **A: the sentence · B: the artifact · C: the person** — and explicitly bans the other two anchors from its first viewport. All three use the same tokens, the same grid (12 col / 1200px / 32px gutter), the same single-CTA rule, and all three must make the four corpus gaps visible: warmth, privacy, impartiality, forward artifact.

Copy below is **placeholder register copy** for the moodboard, not final brand copy. Character counts include spaces; they are hard limits because they encode the fluency principle (one short high-contrast sentence reads as true).

Shared rules (all directions):

- **CTA count = 1.** One button in the whole first viewport. Nav carries links only, no button. Ghost buttons, "secondary CTAs" and inline "oder …"-links next to the button are banned.
- **Nav:** 64px tall, wordmark left (`LUMEN`, Plex Sans 600, 15px, `0.08em` tracking), max 4 links right (Plex Sans 400, 15px): `Programm · Methode · Datenschutz · Kontakt`. `Datenschutz` is a first-class nav item, not a footer link — that is gap 2 at the peripheral-cue level (ELM: the first screen is scanned, not read).
- **Kicker** (above H1): Plex Mono 12px uppercase, 0.06em. ≤ 32 chars.
- **H1:** Newsreader 500. ≤ 2 lines at target size. German.
- **Subline:** Plex Sans 400, 19px, `ink_secondary` (or `paper_ink_dim`). 90–140 chars. Must name at least one concrete method component and one number.
- **Privacy line:** fixed hero slot, Plex Mono or Plex Sans 13px with Lucide `lock` (16px), phrasing from this pool (pick per direction, never all): „Individuelle Werte bleiben individuell." · „Arbeitgeber sehen nur anonymisierte Team-Trends." · „Auswertung nach GDPR, Server in der EU." One line, ≤ 90 chars + link „Wie wir Daten schützen →". Not a cookie-wall, not a legal paragraph.
- **Impartiality slot:** a visible link or line „Was Lumen nicht verspricht →" (gap 3). Placement per direction below. It links to a section, the moodboard only shows the slot.
- **Forward-artifact slot (gap 4):** a bordered card representing a takeaway document for the HR buying committee — Lucide `file-text` 20px, title „Programmübersicht für HR & Geschäftsführung", meta line „PDF · 8 Seiten · ohne Registrierung". **Slot only:** the moodboard labels it `SLOT — Artefakt folgt`, no fake PDF, no dead link. This is the ELM central route: the one element a CFO can forward.
- **Logo walls:** none in any hero. Corpus shows logo walls are a SaaS trust move (30.8% SaaS, 0% Brand) — Lumen may use employer logos *below* the fold later; the moodboard shows none.
- **Scarcity, countdowns, „nur noch X Plätze":** banned everywhere (Equinox is pinned as counterexample on the moodboard).

---

## Direction A — `typografie_klinisch` (typography-led clinical)

Register: Function / Levels. The sentence is the hero. Competence through precision of language and field; warmth through the serif and the Sie-Form, **no image, no UI, no human** in the first viewport.

**Field:** `tech_black`. Text `paper_ink`. Kicker & links `accent_on_dark`.

**Layout:** single column, text block left-aligned on columns 1–8 (of 12). Left-aligned, not centered — centered display serif on black drifts toward luxury-perfume; left alignment keeps it clinical. Vertical: nav 64px → `space_9` (128px) → kicker → `space_3` → H1 → `space_4` → subline → `space_6` (48px) → CTA → `space_4` → privacy line → flexible → competence strip pinned in the lower third.

**Hero anatomy (top → bottom):**

1. Nav (shared spec).
2. Kicker, ≤ 32 chars: `GESUNDHEITSVORSORGE FÜR TEAMS` (29).
3. H1, Newsreader 500, 72px, max 2 lines, **28–48 chars**:
   „Gesundheit, die man messen kann." (32)
4. Subline, 19px `paper_ink_dim`, 90–140 chars:
   „Blutwerte, Schlaf, Aktivität und biologisches Alter — ein ärztlich begleitetes Programm für Ihr Unternehmen." (108)
5. CTA (the only one): 52px height, `radius_sm`, fill `paper_ink`, text `tech_black`, Plex Sans 600 16px, label „Gespräch vereinbaren" (20). On this dark field the button is paper-colored — an `accent`-green button on near-black reads as terminal-UI.
6. Privacy line: `lock` + „Arbeitgeber sehen nur anonymisierte Team-Trends. Wie wir Daten schützen →" (73).
7. Competence strip (bottom of 100vh, above the fold line): Plex Mono 12px uppercase, three items separated by `·`, hairline `line_dark` above: `38 BIOMARKER · SCHLAF & AKTIVITÄT · BIOLOGISCHES ALTER`. Numbers instead of logos.

**In first 100vh:** items 1–7. Nothing else.
**Out (below fold or banned):** photography (banned in viewport 1 entirely), dashboards/UI, testimonials, logos, stats cards, any animation beyond the single fade-up. First element below fold = forward-artifact card on a `clinical_white` section — the dark-to-light cut marks the switch from promise to evidence.

**Warmth without a wall of text:** carried by (a) Newsreader's optical warmth at display size, (b) the verb-led Sie-copy, (c) the privacy line phrased as care for the employee, not compliance. Explicitly not by photos here — A is the direction that proves Lumen can be warm with type alone.

**Impartiality slot:** „Was Lumen nicht verspricht →" as the last line of the competence strip row, right-aligned, Plex Sans 13px `paper_ink_dim`.

**Kill criteria (what makes A fail):** if the H1 needs 3 lines, if a second button appears, or if anyone adds a glow/gradient to the black field.

---

## Direction B — `produkt_als_beweis` (product-as-demo)

Register: Bevel / Linear / OpenEvidence. The dashboard is the argument: category sentence + visible instrument. Competence through the artifact; the privacy story lives **inside** the artifact.

**Field:** `clinical_white`. Text `ink`. CTA `accent`.

**Layout:** split at ≥1024: text on columns 1–5, dashboard on columns 6–12, dashboard top-aligned with the H1 and allowed to bleed 64px past the right container edge (instrument larger than the frame = product bigger than the pitch). Below 1024: stacked, text first, dashboard at 100% width. Vertical: nav → `space_8` (96px) → content block.

**Hero anatomy:**

1. Nav (shared spec).
2. Kicker: `DAS PROGRAMM IM ÜBERBLICK` (25).
3. H1, Newsreader 500, 56px, **34–52 chars**:
   „Der messbare Gesundheitscheck für Ihr Team." (43)
4. Subline, 90–140 chars:
   „Lumen verbindet Bluttests, Schlaf- und Aktivitätsdaten zum biologischen Alter — dem einen Wert, den jeder versteht." (115)
5. CTA: `accent` fill, `clinical_white` text, 52px, „Demo ansehen" (12).
6. Impartiality line directly under the CTA, Plex Sans 13px `ink_muted`: „Beispieldaten. Lumen ersetzt keine ärztliche Diagnose." (54) — gap 3, placed where the eye lands after the button.
7. **The dashboard** (columns 6–12) — original wireframe, spec below.

**Dashboard wireframe — binding spec (this is the tile Grok builds; deviation = rejection):**

- Outer frame: `radius_lg`, 1px `line`, `shadow_card`, browser top-bar 44px with three 8px `radius_full` dots in `line` color and a centered url-pill (`radius_sm`, Plex Mono 12px, `ink_muted`): `app.lumen.health/team`.
- Header row inside: Plex Sans 500 16px „Team München — 132 Teilnehmende" left; Plex Mono 12px „LETZTE 30 TAGE" right.
- 2×2 module grid, gap `space_3`, each module `surface_raised`, `radius_md`, padding `space_4`, label row = Plex Mono 12px uppercase + Lucide icon 16px:
  - `SCHLAF` (`moon`): 7 vertical bars (Mo–So), values 6,4–7,9 h, bar fill `data_sleep`, bar width 12px, gap 8px, `radius_xs` tops; value line „Ø 7,1 h" Plex Sans 600 26px tabular.
  - `AKTIVITÄT` (`footprints`): 30-point sparkline, stroke 1.5px `data_activity`, no area fill; value „Ø 8 412 Schritte".
  - `BIOLOGISCHES ALTER` (`activity`): two figures side by side — „44,6" chronologisch (`ink_muted`) / „41,2" biologisch (`ink`, 36px) — plus delta chip `radius_xs`, `data_bioage` at 12% opacity fill, text `data_bioage`: „−3,4 Jahre".
  - `BLUTWERTE` (`test-tube`): 4 rows (LDL, HbA1c, Vitamin D, hs-CRP), each a 4px-high range bar in `data_labs` at 25% with a 8px position dot; exactly one dot (Vitamin D) sits at the range edge in `data_alert`.
- Privacy footer row spanning both columns, hairline above, `lock` 16px + Plex Sans 13px: „Aggregierte Ansicht — keine Einzeldaten für Arbeitgeber sichtbar." — gap 2 rendered as product truth, not as legal text.
- All numbers fictional-but-plausible; German number formatting; tabular-nums. **Never** a screenshot or tracing of Bevel/Oura/Whoop/Apple-Health. No donut charts, no smartwatch rings.

**In first 100vh:** nav, kicker, H1, subline, CTA, impartiality line, dashboard incl. privacy footer.
**Out:** photography (B is the no-photo direction), testimonials, logos, pricing, a second CTA. Forward-artifact card = first element below fold, left column, same width as the text block.

**Warmth:** the dashboard speaks about a *team* in a named city with a human count — data about people, not about a product; plus `editorial_paper` is banned here so the warmth budget is entirely in copy („den jeder versteht").

**Kill criteria:** any competitor UI resemblance, more than 5 data hues, a dashboard that claims diagnosis (e.g. red "risk" banners).

---

## Direction C — `mensch_und_methode` (human photograph + named method)

Register: Prenuvo / Typology. Real photographic warmth; the clinic lives in the text. Adult, specific, no stock-grin.

**Field:** `editorial_paper`. Text `ink`. CTA `accent`.

**Layout:** split at ≥1024: text on columns 1–6, photograph on columns 7–12 **bleeding to the right viewport edge and full hero height** (object-position 50% 40%). Photo: `assets/photos/person_window_daylight.jpg` (adult by an office window, daylight, calm — Pexels/Mikhail Nilov, verified) with `saturate(0.85)`. Alternate crop for the moodboard variant row: `activity_park_pair.jpg` full-bleed with `--photo_overlay_dark` and `paper_ink` text. Below 1024: photo first as 4:3, then text.

**Hero anatomy (text column):**

1. Nav (shared spec) — on `editorial_paper`.
2. Kicker: `VORSORGE MIT METHODE` (20).
3. H1, Newsreader 500, 56px, **30–52 chars**:
   „Gesund bleiben ist Arbeit. Wir begleiten sie." (45)
4. Subline, 90–140 chars:
   „Bluttest mit 38 Werten, Schlaf- und Aktivitätsanalyse, ärztliches Gespräch — als Programm für Ihre Mitarbeitenden." (114)
5. Method chips row (the „named method" made scannable): three chips, `radius_xs`, 1px `line`, Plex Mono 12px uppercase, transparent fill: `BLUTBILD · 38 WERTE` / `SCHLAF & AKTIVITÄT` / `BIOLOGISCHES ALTER`. Chips, not icons-with-blurbs — this is Typology's diagnostic register, not a feature grid.
6. CTA: `accent` fill, „Programm kennenlernen" (21).
7. Privacy line under CTA: `lock` + „Individuelle Werte bleiben individuell — auch gegenüber dem Arbeitgeber." (72).
8. Photo caption, bottom-left corner **on** the photo, Plex Mono 11–12px `paper_ink` on `photo_overlay_dark` strip: „Ergebnisgespräch, Berlin — gestellt, keine Patientin." — captioning the staging is the impartiality gesture (gap 3) done photographically: we do not pretend stock is a customer.

**In first 100vh:** items 1–8, photo full height.
**Out:** dashboards/UI (banned in C's first viewport), logos, testimonials, a second photo, any text on the photo except the caption strip. Forward-artifact card sits below fold on `clinical_white`.

**Warmth without kitsch, privacy without legal wall:** warmth = paper field + one real person in real light; privacy = one sentence + the anonymity-by-composition rule from `VISUAL_SYSTEM.md §5`; the legal depth stays behind the „Wie wir Daten schützen →" link.

**Kill criteria:** a smiling-into-camera photo swap, more than three chips, photo treated with a brand-color duotone.

---

## Gap coverage matrix (must be reproduced as captions on the moodboard)

| Gap (corpus evidence) | A | B | C |
|---|---|---|---|
| 1 Wärme (13% Health) | serif + Sie-copy | team framing in artifact | photograph + paper field |
| 2 Privacy (5% Health) | hero privacy line | privacy footer inside dashboard | privacy line + anonymity-by-composition |
| 3 Unparteilichkeit (–) | „Was Lumen nicht verspricht →" in strip | „Beispieldaten. Ersetzt keine Diagnose." under CTA | staging caption on photo |
| 4 Forward-Artefakt (–) | card below fold (SLOT) | card below fold (SLOT) | card below fold (SLOT) |

## Why not a fourth direction

A fourth plausible register exists in the corpus (hardware still-life, Oura/Teenage Engineering). Killed deliberately: Lumen's offer is a program (tests + data + physicians), not an object; a device hero would promise a gadget the company doesn't sell and would collide with the no-device-marketing asset rule. Three directions, mutually exclusive, is the full decision space: sentence / artifact / person.
