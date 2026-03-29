// ===============================
// WAIT UNTIL PAGE LOAD
// ===============================
document.addEventListener("DOMContentLoaded", function () {

  const navItems = document.querySelectorAll(".nav-item");
  const path = window.location.pathname;

  // -------------------------------
  // ACTIVE STATE AUTO (PAGE BASED)
  // -------------------------------
  navItems.forEach(item => item.classList.remove("active"));

  if (path.includes("wishlist")) {
    navItems[3]?.classList.add("active");
  } 
  else if (path.includes("birthday") || path.includes("category")) {
    navItems[1]?.classList.add("active");
  } 
  else {
    navItems[0]?.classList.add("active");
  }

  // -------------------------------
  // CLICK ACTIVE STATE (INSTANT UI)
  // -------------------------------
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      navItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
    });
  });

});


// ===============================
// CATEGORY TOGGLE
// ===============================
function toggleCategory() {
  const cat = document.getElementById("mobileCategory");
  const search = document.getElementById("mobileSearch");

  if (!cat || !search) return;

  // search बंद
  search.style.display = "none";

  // toggle category
  cat.style.display = (cat.style.display === "block") ? "none" : "block";
}

function toggleSearchBar() {
  const header = document.querySelector(".mobile-header");
  const search = document.getElementById("mobileSearch");
  const cat = document.getElementById("mobileCategory");

  if (!header || !search) return;

  // category बंद करो
  if (cat) cat.style.display = "none";

  // toggle search bar (old system)
  search.style.display = (search.style.display === "block") ? "none" : "block";
}

// ===============================
// NAVIGATION
// ===============================
function goHome() {
  window.location.href = "index.html";
}

function goWishlist() {
  window.location.href = "wishlist.html";
}


// ===============================
// WISHLIST FUNCTION
// ===============================
function addToWishlist(name) {
  let list = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (!list.includes(name)) {
    list.push(name);
    localStorage.setItem("wishlist", JSON.stringify(list));

    showToast("Added to wishlist ❤️");
  } else {
    showToast("Already in wishlist ⚠️");
  }
}


// ===============================
// CLICK OUTSIDE CLOSE
// ===============================
document.addEventListener("click", function (e) {

  const cat = document.getElementById("mobileCategory");
  const search = document.getElementById("mobileSearch");

  // category close
  if (cat && !e.target.closest("#mobileCategory") && !e.target.closest(".ri-layout-grid-line")) {
    cat.style.display = "none";
  }

  // search close
  if (search && !e.target.closest("#mobileSearch") && !e.target.closest(".ri-search-line")) {
    search.style.display = "none";
  }

});


// ===============================
// SIMPLE TOAST (OPTIONAL UX)
// ===============================
function showToast(message) {
  let toast = document.createElement("div");

  toast.innerText = message;
  toast.style.position = "fixed";
  toast.style.bottom = "90px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#000";
  toast.style.color = "#fff";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "20px";
  toast.style.zIndex = "9999";
  toast.style.fontSize = "14px";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
}

// PREMIUM SCROLL ANIMATION
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      // delay for stagger effect
      const index = [...document.querySelectorAll(".wish-card")].indexOf(entry.target);
      entry.target.style.transitionDelay = `${index * 0.08}s`;

      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll(".wish-card").forEach(card => {
  observer.observe(card);
});