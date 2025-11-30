function renderAllProducts() {
  const box = document.getElementById("all-products-box");
  const params = new URLSearchParams(location.search);

  const q = params.get("q");
  const cat = params.get("cat");

  let list = PRODUCTS;

  if (cat) list = list.filter(p => p.category === cat);
  if (q) list = list.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

  box.innerHTML = "";

  list.forEach(p => {
    box.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" class="product-img">
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}
          <span class="mrp">₹${p.mrp}</span>
        </p>
        <button class="btn" onclick="addToCart('${p.id}')">Add to Cart</button>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderAllProducts();
});
