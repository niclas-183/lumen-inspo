# Assets — Lizenzen (Moodboard v2)

## Fotografie

Alle Dateien sind unveränderte Kopien aus `../moodboard/assets/photos/`
(dort am 24. Aug 2026 lizenzgeprüft und vendored, 2000px Langkante, JPEG q82).
Unsplash License / Pexels License: freie kommerzielle Nutzung, keine
Attribution erforderlich — wir attribuieren trotzdem.

| Datei (assets/) | Verwendung | Quelle | Fotograf:in | Lizenz |
|---|---|---|---|---|
| `office_window_quiet.jpg` | V1 Hero, Vollbild-Fotofeld (Dither + Paper-Filter zur Laufzeit, keine Extra-JPEGs) | https://unsplash.com/photos/person-works-on-laptop-near-large-window-with-plants-gkzP5awCZAQ | Oksana Demenko | Unsplash |
| `person_window_daylight.jpg` | V2 Hero, Fotospalte rechts | https://www.pexels.com/photo/woman-in-gray-long-sleeves-shirt-standing-beside-glass-window-8297155/ | Mikhail Nilov | Pexels |
| `sleep_morning_bed.jpg` | V1 Fotostrecke | https://unsplash.com/photos/white-bed-linen-near-white-window-curtain-dYgG6lSWlBY | Egor Myznik | Unsplash |
| `activity_ridge_walk.jpg` | V1 Fotostrecke | https://unsplash.com/photos/a-person-walking-on-a-path-in-a-foggy-landscape-fX7SogLi7Tg | Renāte Šnore | Unsplash |
| `labs_sample_tubes.jpg` | V1 Fotostrecke | https://unsplash.com/photos/blood-collection-tubes-in-laboratory-rack-0jE8ynV4mis | Testalize.me | Unsplash |
| `labs_pipette_researcher.jpg` | V2 Fotostrecke | https://unsplash.com/photos/woman-in-white-shirt-holding-white-ceramic-mug-lTlB51-XGP4 | National Cancer Institute | Unsplash |
| `warmth_hands_cup.jpg` | V2 Fotostrecke | https://unsplash.com/photos/person-holding-white-ceramic-cup-with-liquid-g6e641CiHFQ | SnapbyThree MY | Unsplash |
| `activity_park_pair.jpg` | V2 Fotostrecke | https://unsplash.com/photos/two-people-walk-on-a-foggy-path-through-bare-trees-sjZ4pNskdtc | T (@tanyabarrow) | Unsplash |

Alle Motive sind gestellte Szenen; das steht als Mono-Caption sichtbar im
jeweiligen Kontext („Gestellte Szene — keine Kundin/Patientin.",
„Symbolbilder — Unsplash, gestellte Szenen.").
Kein neues Stockmaterial wurde gescrapt.

## App-Store-Screenshots (Serienstreifen)

**Bewusste Ausnahme von der Marken-Regel aus Issue #12 — auf Anweisung.**
Sonst gilt weiterhin: keine fremden Produktoberflächen auf der Seite. Für den
Abschnitt „Marktumfeld" (`#v1-umfeld` / `#v2-umfeld`) sind zehn
App-Store-Screenshots **einer einzigen fremden App** interne Referenz fürs
Moodboard: eine geschlossene Bevel-Serie als Dichte-Referenz — wie ein
Anbieter Schlaf, Recovery und biologisches Alter über zehn Screens hinweg
darstellt. Auf Wunsch bewusst eine Serie statt eines Anbieter-Querschnitts.
Kein Lumen-Material, keine Vorlage zum Nachbauen, nichts davon geht in
Produkt-UI. Die Herkunft steht sichtbar unter dem Serienstreifen
(„App-Store-Screenshots — interne Referenz, nicht Lumen.") und im Alt-Text
jeder Karte. Marke und Screenshots gehören Starlight Tech LLC; keine
Partnerschaft, kein Vergleich, keine Wertung wird behauptet.

Quelle in allen Fällen: die `screenshotUrls` aus dem iTunes-Lookup zu
`trackId` 6456176249 (US-Storefront, Abruf 25. Aug 2026), hi-res-Rendition
`1284x2778bb`, danach auf 720×1560 beschnitten.

| Datei (assets/rondell/) | Kategorie (Caption) | App | Anbieter |
|---|---|---|---|
| `01-bevel-ueberblick.jpg` | Überblick | Bevel: AI Health Coach | Starlight Tech LLC |
| `02-bevel-schlaf.jpg` | Schlaf | Bevel: AI Health Coach | Starlight Tech LLC |
| `03-bevel-bioalter.jpg` | Biologisches Alter | Bevel: AI Health Coach | Starlight Tech LLC |
| `04-bevel-recovery.jpg` | Recovery | Bevel: AI Health Coach | Starlight Tech LLC |
| `05-bevel-energie.jpg` | Energie | Bevel: AI Health Coach | Starlight Tech LLC |
| `06-bevel-ziele.jpg` | Ziele | Bevel: AI Health Coach | Starlight Tech LLC |
| `07-bevel-datenfragen.jpg` | Datenfragen | Bevel: AI Health Coach | Starlight Tech LLC |
| `08-bevel-ernaehrung.jpg` | Ernährung | Bevel: AI Health Coach | Starlight Tech LLC |
| `09-bevel-wearables.jpg` | Wearables | Bevel: AI Health Coach | Starlight Tech LLC |
| `10-bevel-zyklus.jpg` | Zyklus | Bevel: AI Health Coach | Starlight Tech LLC |

## Schrift

Google Fonts, ein `<link>` mit `display=swap`:
Newsreader (opsz 6–72, 400/500/600) · IBM Plex Sans (400/500/600) ·
IBM Plex Mono (400/500) · Lora (600 aufrecht nur im Wordmark,
500 italic nur im Editorial-Zitat von V2). SIL Open Font License.

## Icons

Lucide (https://lucide.dev, ISC-Lizenz), als Inline-SVG eingebettet,
Stroke 1.7, `currentColor`: `lock`, `shield-check`, `moon`, `footprints`,
`activity`, `test-tube`, `arrow-right`, `search`, `menu`, `download`,
`check`, `x`, `building-2`, `user`. Keine weiteren Icon-Quellen,
keine selbst gezeichneten Illustrationen.

## Produkt-Oberflächen

App-Fenster (V1), Artefakt, Phone und Laborbericht (V2) sind originale
Lumen-Wireframes (HTML/CSS, Beispieldaten, deutsches Zahlenformat).
Kein Screenshot, kein Tracing von Function/Bevel/Oura/Whoop/Apple Health —
die fremden Screenshots im Serienstreifen stehen ausdrücklich daneben, nie
darin (siehe „App-Store-Screenshots (Serienstreifen)").
Der Einseiter in V1 ist ein HTML-Mock mit dem bestehenden Wordmark-SVG.

## Paper Shaders

`vendor/paper-shaders/` ist ein Vanilla-Subset von `@paper-design/shaders` 0.0.80
(Apache-2.0, Lost Coast Labs / Paper). Nur Fluted Glass, Halftone CMYK und
Paper Texture — für das Moodboard-Werkzeug auf Variante 1. LICENSE und NOTICE
liegen im Vendor-Ordner.
