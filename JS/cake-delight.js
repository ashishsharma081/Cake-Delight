// ══════════════════════════════════════════
//   CAKE DELIGHT — cake-delight.js
// ══════════════════════════════════════════

// ── PRODUCT DATA ──
// Apne products yahan add karo
const products = [
  {
    id: 1,
    name: "Birthday Bash Cake",
    desc: "Layers of joy with fresh cream & strawberries",
    category: "birthday",
    badge: "Birthday",
    badgeStyle: "",
    emoji: "🎂",
    price: "₹1,200",
    priceNote: "per piece",
    rating: 4.8,
    reviews: 230,
    isBestseller: true,
    features: [
      "Fresh cream & chocolate layers",
      "Customizable message on top",
      "Serves 8–10 people",
      "Strawberry garnish included",
      "Same-day delivery available"
    ],
    specs: [
      { label: "Weight",     value: "1 kg"    },
      { label: "Flavour",    value: "Choco"   },
      { label: "Serves",     value: "8–10"    },
      { label: "Shelf Life", value: "2 Days"  }
    ],
    tags: ["🍓 Berry Topped", "✨ Handcrafted", "🎨 Custom Msg"]
  },
  {
    id: 2,
    name: "Red Velvet Romance",
    desc: "Classic red velvet with cream cheese frosting",
    category: "anniversary",
    badge: "Trending",
    badgeStyle: "badge-gold",
    emoji: "❤️",
    price: "₹1,450",
    priceNote: "per piece",
    rating: 4.9,
    reviews: 312,
    isBestseller: true,
    features: [
      "Authentic red velvet recipe",
      "Cream cheese frosting",
      "Heart-shaped optional",
      "Serves 10–12 people",
      "Elegant ribbon packaging"
    ],
    specs: [
      { label: "Weight",     value: "1.5 kg"      },
      { label: "Flavour",    value: "Red Velvet"   },
      { label: "Serves",     value: "10–12"        },
      { label: "Shelf Life", value: "2 Days"       }
    ],
    tags: ["💍 Anniversary", "🎁 Gift Box", "🌹 Romantic"]
  },
  {
    id: 3,
    name: "Black Forest Dream",
    desc: "German classic with cherries & whipped cream",
    category: "birthday",
    badge: "Bestseller",
    badgeStyle: "",
    emoji: "🍒",
    price: "₹950",
    priceNote: "per piece",
    rating: 4.7,
    reviews: 518,
    isBestseller: true,
    features: [
      "Dark chocolate sponge layers",
      "Kirsch-soaked for depth",
      "Fresh whipped cream",
      "Topped with dark cherries",
      "Serves 6–8 people"
    ],
    specs: [
      { label: "Weight",     value: "750 g"    },
      { label: "Flavour",    value: "Choco"    },
      { label: "Serves",     value: "6–8"      },
      { label: "Shelf Life", value: "2 Days"   }
    ],
    tags: ["🍫 Dark Choco", "🍒 Fresh Cherry", "🥂 Classic"]
  },
  {
    id: 4,
    name: "Mango Tropical Bliss",
    desc: "Seasonal special with real Alphonso mango",
    category: "seasonal",
    badge: "Seasonal",
    badgeStyle: "badge-gold",
    emoji: "🥭",
    price: "₹1,100",
    priceNote: "per piece",
    rating: 4.6,
    reviews: 178,
    isBestseller: false,
    features: [
      "Alphonso mango pulp filling",
      "Light vanilla sponge base",
      "Fresh mango chunks on top",
      "Serves 8–10 people",
      "Available May–July only"
    ],
    specs: [
      { label: "Weight",     value: "1 kg"    },
      { label: "Flavour",    value: "Mango"   },
      { label: "Serves",     value: "8–10"    },
      { label: "Shelf Life", value: "1 Day"   }
    ],
    tags: ["🥭 Alphonso", "🌞 Seasonal", "🌴 Tropical"]
  },
  {
    id: 5,
    name: "Unicorn Surprise",
    desc: "Colourful funfetti inside, magic outside",
    category: "custom",
    badge: "Custom",
    badgeStyle: "",
    emoji: "🦄",
    price: "₹1,800",
    priceNote: "per piece",
    rating: 4.9,
    reviews: 94,
    isBestseller: false,
    features: [
      "Funfetti vanilla sponge",
      "Edible glitter & horns",
      "Fully customizable colors",
      "Serves 10–12 people",
      "Comes with matching cupcakes"
    ],
    specs: [
      { label: "Weight",     value: "1.5 kg"   },
      { label: "Flavour",    value: "Vanilla"  },
      { label: "Serves",     value: "10–12"    },
      { label: "Shelf Life", value: "2 Days"   }
    ],
    tags: ["✨ Glitter", "🎨 Custom", "🧁 + Cupcakes"]
  },
  {
    id: 6,
    name: "Tiramisu Heaven",
    desc: "Italian delight with espresso & mascarpone",
    category: "anniversary",
    badge: "Premium",
    badgeStyle: "badge-gold",
    emoji: "☕",
    price: "₹2,200",
    priceNote: "per piece",
    rating: 4.8,
    reviews: 143,
    isBestseller: false,
    features: [
      "Authentic mascarpone cream",
      "Espresso-soaked ladyfingers",
      "Dusted with finest cocoa",
      "Serves 12–14 people",
      "Chilled serving box included"
    ],
    specs: [
      { label: "Weight",     value: "2 kg"       },
      { label: "Flavour",    value: "Coffee"     },
      { label: "Serves",     value: "12–14"      },
      { label: "Shelf Life", value: "2 Days"     }
    ],
    tags: ["☕ Espresso", "🇮🇹 Italian", "❄️ Chilled"]
  }
];

// ── STATE ──
let cartCount = 0;
let currentFilter = "all";

// ── RENDER CARDS ──
function renderCards(filter = "all") {
  const grid = document.getElementById("productGrid");
  const filtered = filter === "all"
    ? products
    : products.filter(p => p.category === filter);

  grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card"
         style="animation-delay: ${i * 0.07}s"
         data-id="${p.id}">
      <div class="card-img-wrap">
        <div class="card-emoji-bg">${p.emoji}</div>
        <span class="card-badge ${p.badgeStyle}">${p.badge}</span>
        <button class="card-wishlist" onclick="toggleWishlist(this, event)">🤍</button>
        <div class="card-hover-overlay">
          <button class="btn-card-order" onclick="addToCart(event)">🛒 Order Now</button>
          <button class="btn-card-qv"    onclick="openModal(${p.id}, event)">👁 Quick View</button>
        </div>
      </div>
      <div class="card-info">
        <div class="card-name">${p.name}</div>
        <div class="card-desc">${p.desc}</div>
        <div class="card-footer">
          <span class="card-price">${p.price}</span>
          <span class="card-rating">
            <span class="card-stars">★★★★★</span>
            &nbsp;${p.rating}
          </span>
        </div>
      </div>
    </div>
  `).join("");
}

// ── FILTER TABS ──
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", function () {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    this.classList.add("active");
    currentFilter = this.dataset.filter;
    renderCards(currentFilter);
  });
});

// ── OPEN MODAL ──
function openModal(id, event) {
  if (event) event.stopPropagation();
  const p = products.find(x => x.id === id);
  if (!p) return;

  // Fill data
  document.getElementById("modalEmoji").textContent    = p.emoji;
  document.getElementById("modalEyebrow").textContent  = `🎂 ${p.badge}`;
  document.getElementById("modalTitle").textContent    = p.name;
  document.getElementById("modalPrice").textContent    = p.price;
  document.getElementById("modalPriceNote").textContent = p.priceNote;

  document.getElementById("modalRating").innerHTML = `
    <span class="stars">★★★★★</span>
    <span class="rating-num">${p.rating}</span>
    <span class="rating-count">(${p.reviews} reviews)</span>
    ${p.isBestseller ? '<span class="rating-badge">🏆 Bestseller</span>' : ""}
  `;

  document.getElementById("modalBadges").innerHTML =
    (p.tags || []).map(t => `<span class="m-badge">${t}</span>`).join("");

  document.getElementById("modalFeatures").innerHTML =
    p.features.map(f => `
      <li>
        <span class="feat-icon">✓</span>
        ${f}
      </li>
    `).join("");

  document.getElementById("modalSpecs").innerHTML =
    p.specs.map(s => `
      <div class="spec-box">
        <div class="spec-label">${s.label}</div>
        <div class="spec-value">${s.value}</div>
      </div>
    `).join("");

  // Reset qty
  document.getElementById("qtyVal").textContent = "1";

  // Show overlay
  document.getElementById("modalOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

// ── CLOSE MODAL ──
function closeModal() {
  document.getElementById("modalOverlay").classList.remove("active");
  document.body.style.overflow = "";
}

// Close on overlay click
document.getElementById("modalOverlay").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

document.getElementById("modalCloseBtn").addEventListener("click", closeModal);

// Close on ESC
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

// Also open modal on card click (not just buttons)
document.getElementById("productGrid").addEventListener("click", function (e) {
  const card = e.target.closest(".product-card");
  if (!card) return;
  // Don't open if a button inside was clicked
  if (e.target.closest("button")) return;
  openModal(Number(card.dataset.id));
});

// ── QUANTITY CONTROL ──
let qty = 1;

document.getElementById("qtyPlus").addEventListener("click", () => {
  qty = Math.min(qty + 1, 10);
  document.getElementById("qtyVal").textContent = qty;
});

document.getElementById("qtyMinus").addEventListener("click", () => {
  qty = Math.max(qty - 1, 1);
  document.getElementById("qtyVal").textContent = qty;
});

// ── CART ──
function addToCart(event) {
  if (event) event.stopPropagation();
  cartCount++;
  document.querySelector(".cart-count").textContent = cartCount;
  showToast("🛒 Added to cart!");
}

// Order Now in modal
document.querySelector(".btn-order-now").addEventListener("click", () => {
  addToCart();
  closeModal();
});

// ── WISHLIST TOGGLE ──
function toggleWishlist(btn, event) {
  event.stopPropagation();
  const active = btn.classList.toggle("active");
  btn.textContent = active ? "❤️" : "🤍";
}

// ── TOAST ──
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

// ── INIT ──
renderCards();
