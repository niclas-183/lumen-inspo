(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var sections = document.querySelectorAll(".section");
  var links = document.querySelectorAll(".section-index a");

  if (!reduce && "IntersectionObserver" in window) {
    var fade = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        fade.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
    sections.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add("is-in");
      } else {
        el.classList.add("is-waiting");
        fade.observe(el);
      }
    });
  }

  if ("IntersectionObserver" in window && links.length) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var hi = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove("is-current"); });
        var a = byId[entry.target.id];
        if (a) a.classList.add("is-current");
      });
    }, { rootMargin: "-18% 0px -72% 0px", threshold: 0 });
    sections.forEach(function (el) { if (el.id) hi.observe(el); });
  }
})();
