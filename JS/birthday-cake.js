/* ══ QUICK VIEW MODAL JS ══ */
(function () {

  // ── Quantity control ──
  let qty = 1;
  document.getElementById('qtyPlus').addEventListener('click', () => {
    qty = Math.min(qty + 1, 10);
    document.getElementById('qtyVal').textContent = qty;
  });
  document.getElementById('qtyMinus').addEventListener('click', () => {
    qty = Math.max(qty - 1, 1);
    document.getElementById('qtyVal').textContent = qty;
  });

  // ── Open Modal ──
  function openModal(data) {
    document.getElementById('modalImg').src         = data.img    || '';
    document.getElementById('modalEyebrow').textContent  = data.eyebrow || '🎂 Birthday';
    document.getElementById('modalTitle').textContent    = data.name   || '';
    document.getElementById('modalPrice').textContent    = data.price  || '';
    document.getElementById('modalPriceNote').textContent= data.note   || 'per piece';

    document.getElementById('modalRating').innerHTML = `
      <span class="stars">★★★★★</span>
      <span class="rating-num">${data.rating || '4.8'}</span>
      <span class="rating-count">(${data.reviews || '0'} reviews)</span>
      ${data.bestseller === 'true' ? '<span class="rating-badge">🏆 Bestseller</span>' : ''}
    `;

    const features = (data.features || '').split('|').filter(Boolean);
    document.getElementById('modalFeatures').innerHTML = features.map(f =>
      `<li><span class="feat-icon">✓</span>${f.trim()}</li>`
    ).join('');

    const specs = (data.specs || '').split('|').filter(Boolean);
    document.getElementById('modalSpecs').innerHTML = specs.map(s => {
      const [label, value] = s.split(':');
      return `<div class="spec-box">
        <div class="spec-label">${label?.trim() || ''}</div>
        <div class="spec-value">${value?.trim() || ''}</div>
      </div>`;
    }).join('');

    const tags = (data.tags || '').split('|').filter(Boolean);
    document.getElementById('modalBadges').innerHTML = tags.map(t =>
      `<span class="m-badge">${t.trim()}</span>`
    ).join('');

    qty = 1;
    document.getElementById('qtyVal').textContent = '1';
    document.getElementById('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // ── Close Modal ──
  function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
  }

  document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', function (e) {
    if (e.target === this) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // ── Order Now in modal ──
  document.querySelector('.btn-order-now').addEventListener('click', () => {
    showToast('🛒 Added to cart!');
    closeModal();
  });

  // ── Toast ──
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
  }

  // ── Attach Quick View buttons ──
  // Ye automatically saare .quick-view-btn dhundh leta hai

  // ── Attach Quick View buttons ──
  document.querySelectorAll('.quick-view-btn').forEach(function(btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      openModal(this.dataset);
    });
  });
})();