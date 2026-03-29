/*
  Shared runtime for Cake Delight.
  Keeps cart storage, header actions, toast feedback, and app-style utility pages
  in one place so the product pages can stay simple.
*/
(function () {
  const CART_KEY = "cakeDelightCartV1";
  const COUPON_KEY = "cakeDelightCouponV1";
  const WISHLIST_KEY = "wishlist";
  const ORDER_HISTORY_KEY = "cakeDelightOrderHistoryV1";
  const DEFAULT_IMAGE = "./assets/image/cake-delight-image.png";
  const SUPPORT_NUMBER = "919336002651";
  const SUPPORT_EMAIL = "info@cakedelight.in";
  const SUPPORT_ADDRESS = "Indira Nagar, Lucknow, Uttar Pradesh";

  const mobileCategories = [
    {
      title: "Birthday Cakes",
      href: "birthday-cake.html",
      icon: "ri-cake-3-line",
      description: "Fun cakes, party specials and birthday bestsellers."
    },
    {
      title: "Anniversary",
      href: "Aniversary.html",
      icon: "ri-heart-3-line",
      description: "Romantic, floral and premium celebration cakes."
    },
    {
      title: "Corporate Cakes",
      href: "corporate.html",
      icon: "ri-briefcase-4-line",
      description: "Office celebrations, milestone cakes and events."
    },
    {
      title: "Pastry & Small Cakes",
      href: "pastry.html",
      icon: "ri-cup-line",
      description: "Quick bites, pastries and compact sweet treats."
    },
    {
      title: "Photo Cakes",
      href: "photo-cake.html",
      icon: "ri-image-2-line",
      description: "Photo-print cakes and personalised design options."
    },
    {
      title: "Others",
      href: "other.html",
      icon: "ri-apps-2-line",
      description: "Explore custom themes and everything beyond the basics."
    }
  ];

  const mobileSearchIndex = [
    { name: "Birthday Bash Cake", category: "Birthday Cakes", href: "birthday-cake.html", price: 1200, image: "./assets/image/collection birthday cake1.png", keywords: "birthday bash fresh cream strawberry chocolate" },
    { name: "Star Sprinkle Cake", category: "Birthday Cakes", href: "birthday-cake.html", price: 799, image: "./assets/image/collection birthday cake3.png", keywords: "birthday star sprinkle vanilla rainbow" },
    { name: "Pastel Dream Cake", category: "Birthday Cakes", href: "birthday-cake.html", price: 950, image: "./assets/image/collection birthday cake4.png", keywords: "pastel dream floral vanilla birthday" },
    { name: "Golden Choco Cake", category: "Birthday Cakes", href: "birthday-cake.html", price: 1800, image: "./assets/image/birthday cake1.jpeg", keywords: "golden choco premium chocolate party" },
    { name: "Holi Rang Cupcakes", category: "Birthday Cakes", href: "birthday-cake.html", price: 650, image: "./assets/image/collection birthday cake7.png", keywords: "cupcakes colourful birthday festive" },
    { name: "Strawberry Shahi Cake", category: "Birthday Cakes", href: "birthday-cake.html", price: 549, image: "./assets/image/collection birthday cake8.png", keywords: "strawberry shahi cream" },
    { name: "Gulab Gulkand Cake", category: "Birthday Cakes", href: "birthday-cake.html", price: 700, image: "./assets/image/collection birthday cake5.png", keywords: "gulab gulkand rose" },
    { name: "Rang Birangi Barfi Cake", category: "Birthday Cakes", href: "birthday-cake.html", price: 786, image: "./assets/image/collection birthday cake6.png", keywords: "barfi mithai colourful" },
    { name: "Sone Ki Chandan Cake", category: "Birthday Cakes", href: "birthday-cake.html", price: 1500, image: "./assets/image/collection birthday cake9.png", keywords: "chandan golden premium" },
    { name: "Choco Mewa Barsat Cake", category: "Birthday Cakes", href: "birthday-cake.html", price: 999, image: "./assets/image/Birthday cake 4.jpg", keywords: "choco mewa barsat dry fruits" },
    { name: "Gulabi Dulhan Cake", category: "Birthday Cakes", href: "birthday-cake.html", price: 1600, image: "./assets/image/collection birthday cake12.png", keywords: "gulabi dulhan bridal pink" },
    { name: "Kali Raat Choco Cake", category: "Birthday Cakes", href: "birthday-cake.html", price: 1300, image: "./assets/image/birthday cake2.jpeg", keywords: "dark chocolate premium birthday" },
    { name: "Premium Cake", category: "Birthday Cakes", href: "birthday-cake.html", price: 1399, image: "./assets/image/birthday cake 7.jpeg", keywords: "premium celebration cake" },
    { name: "Strawberry Chocolate Drip Cake", category: "Anniversary", href: "Aniversary.html", price: 1200, image: "./assets/image/collection birthday cake1.png", keywords: "anniversary strawberry chocolate drip" },
    { name: "Dark Chocolate Celebration Cake", category: "Anniversary", href: "Aniversary.html", price: 1200, image: "./assets/image/collection birthday cake3.png", keywords: "anniversary dark chocolate celebration" },
    { name: "Classic Strawberry Drip Cake", category: "Anniversary", href: "Aniversary.html", price: 1200, image: "./assets/image/collection birthday cake1.png", keywords: "classic strawberry drip romantic" },
    { name: "Rainbow Layer Cake", category: "Anniversary", href: "Aniversary.html", price: 1800, image: "./assets/image/collection birthday cake4.png", keywords: "rainbow layer celebration" },
    { name: "Confetti Joy Cake", category: "Anniversary", href: "Aniversary.html", price: 1100, image: "./assets/image/collection birthday cake5.png", keywords: "confetti joy party cake" },
    { name: "Chocolate Strawberry Drip Cake", category: "Anniversary", href: "Aniversary.html", price: 1999, image: "./assets/image/collection birthday cake1.png", keywords: "chocolate strawberry drip premium" },
    { name: "Golden Floral Strawberry Cake", category: "Anniversary", href: "Aniversary.html", price: 1500, image: "./assets/image/collection birthday cake8.png", keywords: "golden floral strawberry" },
    { name: "Blush Pink Rose Cake", category: "Anniversary", href: "Aniversary.html", price: 1200, image: "./assets/image/collection birthday cake12.png", keywords: "blush pink rose anniversary" },
    { name: "Vanilla Dream Cake", category: "Anniversary", href: "Aniversary.html", price: 1370, image: "./assets/image/birthday cake2.jpeg", keywords: "vanilla dream cake" },
    { name: "Pink Velvet Cake", category: "Anniversary", href: "Aniversary.html", price: 950, image: "./assets/image/birthday cake3.jpeg", keywords: "pink velvet cake" },
    { name: "Strawberry Choco Cream Cake", category: "Corporate Cakes", href: "corporate.html", price: 1950, image: "./assets/image/Corporate cake1.png", keywords: "corporate strawberry choco cream office event" },
    { name: "Signature Pastry Cream Cake", category: "Pastry & Small Cakes", href: "pastry.html", price: 1950, image: "./assets/image/pastry cake 1.png", keywords: "pastry small cake cream dessert" },
    { name: "Photo Print Cream Cake", category: "Photo Cakes", href: "photo-cake.html", price: 1950, image: "./assets/image/shopcake1.png", keywords: "photo print edible image custom cake" },
    { name: "Custom Theme Celebration Cake", category: "Others", href: "other.html", price: 1950, image: "./assets/image/Other cake 1.png", keywords: "theme custom others special" }
  ];

  const validCoupons = {
    CAKE10: { type: "percent", value: 10, label: "10% off on cakes" },
    SWEET50: { type: "flat", value: 50, label: "₹50 flat discount" }
  };

  function safeJSONParse(value, fallback) {
    try {
      const parsed = JSON.parse(value);
      return parsed ?? fallback;
    } catch (error) {
      return fallback;
    }
  }

  function parsePrice(value) {
    if (typeof value === "number") return value;

    const numeric = String(value || "")
      .replace(/[^0-9.]/g, "")
      .trim();

    return numeric ? Math.round(Number(numeric)) : 0;
  }

  function slugify(value) {
    return String(value || "cake-delight-item")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function getCart() {
    return safeJSONParse(localStorage.getItem(CART_KEY), []);
  }

  function saveCart(cartItems) {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    const summary = getSummary(cartItems);
    window.dispatchEvent(new CustomEvent("cart:updated", { detail: summary }));
    return summary;
  }

  function getCoupon() {
    return safeJSONParse(localStorage.getItem(COUPON_KEY), null);
  }

  function setCoupon(code) {
    const normalized = String(code || "").trim().toUpperCase();
    if (!validCoupons[normalized]) {
      return { ok: false, message: "Invalid coupon code" };
    }

    localStorage.setItem(
      COUPON_KEY,
      JSON.stringify({ code: normalized, ...validCoupons[normalized] })
    );

    window.dispatchEvent(new CustomEvent("cart:updated", { detail: getSummary() }));
    return { ok: true, message: `${normalized} applied` };
  }

  function clearCoupon() {
    localStorage.removeItem(COUPON_KEY);
    window.dispatchEvent(new CustomEvent("cart:updated", { detail: getSummary() }));
  }

  function getItemSignature(product) {
    return [
      product.id,
      product.size,
      product.flavor,
      product.cakeType,
      product.deliveryDate,
      product.message
    ]
      .map((value) => String(value || "").trim())
      .join("|");
  }

  function normaliseProduct(product) {
    const normalized = {
      id: product.id || slugify(product.name),
      name: product.name || "Cake Delight Cake",
      image: product.image || product.img || DEFAULT_IMAGE,
      price: parsePrice(product.price),
      size: product.size || "Standard",
      flavor: product.flavor || "Classic",
      cakeType: product.cakeType || "Celebration Cake",
      deliveryDate: product.deliveryDate || "",
      message: product.message || "",
      quantity: Math.max(1, Number(product.quantity) || 1)
    };

    normalized.signature = getItemSignature(normalized);
    return normalized;
  }

  function addToCart(product) {
    const cart = getCart();
    const normalizedProduct = normaliseProduct(product);
    const existingItem = cart.find((item) => item.signature === normalizedProduct.signature);

    if (existingItem) {
      existingItem.quantity += normalizedProduct.quantity;
    } else {
      cart.push(normalizedProduct);
    }

    saveCart(cart);
    return cart;
  }

  function updateQuantity(signature, nextQty) {
    const cart = getCart().map((item) => {
      if (item.signature !== signature) return item;

      return {
        ...item,
        quantity: Math.max(1, Number(nextQty) || 1)
      };
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
    if (coupon.type === "percent") return Math.round((subtotal * coupon.value) / 100);
    if (coupon.type === "flat") return Math.min(subtotal, coupon.value);
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
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(value);
  }

  function ensureCounter(target) {
    const existingCounter = target.querySelector("[data-cart-count]");
    if (existingCounter) return existingCounter;

    const badge = document.createElement("span");
    badge.className = "icon-btn__badge";
    badge.setAttribute("data-cart-count", "");
    badge.setAttribute("aria-hidden", "true");
    target.appendChild(badge);
    return badge;
  }

  function renderCartCount(targetSelector = "[data-cart-count]") {
    const count = getSummary().itemCount;
    const elements = document.querySelectorAll(targetSelector);

    elements.forEach((element) => {
      element.textContent = String(count);
      element.style.display = count ? "inline-flex" : "none";
    });
  }

  function showToast(message, variant) {
    const toast =
      document.getElementById("toast") ||
      document.querySelector(".cd-app-toast") ||
      createFallbackToast();

    toast.textContent = message;
    toast.dataset.variant = variant || "default";

    if (toast.classList.contains("cd-app-toast")) {
      toast.classList.add("is-visible");
      window.clearTimeout(showToast.timer);
      showToast.timer = window.setTimeout(() => {
        toast.classList.remove("is-visible");
      }, 2500);
      return;
    }

    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }

  function createFallbackToast() {
    let toast = document.getElementById("cakeDelightFloatingToast");
    if (toast) return toast;

    toast = document.createElement("div");
    toast.id = "cakeDelightFloatingToast";
    toast.className = "toast";
    toast.style.position = "fixed";
    toast.style.left = "50%";
    toast.style.bottom = "28px";
    toast.style.transform = "translateX(-50%) translateY(80px)";
    toast.style.padding = "14px 24px";
    toast.style.borderRadius = "999px";
    toast.style.background = "#1a0a0f";
    toast.style.color = "#fff";
    toast.style.fontWeight = "600";
    toast.style.boxShadow = "0 12px 30px rgba(0,0,0,0.25)";
    toast.style.opacity = "0";
    toast.style.pointerEvents = "none";
    toast.style.transition = "transform 0.3s ease, opacity 0.3s ease";

    const observer = new MutationObserver(() => {
      if (toast.classList.contains("show")) {
        toast.style.transform = "translateX(-50%) translateY(0)";
        toast.style.opacity = "1";
      } else {
        toast.style.transform = "translateX(-50%) translateY(80px)";
        toast.style.opacity = "0";
      }
    });

    observer.observe(toast, { attributes: true, attributeFilter: ["class"] });
    document.body.appendChild(toast);
    return toast;
  }

  function buildWhatsAppUrl(items = getCart()) {
    const summary = getSummary(items);
    const lines = [
      "Hello Cake Delight, I would like to place this order:",
      ""
    ];

    items.forEach((item, index) => {
      lines.push(
        `${index + 1}. ${item.name} x ${item.quantity}`,
        `   Size: ${item.size}`,
        `   Flavour: ${item.flavor}`,
        `   Cake type: ${item.cakeType}`,
        `   Delivery: ${item.deliveryDate || "To be confirmed"}`,
        `   Message: ${item.message || "No custom message"}`,
        `   Item total: ${formatINR(item.price * item.quantity)}`,
        ""
      );
    });

    lines.push(
      `Subtotal: ${formatINR(summary.subtotal)}`,
      `Delivery: ${summary.deliveryCharge ? formatINR(summary.deliveryCharge) : "FREE"}`,
      `Discount: ${summary.discount ? `- ${formatINR(summary.discount)}` : formatINR(0)}`,
      `Grand total: ${formatINR(summary.total)}`
    );

    return `https://wa.me/${SUPPORT_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  }

  function getOrderHistory() {
    const history = safeJSONParse(localStorage.getItem(ORDER_HISTORY_KEY), []);
    return Array.isArray(history) ? history : [];
  }

  function saveOrderHistory(items = getCart()) {
    const normalizedItems = items.map((item) => normaliseProduct(item));
    if (!normalizedItems.length) return null;

    const summary = getSummary(normalizedItems);
    const entry = {
      id: `order-${Date.now()}`,
      createdAt: new Date().toISOString(),
      total: summary.total,
      subtotal: summary.subtotal,
      deliveryCharge: summary.deliveryCharge,
      itemCount: summary.itemCount,
      items: normalizedItems
    };

    const nextHistory = [entry, ...getOrderHistory()].slice(0, 12);
    localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(nextHistory));
    window.dispatchEvent(new CustomEvent("order-history:updated", { detail: nextHistory }));
    return entry;
  }

  function goToCart() {
    window.location.href = "cart.html";
  }

  function goToAccount() {
    window.location.href = "account.html";
  }

  function goToWishlist() {
    window.location.href = "app-wishlist.html";
  }

  function getWishlist() {
    const wishlist = safeJSONParse(localStorage.getItem(WISHLIST_KEY), []);
    if (!Array.isArray(wishlist)) return [];

    const normalized = wishlist
      .map((item) => {
        if (typeof item === "string") {
          return {
            id: slugify(item),
            name: item,
            image: DEFAULT_IMAGE,
            price: 0,
            category: "Saved cake",
            href: "birthday-cake.html"
          };
        }

        if (!item || typeof item !== "object") return null;

        return {
          id: item.id || slugify(item.name),
          name: item.name || "Cake Delight Cake",
          image: item.image || DEFAULT_IMAGE,
          price: parsePrice(item.price),
          category: item.category || "Saved cake",
          href: item.href || "birthday-cake.html"
        };
      })
      .filter(Boolean);

    const seen = new Set();
    return normalized.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }

  function saveWishlist(items) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("wishlist:updated", { detail: items }));
  }

  function isWishlistedById(id) {
    return getWishlist().some((item) => item.id === id);
  }

  function addWishlistItem(item) {
    const normalized = {
      id: item.id || slugify(item.name),
      name: item.name || "Cake Delight Cake",
      image: item.image || DEFAULT_IMAGE,
      price: parsePrice(item.price),
      category: item.category || "Saved cake",
      href: item.href || "birthday-cake.html"
    };

    const wishlist = getWishlist();
    if (wishlist.some((entry) => entry.id === normalized.id)) {
      return { added: false, items: wishlist };
    }

    const nextWishlist = [...wishlist, normalized];
    saveWishlist(nextWishlist);
    return { added: true, items: nextWishlist };
  }

  function removeWishlistItem(id) {
    const nextWishlist = getWishlist().filter((item) => item.id !== id);
    saveWishlist(nextWishlist);
    return nextWishlist;
  }

  function getPageCategory() {
    const path = window.location.pathname.toLowerCase();
    if (path.endsWith("birthday-cake.html")) return { label: "Birthday Cakes", href: "birthday-cake.html" };
    if (path.endsWith("aniversary.html")) return { label: "Anniversary", href: "Aniversary.html" };
    if (path.endsWith("corporate.html")) return { label: "Corporate Cakes", href: "corporate.html" };
    if (path.endsWith("pastry.html")) return { label: "Pastry & Small Cakes", href: "pastry.html" };
    if (path.endsWith("photo-cake.html")) return { label: "Photo Cakes", href: "photo-cake.html" };
    if (path.endsWith("other.html")) return { label: "Others", href: "other.html" };
    return { label: "Featured Collection", href: "birthday-cake.html" };
  }

  function extractProductData(button, fallbackName) {
    const card = button?.closest(".cake-card, .cd-card, .product-card, [data-name]");
    const orderLink = card?.querySelector(".order-link");
    const quickViewButton = card?.querySelector(".quick-view-btn");
    const imageEl = card?.querySelector("img");
    const titleEl = card?.querySelector(".cake-title, .card-name, h3");
    const badgeEl = card?.querySelector(".cake-badge");
    const pageCategory = getPageCategory();

    return {
      id: slugify(
        orderLink?.dataset.name ||
          quickViewButton?.dataset.name ||
          titleEl?.textContent ||
          fallbackName ||
          "cake-delight-item"
      ),
      name:
        orderLink?.dataset.name ||
        quickViewButton?.dataset.name ||
        titleEl?.textContent?.trim() ||
        fallbackName ||
        "Cake Delight Cake",
      image:
        orderLink?.dataset.img ||
        quickViewButton?.dataset.img ||
        imageEl?.getAttribute("src") ||
        DEFAULT_IMAGE,
      price:
        orderLink?.dataset.price ||
        quickViewButton?.dataset.price ||
        0,
      category:
        badgeEl?.textContent?.trim() ||
        quickViewButton?.dataset.eyebrow?.replace(/[^\w\s&-]/g, "").trim() ||
        pageCategory.label,
      href: pageCategory.href
    };
  }

  function buildOrderUrl(item) {
    return (
      `order.html?name=${encodeURIComponent(item.name)}` +
      `&price=${encodeURIComponent(item.price)}` +
      `&img=${encodeURIComponent(item.image || DEFAULT_IMAGE)}`
    );
  }

  function getSearchResults(query) {
    const normalizedQuery = String(query || "").trim().toLowerCase();
    const source = normalizedQuery
      ? mobileSearchIndex.filter((item) =>
          `${item.name} ${item.category} ${item.keywords || ""}`
            .toLowerCase()
            .includes(normalizedQuery)
        )
      : mobileSearchIndex.slice(0, 8);

    const seen = new Set();
    return source.filter((item) => {
      const key = `${item.name}|${item.category}|${item.price}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function createSearchResultMarkup(item) {
    return `
      <a class="cd-search-result" href="${buildOrderUrl(item)}">
        <img src="${item.image || DEFAULT_IMAGE}" alt="${item.name}" />
        <div class="cd-search-result__body">
          <strong>${item.name}</strong>
          <span>${item.category}</span>
        </div>
        <b>${formatINR(item.price)}</b>
      </a>
    `;
  }

  function createDesktopSearchCardMarkup(item) {
    return `
      <article class="cd-desktop-search-card" data-search-href="${buildOrderUrl(item)}" role="link" tabindex="0" aria-label="Open ${item.name}">
        <img class="cd-desktop-search-card__image" src="${item.image || DEFAULT_IMAGE}" alt="${item.name}" />
        <div class="cd-desktop-search-card__body">
          <span class="cd-desktop-search-card__category">${item.category}</span>
          <h3>${item.name}</h3>
          <p>${item.keywords || "Freshly baked Cake Delight special."}</p>
          <div class="cd-desktop-search-card__footer">
            <strong>${formatINR(item.price)}</strong>
            <span class="cd-desktop-search-card__cta">Order now</span>
          </div>
        </div>
      </article>
    `;
  }

  function ensureDesktopChromeStyles() {
    const head = document.head;
    if (!head) return;

    ["./CSS/style.css", "./CSS/style2.css"].forEach((href) => {
      const exists = [...head.querySelectorAll('link[rel="stylesheet"]')].some((link) =>
        (link.getAttribute("href") || "").includes(href.replace("./", ""))
      );

      if (exists) return;

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      head.appendChild(link);
    });
  }

  function createDesktopHeaderMarkup() {
    return `
      <header class="site-header" id="siteHeader">
        <div class="main-header">
          <div class="main-header__inner container">
            <a href="index.html" class="logo" aria-label="Cake Delight Home">
              <img src="./assets/image/logo2.png" class="img-header-logo" alt="Cake Delight logo" />
            </a>
            <div class="search-bar" role="search">
              <svg class="search-bar__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input class="search-bar__input" type="search" placeholder="Search for cakes, occasion, flavor and more" aria-label="Search cakes" />
            </div>
            <div class="header-right">
              <a href="mailto:${SUPPORT_EMAIL}" class="header-contact" aria-label="Email us">
                <svg class="header-contact__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <polyline points="2,4 12,13 22,4" />
                </svg>
                <span class="header-contact__text">${SUPPORT_EMAIL}</span>
              </a>
              <a href="tel:+${SUPPORT_NUMBER}" class="header-contact" aria-label="Call us">
                <svg class="header-contact__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.42 19 19.45 19.45 0 0 1 5 12.59 19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91A16 16 0 0 0 14 15.83l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span class="header-contact__text">+91 9336002651</span>
              </a>
              <button class="icon-btn" aria-label="View cart">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </button>
              <button class="icon-btn" aria-label="My account">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
              <button class="hamburger" id="hamburgerBtn" aria-label="Open menu" aria-expanded="false">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
        <nav class="nav-bar" id="navBar" aria-label="Main navigation">
          <div class="nav-bar__inner container">
            <ul class="nav-list" role="list">
              <li class="nav-list__item"><a href="birthday-cake.html" class="nav-link">Birthday Cakes</a></li>
              <li class="nav-list__item"><a href="Aniversary.html" class="nav-link">Anniversary</a></li>
              <li class="nav-list__item"><a href="corporate.html" class="nav-link">Corporate Cakes</a></li>
              <li class="nav-list__item"><a href="pastry.html" class="nav-link">Pastry &amp; Small Cakes</a></li>
              <li class="nav-list__item"><a href="photo-cake.html" class="nav-link">Photo Cakes</a></li>
              <li class="nav-list__item"><a href="other.html" class="nav-link">Others</a></li>
            </ul>
          </div>
        </nav>
      </header>
    `;
  }

  function createDesktopFooterMarkup() {
    return `
      <footer class="footer-section">
        <div class="container py-5">
          <div class="row gy-4">
            <div class="col-lg-4 col-md-6">
              <h3 class="footer-logo">Cake Delight</h3>
              <p class="footer-text">
                Cake Delight offers express delivery across Lucknow.<br>
                Place your order before 8:00 PM, and we’ll deliver it <br>straight to your doorstep.
                We ensure fresh <br> baking, careful packaging, and timely <br>
                delivery so that every celebration <br> stays special.
              </p>
              <div class="footer-contact">
                <p><i class="ri-mail-line"></i> ${SUPPORT_EMAIL}</p>
                <p><i class="ri-phone-line"></i> +91 9336002651</p>
              </div>
            </div>
            <div class="col-lg-2 col-md-6">
              <h5 class="footer-title">Know US</h5>
              <ul class="footer-list">
                <li><i class="ri-phone-line"></i> Contact US</li>
                <li><i class="ri-map-pin-line"></i> Locate US</li>
                <li><i class="ri-image-line"></i> Media</li>
                <li><i class="ri-shopping-cart-line"></i> Why Choose Us?</li>
              </ul>
            </div>
            <div class="col-lg-3 col-md-6">
              <h5 class="footer-title">HELP</h5>
              <ul class="footer-list">
                <li>Privacy Policy</li>
                <li>Customer Satisfaction</li>
                <li>Terms & Condition</li>
                <li>FAQ’s</li>
              </ul>
            </div>
            <div class="col-lg-3 col-md-6">
              <h5 class="footer-title">Social Links</h5>
              <ul class="footer-social">
                <li><i class="ri-instagram-line"></i> @cake_delight</li>
                <li><i class="ri-facebook-circle-fill"></i> Cake Delight</li>
                <li><i class="ri-whatsapp-line"></i> +91 9336002651</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-bottom">© 2026 cakedelight Pvt Ltd.</div>
      </footer>
      <div class="whatsapp-widget">
        <a href="https://wa.me/${SUPPORT_NUMBER}" target="_blank" class="whatsapp-link" rel="noreferrer">
          <span class="whatsapp-text">Chat with us</span>
          <span class="whatsapp-icon"><i class="ri-whatsapp-line"></i></span>
        </a>
      </div>
    `;
  }

  function injectDesktopChrome() {
    if (document.querySelector(".site-header")) return;

    const main = document.querySelector("main");
    const mobileRoot = document.getElementById("mobileShellRoot");
    if (!main || !mobileRoot) return;

    ensureDesktopChromeStyles();
    document.body.insertAdjacentHTML("afterbegin", createDesktopHeaderMarkup());
    mobileRoot.insertAdjacentHTML("beforebegin", createDesktopFooterMarkup());
  }

  function bindDesktopHeader() {
    const siteHeader = document.getElementById("siteHeader");
    if (siteHeader && siteHeader.dataset.desktopBound !== "true") {
      siteHeader.dataset.desktopBound = "true";
      window.addEventListener("scroll", () => {
        siteHeader.classList.toggle("site-header--scrolled", window.scrollY > 10);
      });
    }

    const desktopHamburger = document.getElementById("hamburgerBtn");
    const desktopNavBar = document.getElementById("navBar");
    if (desktopHamburger && desktopNavBar && desktopHamburger.dataset.menuBound !== "true") {
      desktopHamburger.dataset.menuBound = "true";
      desktopHamburger.addEventListener("click", () => {
        const expanded = desktopHamburger.getAttribute("aria-expanded") === "true";
        desktopHamburger.setAttribute("aria-expanded", String(!expanded));
        desktopHamburger.classList.toggle("hamburger--open");
        desktopNavBar.classList.toggle("nav-bar--open");
      });
    }
  }

  window.CartService = {
    parsePrice,
    getCart,
    addToCart,
    updateQuantity,
    removeItem,
    getSummary,
    formatINR,
    setCoupon,
    getCoupon,
    clearCoupon,
    renderCartCount,
    showToast,
    buildWhatsAppUrl,
    getOrderHistory,
    saveOrderHistory,
    goToCart,
    goToAccount,
    goToWishlist,
    getWishlist,
    addWishlistItem,
    removeWishlistItem,
    supportNumber: SUPPORT_NUMBER,
    supportEmail: SUPPORT_EMAIL,
    supportAddress: SUPPORT_ADDRESS
  };

  function bindHeaderActions() {
    document.querySelectorAll(".header-right").forEach((container) => {
      if (container.querySelector('button[aria-label="Wishlist"]')) return;

      const accountButton = container.querySelector('button[aria-label="My account"]');
      if (!accountButton) return;

      const wishlistButton = document.createElement("button");
      wishlistButton.className = "icon-btn";
      wishlistButton.type = "button";
      wishlistButton.setAttribute("aria-label", "Wishlist");
      wishlistButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 21s-6.716-4.35-9.193-7.68C.54 10.265 1.19 5.9 4.75 4.235c2.072-.97 4.572-.336 6.25 1.375 1.678-1.71 4.178-2.345 6.25-1.375 3.56 1.665 4.21 6.03 1.943 9.085C18.716 16.65 12 21 12 21z"/>
        </svg>
      `;
      container.insertBefore(wishlistButton, accountButton);
    });

    document.querySelectorAll('button[aria-label="View cart"]').forEach((button) => {
      if (button.dataset.cartBound === "true") return;
      button.dataset.cartBound = "true";
      button.type = "button";
      ensureCounter(button);
      button.addEventListener("click", window.CartService.goToCart);
    });

    document.querySelectorAll('button[aria-label="Wishlist"]').forEach((button) => {
      if (button.dataset.wishlistBound === "true") return;
      button.dataset.wishlistBound = "true";
      button.type = "button";
      button.addEventListener("click", window.CartService.goToWishlist);
    });

    document.querySelectorAll('button[aria-label="My account"]').forEach((button) => {
      if (button.dataset.accountBound === "true") return;
      button.dataset.accountBound = "true";
      button.type = "button";
      button.addEventListener("click", window.CartService.goToAccount);
    });

    renderCartCount();
  }

  function buildMobileShell() {
    const root = document.getElementById("mobileShellRoot");
    if (!root) return;

    document.body.classList.add("has-mobile-shell");
    root.innerHTML = `
      <div class="cd-mobile-shell" id="cdMobileShell">
        <div class="cd-appbar">
          <a class="cd-appbar__logo" href="index.html" aria-label="Cake Delight home">
            <img src="./assets/image/logo2.png" alt="Cake Delight" />
          </a>
          <div class="cd-appbar__search">
            <i class="ri-search-line"></i>
            <input id="cdGlobalSearch" type="search" placeholder="Search cakes, pastries, flavours and more" aria-label="Search products" />
            <button class="cd-search-clear" type="button" data-mobile-action="close-search" aria-label="Close search">
              <i class="ri-close-line"></i>
            </button>
          </div>
          <div class="cd-appbar__actions">
            <button class="cd-action-btn" type="button" data-mobile-action="cart" aria-label="View cart">
              <i class="ri-shopping-cart-2-line"></i>
              <span class="cd-count-badge" data-cart-count></span>
            </button>
            <button class="cd-action-btn" type="button" data-mobile-action="wishlist" aria-label="Wishlist">
              <i class="ri-heart-3-line"></i>
            </button>
            <button class="cd-action-btn cd-action-btn--menu" type="button" data-mobile-action="menu" aria-label="Open menu">
              <i class="ri-menu-line"></i>
            </button>
          </div>
        </div>

        <section class="cd-search-panel" aria-label="Product search">
          <div class="cd-search-panel__head">
            <div>
              <strong>Search the full catalogue</strong>
              <p>Find cakes, pastries, flavours and celebration styles from across the site.</p>
            </div>
          </div>
          <div id="cdSearchResults" class="cd-search-results"></div>
        </section>

        <div class="cd-drawer-scrim" data-drawer-close></div>
        <aside class="cd-drawer" aria-label="Quick links">
          <div class="cd-drawer__header">
            <div>
              <h3>Cake Delight</h3>
              <p>Quick links, account shortcuts and order help.</p>
            </div>
            <button class="cd-drawer__close" type="button" data-drawer-close aria-label="Close menu">
              <i class="ri-close-line"></i>
            </button>
          </div>
          <div class="cd-drawer__links">
            <a class="cd-drawer__link" href="index.html">
              <i class="ri-home-5-line"></i>
              <span>Home</span>
              <i class="ri-arrow-right-s-line"></i>
            </a>
            <a class="cd-drawer__link" href="new-category.html">
              <i class="ri-layout-grid-line"></i>
              <span>Browse categories</span>
              <i class="ri-arrow-right-s-line"></i>
            </a>
            <a class="cd-drawer__link" href="cart.html">
              <i class="ri-shopping-cart-2-line"></i>
              <span>Cart</span>
              <i class="ri-arrow-right-s-line"></i>
            </a>
            <a class="cd-drawer__link" href="app-wishlist.html">
              <i class="ri-heart-3-line"></i>
              <span>Wishlist</span>
              <i class="ri-arrow-right-s-line"></i>
            </a>
            <a class="cd-drawer__link" href="account.html">
              <i class="ri-user-3-line"></i>
              <span>Account</span>
              <i class="ri-arrow-right-s-line"></i>
            </a>
            <a class="cd-drawer__link" href="contact.html">
              <i class="ri-phone-line"></i>
              <span>Call support</span>
              <i class="ri-arrow-right-s-line"></i>
            </a>
          </div>
          <div class="cd-drawer__footer">
            <strong>Need a custom cake?</strong>
            <p>Call or message the Cake Delight team for urgent celebration orders.</p>
          </div>
        </aside>

        <nav class="cd-bottom-nav" aria-label="Mobile navigation">
          <button class="cd-bottom-nav__item" type="button" data-link="index.html">
            <i class="ri-home-5-line"></i>
            <span>Home</span>
          </button>
          <button class="cd-bottom-nav__item" type="button" data-link="new-category.html">
            <i class="ri-layout-grid-line"></i>
            <span>Category</span>
          </button>
          <button class="cd-bottom-nav__item" type="button" data-mobile-action="search">
            <i class="ri-search-line"></i>
            <span>Search</span>
          </button>
          <button class="cd-bottom-nav__item" type="button" data-link="account.html">
            <i class="ri-user-3-line"></i>
            <span>Account</span>
          </button>
        </nav>

        <div class="cd-app-toast" aria-live="polite"></div>
      </div>
    `;

    const mobileShell = document.getElementById("cdMobileShell");
    const currentPath = window.location.pathname.toLowerCase();
    const drawerTriggers = root.querySelectorAll("[data-drawer-close]");
    const drawerOpenButton = root.querySelector('[data-mobile-action="menu"]');
    const cartButton = root.querySelector('[data-mobile-action="cart"]');
    const wishlistButton = root.querySelector('[data-mobile-action="wishlist"]');
    const searchButtons = root.querySelectorAll('[data-mobile-action="search"]');
    const closeSearchButton = root.querySelector('[data-mobile-action="close-search"]');
    const searchInput = document.getElementById("cdGlobalSearch");
    const searchResults = document.getElementById("cdSearchResults");
    const isShopPage =
      currentPath.endsWith("birthday-cake.html") ||
      currentPath.endsWith("aniversary.html") ||
      currentPath.endsWith("corporate.html") ||
      currentPath.endsWith("pastry.html") ||
      currentPath.endsWith("photo-cake.html") ||
      currentPath.endsWith("other.html") ||
      currentPath.endsWith("order.html");
    const isCategoryPage = currentPath.endsWith("new-category.html");
    const isAccountArea =
      currentPath.endsWith("account.html") ||
      currentPath.endsWith("app-wishlist.html") ||
      currentPath.endsWith("wishlist.html") ||
      currentPath.endsWith("cart.html");

    function closeDrawer() {
      mobileShell.classList.remove("is-drawer-open");
    }

    function renderSearchResults() {
      const results = getSearchResults(searchInput?.value);

      if (!results.length) {
        searchResults.innerHTML = `
          <div class="cd-search-empty">
            No cake matched that search yet. Try flavour names, occasions or category keywords.
          </div>
        `;
        return;
      }

      searchResults.innerHTML = results.map(createSearchResultMarkup).join("");
    }

    function openSearch() {
      closeDrawer();
      mobileShell.classList.add("is-search-open");
      renderSearchResults();
      window.setTimeout(() => {
        searchInput?.focus();
      }, 80);
      updateBottomNavState();
    }

    function closeSearch() {
      mobileShell.classList.remove("is-search-open");
      if (searchInput) searchInput.value = "";
      renderSearchResults();
      updateBottomNavState();
    }

    function updateBottomNavState() {
      root.querySelectorAll(".cd-bottom-nav__item").forEach((button) => {
        const link = button.getAttribute("data-link");
        const action = button.getAttribute("data-mobile-action");
        let isActive = false;

        if (link === "index.html") {
          isActive = currentPath.endsWith("index.html") || currentPath === "/";
        }

        if (link === "account.html") {
          isActive = isAccountArea;
        }

        if (link === "new-category.html") {
          isActive = isCategoryPage || isShopPage;
        }

        if (action === "search") {
          isActive = mobileShell.classList.contains("is-search-open");
        }

        button.classList.toggle("is-active", isActive);
      });
    }

    drawerOpenButton?.addEventListener("click", () => {
      closeSearch();
      mobileShell.classList.add("is-drawer-open");
    });

    drawerTriggers.forEach((element) => {
      element.addEventListener("click", closeDrawer);
    });

    cartButton?.addEventListener("click", window.CartService.goToCart);
    wishlistButton?.addEventListener("click", window.CartService.goToWishlist);

    searchButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (mobileShell.classList.contains("is-search-open")) {
          closeSearch();
          return;
        }

        openSearch();
      });
    });

    closeSearchButton?.addEventListener("click", closeSearch);
    searchInput?.addEventListener("input", renderSearchResults);

    root.querySelectorAll(".cd-bottom-nav__item").forEach((button) => {
      const link = button.getAttribute("data-link");
      if (!link) return;

      button.addEventListener("click", () => {
        window.location.href = link;
      });
    });

    renderSearchResults();
    updateBottomNavState();
    bindHeaderActions();
    renderCartCount();
  }

  function initDesktopSearch() {
    const searchInput = document.querySelector(".search-bar__input");
    const siteHeader = document.getElementById("siteHeader");
    if (!searchInput || !siteHeader) return;

    let layer = document.getElementById("cdDesktopSearchLayer");
    if (!layer) {
      layer = document.createElement("div");
      layer.id = "cdDesktopSearchLayer";
      layer.className = "cd-desktop-search-layer";
      layer.hidden = true;
      layer.innerHTML = `
        <div class="cd-desktop-search-layer__scrim" data-desktop-search-close></div>
        <section class="cd-desktop-search-panel" aria-label="Cake search results">
          <div class="cd-desktop-search-panel__head">
            <div>
              <p class="cd-desktop-search-panel__eyebrow">Live cake search</p>
              <h2>Find and order cakes instantly</h2>
            </div>
            <button class="cd-desktop-search-panel__close" type="button" data-desktop-search-close aria-label="Close search">
              <i class="ri-close-line"></i>
            </button>
          </div>
          <p class="cd-desktop-search-panel__status" id="cdDesktopSearchStatus"></p>
          <div class="cd-desktop-search-grid" id="cdDesktopSearchGrid"></div>
        </section>
      `;
      document.body.appendChild(layer);
    }

    const grid = layer.querySelector("#cdDesktopSearchGrid");
    const status = layer.querySelector("#cdDesktopSearchStatus");
    const closeTriggers = layer.querySelectorAll("[data-desktop-search-close]");

    function syncOffset() {
      layer.style.setProperty("--cd-desktop-search-top", `${siteHeader.offsetHeight}px`);
    }

    function openLayer() {
      syncOffset();
      layer.hidden = false;
      document.body.classList.add("cd-desktop-search-open");
      window.requestAnimationFrame(() => {
        layer.classList.add("is-visible");
      });
    }

    function closeLayer(clearInput = false) {
      layer.classList.remove("is-visible");
      document.body.classList.remove("cd-desktop-search-open");
      window.setTimeout(() => {
        if (!layer.classList.contains("is-visible")) {
          layer.hidden = true;
        }
      }, 180);

      if (clearInput) {
        searchInput.value = "";
      }
    }

    function renderDesktopResults() {
      const query = String(searchInput.value || "").trim();
      const results = getSearchResults(query);
      const hasQuery = Boolean(query);

      if (!hasQuery) {
        status.textContent = "Popular Cake Delight picks you can order right away.";
        grid.innerHTML = results
          .slice(0, 8)
          .map(createDesktopSearchCardMarkup)
          .join("");
        return;
      }

      if (results.length) {
        status.textContent = `${results.length} cake${results.length === 1 ? "" : "s"} matched “${query}”.`;
        grid.innerHTML = results.map(createDesktopSearchCardMarkup).join("");
        return;
      }

      const fallbackResults = mobileSearchIndex.slice(0, 4);
      status.innerHTML = `Sorry, <strong>${query}</strong> is not available right now. You can still explore these fresh picks instead.`;
      grid.innerHTML = `
        <div class="cd-desktop-search-empty">
          <div class="cd-desktop-search-empty__copy">
            <h3>That cake is not available yet</h3>
            <p>Try flavour names like chocolate, strawberry, vanilla, premium or photo cake. You can also jump into our available collections below.</p>
            <div class="cd-desktop-search-empty__actions">
              <a class="cd-desktop-search-empty__link" href="new-category.html">Browse all categories</a>
              <a class="cd-desktop-search-empty__link cd-desktop-search-empty__link--ghost" href="birthday-cake.html">See birthday cakes</a>
            </div>
          </div>
          <div class="cd-desktop-search-suggestions">
            ${fallbackResults.map(createDesktopSearchCardMarkup).join("")}
          </div>
        </div>
      `;
    }

    grid.addEventListener("click", (event) => {
      const card = event.target.closest("[data-search-href]");
      if (!card) return;
      window.location.href = card.getAttribute("data-search-href");
    });

    grid.addEventListener("keydown", (event) => {
      const card = event.target.closest("[data-search-href]");
      if (!card) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        window.location.href = card.getAttribute("data-search-href");
      }
    });

    searchInput.addEventListener("focus", () => {
      openLayer();
      renderDesktopResults();
    });

    searchInput.addEventListener("input", () => {
      if (window.innerWidth <= 768) return;
      openLayer();
      renderDesktopResults();
    });

    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeLayer();
        searchInput.blur();
      }

      if (event.key === "Enter") {
        const firstResult = getSearchResults(searchInput.value)[0];
        if (firstResult) {
          event.preventDefault();
          window.location.href = buildOrderUrl(firstResult);
        }
      }
    });

    closeTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        closeLayer();
      });
    });

    window.addEventListener("resize", () => {
      syncOffset();
      if (window.innerWidth <= 768) {
        closeLayer();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && layer.classList.contains("is-visible")) {
        closeLayer();
      }
    });
  }

  function renderWishlistPage() {
    const wishlistGrid = document.getElementById("wishlistGrid");
    if (!wishlistGrid) return;

    const wishlist = getWishlist();

    if (!wishlist.length) {
      wishlistGrid.innerHTML = `
        <div class="cd-empty-state">
          <i class="ri-heart-add-2-line"></i>
          <h3>Your wishlist is empty</h3>
          <p>Save your favourite cakes from the shop and they will appear here for quick re-ordering.</p>
        </div>
      `;
      return;
    }

    wishlistGrid.innerHTML = wishlist
      .map((item) => {
        return `
          <article class="cd-wishlist-card" data-wishlist-id="${item.id}">
            <img src="${item.image || DEFAULT_IMAGE}" alt="${item.name}" />
            <div class="cd-wishlist-card__body">
              <h3 class="cd-wishlist-card__title">${item.name}</h3>
              <p class="cd-wishlist-card__meta">
                ${item.category || "Saved cake"}${item.price ? ` • ${formatINR(item.price)}` : ""}
              </p>
              <div class="cd-wishlist-card__actions">
                <button class="cd-pill-btn cd-pill-btn--primary" type="button" data-wishlist-order="${buildOrderUrl(item)}">Order now</button>
                <button class="cd-pill-btn cd-pill-btn--ghost" type="button" data-wishlist-open="${item.href || "birthday-cake.html"}">View collection</button>
                <button class="cd-pill-btn cd-pill-btn--secondary" type="button" data-wishlist-remove>Remove</button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    wishlistGrid.querySelectorAll("[data-wishlist-open]").forEach((button) => {
      button.addEventListener("click", () => {
        window.location.href = button.getAttribute("data-wishlist-open") || "birthday-cake.html";
      });
    });

    wishlistGrid.querySelectorAll("[data-wishlist-order]").forEach((button) => {
      button.addEventListener("click", () => {
        window.location.href = button.getAttribute("data-wishlist-order") || "order.html";
      });
    });

    wishlistGrid.querySelectorAll("[data-wishlist-remove]").forEach((button) => {
      button.addEventListener("click", (event) => {
        const card = event.currentTarget.closest("[data-wishlist-id]");
        if (!card) return;

        removeWishlistItem(card.getAttribute("data-wishlist-id"));
        renderWishlistPage();
        showToast("Removed from wishlist");
      });
    });
  }

  function syncWishlistButtons() {
    const buttons = document.querySelectorAll(".cake-wish, [onclick*='addToWishlist'], [onclick*='toggleWish']");

    buttons.forEach((button) => {
      const product = extractProductData(button);
      button.dataset.wishlistId = product.id;
      button.dataset.wishlistName = product.name;

      const active = isWishlistedById(product.id);
      button.classList.toggle("active", active);
      button.textContent = active ? "❤" : "♡";
      button.setAttribute("aria-pressed", String(active));
      button.setAttribute("type", "button");
    });
  }

  window.toggleWish = function (button) {
    const product = extractProductData(button);

    if (isWishlistedById(product.id)) {
      removeWishlistItem(product.id);
      showToast("Removed from wishlist");
    } else {
      addWishlistItem(product);
      showToast("Added to wishlist");
    }

    syncWishlistButtons();
    renderWishlistPage();
  };

  window.addToWishlist = function (nameOrButton) {
    let product;

    if (typeof nameOrButton === "string") {
      product = extractProductData(null, nameOrButton);
      product.id = slugify(nameOrButton);
      product.name = nameOrButton;
    } else {
      product = extractProductData(nameOrButton);
    }

    if (isWishlistedById(product.id)) {
      showToast("Already in wishlist");
      return;
    }

    addWishlistItem(product);
    syncWishlistButtons();
    renderWishlistPage();
    showToast("Added to wishlist");
  };

  function initSharedUi() {
    injectDesktopChrome();
    bindDesktopHeader();
    bindHeaderActions();
    buildMobileShell();
    initDesktopSearch();
    renderWishlistPage();
    syncWishlistButtons();
    renderCartCount();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSharedUi);
  } else {
    initSharedUi();
  }

  window.addEventListener("cart:updated", () => {
    renderCartCount();
  });

  window.addEventListener("storage", () => {
    renderCartCount();
    renderWishlistPage();
    syncWishlistButtons();
  });

  window.addEventListener("wishlist:updated", () => {
    renderWishlistPage();
    syncWishlistButtons();
  });
})();
