(function () {
  const PROFILE_KEY = "cakeDelightProfileV1";

  const defaultProfile = {
    fullName: "",
    email: "",
    phone: "",
    houseNo: "",
    street: "",
    apartment: "",
    city: "Lucknow",
    state: "Uttar Pradesh",
    area: "Indira Nagar",
    pincode: ""
  };

  function safeParse(value, fallback) {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === "object" ? parsed : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function getProfile() {
    return {
      ...defaultProfile,
      ...safeParse(localStorage.getItem(PROFILE_KEY), defaultProfile)
    };
  }

  function saveProfile(nextProfile) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(nextProfile));
  }

  function formatAddress(profile) {
    const addressParts = [
      profile.houseNo,
      profile.street,
      profile.apartment,
      profile.area,
      profile.city,
      profile.state,
      profile.pincode
    ].filter(Boolean);

    return addressParts.length ? addressParts.join(", ") : "Add your delivery address";
  }

  function calculateCompletion(profile) {
    const keys = ["fullName", "email", "phone", "houseNo", "street", "city", "state", "area", "pincode"];
    const filled = keys.filter((key) => String(profile[key] || "").trim()).length;
    return Math.round((filled / keys.length) * 100);
  }

  function formatDate(value) {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(new Date(value));
  }

  function renderSummary(profile) {
    const completion = calculateCompletion(profile);
    const nameEl = document.getElementById("accountSummaryName");
    const contactEl = document.getElementById("accountSummaryContact");
    const addressEl = document.getElementById("accountSummaryAddress");
    const completionEl = document.getElementById("accountCompletion");

    if (nameEl) {
      nameEl.textContent = profile.fullName || "Cake Delight customer";
    }

    if (contactEl) {
      contactEl.textContent =
        [profile.email, profile.phone].filter(Boolean).join(" • ") || "Add email and phone for faster checkout updates";
    }

    if (addressEl) {
      addressEl.textContent = formatAddress(profile);
    }

    if (completionEl) {
      completionEl.textContent = `${completion}% profile ready`;
    }
  }

  function renderHistory() {
    const historyRoot = document.getElementById("accountOrderHistory");
    if (!historyRoot || !window.CartService) return;

    const history = window.CartService.getOrderHistory();
    if (!history.length) {
      historyRoot.innerHTML = `
        <div class="cd-history-empty">
          Your recent orders will appear here after checkout. Add cakes to cart and place an order to build your history.
        </div>
      `;
      return;
    }

    historyRoot.innerHTML = history
      .map((entry) => {
        const itemNames = entry.items
          .map((item) => `${item.name} x ${item.quantity}`)
          .join(", ");

        return `
          <article class="cd-history-card">
            <div class="cd-history-card__top">
              <div>
                <h3>Order placed on ${formatDate(entry.createdAt)}</h3>
                <span>${entry.itemCount} item${entry.itemCount === 1 ? "" : "s"}</span>
              </div>
              <span>${entry.items[0]?.deliveryDate || "Delivery to be confirmed"}</span>
            </div>
            <p class="cd-history-card__items">${itemNames}</p>
            <div class="cd-history-card__footer">
              <strong>${window.CartService.formatINR(entry.total || 0)}</strong>
              <a class="cd-history-card__link" href="cart.html">Open cart</a>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function fillForms(profile) {
    const profileForm = document.getElementById("profileForm");
    const addressForm = document.getElementById("addressForm");
    if (!profileForm || !addressForm) return;

    Object.entries(profile).forEach(([key, value]) => {
      const field = document.querySelector(`[name="${key}"]`);
      if (field) field.value = value || "";
    });
  }

  function handleSubmit(form, message) {
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const profile = getProfile();
      const formData = new FormData(form);

      formData.forEach((value, key) => {
        profile[key] = String(value).trim();
      });

      saveProfile(profile);
      renderSummary(profile);
      if (window.CartService) {
        window.CartService.showToast(message);
      }
    });
  }

  function initAccountPage() {
    const page = document.getElementById("accountPage");
    if (!page) return;

    const profile = getProfile();
    fillForms(profile);
    renderSummary(profile);
    renderHistory();
    handleSubmit(document.getElementById("profileForm"), "Profile details saved");
    handleSubmit(document.getElementById("addressForm"), "Address updated");

    window.addEventListener("order-history:updated", renderHistory);
    window.addEventListener("storage", () => {
      const nextProfile = getProfile();
      fillForms(nextProfile);
      renderSummary(nextProfile);
      renderHistory();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAccountPage);
  } else {
    initAccountPage();
  }
})();
