/* ==========================================================================
   MYX — Shared site behaviour
   Header/footer injection · interactive components · motion
   ========================================================================== */
(function () {
  "use strict";

  var BASE = "/"; // user site → repo root
  var EMAIL = "sagarrawatuk2@gmail.com";
  var GITHUB = "https://github.com/sagarRawatUK";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---- Icons (inline SVG) ---- */
  var ICON = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 8h16M4 16h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5 8.5 8.5 0 1 0 20.5 14.7Z"/></svg>',
    chev: '<svg class="chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M15 6l-6 6 6 6"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg>',
    up: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>'
  };

  var NAV = [
    { label: "Apps", href: BASE + "apps/" },
    { label: "Expertise", href: BASE + "#expertise" },
    { label: "Privacy", href: BASE + "privacy/" },
    { label: "Support", href: BASE + "support/" },
    { label: "Contact", href: BASE + "#contact" }
  ];

  var APPS = [
    ["lifeone", "LifeOne"], ["qrone", "QRone"], ["remoteone", "RemoteOne"], ["paymentsuno", "PaymentSuno"],
    ["billone", "BillOne"], ["ireject", "iReject"], ["breedly", "Breedly"]
  ];

  var YEAR = document.documentElement.getAttribute("data-year") || String(new Date().getFullYear());
  var THEME_KEY = "myx-theme";

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) { return null; }
  }

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
    setTheme(store(THEME_KEY) === "light" ? "light" : "dark");
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
      '<div class="container"><nav class="nav" aria-label="Main">' +
      '<a class="brand" href="' + BASE + '" aria-label="MYX home">' +
      '<img src="' + BASE + 'assets/img/myx-logo.webp" alt="" width="32" height="32">' +
      '<span class="wordmark">MY<span>X</span></span>' +
      "</a>" +
      '<div class="nav-links" id="navLinks">' + links +
      '<a class="btn btn-primary nav-cta" href="' + BASE + 'apps/">Explore apps</a>' +
      "</div>" +
      '<div class="nav-actions">' +
      '<button class="theme-toggle" type="button" aria-label="Switch to light mode"></button>' +
      '<a class="btn btn-primary nav-cta magnetic" href="' + BASE + 'apps/">Explore apps</a>' +
      '<button class="nav-toggle" type="button" aria-label="Toggle menu" aria-controls="navLinks" aria-expanded="false">' + ICON.menu + "</button>" +
      "</div>" +
      "</nav></div>";

    setTheme(document.body.getAttribute("data-theme") || "dark");

    host.querySelector(".theme-toggle").addEventListener("click", function () {
      var theme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
      store(THEME_KEY, theme);
      setTheme(theme);
    });

    // Active link (page links only; hash links point into the homepage)
    var path = location.pathname.replace(/index\.html$/, "");
    host.querySelectorAll(".nav-links a:not(.nav-cta)").forEach(function (a) {
      var u = new URL(a.href, location.origin);
      if (u.hash) return;
      var ap = u.pathname.replace(/index\.html$/, "");
      if (ap === path || (ap !== BASE && path.indexOf(ap) === 0)) {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      }
    });

    // Mobile toggle
    var toggle = host.querySelector(".nav-toggle");
    var menu = host.querySelector("#navLinks");
    function setMenu(open) {
      menu.classList.toggle("open", open);
      toggle.innerHTML = open ? ICON.close : ICON.menu;
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    }
    toggle.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) { setMenu(false); toggle.focus(); }
    });

    // Scroll state + progress bar
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);
    var ticking = false;
    function onScroll() {
      host.classList.toggle("scrolled", window.scrollY > 12);
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.setProperty("--p", max > 0 ? (window.scrollY / max).toFixed(4) : 0);
      ticking = false;
    }
    onScroll();
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
    }, { passive: true });
  }

  /* ---- Footer ---- */
  function buildFooter() {
    var host = document.getElementById("site-footer");
    if (!host) return;
    host.className = "site-footer";
    var appLinks = APPS.map(function (a) {
      return '<a href="' + BASE + "apps/" + a[0] + '/">' + a[1] + "</a>";
    }).join("");
    host.innerHTML =
      '<div class="container">' +
      '<div class="footer-grid">' +
      '<div class="footer-brand">' +
      '<a class="brand" href="' + BASE + '"><img src="' + BASE + 'assets/img/myx-logo.webp" alt="" width="32" height="32"><span class="wordmark">MY<span>X</span></span></a>' +
      "<p>Independent Flutter studio by Sagar Rawat. Beautifully simple, privacy-first apps for Android.</p>" +
      '<div class="socials">' +
      '<a href="' + GITHUB + '" target="_blank" rel="noopener" aria-label="GitHub">' + ICON.github + "</a>" +
      '<a href="mailto:' + EMAIL + '" aria-label="Email">' + ICON.mail + "</a>" +
      "</div>" +
      "</div>" +
      '<div class="footer-col"><h4>Apps</h4>' + appLinks + "</div>" +
      '<div class="footer-col"><h4>Explore</h4>' +
      '<a href="' + BASE + 'apps/">All apps</a>' +
      '<a href="' + BASE + '#expertise">Expertise</a>' +
      '<a href="' + BASE + 'support/">Support</a>' +
      '<a href="' + BASE + '#contact">Contact</a>' +
      "</div>" +
      '<div class="footer-col"><h4>Legal</h4>' +
      '<a href="' + BASE + 'privacy/">Privacy policies</a>' +
      '<a href="' + BASE + 'child-safety/">Child safety</a>' +
      '<a href="mailto:' + EMAIL + '">' + EMAIL + "</a>" +
      "</div>" +
      "</div>" +
      '<div class="footer-bottom">' +
      "<span>© " + YEAR + ' MYX · <span class="made-with">Designed &amp; built by Sagar Rawat</span></span>' +
      '<button class="to-top" type="button">Back to top ' + ICON.up + "</button>" +
      "</div>" +
      "</div>" +
      '<div class="footer-wordmark" aria-hidden="true">MYX</div>';

    host.querySelector(".to-top").addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
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
      q.setAttribute("aria-expanded", "false");
      q.addEventListener("click", function () {
        var open = item.classList.contains("open");
        // close siblings within same group
        var group = item.closest(".faq") || document;
        group.querySelectorAll(".faq-item.open").forEach(function (o) {
          if (o !== item) {
            o.classList.remove("open");
            o.querySelector(".faq-a").style.maxHeight = null;
            o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
          }
        });
        item.classList.toggle("open", !open);
        q.setAttribute("aria-expanded", open ? "false" : "true");
        a.style.maxHeight = open ? null : a.scrollHeight + "px";
      });
    });
  }

  /* ---- Carousel arrow icons ---- */
  function injectCarouselIcons() {
    document.querySelectorAll('[data-dir="prev"]').forEach(function (b) { if (!b.innerHTML.trim()) b.innerHTML = ICON.prev; });
    document.querySelectorAll('[data-dir="next"]').forEach(function (b) { if (!b.innerHTML.trim()) b.innerHTML = ICON.next; });
  }

  /* ---- Reveal on scroll, with stagger ---- */
  function initReveal() {
    document.querySelectorAll("[data-stagger]").forEach(function (group) {
      var step = parseFloat(group.getAttribute("data-stagger")) || 0.08;
      group.querySelectorAll(".reveal").forEach(function (el, i) {
        el.style.setProperty("--d", (i * step).toFixed(2) + "s");
      });
    });
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window) || reduceMotion) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---- Animated counters ---- */
  function initCounters() {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length) return;
    function run(el) {
      var target = parseFloat(el.getAttribute("data-count"));
      if (reduceMotion) { el.textContent = target; return; }
      var start = null, dur = 1800;
      function frame(t) {
        if (start === null) start = t;
        var k = Math.min(1, (t - start) / dur);
        var eased = k === 1 ? 1 : 1 - Math.pow(2, -10 * k); // easeOutExpo
        el.textContent = Math.round(target * eased);
        if (k < 1) window.requestAnimationFrame(frame);
      }
      window.requestAnimationFrame(frame);
    }
    if (!("IntersectionObserver" in window)) { els.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    els.forEach(function (e) { e.textContent = "0"; io.observe(e); });
  }

  /* ---- Magnetic buttons ---- */
  function initMagnetic() {
    if (reduceMotion || !finePointer) return;
    document.querySelectorAll(".magnetic").forEach(function (el) {
      var strength = parseFloat(el.getAttribute("data-strength")) || 0.28;
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * strength;
        var y = (e.clientY - r.top - r.height / 2) * strength;
        el.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
  }

  /* ---- Cursor spotlight on cards ---- */
  function initSpotlight() {
    if (!finePointer) return;
    document.querySelectorAll(".app-tile, .cell, .app-card").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (e.clientX - r.left) + "px");
        el.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  /* ---- Hero: pointer parallax + spotlight, scroll depth ---- */
  function initHero() {
    var hero = document.querySelector(".home-hero");
    if (!hero || reduceMotion) return;
    var stack = hero.querySelector(".hero-stack");
    var orbs = hero.querySelectorAll("[data-parallax]");
    var pending = null;

    if (finePointer) {
      hero.addEventListener("pointermove", function (e) {
        pending = e;
        window.requestAnimationFrame(function () {
          if (!pending) return;
          var r = hero.getBoundingClientRect();
          var px = (pending.clientX - r.left) / r.width;
          var py = (pending.clientY - r.top) / r.height;
          hero.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
          hero.style.setProperty("--my", (py * 100).toFixed(1) + "%");
          if (stack) {
            stack.style.setProperty("--px", ((px - 0.5) * 2).toFixed(3));
            stack.style.setProperty("--py", ((py - 0.5) * 2).toFixed(3));
          }
          pending = null;
        });
      });
      hero.addEventListener("pointerleave", function () {
        if (stack) { stack.style.setProperty("--px", 0); stack.style.setProperty("--py", 0); }
      });
    }

    if (orbs.length) {
      var ticking = false;
      window.addEventListener("scroll", function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
          var y = window.scrollY;
          if (y < window.innerHeight * 1.2) {
            orbs.forEach(function (o) {
              o.style.translate = "0 " + (y * parseFloat(o.getAttribute("data-parallax"))).toFixed(1) + "px";
            });
          }
          ticking = false;
        });
      }, { passive: true });
    }
  }

  /* ---- Animated app previews (story-style) ---- */
  function initPreviews() {
    document.querySelectorAll("[data-preview]").forEach(function (root) {
      var imgs = Array.prototype.slice.call(root.querySelectorAll("img"));
      if (!imgs.length) return;
      imgs[0].classList.add("on");
      if (imgs.length < 2 || reduceMotion) return;
      var dur = parseFloat(root.getAttribute("data-preview")) || 3200;
      var bars = document.createElement("div");
      bars.className = "preview-bars";
      bars.setAttribute("aria-hidden", "true");
      bars.innerHTML = imgs.map(function () { return "<i></i>"; }).join("");
      root.appendChild(bars);
      var ticks = bars.querySelectorAll("i");
      bars.style.setProperty("--dur", dur + "ms");

      var i = 0, timer = null, visible = false;
      function show(n) {
        imgs[i].classList.remove("on");
        i = n;
        imgs[i].classList.add("on");
        ticks.forEach(function (t, ti) {
          t.classList.remove("run");
          t.classList.toggle("done", ti < i);
        });
        void ticks[i].offsetWidth; // restart the bar animation
        ticks[i].classList.add("run");
      }
      function start() {
        if (timer || !visible || document.hidden) return;
        show(i);
        timer = window.setInterval(function () { show((i + 1) % imgs.length); }, dur);
      }
      function stop() {
        window.clearInterval(timer);
        timer = null;
        ticks.forEach(function (t) { t.classList.remove("run"); });
      }
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          visible = entries[0].isIntersecting;
          if (visible) start(); else stop();
        }, { threshold: 0.35 }).observe(root);
      } else { visible = true; start(); }
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) stop(); else start();
      });
    });
  }

  /* ---- App filter ---- */
  function initFilter() {
    document.querySelectorAll("[data-filter-group]").forEach(function (bar) {
      var grid = document.getElementById(bar.getAttribute("data-filter-group"));
      if (!grid) return;
      var tiles = grid.querySelectorAll("[data-status]");
      bar.querySelectorAll("button[data-filter]").forEach(function (btn) {
        var f = btn.getAttribute("data-filter");
        var n = f === "all" ? tiles.length : grid.querySelectorAll('[data-status="' + f + '"]').length;
        btn.insertAdjacentHTML("beforeend", '<span class="count">' + n + "</span>");
        btn.addEventListener("click", function () {
          bar.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
          tiles.forEach(function (t) {
            var show = f === "all" || t.getAttribute("data-status") === f;
            t.classList.toggle("is-hidden", !show);
            if (show) t.classList.add("in");
          });
        });
      });
    });
  }

  /* ---- Marquee: duplicate content for a seamless loop ---- */
  function initMarquee() {
    document.querySelectorAll(".marquee-track").forEach(function (track) {
      Array.prototype.slice.call(track.children).forEach(function (c) {
        var clone = c.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        clone.setAttribute("tabindex", "-1");
        track.appendChild(clone);
      });
    });
  }

  /* ---- Copy email ---- */
  function initCopy() {
    document.querySelectorAll("[data-copy]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        if (!navigator.clipboard) return; // fall through to mailto href
        e.preventDefault();
        navigator.clipboard.writeText(btn.getAttribute("data-copy")).then(function () {
          btn.classList.add("done");
          window.setTimeout(function () { btn.classList.remove("done"); }, 1800);
        });
      });
    });
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
    initMarquee();
    initReveal();
    initCounters();
    initMagnetic();
    initSpotlight();
    initHero();
    initPreviews();
    initFilter();
    initCopy();
    fillYears();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
