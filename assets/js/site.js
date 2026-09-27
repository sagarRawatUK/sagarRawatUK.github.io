/* ==========================================================================
   MYX — Shared site behaviour
   Reusable header/footer injection + interactive components
   ========================================================================== */
(function () {
  "use strict";

  var BASE = "/"; // user site → repo root

  /* ---- Icons (inline SVG) ---- */
  var ICON = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5 8.5 8.5 0 1 0 20.5 14.7Z"/></svg>',
    chev: '<svg class="chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M15 6l-6 6 6 6"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg>'
  };

  var NAV = [
    { label: "Home", href: BASE },
    { label: "Apps", href: BASE + "apps/" },
    { label: "Support", href: BASE + "support/" },
    { label: "Privacy", href: BASE + "privacy/" }
  ];

  var YEAR = document.documentElement.getAttribute("data-year") || "2026";
  var THEME_KEY = "myx-theme";

  function setTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    var button = document.querySelector(".theme-toggle");
    if (!button) return;
    var light = theme === "light";
    button.innerHTML = light ? ICON.moon : ICON.sun;
    button.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
    button.setAttribute("title", light ? "Switch to dark mode" : "Switch to light mode");
  }

  function initTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    setTheme(saved === "light" ? "light" : "dark");
  }

  /* ---- Header ---- */
  function buildHeader() {
    var host = document.getElementById("site-header");
    if (!host) return;
    var links = NAV.map(function (n) {
      return '<a href="' + n.href + '">' + n.label + "</a>";
    }).join("");
    host.className = "site-header";
    host.innerHTML =
      '<div class="container"><nav class="nav">' +
      '<a class="brand" href="' + BASE + '" aria-label="MYX home">' +
      '<img src="' + BASE + 'assets/myx_logo.png" alt="MYX logo">' +
      '<span class="wordmark">MY<span>X</span></span>' +
      "</a>" +
      '<button class="theme-toggle" type="button" aria-label="Switch to light mode"></button>' +
      '<button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">' + ICON.menu + "</button>" +
      '<div class="nav-links" id="navLinks">' + links +
      '<a class="btn btn-primary nav-cta" href="' + BASE + 'apps/">Explore Apps</a>' +
      "</div>" +
      "</nav></div>";

    setTheme(document.body.getAttribute("data-theme") || "dark");

    host.querySelector(".theme-toggle").addEventListener("click", function () {
      var theme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
      localStorage.setItem(THEME_KEY, theme);
      setTheme(theme);
    });

    // Active link
    var path = location.pathname.replace(/index\.html$/, "");
    host.querySelectorAll(".nav-links a:not(.nav-cta)").forEach(function (a) {
      var ap = new URL(a.href, location.origin).pathname.replace(/index\.html$/, "");
      if (ap === path || (ap !== BASE && path.indexOf(ap) === 0)) a.classList.add("active");
    });

    // Mobile toggle
    var toggle = host.querySelector(".nav-toggle");
    var menu = host.querySelector("#navLinks");
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.innerHTML = open ? ICON.close : ICON.menu;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.innerHTML = ICON.menu;
        document.body.style.overflow = "";
      });
    });

    // Scroll state
    var onScroll = function () {
      host.classList.toggle("scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Footer ---- */
  function buildFooter() {
    var host = document.getElementById("site-footer");
    if (!host) return;
    host.className = "site-footer";
    host.innerHTML =
      '<div class="container">' +
      '<div class="footer-grid">' +
      '<div class="footer-brand">' +
      '<a class="brand" href="' + BASE + '"><img src="' + BASE + 'assets/myx_logo.png" alt="MYX"><span class="wordmark">MY<span>X</span></span></a>' +
      "<p>Privacy-first Android apps crafted with care. AI, productivity and everyday utilities that respect your data.</p>" +
      "</div>" +
      '<div class="footer-col"><h4>Apps</h4>' +
      '<a href="' + BASE + 'apps/lifeone/">LifeOne</a>' +
      '<a href="' + BASE + 'apps/qrone/">QRone</a>' +
      '<a href="' + BASE + 'apps/remoteone/">RemoteOne</a>' +
      '<a href="' + BASE + 'apps/breedly/">Breedly</a>' +
      '<a href="' + BASE + 'apps/ireject/">iReject</a>' +
      '<a href="' + BASE + 'apps/billone/">BillOne</a>' +
      '<a href="' + BASE + 'apps/paymentsuno/">PaymentSuno</a>' +
      "</div>" +
      '<div class="footer-col"><h4>Company</h4>' +
      '<a href="' + BASE + 'apps/">All Apps</a>' +
      '<a href="' + BASE + 'support/">Support</a>' +
      '<a href="' + BASE + 'privacy/">Privacy</a>' +
      "</div>" +
      '<div class="footer-col"><h4>Contact</h4>' +
      '<a href="mailto:sagarrawatuk2@gmail.com">Email us</a>' +
      '<a href="' + BASE + 'support/">Help center</a>' +
      "</div>" +
      "</div>" +
      '<div class="footer-bottom">' +
      "<span>© " + YEAR + " MYX · Building privacy-first apps</span>" +
      '<a href="mailto:sagarrawatuk2@gmail.com">sagarrawatuk2@gmail.com</a>' +
      "</div>" +
      "</div>";
  }

  /* ---- Carousel ---- */
  function initCarousels() {
    document.querySelectorAll("[data-carousel]").forEach(function (root) {
      var track = root.querySelector(".carousel-track");
      var slides = Array.prototype.slice.call(track.children);
      if (!slides.length) return;
      var dotsWrap = root.querySelector(".carousel-dots");
      var prev = root.querySelector('[data-dir="prev"]');
      var next = root.querySelector('[data-dir="next"]');

      var dots = slides.map(function (_, i) {
        var b = document.createElement("button");
        b.setAttribute("aria-label", "Go to slide " + (i + 1));
        b.addEventListener("click", function () { go(i); });
        dotsWrap.appendChild(b);
        return b;
      });

      function go(i) {
        i = Math.max(0, Math.min(slides.length - 1, i));
        var s = slides[i];
        track.scrollTo({ left: s.offsetLeft - (track.clientWidth - s.clientWidth) / 2, behavior: "smooth" });
      }
      function current() {
        var c = track.scrollLeft + track.clientWidth / 2, best = 0, min = Infinity;
        slides.forEach(function (s, i) {
          var d = Math.abs(s.offsetLeft + s.clientWidth / 2 - c);
          if (d < min) { min = d; best = i; }
        });
        return best;
      }
      function sync() {
        var i = current();
        dots.forEach(function (d, di) { d.classList.toggle("active", di === i); });
      }
      if (prev) prev.addEventListener("click", function () { go(current() - 1); });
      if (next) next.addEventListener("click", function () { go(current() + 1); });
      track.addEventListener("scroll", function () { window.requestAnimationFrame(sync); }, { passive: true });
      sync();
    });
  }

  /* ---- FAQ accordion ---- */
  function initFaq() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var q = item.querySelector(".faq-q");
      var a = item.querySelector(".faq-a");
      if (!q || !a) return;
      if (!q.querySelector(".chev")) q.insertAdjacentHTML("beforeend", ICON.chev);
      q.addEventListener("click", function () {
        var open = item.classList.contains("open");
        // close siblings within same group
        var group = item.closest(".faq") || document;
        group.querySelectorAll(".faq-item.open").forEach(function (o) {
          if (o !== item) { o.classList.remove("open"); o.querySelector(".faq-a").style.maxHeight = null; }
        });
        item.classList.toggle("open", !open);
        a.style.maxHeight = open ? null : a.scrollHeight + "px";
      });
    });
  }

  /* ---- Carousel arrow icons ---- */
  function injectCarouselIcons() {
    document.querySelectorAll('[data-dir="prev"]').forEach(function (b) { if (!b.innerHTML.trim()) b.innerHTML = ICON.prev; });
    document.querySelectorAll('[data-dir="next"]').forEach(function (b) { if (!b.innerHTML.trim()) b.innerHTML = ICON.next; });
  }

  /* ---- Reveal on scroll ---- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---- Year fill ---- */
  function fillYears() {
    document.querySelectorAll("[data-fill-year]").forEach(function (e) { e.textContent = YEAR; });
  }

  function init() {
    initTheme();
    buildHeader();
    buildFooter();
    injectCarouselIcons();
    initCarousels();
    initFaq();
    initReveal();
    fillYears();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
