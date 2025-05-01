document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "White Polo T-Shirt", price: 25.0 },
    { id: 2, name: "Red Sneakers", price: 49.99 },
    { id: 3, name: "Yellow Blazer", price: 79.99 },
    { id: 4, name: "Men's Black Hat Cap", price: 19.99 },
  ];

  // Load cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Utility: Total item count
  const getTotalCount = () =>
    cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Update cart count in navbar
  const cartCountElem = document.getElementById("cart-count");
  if (cartCountElem) {
    cartCountElem.textContent = getTotalCount();
  }

  // Add-to-cart logic
  document.querySelectorAll(".add-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.getAttribute("data-id"), 10);
      const product = products.find((p) => p.id === productId);
      if (!product) return;

      const existing = cart.find((item) => item.id === productId);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      if (cartCountElem) cartCountElem.textContent = getTotalCount();
    });
  });

  // Render cart items (on cart page)
  const cartItemsContainer = document.getElementById("cart-items");
  if (cartItemsContainer) {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cartItemsContainer.innerHTML = cart
        .map(
          (item) => `
          <div class="product-card">
            <h4>${item.name}</h4>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        `
        )
        .join("");
    }
  }

  // ✅ Checkout form submission handler
  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      cart = [];
      localStorage.removeItem("cart");

      if (cartCountElem) {
        cartCountElem.textContent = 0;
      }

      if (cartItemsContainer) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      }

      checkoutForm.reset();
      alert("Thank you! Your order has been placed.");
    });
  }
});
