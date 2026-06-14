/* ═══════════════════════════════════════════════════════════
   DEV MEDISTORE – MAIN JAVASCRIPT
   All logic: Products, Cart, Wishlist, Search, Filters,
   WhatsApp Checkout, Order Tracking, Account, Animations
═══════════════════════════════════════════════════════════ */

'use strict';

// ─── PRODUCT DATABASE ───────────────────────────────────────
const PRODUCTS = [
  // MEDICINES
  { id: 1, name: "Dolo 650mg Tablet", brand: "Micro Labs", category: "Medicines", mrp: 35, price: 30, discount: 14, emoji: "💊", inStock: true, desc: "Effective paracetamol tablet for fever and mild to moderate pain relief. Safe for adults and children above 12 years." },
  { id: 2, name: "Azithromycin 500mg", brand: "Cipla", category: "Medicines", mrp: 120, price: 98, discount: 18, emoji: "💊", inStock: true, desc: "Antibiotic tablet used for bacterial infections of the respiratory tract, skin, and soft tissues." },
  { id: 3, name: "Pantoprazole 40mg", brand: "Sun Pharma", category: "Medicines", mrp: 95, price: 72, discount: 24, emoji: "🩺", inStock: true, desc: "Proton pump inhibitor for acidity, heartburn, and gastroesophageal reflux disease (GERD)." },
  { id: 4, name: "Cetirizine 10mg", brand: "Dr. Reddy's", category: "Medicines", mrp: 45, price: 38, discount: 16, emoji: "💊", inStock: true, desc: "Antihistamine for allergies, hay fever, itching, and hives. Provides 24-hour relief." },
  { id: 5, name: "Amoxicillin 500mg Capsule", brand: "GSK", category: "Medicines", mrp: 85, price: 68, discount: 20, emoji: "💊", inStock: false, desc: "Broad-spectrum antibiotic effective against a wide range of bacterial infections." },
  { id: 6, name: "Metformin 500mg", brand: "USV", category: "Medicines", mrp: 55, price: 44, discount: 20, emoji: "💊", inStock: true, desc: "First-line medication for type 2 diabetes, helps control blood sugar levels." },

  // BABY CARE
  { id: 7, name: "Johnson's Baby Powder", brand: "Johnson's", category: "Baby Care", mrp: 220, price: 185, discount: 16, emoji: "👶", inStock: true, desc: "Soft and gentle talc-free baby powder, keeps skin fresh and prevents rashes." },
  { id: 8, name: "Himalaya Baby Lotion", brand: "Himalaya", category: "Baby Care", mrp: 165, price: 132, discount: 20, emoji: "🧴", inStock: true, desc: "Nourishing baby lotion with natural ingredients for soft and healthy baby skin." },
  { id: 9, name: "Pampers Diaper (S) 22pcs", brand: "Pampers", category: "Baby Care", mrp: 449, price: 380, discount: 15, emoji: "👶", inStock: true, desc: "Ultra-soft diapers with 12-hour protection. Keeps baby dry and comfortable all day." },
  { id: 10, name: "Cerelac Rice & Milk", brand: "Nestlé", category: "Baby Care", mrp: 310, price: 260, discount: 16, emoji: "🍼", inStock: true, desc: "Iron-fortified infant cereal with essential nutrients for baby's healthy growth and development." },

  // PERSONAL CARE
  { id: 11, name: "Dettol Antiseptic Liquid 250ml", brand: "Dettol", category: "Personal Care", mrp: 145, price: 118, discount: 19, emoji: "🧴", inStock: true, desc: "Multi-purpose antiseptic liquid for wound cleansing, bathing, and surface disinfection." },
  { id: 12, name: "Himalaya Neem Face Wash", brand: "Himalaya", category: "Personal Care", mrp: 115, price: 92, discount: 20, emoji: "🧼", inStock: true, desc: "Purifying neem and turmeric face wash for pimple-free, clear skin." },
  { id: 13, name: "Colgate Total 150g", brand: "Colgate", category: "Personal Care", mrp: 85, price: 72, discount: 15, emoji: "🦷", inStock: true, desc: "Advanced antibacterial toothpaste for complete oral care – fights germs for 12 hours." },
  { id: 14, name: "Savlon Moisturising Soap", brand: "Savlon", category: "Personal Care", mrp: 45, price: 38, discount: 16, emoji: "🧼", inStock: true, desc: "Germ-protection soap with moisturizing properties for soft and protected skin." },

  // DIABETES CARE
  { id: 15, name: "Accu-Chek Active Glucometer", brand: "Roche", category: "Diabetes Care", mrp: 1299, price: 899, discount: 31, emoji: "🩸", inStock: true, desc: "Accurate and easy-to-use blood glucose meter. Requires only a tiny blood sample. Results in 5 seconds." },
  { id: 16, name: "Accu-Chek Active Test Strips (50)", brand: "Roche", category: "Diabetes Care", mrp: 750, price: 595, discount: 21, emoji: "📋", inStock: true, desc: "Test strips compatible with Accu-Chek Active glucometer. Accurate blood glucose measurement." },
  { id: 17, name: "Gluco Smart Monitor Kit", brand: "Dr. Morepen", category: "Diabetes Care", mrp: 999, price: 750, discount: 25, emoji: "🩸", inStock: false, desc: "Complete blood glucose monitoring kit with lancets, strips, and glucose meter." },

  // HEALTH SUPPLEMENTS
  { id: 18, name: "Revital H Daily Supplement", brand: "Ranbaxy", category: "Health Supplements", mrp: 480, price: 384, discount: 20, emoji: "💪", inStock: true, desc: "Complete multivitamin with minerals for energy, vitality, and overall wellness." },
  { id: 19, name: "Vitamin C 1000mg Tablet", brand: "HealthVit", category: "Health Supplements", mrp: 350, price: 245, discount: 30, emoji: "🍊", inStock: true, desc: "High-potency Vitamin C for immune support, antioxidant protection, and skin health." },
  { id: 20, name: "Omega-3 Fish Oil Capsules", brand: "Nature's Bounty", category: "Health Supplements", mrp: 650, price: 495, discount: 24, emoji: "🐟", inStock: true, desc: "High-quality omega-3 fatty acids for heart health, brain function, and joint support." },
  { id: 21, name: "Calcium + Vitamin D3 Tablet", brand: "Shelcal", category: "Health Supplements", mrp: 280, price: 224, discount: 20, emoji: "🦴", inStock: true, desc: "Calcium and Vitamin D3 supplement for strong bones, teeth, and muscle function." },

  // AYURVEDIC
  { id: 22, name: "Ashwagandha KSM-66 Extract", brand: "Himalaya", category: "Ayurvedic", mrp: 380, price: 285, discount: 25, emoji: "🌿", inStock: true, desc: "Premium ashwagandha extract for stress relief, energy, and adaptogenic support." },
  { id: 23, name: "Triphala Churna 100g", brand: "Patanjali", category: "Ayurvedic", mrp: 75, price: 58, discount: 23, emoji: "🌿", inStock: true, desc: "Classic Ayurvedic digestive formula for gut health, detox, and immunity." },
  { id: 24, name: "Dabur Chyawanprash 1kg", brand: "Dabur", category: "Ayurvedic", mrp: 320, price: 256, discount: 20, emoji: "🏺", inStock: true, desc: "Traditional Ayurvedic health tonic with 41 natural ingredients for immunity and vitality." },
  { id: 25, name: "Giloy Tablets 60pcs", brand: "Baidyanath", category: "Ayurvedic", mrp: 180, price: 135, discount: 25, emoji: "🌿", inStock: true, desc: "Pure Guduchi/Giloy tablets for immunity, fever management, and liver health." },

  // MEDICAL DEVICES
  { id: 26, name: "Digital Thermometer", brand: "Dr. Morepen", category: "Medical Devices", mrp: 250, price: 185, discount: 26, emoji: "🌡️", inStock: true, desc: "Fast, accurate digital thermometer with fever alert and memory recall feature." },
  { id: 27, name: "BP Monitor Automatic", brand: "Omron", category: "Medical Devices", mrp: 1899, price: 1499, discount: 21, emoji: "🩺", inStock: true, desc: "Clinically validated automatic blood pressure monitor with irregular heartbeat detection." },
  { id: 28, name: "Pulse Oximeter", brand: "Contec", category: "Medical Devices", mrp: 799, price: 549, discount: 31, emoji: "🤞", inStock: true, desc: "Fingertip pulse oximeter for accurate SpO2 and pulse rate measurement." },
  { id: 29, name: "Nebulizer Machine", brand: "Philips", category: "Medical Devices", mrp: 2500, price: 1850, discount: 26, emoji: "🫁", inStock: false, desc: "Quiet and efficient nebulizer for respiratory conditions, asthma, and COPD treatment." },

  // FIRST AID
  { id: 30, name: "Bandaid Classic Strips 40pcs", brand: "Band-Aid", category: "First Aid", mrp: 165, price: 135, discount: 18, emoji: "🩹", inStock: true, desc: "Flexible fabric bandages that move with you. Sterile wound protection for minor cuts." },
  { id: 31, name: "Savlon Wound Spray 100ml", brand: "Savlon", category: "First Aid", mrp: 185, price: 148, discount: 20, emoji: "💉", inStock: true, desc: "Antiseptic spray for instant wound cleansing without stinging. Easy spray application." },
  { id: 32, name: "Crepe Bandage 10cm", brand: "Nobel", category: "First Aid", mrp: 65, price: 48, discount: 26, emoji: "🩹", inStock: true, desc: "Elastic crepe bandage for sprains, strains, and support dressing." },
];

// ─── DEMO ORDER DATA ─────────────────────────────────────────
const DEMO_ORDERS = {
  "DM2024001": {
    id: "DM2024001", customer: "Rahul Sharma", items: "Dolo 650mg × 2, Vitamin C × 1",
    total: "₹305", date: "10 June 2026", currentStep: 3,
    steps: [
      { title: "Order Received", desc: "Your order has been confirmed", done: true },
      { title: "Preparing Order", desc: "Pharmacist is checking your items", done: true },
      { title: "Out for Delivery", desc: "Delivery partner is on the way", done: true },
      { title: "Delivered", desc: "Awaiting delivery", done: false }
    ]
  },
  "DM2024002": {
    id: "DM2024002", customer: "Priya Singh", items: "BP Monitor × 1",
    total: "₹1499", date: "11 June 2026", currentStep: 4,
    steps: [
      { title: "Order Received", desc: "Your order has been confirmed", done: true },
      { title: "Preparing Order", desc: "Pharmacist is checking your items", done: true },
      { title: "Out for Delivery", desc: "Delivered by delivery partner", done: true },
      { title: "Delivered", desc: "Order delivered successfully! ✅", done: true }
    ]
  },
  "DM2024003": {
    id: "DM2024003", customer: "Amit Kumar", items: "Ashwagandha × 1, Triphala × 2",
    total: "₹401", date: "12 June 2026", currentStep: 1,
    steps: [
      { title: "Order Received", desc: "Your order has been confirmed", done: true },
      { title: "Preparing Order", desc: "Awaiting preparation", done: false },
      { title: "Out for Delivery", desc: "Awaiting dispatch", done: false },
      { title: "Delivered", desc: "Awaiting delivery", done: false }
    ]
  }
};

// ─── STATE ───────────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('dm_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('dm_wishlist') || '[]');
let user = JSON.parse(localStorage.getItem('dm_user') || 'null');
let orderHistory = JSON.parse(localStorage.getItem('dm_orders') || '[]');
let currentPage = 'home';
let currentFilters = { category: 'All', maxPrice: 2000, inStockOnly: false, minDiscount: 0, sort: 'default' };
let currentSlide = 0;
let sliderInterval;
let quantities = {}; // per-product quantity selector

// ─── INIT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initSlider();
  renderFeaturedProducts();
  renderProducts();
  updateBadges();
  initSearch();
  renderAccountPage();
});

// ════════════════════════════════════════════════════════════
// SLIDER
// ════════════════════════════════════════════════════════════
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('sliderDots');
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  });
  startSliderAuto();
}

function startSliderAuto() {
  clearInterval(sliderInterval);
  sliderInterval = setInterval(() => changeSlide(1), 4500);
}

function changeSlide(dir) {
  const slides = document.querySelectorAll('.slide');
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + dir + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  updateDots();
  startSliderAuto();
}

function goToSlide(idx) {
  const slides = document.querySelectorAll('.slide');
  slides[currentSlide].classList.remove('active');
  currentSlide = idx;
  slides[currentSlide].classList.add('active');
  updateDots();
  startSliderAuto();
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

// ════════════════════════════════════════════════════════════
// PAGE NAVIGATION
// ════════════════════════════════════════════════════════════
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  currentPage = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update bottom nav active state
  document.querySelectorAll('.bottom-nav-btn').forEach(b => b.classList.remove('active'));
  const bnMap = { home: 'bn-home', products: 'bn-products', cart: 'bn-cart', wishlist: 'bn-wishlist', account: 'bn-account' };
  if (bnMap[page]) document.getElementById(bnMap[page])?.classList.add('active');

  // Render page-specific content
  if (page === 'cart') renderCart();
  if (page === 'wishlist') renderWishlist();
  if (page === 'account') renderAccountPage();
  if (page === 'products') renderProducts();
}

function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ════════════════════════════════════════════════════════════
// PRODUCT RENDERING
// ════════════════════════════════════════════════════════════
function getQty(id) { return quantities[id] || 1; }
function setQty(id, val) { quantities[id] = Math.max(1, val); renderQtyDisplay(id); }

function renderQtyDisplay(id) {
  const el = document.getElementById('qty-' + id);
  if (el) el.textContent = getQty(id);
}

function buildProductCard(p, featured = false) {
  const inWishlist = wishlist.some(w => w.id === p.id);
  const qty = getQty(p.id);
  return `
    <div class="product-card" id="pcard-${p.id}">
      <span class="product-badge">${p.discount}% OFF</span>
      <button class="wishlist-btn ${inWishlist ? 'active' : ''}" onclick="toggleWishlist(${p.id})" title="Wishlist">
        <i class="fa${inWishlist ? 's' : 'r'} fa-heart"></i>
      </button>
      <div class="product-image" onclick="openProductDetail(${p.id})">${p.emoji}</div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name" onclick="openProductDetail(${p.id})">${p.name}</div>
        <div class="product-brand">${p.brand}</div>
        <div class="price-row">
          <span class="price-final">₹${p.price}</span>
          <span class="price-mrp">₹${p.mrp}</span>
          <span class="price-discount">${p.discount}% off</span>
        </div>
        <span class="stock-label ${p.inStock ? 'in-stock' : 'out-of-stock'}">
          ${p.inStock ? '✓ In Stock' : '✗ Out of Stock'}
        </span>
        <div class="qty-row">
          <button class="qty-btn" onclick="setQty(${p.id}, getQty(${p.id})-1); renderQtyDisplay(${p.id})">−</button>
          <span class="qty-display" id="qty-${p.id}">${qty}</span>
          <button class="qty-btn" onclick="setQty(${p.id}, getQty(${p.id})+1); renderQtyDisplay(${p.id})">+</button>
        </div>
        <div class="card-actions">
          <button class="btn-cart" onclick="addToCart(${p.id})" ${!p.inStock ? 'disabled style="opacity:0.5;cursor:not-allowed"' : ''}>
            <i class="fas fa-cart-plus"></i> Cart
          </button>
          <button class="btn-buy" onclick="buyNow(${p.id})" ${!p.inStock ? 'disabled style="opacity:0.5;cursor:not-allowed"' : ''}>
            Buy Now
          </button>
        </div>
      </div>
    </div>`;
}

function renderFeaturedProducts() {
  const featured = PRODUCTS.filter(p => p.inStock).slice(0, 8);
  document.getElementById('featuredProducts').innerHTML = featured.map(p => buildProductCard(p, true)).join('');
}

function renderProducts() {
  let filtered = [...PRODUCTS];

  // Category filter
  const catEl = document.querySelector('input[name="cat"]:checked');
  const cat = catEl ? catEl.value : 'All';
  if (cat !== 'All') filtered = filtered.filter(p => p.category === cat);

  // Price filter
  const maxPrice = parseInt(document.getElementById('priceRange')?.value || 2000);
  filtered = filtered.filter(p => p.price <= maxPrice);

  // In stock filter
  if (document.getElementById('inStockOnly')?.checked) {
    filtered = filtered.filter(p => p.inStock);
  }

  // Discount filter
  const discEl = document.querySelector('input[name="disc"]:checked');
  const minDisc = parseInt(discEl ? discEl.value : 0);
  if (minDisc > 0) filtered = filtered.filter(p => p.discount >= minDisc);

  // Sort
  const sort = document.getElementById('sortSelect')?.value || 'default';
  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'discount') filtered.sort((a, b) => b.discount - a.discount);

  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-search"></i><h3>No products found</h3><p>Try adjusting your filters</p><button class="btn-primary" style="background:var(--primary);color:white" onclick="clearFilters()">Clear Filters</button></div>`;
  } else {
    grid.innerHTML = filtered.map(p => buildProductCard(p)).join('');
  }

  const countEl = document.getElementById('productCount');
  if (countEl) countEl.textContent = `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;
}

function applyFilters() { renderProducts(); }

function clearFilters() {
  document.querySelectorAll('input[name="cat"]')[0].checked = true;
  document.querySelectorAll('input[name="disc"]')[0].checked = true;
  if (document.getElementById('priceRange')) document.getElementById('priceRange').value = 2000;
  if (document.getElementById('priceVal')) document.getElementById('priceVal').textContent = '₹2000';
  if (document.getElementById('inStockOnly')) document.getElementById('inStockOnly').checked = false;
  if (document.getElementById('sortSelect')) document.getElementById('sortSelect').value = 'default';
  renderProducts();
}

function filterCategory(cat) {
  const radios = document.querySelectorAll('input[name="cat"]');
  radios.forEach(r => { if (r.value === cat) r.checked = true; });
}

function toggleFilterSidebar() {
  document.getElementById('filterSidebar').classList.toggle('open');
}

// ════════════════════════════════════════════════════════════
// PRODUCT DETAIL MODAL
// ════════════════════════════════════════════════════════════
function openProductDetail(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const inWishlist = wishlist.some(w => w.id === p.id);
  document.getElementById('productModalContent').innerHTML = `
    <div class="product-detail-layout">
      <div class="product-detail-image">${p.emoji}</div>
      <div class="product-detail-info">
        <div class="product-category">${p.category}</div>
        <h2>${p.name}</h2>
        <div class="brand">by ${p.brand}</div>
        <div class="price-row" style="margin:12px 0">
          <span class="big-price">₹${p.price}</span>
          <span class="price-mrp" style="font-size:16px">₹${p.mrp}</span>
          <span class="price-discount" style="font-size:13px">${p.discount}% off</span>
        </div>
        <span class="stock-label ${p.inStock ? 'in-stock' : 'out-of-stock'}" style="font-size:12px">
          ${p.inStock ? '✓ In Stock – Ready to deliver' : '✗ Out of Stock'}
        </span>
        <div class="product-detail-desc">${p.desc}</div>
        <div class="detail-actions">
          <button class="btn-cart-lg" onclick="addToCart(${p.id}); closeModal('productModal')" ${!p.inStock ? 'disabled' : ''}>
            <i class="fas fa-cart-plus"></i> Add to Cart
          </button>
          <button class="btn-buy-lg" onclick="buyNow(${p.id})" ${!p.inStock ? 'disabled' : ''}>
            Buy Now
          </button>
        </div>
        <button onclick="toggleWishlist(${p.id})" style="margin-top:12px;background:none;border:1px solid ${inWishlist ? '#e53935' : 'var(--border)'};color:${inWishlist ? '#e53935' : 'var(--text-light)'};padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600">
          <i class="fa${inWishlist ? 's' : 'r'} fa-heart"></i> ${inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </button>
      </div>
    </div>`;
  openModal('productModal');
}

// ════════════════════════════════════════════════════════════
// CART LOGIC
// ════════════════════════════════════════════════════════════
function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p || !p.inStock) return;
  const qty = getQty(id);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...p, qty });
  }
  saveCart();
  updateBadges();
  showToast(`✓ ${p.name} added to cart`);
  animateCartBtn();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateBadges();
  renderCart();
}

function updateCartQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (item) {
    item.qty = Math.max(1, item.qty + delta);
    if (item.qty <= 0) removeFromCart(id);
  }
  saveCart();
  renderCart();
}

function buyNow(id) {
  addToCart(id);
  showPage('cart');
}

function saveCart() {
  localStorage.setItem('dm_cart', JSON.stringify(cart));
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getDeliveryCharge() {
  const total = getCartTotal();
  return total === 0 ? 0 : total >= 299 ? 0 : 40;
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const summaryEl = document.getElementById('cartSummary');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-shopping-cart"></i>
        <h3>Your cart is empty</h3>
        <p>Add medicines and health products to get started</p>
        <button class="btn-full" style="max-width:200px;margin:0 auto" onclick="showPage('products')">Shop Now</button>
      </div>`;
    summaryEl.innerHTML = '';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-brand">${item.brand}</div>
        <div class="cart-item-price">₹${item.price} × ${item.qty} = <strong>₹${item.price * item.qty}</strong></div>
        <div class="cart-item-actions">
          <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)">−</button>
          <span style="font-weight:700;min-width:24px;text-align:center">${item.qty}</span>
          <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
          <button class="cart-remove-btn" onclick="removeFromCart(${item.id})"><i class="fas fa-trash-alt"></i> Remove</button>
        </div>
      </div>
    </div>`).join('');

  const subtotal = getCartTotal();
  const delivery = getDeliveryCharge();
  const grand = subtotal + delivery;

  summaryEl.innerHTML = `
    <h3>Order Summary</h3>
    <div class="summary-row"><span>Items (${cart.length})</span><span>₹${subtotal}</span></div>
    <div class="summary-row"><span>Delivery Charges</span><span style="color:var(--green)">${delivery === 0 ? '<strong>FREE</strong>' : '₹' + delivery}</span></div>
    ${delivery === 0 ? '<div style="font-size:11px;color:var(--green);margin-bottom:8px">🎉 Free delivery applied!</div>' : '<div style="font-size:11px;color:var(--text-light);margin-bottom:8px">Add ₹' + (299 - subtotal) + ' more for free delivery</div>'}
    <div class="summary-row total"><span>Grand Total</span><span>₹${grand}</span></div>
    <button class="btn-checkout" onclick="openModal('checkoutModal')">
      <i class="fab fa-whatsapp"></i> Checkout via WhatsApp
    </button>
    <p style="font-size:11px;color:var(--text-light);text-align:center;margin-top:10px">No payment needed now. Pay on delivery.</p>`;
}

// ════════════════════════════════════════════════════════════
// WISHLIST
// ════════════════════════════════════════════════════════════
function toggleWishlist(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const idx = wishlist.findIndex(w => w.id === id);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast('Removed from wishlist');
  } else {
    wishlist.push(p);
    showToast('❤️ Added to wishlist');
  }
  localStorage.setItem('dm_wishlist', JSON.stringify(wishlist));
  updateBadges();
  // Update wishlist buttons on all visible cards
  document.querySelectorAll(`button.wishlist-btn`).forEach(btn => {
    // re-render is too heavy, just update icon
  });
  if (currentPage === 'wishlist') renderWishlist();
  if (currentPage === 'home') renderFeaturedProducts();
  if (currentPage === 'products') renderProducts();
}

function moveToCart(id) {
  addToCart(id);
  const idx = wishlist.findIndex(w => w.id === id);
  if (idx > -1) wishlist.splice(idx, 1);
  localStorage.setItem('dm_wishlist', JSON.stringify(wishlist));
  updateBadges();
  renderWishlist();
}

function renderWishlist() {
  const grid = document.getElementById('wishlistGrid');
  if (!grid) return;
  if (wishlist.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <i class="fas fa-heart"></i>
        <h3>Your wishlist is empty</h3>
        <p>Save products you love to buy them later</p>
        <button class="btn-full" style="max-width:200px;margin:0 auto" onclick="showPage('products')">Explore Products</button>
      </div>`;
    return;
  }
  grid.innerHTML = wishlist.map(p => {
    return `
      <div class="product-card">
        <div class="product-image">${p.emoji}</div>
        <div class="product-info">
          <div class="product-category">${p.category}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-brand">${p.brand}</div>
          <div class="price-row">
            <span class="price-final">₹${p.price}</span>
            <span class="price-mrp">₹${p.mrp}</span>
          </div>
          <div class="card-actions" style="flex-direction:column;gap:6px">
            <button class="btn-buy" style="width:100%" onclick="moveToCart(${p.id})"><i class="fas fa-cart-plus"></i> Move to Cart</button>
            <button class="btn-cart" style="width:100%" onclick="toggleWishlist(${p.id})"><i class="fas fa-trash"></i> Remove</button>
          </div>
        </div>
      </div>`;
  }).join('');
}

// ════════════════════════════════════════════════════════════
// WHATSAPP CHECKOUT
// ════════════════════════════════════════════════════════════
function placeOrder() {
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const address = document.getElementById('custAddress').value.trim();

  if (!name || !phone || !address) {
    showToast('⚠️ Please fill all fields');
    return;
  }
  if (phone.replace(/\D/g, '').length < 10) {
    showToast('⚠️ Enter a valid mobile number');
    return;
  }
  if (cart.length === 0) {
    showToast('⚠️ Your cart is empty');
    return;
  }

  const subtotal = getCartTotal();
  const delivery = getDeliveryCharge();
  const grand = subtotal + delivery;

  let itemsText = cart.map(item => `• ${item.name} × ${item.qty} = ₹${item.price * item.qty}`).join('%0A');

  const orderId = 'DM' + Date.now().toString().slice(-6);
  const timestamp = new Date().toLocaleString('en-IN');

  const message = `🏥 *NEW ORDER – Dev Medistore*%0A%0A` +
    `📋 *Order ID:* ${orderId}%0A` +
    `📅 *Date & Time:* ${timestamp}%0A%0A` +
    `👤 *Customer Details*%0A` +
    `• Name: ${name}%0A` +
    `• Mobile: ${phone}%0A` +
    `• Address: ${address}%0A%0A` +
    `🛒 *Ordered Products*%0A` +
    `${itemsText}%0A%0A` +
    `💰 *Order Summary*%0A` +
    `• Subtotal: ₹${subtotal}%0A` +
    `• Delivery: ${delivery === 0 ? 'FREE' : '₹' + delivery}%0A` +
    `• *Grand Total: ₹${grand}*%0A%0A` +
    `🚚 Home Delivery Requested%0A%0A` +
    `_Order sent from Dev Medistore website_`;

  // Save to order history
  const order = { id: orderId, items: cart.map(c => c.name + ' × ' + c.qty).join(', '), total: '₹' + grand, date: new Date().toLocaleDateString('en-IN'), status: 'Order Received' };
  orderHistory.unshift(order);
  localStorage.setItem('dm_orders', JSON.stringify(orderHistory.slice(0, 20)));

  // Clear cart
  cart = [];
  saveCart();
  updateBadges();

  closeModal('checkoutModal');
  document.getElementById('custName').value = '';
  document.getElementById('custPhone').value = '';
  document.getElementById('custAddress').value = '';

  window.open(`https://wa.me/918601075607?text=${message}`, '_blank');
  showToast('✅ Order sent to WhatsApp!');
  setTimeout(() => showPage('home'), 1200);
}

// ════════════════════════════════════════════════════════════
// ORDER TRACKING
// ════════════════════════════════════════════════════════════
function trackOrder() {
  const orderId = document.getElementById('trackingInput').value.trim().toUpperCase();
  const resultEl = document.getElementById('trackingResult');

  if (!orderId) {
    resultEl.innerHTML = '<div class="demo-orders" style="color:var(--danger)">⚠️ Please enter an Order ID</div>';
    return;
  }

  const order = DEMO_ORDERS[orderId];
  if (!order) {
    resultEl.innerHTML = `
      <div class="order-track-card" style="text-align:center">
        <i class="fas fa-search" style="font-size:40px;color:var(--text-light);margin-bottom:12px;display:block"></i>
        <h3>Order Not Found</h3>
        <p style="color:var(--text-light);margin-top:8px">No order found with ID: <strong>${orderId}</strong></p>
        <p style="font-size:13px;color:var(--text-light);margin-top:8px">Try: DM2024001, DM2024002, DM2024003</p>
      </div>`;
    return;
  }

  const stepIcons = ['fa-clipboard-check', 'fa-box-open', 'fa-motorcycle', 'fa-check-circle'];
  const stepsHTML = order.steps.map((step, i) => {
    let cls = 'pending';
    if (step.done && i < order.currentStep - 1) cls = 'completed';
    if (i === order.currentStep - 1) cls = 'current';
    if (order.currentStep === 4 && i === 3) cls = 'completed';
    return `
      <div class="track-step">
        <div class="step-icon ${cls}"><i class="fas ${stepIcons[i]}"></i></div>
        <div class="step-content">
          <h4>${step.title}</h4>
          <p>${step.desc}</p>
        </div>
      </div>`;
  }).join('');

  resultEl.innerHTML = `
    <div class="order-track-card">
      <h3>Order: ${order.id}</h3>
      <div class="order-id-label">Customer: ${order.customer} &nbsp;|&nbsp; ${order.date} &nbsp;|&nbsp; ${order.total}</div>
      <div class="tracking-steps">${stepsHTML}</div>
    </div>`;
}

// ════════════════════════════════════════════════════════════
// SEARCH
// ════════════════════════════════════════════════════════════
function initSearch() {
  const input = document.getElementById('searchInput');
  const dropdown = document.getElementById('searchDropdown');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { dropdown.classList.remove('active'); return; }

    const results = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    ).slice(0, 7);

    if (results.length === 0) {
      dropdown.innerHTML = '<div style="padding:14px 16px;color:var(--text-light);font-size:13px">No products found</div>';
    } else {
      dropdown.innerHTML = results.map(p => `
        <div class="search-result-item" onclick="openProductDetail(${p.id}); closeSearchDropdown()">
          <span class="sri-emoji">${p.emoji}</span>
          <div>
            <div class="sri-name">${p.name}</div>
            <div class="sri-brand">${p.brand} · ${p.category}</div>
          </div>
          <span class="sri-price">₹${p.price}</span>
        </div>`).join('');
    }
    dropdown.classList.add('active');
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') performSearch();
    if (e.key === 'Escape') closeSearchDropdown();
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-search')) closeSearchDropdown();
  });
}

function closeSearchDropdown() {
  document.getElementById('searchDropdown').classList.remove('active');
}

function performSearch() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  if (!q) return;
  closeSearchDropdown();
  showPage('products');
  // Filter applied by searching in product names
  setTimeout(() => {
    document.querySelectorAll('.product-card').forEach(card => {
      const name = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
      const brand = card.querySelector('.product-brand')?.textContent.toLowerCase() || '';
      card.style.display = (name.includes(q) || brand.includes(q)) ? '' : 'none';
    });
    const visible = document.querySelectorAll('.product-card:not([style*="display: none"])').length;
    const countEl = document.getElementById('productCount');
    if (countEl) countEl.textContent = `Found ${visible} result(s) for "${q}"`;
  }, 100);
}

// ════════════════════════════════════════════════════════════
// ACCOUNT / AUTH
// ════════════════════════════════════════════════════════════
function renderAccountPage() {
  const content = document.getElementById('accountContent');
  if (!content) return;
  if (user) {
    renderUserDashboard(content);
  } else {
    renderLoginForm(content);
  }
}

function renderLoginForm(container) {
  container.innerHTML = `
    <div class="auth-card">
      <div class="logo-icon" style="width:56px;height:56px;margin:0 auto 16px;font-size:24px;background:linear-gradient(135deg,var(--primary),var(--green));border-radius:50%;display:flex;align-items:center;justify-content:center;color:white">
        <i class="fas fa-user"></i>
      </div>
      <h2>Welcome Back</h2>
      <p>Sign in to your Dev Medistore account</p>
      <div class="form-group"><label>Mobile Number / Email</label><input type="text" id="loginId" placeholder="Enter mobile or email"></div>
      <div class="form-group"><label>Password</label><input type="password" id="loginPass" placeholder="Enter password"></div>
      <button class="btn-full" onclick="loginUser()">Sign In</button>
      <div class="auth-switch">Don't have an account? <a onclick="renderRegisterForm(document.getElementById('accountContent'))">Register Now</a></div>
    </div>`;
}

function renderRegisterForm(container) {
  container.innerHTML = `
    <div class="auth-card">
      <h2>Create Account</h2>
      <p>Join Dev Medistore for easy medicine ordering</p>
      <div class="form-group"><label>Full Name *</label><input type="text" id="regName" placeholder="Your full name"></div>
      <div class="form-group"><label>Mobile Number *</label><input type="tel" id="regPhone" placeholder="+91 XXXXX XXXXX"></div>
      <div class="form-group"><label>Email Address</label><input type="email" id="regEmail" placeholder="yourname@email.com"></div>
      <div class="form-group"><label>Password *</label><input type="password" id="regPass" placeholder="Create a password"></div>
      <div class="form-group"><label>Default Address</label><textarea id="regAddr" rows="2" placeholder="House No, Street, Village, City, PIN"></textarea></div>
      <button class="btn-full" onclick="registerUser()">Create Account</button>
      <div class="auth-switch">Already have an account? <a onclick="renderLoginForm(document.getElementById('accountContent'))">Sign In</a></div>
    </div>`;
}

function loginUser() {
  const id = document.getElementById('loginId').value.trim();
  const pass = document.getElementById('loginPass').value.trim();
  if (!id || !pass) { showToast('⚠️ Fill all fields'); return; }

  // Check if registered user exists
  const saved = JSON.parse(localStorage.getItem('dm_user_data') || 'null');
  if (saved && (saved.phone === id || saved.email === id) && saved.password === pass) {
    user = saved;
    localStorage.setItem('dm_user', JSON.stringify(user));
    renderAccountPage();
    showToast('✅ Welcome back, ' + user.name);
  } else if (!saved && id.length >= 5) {
    // Demo login
    user = { name: 'Guest User', phone: id, email: '', address: '' };
    localStorage.setItem('dm_user', JSON.stringify(user));
    renderAccountPage();
    showToast('✅ Signed in as ' + user.name);
  } else {
    showToast('❌ Invalid credentials');
  }
}

function registerUser() {
  const name = document.getElementById('regName').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pass = document.getElementById('regPass').value.trim();
  const addr = document.getElementById('regAddr').value.trim();
  if (!name || !phone || !pass) { showToast('⚠️ Fill required fields'); return; }

  const userData = { name, phone, email, password: pass, address: addr };
  localStorage.setItem('dm_user_data', JSON.stringify(userData));
  user = userData;
  localStorage.setItem('dm_user', JSON.stringify(user));
  renderAccountPage();
  showToast('✅ Account created! Welcome, ' + name);
}

function renderUserDashboard(container) {
  const orders = orderHistory;
  container.innerHTML = `
    <div class="user-profile-card">
      <div class="profile-header">
        <div class="profile-avatar"><i class="fas fa-user"></i></div>
        <div>
          <div class="profile-name">${user.name}</div>
          <div class="profile-email">${user.phone || ''} ${user.email ? '| ' + user.email : ''}</div>
        </div>
      </div>
      ${user.address ? `<div style="font-size:13px;color:var(--text-med);background:var(--bg);padding:10px 14px;border-radius:8px;margin-bottom:16px"><i class="fas fa-map-marker-alt" style="color:var(--green)"></i> ${user.address}</div>` : ''}
      <div class="profile-actions">
        <button class="btn-secondary" onclick="showPage('tracking')"><i class="fas fa-map-marker-alt"></i> Track Order</button>
        <button class="btn-secondary" onclick="showPage('wishlist')"><i class="fas fa-heart"></i> Wishlist</button>
        <button class="btn-danger" onclick="logoutUser()"><i class="fas fa-sign-out-alt"></i> Logout</button>
      </div>
    </div>
    <h3 style="font-size:16px;font-weight:700;margin-bottom:12px">Order History</h3>
    ${orders.length === 0 ? '<div class="empty-state"><i class="fas fa-box-open"></i><h3>No orders yet</h3><p>Place your first order via WhatsApp checkout!</p></div>' :
      orders.map(o => `
        <div class="order-history-card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div>
              <h4>Order #${o.id}</h4>
              <p>${o.items}</p>
              <p>${o.date} &nbsp;|&nbsp; <strong>${o.total}</strong></p>
              <span class="order-status-badge ${o.status === 'Delivered' ? 'status-delivered' : 'status-pending'}">${o.status}</span>
            </div>
            <button class="btn-secondary" style="font-size:12px;padding:6px 12px" onclick="document.getElementById('trackingInput').value='${o.id}'; showPage('tracking'); trackOrder()">Track</button>
          </div>
        </div>`).join('')
    }`;
}

function logoutUser() {
  user = null;
  localStorage.removeItem('dm_user');
  renderAccountPage();
  showToast('Signed out successfully');
}

// ════════════════════════════════════════════════════════════
// MODALS
// ════════════════════════════════════════════════════════════
function openModal(id) {
  document.getElementById(id).classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
  document.body.style.overflow = '';
}

// ════════════════════════════════════════════════════════════
// BADGES & UTILS
// ════════════════════════════════════════════════════════════
function updateBadges() {
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);
  const wishCount = wishlist.length;
  ['cartBadge', 'cartBadgeMobile'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = cartCount;
  });
  const wb = document.getElementById('wishlistBadge');
  if (wb) wb.textContent = wishCount;
}

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

function animateCartBtn() {
  const btn = document.querySelector('.cart-btn');
  if (btn) {
    btn.style.transform = 'scale(1.15)';
    setTimeout(() => btn.style.transform = '', 300);
  }
}

// ════════════════════════════════════════════════════════════
// NAVBAR SCROLL BEHAVIOR
// ════════════════════════════════════════════════════════════
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 60) {
    navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.15)';
  } else {
    navbar.style.boxShadow = '0 2px 16px rgba(0,0,0,0.1)';
  }
});
