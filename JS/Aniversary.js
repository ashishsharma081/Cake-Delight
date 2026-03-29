// ❤️ Wishlist
function toggleWish(btn) {
    btn.classList.toggle("active");
    btn.innerHTML = btn.classList.contains("active") ? "❤️" : "♡";
}

// 📱 Mobile Menu
const hamburger = document.getElementById("hamburgerBtn");
const nav = document.querySelector(".nav-list");

hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
});

// 🛒 Order Button
document.querySelectorAll(".order-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        alert("Order placed 🎂");
    });
});

// 👁 Quick View
document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        alert("Quick view coming soon 👀");
    });
});