const WHATSAPP_NUMBER = "919978653852";

function getCart() {
  let c = localStorage.getItem("yeswear_cart");
  return c ? JSON.parse(c) : [];
}

function saveCart(c) {
  localStorage.setItem("yeswear_cart", JSON.stringify(c));
}

function renderCart() {
  const box = document.getElementById("cart-items");
  const cart = getCart();

  if (cart.length === 0) {
    box.innerHTML = "<p>Cart is empty.</p>";
    return;
  }

  let total = 0;
  let html = `
    <table class="cart-table">
      <tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>
  `;

  cart.forEach(i => {
    const t = i.qty * i.price;
    total += t;
    html += `
      <tr>
        <td>${i.name}</td>
        <td>${i.qty}</td>
        <td>₹${i.price}</td>
        <td>₹${t}</td>
      </tr>
    `;
  });

  html += "</table>";
  box.innerHTML = html;

  document.getElementById("cart-total").innerText = `Total: ₹${total}`;
}

function buildWhatsAppMessage() {
  const cart = getCart();
  const name = document.getElementById("cust-name").value;
  const addr = document.getElementById("cust-address").value;
  const phone = document.getElementById("cust-phone").value;

  let itemsText = cart
    .map(i => `• ${i.name} (${i.qty}) = ₹${i.qty * i.price}`)
    .join("\n");

  const total = cart.reduce((s,i)=>s+i.qty*i.price,0);

  const msg = `
New Order from Website

${itemsText}

Total Amount: ₹${total}

Customer Details:
Name: ${name}
Address: ${addr}
Phone: ${phone}
Payment Mode: Cash on Delivery
  `;

  return encodeURIComponent(msg);
}

function sendWhatsAppOrder() {
  const msg = buildWhatsAppMessage();
  window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
  document.getElementById("btn-whatsapp")
    .addEventListener("click", sendWhatsAppOrder);
});
