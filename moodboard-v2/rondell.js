/* Moodboard-Werkzeug: Rondell „Marktumfeld" — zehn App-Store-Karten auf einem
   3D-Ring. Keine Dependencies. Progressive Enhancement: ohne JS, bei
   reduzierter Bewegung und auf schmalen Viewports bleibt .no-3d (Reihe).
   Die Rotation läuft zeitbasiert (80 s pro Umdrehung) und pausiert, sobald
   niemand hinsieht: Zeiger drüber, Fokus drin, Tab versteckt, außerhalb des
   Viewports (dazu zählt auch die per [hidden] weggeschaltete Variante). */
(function () {
  var STEP = 36;          /* Grad zwischen zwei Karten (360 / 10) */
  var PERIOD = 80000;     /* ms pro Umdrehung */
  var RAD = Math.PI / 180;

  var nodes = document.querySelectorAll("[data-rondell]");
  if (!nodes.length) return;

  function reducedMotion() {
    if (!window.matchMedia) return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
           window.matchMedia("(max-width: 720px)").matches;
  }

  /* Reduzierte Bewegung: .no-3d bleibt, keine Schleife, keine Caption. */
  if (reducedMotion()) {
    nodes.forEach(function (root) {
      var cap = root.querySelector(".rondell-caption");
      if (cap) cap.textContent = "";
    });
    return;
  }

  var instances = [];

  nodes.forEach(function (root) {
    var ring = root.querySelector(".rondell-ring");
    var caption = root.querySelector(".rondell-caption");
    var cards = Array.prototype.slice.call(root.querySelectorAll(".rondell-card"));
    if (!ring || !cards.length) return;

    root.classList.remove("no-3d");

    var inst = {
      root: root,
      ring: ring,
      caption: caption,
      cards: cards,
      angles: cards.map(function (c, i) {
        var raw = parseFloat(c.style.getPropertyValue("--i"));
        return (isNaN(raw) ? i : raw) * STEP;
      }),
      rot: 0,
      last: 0,
      raf: 0,
      front: -1,
      hover: false,
      focus: false,
      offscreen: true
    };

    function render() {
      inst.ring.style.setProperty("--rot", inst.rot.toFixed(3) + "deg");

      var best = 0;
      var bestFacing = -2;
      for (var i = 0; i < inst.cards.length; i++) {
        var facing = Math.cos((inst.angles[i] + inst.rot) * RAD);
        var lit = Math.max(0, facing);
        inst.cards[i].style.opacity = (0.18 + 0.82 * Math.pow(lit, 1.2)).toFixed(3);
        inst.cards[i].style.zIndex = String(Math.round(100 + 100 * facing));
        if (facing > bestFacing) { bestFacing = facing; best = i; }
      }

      /* Caption nur beim Wechsel schreiben — aria-live soll nicht rattern. */
      if (best !== inst.front) {
        inst.front = best;
        if (inst.caption) {
          var card = inst.cards[best];
          inst.caption.textContent =
            (card.dataset.app || "") + " · " + (card.dataset.cat || "");
        }
      }
    }

    function frame(ts) {
      if (!inst.last) inst.last = ts;
      var dt = ts - inst.last;
      inst.last = ts;
      if (dt > 100) dt = 100;   /* nach einem Sprung nicht nachholen */
      inst.rot -= dt * 360 / PERIOD;
      if (inst.rot <= -360) inst.rot += 360;
      render();
      inst.raf = window.requestAnimationFrame(frame);
    }

    function start() {
      if (inst.raf) return;
      inst.last = 0;           /* Zeitbasis neu setzen: kein Sprung */
      inst.raf = window.requestAnimationFrame(frame);
    }

    function stop() {
      if (!inst.raf) return;
      window.cancelAnimationFrame(inst.raf);
      inst.raf = 0;
    }

    inst.sync = function () {
      if (!inst.hover && !inst.focus && !inst.offscreen && !document.hidden) start();
      else stop();
    };

    var stage = root.querySelector(".rondell-stage") || root;
    stage.addEventListener("pointerenter", function () {
      inst.hover = true; inst.sync();
    });
    stage.addEventListener("pointerleave", function () {
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
          inst.sync();
        });
      }, { threshold: 0.05 }).observe(root);
    } else {
      inst.offscreen = false;
    }

    render();          /* Startbild inkl. Caption, auch solange pausiert */
    instances.push(inst);
    inst.sync();
  });

  document.addEventListener("visibilitychange", function () {
    instances.forEach(function (inst) { inst.sync(); });
  });
})();
