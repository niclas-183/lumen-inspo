/* Moodboard-Werkzeug: Bewegung der Variante 4 „Licht". Keine Dependencies.
   Drei Dinge, mehr nicht:
     1. Reveal — Inhalte kommen beim Eintritt ins Bild von unten herauf.
     2. Count-up — die drei Kennzahlen des Ink-Bands zählen einmal hoch.
     3. Parallax — der Phone-Fächer im Hero atmet beim Scrollen mit.
   Progressive Enhancement: erst wenn dieses Skript läuft, darf CSS etwas
   ausblenden (Root-Klasse .w4-js). Ohne JS steht die Seite vollständig da.
   Wer Ruhe angemeldet hat (prefers-reduced-motion), bekommt Endzustände
   ohne Weg dazwischen. Das Varianten-Umschalten gehört hero-dither.js —
   hier wird es nicht angefasst. */
(function () {
  var page = document.getElementById("variant-4");
  if (!page) return;

  var reduced = !!(window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  var hasIO = typeof window.IntersectionObserver === "function";

  var reveals = Array.prototype.slice.call(page.querySelectorAll(".w4-reveal"));
  var counters = Array.prototype.slice.call(page.querySelectorAll("[data-count]"));

  /* ---- 1. Reveal ------------------------------------------------------ */

  if (!reduced && hasIO && reveals.length) {
    document.documentElement.classList.add("w4-js");

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---- 2. Count-up ---------------------------------------------------- */

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (!(target > 0)) return;
    var start = 0;
    var dur = 900;
    el.textContent = "0";
    function step(now) {
      if (!start) start = now;
      var t = Math.min((now - start) / dur, 1);
      el.textContent = String(Math.round(easeOut(t) * target));
      if (t < 1) window.requestAnimationFrame(step);
      else el.textContent = String(target);
    }
    window.requestAnimationFrame(step);
  }

  if (counters.length) {
    if (reduced || !hasIO) {
      /* Endwert steht bereits im Markup — nichts zu tun. */
    } else {
      var countObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          countObserver.unobserve(entry.target);
          countUp(entry.target);
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { countObserver.observe(el); });
    }
  }

  /* ---- 3. Parallax des Hero-Fächers ----------------------------------- */

  /* Nur auf breiten Fenstern und nur, solange der Hero im Bild ist. Der
     Faktor bleibt winzig (±0.05 der Scrollstrecke): die Phones sollen
     atmen, nicht wandern. Der Lift beim Hover läuft über eine zweite
     Custom-Property, damit sich beides nicht gegenseitig überschreibt. */
  var fan = page.querySelector(".w4-fan");
  var phones = fan ? Array.prototype.slice.call(fan.querySelectorAll(".w4-phone")) : [];
  var FACTORS = [0.05, -0.05, 0.03];

  if (!reduced && phones.length) {
    var ticking = false;
    var wide = false;

    function measure() {
      wide = window.innerWidth > 1100;
      if (!wide) {
        phones.forEach(function (p) { p.style.removeProperty("--w4-par"); });
      }
    }

    function apply() {
      ticking = false;
      if (!wide || page.hidden) return;
      var rect = fan.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      phones.forEach(function (p, i) {
        var f = FACTORS[i % FACTORS.length];
        var d = Math.max(-48, Math.min(48, y * f));
        p.style.setProperty("--w4-par", d.toFixed(2) + "px");
      });
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(apply);
    }

    measure();
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", function () { measure(); onScroll(); });
  }
})();
