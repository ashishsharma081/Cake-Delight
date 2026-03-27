
document.querySelectorAll(".order-link").forEach(btn=>{

 btn.addEventListener("click",function(){

   const name = this.dataset.name;
   const price = this.dataset.price;
   const img = this.dataset.img;

   const url =
   `order.html?name=${encodeURIComponent(name)}
   &price=${price}
   &img=${encodeURIComponent(img)}`;

   window.location.href = url;

 });

});


const params =
new URLSearchParams(window.location.search);

let img = params.get("img");

document.getElementById("pName").innerText =
params.get("name");


document.getElementById("pPrice").innerText =
"₹"+params.get("price");

if (img) {
  document.getElementById("pImg").src = img;
}

const radios =
document.querySelectorAll("input[name='pay']");



const upiBox =
document.getElementById("upiBox");



radios.forEach(r=>{

r.addEventListener("change",()=>{

upiBox.style.display =
r.value==="upi"
? "block"
: "none";

});

});




