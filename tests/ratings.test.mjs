import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const require = createRequire(import.meta.url);
const LF = require("../ratings-core.js");
const catalog = JSON.parse(readFileSync(new URL("../stack.json", import.meta.url), "utf8"));

function memStore(map) {
  return {
    getItem(k) { return map[k] ?? null; },
    setItem(k, v) { map[k] = String(v); }
  };
}

test("catalog is 150 unique slugs and names", () => {
  assert.equal(catalog.length, 150);
  assert.equal(new Set(catalog.map(s => s.slug)).size, 150);
  assert.equal(new Set(catalog.map(s => s.name)).size, 150);
});

test("composite is the mean of whatever is set (partial ok)", () => {
  assert.equal(LF.composite({ typografie: 4, farbe: 5, layout: 3, gesamt: 4 }), 4);
  assert.equal(LF.composite({ gesamt: 5 }), 5);
  assert.equal(LF.composite({ typografie: 1, layout: 2 }), 1.5);
  assert.equal(LF.composite({}), null);
  assert.equal(LF.isFull({ typografie: 4, farbe: 5, layout: 3, gesamt: 4 }), true);
  assert.equal(LF.isFull({ gesamt: 5 }), false);
});

test("setScore persists immediately-shaped entries and can clear a tick", () => {
  let store = LF.emptyStore();
  store = LF.setScore(store, "niclas", "linear", "typografie", 4);
  store = LF.setScore(store, "niclas", "linear", "farbe", 5);
  assert.equal(LF.composite(LF.getEntry(store, "niclas", "linear").scores), 4.5);
  store = LF.setScore(store, "niclas", "linear", "typografie", null);
  assert.deepEqual(LF.getEntry(store, "niclas", "linear").scores, { farbe: 5 });
  store = LF.setScore(store, "niclas", "linear", "farbe", null);
  assert.equal(LF.getEntry(store, "niclas", "linear"), null);
});

test("import merges by rater and never wipes the other person", () => {
  let niclas = LF.emptyStore();
  niclas = LF.setScore(niclas, "niclas", "linear", "gesamt", 5);
  niclas = LF.setScore(niclas, "niclas", "bevel", "gesamt", 2);

  let dominik = LF.emptyStore();
  dominik = LF.setScore(dominik, "dominik", "linear", "gesamt", 4);
  dominik = LF.setScore(dominik, "dominik", "oura", "gesamt", 5);
  const exported = LF.exportPayload(dominik);
  exported.raters.niclas = {};

  const merged = LF.mergeStores(niclas, exported);
  assert.equal(LF.getEntry(merged, "niclas", "linear").scores.gesamt, 5);
  assert.equal(LF.getEntry(merged, "niclas", "bevel").scores.gesamt, 2);
  assert.equal(LF.getEntry(merged, "dominik", "linear").scores.gesamt, 4);
  assert.equal(LF.getEntry(merged, "dominik", "oura").scores.gesamt, 5);
});

test("merge keeps the newer timestamp for the same rater+slug", () => {
  const local = LF.emptyStore();
  local.raters.dominik.linear = { scores: { gesamt: 2 }, updatedAt: "2026-08-01T00:00:00.000Z" };
  const incoming = LF.emptyStore();
  incoming.raters.dominik.linear = { scores: { gesamt: 5 }, updatedAt: "2026-08-20T00:00:00.000Z" };
  const merged = LF.mergeStores(local, incoming);
  assert.equal(merged.raters.dominik.linear.scores.gesamt, 5);

  const older = LF.emptyStore();
  older.raters.dominik.linear = { scores: { gesamt: 1 }, updatedAt: "2026-07-01T00:00:00.000Z" };
  const kept = LF.mergeStores(merged, older);
  assert.equal(kept.raters.dominik.linear.scores.gesamt, 5);
});

test("shared likes rank by min then mean", () => {
  let store = LF.emptyStore();
  store = LF.setScore(store, "niclas", "linear", "gesamt", 5);
  store = LF.setScore(store, "dominik", "linear", "gesamt", 4);
  store = LF.setScore(store, "niclas", "bevel", "gesamt", 4);
  store = LF.setScore(store, "dominik", "bevel", "gesamt", 4);
  store = LF.setScore(store, "niclas", "oura", "gesamt", 5);
  store = LF.setScore(store, "dominik", "oura", "gesamt", 5);
  store = LF.setScore(store, "niclas", "whoop", "gesamt", 3);
  store = LF.setScore(store, "dominik", "whoop", "gesamt", 5);

  const sites = catalog.filter(s => ["linear", "bevel", "oura", "whoop"].includes(s.slug));
  const ov = LF.overlap(store, sites);
  assert.deepEqual(ov.sharedLikes.map(r => r.slug), ["oura", "linear", "bevel"]);
  assert.equal(ov.disagreements.map(r => r.slug).includes("whoop"), true);
  assert.equal(ov.sharedLikes.find(r => r.slug === "whoop"), undefined);
});

test("disagreement threshold is 1.5 on composites", () => {
  let store = LF.emptyStore();
  store = LF.setScore(store, "niclas", "linear", "typografie", 5);
  store = LF.setScore(store, "niclas", "linear", "farbe", 5);
  store = LF.setScore(store, "dominik", "linear", "typografie", 4);
  store = LF.setScore(store, "dominik", "linear", "farbe", 3);
  const row = LF.siteRow(store, catalog[0]);
  assert.equal(row.niclas.composite, 5);
  assert.equal(row.dominik.composite, 3.5);
  assert.equal(row.delta, 1.5);
  assert.equal(row.disagreement, true);
});

test("spearman is 1 on identical order and null on constants", () => {
  assert.equal(LF.spearman([1, 2, 3, 4, 5], [1, 2, 3, 4, 5]), 1);
  assert.equal(LF.spearman([1, 2, 3, 4, 5], [5, 4, 3, 2, 1]), -1);
  assert.equal(LF.spearman([3, 3, 3], [1, 2, 3]), null);
  assert.ok(LF.spearman([1, 2, 3, 4], [1, 2, 4, 3]) > 0.7);
});

test("agreement summary stays German and cautious under n=8", () => {
  const text = LF.agreementSummary(LF.emptyStore(), catalog).text;
  assert.match(text, /Noch zu wenige gemeinsame Vollbewertungen/);
  assert.match(text, /n = 0/);
});

test("card matching prefers exact names and hosts, Clay vs Clay Health", () => {
  const cards = [
    { heading: "Clay Health", hrefs: ["https://www.joinclay.com/"] },
    { heading: "Clay", hrefs: ["https://www.clay.com/"] },
    { heading: "Linear", hrefs: [] },
    { heading: "Whoop US", hrefs: ["https://www.whoop.com/us/en/join"] }
  ];
  const assigned = LF.assignCards(cards, catalog);
  assert.equal(assigned[0].slug, "clay-health");
  assert.equal(assigned[1].slug, "clay-gtm");
  assert.equal(assigned[2].slug, "linear");
  assert.equal(assigned[3].slug, "whoop");
});

test("150 heading-only cards map 1:1 onto the catalog", () => {
  const cards = catalog.map(s => ({ heading: s.name, hrefs: [] }));
  const assigned = LF.assignCards(cards, catalog);
  assert.equal(assigned.every(Boolean), true);
  assert.deepEqual(assigned.map(s => s.slug), catalog.map(s => s.slug));
});

test("150 host-only cards map 1:1 onto the catalog", () => {
  const cards = catalog.map(s => ({ heading: "", hrefs: [s.url] }));
  const assigned = LF.assignCards(cards, catalog);
  assert.deepEqual(assigned.map(s => s.slug), catalog.map(s => s.slug));
});

test("localStorage round-trip and parseImport reject the wrong kind", () => {
  const map = {};
  const storage = memStore(map);
  let store = LF.emptyStore();
  store = LF.setScore(store, "niclas", "linear", "layout", 4);
  LF.saveStore(store, storage);
  const loaded = LF.loadStore(storage);
  assert.equal(loaded.raters.niclas.linear.scores.layout, 4);
  assert.throws(() => LF.parseImport({ kind: "nope", raters: { niclas: {} } }), /kind/);
});

test("progress counts full ratings out of catalog size", () => {
  let store = LF.emptyStore();
  LF.CRITERIA.forEach(c => {
    store = LF.setScore(store, "niclas", "linear", c.id, 4);
  });
  store = LF.setScore(store, "niclas", "bevel", "gesamt", 5);
  const p = LF.progress(store, catalog);
  assert.equal(p.niclas.full, 1);
  assert.equal(p.niclas.any, 2);
  assert.equal(p.niclas.total, 150);
  assert.equal(p.dominik.full, 0);
});
