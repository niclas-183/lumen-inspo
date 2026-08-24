# Assets — verified sources, licenses, downloads

Everything a Lumen pattern tile may contain is either (a) already vendored in `../assets/photos/` or (b) listed here with an exact fetch instruction. Grok downloads/uses these without choosing. Reference captures (gray zone, internal) are listed in §4 and are **never** vendored as Lumen patterns.

## 1. Photography (vendored — already in the repo)

All eight files were opened, visually reviewed and license-checked on 24 Aug 2026 by the design run. Unsplash License / Pexels License: free commercial use, no attribution required — we attribute anyway (moodboard footer + this file). Vendored at 2000px long edge, JPEG q82.

| file (assets/photos/) | source page (verified) | photographer | license |
|---|---|---|---|
| `warmth_hands_cup.jpg` | https://unsplash.com/photos/person-holding-white-ceramic-cup-with-liquid-g6e641CiHFQ | SnapbyThree MY | Unsplash |
| `sleep_morning_bed.jpg` | https://unsplash.com/photos/white-bed-linen-near-white-window-curtain-dYgG6lSWlBY | Egor Myznik | Unsplash |
| `activity_ridge_walk.jpg` | https://unsplash.com/photos/a-person-walking-on-a-path-in-a-foggy-landscape-fX7SogLi7Tg | Renāte Šnore | Unsplash |
| `activity_park_pair.jpg` | https://unsplash.com/photos/two-people-walk-on-a-foggy-path-through-bare-trees-sjZ4pNskdtc | T (@tanyabarrow) | Unsplash |
| `labs_sample_tubes.jpg` | https://unsplash.com/photos/blood-collection-tubes-in-laboratory-rack-0jE8ynV4mis | Testalize.me | Unsplash |
| `labs_pipette_researcher.jpg` | https://unsplash.com/photos/woman-in-white-shirt-holding-white-ceramic-mug-lTlB51-XGP4 | National Cancer Institute | Unsplash |
| `office_window_quiet.jpg` | https://unsplash.com/photos/person-works-on-laptop-near-large-window-with-plants-gkzP5awCZAQ | Oksana Demenko | Unsplash |
| `person_window_daylight.jpg` | https://www.pexels.com/photo/woman-in-gray-long-sleeves-shirt-standing-beside-glass-window-8297155/ | Mikhail Nilov | Pexels |

CDN originals (only needed if a re-download at other sizes is required):
`images.unsplash.com/photo-1498709112912-9be3173d30be` · `photo-1625476903534-ae531b76e8c9` · `photo-1660923150744-227ad0e09052` · `photo-1768383352204-723c96196be2` · `photo-1606206591513-adbfbdd7a177` · `photo-1583911860331-9fd6ce32c78f` · `photo-1769950268368-f927c5cab379` · `images.pexels.com/photos/8297155/pexels-photo-8297155.jpeg`. Append `?q=82&w=2000&fit=max` (Unsplash) / `?auto=compress&cs=tinysrgb&w=2000` (Pexels).

**Rejected during selection (do not "improve" by swapping these back in):** golden-hour coffee flare (Unsplash `MoPsHXxVQic`) — saturated sunrise violates the muted register; "high-five coworking" office stock (`E3TJIo5E9Gg`) — stock-grin; senior-woman window portraits (Getty/Unsplash+ premium) — not licensable and retirement-coded; bar/fashion portraits (`Zq7yALk1uZU`, `-p_HZ1et98U`) — wrong register; sunset swimmer (`W5-VHLhmgaA`) — consumer-romantic. Unsplash+ / `plus.unsplash.com` / Getty-on-Unsplash images are **banned** (paid license).

## 2. Type (Google Fonts — locked pair + mono)

Load exactly this (single `<link>`, `display=swap`):

```
https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap
```

- Newsreader — variable `opsz` 6–72; use weight 500 for display, 400 for pull-quotes. `font-optical-sizing: auto` required.
- IBM Plex Sans — 400/500/600. 700 banned.
- IBM Plex Mono — 400/500.
- No other font files, no Adobe Fonts, no local exotic display faces. (Justifications: `VISUAL_SYSTEM.md §2`.)

## 3. Icons (Lucide — exact set)

Source: https://lucide.dev (ISC license). Use inline SVG copied from the Lucide site or the `lucide-static` npm CDN (`https://unpkg.com/lucide-static/icons/{name}.svg`). Stroke 1.5, `currentColor`, sizes 16/20/24 only.

Whitelist (12): `lock`, `file-text`, `moon`, `footprints`, `activity`, `test-tube`, `shield-check`, `arrow-right`, `arrow-up-right`, `stethoscope`, `calendar`, `check`.
Anything not on this list needs a spec change, not an ad-hoc addition. Phosphor is the approved fallback family if a glyph is missing — same stroke discipline. Never trace icons from Linear/Stripe.

## 4. Reference captures (gray zone — internal briefing only)

Rules recap: label bar `REFERENZ — NICHT LUMEN · {BRAND} · {URL}` on every tile, logos untouched, no crops that could pass as Lumen, bot-wall ⇒ text tile with the composition notes below. Capture 1440×900, first viewport, JPEG q80 ≤ 400KB, into `assets/referenz/`.

| slug | URL | crop / composition notes (for captioning and as bot-wall fallback) |
|---|---|---|
| `function` | https://www.functionhealth.com/ | Dark typography-led hero: „Check your health." serif line, sublines „160+ lab tests" / „$1 per day". Capture full viewport incl. nav. |
| `levels` | https://www.levelshealth.com/ | Serif on tech-black: „See how food affects your health." + „most trusted name in metabolic health". Full viewport. |
| `bevel` | https://www.bevel.health/ | Clinical-white, phone+watch UI, „Your Connected Health Coach", rating „4.8 / 49.1K". Keep the device UI fully visible. |
| `linear` | https://linear.app/ | „The product development system for teams and agents" over dark issue-view (ENG-2703). Capture headline + UI edge together. |
| `openevidence` | https://www.openevidence.com/ | Homepage-as-demo: medical search field, HIPAA badge, NEJM/JAMA cards. Full viewport. |
| `prenuvo` | https://www.prenuvo.com/ | Full-bleed couple in park, „See the full picture", Whole-Body-MRI subline. Do not crop the people out. |
| `typology` | https://www.typology.com/ | Top-down: person in black among dozens of flacons, „Diagnostic de peau". Full viewport. |
| `equinox` | https://www.equinox.com/ | COUNTEREXAMPLE: dark sauna imagery, „EXTENDED: EQUINOX RESET OFFER", $200 credit, „JOIN NOW". Capture the offer banner — it is the exhibit. |

Known bot walls from the corpus run: Whoop (Cloudflare), AG1, Neko Health (Vercel wall) — none are on the list above, but if Function/Levels/etc. wall at build time, use the text-tile fallback verbatim from the notes column. Optional additional context (text mention only, no captures needed): https://ouraring.com/ (hardware still-life register we killed), https://stripe.com/, https://www.superhuman.com/, https://seed.com/, https://www.mavie.care/, https://superpower.com/, https://www.quo.com/, https://teenage.engineering/, https://www.equinox.com/, existing gallery https://niclas-183.github.io/lumen-inspo/.

## 5. Device / browser frames

Original CSS only, per `DIRECTIONS.md` Direction B: `radius_lg` outer, 44px top bar, three dots in `--color_line`, mono url-pill. No Apple marketing PSDs, no phone bezels traced from press kits, no `device-frame` libraries.
