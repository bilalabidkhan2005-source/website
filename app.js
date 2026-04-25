// Restaurant Website JS - For index.html only

let cartCount = 0;

// Menu data - 10 grocery/food items
const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    desc: "Fresh mozzarella, basil, and tomato sauce",
    price: "$12.99",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Grilled Chicken Burger",
    desc: "Juicy chicken patty with fresh veggies",
    price: "$10.50",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Caesar Salad",
    desc: "Crisp romaine, parmesan, and homemade dressing",
    price: "$8.99",
    image:
      "https://images.unsplash.com/photo-1546793665-c46e2de29d63?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "Beef Steak",
    desc: "Grilled ribeye with herb butter",
    price: "$24.99",
    image:
      "https://images.unsplash.com/photo-1512568400610-42b091c6f68e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    name: "Pasta Carbonara",
    desc: "Creamy bacon and parmesan pasta",
    price: "$14.50",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3adc652d66e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    name: "Veggie Wrap",
    desc: "Fresh vegetables and hummus in tortilla",
    price: "$9.75",
    image:
      "https://images.unsplash.com/photo-1586992085476-8ea434f2490e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 7,
    name: "Cheese Pizza",
    desc: "Loaded with multiple cheeses and herbs",
    price: "$13.25",
    image:
      "https://images.unsplash.com/photo-1574071318509-6446ab7e5412?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 8,
    name: "Fried Rice",
    desc: "Vegetables, egg, and soy sauce",
    price: "$11.00",
    image:
      "https://images.unsplash.com/photo-1541756991-1d3c7a9b6ba8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 9,
    name: "Greek Salad",
    desc: "Feta, olives, tomatoes, cucumber",
    price: "$9.25",
    image:
      "https://images.unsplash.com/photo-1515549637466-8c23a662713c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 10,
    name: "Tiramisu",
    desc: "Classic Italian coffee dessert",
    price: "$6.99",
    image: "https://images.unsplash.com/photo-1604908176941-9e9ef3f1d2a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },                          
];

document.addEventListener("DOMContentLoaded", function () {
  checkUser();
  renderMenu();
  setupContactForm();
  loadCartCount();
});

function renderMenu() {
  const container = document.getElementById("groceryCards");
  menuItems.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    // Use placeholder if image is missing or empty
    const imgSrc = item.image && item.image.trim() ? item.image : 'https://via.placeholder.com/500x300?text=No+Image';
    card.innerHTML = `
            <img src="${imgSrc}" alt="${item.name}" loading="lazy">
            <div class="card-content">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <div class="price">${item.price}</div>
                <button class="add-btn" onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        `;
    container.appendChild(card);
  });
}

function addToCart(itemId) {
  cartCount++;
  localStorage.setItem("cartCount", cartCount);
  updateCartCounter();
  // Simple animation
  const btn = event.target;
  btn.textContent = "Added!";
  btn.style.background = "#2ed573";
  setTimeout(() => {
    btn.textContent = "Add to Cart";
    btn.style.background = "";
  }, 1000);
}

function updateCartCounter() {
  document.getElementById("cartCounter").textContent = `Cart: ${cartCount}`;
}

function loadCartCount() {
  const saved = localStorage.getItem("cartCount");
  if (saved) {
    cartCount = parseInt(saved);
    updateCartCounter();
  }
}

function checkUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.loggedIn) {
    document.getElementById("userGreeting").textContent =
      `Welcome, ${user.email}!`;
    document.getElementById("userGreeting").classList.remove("hidden");
    document.getElementById("btnLogout").classList.remove("hidden");
    document.getElementById("authNav").classList.add("hidden");
  }
}

function logoutUser() {
  localStorage.removeItem("user");
  cartCount = 0;
  localStorage.removeItem("cartCount");
  updateCartCounter();
  document.getElementById("userGreeting").classList.add("hidden");
  document.getElementById("btnLogout").classList.add("hidden");
  document.getElementById("authNav").classList.remove("hidden");
  location.reload(); // Refresh to update
}

function setupContactForm() {
  document
    .querySelector(".contact-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for your message! We will get back to you soon.");
      this.reset();
    });
}

// Smooth scroll for CTA
document.querySelector(".cta-btn").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
});
