const siteHeader = document.getElementById("siteHeader");

if (siteHeader) {
  window.addEventListener("scroll", () => {
    siteHeader.classList.toggle("site-header--scrolled", window.scrollY > 10);
  });
}

const desktopHamburger = document.getElementById("hamburgerBtn");
const desktopNavBar = document.getElementById("navBar");

if (desktopHamburger && desktopNavBar) {
  desktopHamburger.addEventListener("click", () => {
    const expanded = desktopHamburger.getAttribute("aria-expanded") === "true";
    desktopHamburger.setAttribute("aria-expanded", String(!expanded));
    desktopHamburger.classList.toggle("hamburger--open");
    desktopNavBar.classList.toggle("nav-bar--open");
  });
}
