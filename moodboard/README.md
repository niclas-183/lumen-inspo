# Lumen Moodboard — internes Muster-Briefing

**Was das ist:** Die eingefrorene visuelle Systematik für Lumen (B2B-Gesundheits-/Longevity-Programm: Aktivität, Schlaf, Ernährung, biologisches Alter, Bluttests) — drei vollständig spezifizierte Hero-Richtungen, ein Token-System, geprüfte Bildquellen und die Bauanleitung für eine einzige scrollende Moodboard-Seite. Basis: Kodierung von 150 Live-Homepages (24.08.2026, PRs [#3](https://github.com/niclas-183/lumen-inspo/pull/3) und [#4](https://github.com/niclas-183/lumen-inspo/pull/4)).

**Was das nicht ist:** keine Lumen-Website, kein MVP, keine Komponenten-Doku, kein Klon von Function/Bevel/Linear. Die verschlüsselte Galerie, Login und `stack.csv` dieses Repos bleiben unberührt.

## Inhalt

| Datei | Inhalt |
|---|---|
| `tokens.css` | Eingefrorene Werte: Farben, Typo-Skala, 8-pt-Raster, Radien, Motion. Maschinenlesbare Wahrheit. |
| `spec/VISUAL_SYSTEM.md` | Warum und wie jeder Token benutzt wird; Kontrastpaare; Fotografie-Regeln; Do/Don't. |
| `spec/DIRECTIONS.md` | Richtung A (Typografie, klinisch) / B (Produkt als Beweis, Original-Dashboard) / C (Mensch + Methode) — Layout, Hero-Anatomie, deutsche Platzhalter-Copy, 100vh-Regeln, Gap-Matrix. |
| `spec/MOODBOARD.md` | Seitenarchitektur der HTML-Moodboard-Seite: 10 Sektionen, Referenz-URLs neben Lumen-Mustern, alle Captions wörtlich. |
| `spec/ASSETS.md` | Verifizierte Foto-Quellen + Lizenzen, Google-Fonts-Load, Lucide-Icon-Whitelist, Referenz-Capture-Liste mit Crop-Notizen. |
| `spec/IMPLEMENTATION.md` | Brief an den implementierenden Agenten (Grok 4.6): Stack, Dateibaum, Qualitätslatte, verbotene Abkürzungen. |
| `assets/photos/` | Acht lizenzgeprüfte, bereits einvendorte Bilder (Unsplash/Pexels). |

## Ansehen

- **GitHub Pages (Login):** [https://niclas-183.github.io/lumen-inspo/moodboard/](https://niclas-183.github.io/lumen-inspo/moodboard/) — `index.html` ist das gleiche Token-Gate wie die Galerie (User `lumen`, Session `lumen-inspo-session`). Share-Links über `moodboard/token.html` → `index.html#k=…`.
- **Review / von Disk:** `moodboard/app.html` ist die unverschlüsselte Scroll-Seite (kein Login). Nicht der Pages-Einstieg.

Die verschlüsselte Galerie, Login und `stack.csv` dieses Repos bleiben unberührt.
