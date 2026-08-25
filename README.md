# Lumen website inspiration

Internal password-gated moodboard. Ask Niclas for the login.

The design moodboard is a sibling path with the same login:
[https://niclas-183.github.io/lumen-inspo/moodboard/](https://niclas-183.github.io/lumen-inspo/moodboard/).
Moodboard v2 (combined hero): [https://niclas-183.github.io/lumen-inspo/moodboard-v2/](https://niclas-183.github.io/lumen-inspo/moodboard-v2/).
A gallery session on this origin unlocks it. Review is: log in via `index.html`.
There is no login-free Pages copy of the moodboard.

## Share links

`token.html` turns the current session into a link that opens the moodboard
without a login: `index.html#k=<key>`. Log in via `index.html` first; without a
session it redirects there. It runs entirely in the browser — nothing is
uploaded, and the site stays a static GitHub Pages site with no hosting cost.

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
