/* Moodboard-Werkzeug: Variantenwechsel + Hero-Filter (Variante 1).
   Dither: kein npm. Paper-Filter: vendored @paper-design/shaders (WebGL, speed 0).
   Overlay nur, wenn ein Modus aktiv ist. */
(function () {
  var PHOTO_SRC = "assets/office_window_quiet.jpg";
  var INK = [0x26, 0x21, 0x1A];
  var PAPER = [0xF6, 0xF0, 0xE4];
  var PAPER_MODES = { glas: 1, cmyk: 1, papier: 1 };
  var BAYER8 = [
    0, 32, 8, 40, 2, 34, 10, 42,
    48, 16, 56, 24, 50, 18, 58, 26,
    12, 44, 4, 36, 14, 46, 6, 38,
    60, 28, 52, 20, 62, 30, 54, 22,
    3, 35, 11, 43, 1, 33, 9, 41,
    51, 19, 59, 27, 49, 17, 57, 25,
    15, 47, 7, 39, 13, 45, 5, 37,
    63, 31, 55, 23, 61, 29, 53, 21
  ];

  var tabs = document.querySelectorAll("[data-target]");
  var ditherTabs = document.querySelectorAll("[data-dither]");
  var ditherDock = document.getElementById("dither-dock");
  var toneTabs = document.querySelectorAll("[data-tone]");
  var toneDock = document.getElementById("tone-dock");
  var systemPage = document.getElementById("variant-3");
  var canvas = document.getElementById("field-dither");
  var photo = document.getElementById("field-photo");
  var shaderHost = document.getElementById("field-shader");
  var shaderInner = document.getElementById("field-shader-mount");

  var variant = "variant-1";
  var ditherMode = "original";
  var tone = "papier";
  var busy = false;
  var sourceImg = null;
  var fullData = null;
  var sizeCache = Object.create(null);
  var modeCache = Object.create(null);
  var paperLib = null;
  var paperLibLoading = null;
  var noiseImg = null;
  var shaderMount = null;

  function showVariant(id) {
    variant = id;
    document.querySelectorAll(".page").forEach(function (p) {
      p.hidden = p.id !== id;
    });
    tabs.forEach(function (t) {
      t.setAttribute("aria-selected", String(t.dataset.target === id));
    });
    if (ditherDock) ditherDock.hidden = id !== "variant-1";
    if (toneDock) toneDock.hidden = id !== "variant-3";
    if (id !== "variant-1") hideOverlays();
    else applyDither(ditherMode);
    window.scrollTo(0, 0);
  }

  /* Grund-Schalter der Variante 3 — Reviewer-Chrome, kein Produkt-UI. */
  function applyTone(next) {
    tone = next;
    if (systemPage) {
      if (next === "papier") systemPage.removeAttribute("data-tone");
      else systemPage.setAttribute("data-tone", next);
    }
    toneTabs.forEach(function (t) {
      t.setAttribute("aria-selected", String(t.dataset.tone === next));
    });
  }

  function hideCanvas() {
    if (!canvas) return;
    canvas.classList.remove("is-on");
  }

  function hideShader() {
    if (shaderHost) shaderHost.classList.remove("is-on");
    disposeShader();
  }

  function hideOverlays() {
    hideCanvas();
    hideShader();
  }

  function isPaperMode(mode) {
    return !!PAPER_MODES[mode];
  }

  function disposeShader() {
    if (shaderMount) {
      try { shaderMount.dispose(); } catch (e) {}
      shaderMount = null;
    }
  }

  function loadPaperLib() {
    if (paperLib) return Promise.resolve(paperLib);
    if (paperLibLoading) return paperLibLoading;
    paperLibLoading = import("./vendor/paper-shaders/index.js").then(function (m) {
      paperLib = m;
      return m;
    });
    return paperLibLoading;
  }

  function waitImage(img) {
    if (!img) return Promise.reject(new Error("image"));
    if (img.complete && img.naturalWidth) return Promise.resolve(img);
    if (img.decode) {
      return img.decode().then(function () { return img; }).catch(function () {
        return new Promise(function (resolve, reject) {
          img.onload = function () { resolve(img); };
          img.onerror = reject;
        });
      });
    }
    return new Promise(function (resolve, reject) {
      img.onload = function () { resolve(img); };
      img.onerror = reject;
    });
  }

  function loadNoise(P) {
    if (noiseImg && noiseImg.complete && noiseImg.naturalWidth) {
      return Promise.resolve(noiseImg);
    }
    noiseImg = P.getShaderNoiseTexture();
    return waitImage(noiseImg);
  }

  function paperUniforms(mode, P, img, noise) {
    var color = P.getShaderColorFromString;
    var fit = P.ShaderFitOptions.cover;
    var sizing = {
      u_fit: fit,
      u_scale: 1,
      u_rotation: 0,
      u_offsetX: 0,
      u_offsetY: 0,
      u_originX: 0.5,
      u_originY: 0.58,
      u_worldWidth: 0,
      u_worldHeight: 0
    };
    if (mode === "glas") {
      return {
        fragment: P.flutedGlassFragmentShader,
        mipmaps: ["u_image"],
        uniforms: Object.assign({
          u_image: img,
          u_colorBack: color("#00000000"),
          u_colorShadow: color("#000000"),
          u_colorHighlight: color("#ffffff"),
          u_shadows: 0.2,
          u_size: 0.42,
          u_angle: 0,
          u_distortion: 0.4,
          u_shift: 0,
          u_blur: 0,
          u_edges: 0.2,
          u_stretch: 0,
          u_distortionShape: P.GlassDistortionShapes.prism,
          u_highlights: 0.12,
          u_shape: P.GlassGridShapes.lines,
          u_marginLeft: 0,
          u_marginRight: 0,
          u_marginTop: 0,
          u_marginBottom: 0,
          u_grainMixer: 0.06,
          u_grainOverlay: 0.08
        }, sizing)
      };
    }
    if (mode === "cmyk") {
      return {
        fragment: P.halftoneCmykFragmentShader,
        mipmaps: [],
        uniforms: Object.assign({
          u_image: img,
          u_noiseTexture: noise,
          u_colorBack: color("#fbfaf4"),
          u_colorC: color("#00b3ff"),
          u_colorM: color("#fc4f9d"),
          u_colorY: color("#ffd900"),
          u_colorK: color("#231f20"),
          u_size: 0.09,
          u_contrast: 1.05,
          u_softness: 0.85,
          u_grainSize: 0.45,
          u_grainMixer: 0,
          u_grainOverlay: 0.05,
          u_gridNoise: 0.16,
          u_floodC: 0.1,
          u_floodM: 0,
          u_floodY: 0,
          u_floodK: 0,
          u_gainC: 0.22,
          u_gainM: 0,
          u_gainY: 0.15,
          u_gainK: 0,
          u_type: P.HalftoneCmykTypes.ink
        }, sizing)
      };
    }
    return {
      fragment: P.paperTextureFragmentShader,
      mipmaps: ["u_image"],
      uniforms: Object.assign({
        u_image: img,
        u_noiseTexture: noise,
        u_colorFront: color("#7B7160"),
        u_colorBack: color("#F6F0E4"),
        u_contrast: 0.28,
        u_roughness: 0.38,
        u_fiber: 0.42,
        u_fiberSize: 0.22,
        u_crumples: 0.38,
        u_crumpleSize: 0.32,
        u_folds: 0.42,
        u_foldCount: 5,
        u_fade: 0,
        u_drops: 0.16,
        u_seed: 5.8
      }, sizing)
    };
  }

  function waitShaderFrame(mount) {
    return new Promise(function (resolve, reject) {
      var tries = 0;
      function tick() {
        tries++;
        if (mount.canvasElement && mount.canvasElement.width > 1 && mount.canvasElement.height > 1) {
          mount.setFrame(0);
          requestAnimationFrame(function () { resolve(); });
          return;
        }
        if (tries > 90) {
          reject(new Error("shader-size"));
          return;
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  function captureShader(mount) {
    var src = mount.canvasElement;
    var snap = document.createElement("canvas");
    snap.width = src.width;
    snap.height = src.height;
    snap.getContext("2d").drawImage(src, 0, 0);
    return snap;
  }

  function showShaderCache(snap) {
    disposeShader();
    hideCanvas();
    if (!shaderInner || !shaderHost) return;
    shaderInner.replaceChildren();
    var c = document.createElement("canvas");
    c.width = snap.width;
    c.height = snap.height;
    c.getContext("2d").drawImage(snap, 0, 0);
    shaderInner.appendChild(c);
    shaderHost.classList.add("is-on");
  }

  function setDitherSelected(mode) {
    ditherTabs.forEach(function (t) {
      t.setAttribute("aria-selected", String(t.dataset.dither === mode));
    });
  }

  function setBusy(on) {
    busy = on;
    if (ditherDock) ditherDock.setAttribute("aria-busy", String(on));
    ditherTabs.forEach(function (t) { t.disabled = on; });
  }

  function loadImage(src) {
    return new Promise(function (resolve, reject) {
      if (photo && photo.complete && photo.naturalWidth && photo.src.indexOf("office_window_quiet") !== -1) {
        resolve(photo);
        return;
      }
      var img = new Image();
      img.onload = function () { resolve(img); };
      img.onerror = reject;
      img.src = src;
    });
  }

  function readFull(img) {
    var w = img.naturalWidth;
    var h = img.naturalHeight;
    var c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    var ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);
    return ctx.getImageData(0, 0, w, h);
  }

  function boxDownsample(src, dw, dh) {
    var sw = src.width;
    var sh = src.height;
    var s = src.data;
    var out = new ImageData(dw, dh);
    var d = out.data;
    var xRatio = sw / dw;
    var yRatio = sh / dh;
    var y, x, y0, y1, x0, x1, yy, xx, r, g, b, n, i, o;
    for (y = 0; y < dh; y++) {
      y0 = (y * yRatio) | 0;
      y1 = Math.max(y0 + 1, ((y + 1) * yRatio) | 0);
      if (y1 > sh) y1 = sh;
      for (x = 0; x < dw; x++) {
        x0 = (x * xRatio) | 0;
        x1 = Math.max(x0 + 1, ((x + 1) * xRatio) | 0);
        if (x1 > sw) x1 = sw;
        r = 0; g = 0; b = 0; n = 0;
        for (yy = y0; yy < y1; yy++) {
          i = (yy * sw + x0) * 4;
          for (xx = x0; xx < x1; xx++) {
            r += s[i];
            g += s[i + 1];
            b += s[i + 2];
            n++;
            i += 4;
          }
        }
        o = (y * dw + x) * 4;
        d[o] = r / n;
        d[o + 1] = g / n;
        d[o + 2] = b / n;
        d[o + 3] = 255;
      }
    }
    return out;
  }

  function sourceAt(width) {
    if (sizeCache[width]) return sizeCache[width];
    var h = Math.round(fullData.height * width / fullData.width);
    sizeCache[width] = boxDownsample(fullData, width, h);
    return sizeCache[width];
  }

  function rasterBayer(src, steps) {
    var w = src.width;
    var h = src.height;
    var s = src.data;
    var out = new ImageData(w, h);
    var d = out.data;
    var x, y, i, r, g, b, lum, t, brightness, quant, scale;
    for (y = 0; y < h; y++) {
      for (x = 0; x < w; x++) {
        i = (y * w + x) * 4;
        r = s[i] / 255;
        g = s[i + 1] / 255;
        b = s[i + 2] / 255;
        lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        t = BAYER8[(y & 7) * 8 + (x & 7)] / 64;
        brightness = lum + (t - 0.5) / steps;
        if (brightness < 0) brightness = 0;
        else if (brightness > 1) brightness = 1;
        quant = Math.floor(brightness * steps + 0.5) / steps;
        scale = quant / Math.max(lum, 0.001);
        d[i] = r * scale * 255;
        d[i + 1] = g * scale * 255;
        d[i + 2] = b * scale * 255;
        d[i + 3] = 255;
      }
    }
    return out;
  }

  function atkinsonMono(src) {
    var w = src.width;
    var h = src.height;
    var s = src.data;
    var gray = new Float32Array(w * h);
    var x, y, i, p, old, nv, e, dark;
    for (i = 0, p = 0; i < gray.length; i++, p += 4) {
      var lum = 0.2126 * s[p] + 0.7152 * s[p + 1] + 0.0722 * s[p + 2];
      lum = (lum - 128) * 1.15 + 128;
      if (lum < 0) lum = 0;
      else if (lum > 255) lum = 255;
      gray[i] = lum;
    }
    var err = new Float32Array(w * h);
    var out = new ImageData(w, h);
    var d = out.data;
    for (y = 0; y < h; y++) {
      for (x = 0; x < w; x++) {
        i = y * w + x;
        old = gray[i] + err[i];
        dark = old < 128;
        nv = dark ? 0 : 255;
        e = (old - nv) / 8;
        if (x + 1 < w) err[i + 1] += e;
        if (x + 2 < w) err[i + 2] += e;
        if (y + 1 < h) {
          if (x > 0) err[i + w - 1] += e;
          err[i + w] += e;
          if (x + 1 < w) err[i + w + 1] += e;
        }
        if (y + 2 < h) err[i + 2 * w] += e;
        p = i * 4;
        if (dark) {
          d[p] = INK[0]; d[p + 1] = INK[1]; d[p + 2] = INK[2];
        } else {
          d[p] = PAPER[0]; d[p + 1] = PAPER[1]; d[p + 2] = PAPER[2];
        }
        d[p + 3] = 255;
      }
    }
    return out;
  }

  function sampleLum(src, cx, cy) {
    var w = src.width;
    var h = src.height;
    var s = src.data;
    var x0 = Math.max(0, (cx - 1) | 0);
    var x1 = Math.min(w - 1, (cx + 1) | 0);
    var y0 = Math.max(0, (cy - 1) | 0);
    var y1 = Math.min(h - 1, (cy + 1) | 0);
    var r = 0, g = 0, b = 0, n = 0, x, y, i;
    for (y = y0; y <= y1; y++) {
      for (x = x0; x <= x1; x++) {
        i = (y * w + x) * 4;
        r += s[i]; g += s[i + 1]; b += s[i + 2]; n++;
      }
    }
    r /= n; g /= n; b /= n;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  function fillCircle(d, w, h, cx, cy, radius, rgb) {
    if (radius < 0.35) return;
    var r2 = radius * radius;
    var aa = radius + 0.65;
    var x0 = Math.max(0, Math.floor(cx - aa));
    var x1 = Math.min(w - 1, Math.ceil(cx + aa));
    var y0 = Math.max(0, Math.floor(cy - aa));
    var y1 = Math.min(h - 1, Math.ceil(cy + aa));
    var x, y, dx, dy, dist, i, cov, inv;
    for (y = y0; y <= y1; y++) {
      dy = y + 0.5 - cy;
      for (x = x0; x <= x1; x++) {
        dx = x + 0.5 - cx;
        dist = dx * dx + dy * dy;
        if (dist > (aa * aa)) continue;
        if (dist <= r2) cov = 1;
        else {
          cov = 1 - (Math.sqrt(dist) - radius);
          if (cov < 0) continue;
          if (cov > 1) cov = 1;
        }
        i = (y * w + x) * 4;
        inv = 1 - cov;
        d[i] = d[i] * inv + rgb[0] * cov;
        d[i + 1] = d[i + 1] * inv + rgb[1] * cov;
        d[i + 2] = d[i + 2] * inv + rgb[2] * cov;
      }
    }
  }

  function halftoneDots(src) {
    var w = src.width;
    var h = src.height;
    var out = new ImageData(w, h);
    var d = out.data;
    var i, n = w * h * 4;
    for (i = 0; i < n; i += 4) {
      d[i] = PAPER[0]; d[i + 1] = PAPER[1]; d[i + 2] = PAPER[2]; d[i + 3] = 255;
    }
    var cell = 8;
    var c = Math.SQRT1_2;
    var u, v, x, y, lum, dark, radius;
    var uMin = -cell;
    var uMax = (w + h) * c + cell;
    var vMin = -w * c - cell;
    var vMax = h * c + cell;
    for (v = vMin; v <= vMax; v += cell) {
      for (u = uMin; u <= uMax; u += cell) {
        x = (u - v) * c;
        y = (u + v) * c;
        if (x < -cell || y < -cell || x > w + cell || y > h + cell) continue;
        lum = sampleLum(src, x, y) / 255;
        lum = (lum - 0.5) * 1.18 + 0.5;
        if (lum < 0) lum = 0;
        else if (lum > 1) lum = 1;
        dark = 1 - lum;
        radius = cell * 0.72 * dark;
        fillCircle(d, w, h, x, y, radius, INK);
      }
    }
    return out;
  }

  function renderMode(mode) {
    if (mode === "raster") return rasterBayer(sourceAt(1000), 4);
    if (mode === "atkinson") return atkinsonMono(sourceAt(1280));
    if (mode === "halftone") return halftoneDots(sourceAt(900));
    return null;
  }

  function paint(frame) {
    hideShader();
    canvas.width = frame.width;
    canvas.height = frame.height;
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.putImageData(frame, 0, 0);
    canvas.classList.add("is-on");
  }

  function applyPaper(mode) {
    if (modeCache[mode]) {
      showShaderCache(modeCache[mode]);
      return;
    }
    setBusy(true);
    Promise.resolve()
      .then(function () { return sourceImg ? sourceImg : loadImage(PHOTO_SRC); })
      .then(function (img) {
        sourceImg = img;
        return loadPaperLib();
      })
      .then(function (P) {
        return loadNoise(P).then(function (noise) { return { P: P, noise: noise }; });
      })
      .then(function (pack) {
        hideCanvas();
        disposeShader();
        if (shaderInner) shaderInner.replaceChildren();
        if (shaderHost) shaderHost.classList.add("is-on");
        var spec = paperUniforms(mode, pack.P, sourceImg, pack.noise);
        shaderMount = new pack.P.ShaderMount(
          shaderInner,
          spec.fragment,
          spec.uniforms,
          { preserveDrawingBuffer: true, alpha: true, antialias: false, premultipliedAlpha: true },
          0,
          0,
          2,
          undefined,
          spec.mipmaps
        );
        return waitShaderFrame(shaderMount);
      })
      .then(function () {
        var snap = captureShader(shaderMount);
        modeCache[mode] = snap;
        if (ditherMode === mode && variant === "variant-1") showShaderCache(snap);
        else {
          disposeShader();
          if (shaderHost) shaderHost.classList.remove("is-on");
        }
      })
      .catch(function (err) {
        console.warn("hero filter", mode, err);
        ditherMode = "original";
        setDitherSelected("original");
        hideOverlays();
      })
      .then(function () { setBusy(false); });
  }

  function applyDither(mode) {
    ditherMode = mode;
    setDitherSelected(mode);
    if (variant !== "variant-1" || mode === "original") {
      hideOverlays();
      return;
    }
    if (isPaperMode(mode)) {
      applyPaper(mode);
      return;
    }
    hideShader();
    if (modeCache[mode]) {
      paint(modeCache[mode]);
      return;
    }
    setBusy(true);
    setTimeout(function () {
      Promise.resolve()
        .then(function () { return sourceImg ? sourceImg : loadImage(PHOTO_SRC); })
        .then(function (img) {
          sourceImg = img;
          if (!fullData) fullData = readFull(img);
          var frame = renderMode(mode);
          modeCache[mode] = frame;
          if (ditherMode === mode && variant === "variant-1") paint(frame);
        })
        .catch(function () {
          ditherMode = "original";
          setDitherSelected("original");
          hideOverlays();
        })
        .then(function () { setBusy(false); });
    }, 30);
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function () { showVariant(t.dataset.target); });
  });
  ditherTabs.forEach(function (t) {
    t.addEventListener("click", function () {
      if (busy) return;
      applyDither(t.dataset.dither);
    });
  });
  toneTabs.forEach(function (t) {
    t.addEventListener("click", function () { applyTone(t.dataset.tone); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    if (e.key === "1") showVariant("variant-1");
    if (e.key === "2") showVariant("variant-2");
    if (e.key === "3") showVariant("variant-3");
  });

  applyTone(tone);

  if (location.hash === "#variant-3" || location.hash.indexOf("#v3-") === 0) {
    showVariant("variant-3");
  } else if (location.hash === "#variant-2" || location.hash.indexOf("#v2-") === 0) {
    showVariant("variant-2");
  } else {
    showVariant("variant-1");
  }
})();
