// js/main.js

function getCart() {
  const existing = localStorage.getItem("yeswear_cart");
  return existing ? JSON.parse(existing) : [];
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const el = document.getElementById("cart-count");
  if (el) el.textContent = count;
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const index = cart.findIndex(item => item.id === productId);

  if (index > -1) {
    cart[index].qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1
    });
  }

  localStorage.setItem("yeswear_cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart!");
}

function renderProductsByTag(tag, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  const list = PRODUCTS.filter(p => p.tags && p.tags.includes(tag));
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="product-img">
      <h3>${p.name}</h3>
      <p class="price">
        ₹${p.price}
        <span class="mrp">₹${p.mrp}</span>
      </p>
      <button class="btn" data-id="${p.id}">Add to Cart</button>
    `;
    container.appendChild(card);
  });

  container.addEventListener("click", (e) => {
    if (e.target.matches("button[data-id]")) {
      const id = e.target.getAttribute("data-id");
      addToCart(id);
    }
  });
}

const CATEGORIES = [
  "Rings",
  "Earrings",
  "Bracelets",
  "Bangles",
  "Necklaces",
  "Mangalsutra",
  "Anklet",
  "Pendants"
];

function renderCategories() {
  const container = document.getElementById("category-grid");
  if (!container) return;
  container.innerHTML = "";

  CATEGORIES.forEach(cat => {
    const slug = encodeURIComponent(cat);
    const box = document.createElement("a");
    box.className = "category-card";
    box.href = `all-products.html?cat=${slug}`;
    box.innerHTML = `<span>${cat}</span>`;
    container.appendChild(box);
  });
}

function setupSearch() {
  const input = document.getElementById("search-box");
  if (!input) return;
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const q = input.value.trim();
      if (!q) return;
      window.location.href = `all-products.html?q=${encodeURIComponent(q)}`;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCategories();
  renderProductsByTag("popular", "popular-grid");
  renderProductsByTag("featured", "featured-grid");
  renderProductsByTag("bestseller", "bestseller-grid");
  setupSearch();
});
