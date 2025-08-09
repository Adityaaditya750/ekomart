document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("cart-items")) {
    loadCartItems();
  }

  document.querySelectorAll('input[name="shipping"]').forEach(radio => {
    radio.addEventListener("change", updateTotal);
  });
});

function loadCartItems() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const subtotalDisplay = document.getElementById("cart-subtotal");

  container.innerHTML = "";
  let subtotal = 0;

  if (cart.length === 0) {
    container.innerHTML = `<tr><td colspan="6" class="text-center">Your cart is empty.</td></tr>`;
    subtotalDisplay.textContent = "0.00";
    updateTotal();
    return;
  }

  cart.forEach((item, index) => {
    const itemSubtotal = item.price * item.qty;
    subtotal += itemSubtotal;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><img src="${item.image}" class="product-img" alt="${item.name}"></td>
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <input type="number" min="1" value="${item.qty}" class="form-control w-50 mx-auto"
          onchange="updateQuantity(${index}, this.value)">
      </td>
      <td>$${itemSubtotal.toFixed(2)}</td>
      <td><button class="remove-btn" onclick="removeItem(${index})">&times;</button></td>
    `;
    container.appendChild(tr);
  });

  subtotalDisplay.textContent = subtotal.toFixed(2);
  updateTotal();
}

function updateQuantity(index, quantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].qty = parseInt(quantity);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCartItems();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCartItems();
}

function clearCart() {
  localStorage.removeItem("cart");
  loadCartItems();
}

function updateTotal() {
  let subtotal = parseFloat(document.getElementById("cart-subtotal").innerText);
  let shipping = parseFloat(document.querySelector('input[name="shipping"]:checked').value);
  document.getElementById("cart-total").innerText = (subtotal + shipping).toFixed(2);
}
