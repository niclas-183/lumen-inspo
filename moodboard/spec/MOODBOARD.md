# Moodboard page architecture

What Grok 4.6 builds: **one** scrolling HTML page, `moodboard/index.html`, desktop-first at 1440, functional down to 375. It is an internal briefing artifact — a pattern wall with captions — **not** a marketing site, not a component-library docs site, not a gallery app. No nav bar with sections, no search, no dark-mode toggle. A single left-aligned column of sections with a sticky, small section index is allowed (text links only).

Page chrome: field `clinical_white`, ink `ink`, container 1200px, sections separated by `space_9` + 1px `line` hairline. Every section starts with: Plex Mono kicker (`01 — SYSTEM` …), Newsreader `heading_md` title, one-paragraph German intro (provided below, verbatim).

All captions on the page are German (verbatim from this file). Token names stay english snake_case.

Two tile types, visually distinct and never mixable:

- **Lumen-Muster tile** — built from tokens, contains only vendored assets and original wireframes. White/paper card, `radius_md`, `shadow_card`.
- **Referenz tile** — first-viewport capture of a real site. Always framed by a `tech_black` label bar (Plex Mono 12px, `paper_ink`): `REFERENZ — NICHT LUMEN · {BRAND} · {URL}`. Logos stay visible, nothing un-branded, no competitor chrome inside any Lumen mock. If a capture hits a bot wall: replace the image with a text tile quoting the URL + the composition notes given below — never fake a screenshot.

Reference captures: 1440×900, first viewport only, cookie banners dismissed if dismissible (otherwise capture with banner — honesty over beauty), saved to `assets/referenz/{slug}.jpg`, JPEG quality 80, max 400KB each. Grok captures these at build time; exact list + crop notes in `ASSETS.md §4`.

---

## Section order

### 00 — `intro` (Masthead)
- Title: „Lumen Moodboard — Muster, Referenzen, Lücken".
- Meta line (Plex Mono): `INTERN · STAND 24.08.2026 · BASIS: 150 HOMEPAGES (99 HEALTH, 39 SAAS, 12 BRAND)`.
- Three lines, verbatim:
  - „Das ist eine interne Mustertafel: drei Hero-Richtungen, ein Token-System, vier benannte Lücken."
  - „Das ist keine Website, kein MVP, kein Klon von Function, Bevel oder Linear."
  - „Referenzen sind als »Referenz — nicht Lumen« markiert und bleiben gebrandet."

### 01 — `system` (Systemtafel)
Intro: „Ein Feldsystem, zwei Schriften, eine Akzentfarbe. Alle Werte sind in tokens.css eingefroren — Implementierung ohne Geschmacksentscheidungen."
- Color row: chips for the 3 fields + ink family + accent pair + 5 data hues; each chip 96×64, `radius_xs`, labeled `token_name` + hex (Plex Mono 12px).
- Type specimen: Newsreader 72/56/36 line „Gesundheit, die man messen kann. — ÄÖÜß 44,6" and Plex Sans/Mono lines at 19/16/13/12. German glyphs mandatory in the specimen.
- Spacing/radius ruler: horizontal bars at 8/16/24/32/48/64/96/128 with labels; radius demo squares 2/6/12/20.
- Motion note as text tile: „Bewegung: 200 ms, einmal, 8 px. Sonst nichts."

### 02 — `richtung_a` (Typografie, klinisch)
Intro: „Richtung A: Der Satz ist der Hero. Tech-black, Serif, keine Menschen, kein UI. Kompetenz durch Präzision, Wärme durch Schrift."
- Full-width **Lumen-Muster tile**: the Direction A hero built exactly per `DIRECTIONS.md` (this is a static mock inside the moodboard, links dead, marked `MUSTER`).
- Beside/below, two **Referenz tiles**:
  - `https://www.functionhealth.com/` — caption: „Function: dunkles Feld, Serif-Promise, Zahlen als Vertrauensanker (»160+ lab tests«). Übernehmen: Ruhe und Präzision. Nicht übernehmen: US-Preisrhetorik (»$1 per day«)."
  - `https://www.levelshealth.com/` — caption: „Levels: Serif auf tech-black, Autoritätsclaim statt Produktfoto. Übernehmen: eine Zeile, ein Feld. Nicht übernehmen: Superlativ (»most trusted«) ohne Beleg."
- Gap caption row (Plex Mono): `WÄRME → SERIF & SIE-FORM · PRIVACY → HERO-ZEILE · UNPARTEILICHKEIT → »WAS LUMEN NICHT VERSPRICHT« · ARTEFAKT → SLOT UNTER DEM FOLD`.

### 03 — `richtung_b` (Produkt als Beweis)
Intro: „Richtung B: Das Instrument ist das Argument. Clinical-white, Original-Wireframe mit Schlaf, Aktivität, Bio-Age und Blutwerten — Datenschutz steht im Produkt, nicht im Footer."
- Full-width **Lumen-Muster tile**: Direction B hero incl. the complete dashboard wireframe.
- Three **Referenz tiles**:
  - `https://www.bevel.health/` — „Bevel: App-UI als Held, Social-Proof-Zahlen. Übernehmen: Produkt im ersten Screen. Nicht übernehmen: App-Store-Rating als Hauptargument — B2B braucht Team-Sicht."
  - `https://linear.app/` — „Linear: Kategorie-Satz über sichtbarem Werkzeug. Übernehmen: Satz + Instrument in einem Blick. Nicht übernehmen: SaaS-Dichte der Navigation."
  - `https://www.openevidence.com/` — „OpenEvidence: Die Homepage ist die Demo, Autorität als Suchfeld (HIPAA, NEJM). Übernehmen: Beweis statt Behauptung. Nicht übernehmen: Zero-Marketing-Kälte."
- Gap caption row analogous to 02.

### 04 — `richtung_c` (Mensch und Methode)
Intro: „Richtung C: Ein erwachsener Mensch in echtem Licht, die Klinik im Text. Editorial-paper, benannte Methode als Chips, Bildunterschrift statt Behauptung."
- Full-width **Lumen-Muster tile**: Direction C hero with `person_window_daylight.jpg`; variant strip below with the `activity_park_pair.jpg` full-bleed crop.
- Two **Referenz tiles**:
  - `https://www.prenuvo.com/` — „Prenuvo: Full-bleed-Menschen, Methode im Subtext (Whole-Body-MRI). Übernehmen: Wärme im Bild, Präzision im Text. Nicht übernehmen: US-Lifestyle-Casting."
  - `https://www.typology.com/` — „Typology: Diagnostik als Editorial (»Diagnostic de peau«), Person + Methode ohne Grinsen. Übernehmen: Ernst + Nähe. Nicht übernehmen: Beauty-Referenzen."
- Gap caption row analogous.

### 05 — `fotografie` (Bildsprache)
Intro: „Acht lizenzgeprüfte Bilder, ein Filter (saturate 0.85), eine Regel: Menschen sind erwachsen, beschäftigt und nicht fürs Foto da."
- Grid 4×2 of the vendored photos, each with caption: filename (Plex Mono) + role + „Foto: {photographer} / {source}". Roles verbatim:
  - `warmth_hands_cup.jpg` — „Wärme ohne Kitsch: Hand, Tasse, Tisch."
  - `sleep_morning_bed.jpg` — „Schlaf als Thema, ohne schlafende Models."
  - `activity_ridge_walk.jpg` — „Aktivität: zwei Menschen, Nebel, Distanz."
  - `activity_park_pair.jpg` — „Alltagsbewegung, kühles Licht — Prenuvo-Register ohne Casting."
  - `labs_sample_tubes.jpg` — „Blutwerte als Realität: Probenröhrchen, Tiefenschärfe."
  - `labs_pipette_researcher.jpg` — „Echte Forschung (NCI), keine Klinik-Stockfotos."
  - `office_window_quiet.jpg` — „B2B-Kontext: konzentriert, allein, Fensterlicht, Filmkorn."
  - `person_window_daylight.jpg` — „Der C-Held: erwachsen, ruhig, Tageslicht, Stadtblick."
- One **rejected row** (text-only tiles, no images): „Abgelehnt: Sonnenaufgangs-Flare, High-Five-Kollegen, Senioren-Symbolik, Bar-Porträts — Begründung siehe ASSETS.md."

### 06 — `luecken` (Vier Lücken)
Intro: „Der Korpus liefert Kompetenz im Überfluss und lässt vier Dinge weg. Lumen zeigt sie — als markierte Muster, nicht als Kopie."
- Four labeled tiles `GAP 1–4` (`editorial_paper` cards), each: corpus number, the Lumen pattern, where it sits in A/B/C (reproduce the matrix from `DIRECTIONS.md`):
  - `GAP 1 — WÄRME` „warmth-belonging: 13 % im Health-Korpus."
  - `GAP 2 — PRIVACY` „privacy-safety sichtbar im Hero: 5 %."
  - `GAP 3 — UNPARTEILICHKEIT` „»Was wir nicht versprechen« — im Korpus nicht gefunden."
  - `GAP 4 — ARTEFAKT` „Weiterleitbares Dokument im ersten Screen: nicht gefunden. Slot markiert, PDF folgt — hier bewusst leer."
- The GAP 4 tile contains the forward-artifact card mock with badge `SLOT — ARTEFAKT FOLGT`.

### 07 — `anti_muster` (Gegenbeispiele)
Intro: „Was Lumen nicht macht — mit einem echten Gegenbeispiel und vier benannten Verboten."
- One **Referenz tile** (counterexample, extra red-line treatment: 2px `data_alert` border):
  - `https://www.equinox.com/` — „Equinox: Countdown, »EXTENDED OFFER«, $200-Credit — Knappheitsrhetorik. Als Gegenbeispiel markiert: Für eine B2B-Gesundheitsmarke zerstört Scarcity genau das Vertrauen, das Sillence-Selektion braucht."
- Four text tiles (no images, `tech_black` cards): „OpenDoodles/Blobs & Pastell", „AI-Purple-Gradient + Inter-auf-Weiß", „Fear-Hero & Diagnoseversprechen", „Countdown & Fake-Knappheit". Each with one line why, e.g. „Illustration als Anker: 2 % im Health-Korpus — tot."

### 08 — `daten_register` (Original-Wireframe im Detail)
Intro: „Die vier Dashboard-Module in groß — damit niemand je einen Screenshot von Bevel, Oura oder Whoop einsetzt."
- The four B-dashboard modules rendered at 2-up size with annotation lines (Plex Mono) pointing at: tabular-nums, deutsche Zahlenformate, `data_alert` max 1×, privacy footer.
- Caption: „Alle Zahlen fiktiv, aber plausibel. Aggregiert, nie individuell."

### 09 — `fussnote` (Footer)
- Attribution block (photographers + licenses, from `ASSETS.md`), corpus note, link paths to the spec files in the repo. Plex Sans 13px `ink_muted`. No CTA, no logo wall, nothing clever.
