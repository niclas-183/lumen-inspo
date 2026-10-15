// Guards the Pages login: nothing GitHub Pages publishes may carry the
// moodboard in plaintext. Pages builds with Jekyll, which skips every path
// segment that starts with "_" or "." — that is what keeps _app.html off the
// site, so the walk below applies the same rule.
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const root = new URL("../", import.meta.url);
const read = (p) => readFileSync(new URL(p, root));
const MOODBOARDS = ["moodboard", "moodboard-v2"];
// Share links are raw AES keys derived with this salt; rotating it kills them.
const SALT = "06e50164d0fec1aa29359f8a56c6d24b";

function publishedHtml(dir = "") {
  return readdirSync(new URL(dir || "./", root)).flatMap(name => {
    if (/^[_.#~]/.test(name) || name.endsWith("~") || name === "node_modules") return [];
    const rel = dir + name;
    if (statSync(new URL(rel, root)).isDirectory()) return publishedHtml(rel + "/");
    return name.endsWith(".html") ? [rel] : [];
  });
}

function plainText(html) {
  const attrs = [...html.matchAll(/\b(?:alt|aria-label|title|placeholder)="([^"]*)"/g)].map(m => m[1]);
  const body = html.replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/gi, "\n").replace(/<[^>]+>/g, "\n");
  return [...body.split(/\n/), ...attrs].map(s => s
    .replace(/&shy;/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
    .replace(/\s+/g, " ").trim());
}

test("Jekyll stays on, so _-prefixed sources are not published", () => {
  assert.equal(existsSync(new URL(".nojekyll", root)), false, ".nojekyll would publish _app.html");
  assert.match(read("_config.yml").toString(), /^require_front_matter: true$/m);
});

test("public app.html is a redirect stub, the source is _app.html", () => {
  for (const dir of MOODBOARDS) {
    const stub = read(`${dir}/app.html`).toString();
    assert.ok(stub.length < 1000, `${dir}/app.html is not a stub`);
    assert.match(stub, /<body><\/body>/);
    assert.match(stub, /location\.replace\("index\.html"/);
    assert.ok(read(`${dir}/_app.html`).length > 10000, `${dir}/_app.html missing`);
  }
});

test("no published HTML contains moodboard text", () => {
  const pages = publishedHtml();
  assert.ok(pages.includes("moodboard-v2/index.html"));
  assert.equal(pages.some(p => p.includes("_app.html")), false);
  const published = pages.map(p => [p, plainText(read(p).toString()).join("\n")]);
  for (const dir of MOODBOARDS) {
    const lines = new Set(plainText(read(`${dir}/_app.html`).toString()).filter(s => s.length >= 24));
    assert.ok(lines.size > 50, `too few text lines in ${dir}/_app.html`);
    for (const [page, text] of published) {
      const leaked = [...lines].filter(s => text.includes(s));
      assert.deepEqual(leaked, [], `${page} contains text from ${dir}/_app.html`);
    }
  }
});

test("payload.bin is sealed from the current _app.html, salt unchanged", () => {
  for (const dir of MOODBOARDS) {
    const bin = read(`${dir}/payload.bin`);
    assert.equal(bin.subarray(0, 4).toString("latin1"), "LIN1");
    assert.equal(bin.subarray(4, 20).toString("hex"), SALT, `${dir}: salt rotated`);
    // LIN1 + salt + nonce + GCM tag = 48 bytes around the ciphertext.
    assert.equal(bin.length, read(`${dir}/_app.html`).length + 48,
      `${dir}/payload.bin does not match _app.html — re-seal after editing`);
  }
});
