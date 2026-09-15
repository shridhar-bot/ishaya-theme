(function () {
  'use strict';

  var WISHLIST_KEY = 'ishaya:wishlist';

  /* ----------------------------------------------------------------------
     Wishlist — localStorage backed
     ---------------------------------------------------------------------- */

  function readWishlist() {
    try {
      var raw = window.localStorage.getItem(WISHLIST_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(function (entry) {
        return entry && typeof entry === 'object' && entry.id && entry.handle;
      });
    } catch (e) {
      return [];
    }
  }

  function writeWishlist(items) {
    try {
      window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
    } catch (e) {
      /* no-op */
    }
    updateWishlistCount(items.length);
    document.dispatchEvent(new CustomEvent('ishaya:wishlist:change', { detail: { items: items } }));
  }

  function indexOfId(items, id) {
    for (var i = 0; i < items.length; i++) {
      if (String(items[i].id) === String(id)) return i;
    }
    return -1;
  }

  function updateWishlistCount(count) {
    document.querySelectorAll('[data-wishlist-count]').forEach(function (badge) {
      badge.textContent = count;
      badge.classList.toggle('zb-cart-count--hidden', count === 0);
    });
  }

  function syncWishlistButtons() {
    var items = readWishlist();
    document.querySelectorAll('[data-wishlist-toggle]').forEach(function (btn) {
      var active = indexOfId(items, btn.getAttribute('data-wishlist-id')) !== -1;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.classList.toggle('is-active', active);
    });
    updateWishlistCount(items.length);
  }

  function toggleWishlist(btn) {
    var id = btn.getAttribute('data-wishlist-id');
    var handle = btn.getAttribute('data-wishlist-handle');
    if (!id || !handle) return;

    var items = readWishlist();
    var index = indexOfId(items, id);

    if (index === -1) {
      items.push({ id: String(id), handle: handle });
      btn.classList.add('is-active', 'is-bursting');
      btn.setAttribute('aria-pressed', 'true');
      window.setTimeout(function () {
        btn.classList.remove('is-bursting');
      }, 450);
    } else {
      items.splice(index, 1);
      btn.classList.remove('is-active');
      btn.setAttribute('aria-pressed', 'false');
    }

    writeWishlist(items);
    syncWishlistButtons();
  }

  function removeFromWishlist(id) {
    var items = readWishlist();
    var index = indexOfId(items, id);
    if (index === -1) return;
    items.splice(index, 1);
    writeWishlist(items);
    syncWishlistButtons();
  }

  window.IshayaWishlist = {
    read: readWishlist,
    remove: removeFromWishlist,
    sync: syncWishlistButtons
  };

  /* ----------------------------------------------------------------------
     Variant tray (multi-variant quick add)
     ---------------------------------------------------------------------- */

  function closeAllTrays(except) {
    document.querySelectorAll('[data-variant-tray]').forEach(function (tray) {
      if (tray === except) return;
      tray.hidden = true;
      var card = tray.closest('[data-product-card]');
      var trigger = card && card.querySelector('[data-quick-add-open]');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  function toggleTray(trigger) {
    var card = trigger.closest('[data-product-card]');
    if (!card) return;
    var tray = card.querySelector('[data-variant-tray]');
    if (!tray) return;

    var willOpen = tray.hidden;
    closeAllTrays(tray);
    tray.hidden = !willOpen;
    trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');

    if (willOpen) {
      var firstEnabled = tray.querySelector('.ishaya-product-card__variant-btn:not([disabled])');
      if (firstEnabled) firstEnabled.focus();
    }
  }

  /* ----------------------------------------------------------------------
     Quick add — Shopify Cart AJAX API
     ---------------------------------------------------------------------- */

  function setStatus(card, message, isError) {
    var status = card && card.querySelector('[data-quick-add-status]');
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('ishaya-product-card__status--error', !!isError);
    status.classList.toggle('is-visible', !!message);

    if (message) {
      window.setTimeout(function () {
        status.textContent = '';
        status.classList.remove('is-visible', 'ishaya-product-card__status--error');
      }, 3200);
    }
  }

  function quickAdd(btn) {
    var variantId = btn.getAttribute('data-variant-id');
    if (!variantId || btn.classList.contains('is-loading')) return;

    var card = btn.closest('[data-product-card]');
    btn.classList.add('is-loading');
    btn.disabled = true;

    fetch(window.Shopify && window.Shopify.routes ? window.Shopify.routes.root + 'cart/add.js' : '/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ items: [{ id: Number(variantId), quantity: 1 }] })
    })
      .then(function (res) {
        return res.json().then(function (data) {
          if (!res.ok) throw new Error(data.description || data.message || 'Could not add to bag');
          return data;
        });
      })
      .then(function () {
        closeAllTrays();
        setStatus(card, 'Added to bag');

        if (typeof window.refreshCartDrawer === 'function') window.refreshCartDrawer();
        if (typeof window.openCartDrawer === 'function') window.openCartDrawer();

        document.dispatchEvent(new CustomEvent('ishaya:cart:added', { detail: { variantId: variantId } }));
      })
      .catch(function (err) {
        setStatus(card, err.message || 'Could not add to bag', true);
      })
      .finally(function () {
        btn.classList.remove('is-loading');
        btn.disabled = false;
      });
  }

  /* ----------------------------------------------------------------------
     Delegated bindings
     ---------------------------------------------------------------------- */

  document.addEventListener('click', function (evt) {
    var wishlistBtn = evt.target.closest('[data-wishlist-toggle]');
    if (wishlistBtn) {
      evt.preventDefault();
      toggleWishlist(wishlistBtn);
      return;
    }

    var trayTrigger = evt.target.closest('[data-quick-add-open]');
    if (trayTrigger) {
      evt.preventDefault();
      toggleTray(trayTrigger);
      return;
    }

    var addBtn = evt.target.closest('[data-quick-add]');
    if (addBtn) {
      evt.preventDefault();
      quickAdd(addBtn);
      return;
    }

    if (!evt.target.closest('[data-variant-tray]')) closeAllTrays();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') closeAllTrays();
  });

  document.addEventListener('DOMContentLoaded', syncWishlistButtons);
  document.addEventListener('ishaya:grid:updated', syncWishlistButtons);

  if (document.readyState !== 'loading') syncWishlistButtons();
})();
