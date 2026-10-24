(function () {
  "use strict";

  var S = window.SITE;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Elimină diacriticele pentru căutare ("rosii" găsește "roșii")
  function norm(str) {
    return String(str).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  /* ---------- Poze: încarcă poza dacă există, altfel rămâne spațiul gol ---------- */
  function loadPhoto(el) {
    var src = el.getAttribute("data-photo");
    if (!src || el.dataset.loaded) return;
    el.dataset.loaded = "1";
    var img = new Image();
    img.onload = function () {
      el.style.backgroundImage = "url('" + src.replace(/'/g, "\\'") + "')";
      el.classList.add("has-image");
    };
    img.src = src;
  }

  function loadPhotos(root) {
    var els = $$(".photo[data-photo]", root);
    if (!("IntersectionObserver" in window)) { els.forEach(loadPhoto); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { loadPhoto(e.target); io.unobserve(e.target); }
      });
    }, { rootMargin: "300px" });
    els.forEach(function (el) { io.observe(el); });
  }

  function photoAttrs(img, emoji, label) {
    return 'data-photo="' + esc(img) + '" data-emoji="' + esc(emoji) + '" data-label="' + esc(label) + '"';
  }

  /* ---------- Produse ---------- */
  var activeCat = "toate";
  var query = "";

  function renderChips() {
    var counts = {};
    S.products.forEach(function (p) { counts[p.cat] = (counts[p.cat] || 0) + 1; });
    $("#categoryChips").innerHTML = S.categories.map(function (c) {
      var n = c.id === "toate" ? S.products.length : (counts[c.id] || 0);
      return '<button class="chip' + (c.id === activeCat ? " is-active" : "") + '" role="tab" aria-selected="' + (c.id === activeCat) + '" data-cat="' + esc(c.id) + '">' +
        '<span aria-hidden="true">' + c.emoji + '</span> ' + esc(c.label) + ' <small>' + n + '</small></button>';
    }).join("");
  }

  function renderProducts() {
    var q = norm(query.trim());
    var list = S.products.filter(function (p) {
      var okCat = activeCat === "toate" || p.cat === activeCat;
      var okQ = !q || norm(p.name + " " + p.producer).indexOf(q) !== -1;
      return okCat && okQ;
    });

    $("#productGrid").innerHTML = list.map(function (p, i) {
      return '<article class="product" data-cat="' + esc(p.cat) + '" style="--i:' + (i % 8) + '">' +
        '<div class="product__media photo" ' + photoAttrs(p.img, p.emoji, p.name) + '>' +
          (p.badge ? '<span class="badge">' + esc(p.badge) + '</span>' : "") +
        '</div>' +
        '<div class="product__body">' +
          '<h3>' + esc(p.name) + '</h3>' +
          '<p class="product__producer">' + esc(p.producer) + '</p>' +
          '<p class="product__price">' + esc(p.price) + '</p>' +
        '</div>' +
      '</article>';
    }).join("");

    $("#productEmpty").hidden = list.length > 0;
    loadPhotos($("#productGrid"));
  }

  function initProducts() {
    renderChips();
    renderProducts();
    $("#categoryChips").addEventListener("click", function (e) {
      var btn = e.target.closest(".chip");
      if (!btn) return;
      activeCat = btn.getAttribute("data-cat");
      renderChips();
      renderProducts();
    });
    $("#productSearch").addEventListener("input", function (e) {
      query = e.target.value;
      renderProducts();
    });
  }

  /* ---------- Branduri ---------- */
  function initials(name) {
    return name.split(/\s+/).filter(function (w) { return w.length > 2 || /^[A-ZĂÂÎȘȚ]/.test(w); })
      .slice(0, 2).map(function (w) { return w[0]; }).join("").toUpperCase();
  }

  function initBrands() {
    $("#brandGrid").innerHTML = S.brands.map(function (b, i) {
      return '<article class="brand reveal" style="--brand:' + esc(b.color) + ';--i:' + (i % 4) + '">' +
        '<div class="brand__logo">' +
          '<span class="brand__initials">' + esc(initials(b.name)) + '</span>' +
          (b.logo ? '<img src="' + esc(b.logo) + '" alt="Logo ' + esc(b.name) + '" loading="lazy" onerror="this.remove()">' : "") +
        '</div>' +
        '<div class="brand__body">' +
          '<span class="brand__type">' + esc(b.type) + '</span>' +
          '<h3>' + esc(b.name) + '</h3>' +
          '<p>' + esc(b.desc) + '</p>' +
          '<span class="brand__stand">📍 ' + esc(b.stand) + '</span>' +
        '</div>' +
      '</article>';
    }).join("");
  }

  /* ---------- Galerie + lightbox ---------- */
  var lbIndex = 0;

  function initGallery() {
    $("#gallery").innerHTML = S.gallery.map(function (g, i) {
      return '<button class="gallery__item ' + (g.size ? "gallery__item--" + esc(g.size) : "") + ' reveal" data-index="' + i + '" aria-label="Deschide: ' + esc(g.caption) + '">' +
        '<span class="gallery__photo photo" ' + photoAttrs(g.img, g.emoji, g.caption) + '></span>' +
        '<span class="gallery__caption">' + esc(g.caption) + '</span>' +
      '</button>';
    }).join("");
    loadPhotos($("#gallery"));

    var lb = $("#lightbox");
    var lastFocus = null;

    function show(i) {
      lbIndex = (i + S.gallery.length) % S.gallery.length;
      var g = S.gallery[lbIndex];
      var old = $("#lbImg");
      var fresh = old.cloneNode(false);
      fresh.removeAttribute("style");
      fresh.className = "lightbox__img photo";
      fresh.setAttribute("data-photo", g.img);
      fresh.setAttribute("data-emoji", g.emoji);
      fresh.setAttribute("data-label", g.caption);
      delete fresh.dataset.loaded;
      old.parentNode.replaceChild(fresh, old);
      loadPhoto(fresh);
      $("#lbCaption").textContent = g.caption + "  ·  " + (lbIndex + 1) + " / " + S.gallery.length;
    }
    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      lb.hidden = false;
      document.body.classList.add("no-scroll");
      $("#lbClose").focus();
    }
    function close() {
      lb.hidden = true;
      document.body.classList.remove("no-scroll");
      if (lastFocus) lastFocus.focus();
    }

    $("#gallery").addEventListener("click", function (e) {
      var item = e.target.closest(".gallery__item");
      if (item) open(+item.getAttribute("data-index"));
    });
    $("#lbClose").addEventListener("click", close);
    $("#lbPrev").addEventListener("click", function () { show(lbIndex - 1); });
    $("#lbNext").addEventListener("click", function () { show(lbIndex + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(lbIndex - 1);
      if (e.key === "ArrowRight") show(lbIndex + 1);
    });

    // Swipe pe telefon
    var startX = null;
    lb.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(lbIndex + (dx < 0 ? 1 : -1));
      startX = null;
    });
  }

  /* ---------- Program + „Deschis acum” (ora României) ---------- */
  function bucharestNow() {
    var parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Bucharest", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
    }).formatToParts(new Date());
    var get = function (t) { return (parts.find(function (p) { return p.type === t; }) || {}).value; };
    var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { day: days[get("weekday")], minutes: (+get("hour")) * 60 + (+get("minute")) };
  }
  function toMin(hhmm) { var p = hhmm.split(":"); return (+p[0]) * 60 + (+p[1]); }

  function initHours() {
    var now = bucharestNow();
    $("#hoursTable tbody").innerHTML = S.hours.map(function (h) {
      var today = h.day === now.day;
      return '<tr' + (today ? ' class="is-today"' : "") + '><th scope="row">' + esc(h.label) + (today ? ' <span class="today-tag">azi</span>' : "") + '</th>' +
        '<td>' + (h.open ? esc(h.open) + " – " + esc(h.close) : "Închis") + '</td></tr>';
    }).join("");

    var h = S.hours.find(function (x) { return x.day === now.day; });
    var isOpen = h && h.open && now.minutes >= toMin(h.open) && now.minutes < toMin(h.close);
    var pill = $("#statusPill");
    pill.classList.toggle("is-open", !!isOpen);
    $(".status-pill__text", pill).textContent = isOpen ? "Deschis acum · până la " + h.close : "Închis acum";
  }

  /* ---------- Contact & hartă ---------- */
  function initContact() {
    var c = S.contact;
    $("#addressText").textContent = c.address;
    $("#transportText").textContent = c.transport;
    $("#parkingText").textContent = c.parking;
    $("#phoneLink").textContent = c.phone;
    $("#phoneLink").href = "tel:" + c.phone.replace(/\s+/g, "");
    $("#emailLink").textContent = c.email;
    $("#emailLink").href = "mailto:" + c.email;
    $("#mapFrame").src = "https://www.google.com/maps?q=" + encodeURIComponent(c.mapQuery) + "&output=embed";
    $("#socials").innerHTML = c.socials.map(function (s) {
      return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + '</a>';
    }).join("");

    var form = $("#contactForm");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = $("#formNote");
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        note.textContent = "Te rugăm să completezi numele, un email valid și mesajul.";
        note.className = "form__note is-error";
        return;
      }
      var d = new FormData(form);
      var body = "Nume: " + d.get("nume") + "\nTelefon: " + (d.get("telefon") || "-") + "\nEmail: " + d.get("email") + "\n\n" + d.get("mesaj");
      window.location.href = "mailto:" + c.email + "?subject=" + encodeURIComponent("[Site] " + d.get("subiect")) + "&body=" + encodeURIComponent(body);
      note.textContent = "Mulțumim! Se deschide aplicația ta de email pentru a trimite mesajul.";
      note.className = "form__note is-ok";
      form.reset();
      form.classList.remove("was-validated");
    });
  }

  /* ---------- Header, meniu mobil, scrollspy ---------- */
  function initNav() {
    var header = $("#header");
    var burger = $("#burger");
    var nav = $("#nav");

    function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 40); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    function setMenu(open) {
      burger.setAttribute("aria-expanded", open);
      burger.setAttribute("aria-label", open ? "Închide meniul" : "Deschide meniul");
      header.classList.toggle("menu-open", open);
      document.body.classList.toggle("no-scroll", open);
    }
    burger.addEventListener("click", function () { setMenu(burger.getAttribute("aria-expanded") !== "true"); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });

    if ("IntersectionObserver" in window) {
      var links = $$("a", nav);
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) { a.classList.toggle("is-current", a.getAttribute("href") === "#" + en.target.id); });
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      $$("main section[id]").forEach(function (s) { spy.observe(s); });
    }
  }

  /* ---------- Animații ---------- */
  function initReveal() {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  function initCounters() {
    var els = $$("[data-count]");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    els.forEach(function (el) {
      var target = +el.getAttribute("data-count");
      var suffix = target >= 10 ? "+" : "";
      if (reduce) { el.textContent = target + suffix; return; }
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / 1400, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suffix : "");
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* ---------- Start ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    $("#year").textContent = new Date().getFullYear();
    initNav();
    initProducts();
    initBrands();
    initGallery();
    initHours();
    initContact();
    loadPhotos(document);
    initReveal();
    initCounters();
    setInterval(initHours, 60000);
  });
})();
