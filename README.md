# Lumen website inspiration

Internal password-gated moodboard. Ask Niclas for the login.

The design moodboard is a sibling path with the same login:
[https://niclas-183.github.io/lumen-inspo/moodboard/](https://niclas-183.github.io/lumen-inspo/moodboard/).
Moodboard v2 (combined hero): [https://niclas-183.github.io/lumen-inspo/moodboard-v2/](https://niclas-183.github.io/lumen-inspo/moodboard-v2/).
A gallery session on this origin unlocks it. Share links: `moodboard/token.html`.

After unlock, every site card has two look-and-feel rating panes
(Niclas | Dominik) and an **Abgleich** view for overlap. See below.

## Look-and-feel ratings / Look-and-Feel-Bewertung

Two people rate independently, look-and-feel only (Typografie, Farbe/Material,
Layout/Rhythmus, Gesamtcharakter) on a 1–5 Likert. The mean of whatever is
filled in is the composite; partial ratings are allowed. Stored in
`localStorage` (`lumen-inspo-lookfeel-v1`), never in this public repo.

**Bewerten:** Galerie wie gewohnt entsperren. Pro Karte zwei Panes. Skala:
1 Schwach · 2 Eher nicht · 3 Mittel · 4 Gut · 5 Sehr gut. Klick speichert
sofort; nochmal dieselbe Zahl nimmt den Wert zurück. Oben: Fortschritt
(voll = alle vier Kriterien), Filter Alle / Unbewertet / Konsens / Uneinig,
**Abgleich**, Export, Import.

**Abgleich:** Shared likes = beide Mittelwerte ≥ 4, sortiert nach
`min(Niclas, Dominik)`, dann Mittelwert. Uneinig = |Δ| ≥ 1,5. Spearman nur
auf gemeinsam voll bewerteten Sites, plus eine kurze deutsche Einordnung.

**Dominiks Datei mergen / merging an export**

1. Dominik rates on his machine, then **Export JSON**.
2. Send the file (chat, mail) — do not commit it.
3. Niclas **Import JSON**. Merge is per rater: Dominik’s newer scores land,
   Niclas’ local scores are not wiped, even if the file contains an empty or
   stale Niclas object. Last-write-wins per rater+slug via `updatedAt`.

The overlay (`ratings.css`, `ratings-core.js`, `ratings.js`) is loaded by the
login shell after decrypt. `payload.bin` is not rewritten; existing share
links keep working. `tests/fixture.html` is six fake cards for the overlay,
not an ungated copy of the archive.

## Share links

`token.html` turns the password into a link that opens the moodboard without a
login: `index.html#k=<key>`. Open it, enter the password, copy the link. It runs
entirely in the browser — nothing is uploaded, and the site stays a static
GitHub Pages site with no hosting cost.

The key sits in the URL fragment, which browsers never send to the server and
never put in a `Referer` header, so it stays out of access logs.

Worth knowing before sharing one:

- **The link is the key.** Anyone who has it is in, and there is no record of
  who used it.
- **It does not expire.** The only way to withdraw a link is to re-encrypt
  `payload.bin` under a new password, which invalidates every link and the old
  password along with it.
- **It does not reveal the password**, so a leaked link does not hand over
  anything the password is also used for.
- This repo is public, so `payload.bin` is downloadable by anyone. The key is
  the only thing protecting the content — treat a share link like the archive
  itself.
