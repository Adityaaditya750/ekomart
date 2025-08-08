document.addEventListener("DOMContentLoaded", function () {
  const addButtons = document.querySelectorAll(".add-btn");

  addButtons.forEach(button => {
    button.addEventListener("click", function () {
      const name = this.dataset.name;
      const price = parseFloat(this.dataset.price);
      const qtyInput = this.parentElement.querySelector(".qty-input");
      const qty = qtyInput ? parseInt(qtyInput.value) : 1;

      addToCart(name, price, qty);
    });
  });

  if (document.getElementById("cart-items")) {
    loadCartItems();
  }
});

function addToCart(name, price, qty) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let item = cart.find(p => p.name === name);
  if (item) {
    item.qty += qty;
  } else {
    cart.push({ name, price, qty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart`);
}

function loadCartItems() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-subtotal");

  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalDisplay.textContent = "0.00";
    return;
  }

  cart.forEach((item, index) => {
    const subtotal = item.qty * item.price;
    total += subtotal;

    const div = document.createElement("div");
    div.className = "border-bottom py-2 d-flex justify-content-between align-items-center";
    div.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        ₹${item.price} × ${item.qty} = ₹${subtotal.toFixed(2)}
      </div>
      <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">&times;</button>
    `;
    container.appendChild(div);
  });

  totalDisplay.textContent = total.toFixed(2);
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
