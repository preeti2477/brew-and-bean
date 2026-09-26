const products = [
  {
    id: 1,
    name: "Caramel Macchiato",
    category: "hot",
    price: 5.50,
    description: "Espresso with vanilla, steamed milk & caramel drizzle.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80",
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Iced Vanilla Latte",
    category: "cold",
    price: 5.25,
    description: "Smooth espresso over ice with vanilla & cold milk.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80",
    badge: "New"
  },
  {
    id: 3,
    name: "Ethiopian Yirgacheffe",
    category: "hot",
    price: 6.00,
    description: "Single-origin pour-over with floral & citrus notes.",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&q=80",
    badge: "Premium"
},
{
    id: 4,
    name: "Cold Brew Classic",
    category: "cold",
    price: 4.75,
    description: "Slow-steeped for 20 hours. Smooth & naturally sweet.",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&q=80",
    badge: null
},
  
  {
    id: 5,
    name: "Matcha Latte",
    category: "specialty",
    price: 5.75,
    description: "Ceremonial-grade matcha with creamy steamed milk.",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500&q=80",
    badge: "Popular"
  },
  {
    id: 6,
    name: "Almond Croissant",
    category: "pastry",
    price: 4.25,
    description: "Buttery, flaky pastry filled with almond cream.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80",
    badge: null
  },
  {
    id: 7,
    name: "Mocha Frappuccino",
    category: "specialty",
    price: 6.25,
    description: "Blended espresso, chocolate, milk & whipped cream.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80",
    badge: "Favorite"
  },
  {
    id: 8,
    name: "Blueberry Muffin",
    category: "pastry",
    price: 3.50,
    description: "Freshly baked with real blueberries & streusel top.",
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500&q=80",
    badge: null
  }
];

/* ============================================
   RENDER PRODUCTS INTO THE GRID
   ============================================ */
const menuGrid = document.getElementById('menuGrid');

function renderProducts(filter = 'all') {
  // Filter the products based on selected category
  const filtered = filter === 'all'
    ? products
    : products.filter(p => p.category === filter);

  // Build HTML for each product card
  menuGrid.innerHTML = filtered.map(product => `
    <article class="product-card reveal" data-category="${product.category}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-footer">
          <span class="product-price">$${product.price.toFixed(2)}</span>
          <button class="add-cart-btn" onclick="addToCart(${product.id})" aria-label="Add to cart">+</button>
        </div>
      </div>
    </article>
  `).join('');

  // Re-apply scroll reveal to newly added cards
  initScrollReveal();
}

// Initial render
renderProducts();

/* ============================================
   FILTER BUTTONS — Switch product category
   ============================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all, add to clicked
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
});

/* ============================================
   CART FUNCTIONALITY
   ============================================ */
let cartCount = 0;
const cartCountEl = document.getElementById('cartCount');
const toast = document.getElementById('toast');

function addToCart(productId) {
  cartCount++;
  cartCountEl.textContent = cartCount;

  // Animate cart icon
  const cartBtn = document.getElementById('cartBtn');
  cartBtn.style.transform = 'scale(1.3)';
  setTimeout(() => cartBtn.style.transform = 'scale(1)', 200);

  // Show toast notification
  const product = products.find(p => p.id === productId);
  showToast(`${product.name} added to cart!`);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

/* ============================================
   MOBILE NAVIGATION TOGGLE
   ============================================ */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ============================================
   TESTIMONIAL SLIDER
   ============================================ */
const slides = document.querySelectorAll('.testimonial-slide');
const dotsContainer = document.getElementById('sliderDots');
let currentSlide = 0;

// Create dots dynamically based on number of slides
slides.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.classList.add('dot');
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = index;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

// Auto-advance every 5 seconds
setInterval(() => {
  const next = (currentSlide + 1) % slides.length;
  goToSlide(next);
}, 5000);

/* ============================================
   NEWSLETTER FORM VALIDATION
   ============================================ */
const newsletterForm = document.getElementById('newsletterForm');
const emailInput = document.getElementById('emailInput');
const newsletterMsg = document.getElementById('newsletterMsg');

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    newsletterMsg.textContent = `✅ Thanks! We've sent a confirmation to ${email}`;
    newsletterMsg.style.color = 'var(--green-primary)';
    emailInput.value = '';
  } else {
    newsletterMsg.textContent = '❌ Please enter a valid email address.';
    newsletterMsg.style.color = '#c0392b';
  }

  // Clear message after 4 seconds
  setTimeout(() => newsletterMsg.textContent = '', 4000);
});

/* ============================================
   SCROLL REVEAL ANIMATION
   Uses IntersectionObserver to add 'visible'
   class when elements enter the viewport.
   ============================================ */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));
}

initScrollReveal();

/* ============================================
   CART BUTTON CLICK (placeholder)
   ============================================ */
document.getElementById('cartBtn').addEventListener('click', () => {
  if (cartCount === 0) {
    showToast('Your cart is empty ☕');
  } else {
    showToast(`You have ${cartCount} item${cartCount > 1 ? 's' : ''} in your cart`);
  }
});

/* ============================================
   SMOOTH SCROLL HELPER FUNCTION
   ============================================ */
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}