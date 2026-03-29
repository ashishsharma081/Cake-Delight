(function () {
  const qtyPlusBtn = document.getElementById("qtyPlus");
  const qtyMinusBtn = document.getElementById("qtyMinus");
  const qtyValue = document.getElementById("qtyVal");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalOrderBtn = document.querySelector(".btn-order-now");
  const toast = document.getElementById("toast");

  if (!qtyPlusBtn || !qtyMinusBtn || !qtyValue || !modalOverlay || !modalCloseBtn || !modalOrderBtn) {
    return;
  }

  let qty = 1;
  let activeProduct = null;

  function getSpecValue(specsString, label) {
    return String(specsString || "")
      .split("|")
      .map((entry) => entry.split(":"))
      .find((parts) => parts[0] && parts[0].trim().toLowerCase() === label.toLowerCase())?.[1]
      ?.trim();
  }

  qtyPlusBtn.addEventListener("click", () => {
    qty = Math.min(qty + 1, 10);
    qtyValue.textContent = String(qty);
  });

  qtyMinusBtn.addEventListener("click", () => {
    qty = Math.max(qty - 1, 1);
    qtyValue.textContent = String(qty);
  });

  function openModal(data) {
    activeProduct = data;
    document.getElementById("modalImg").src = data.img || "";
    document.getElementById("modalEyebrow").textContent = data.eyebrow || "Birthday";
    document.getElementById("modalTitle").textContent = data.name || "";
    document.getElementById("modalPrice").textContent = data.price || "";
    document.getElementById("modalPriceNote").textContent = data.note || "per piece";

    document.getElementById("modalRating").innerHTML = `
      <span class="stars">★★★★★</span>
      <span class="rating-num">${data.rating || "4.8"}</span>
      <span class="rating-count">(${data.reviews || "0"} reviews)</span>
      ${data.bestseller === "true" ? '<span class="rating-badge">Bestseller</span>' : ""}
    `;

    const features = (data.features || "").split("|").filter(Boolean);
    document.getElementById("modalFeatures").innerHTML = features
      .map((feature) => `<li><span class="feat-icon">✓</span>${feature.trim()}</li>`)
      .join("");

    const specs = (data.specs || "").split("|").filter(Boolean);
    document.getElementById("modalSpecs").innerHTML = specs
      .map((spec) => {
        const [label, value] = spec.split(":");
        return `
          <div class="spec-box">
            <div class="spec-label">${label ? label.trim() : ""}</div>
            <div class="spec-value">${value ? value.trim() : ""}</div>
          </div>
        `;
      })
      .join("");

    const tags = (data.tags || "").split("|").filter(Boolean);
    document.getElementById("modalBadges").innerHTML = tags
      .map((tag) => `<span class="m-badge">${tag.trim()}</span>`)
      .join("");

    qty = 1;
    qtyValue.textContent = "1";
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }

  modalCloseBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  modalOrderBtn.addEventListener("click", () => {
    if (!activeProduct || !window.CartService) {
      showToast("Unable to add this item right now");
      return;
    }

    window.CartService.addToCart({
      id: activeProduct.name,
      name: activeProduct.name,
      image: activeProduct.img,
      price: window.CartService.parsePrice(activeProduct.price),
      quantity: qty,
      size: getSpecValue(activeProduct.specs, "Weight") || "Standard",
      flavor: getSpecValue(activeProduct.specs, "Flavour") || "Classic",
      cakeType: activeProduct.eyebrow || "Celebration Cake"
    });

    window.CartService.showToast("Added to cart");
    closeModal();
  });

  document.querySelectorAll(".quick-view-btn").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      openModal(this.dataset);
    });
  });
})();
