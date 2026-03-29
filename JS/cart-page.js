/*
  Dedicated cart page controller.
  Reads the shared cart state, renders line items, keeps totals in sync,
  and sends checkout requests to WhatsApp with a full order summary.
*/
(function () {
  function createCartItemMarkup(item) {
    return `
      <article class="cd-cart-item" data-signature="${item.signature}">
        <img class="cd-cart-item__image" src="${item.image}" alt="${item.name}" />
        <div class="cd-cart-item__content">
          <div class="cd-cart-item__top">
            <div>
              <h3>${item.name}</h3>
              <p>${item.size} • ${item.flavor} • ${item.cakeType}</p>
            </div>
            <button class="cd-cart-remove" type="button" data-remove="${item.signature}" aria-label="Remove item">
              <i class="ri-close-line"></i>
            </button>
          </div>
          <div class="cd-cart-meta-grid">
            <div>
              <span>Delivery</span>
              <strong>${item.deliveryDate || "Choose on checkout"}</strong>
            </div>
            <div>
              <span>Message</span>
              <strong>${item.message || "No message"}</strong>
            </div>
          </div>
          <div class="cd-cart-item__bottom">
            <div class="cd-cart-qty" aria-label="Quantity selector">
              <button type="button" data-minus="${item.signature}">-</button>
              <span>${item.quantity}</span>
              <button type="button" data-plus="${item.signature}">+</button>
            </div>
            <strong>${window.CartService.formatINR(item.price * item.quantity)}</strong>
          </div>
        </div>
      </article>
    `;
  }

  function initCartPage() {
    const cartRoot = document.getElementById("cartPage");
    if (!cartRoot || !window.CartService) return;

    const listEl = document.getElementById("cartItemsList");
    const subtotalEl = document.getElementById("cartSubtotal");
    const deliveryEl = document.getElementById("cartDelivery");
    const totalEl = document.getElementById("cartTotal");
    const itemCountEl = document.getElementById("cartItemCount");
    const deliverySummaryEl = document.getElementById("deliverySummary");
    const checkoutButton = document.getElementById("checkoutBtn");
    const clearCartButton = document.getElementById("clearCartBtn");

    function render() {
      const cart = window.CartService.getCart();
      const summary = window.CartService.getSummary(cart);
      const uniqueDates = [...new Set(cart.map((item) => item.deliveryDate).filter(Boolean))];

      if (!cart.length) {
        listEl.innerHTML = `
          <div class="cd-cart-empty">
            <i class="ri-shopping-basket-line"></i>
            <h3>Your cart is empty</h3>
            <p>Add cakes from the collection pages and they will appear here instantly.</p>
            <a class="cd-cart-empty__link" href="birthday-cake.html">Continue shopping</a>
          </div>
        `;
      } else {
        listEl.innerHTML = cart.map(createCartItemMarkup).join("");
      }

      itemCountEl.textContent = `${summary.itemCount} item${summary.itemCount === 1 ? "" : "s"}`;
      subtotalEl.textContent = window.CartService.formatINR(summary.subtotal);
      deliveryEl.textContent = summary.deliveryCharge
        ? window.CartService.formatINR(summary.deliveryCharge)
        : "FREE";
      totalEl.textContent = window.CartService.formatINR(summary.total);
      deliverySummaryEl.textContent = uniqueDates.length
        ? `Delivery date(s): ${uniqueDates.join(", ")}`
        : "Delivery date can be finalised on order confirmation.";

      window.CartService.renderCartCount();
    }

    listEl.addEventListener("click", (event) => {
      const plusSignature = event.target.closest("[data-plus]")?.getAttribute("data-plus");
      const minusSignature = event.target.closest("[data-minus]")?.getAttribute("data-minus");
      const removeSignature = event.target.closest("[data-remove]")?.getAttribute("data-remove");

      if (plusSignature) {
        const item = window.CartService.getCart().find((entry) => entry.signature === plusSignature);
        if (item) {
          window.CartService.updateQuantity(plusSignature, item.quantity + 1);
          render();
        }
      }

      if (minusSignature) {
        const item = window.CartService.getCart().find((entry) => entry.signature === minusSignature);
        if (item) {
          window.CartService.updateQuantity(minusSignature, item.quantity - 1);
          render();
        }
      }

      if (removeSignature) {
        window.CartService.removeItem(removeSignature);
        window.CartService.showToast("Item removed");
        render();
      }
    });

    clearCartButton?.addEventListener("click", () => {
      const signatures = window.CartService.getCart().map((item) => item.signature);
      signatures.forEach((signature) => {
        window.CartService.removeItem(signature);
      });
      window.CartService.showToast("Cart cleared");
      render();
    });

    checkoutButton?.addEventListener("click", () => {
      const cart = window.CartService.getCart();
      if (!cart.length) {
        window.CartService.showToast("Add at least one cake to continue");
        return;
      }

      window.CartService.saveOrderHistory(cart);
      window.open(window.CartService.buildWhatsAppUrl(cart), "_blank");
    });

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCartPage);
  } else {
    initCartPage();
  }
})();
