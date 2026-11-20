/* Aya Souki — Portfolio : interactions communes à toutes les pages */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function store(key, value) {
    try { if (value === undefined) return localStorage.getItem(key); localStorage.setItem(key, value); } catch (e) { return null; }
  }

  /* ---------- Barre de navigation : thème + menu mobile ---------- */
  var navbar = document.querySelector('.navbar');
  var container = navbar && navbar.querySelector('.nav-container');
  var links = navbar && navbar.querySelector('.nav-links');

  if (container && links) {
    if (!links.id) links.id = 'nav-links';
    var tools = document.createElement('div');
    tools.className = 'nav-tools';

    var themeBtn = document.createElement('button');
    themeBtn.type = 'button';
    themeBtn.className = 'iconBtn themeToggle';
    themeBtn.setAttribute('aria-label', 'Changer de thème (clair / sombre)');
    themeBtn.innerHTML =
      '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
      '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    themeBtn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store('theme', next);
    });

    var menuBtn = document.createElement('button');
    menuBtn.type = 'button';
    menuBtn.className = 'iconBtn navToggle';
    menuBtn.setAttribute('aria-label', 'Ouvrir le menu');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-controls', links.id);
    menuBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
    function setOpen(open) {
      navbar.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    }
    menuBtn.addEventListener('click', function () { setOpen(!navbar.classList.contains('is-open')); });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

    tools.appendChild(themeBtn);
    tools.appendChild(menuBtn);
    container.appendChild(tools);
  }

  /* ---------- Progression de lecture, ombre de la barre, retour en haut ---------- */
  var progress = document.createElement('div');
  progress.className = 'scrollProgress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);

  var toTop = document.createElement('a');
  toTop.href = '#main';
  toTop.className = 'iconBtn toTop';
  toTop.setAttribute('aria-label', 'Retour en haut de la page');
  toTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  toTop.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
  document.body.appendChild(toTop);

  var ticking = false;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
    if (navbar) navbar.classList.toggle('is-scrolled', y > 8);
    toTop.classList.toggle('is-shown', y > 600);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- Apparition au défilement ---------- */
  var revealSelector = [
    '.card', '.kpi', '.xpItem', '.tItem', '.skillCard', '.flagship', '.feature', '.meta',
    '.archFig', '.pipeline', '.contactBlock', '.coverFigure', '.figGrid', '.table-wrap', '.sectionHead'
  ].join(',');
  var targets = Array.prototype.slice.call(document.querySelectorAll(revealSelector));

  if (!reduceMotion && 'IntersectionObserver' in window) {
    targets.forEach(function (el) {
      var siblings = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty('--d', (Math.min(siblings, 5) * 0.07) + 's');
      el.classList.add('reveal');
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Compteurs animés ([data-count]) ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function animateCount(el) {
    var end = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var start = null, duration = 1200;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * eased) + suffix;
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }
  if (counters.length && !reduceMotion && 'IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); co.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  }
})();
