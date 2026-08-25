# Moodboard v2 — Function-density combined hero

Zwei volle Landingpages, gebaut als echte Homepage, nicht als Slide. Zwei
Varianten derselben kombinierten Richtung, umschaltbar über das schmale Pill
unten **und** die sticky Glass-Karte oben rechts (Tasten `1` / `2`). Die
sticky Steuerung bleibt beim Scrollen im Blick; beide Umschalter bleiben im
Takt. Desktop-first, Ziel 1440. Seit Issue #9 läuft die Design-Language jeder
Variante unter die Falz weiter — Fotofeld bleibt dunkles Feld, Editorial
bleibt Papier.

Auf Variante 1 liegt ein zweites **Moodboard-Werkzeug** (nicht Produkt-UI):
Hero-Dither des Fotofelds, berechnet zur Laufzeit aus
`assets/office_window_quiet.jpg` — Original, Raster (Bayer 8×8, Originalfarben),
Atkinson (1-Bit, Tinte `#26211A` auf Papier `#F6F0E4`), Halftone (Zeitungspunkte,
gleiche zwei Farben). Keine vorgerenderten JPEGs; Canvas nur, wenn ein Modus
aktiv ist. Auf Variante 2 ist das Werkzeug ausgeblendet.

## Unter der Falz (Issue #9)

Beide Varianten tragen dieselben acht Blöcke, in variantengerechter Sprache
und leicht unterschiedlicher Reihenfolge:

1. **Methode** — vier benannte Messgrößen, Levels-Kürze (V1 als dunkles
   Vier-Spalten-Raster, V2 als editoriale Hairline-Liste mit Lora-Zitat).
2. **Programm / Produkt tiefer** — Oberfläche als Beweis: V1 ein breites
   App-Fenster (Bio-Age-Trend, Schlaf, Aktivität, 6 Blutwerte, Privacy-
   Schalter), V2 Phone + Laborbericht. Dazu beschriftete Dichte-Referenzen
   aus dem Korpus (Bevel, Linear, Prenuvo) — als Referenz, nie als Lumen.
3. **Beweisstück (Forward-Artifact, ELM)** — V1 ein Einseiter-Mock mit
   PDF-CTA („ohne Registrierung"), V2 vier interne FAQ + derselbe CTA.
4. **Fotostrecke** — je drei bislang ungenutzte Fotos aus der Bibliothek,
   mit Mono-Caption und „Symbolbilder"-Credit.
5. **Datenschutz als eigener Abschnitt (Sillence)** — „Wer was sieht":
   Sie vs. Arbeitgeber, Trennung als Architektur, EU-Chip, DSGVO/AI-Act-
   Zeile (Stand 08/2026).
6. **Zwei Pfade** — Arbeitgeber (Gespräch) / Mitarbeitende (Konto
   aktivieren, freiwillig, privates Konto).
7. **Unparteilichkeit** — „Was wir nicht versprechen": keine Diagnosen,
   keine Heilung, keine Knappheit.
8. **Close** — ein CTA, knapper Footer (Impressum-artig, immer noch Lumen).

Die Nav ist jetzt sticky (Glass-Pill bleibt beim Scrollen) und die
Nav-Punkte verlinken auf die Sektionen der aktiven Variante
(`#v1-…` / `#v2-…`); der Announce-Link springt zum Beweisstück.

## Ansehen

- **GitHub Pages (Login):** [https://niclas-183.github.io/lumen-inspo/moodboard-v2/](https://niclas-183.github.io/lumen-inspo/moodboard-v2/) — gleiches Token-Gate wie Galerie und v1 (`lumen` / Session `lumen-inspo-session`). Ein Login entsperrt alle drei.
- **Share-Link:** `token.html` → `index.html#k=…` (Fragment, nie an den Server).
- **Review / von Disk:** `app.html` ist die unverschlüsselte Seite (kein Login). Nicht der Pages-Einstieg.

v1 in `../moodboard/` bleibt unberührt (kein Rewrite von `payload.bin` dort).

## Was kombiniert wurde

Die A/B/C-Trennung aus v1 ist aufgelöst. Beide Varianten tragen alle drei Anker
gleichzeitig — Mensch (C), Artefakt/Zahlen (B), ein Satz (A/Levels):

- **Variante 1 — Fotofeld.** Function/Levels-Register nach den Live-Captures
  (Aug 2026): das Foto *ist* die Seite (`office_window_quiet.jpg`, erwachsene
  Person bei der Arbeit, echtes Licht, dunkles Feld, per CSS-Zoom nah
  herangeholt). Schmale Ankündigungsleiste in Lumen-Grün (Forward-Artefakt:
  Programmübersicht als PDF), schwebende Liquid-Glass-Pill-Navigation mit
  Creme-CTA und Such-/Menü-Chrome, kursiver Serif-Satz, eine CTA in warmem
  Creme, Privacy-Chip **im** ersten Viewport (Sillence), und eine
  Kompetenz-Leiste an der Falz: 38 Blutwerte · Schlaf & Aktivität ·
  Biologisches Alter — Zahlen statt Logos, nichts erfunden.
- **Variante 2 — Editorial-Papier + gehobenes Artefakt.** Warmes Papierfeld,
  Mensch in echtem Tageslicht rechts angeschnitten
  (`person_window_daylight.jpg`), links Levels-knappe Copy mit Methoden-Chips.
  Das Produkt ist v1-Bs Idee, richtig gebaut: eine originale Lumen-Oberfläche
  (Bio-Age, Schlaf, Aktivität, drei Blutwerte, Privacy als *Schalter im
  Produkt*), die durch Kante, Hairline und dreistufigen Schatten wirklich
  **abhebt** und die Fotokante überlappt — kein Sticker auf der Seite mehr.

Fiske in einem Viewport: die Person trägt Wärme, Methode/Zahlen/Artefakt tragen
Kompetenz. Keine Verlustangst, keine Knappheit, keine Diagnose-Claims, keine
Superlative.

## Token-Entscheidungen

- **Typo:** Newsreader (Display, opsz auto, Gewicht 500) + IBM Plex Sans (UI) +
  IBM Plex Mono (Kicker, Chips, Datenlabels). **Lora 600 nur im Wordmark**
  (Lu + Herz-m + en); Headlines bleiben Newsreader.
- **Wordmark:** Inline-SVG (`assets/lumen-wordmark.svg`), `currentColor` für
  Lu/en (Creme auf dunklem Glas, Tinte `#26211A` auf hellem Nav), Herz-m fest
  in Brand-Gelb `#FCBA30`, Nav-Höhe ~24px.
- **Warme Neutrale statt Kühlgrau:** Papier `#F6F0E4`, Tinte `#26211A`,
  Hairlines `#E5DCCB` (~35–41° Farbton, niedrige Sättigung).
- **Amber als Hauch, nicht als Fläche:** `#FFF4E8` (amber.50) als
  Radial-Hauch auf dem Papierfeld, als Creme-CTA auf dem Dunkelfeld und als
  Hintergrund der Privacy-Zeile. Brand-Amber `#FCBA30` im Wordmark-Herz und
  als Statuspunkt im EU-Privacy-Chip (plus Fokusring des Switchers).
- **Akzent bleibt klinisches Grün** `#2E5E4E` (CTA auf hell, Schalter im
  Produkt) — karrieresicher, kein Consumer-Gelb.
- **Datenfarben** unverändert aus v1 (`sleep #5B7FA6`, `activity #4E8A70`,
  `bioage #A87B3B`, `labs #7A8B96`) — nur im Produkt-Wireframe, nie als Deko.
- **Glas:** nur die Navigation (und der Privacy-Chip auf dem Foto) —
  `backdrop-filter: blur(18px) saturate(1.15)` über Foto bzw. Papier, mit
  Hairline und Inset-Highlight. Kein Glas über allem.
- **Radien:** Pills (999) für Nav/CTA/Chips, 22px fürs Artefakt, 12px für
  Module. Die 40px-Karten des alten DS wurden nicht übernommen.

## Was vom alten DS (v0.3) abgelehnt wurde

Open Doodles, Blobatar und jede niedliche Illustration; Nunito als
Claim-Schrift; volle Gelbflächen / weiße Schrift auf `#FCBA30`;
Pitch-Deck-Layout; 40px-Radien. Ebenso aus v1: das 00–09-Briefing-Chrome,
der Schwarz-mit-Satz-Leerraum aus Richtung A und der flache Dashboard-Sticker
aus Richtung B.

## Copy-Register

Deutsch, Kompetenz-Präzision, ein Satz pro Slot:

- V1: „Gesundheit, die man messen kann." · Sub eine Zeile · CTA „Gespräch
  vereinbaren" · Chip „Daten bleiben in der EU" · Zeile „Arbeitgeber sehen nur
  anonymisierte Team-Trends."
- V2: „Gesund bleiben ist Arbeit." · Sub „Wir begleiten sie — ärztlich,
  messbar, für Ihr Team." · Privacy „Individuelle Werte bleiben individuell —
  auch gegenüber dem Arbeitgeber."
- Foto-Impartialität wie in v1: „Gestellte Szene — keine Kundin/Patientin."

## Dateien

- `index.html` — Login-Wall (AES-GCM, gleiches Session-Schema wie v1/Galerie).
- `app.html` — beide Varianten + Umschalter (klare Review-Kopie).
- `hero-dither.js` — sticky Variantenwechsel + Hero-Dither (Canvas, kein npm).
- `payload.bin` — verschlüsseltes `app.html` (LIN1 + Salt + Nonce + Ciphertext).
- `token.html` — Share-Link-Generator für `index.html#k=…`.
- `styles.css` — Tokens + Layout, ein File.
- `assets/` — Wordmark-SVG + acht Fotos aus `../moodboard/assets/photos/`
  sowie `assets/referenz/` mit drei beschrifteten Korpus-Screenshots
  (Credits und Regeln: `ASSETS.md`). Fotos bleiben Dateien, keine data-URIs.

Nach dem Unlock lösen relative URLs (`styles.css`, `assets/…`) wie gewohnt auf.
Einzige externe Abhängigkeit: Google Fonts.
