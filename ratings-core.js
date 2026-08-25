/* Look-and-feel ratings for the 150-site gallery.
   Pure logic: safe to load after AES unlock, and to require() from Node tests.
   Ratings stay in localStorage. Nothing here is a secret. */
(function (root, factory) {
  var api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.LumenLookfeel = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var KIND = "lumen-inspo-lookfeel";
  var VERSION = 1;
  var STORAGE_KEY = "lumen-inspo-lookfeel-v1";
  var CATALOG_SIZE = 150;
  var DISAGREE_DELTA = 1.5;
  var LIKE_FLOOR = 4;

  var RATERS = [
    { id: "niclas", label: "Niclas" },
    { id: "dominik", label: "Dominik" }
  ];

  var CRITERIA = [
    { id: "typografie", label: "Typografie & Hierarchie", short: "Typografie" },
    { id: "farbe", label: "Farbe, Material, Atmosphäre", short: "Farbe" },
    { id: "layout", label: "Layout, Dichte, Rhythmus", short: "Layout" },
    { id: "gesamt", label: "Gesamtcharakter", short: "Gesamt" }
  ];

  var LIKERT = [
    { value: 1, label: "Schwach" },
    { value: 2, label: "Eher nicht" },
    { value: 3, label: "Mittel" },
    { value: 4, label: "Gut" },
    { value: 5, label: "Sehr gut" }
  ];

  var CRITERION_IDS = CRITERIA.map(function (c) { return c.id; });
  var RATER_IDS = RATERS.map(function (r) { return r.id; });

  function emptyStore() {
    return {
      version: VERSION,
      kind: KIND,
      raters: { niclas: {}, dominik: {} }
    };
  }

  function isScore(v) {
    return v === 1 || v === 2 || v === 3 || v === 4 || v === 5;
  }

  function cloneScores(scores) {
    var out = {};
    CRITERION_IDS.forEach(function (id) {
      if (isScore(scores && scores[id])) out[id] = scores[id];
    });
    return out;
  }

  function ratedCount(scores) {
    var n = 0;
    CRITERION_IDS.forEach(function (id) {
      if (isScore(scores && scores[id])) n++;
    });
    return n;
  }

  function isFull(scores) {
    return ratedCount(scores) === CRITERION_IDS.length;
  }

  function composite(scores) {
    var sum = 0, n = 0;
    CRITERION_IDS.forEach(function (id) {
      if (isScore(scores && scores[id])) {
        sum += scores[id];
        n++;
      }
    });
    return n ? sum / n : null;
  }

  function round1(n) {
    return Math.round(n * 10) / 10;
  }

  function fmtScore(n) {
    if (n == null || !isFinite(n)) return "–";
    var r = round1(n);
    return (r % 1 === 0) ? String(r) : r.toFixed(1);
  }

  function hostOf(url) {
    if (!url) return "";
    try {
      var u = new URL(String(url), "https://lf.invalid");
      if (u.protocol !== "http:" && u.protocol !== "https:") return "";
      return u.hostname.replace(/^www\./i, "").toLowerCase();
    } catch (e) {
      return "";
    }
  }

  function normName(s) {
    return String(s || "").replace(/\s+/g, " ").trim();
  }

  function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function nameTokenRe(name) {
    return new RegExp("(^|[^A-Za-z0-9ÄÖÜäöüß])" + escapeRe(name) + "($|[^A-Za-z0-9ÄÖÜäöüß])", "i");
  }

  function indexCatalog(catalog) {
    var bySlug = Object.create(null);
    var byHost = Object.create(null);
    var byName = Object.create(null);
    var namesByLen = [];
    (catalog || []).forEach(function (site) {
      if (!site || !site.slug) return;
      bySlug[site.slug] = site;
      var host = hostOf(site.url);
      if (host && !byHost[host]) byHost[host] = site;
      var name = normName(site.name);
      if (name) {
        byName[name.toLowerCase()] = site;
        namesByLen.push(name);
      }
    });
    namesByLen.sort(function (a, b) { return b.length - a.length; });
    return { bySlug: bySlug, byHost: byHost, byName: byName, namesByLen: namesByLen, list: catalog || [] };
  }

  function headingCandidates(heading) {
    var h = normName(heading);
    if (!h) return [];
    var out = [h];
    var stripped = h.replace(/^\d+[\.\)\:\-\s]+/, "").trim();
    if (stripped && stripped !== h) out.push(stripped);
    return out;
  }

  function matchCardToSite(card, index, used) {
    used = used || {};
    if (!card || !index) return null;

    function take(site) {
      if (!site || used[site.slug]) return null;
      return site;
    }

    var slug = card.slug || card.id;
    if (slug && index.bySlug[slug]) return take(index.bySlug[slug]);

    var hrefs = card.hrefs || [];
    for (var i = 0; i < hrefs.length; i++) {
      var host = hostOf(hrefs[i]);
      if (host && index.byHost[host]) {
        var hit = take(index.byHost[host]);
        if (hit) return hit;
      }
    }

    var heads = headingCandidates(card.heading);
    for (var h = 0; h < heads.length; h++) {
      var exact = index.byName[heads[h].toLowerCase()];
      if (exact) {
        var taken = take(exact);
        if (taken) return taken;
      }
    }

    for (var n = 0; n < index.namesByLen.length; n++) {
      var name = index.namesByLen[n];
      for (var k = 0; k < heads.length; k++) {
        if (nameTokenRe(name).test(" " + heads[k] + " ")) {
          var named = take(index.byName[name.toLowerCase()]);
          if (named) return named;
        }
      }
    }

    return null;
  }

  function assignCards(cards, catalog) {
    var index = indexCatalog(catalog);
    var used = Object.create(null);
    var assigned = new Array(cards.length);
    var unmatched = [];

    cards.forEach(function (card, i) {
      var site = matchCardToSite(card, index, used);
      if (site) {
        used[site.slug] = true;
        assigned[i] = site;
      } else {
        unmatched.push(i);
      }
    });

    if (unmatched.length && unmatched.length === index.list.length - Object.keys(used).length) {
      var leftover = index.list.filter(function (s) { return !used[s.slug]; });
      if (leftover.length === unmatched.length && leftover.length === cards.length) {
        leftover.forEach(function (site, j) {
          assigned[unmatched[j]] = site;
          used[site.slug] = true;
        });
      }
    }

    return assigned;
  }

  function sanitizeEntry(raw) {
    if (!raw || typeof raw !== "object") return null;
    var scores = cloneScores(raw.scores || raw);
    if (!ratedCount(scores)) return null;
    var updatedAt = Date.parse(raw.updatedAt) ? new Date(raw.updatedAt).toISOString() : null;
    return { scores: scores, updatedAt: updatedAt };
  }

  function sanitizeStore(raw) {
    var store = emptyStore();
    if (!raw || typeof raw !== "object") return store;
    RATER_IDS.forEach(function (rid) {
      var bucket = (raw.raters && raw.raters[rid]) || raw[rid] || {};
      if (!bucket || typeof bucket !== "object") return;
      Object.keys(bucket).forEach(function (slug) {
        var entry = sanitizeEntry(bucket[slug]);
        if (entry) store.raters[rid][slug] = entry;
      });
    });
    return store;
  }

  function getEntry(store, rater, slug) {
    return store && store.raters && store.raters[rater] && store.raters[rater][slug] || null;
  }

  function setScore(store, rater, slug, criterion, value) {
    if (RATER_IDS.indexOf(rater) < 0) throw new Error("rater");
    if (CRITERION_IDS.indexOf(criterion) < 0) throw new Error("criterion");
    if (value != null && !isScore(value)) throw new Error("score");
    store = sanitizeStore(store);
    var cur = getEntry(store, rater, slug) || { scores: {}, updatedAt: null };
    var scores = cloneScores(cur.scores);
    if (value == null) delete scores[criterion];
    else scores[criterion] = value;
    if (!ratedCount(scores)) {
      delete store.raters[rater][slug];
    } else {
      store.raters[rater][slug] = {
        scores: scores,
        updatedAt: new Date().toISOString()
      };
    }
    return store;
  }

  function mergeStores(local, incoming) {
    var base = sanitizeStore(local);
    var add = sanitizeStore(incoming);
    RATER_IDS.forEach(function (rid) {
      var incomingBucket = add.raters[rid];
      Object.keys(incomingBucket).forEach(function (slug) {
        var next = incomingBucket[slug];
        var prev = base.raters[rid][slug];
        if (!prev) {
          base.raters[rid][slug] = {
            scores: cloneScores(next.scores),
            updatedAt: next.updatedAt || new Date().toISOString()
          };
          return;
        }
        var prevT = Date.parse(prev.updatedAt) || 0;
        var nextT = Date.parse(next.updatedAt) || 0;
        if (nextT >= prevT) {
          base.raters[rid][slug] = {
            scores: cloneScores(next.scores),
            updatedAt: next.updatedAt || prev.updatedAt || new Date().toISOString()
          };
        }
      });
    });
    return base;
  }

  function loadStore(storage) {
    storage = storage || (typeof localStorage !== "undefined" ? localStorage : null);
    if (!storage) return emptyStore();
    try {
      var raw = storage.getItem(STORAGE_KEY);
      if (!raw) return emptyStore();
      return sanitizeStore(JSON.parse(raw));
    } catch (e) {
      return emptyStore();
    }
  }

  function saveStore(store, storage) {
    storage = storage || (typeof localStorage !== "undefined" ? localStorage : null);
    var clean = sanitizeStore(store);
    if (storage) {
      try {
        storage.setItem(STORAGE_KEY, JSON.stringify(clean));
      } catch (e) {}
    }
    return clean;
  }

  function exportPayload(store) {
    var clean = sanitizeStore(store);
    return {
      kind: KIND,
      version: VERSION,
      exportedAt: new Date().toISOString(),
      raters: {
        niclas: clean.raters.niclas,
        dominik: clean.raters.dominik
      }
    };
  }

  function parseImport(text) {
    var raw = typeof text === "string" ? JSON.parse(text) : text;
    if (!raw || typeof raw !== "object") throw new Error("format");
    if (raw.kind && raw.kind !== KIND) throw new Error("kind");
    return sanitizeStore(raw);
  }

  function progress(store, catalog) {
    var total = (catalog && catalog.length) || CATALOG_SIZE;
    var out = {};
    RATER_IDS.forEach(function (rid) {
      var full = 0, any = 0;
      (catalog || []).forEach(function (site) {
        var entry = getEntry(store, rid, site.slug);
        if (!entry) return;
        any++;
        if (isFull(entry.scores)) full++;
      });
      out[rid] = { full: full, any: any, total: total };
    });
    return out;
  }

  function siteRow(store, site) {
    var nic = getEntry(store, "niclas", site.slug);
    var dom = getEntry(store, "dominik", site.slug);
    var nc = nic ? composite(nic.scores) : null;
    var dc = dom ? composite(dom.scores) : null;
    var delta = (nc != null && dc != null) ? Math.abs(nc - dc) : null;
    return {
      slug: site.slug,
      name: site.name,
      url: site.url,
      category: site.category,
      niclas: nic ? { scores: nic.scores, composite: nc, full: isFull(nic.scores) } : null,
      dominik: dom ? { scores: dom.scores, composite: dc, full: isFull(dom.scores) } : null,
      min: (nc != null && dc != null) ? Math.min(nc, dc) : null,
      mean: (nc != null && dc != null) ? (nc + dc) / 2 : null,
      delta: delta,
      consensus: nc != null && dc != null && nc >= LIKE_FLOOR && dc >= LIKE_FLOOR,
      disagreement: delta != null && delta >= DISAGREE_DELTA,
      unrated: !isFull(nic && nic.scores) || !isFull(dom && dom.scores)
    };
  }

  function compareName(a, b) {
    return String(a.name || a.slug).localeCompare(String(b.name || b.slug), "de");
  }

  function overlap(store, catalog) {
    var rows = (catalog || []).map(function (site) { return siteRow(store, site); });
    var sharedLikes = rows.filter(function (r) { return r.consensus; }).sort(function (a, b) {
      if (b.min !== a.min) return b.min - a.min;
      if (b.mean !== a.mean) return b.mean - a.mean;
      return compareName(a, b);
    });
    var disagreements = rows.filter(function (r) { return r.disagreement; }).sort(function (a, b) {
      if (b.delta !== a.delta) return b.delta - a.delta;
      return compareName(a, b);
    });
    var bothFull = rows.filter(function (r) {
      return r.niclas && r.niclas.full && r.dominik && r.dominik.full;
    });
    return {
      rows: rows,
      sharedLikes: sharedLikes,
      disagreements: disagreements,
      bothFull: bothFull,
      progress: progress(store, catalog)
    };
  }

  function rank(values) {
    var indexed = values.map(function (v, i) { return { v: v, i: i }; });
    indexed.sort(function (a, b) { return a.v - b.v; });
    var ranks = new Array(values.length);
    for (var i = 0; i < indexed.length; ) {
      var j = i;
      while (j < indexed.length && indexed[j].v === indexed[i].v) j++;
      var avg = (i + 1 + j) / 2;
      for (var k = i; k < j; k++) ranks[indexed[k].i] = avg;
      i = j;
    }
    return ranks;
  }

  function pearson(x, y) {
    var n = x.length;
    if (n < 2) return null;
    var sx = 0, sy = 0, i;
    for (i = 0; i < n; i++) { sx += x[i]; sy += y[i]; }
    var mx = sx / n, my = sy / n;
    var num = 0, dx = 0, dy = 0;
    for (i = 0; i < n; i++) {
      var a = x[i] - mx, b = y[i] - my;
      num += a * b;
      dx += a * a;
      dy += b * b;
    }
    if (dx === 0 || dy === 0) return null;
    return num / Math.sqrt(dx * dy);
  }

  function spearman(x, y) {
    if (!x || !y || x.length !== y.length || x.length < 2) return null;
    return pearson(rank(x), rank(y));
  }

  function agreementBand(rho) {
    if (rho == null) return "offen";
    if (rho >= 0.8) return "sehr nah";
    if (rho >= 0.55) return "weitgehend einig";
    if (rho >= 0.3) return "gemischt";
    if (rho >= 0) return "eher uneinig";
    return "gegenläufig";
  }

  function agreementSummary(store, catalog) {
    var ov = overlap(store, catalog);
    var n = ov.bothFull.length;
    var per = {};
    CRITERION_IDS.forEach(function (id) {
      var xs = [], ys = [];
      ov.bothFull.forEach(function (row) {
        xs.push(row.niclas.scores[id]);
        ys.push(row.dominik.scores[id]);
      });
      per[id] = spearman(xs, ys);
    });
    var cx = ov.bothFull.map(function (r) { return r.niclas.composite; });
    var cy = ov.bothFull.map(function (r) { return r.dominik.composite; });
    var overall = spearman(cx, cy);

    var text;
    if (n < 8) {
      text = "Noch zu wenige gemeinsame Vollbewertungen (n = " + n +
        " von " + ((catalog && catalog.length) || CATALOG_SIZE) +
        "), um die Übereinstimmung ernst zu nehmen. Erst bewerten, dann lesen.";
    } else {
      var parts = CRITERIA.map(function (c) {
        var rho = per[c.id];
        var bit = rho == null ? "nicht berechenbar" : ("ρ = " + rho.toFixed(2) + ", " + agreementBand(rho));
        return c.short + " " + bit;
      });
      var overallBit = overall == null ? "nicht berechenbar" : ("ρ = " + overall.toFixed(2) + ", " + agreementBand(overall));
      text = "Auf " + n + " gemeinsam voll bewerteten Sites: Gesamteindruck " + overallBit +
        ". Im Einzelnen: " + parts.join("; ") +
        ". ρ nahe 1 heißt: ihr sortiert dieselben Sites nach oben — nicht, dass jede Zahl identisch ist.";
    }

    return { n: n, overall: overall, perCriterion: per, text: text };
  }

  return {
    KIND: KIND,
    VERSION: VERSION,
    STORAGE_KEY: STORAGE_KEY,
    CATALOG_SIZE: CATALOG_SIZE,
    DISAGREE_DELTA: DISAGREE_DELTA,
    LIKE_FLOOR: LIKE_FLOOR,
    RATERS: RATERS,
    CRITERIA: CRITERIA,
    LIKERT: LIKERT,
    emptyStore: emptyStore,
    isScore: isScore,
    ratedCount: ratedCount,
    isFull: isFull,
    composite: composite,
    round1: round1,
    fmtScore: fmtScore,
    hostOf: hostOf,
    indexCatalog: indexCatalog,
    matchCardToSite: matchCardToSite,
    assignCards: assignCards,
    sanitizeStore: sanitizeStore,
    getEntry: getEntry,
    setScore: setScore,
    mergeStores: mergeStores,
    loadStore: loadStore,
    saveStore: saveStore,
    exportPayload: exportPayload,
    parseImport: parseImport,
    progress: progress,
    siteRow: siteRow,
    overlap: overlap,
    spearman: spearman,
    pearson: pearson,
    agreementBand: agreementBand,
    agreementSummary: agreementSummary
  };
});
