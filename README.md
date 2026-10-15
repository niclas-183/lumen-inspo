# Lumen website inspiration

Internal password-gated moodboard. Ask Niclas for the login.

The design moodboard is a sibling path with the same login:
[https://niclas-183.github.io/lumen-inspo/moodboard/](https://niclas-183.github.io/lumen-inspo/moodboard/).
Moodboard v2 (combined hero): [https://niclas-183.github.io/lumen-inspo/moodboard-v2/](https://niclas-183.github.io/lumen-inspo/moodboard-v2/).
A gallery session on this origin unlocks it (same browser tab). Share links:
`token.html` in each folder, after logging in.

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

`token.html` turns the current login session into a link that opens the
moodboard without a login: `index.html#k=<key>`. Log in via `index.html`, then
open `token.html` in the same tab (the session lives in `sessionStorage`) and
copy the link; without a session it redirects to the login. It runs entirely in
the browser — nothing is uploaded, and the site stays a static GitHub Pages
site with no hosting cost.

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

## What Pages publishes

Pages builds this repo with Jekyll (legacy build from `main`, `/`). Jekyll
skips every file and folder whose name starts with `_`, which is what keeps the
plaintext moodboard sources `moodboard/_app.html` and `moodboard-v2/_app.html`
off the site. **Do not add `.nojekyll`** — it would publish them again.
`_config.yml` keeps everything else as before (`.md` stays a raw file).

- `app.html` in both moodboard folders is only a redirect to the login.
- Edit `_app.html`, then re-seal `payload.bin` from it with the share-link key
  and the existing salt (fresh nonce). Rotating the salt kills every share link.
- `node --test tests/*.test.mjs` checks that no published HTML contains
  moodboard text, that `.nojekyll` is absent, and that each `payload.bin`
  matches its `_app.html` in size and keeps the salt.

This only gates Pages. The repo itself is public: `_app.html` is readable on
GitHub, and the Git history holds every earlier plaintext `app.html`. Only a
private repo (or a history rewrite plus moving the sources out of the public
tree) closes that.
