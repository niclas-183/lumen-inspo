# SaaS- und Brand-Homepages: visuelle Rhetorik und psychologische Hebel

Stichprobe: **N = 51** öffentliche Homepages aus `stack.csv` (39 SaaS, 12 Brand). Kodierung am 24. August 2026 aus First Screen plus erstem Scroll der Live-URL, nicht aus den verschlüsselten Gallery-Screenshots. Fünf Seiten waren hinter Cloudflare- oder Client-Fehlerwänden (**Aesop, Lovable, Perplexity, Revolut, Spline**); sie bleiben in N, tragen aber kaum Hebel und `confidence=low`. Acht weitere sind `medium` (u. a. Scale-HTML statt Error-Screenshot, On-Running-HTML trotz Auth-Redirect, Spotify-Webplayer statt Kampagnen-Landingpage).

Theorie wird nur als Label an einem sichtbaren Element verwendet: Kahneman/Tversky (Verlust vs. Gewinn), Fiske (Wärme + Kompetenz), Higgins (Prevention vs. Promotion), Google/CEB 2013 (Anerkennung, Zugehörigkeit).

Zwei Hero-Labels wurden ergänzt, siehe `saas-brand-label-additions.md`: `environmental-photo`, `object-illustration`.

## Gesamt: Hero

| Hero-Typ (Primärbucket) | n | % |
|---|---:|---:|
| mixed | 21 | 41.2 |
| typography-led | 18 | 35.3 |
| human-photo | 6 | 11.8 |
| product-ui | 3 | 5.9 |
| video-loop | 2 | 3.9 |
| object-illustration | 1 | 2.0 |
| human-illustration / abstract-gradient / environmental-photo als *alleiniger* Typ | 0 | 0.0 |

Innerhalb von `mixed` dominiert fast immer **Produkt-UI plus Typografie** (Linear, Cal.com, Cursor, Attio, Quo, Granola, Krea, Webflow, Notion). Reine Illustration oder reiner Verlauf als alleiniger Anker sind selten; sie erscheinen als Zweitkomponente (ElevenLabs-Sphären, Stripe-Welle, Superhuman-Dämmerung).

| Human-Hero | n | % |
|---|---:|---:|
| no | 42 | 82.4 |
| yes | 9 | 17.6 |

Ein großer fotografischer Mensch ist in diesem Slice **atypisch**. Wo er vorkommt, sitzt er vor allem in Brand (Equinox, Typology, Plunge, Loop) plus drei SaaS-Ausnahmen (Superhuman, Limitless-Gründer, Friend). Mini-Avatare in UI-Chrome wurden nicht als Human-Hero gezählt.

## Gesamt: Farbfeld

| color_field | n | % |
|---|---:|---:|
| clinical-white | 20 | 39.2 |
| tech-black | 10 | 19.6 |
| editorial-paper | 9 | 17.6 |
| brand-color-field | 4 | 7.8 |
| other (benannte Foto-/Illustrationsfelder) | 8 | 15.7 |

Modus: light 31 (60.8 %), dark 17 (33.3 %), split 3 (5.9 %). Chroma: muted 44 (86.3 %), saturated 7 (13.7 %). Temperatur: cool 26 (51.0 %), warm 16 (31.4 %), mixed 9 (17.6 %). Akzent: identity-color 25, CTA-only 18, none 8.

Das dominante System ist also **hell, entsättigt, kühl, klinisch-weiß** — nicht Wellness-Pastell, nicht knalliges Consumer-Brand.

## Gesamt: Hebel (Anteil der 51 Sites mit Evidenz)

| Hebel | n | % der Sites |
|---|---:|---:|
| one-sentence-promise | 42 | 82.4 |
| competence-precision | 36 | 70.6 |
| regulatory-promotion | 28 | 54.9 |
| transformation | 28 | 54.9 |
| identity-aspiration | 27 | 52.9 |
| product-as-demo | 26 | 51.0 |
| authority | 19 | 37.3 |
| social-proof-numbers | 15 | 29.4 |
| specificity-named-method | 13 | 25.5 |
| social-proof-logos | 12 | 23.5 |
| regulatory-prevention | 11 | 21.6 |
| privacy-safety | 10 | 19.6 |
| ritual-lifestyle | 10 | 19.6 |
| single-cta | 9 | 17.6 |
| loss-aversion | 8 | 15.7 |
| scarcity-exclusivity | 8 | 15.7 |
| warmth-belonging | 7 | 13.7 |

**Typisch:** ein Satz, der die Kategorie definiert; Kompetenz über Präzision (UI, Specs, Superlative); Gewinn-Framing (Higgins Promotion); das Produkt selbst als Beweis.

**Selten:** Wärme/Zugehörigkeit, Knappheit, Verlustaversion, einzelner CTA, Ritual. Wo Wärme vorkommt, ist sie fotografisch oder editorial — nicht doodlehaft — außer Family, das als Gegenbeispiel markiert ist.

## SaaS vs. Brand

### SaaS (n = 39)

Hero: mixed 18 (46.2 %), typography-led 15 (38.5 %), human-photo nur 2 (5.1 %). Human-Hero **nein** bei 36/39 (92.3 %). Farbfeld: clinical-white 17 (43.6 %), tech-black 8 (20.5 %), editorial-paper 6 (15.4 %).

Hebel, die SaaS **dominieren**:

- one-sentence-promise 34/39 (87.2 %)
- competence-precision 29/39 (74.4 %)
- transformation 26/39 (66.7 %)
- regulatory-promotion 23/39 (59.0 %)
- product-as-demo 20/39 (51.3 %)
- social-proof-logos 12/39 (30.8 %) — fast nur SaaS; Brand hat 0 Logo-Wände in dieser Kodierung

SaaS-Hook: *„Wir sind das System für X“* plus sichtbare Oberfläche. Vertrauen kommt über Fiske-Kompetenz (Linear-Issue, Cursor-Agent, OpenEvidence-Suche) und Logo-/Zahlenproof (Vercel, Stripe, Clerk $50M, Quo 4.7/3300). Desire ist Promotion: shippen, skalieren, Revenue, Superpowers. Prevention taucht gezielt auf, wenn Verlust konkret ist: Resend vs. Spamordner, Quo vs. verpasste Calls, Opal vs. Bildschirmzeit, Anthropic vs. AI-Risiken.

### Brand (n = 12)

Hero: human-photo 4 (33.3 %), mixed 3, typography-led 3. Human-Hero **ja** bei 6/12 (50.0 %) — der klare Unterschied zu SaaS. Farbfeld breiter: clinical-white und editorial-paper je 3, dazu Sauna-, Outdoor- und Bathhouse-Felder.

Hebel, die Brand **dominieren**:

- identity-aspiration 9/12 (75.0 %)
- ritual-lifestyle 7/12 (58.3 %) vs. 3/39 SaaS
- scarcity-exclusivity 5/12 (41.7 %) vs. 3/39 SaaS
- transformation nur 2/12 (16.7 %) — Brand verkauft Haltung und Ritual, nicht Feature-Transformation

Brand-Hook: *„So sieht das Leben aus, das dieses Objekt möglich macht.“* Equinox/Plunge/Othership verkaufen Wärme-Rituale fotografisch; Typology und Teenage Engineering verkaufen Methode plus Editorial-Craft; Nothing koppelt Hardware an Subkultur-Identität. Social-proof-logos fehlen; Zahlen (Reviews) und Celebrity-Authority (Loop × Paris Hilton) ersetzen sie.

## Acht Belege (URL + was die Besucherin sieht)

1. **Linear** — https://linear.app/ — Nach der Navigation: weiße Headline *The product development system for teams and agents* über einer dunklen Issue-Ansicht (ENG-2703, Agent, Labels). Kompetenz ist die Demo selbst, nicht ein Gesicht.
2. **Stripe** — https://stripe.com/ — Weißes Feld, Sättigungs-Welle, *Financial infrastructure to grow your revenue*, Live-Zähler *Global GDP running on Stripe*, dann Amazon/NVIDIA/Google. Zahlen + Verlauf ersetzen Menschen.
3. **Quo** — https://www.quo.com/ — *Answer every call with the #1 rated business phone* plus 4.7 / 3300+ Reviews und Inbox-UI. Subline *never miss an opportunity, even after hours* ist Prospect Theory am Hero.
4. **OpenEvidence** — https://www.openevidence.com/ — Die Homepage *ist* die Produktdemo: *Ask a medical question…*, HIPAA, NEJM/JAMA-Karten. Autorität als Suchfeld, nicht als Lifestyle.
5. **Superhuman** — https://www.superhuman.com/ — Vollflächiges Dämmerungs-Porträt, *Superpowers, everywhere you work*, ein CTA *Get Superhuman*. SaaS, das Brand-Editorial stiehlt, ohne Wellness-Cute.
6. **Typology** — https://www.typology.com/ — Draufsicht: Person in Schwarz, Dutzende Flakons, *Diagnostic de peau*. Wärme über Fotografie, Ernst über benannte Methode.
7. **Equinox** — https://www.equinox.com/ — Dunkle Sauna, drei Körper, *EXTENDED: EQUINOX RESET OFFER*, $200 Spa credit, *JOIN NOW*. Ritual + Knappheit + Identitätsaspiration.
8. **Teenage Engineering** — https://teenage.engineering/ — *DAILY LIFE OF MR. UPDATE*, gezeichneter Tüftler, EP-133 2.5. Hardware-Ritual als Comic, Spezifität über Modellnummern.

## Was Lumen stehlen kann — ohne Consumer-Wellness

**Von SaaS-Craft (mitnehmen):**

- Ein-Satz-Kategorie, nicht Feature-Laundry. Linear/Vercel/Attio definieren das System, bevor sie Features listen.
- Produkt-als-Beweis auf dem ersten Screen. Für Lumen: ein ernstes Dashboard (Schlaf, Aktivität, Bio-Age, Laborwerte) in clinical-white oder editorial-paper, nicht ein Doodle.
- Kompetenz vor Wärme. Fiske: Wärme kommt später über Fotografie, nicht über Illustration. Logo- und Zahlenproof (Betriebe, Validierung, Präzision der Methode) statt Testimonial-Grin.
- Promotion für B2B-Emotionen (Google/CEB): *confidence, relief, pride, belonging* als „Teams shipten / Manager führen“ — Lattice *Succeeding Together*, Cursor *ambitious software*. Lumen analog: karrieresichere Souveränität, nicht Self-Care-Trost.
- Prevention nur dort, wo der Verlust konkret und erwachsen ist (verpasste Signale, unzuverlässige KI, Spam). Anthropic zeigt, wie Safety ohne Panic-Wellness klingt.

**Von Brand-Editorial (mitnehmen):**

- Wärme über Typografie und Fotografie, Ernst über klinische/editorial Felder. Typology und Clinique La Prairie sind die nächsten Nachbarn zu Longevity: Diagnose, Secret of Life, Switzerland — keine Pastell-Blobs.
- Ritual ohne Cute: Equinox-Sauna und Endel-Gerätezeile zeigen Praxis, nicht Motivation-Poster. Lumen kann Messung als tägliches Ritual zeigen (Gerät, Labor, Review), fotografisch, dunkel oder papierfarben.
- Identity-aspiration als berufliche Haltung, nicht als Subkultur-Gimmick. Nothing/Loop sind zu laut/celebrity; Teenage Engineering zeigt, dass Exzentrik über Craft geht, nicht über Influencer-Pink.

**Nicht stehlen:**

- Family-Blobs und Notion-Doodles (OpenDoodles-Risiko).
- Plunge-Countdown und Loop-Paris-Hilton: Consumer-Scarcity und Celebrity.
- Reine tech-black Agent-Ästhetik ohne Wärme — für Health/B2B zu kalt, außer in Produkt-UI-Inseln.
- Cloudflare-Wände als „Privacy-Theater“: das ist Infrastruktur, kein Marketing-Hebel.

**Kompakte Lumen-Formel aus diesem Slice:** heller oder papierfarbener Grund, ein Satz mit benannter Methode, sichtbare Oberfläche statt Hero-Mensch, Fotografie nur wenn sie Kompetenz oder Ritual trägt, Hebel-Mix aus `one-sentence-promise` + `competence-precision` + `product-as-demo` + `regulatory-promotion`, Wärme als Zugehörigkeit im Copy (Lattice/Granola), nicht als Illustration.
