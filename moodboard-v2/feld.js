/* Moodboard-Werkzeug: Bewegung der Variante 1 „Fotofeld" unter der Falz.
   Keine Dependencies. Zwei Dinge, mehr nicht:
     1. Reveal — Inhalte kommen beim Eintritt ins Bild von unten herauf.
     2. Entwickeln — die Fotos der Lichtkammer kommen aus dem Bad: das
        Bild startet abgedunkelt und klart mit dem Reveal auf. Das macht
        CSS allein (Transition an .is-in); hier hängt nichts extra dran.
   Progressive Enhancement: erst wenn dieses Skript läuft, darf CSS etwas
   ausblenden (Root-Klasse .f1-js). Ohne JS steht die Seite vollständig da.
   Wer Ruhe angemeldet hat (prefers-reduced-motion), bekommt Endzustände
   ohne Weg dazwischen. Das Varianten-Umschalten gehört hero-dither.js,
   der Serienstreifen slides.js — beides wird hier nicht angefasst. */
(function () {
  var page = document.getElementById("variant-1");
  if (!page) return;

  var reduced = !!(window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  var hasIO = typeof window.IntersectionObserver === "function";

  var reveals = Array.prototype.slice.call(page.querySelectorAll(".f1-reveal"));

  /* ---- Reveal ---------------------------------------------------------- */

  /* Ein Beobachter für alle Zellen. Wer einmal drin war, bleibt drin:
     nach dem Eintritt wird abgemeldet, damit beim Zurückscrollen nichts
     erneut anläuft. Die Staffelung steckt im Markup (--f1-d), nicht hier. */
  if (!reduced && hasIO && reveals.length) {
    document.documentElement.classList.add("f1-js");

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    reveals.forEach(function (el) { revealObserver.observe(el); });
  }
})();
