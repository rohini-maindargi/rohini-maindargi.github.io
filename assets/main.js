(function () {
  var root = document.documentElement;
  root.classList.add("js");

  // Theme toggle (remembered per browser; works without storage)
  var btn = document.getElementById("theme-toggle");
  function current() {
    var forced = root.getAttribute("data-theme");
    if (forced) return forced;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  function paint() {
    if (btn) {
      btn.textContent = current() === "dark" ? "☀" : "☾";
      btn.setAttribute("aria-label", "Switch to " + (current() === "dark" ? "light" : "dark") + " theme");
    }
  }
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) {}
  paint();
  if (btn) {
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      paint();
    });
  }

  // Scroll reveal
  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
})();
