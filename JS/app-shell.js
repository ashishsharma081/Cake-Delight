/* Legacy file retained for compatibility. Shared runtime moved to JS/site-shell.js. */
(function () {
  const listEl = document.getElementById('cart-items');
  if (!listEl) return;

  const subtotalEl = document.getElementById('subtotal');
  const deliveryEl = document.getElementById('delivery-charge');
  const discountEl = document.getElementById('discount');
  const totalEl = document.getElementById('total');
  const deliverySummaryEl = document.getElementById('delivery-summary');
  const couponInput = document.getElementById('coupon-input');
  const couponMessage = document.getElementById('coupon-message');
  const applyCouponBtn = document.getElementById('apply-coupon');
  const clearCouponBtn = document.getElementById('clear-coupon');
  const checkoutBtn = document.getElementById('checkout-btn');

  function render() {
    const cart = CartService.getCart();

    if (!cart.length) {
      listEl.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
      deliverySummaryEl.textContent = 'No delivery dates selected yet.';
    } else {
      listEl.innerHTML = cart
        .map(
          (item) => `
          <article class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
            <div class="cart-item-content">
              <div class="cart-item-head">
                <h3>${item.name}</h3>
                <button class="remove-item" data-remove="${item.signature}" aria-label="Remove item">×</button>
              </div>
              <p class="cart-meta">${item.size} • ${item.flavor} • ${item.cakeType}</p>
              <p class="cart-meta">Message: ${item.message || 'N/A'}</p>
              <p class="cart-meta">Delivery: ${item.deliveryDate || 'Not selected'}</p>
              <div class="qty-price-row">
                <div class="qty-control">
                  <button data-minus="${item.signature}">-</button>
                  <span>${item.quantity}</span>
                  <button data-plus="${item.signature}">+</button>
                </div>
                <strong>${CartService.formatINR(item.price * item.quantity)}</strong>
              </div>
            </div>
          </article>
      `
        )
        .join('');
    }

    const summary = CartService.getSummary(cart);
    subtotalEl.textContent = CartService.formatINR(summary.subtotal);
    deliveryEl.textContent = summary.deliveryCharge ? CartService.formatINR(summary.deliveryCharge) : 'FREE';
    discountEl.textContent = summary.discount ? `- ${CartService.formatINR(summary.discount)}` : CartService.formatINR(0);
    totalEl.textContent = CartService.formatINR(summary.total);

    const dates = [...new Set(cart.map((item) => item.deliveryDate).filter(Boolean))];
    deliverySummaryEl.textContent = dates.length
      ? `Selected delivery date(s): ${dates.join(', ')}`
      : 'No delivery dates selected yet.';

    const savedCoupon = CartService.getCoupon();
    couponMessage.textContent = savedCoupon ? `${savedCoupon.code} applied (${savedCoupon.label})` : '';

    CartService.renderCartCount();
  }

  listEl.addEventListener('click', (event) => {
    const plusSig = event.target.getAttribute('data-plus');
    const minusSig = event.target.getAttribute('data-minus');
    const removeSig = event.target.getAttribute('data-remove');

    if (plusSig) {
      const item = CartService.getCart().find((entry) => entry.signature === plusSig);
      if (item) CartService.updateQuantity(plusSig, item.quantity + 1);
      render();
    }

    if (minusSig) {
      const item = CartService.getCart().find((entry) => entry.signature === minusSig);
      if (item) CartService.updateQuantity(minusSig, item.quantity - 1);
      render();
    }

    if (removeSig) {
      CartService.removeItem(removeSig);
      render();
    }
  });

  applyCouponBtn?.addEventListener('click', () => {
    const result = CartService.setCoupon(couponInput.value);
    couponMessage.textContent = result.message;
    render();
  });

  clearCouponBtn?.addEventListener('click', () => {
    CartService.clearCoupon();
    couponInput.value = '';
    couponMessage.textContent = 'Coupon removed';
    render();
  });

  checkoutBtn?.addEventListener('click', () => {
    const cart = CartService.getCart();
    if (!cart.length) {
      alert('Please add at least one cake before checkout.');
      return;
    }
    alert('Checkout flow is ready to be connected with payment gateway.');
  });

  render();
})();


// cart.js
/*
  Shared cart service for the cake booking website.
  Handles localStorage persistence and all cart math in one place.
*/
(function () {
  const CART_KEY = 'cakeDelightCartV1';
  const COUPON_KEY = 'cakeDelightCouponV1';

  const validCoupons = {
    CAKE10: { type: 'percent', value: 10, label: '10% off on cakes' },
    SWEET50: { type: 'flat', value: 50, label: '₹50 flat discount' }
  };

  function safeJSONParse(value, fallback) {
    try {
      return JSON.parse(value) ?? fallback;
    } catch (error) {
      return fallback;
    }
  }

  function getCart() {
    return safeJSONParse(localStorage.getItem(CART_KEY), []);
  }

  function saveCart(cartItems) {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    window.dispatchEvent(new CustomEvent('cart:updated', { detail: getSummary(cartItems) }));
  }

  function getCoupon() {
    return safeJSONParse(localStorage.getItem(COUPON_KEY), null);
  }

  function setCoupon(code) {
    const normalized = String(code || '').trim().toUpperCase();
    if (!validCoupons[normalized]) return { ok: false, message: 'Invalid coupon code' };

    localStorage.setItem(COUPON_KEY, JSON.stringify({ code: normalized, ...validCoupons[normalized] }));
    return { ok: true, message: `${normalized} applied` };
  }

  function clearCoupon() {
    localStorage.removeItem(COUPON_KEY);
  }

  function getItemSignature(product) {
    return [product.id, product.size, product.flavor, product.cakeType, product.deliveryDate, product.message]
      .map((value) => String(value || '').trim())
      .join('|');
  }

  function addToCart(product) {
    const cart = getCart();
    const existing = cart.find((item) => item.signature === getItemSignature(product));

    if (existing) {
      existing.quantity += product.quantity || 1;
    } else {
      cart.push({ ...product, quantity: product.quantity || 1, signature: getItemSignature(product) });
    }

    saveCart(cart);
    return cart;
  }

  function updateQuantity(signature, nextQty) {
    const cart = getCart().map((item) => {
      if (item.signature !== signature) return item;
      return { ...item, quantity: Math.max(1, Number(nextQty) || 1) };
    });

    saveCart(cart);
    return cart;
  }

  function removeItem(signature) {
    const cart = getCart().filter((item) => item.signature !== signature);
    saveCart(cart);
    return cart;
  }

  function calculateDiscount(subtotal, coupon) {
    if (!coupon) return 0;
    if (coupon.type === 'percent') return Math.round((subtotal * coupon.value) / 100);
    if (coupon.type === 'flat') return Math.min(subtotal, coupon.value);
    return 0;
  }

  function getSummary(items = getCart()) {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryCharge = subtotal >= 1500 || subtotal === 0 ? 0 : 80;
    const coupon = getCoupon();
    const discount = calculateDiscount(subtotal, coupon);
    const total = Math.max(0, subtotal + deliveryCharge - discount);

    return {
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      deliveryCharge,
      discount,
      total,
      coupon
    };
  }

  function formatINR(value) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(
      value
    );
  }

  function renderCartCount(targetSelector = '[data-cart-count]') {
    const elements = document.querySelectorAll(targetSelector);
    if (!elements.length) return;

    const count = getSummary().itemCount;
    elements.forEach((el) => {
      el.textContent = count;
      el.style.display = count ? 'inline-flex' : 'none';
    });
  }

  window.CartService = {
    getCart,
    addToCart,
    updateQuantity,
    removeItem,
    getSummary,
    formatINR,
    setCoupon,
    getCoupon,
    clearCoupon,
    renderCartCount
  };
})();
