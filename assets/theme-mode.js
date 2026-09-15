(function () {
  'use strict';

  var STORAGE_KEY = 'ishaya:theme';
  var root = document.documentElement;

  function currentTheme() {
    var attr = root.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') return attr;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function syncButtons(theme) {
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
      btn.setAttribute(
        'aria-label',
        theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
      );
    });
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
    }
    syncButtons(theme);
    document.dispatchEvent(new CustomEvent('ishaya:theme:change', { detail: { theme: theme } }));
  }

  document.addEventListener('click', function (evt) {
    var btn = evt.target.closest('[data-theme-toggle]');
    if (!btn) return;
    evt.preventDefault();
    setTheme(currentTheme() === 'light' ? 'dark' : 'light');
  });

  if (window.matchMedia) {
    var query = window.matchMedia('(prefers-color-scheme: light)');
    var onChange = function () {
      var stored = null;
      try {
        stored = window.localStorage.getItem(STORAGE_KEY);
      } catch (e) {
        /* ignore */
      }
      if (!stored) syncButtons(currentTheme());
    };
    if (query.addEventListener) query.addEventListener('change', onChange);
    else if (query.addListener) query.addListener(onChange);
  }

  syncButtons(currentTheme());
})();
