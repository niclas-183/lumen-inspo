# Moodboard v2 — Function-density combined hero

One first screen, gebaut als echte Homepage, nicht als Slide. Zwei Varianten
derselben kombinierten Richtung, umschaltbar über das schmale Pill unten
(oder Tasten `1` / `2`). Desktop-first, Ziel 1440×900. Kein AES-Gate — v1
in `../moodboard/` bleibt unberührt.

## Was kombiniert wurde

Die A/B/C-Trennung aus v1 ist aufgelöst. Beide Varianten tragen alle drei Anker
gleichzeitig — Mensch (C), Artefakt/Zahlen (B), ein Satz (A/Levels):

- **Variante 1 — Fotofeld.** Function/Levels-Register: das Foto *ist* die Seite
  (`office_window_quiet.jpg`, erwachsene Person bei der Arbeit, echtes Licht,
  dunkles Feld). Liquid-Glass-Navigation über dem Foto, ein Satz, eine CTA
  in warmem Creme, Privacy-Chip **im** ersten Viewport (Sillence), und eine
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
  IBM Plex Mono (Kicker, Chips, Datenlabels). Lora wurde geprüft und
  verworfen — zwei Serifen mischen wir nicht, Newsreader liest sich ernster.
- **Warme Neutrale statt Kühlgrau:** Papier `#F6F0E4`, Tinte `#26211A`,
  Hairlines `#E5DCCB` (~35–41° Farbton, niedrige Sättigung).
- **Amber als Hauch, nicht als Fläche:** `#FFF4E8` (amber.50) als
  Radial-Hauch auf dem Papierfeld, als Creme-CTA auf dem Dunkelfeld und als
  Hintergrund der Privacy-Zeile. Brand-Amber `#FCBA30` genau **einmal**
  sichtbar: der Statuspunkt im EU-Privacy-Chip (plus Fokusring des Switchers).
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

- `index.html` — beide Varianten + Umschalter (einzige JS-Logik).
- `styles.css` — Tokens + Layout, ein File.
- `assets/` — zwei Fotos, kopiert aus `../moodboard/assets/photos/`
  (Credits: `ASSETS.md`).

Nichts hotlinkt; einzige externe Abhängigkeit ist Google Fonts.
