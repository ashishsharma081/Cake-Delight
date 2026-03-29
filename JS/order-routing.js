document.querySelectorAll(".order-link").forEach((btn) => {
  btn.addEventListener("click", function () {
    const name = this.dataset.name || "";
    const price = this.dataset.price || "";
    const img = this.dataset.img || "";

    const url =
      `order.html?name=${encodeURIComponent(name)}` +
      `&price=${encodeURIComponent(price)}` +
      `&img=${encodeURIComponent(img)}`;

    window.location.href = url;
  });
});

const params = new URLSearchParams(window.location.search);
const productName = document.getElementById("pName");
const productPrice = document.getElementById("pPrice");
const productImage = document.getElementById("pImg");
const productImgParam = params.get("img");

if (productName) {
  productName.innerText = params.get("name") || "Cake Delight item";
}

if (productPrice) {
  const priceValue = params.get("price");
  productPrice.innerText = priceValue ? "₹" + priceValue : "Price on request";
}

if (productImage && productImgParam) {
  productImage.src = productImgParam;
}

const radios = document.querySelectorAll("input[name='pay']");
const upiBox = document.getElementById("upiBox");

radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (!upiBox) return;

    upiBox.style.display = radio.value === "upi" ? "block" : "none";
  });
});
