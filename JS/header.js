  /* ── Sticky header shadow on scroll ── */
    const header = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {
      header.classList.toggle('site-header--scrolled', window.scrollY > 10);
    });

    /* ── Hamburger toggle (mobile) ── */
    const hamburger = document.getElementById('hamburgerBtn');
    const navBar    = document.getElementById('navBar');
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      hamburger.classList.toggle('hamburger--open');
      navBar.classList.toggle('nav-bar--open');
    });