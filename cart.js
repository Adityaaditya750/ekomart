/* cart.js — frontend-only cart logic (localStorage 'cart') */

document.addEventListener("DOMContentLoaded", function () {
  renderCart();
  // shipping radios update total
  document.querySelectorAll('input[name="shipping"]').forEach(radio => {
    radio.addEventListener("change", updateTotal);
  });
  updateCartCountBadge();
});

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCountBadge();
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cart-items");
  const subtotalDisplay = document.getElementById("cart-subtotal");
  container.innerHTML = "";
  let subtotal = 0;

  if (!container) return; // safety

  if (cart.length === 0) {
    container.innerHTML = `<tr><td colspan="6" class="text-center">Your cart is empty.</td></tr>`;
    subtotalDisplay && (subtotalDisplay.textContent = "0.00");
    updateTotal();
    return;
  }

  cart.forEach((item, index) => {
    const itemSubtotal = (parseFloat(item.price) || 0) * (item.qty || 1);
    subtotal += itemSubtotal;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><img src="${item.image || 'https://via.placeholder.com/70'}" class="product-img" alt="${escapeHtml(item.name)}"></td>
      <td>${escapeHtml(item.name)}</td>
      <td>₹${(parseFloat(item.price) || 0).toFixed(2)}</td>
      <td>
        <input type="number" min="1" value="${item.qty}" class="form-control w-50 mx-auto"
          onchange="updateQuantity(${index}, this.value)">
      </td>
      <td>₹${itemSubtotal.toFixed(2)}</td>
      <td><button class="remove-btn" onclick="removeItem(${index})">&times;</button></td>
    `;
    container.appendChild(tr);
  });

  subtotalDisplay && (subtotalDisplay.textContent = subtotal.toFixed(2));
  updateTotal();
}

function updateQuantity(index, quantity) {
  const cart = getCart();
  quantity = parseInt(quantity);
  if (isNaN(quantity) || quantity < 1) quantity = 1;
  if (cart[index]) {
    cart[index].qty = quantity;
    saveCart(cart);
    renderCart();
  }
}

function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

function clearCart() {
  localStorage.removeItem("cart");
  renderCart();
  updateCartCountBadge();
}

/* calculate total (subtotal + shipping radio) and update #cart-total */
function updateTotal() {
  const subtotalEl = document.getElementById("cart-subtotal");
  const totalEl = document.getElementById("cart-total");
  const subtotal = parseFloat(subtotalEl ? subtotalEl.innerText : "0") || 0;
  const shipping = parseFloat(document.querySelector('input[name="shipping"]:checked')?.value || 0) || 0;
  if (totalEl) totalEl.innerText = (subtotal + shipping).toFixed(2);
}

/* small helper to update cart badge in header (if you have #cart-count) */
function updateCartCountBadge() {
  const badge = document.getElementById("cart-count");
  if (!badge) return;
  const cart = getCart();
  const qty = cart.reduce((s, it) => s + (it.qty || 0), 0);
  badge.textContent = qty;
}

/* escape HTML to avoid injected markup from product names */
function escapeHtml(text) {
  return String(text).replace(/[&<>"'`=\/]/g, function (s) {
    return ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;'
    })[s];
  });
}
