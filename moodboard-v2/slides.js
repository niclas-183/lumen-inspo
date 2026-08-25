/* Moodboard-Werkzeug: Serienstreifen „Marktumfeld" — zehn App-Store-Karten
   flach nebeneinander, drei davon im Blick. Keine Dependencies.
   Progressive Enhancement: ohne JS und unter 720px bleibt die Reihe
   frei scrollbar, das Skript fasst den Track dort nicht an.
   Der Lauf pausiert, sobald niemand hinsieht: Zeiger drüber, Fokus drin,
   Tab versteckt, außerhalb des Viewports (dazu zählt auch die per
   [hidden] weggeschaltete Variante). */
(function () {
  var GAP = 24;             /* muss zu .slides-track gap passen */
  var VISIBLE = 3;          /* Karten im Blick */
  var INTERVAL = 4200;      /* ms bis zum nächsten Schritt */
  var MANUAL_PAUSE = 9000;  /* ms Ruhe nach einem Klick auf die Pfeile */
  var REWIND_SAFETY = 1100; /* ms Notausstieg, falls transitionend ausbleibt */

  var nodes = document.querySelectorAll("[data-slides]");
  if (!nodes.length) return;

  function mq(query) {
    return !!(window.matchMedia && window.matchMedia(query).matches);
  }

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  var instances = [];

  Array.prototype.forEach.call(nodes, function (root) {
    var viewport = root.querySelector(".slides-viewport");
    var track = root.querySelector(".slides-track");
    var slides = Array.prototype.slice.call(root.querySelectorAll(".slide"));
    var countEl = root.querySelector(".slides-count b");
    var buttons = Array.prototype.slice.call(root.querySelectorAll(".slides-btn"));
    if (!viewport || !track || slides.length <= VISIBLE) return;

    root.classList.remove("no-js");

    var inst = {
      root: root,
      viewport: viewport,
      track: track,
      slides: slides,
      countEl: countEl,
      index: 0,
      max: slides.length - VISIBLE,
      step: 0,
      timer: 0,
      rewindTimer: 0,
      holdUntil: 0,
      hover: false,
      focus: false,
      offscreen: true,
      mobile: mq("(max-width: 720px)"),
      reduced: mq("(prefers-reduced-motion: reduce)")
    };

    /* Reduzierte Bewegung: Pfeile bleiben, nur ohne Weg dazwischen. */
    if (inst.reduced) inst.track.style.transition = "none";

    function measure() {
      /* Abstand zweier Karten exakt (subpixelgenau) — offsetWidth rundet,
         und der Rundungsfehler summiert sich über sieben Schritte sichtbar. */
      inst.step = inst.slides[1]
        ? inst.slides[1].getBoundingClientRect().left - inst.slides[0].getBoundingClientRect().left
        : inst.slides[0].getBoundingClientRect().width + GAP;
    }

    function apply() {
      inst.track.style.transform = "translateX(-" + (inst.index * inst.step) + "px)";
      if (inst.countEl) inst.countEl.textContent = pad(inst.index + 1);
    }

    function clearRewind() {
      inst.track.classList.remove("is-rewinding");
      if (inst.rewindTimer) {
        window.clearTimeout(inst.rewindTimer);
        inst.rewindTimer = 0;
      }
    }

    inst.track.addEventListener("transitionend", function (e) {
      if (e.propertyName === "transform") clearRewind();
    });

    /* Automatik: ein Schritt weiter, am Ende zurück auf Anfang. */
    function advance() {
      if (inst.index >= inst.max) {
        inst.track.classList.add("is-rewinding");
        inst.index = 0;
        if (inst.rewindTimer) window.clearTimeout(inst.rewindTimer);
        inst.rewindTimer = window.setTimeout(clearRewind, REWIND_SAFETY);
      } else {
        clearRewind();
        inst.index += 1;
      }
      apply();
    }

    function stop() {
      if (!inst.timer) return;
      window.clearTimeout(inst.timer);
      inst.timer = 0;
    }

    function tick() {
      inst.timer = 0;
      /* Nach einem Klick erst wieder aufnehmen, wenn die Ruhe abgelaufen ist. */
      var rest = inst.holdUntil - Date.now();
      if (rest > 0) {
        inst.timer = window.setTimeout(tick, rest);
        return;
      }
      advance();
      inst.timer = window.setTimeout(tick, INTERVAL);
    }

    /* Bei reduzierter Bewegung läuft nichts von selbst — nur die Pfeile. */
    function start() {
      if (inst.timer || inst.mobile || inst.reduced) return;
      inst.timer = window.setTimeout(tick, INTERVAL);
    }

    inst.sync = function () {
      if (!inst.mobile && !inst.hover && !inst.focus && !inst.offscreen && !document.hidden) {
        stop();       /* Neustart heißt: die Wartezeit beginnt von vorn */
        start();
      } else {
        stop();
      }
    };

    /* Pfeile: ein Schritt, kein Umlauf, danach 9 s Ruhe für die Automatik. */
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var dir = parseInt(btn.getAttribute("data-dir"), 10) || 0;
        var next = inst.index + dir;
        if (next < 0) next = 0;
        if (next > inst.max) next = inst.max;
        clearRewind();
        if (!inst.step) measure();   /* Gurt und Hosenträger: ohne IO-Maß */
        inst.index = next;
        apply();
        inst.holdUntil = Date.now() + MANUAL_PAUSE;
        stop();
        start();
      });
    });

    viewport.addEventListener("pointerenter", function () {
      inst.hover = true; inst.sync();
    });
    viewport.addEventListener("pointerleave", function () {
      inst.hover = false; inst.sync();
    });

    root.addEventListener("focusin", function () {
      inst.focus = true; inst.sync();
    });
    root.addEventListener("focusout", function (e) {
      inst.focus = !!(e.relatedTarget && root.contains(e.relatedTarget));
      inst.sync();
    });

    if (window.IntersectionObserver) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          inst.offscreen = !entry.isIntersecting;
          /* Die per [hidden] geladene Variante hatte beim Start kein Maß
             (display:none misst 0) — beim ersten Sichtbarwerden nachholen. */
          if (!inst.offscreen && !inst.step) inst.relayout();
          inst.sync();
        });
      }, { threshold: 0.05 }).observe(root);
    } else {
      inst.offscreen = false;
    }

    /* Maß und Weg neu setzen — ohne Übergang, sonst rutscht es sichtbar. */
    inst.relayout = function () {
      var wasMobile = inst.mobile;
      inst.mobile = mq("(max-width: 720px)");

      if (inst.mobile) {
        if (!wasMobile) {
          stop();
          inst.track.style.transform = "";
        }
        return;
      }

      var prev = inst.track.style.transition;
      inst.track.style.transition = "none";
      measure();
      if (inst.index > inst.max) inst.index = inst.max;
      apply();
      /* erzwungener Reflow, damit der Übergang nicht nachträglich greift */
      void inst.track.offsetWidth;
      inst.track.style.transition = inst.reduced ? "none" : prev;

      if (wasMobile) inst.sync();
    };

    measure();
    if (!inst.mobile) apply();
    else if (inst.countEl) inst.countEl.textContent = pad(1);

    instances.push(inst);
    inst.sync();
  });

  if (!instances.length) return;

  var resizeTimer = 0;
  window.addEventListener("resize", function () {
    if (resizeTimer) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      resizeTimer = 0;
      instances.forEach(function (inst) { inst.relayout(); });
    }, 120);
  });

  document.addEventListener("visibilitychange", function () {
    instances.forEach(function (inst) { inst.sync(); });
  });
})();
