/* Injected by the unlock shell after AES adopt(). Does not re-encrypt the gallery. */
(function () {
  "use strict";
  var LF = window.LumenLookfeel;
  if (!LF) return;

  var catalog = [];
  var store = LF.emptyStore();
  var mounts = [];
  var filter = "all";
  var toastTimer = 0;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function cardInfo(el) {
    var headingEl = el.querySelector("h1, h2, h3, h4, h5");
    var hrefs = $all("a[href]", el).map(function (a) { return a.href; });
    return {
      el: el,
      heading: headingEl ? headingEl.textContent : "",
      hrefs: hrefs,
      id: el.getAttribute("data-slug") || el.id || "",
      slug: el.getAttribute("data-slug") || ""
    };
  }

  function looksLikeCard(el) {
    if (!el || !el.tagName) return false;
    var tag = el.tagName.toLowerCase();
    if (tag === "nav" || tag === "header" || tag === "script" || tag === "style" || tag === "footer") return false;
    if (el.classList && (el.classList.contains("lf-bar") || el.classList.contains("lf-mount") || el.classList.contains("lf-panel"))) return false;
    var hasShot = !!el.querySelector("img, .why");
    var hasTitle = !!el.querySelector("h1, h2, h3, h4, h5");
    return hasShot && hasTitle;
  }

  function findCards() {
    var wrap = $("main.wrap") || $("main .wrap") || $("main");
    if (wrap) {
      var kids = Array.prototype.slice.call(wrap.children).filter(looksLikeCard);
      if (kids.length >= 40) return kids;
    }
    var articles = $all("article").filter(looksLikeCard);
    if (articles.length >= 40) return articles;
    return $all("main h1, main h2, main h3").map(function (h) {
      return h.closest("article, section, li, div");
    }).filter(function (el, i, arr) {
      return el && looksLikeCard(el) && arr.indexOf(el) === i;
    });
  }

  function persist() {
    store = LF.saveStore(store);
  }

  function toast(msg) {
    var el = $(".lf-toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("is-on"); }, 3200);
  }

  function meanLabel(entry) {
    if (!entry) return { text: "–", empty: true };
    return { text: LF.fmtScore(LF.composite(entry.scores)), empty: false };
  }

  function paintPane(pane) {
    var rater = pane.getAttribute("data-rater");
    var slug = pane.getAttribute("data-slug");
    var entry = LF.getEntry(store, rater, slug);
    var scores = entry ? entry.scores : {};
    var mean = meanLabel(entry);
    var meanEl = pane.querySelector(".lf-mean");
    meanEl.textContent = mean.text;
    meanEl.classList.toggle("is-empty", mean.empty);
    $all(".lf-dot", pane).forEach(function (btn) {
      var crit = btn.getAttribute("data-criterion");
      var val = Number(btn.getAttribute("data-value"));
      var on = scores[crit] === val;
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-checked", on ? "true" : "false");
    });
  }

  function paintAll() {
    $all(".lf-pane").forEach(paintPane);
    paintToolbar();
    applyFilter();
    if ($(".lf-panel") && $(".lf-panel").classList.contains("is-open")) paintPanel();
  }

  function paintToolbar() {
    var prog = LF.progress(store, catalog);
    LF.RATERS.forEach(function (r) {
      var el = document.querySelector('[data-lf-prog="' + r.id + '"]');
      if (!el) return;
      el.innerHTML = "<b>" + r.label + "</b> " + prog[r.id].full + "/" + prog[r.id].total;
    });
    $all(".lf-filter").forEach(function (btn) {
      btn.classList.toggle("is-on", btn.getAttribute("data-filter") === filter);
    });
  }

  function applyFilter() {
    var ov = LF.overlap(store, catalog);
    var bySlug = Object.create(null);
    ov.rows.forEach(function (row) { bySlug[row.slug] = row; });
    mounts.forEach(function (m) {
      var row = bySlug[m.slug];
      var hide = false;
      if (filter === "unrated") hide = !row || !row.unrated;
      if (filter === "consensus") hide = !row || !row.consensus;
      if (filter === "disagree") hide = !row || !row.disagreement;
      m.card.classList.toggle("lf-hidden", hide);
    });
  }

  function likertButtons(criterion) {
    return LF.LIKERT.map(function (k) {
      var cls = "lf-dot";
      if (k.value >= 4) cls += " lf-hi";
      if (k.value <= 2) cls += " lf-lo";
      return '<button type="button" class="' + cls + '" role="radio" aria-checked="false" data-criterion="' +
        criterion.id + '" data-value="' + k.value + '" title="' + k.value + " " + k.label +
        '" aria-label="' + criterion.label + ": " + k.value + " " + k.label + '">' + k.value + "</button>";
    }).join("");
  }

  function paneHtml(rater, slug) {
    var rows = LF.CRITERIA.map(function (c) {
      return '<div class="lf-row" data-criterion="' + c.id + '">' +
        '<span class="lf-crit" title="' + c.label + '">' + c.short + "</span>" +
        '<div class="lf-likert" role="radiogroup" aria-label="' + rater.label + ", " + c.label +
        '" tabindex="0" data-criterion="' + c.id + '">' + likertButtons(c) + "</div></div>";
    }).join("");
    return '<section class="lf-pane" data-rater="' + rater.id + '" data-slug="' + slug + '">' +
      '<header class="lf-pane-h"><span class="lf-rater">' + rater.label + '</span>' +
      '<span class="lf-mean is-empty">–</span></header>' + rows + "</section>";
  }

  function mountOnCard(card, site) {
    if (card.querySelector(".lf-mount")) return;
    card.setAttribute("data-lf-slug", site.slug);
    var mount = document.createElement("div");
    mount.className = "lf-mount";
    mount.setAttribute("data-slug", site.slug);
    mount.innerHTML = '<div class="lf-panes">' +
      paneHtml(LF.RATERS[0], site.slug) + paneHtml(LF.RATERS[1], site.slug) + "</div>";
    card.appendChild(mount);
    mounts.push({ card: card, slug: site.slug });
  }

  function setFilter(next) {
    filter = next;
    $all(".lf-filter").forEach(function (btn) {
      btn.classList.toggle("is-on", btn.getAttribute("data-filter") === filter);
    });
    applyFilter();
  }

  function categoryLabel(cat) {
    if (cat === "health") return "Health";
    if (cat === "saas") return "SaaS";
    if (cat === "brand") return "Brand";
    return cat || "";
  }

  function thumbFor(slug) {
    var card = document.querySelector('[data-lf-slug="' + slug + '"]');
    if (!card) return "";
    var img = card.querySelector("img");
    if (!img) return "";
    var src = img.currentSrc || img.src || "";
    if (src && src.indexOf("data:") !== 0 && src.indexOf("blob:") === 0) return src;
    if (src && src.slice(0, 4) === "http") return src;
    var full = img.getAttribute("data-full") || (img.dataset && img.dataset.full) || "";
    if (full && (full.indexOf("blob:") === 0 || full.slice(0, 4) === "http")) return full;
    return "";
  }

  function chipHtml(row) {
    var src = thumbFor(row.slug);
    var img = src
      ? '<img alt="" src="' + src.replace(/"/g, "") + '">'
      : '<div class="lf-chip-ph">Kein Bild</div>';
    return '<a class="lf-chip" href="#' + encodeURIComponent(row.slug) + '">' + img +
      "<figcaption><strong>" + escapeHtml(row.name) + "</strong><small>" +
      escapeHtml(categoryLabel(row.category)) + '</small><div class="lf-two"><span>N ' +
      LF.fmtScore(row.niclas && row.niclas.composite) + "</span><span>D " +
      LF.fmtScore(row.dominik && row.dominik.composite) + "</span></div></figcaption></a>";
  }

  function escapeHtml(s) {
    return String(s || "").replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  }

  function tableRows(list, kind) {
    if (!list.length) {
      return '<p class="lf-empty">Noch keine Einträge in dieser Liste.</p>';
    }
    var head = kind === "disagree"
      ? "<tr><th>Site</th><th>Kategorie</th><th>Niclas</th><th>Dominik</th><th>Δ</th></tr>"
      : "<tr><th>Site</th><th>Kategorie</th><th>Niclas</th><th>Dominik</th><th>min</th></tr>";
    var body = list.map(function (row) {
      var extra = kind === "disagree"
        ? '<td class="lf-delta">' + LF.fmtScore(row.delta) + "</td>"
        : "<td>" + LF.fmtScore(row.min) + "</td>";
      return "<tr><td><a href=\"#" + encodeURIComponent(row.slug) + "\">" + escapeHtml(row.name) +
        "</a></td><td>" + escapeHtml(categoryLabel(row.category)) + "</td><td>" +
        LF.fmtScore(row.niclas && row.niclas.composite) + "</td><td>" +
        LF.fmtScore(row.dominik && row.dominik.composite) + "</td>" + extra + "</tr>";
    }).join("");
    return '<table class="lf-table">' + head + body + "</table>";
  }

  function paintPanel() {
    var ov = LF.overlap(store, catalog);
    var agr = LF.agreementSummary(store, catalog);
    var pN = ov.progress.niclas;
    var pD = ov.progress.dominik;
    var kpis = $(".lf-kpis");
    if (kpis) {
      kpis.innerHTML =
        '<div class="lf-kpi"><span>Niclas</span><strong>' + pN.full + " / " + pN.total +
        "</strong><em>voll bewertet (alle vier Kriterien)</em></div>" +
        '<div class="lf-kpi"><span>Dominik</span><strong>' + pD.full + " / " + pD.total +
        "</strong><em>voll bewertet (alle vier Kriterien)</em></div>";
    }
    var strip = ov.sharedLikes.slice(0, 8);
    var stripEl = $(".lf-strip");
    if (stripEl) {
      stripEl.innerHTML = strip.length
        ? strip.map(chipHtml).join("")
        : '<p class="lf-empty">Noch keine gemeinsamen Likes (beide Mittelwerte ≥ 4).</p>';
    }
    var likes = $(".lf-likes");
    if (likes) likes.innerHTML = tableRows(ov.sharedLikes, "likes");
    var diss = $(".lf-diss");
    if (diss) diss.innerHTML = tableRows(ov.disagreements, "disagree");
    var agree = $(".lf-agree");
    if (agree) agree.textContent = agr.text;
  }

  function openPanel() {
    paintPanel();
    $(".lf-panel").classList.add("is-open");
    $(".lf-panel").setAttribute("aria-hidden", "false");
    var close = $(".lf-close");
    if (close) close.focus();
  }

  function closePanel() {
    $(".lf-panel").classList.remove("is-open");
    $(".lf-panel").setAttribute("aria-hidden", "true");
  }

  function jumpToSlug(slug) {
    closePanel();
    setFilter("all");
    var card = document.querySelector('[data-lf-slug="' + slug + '"]');
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function exportJson() {
    var payload = LF.exportPayload(store);
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    var day = new Date().toISOString().slice(0, 10);
    a.href = URL.createObjectURL(blob);
    a.download = "lumen-lookfeel-" + day + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    toast("JSON exportiert. Datei nicht ins Repo committen.");
  }

  function importJson(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var incoming = LF.parseImport(String(reader.result || ""));
        store = LF.mergeStores(store, incoming);
        persist();
        paintAll();
        toast("Import übernommen. Pro Person: neuere Werte gewinnen, die andere Person bleibt unangetastet.");
      } catch (e) {
        toast("Import fehlgeschlagen. Keine gültige Look-and-Feel-Datei.");
      }
    };
    reader.readAsText(file);
  }

  function onLikertClick(btn) {
    var pane = btn.closest(".lf-pane");
    if (!pane) return;
    var rater = pane.getAttribute("data-rater");
    var slug = pane.getAttribute("data-slug");
    var criterion = btn.getAttribute("data-criterion");
    var value = Number(btn.getAttribute("data-value"));
    var entry = LF.getEntry(store, rater, slug);
    var current = entry && entry.scores && entry.scores[criterion];
    store = LF.setScore(store, rater, slug, criterion, current === value ? null : value);
    persist();
    paintPane(pane);
    paintToolbar();
    applyFilter();
  }

  function onLikertKey(ev, group) {
    var n = ev.key;
    if (!/^[1-5]$/.test(n)) return;
    var btn = group.querySelector('[data-value="' + n + '"]');
    if (btn) {
      ev.preventDefault();
      onLikertClick(btn);
    }
  }

  function buildChrome() {
    var bar = document.createElement("div");
    bar.className = "lf-bar";
    bar.innerHTML =
      '<span class="lf-bar-brand">Look & Feel</span>' +
      '<div class="lf-prog">' +
        '<span data-lf-prog="niclas"></span>' +
        '<span data-lf-prog="dominik"></span>' +
      "</div>" +
      '<div class="lf-bar-actions">' +
        '<button type="button" class="lf-btn" data-act="abgleich">Abgleich</button>' +
        '<button type="button" class="lf-btn" data-act="export">Export JSON</button>' +
        '<button type="button" class="lf-btn" data-act="import">Import JSON</button>' +
        '<input class="lf-file" id="lf-import" type="file" accept="application/json,.json">' +
      "</div>" +
      '<div class="lf-filters" role="tablist" aria-label="Galerie filtern">' +
        '<button type="button" class="lf-filter is-on" data-filter="all">Alle</button>' +
        '<button type="button" class="lf-filter" data-filter="unrated">Unbewertet</button>' +
        '<button type="button" class="lf-filter" data-filter="consensus">Konsens</button>' +
        '<button type="button" class="lf-filter" data-filter="disagree">Uneinig</button>' +
      "</div>" +
      '<p class="lf-legend">Nur Look-and-Feel. 1 <b>Schwach</b> · 2 <b>Eher nicht</b> · 3 <b>Mittel</b> · 4 <b>Gut</b> · 5 <b>Sehr gut</b>. Mittelwert aus den gesetzten Werten, auch unvollständig.</p>';

    var panel = document.createElement("div");
    panel.className = "lf-panel";
    panel.setAttribute("aria-hidden", "true");
    panel.innerHTML =
      '<div class="lf-sheet" role="dialog" aria-labelledby="lf-abgleich-title">' +
        '<div class="lf-sheet-h">' +
          '<h2 id="lf-abgleich-title">Abgleich</h2>' +
          '<button type="button" class="lf-btn lf-close" data-act="close">Schließen</button>' +
        "</div>" +
        '<p class="lf-lead">Wo Niclas und Dominik denselben visuellen Charakter mögen — und wo ihr darüber reden solltet. Zahlen bleiben lokal; zum Zusammenführen JSON exportieren und importieren.</p>' +
        '<div class="lf-kpis"></div>' +
        '<section class="lf-section">' +
          "<h3>Gemeinsamer Stil</h3>" +
          '<p class="lf-note">Die stärksten gemeinsamen Likes. Sortiert nach dem niedrigeren der beiden Mittelwerte, dann nach dem Durchschnitt — Begeisterung zählt nur, wenn sie geteilt ist.</p>' +
          '<div class="lf-strip"></div>' +
        "</section>" +
        '<section class="lf-section">' +
          "<h3>Shared Likes</h3>" +
          '<p class="lf-note">Beide Mittelwerte ≥ 4.</p>' +
          '<div class="lf-likes"></div>' +
        "</section>" +
        '<section class="lf-section">' +
          "<h3>Uneinig</h3>" +
          '<p class="lf-note">Abstand der Mittelwerte ≥ 1,5. Das sind Gesprächspunkte, keine Fehler.</p>' +
          '<div class="lf-diss"></div>' +
        "</section>" +
        '<section class="lf-section">' +
          "<h3>Übereinstimmung</h3>" +
          '<p class="lf-agree"></p>' +
        "</section>" +
      "</div>";

    var toastEl = document.createElement("div");
    toastEl.className = "lf-toast";
    toastEl.setAttribute("role", "status");
    var spacer = document.createElement("div");
    spacer.className = "lf-spacer";

    document.body.appendChild(bar);
    document.body.appendChild(spacer);
    document.body.appendChild(panel);
    document.body.appendChild(toastEl);
  }

  function bind() {
    document.addEventListener("click", function (ev) {
      var t = ev.target.closest("[data-act], .lf-dot, .lf-filter, .lf-chip, .lf-table a, .lf-close");
      if (!t) {
        if (ev.target.classList && ev.target.classList.contains("lf-panel")) closePanel();
        return;
      }
      if (t.classList.contains("lf-dot")) { onLikertClick(t); return; }
      if (t.classList.contains("lf-filter")) { setFilter(t.getAttribute("data-filter")); return; }
      var act = t.getAttribute("data-act");
      if (act === "abgleich") { openPanel(); return; }
      if (act === "export") { exportJson(); return; }
      if (act === "import") { $("#lf-import").click(); return; }
      if (act === "close" || t.classList.contains("lf-close")) { closePanel(); return; }
      if (t.matches(".lf-chip, .lf-table a")) {
        var href = t.getAttribute("href") || "";
        if (href.charAt(0) === "#") {
          ev.preventDefault();
          jumpToSlug(decodeURIComponent(href.slice(1)));
        }
      }
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && $(".lf-panel").classList.contains("is-open")) closePanel();
      var group = ev.target.closest && ev.target.closest(".lf-likert");
      if (group) onLikertKey(ev, group);
    });
    $("#lf-import").addEventListener("change", function (ev) {
      var file = ev.target.files && ev.target.files[0];
      ev.target.value = "";
      if (file) importJson(file);
    });
    window.addEventListener("storage", function (ev) {
      if (ev.key === LF.STORAGE_KEY) {
        store = LF.loadStore();
        paintAll();
      }
    });
  }

  function boot(sites) {
    catalog = sites.slice();
    store = LF.loadStore();
    var cards = findCards();
    var infos = cards.map(cardInfo);
    var assigned = LF.assignCards(infos, catalog);
    var hit = 0;
    assigned.forEach(function (site, i) {
      if (!site) return;
      hit++;
      mountOnCard(cards[i], site);
    });
    buildChrome();
    bind();
    paintAll();
    document.documentElement.setAttribute("data-lf-ready", String(hit));
    if (cards.length >= 40 && hit < Math.floor(cards.length * 0.8)) {
      toast("Look-and-Feel: nur " + hit + " von " + cards.length + " Karten eindeutig zugeordnet.");
    } else if (!hit) {
      toast("Look-and-Feel: keine Site-Karten gefunden.");
    }
  }

  fetch(window.LUMEN_LOOKFEEL_CATALOG || "stack.json", { cache: "no-cache" })
    .then(function (res) {
      if (!res.ok) throw new Error("catalog");
      return res.json();
    })
    .then(boot)
    .catch(function () {
      toast("Katalog (stack.json) nicht geladen — Bewertungen ohne Zuordnung nicht möglich.");
    });
})();
