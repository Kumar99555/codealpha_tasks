let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart");
}

// SHOW CART
function showCart() {
  let items = document.getElementById("cart-items");
  let totalText = document.getElementById("total");
  if (!items) return;

  if (cart.length === 0) {
    items.innerText = "Cart is empty";
    totalText.innerText = "Total: ₹0";
    return;
  }

  let text = "";
  let total = 0;

  cart.forEach(item => {
    text += item.name + " - ₹" + item.price + "\n";
    total += item.price;
  });

  items.innerText = text;
  totalText.innerText = "Total: ₹" + total;
}

function clearCart() {
  localStorage.removeItem("cart");
  cart = [];
  showCart();
}

showCart();
function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (email && password) {
    alert("Login successful");
    window.location.href = "index.html";
  } else {
    alert("Please fill all fields");
  }
}
function placeOrder() {
  fetch("http://localhost:3000/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(cart)
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    clearCart();
  });
}
