/*
  Renders the product order experience on order.html.
  The HTML file keeps the shared header/footer shell while this script builds
  the product customisation form from the selected product query params.
*/
(function () {
  function createOrderMarkup(productName, image, formattedPrice) {
    return `
      <main class="order-page-main">
        <section class="order-hero">
          <div class="container order-hero__content">
            <div>
              <p class="order-hero__eyebrow">Cake Delight order studio</p>
              <h1>Customize your cake before it reaches the cart</h1>
              <p>
                Pick the size, flavour, cake type and delivery date first.
                We keep the same Cake Delight style here so ordering feels like a smooth extension of shopping.
              </p>
            </div>
            <a class="order-hero__link" href="cart.html">Open cart</a>
          </div>
        </section>

        <section class="container order-layout">
          <article class="order-product-card">
            <div class="order-product-card__media">
              <img id="pImg" src="${image}" alt="${productName}" />
            </div>
            <div class="order-product-card__body">
              <p class="order-product-card__tag">Selected cake</p>
              <h2 id="pName">${productName}</h2>
              <p class="order-product-card__text">
                Freshly baked with signature Cake Delight presentation, packed carefully for gifting and doorstep delivery.
              </p>
              <div class="order-price-chip" id="pPrice">${formattedPrice}</div>
              <ul class="order-benefits">
                <li>Freshly prepared after confirmation</li>
                <li>Same-day support for urgent celebrations</li>
                <li>Custom message and delivery date supported</li>
              </ul>
            </div>
          </article>

          <form id="orderProductForm" class="order-form-panel">
            <div class="order-form-panel__head">
              <div>
                <p class="order-form-panel__eyebrow">Build your order</p>
                <h2>Delivery details</h2>
              </div>
              <div class="order-form-panel__summary">
                <strong id="orderTotal">${formattedPrice}</strong>
                <span id="orderSummaryLine">1 cake(s) • 1 Kg • Chocolate</span>
              </div>
            </div>

            <div class="order-form-grid">
              <label class="order-field">
                <span>Size</span>
                <select id="cakeSize">
                  <option value="500 g">500 g</option>
                  <option value="1 Kg" selected>1 Kg</option>
                  <option value="1.5 Kg">1.5 Kg</option>
                  <option value="2 Kg">2 Kg</option>
                </select>
              </label>

              <label class="order-field">
                <span>Flavour</span>
                <select id="cakeFlavor">
                  <option value="Chocolate" selected>Chocolate</option>
                  <option value="Vanilla">Vanilla</option>
                  <option value="Black Forest">Black Forest</option>
                  <option value="Butterscotch">Butterscotch</option>
                  <option value="Red Velvet">Red Velvet</option>
                </select>
              </label>

              <label class="order-field">
                <span>Cake type</span>
                <select id="cakeType">
                  <option value="Eggless" selected>Eggless</option>
                  <option value="Regular">Regular</option>
                  <option value="Premium fondant">Premium fondant</option>
                </select>
              </label>

              <label class="order-field">
                <span>Quantity</span>
                <input id="cakeQty" type="number" min="1" max="10" value="1" />
              </label>

              <label class="order-field">
                <span>Delivery date</span>
                <input id="deliveryDate" type="date" />
              </label>

              <label class="order-field order-field--full">
                <span>Cake message</span>
                <textarea
                  id="cakeMessage"
                  rows="4"
                  placeholder="Example: Happy Birthday Aarav"
                ></textarea>
              </label>
            </div>

            <div class="order-note-card">
              <strong>Order note</strong>
              <p>
                Add this cake to the cart if you want to keep shopping, or jump
                straight to the cart when you are ready to review everything together.
              </p>
            </div>

            <div class="order-actions">
              <button class="order-btn-secondary" id="addToCartBtn" type="button">Add to cart</button>
              <button class="order-btn-primary" id="buyNowBtn" type="submit">Go to cart</button>
            </div>
          </form>
        </section>
      </main>
    `;
  }

  function initOrderPage() {
    const mobileShellRoot = document.getElementById("mobileShellRoot");
    const siteHeader = document.getElementById("siteHeader");

    if (!mobileShellRoot || !siteHeader) return;

    const params = new URLSearchParams(window.location.search);
    const productName = params.get("name") || "Cake Delight celebration cake";
    const productImage = params.get("img") || "./assets/image/cake-delight-image.png";
    const productPrice = window.CartService
      ? window.CartService.formatINR(window.CartService.parsePrice(params.get("price")))
      : "₹0";

    if (document.getElementById("orderProductForm")) return;

    mobileShellRoot.insertAdjacentHTML(
      "beforebegin",
      createOrderMarkup(productName, productImage, productPrice)
    );

    bindOrderForm(productName, productImage, params.get("price") || "0");
  }

  function bindOrderForm(productName, productImage, rawPrice) {
    const orderForm = document.getElementById("orderProductForm");
    if (!orderForm || !window.CartService) return;

    const qtyInput = document.getElementById("cakeQty");
    const sizeField = document.getElementById("cakeSize");
    const flavorField = document.getElementById("cakeFlavor");
    const cakeTypeField = document.getElementById("cakeType");
    const deliveryField = document.getElementById("deliveryDate");
    const messageField = document.getElementById("cakeMessage");
    const totalLabel = document.getElementById("orderTotal");
    const quickSummary = document.getElementById("orderSummaryLine");
    const addToCartButton = document.getElementById("addToCartBtn");
    const buyNowButton = document.getElementById("buyNowBtn");

    if (deliveryField) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      deliveryField.min = `${yyyy}-${mm}-${dd}`;
    }

    function buildCartPayload() {
      return {
        id: productName,
        name: productName,
        image: productImage,
        price: window.CartService.parsePrice(rawPrice),
        quantity: Math.max(1, Number(qtyInput?.value) || 1),
        size: sizeField?.value || "1 Kg",
        flavor: flavorField?.value || "Chocolate",
        cakeType: cakeTypeField?.value || "Eggless",
        deliveryDate: deliveryField?.value || "",
        message: messageField?.value?.trim() || ""
      };
    }

    function renderOrderSummary() {
      const payload = buildCartPayload();
      const total = payload.price * payload.quantity;
      totalLabel.textContent = window.CartService.formatINR(total);
      quickSummary.textContent = `${payload.quantity} cake(s) • ${payload.size} • ${payload.flavor}`;
    }

    function addCurrentSelection(redirectToCart) {
      const payload = buildCartPayload();
      window.CartService.addToCart(payload);
      window.CartService.showToast(
        redirectToCart ? "Added to cart. Opening cart..." : "Added to cart"
      );

      if (redirectToCart) {
        window.setTimeout(() => {
          window.CartService.goToCart();
        }, 250);
      }
    }

    [qtyInput, sizeField, flavorField, cakeTypeField, deliveryField, messageField].forEach((field) => {
      field?.addEventListener("input", renderOrderSummary);
      field?.addEventListener("change", renderOrderSummary);
    });

    addToCartButton?.addEventListener("click", () => {
      addCurrentSelection(false);
    });

    buyNowButton?.addEventListener("click", () => {
      addCurrentSelection(true);
    });

    orderForm.addEventListener("submit", (event) => {
      event.preventDefault();
      addCurrentSelection(true);
    });

    renderOrderSummary();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initOrderPage);
  } else {
    initOrderPage();
  }
})();
