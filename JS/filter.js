const items = document.querySelectorAll('.category-item');

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(28px)';
      entry.target.style.transition =
        `opacity 0.55s ease ${i * 0.1}s, transform 0.55s ease ${i * 0.1}s`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        });
      });
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

items.forEach(el => io.observe(el));

// wishlist js
document.querySelectorAll('.icon-btn[aria-label="Wishlist"]').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('wishlisted');
  });
});

/* ── HEADER SEARCH — sabhi pages pe kaam karega ── */
var headerSearch = document.querySelector('.search-bar__input');
if (headerSearch) {
  headerSearch.addEventListener('input', function () {
    var query = this.value.trim().toLowerCase();

    document.querySelectorAll('.cd-col').forEach(function (col) {
      var name = col.dataset.name || '';
      var cat  = col.dataset.cat  || '';
      if (name.includes(query) || cat.includes(query)) {
        col.classList.remove('hidden');
      } else {
        col.classList.add('hidden');
      }
    });

    /* empty state */
    var grid = document.getElementById('cdGrid');
    if (grid) {
      var visible = document.querySelectorAll('.cd-col:not(.hidden)');
      var emp = grid.querySelector('.cd-empty');
      if (visible.length === 0) {
        if (!emp) {
          var e = document.createElement('div');
          e.className = 'cd-empty';
          e.innerHTML = '<span class="cd-empty-icon">🎂</span>No cakes match your search.';
          grid.appendChild(e);
        }
      } else {
        if (emp) emp.remove();
      }
    }
  });
}

// Badge + Filter js — sirf cdGrid wale page pe
(function () {

  /* ── BADGE COLORS ── */
  var BADGE = {
    birthday:    { bg: '#fff0f3', color: '#c0004a' },
    anniversary: { bg: '#fff7e0', color: '#a06000' },
    pastry:      { bg: '#e8f5e9', color: '#2e7d32' },
    corporate:   { bg: '#e3f2fd', color: '#1565c0' },
    party:       { bg: '#f3e5f5', color: '#7b1fa2' },
    other:       { bg: '#e8eaf6', color: '#283593' },
  };

  /* ── CAKE DATA ── */
  var cakes = [
    /* Birthday */
    { name: 'Birthday Bash Cake',    cat: 'birthday',    price: 1200, rating: 4.8, img: './assets/image/birthday cake1.jpeg' },
    { name: 'Star Sprinkle Cake',    cat: 'birthday',    price: 1400, rating: 4.7, img: './assets/image/birthday cake2.jpeg' },
    // { name: 'Pastel Dream Cake',     cat: 'birthday',    price: 950,  rating: 4.6, img: './assets/image/birthday cake3.jpeg' },
    // { name: 'Rainbow Layer Cake',    cat: 'birthday',    price: 1800, rating: 5.0, img: './assets/image/Birthday cake 4.jpg' },
    // { name: 'Confetti Joy Cake',     cat: 'birthday',    price: 1100, rating: 4.5, img: './assets/image/birthday cake5.jpeg' },
    // { name: 'Golden Age Cake',       cat: 'birthday',    price: 1600, rating: 4.9, img: './assets/image/birthday cake6.jpeg' },
    // { name: 'Balloon Bliss Cake',    cat: 'birthday',    price: 1300, rating: 4.7, img: './assets/image/birthday cake 7.jpeg' },
    // { name: 'Cherry Bomb Cake',      cat: 'birthday',    price: 1500, rating: 4.8, img: './assets/image/birthday cake8.jpeg' },

    /* Anniversary */
    { name: 'Red Rose Romance',      cat: 'anniversary', price: 2000, rating: 5.0, img: './assets/image/Anniversary acke 1.png' },
    { name: 'Pearl White Elegance',  cat: 'anniversary', price: 2200, rating: 4.9, img: './assets/image/Anniversary cake2.png' },
    // { name: 'Golden Jubilee Cake',   cat: 'anniversary', price: 2500, rating: 5.0, img: './assets/image/Anniversary cake 3.png' },
    // { name: 'Blossom Love Cake',     cat: 'anniversary', price: 1900, rating: 4.8, img: './assets/image/Anniversary cake 4.png' },
    // { name: 'Silver Swirl Cake',     cat: 'anniversary', price: 2100, rating: 4.7, img: './assets/image/Anniversary cake5.png' },
    // { name: 'Twin Hearts Cake',      cat: 'anniversary', price: 1800, rating: 4.9, img: './assets/image/Anniversary cake 6.png' },
    // { name: 'Lace & Roses Cake',     cat: 'anniversary', price: 2300, rating: 5.0, img: './assets/image/Anniversary cake 7.png' },
    // { name: 'Forever Together Cake', cat: 'anniversary', price: 2600, rating: 4.8, img: './assets/image/Anniversary cake8.png' },

    /* Pastry */
    { name: 'Classic Eclair',        cat: 'pastry',      price: 500,  rating: 4.5, img: './assets/image/pastry cake 1.png' },
    { name: 'Mille-Feuille Slice',   cat: 'pastry',      price: 650,  rating: 4.7, img: './assets/image/pastry cake 2.png' },
    // { name: 'Cream Puff Tower',      cat: 'pastry',      price: 700,  rating: 4.6, img: './assets/image/pastry cake 3.png' },
    // { name: 'Caramel Tart',          cat: 'pastry',      price: 580,  rating: 4.4, img: './assets/image/pastry cake4.png' },
    // { name: 'Strawberry Danish',     cat: 'pastry',      price: 620,  rating: 4.8, img: './assets/image/pastry cake5.png' },
    // { name: 'Choco Croissant',       cat: 'pastry',      price: 550,  rating: 4.5, img: './assets/image/pastry cake 6.png' },
    // { name: 'Lemon Curd Tart',       cat: 'pastry',      price: 680,  rating: 4.6, img: './assets/image/pastry cake 7.png' },
    // { name: 'Berry Galette',         cat: 'pastry',      price: 720,  rating: 4.7, img: './assets/image/pastry cake 8.png' },

    /* Corporate */
    // { name: 'Logo Fondant Cake',     cat: 'corporate',   price: 2800, rating: 4.9, img: './assets/image/Corporate cake1.png' },
    // { name: 'Boardroom Black Cake',  cat: 'corporate',   price: 3000, rating: 5.0, img: './assets/image/corporate cake2.png' },
    // { name: 'Award Night Cake',      cat: 'corporate',   price: 2500, rating: 4.9, img: './assets/image/corporate cake7.png' },
    // { name: 'Team Celebration Cake', cat: 'corporate',   price: 2200, rating: 4.7, img: './assets/image/corporate cake8.png' },

    /* Party */
    // { name: 'Neon Party Bomb',       cat: 'party',       price: 1600, rating: 4.9, img: './assets/image/Party Cake1.png' },
    // { name: 'Confetti Tier Cake',    cat: 'party',       price: 1400, rating: 4.8, img: './assets/image/party cake2.png' },
    // { name: 'Pop & Fizz Cake',       cat: 'party',       price: 1300, rating: 4.6, img: './assets/image/party cake 7.png' },
    // { name: 'Streamers Cake',        cat: 'party',       price: 1200, rating: 4.7, img: './assets/image/party cake8.png' },

    /* Other */
    // { name: 'Photo Print Cake',      cat: 'other',       price: 1800, rating: 4.9, img: './assets/image/Other cake 1.png' },
    // { name: 'Floral Fantasy Cake',   cat: 'other',       price: 2000, rating: 5.0, img: './assets/image/other cake 2.png' },
    // { name: 'Mirror Glaze Cake',     cat: 'other',       price: 2100, rating: 4.8, img: './assets/image/other cake7.png' },
    // { name: 'Galaxy Theme Cake',     cat: 'other',       price: 2300, rating: 5.0, img: './assets/image/other cake 8.png' },
  ];

  /* ── HELPERS ── */
  function stars(r) {
    var full = Math.round(r);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  }

  function formatPrice(p) {
    return '₹' + p.toLocaleString('en-IN');
  }

  /* ── BUILD CARD ── */
  function makeCard(cake) {
    var bc = BADGE[cake.cat];
    var col = document.createElement('div');
    col.className = 'cd-col';
    col.dataset.cat = cake.cat;
    col.dataset.price = cake.price;
    col.dataset.name = cake.name.toLowerCase();
    col.dataset.rating = cake.rating;

    col.innerHTML =
      '<div class="cd-card">' +
      '<div class="cd-img-wrap">' +
      '<img data-src="' + cake.img + '" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1 1\'%3E%3C/svg%3E" alt="' + cake.name + '" loading="lazy">' +
      '<span class="cd-badge" style="background:' + bc.bg + ';color:' + bc.color + '">' + cake.cat + '</span>' +
      '<button class="cd-wish" onclick="cdToggleWish(this)" title="Wishlist">' +
      '<svg viewBox="0 0 24 24" stroke-width="2">' +
      '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>' +
      '</svg>' +
      '</button>' +
      '<div class="cd-overlay">' +
      '<button class="cd-order-btn" onclick="cdOrder(\'' + cake.name.replace(/'/g, "\\'") + '\',' + cake.price + ')">Order Now</button>' +
      '<button class="cd-quick-btn" onclick="cdQuick(\'' + cake.name.replace(/'/g, "\\'") + '\')">Quick View</button>' +
      '</div>' +
      '</div>' +
      '<div class="cd-body">' +
      '<div class="cd-name">' + cake.name + '</div>' +
      '<div class="cd-meta">' +
      '<span class="cd-price">' + formatPrice(cake.price) + '</span>' +
      '<span><span class="cd-stars">' + stars(cake.rating) + '</span><span class="cd-rating-num">' + cake.rating.toFixed(1) + '</span></span>' +
      '</div>' +
      '</div>' +
      '</div>';

    return col;
  }

  /* ── RENDER ALL CARDS ── */
  var grid = document.getElementById('cdGrid');
  if (!grid) return; // cdGrid nahi hai toh skip karo

  var colEls = [];

  cakes.forEach(function (c) {
    var el = makeCard(c);
    grid.appendChild(el);
    colEls.push(el);
  });

  /* ── LAZY LOAD ── */
  var lazyIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var img = e.target.querySelector('img[data-src]');
        if (img) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        lazyIO.unobserve(e.target);
      }
    });
  }, { rootMargin: '120px' });

  colEls.forEach(function (el) { lazyIO.observe(el); });

  /* ── FILTER + SORT ENGINE ── */
  var activeFilter = 'all';
  var searchVal = '';
  var maxPrice = 3000;

  function applyFilters(animate) {
    var q = searchVal.trim().toLowerCase();
    var cdSortEl = document.getElementById('cdSort');
    var sortVal = cdSortEl ? cdSortEl.value : 'default';

    var visible = colEls.filter(function (col) {
      var catOk   = activeFilter === 'all' || col.dataset.cat === activeFilter;
      var priceOk = parseInt(col.dataset.price) <= maxPrice;
      var nameOk  = !q || col.dataset.name.indexOf(q) !== -1;
      return catOk && priceOk && nameOk;
    });

    if (sortVal === 'price-asc')
      visible.sort(function (a, b) { return a.dataset.price - b.dataset.price; });
    else if (sortVal === 'price-desc')
      visible.sort(function (a, b) { return b.dataset.price - a.dataset.price; });
    else if (sortVal === 'name-asc')
      visible.sort(function (a, b) { return a.dataset.name.localeCompare(b.dataset.name); });
    else if (sortVal === 'rating-desc')
      visible.sort(function (a, b) { return b.dataset.rating - a.dataset.rating; });

    var visSet = new Set(visible);

    colEls.forEach(function (col) {
      col.classList.remove('hidden', 'fade-in');
      if (!visSet.has(col)) col.classList.add('hidden');
    });

    visible.forEach(function (col, i) {
      grid.appendChild(col);
      if (animate) {
        col.style.animationDelay = (i * 0.04) + 's';
        void col.offsetWidth;
        col.classList.add('fade-in');
      }
    });

    var cdNum = document.getElementById('cdNum');
    if (cdNum) cdNum.textContent = visible.length;

    var emp = grid.querySelector('.cd-empty');
    if (visible.length === 0) {
      if (!emp) {
        var e = document.createElement('div');
        e.className = 'cd-empty';
        e.innerHTML = '<span class="cd-empty-icon">🎂</span>No cakes match your filters.';
        grid.appendChild(e);
      }
    } else {
      if (emp) emp.remove();
    }
  }

  /* ── EVENT LISTENERS ── */
  var cdTags = document.getElementById('cdTags');
  if (cdTags) {
    cdTags.addEventListener('click', function (e) {
      var tag = e.target.closest('.cd-tag');
      if (!tag) return;
      document.querySelectorAll('.cd-tag').forEach(function (t) { t.classList.remove('active'); });
      tag.classList.add('active');
      activeFilter = tag.dataset.filter;
      applyFilters(true);
    });
  }

  var searchTimer;
  var cdSearch = document.getElementById('cdSearch');
  if (cdSearch) {
    cdSearch.addEventListener('input', function (e) {
      searchVal = e.target.value;
      clearTimeout(searchTimer);
      searchTimer = setTimeout(function () { applyFilters(true); }, 250);
    });
  }

  var cdPrice = document.getElementById('cdPrice');
  if (cdPrice) {
    cdPrice.addEventListener('input', function (e) {
      maxPrice = parseInt(e.target.value);
      var cdPriceVal = document.getElementById('cdPriceVal');
      if (cdPriceVal) cdPriceVal.textContent = '₹' + maxPrice.toLocaleString('en-IN');
      applyFilters(true);
    });
  }

  var cdSort = document.getElementById('cdSort');
  if (cdSort) {
    cdSort.addEventListener('change', function () { applyFilters(false); });
  }

  /* ── GLOBAL ACTION FUNCTIONS ── */
  window.cdToggleWish = function (btn) {
    btn.classList.toggle('active');
  };

  window.cdOrder = function (name, price) {
    alert('Order placed for "' + name + '" — ₹' + price.toLocaleString('en-IN') + '\n\nConnect this to your backend/WhatsApp to process real orders!');
  };

  window.cdQuick = function (name) {
    alert('Quick View: ' + name + '\n\nConnect this to a modal/detail page!');
  };

  /* ── INITIAL RENDER ── */
  applyFilters(false);

})();

// Mobile button multiple botton
// document.querySelectorAll(".mobile-nav .nav-item").forEach(item=>{
//     item.addEventListener("click", function(){
//         document.querySelectorAll(".mobile-nav .nav-item")
//         .forEach(i=>i.classList.remove("active"));

//         this.classList.add("active");
//     });
// });