# Health-Homepages: Marketing-Rhetorik & visuelle Hebel

Analyse der **99** Sites mit `category=health` aus `stack.csv` (B2B/HR, Longevity, klinische Wellness, Wearables, Labs, Fitness). Evidenz: Live-Homepages (First Viewport + erster Scroll), nicht die verschlüsselte Gallery. Codebook: gemeinsames Frozen Codebook (englische `snake_case`-Werte). Prosa hier auf Deutsch.

**Abdeckung:** 99/99 Zeilen in `design/health-sites.csv`. Davon **81 high / 12 medium / 6 low** Confidence. Fünf Sites waren in dieser Umgebung durch Bot-Walls blockiert (Whoop/Cloudflare; AG1, Aware, Hydrow, Neko Health/Vercel) und tragen leere `levers` — sie zählen in den Nennern mit, verzerren aber die Muster nicht stark.

---

## 1. Frequenzen

### Hero-Typ (primär)

| hero_type | n | % |
|---|---:|---:|
| mixed | 29 | 29.3% |
| typography-led | 28 | 28.3% |
| human-photo | 22 | 22.2% |
| product-ui | 13 | 13.1% |
| video-loop | 3 | 3.0% |
| abstract-gradient | 2 | 2.0% |
| human-illustration | 2 | 2.0% |

### Human-Hero

| hero_has_human | n | % |
|---|---:|---:|
| no | 58 | 58.6% |
| yes | 41 | 41.4% |

**Lesart:** Mehr als die Hälfte der Health-Homepages verzichtet im Hero auf Menschen. Dominante Alternativen: Typografie auf dunklem/klinischem Feld oder Produkt-/App-Demo; `mixed` oft Produkt-UI + Mensch oder Typo + Foto.

### Farbfeld (`color_field`)

| color_field | n | % |
|---|---:|---:|
| clinical-white | 33 | 33.3% |
| editorial-paper | 22 | 22.2% |
| tech-black | 22 | 22.2% |
| other (meist full-bleed Foto) | 12 | 12.1% |
| brand-color-field | 10 | 10.1% |

Begleitend: Modus **light 58.6% / dark 30.3% / split 11.1%**; Chroma **muted 63.6%**; Temperatur **cool 41.4% / warm 34.3% / mixed 24.2%**; Accent **identity-color 67.7%** (Marke färbt CTAs/Highlights), CTA-only 21.2%, none 11.1%.

### Psychologische Hebel (Multi-Select; % der Sites mit Tag)

| lever | n | % |
|---|---:|---:|
| one-sentence-promise | 65 | 65.7% |
| competence-precision | 57 | 57.6% |
| transformation | 51 | 51.5% |
| single-cta | 44 | 44.4% |
| authority | 43 | 43.4% |
| product-as-demo | 36 | 36.4% |
| ritual-lifestyle | 32 | 32.3% |
| identity-aspiration | 31 | 31.3% |
| social-proof-numbers | 29 | 29.3% |
| specificity-named-method | 26 | 26.3% |
| social-proof-logos | 20 | 20.2% |
| regulatory-promotion | 18 | 18.2% |
| warmth-belonging | 13 | 13.1% |
| scarcity-exclusivity | 10 | 10.1% |
| regulatory-prevention | 8 | 8.1% |
| privacy-safety | 5 | 5.1% |
| loss-aversion | 3 | 3.0% |

---

## 2. Was in Health dominiert

1. **Ein-Satz-Versprechen + Kompetenz** — Fast zwei Drittel öffnen mit einer klaren Promise-Zeile; über die Hälfte signalisiert Messbarkeit/Präzision (Labs, Biomarker, Sensoren, Scores). Das ist Fiske **competence** als Standard-Trust-Move, oft ohne starke **warmth**.
2. **Transformation vor Verlustangst** — `transformation` ist häufig; explizite `loss-aversion` (Prospect Theory, Verlustframe) ist selten. Prevention (Higgins **prevention**) taucht gezielt bei Disease-/Scan-Brands auf, Promotion bei Energy/Performance/Wellness.
3. **Human-Photo ist häufig, aber nicht Default** — Lifestyle-Paare und Athleten (Prenuvo, Wearables) vs. serif-led Dark Heroes (Function, Levels) und Hardware-Stillleben (Oura).
4. **Clinical-white / editorial-paper / tech-black** teilen sich das Feld — „Cute Consumer Wellness“-Pastell ist nicht der Health-Mainstream in diesem Korpus; eher Klinik, Editorial oder Premium-Tech.
5. **Authority-Logos & Zahlen** — Universitäten, Presse, Ärzte-Badges und „160+ Tests / 6M Users“ sind der typische Trust-Stack; `privacy-safety` als sichtbarer Hero-Hebel ist selten.
6. **Product-as-demo** — App/Device im Hero ersetzt bei vielen Digital-Health-Brands den Menschen (Bevel, Oura, Fitness-Apps).

---

## 3. Konkrete Beispiele (URL + was der Besucher sieht)

1. **[Function Health](https://www.functionhealth.com/)** — Dunkler, typografiegeführter Hero: „Check your health.“ + „160+ lab tests“ / „$1 per day“. *Higgins regulatory-prevention* über „detecting 1000+ conditions“; Trust über Zahlenpräzision, nicht Warmth.
2. **[Levels](https://www.levelshealth.com/)** — Starkes Serif auf tech-black: „See how food affects your health.“ Expliziter Authority-Claim („most trusted name in metabolic health“) = Kompetenz ohne Produktfoto.
3. **[Oura](https://ouraring.com/)** — Produktfoto Ring 4 auf editorial-paper: „Subtle. Power.“ Identity-Aspiration über Luxus-Hardware; Sensoren sichtbar = competence-precision.
4. **[Bevel](https://www.bevel.health/)** — Phone + Watch UI auf clinical-white: „Your Connected Health Coach“ + „4.8 / 49.1K ratings“. Product-as-demo + Social-Proof-Zahlen.
5. **[Prenuvo](https://www.prenuvo.com/)** — Full-bleed Human-Photo (Paar im Park), Headline „See the full picture…“; Subline nennt Whole Body MRI + Biomarker (*specificity-named-method*). Warmth im Bild, Klinik im Text; Employers-Nav = B2B-Spur.
6. **[Superpower](https://superpower.com/)** — Lead-Modal mit Stanford/Harvard/UCSF/Oxford-Logos + „Join 150,000+“; Prevention-Copy („Reducing heart attack risk“). Authority + Zahlen als Trust; Aging/Energy als Desire.
7. **[Seed](https://seed.com/)** — „A life-changing health routine, built for your microbiome.“ Ritual-Lifestyle + Transformation auf editorial-paper.
8. **[Mavie](https://www.mavie.care/)** — Serif „My health. More life.“ auf dunklem Markengrün; Präventions-/B2B-Gesundheitston (Cookie-Banner verdeckt Teile, daher medium confidence).

---

## 4. Implikationen für eine seriöse B2B-Longevity-Marke (Lumen)

Ohne Lumen-Seite zu designen — Muster, die zum Stance passen (career-safe: Confidence, Relief, Pride, Belonging; Wärme über Typo/Fotografie; Ernst über Klinik/Longevity):

- **Competence first, Warmth second:** Der Korpus belohnt messbare Präzision (`competence-precision`, `specificity-named-method`, Zahlen). Warmth-Belonging ist selten im Hero — für B2B eher dosiert über Fotografie/Typografie als über Illustration/Cute.
- **Prevention klar benennen, aber nicht panisch:** Explizite `loss-aversion`-Rhetorik ist unüblich; starke Longevity-/Scan-Brands nutzen eher ruhige Prevention („detect“, „prevent before symptoms“) — Google/CEB-B2B-Emotionen (Acceptance/Recognition) passen besser zu Authority-Logos und Employer-Spuren als zu Fear-Ads.
- **Ein Versprechen, ein CTA:** `one-sentence-promise` + `single-cta` sind der Standard-Hook; Hero-Budget nicht mit Stats-Strips überladen — Zahlen als Trust unter der Promise, nicht als Dashboard-Ersatz.
- **Human vs. Produkt gezielt:** Human-Photo signalisiert Aspiration/Belonging (Prenuvo); Product-UI signalisiert Kontrolle/Kompetenz (Bevel/Oura); Typography-led Dark signalisiert klinischen Ernst (Function/Levels). Für B2B-Longevity sind die letzten beiden plus sparsame, erwachsene Fotografie die häufigsten „seriösen“ Register — OpenDoodles/Illustration ist im Korpus Rand (`human-illustration` 2%).
- **Farbregister:** Clinical-white und tech-black mit muted chroma dominieren seriöse Player; identity-color als Accent ist Normalfall. Editorial-paper wärmt ohne Consumer-Pastell.

---

## 5. Methode & Limits

- Index: `stack.csv` Spalte `category=health` (99 Unique Sites).
- Coding: First-Viewport-Screenshots (1440×900) + extrahierter Hero-Text; Bot-Walls als `confidence=low` ohne spekulative Hebel.
- Keine CMS-/Tech-Stack-Analyse (siehe bestehendes `stack.csv`).
- Keine neuen Codebook-Labels nötig → keine `health-label-additions.md`.
