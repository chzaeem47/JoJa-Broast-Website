/* =======================================================
   JOJA BROAST — site script
   Menu data, cart, checkout + geolocation, nav interactions
   ======================================================= */

/* ---------------- LENIS SMOOTH SCROLLING ---------------- */
if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
    });
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    window.lenis = lenis;
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------------- REAL FOOD IMAGES (Unsplash High-Quality Placeholders) ---------------- */
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80';

const IMG = {
    chickenLeg: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80',
    chickenSet: 'https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&w=500&q=80',
    wings: 'https://images.unsplash.com/photo-1569691899455-88464f6d3ab1?auto=format&fit=crop&w=500&q=80',
    burgerCrispy: 'https://images.unsplash.com/photo-1610440042744-77a83d1c4708?auto=format&fit=crop&w=500&q=80',
    burgerClassic: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
    burgerChicken: 'https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&w=500&q=80',
    friesMayo: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=500&q=80',
    friesPlain: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=500&q=80',
    coleslaw: 'https://images.unsplash.com/photo-1528735000313-039ec3a473f0?auto=format&fit=crop&w=500&q=80',
    softDrink: 'https://images.unsplash.com/photo-1622483767028-dc1d28362725?auto=format&fit=crop&w=500&q=80',
    lemonade: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80',
    water: 'https://images.unsplash.com/photo-1523362628745-0c59cbdb12f6?auto=format&fit=crop&w=500&q=80',
};

/* ---------------- MENU DATA ---------------- */
const MENU = {
    broast: [
        { id: 'b1', name: '2-Piece Broast', desc: 'Two pieces of our signature crunch broast with fries.', price: 650, img: IMG.chickenLeg, badge: 'top-rated' },
        { id: 'b2', name: '4-Piece Broast Bucket', desc: 'Four pieces broasted to order, served with dip.', price: 1150, img: IMG.chickenSet, badge: 'recommended' },
        { id: 'b3', name: '8-Piece Family Bucket', desc: 'Our biggest bucket — built for the whole table.', price: 2100, img: IMG.chickenSet, badge: 'bestseller' },
        { id: 'b4', name: 'Broast Wings (6pc)', desc: 'Crispy wings tossed in our house spice blend.', price: 590, img: IMG.wings },
    ],
    burgers: [
        { id: 'g1', name: 'Broast Zinger Burger', desc: 'Crunchy fillet, spicy mayo, fresh lettuce, toasted bun.', price: 480, img: IMG.burgerCrispy, badge: 'top-rated' },
        { id: 'g2', name: 'Double Patty Burger', desc: 'Two juicy chicken patties, cheddar, house sauce.', price: 620, img: IMG.burgerClassic, badge: 'recommended' },
        { id: 'g3', name: 'Classic Crispy Burger', desc: 'Simple, crispy, and always satisfying.', price: 400, img: IMG.burgerChicken },
    ],
    sides: [
        { id: 's1', name: 'Loaded Cheese Fries', desc: 'Crispy fries loaded with melted cheese sauce.', price: 380, img: IMG.friesMayo, badge: 'bestseller' },
        { id: 's2', name: 'Regular Fries', desc: 'Golden, salted, always crunchy.', price: 220, img: IMG.friesPlain },
        { id: 's3', name: 'Garlic Mayo Dip', desc: 'House-made dip, perfect with broast.', price: 120, img: IMG.friesMayo },
        { id: 's4', name: 'Coleslaw', desc: 'Fresh and creamy, made daily.', price: 180, img: IMG.coleslaw },
    ],
    drinks: [
        { id: 'd1', name: 'Soft Drink (Regular)', desc: 'Chilled and fizzy, your choice of flavor.', price: 120, img: IMG.softDrink },
        { id: 'd2', name: 'Fresh Lemonade', desc: 'Made fresh, lightly sweet and tangy.', price: 200, img: IMG.lemonade, badge: 'recommended' },
        { id: 'd3', name: 'Mineral Water', desc: '500ml bottle.', price: 80, img: IMG.water },
    ],
};

const DEALS = [
    { id: 'deal1', name: 'Solo Deal', desc: '2-Piece Broast + Fries + Drink', oldPrice: 950, price: 750, discount: '-21%', img: IMG.chickenLeg },
    { id: 'deal2', name: 'Duo Deal', desc: '4-Piece Broast + 2 Fries + 2 Drinks', oldPrice: 1650, price: 1350, discount: '-18%', img: IMG.chickenSet },
    { id: 'deal3', name: 'Family Feast', desc: '8-Piece Bucket + Loaded Fries + 4 Drinks', oldPrice: 3100, price: 2600, discount: '-16%', img: IMG.wings },
    { id: 'deal4', name: 'Burger Combo', desc: 'Zinger Burger + Regular Fries + Drink', oldPrice: 820, price: 650, discount: '-21%', img: IMG.burgerCrispy },
];

const LOCATIONS = [
    { name: 'Sahiwal — High Street', addr: 'High Street Road, Sahiwal, Punjab', hours: '12PM – 1AM', q: 'High Street Road Sahiwal Punjab Pakistan' },
    { name: 'Lahore — Gulberg', addr: 'Main Boulevard, Gulberg, Lahore', hours: '12PM – 1AM', q: 'Gulberg Lahore Pakistan' },
    { name: 'Multan — Cantt', addr: 'Cantt Bazaar Road, Multan', hours: '12PM – 1AM', q: 'Multan Cantt Pakistan' },
    { name: 'Faisalabad — D Ground', addr: 'D Ground, Faisalabad', hours: '12PM – 1AM', q: 'D Ground Faisalabad Pakistan' },
];

/* ---------------- RENDER: MENU ---------------- */
const menuGrid = document.getElementById('menuGrid');
const menuTabs = document.getElementById('menuTabs');

function badgeLabel(b) {
    if (b === 'top-rated') return 'Top Rated';
    if (b === 'recommended') return 'Recommended';
    if (b === 'bestseller') return 'Most Ordered';
    return '';
}

function renderMenu(cat) {
    if (!menuGrid) return;
    const items = MENU[cat] || [];
    menuGrid.innerHTML = items.map(item => `
        <div class="menu-card">
            ${item.badge ? `<span class="menu-badge ${item.badge}">${badgeLabel(item.badge)}</span>` : ''}
            <div class="menu-card-media">
                <img src="${item.img}" alt="${item.name}" loading="lazy" onerror="this.src='${FALLBACK_IMG}'">
            </div>
            <div class="menu-card-body">
                <h4>${item.name}</h4>
                <p>${item.desc}</p>
                <div class="menu-card-footer">
                    <span class="menu-price">Rs. ${item.price}</span>
                    <button class="add-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-img="${item.img}">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}
renderMenu('broast');

if (menuTabs) {
    menuTabs.addEventListener('click', (e) => {
        const tab = e.target.closest('.menu-tab');
        if (!tab) return;
        menuTabs.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderMenu(tab.dataset.cat);
    });
}

/* ---------------- RENDER: DEALS ---------------- */
const dealsGridEl = document.getElementById('dealsGrid');
if (dealsGridEl) {
    dealsGridEl.innerHTML = DEALS.map(d => `
        <div class="deal-card">
            <span class="deal-discount">${d.discount}</span>
            <div class="deal-card-media">
                <img src="${d.img}" alt="${d.name}" loading="lazy" onerror="this.src='${FALLBACK_IMG}'">
            </div>
            <div class="deal-card-body">
                <h4>${d.name}</h4>
                <p>${d.desc}</p>
                <div class="deal-footer">
                    <div class="deal-price-row">
                        <span class="deal-old">Rs. ${d.oldPrice}</span>
                        <span class="deal-new">Rs. ${d.price}</span>
                    </div>
                    <button class="add-btn" data-id="${d.id}" data-name="${d.name}" data-price="${d.price}" data-img="${d.img}">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

/* ---------------- RENDER: LOCATIONS ---------------- */
const locationsGridEl = document.getElementById('locationsGrid');
if (locationsGridEl) {
    locationsGridEl.innerHTML = LOCATIONS.map(l => `
        <div class="location-card">
            <h4><i class="fa-solid fa-location-dot"></i> ${l.name}</h4>
            <p>${l.addr}</p>
            <p><i class="fa-regular fa-clock"></i> ${l.hours}</p>
            <a href="https://www.google.com/maps?q=${encodeURIComponent(l.q)}" target="_blank" rel="noopener">Get Directions <i class="fa-solid fa-arrow-right"></i></a>
        </div>
    `).join('');
}

/* ---------------- CART STATE ---------------- */
let cart = JSON.parse(localStorage.getItem('joja_cart') || '[]');

function saveCart() { localStorage.setItem('joja_cart', JSON.stringify(cart)); }

function addToCart(item) {
    const existing = cart.find(c => c.id === item.id);
    if (existing) existing.qty += 1;
    else cart.push({ ...item, qty: 1 });
    saveCart();
    renderCart();
    showToast(`${item.name} added to cart`);
}

function changeQty(id, delta) {
    const item = cart.find(c => c.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
    saveCart();
    renderCart();
}

function removeItem(id) {
    cart = cart.filter(c => c.id !== id);
    saveCart();
    renderCart();
}

function cartTotal() {
    return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartSubtotal = document.getElementById('cartSubtotal');
    if (!cartItems || !cartCount || !cartSubtotal) return;

    const totalQty = cart.reduce((s, i) => s + i.qty, 0);
    cartCount.textContent = totalQty;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty" id="cartEmpty">
                <i class="fa-solid fa-basket-shopping"></i>
                <p>Your cart is empty. Add something crunchy!</p>
            </div>`;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-icon"><img src="${item.img || FALLBACK_IMG}" alt="${item.name}" onerror="this.src='${FALLBACK_IMG}'"></div>
                <div class="cart-item-info">
                    <h5>${item.name}</h5>
                    <span>Rs. ${item.price}</span>
                </div>
                <div class="qty-control">
                    <button data-act="dec" data-id="${item.id}"><i class="fa-solid fa-minus"></i></button>
                    <span>${item.qty}</span>
                    <button data-act="inc" data-id="${item.id}"><i class="fa-solid fa-plus"></i></button>
                </div>
                <button class="remove-item" data-act="remove" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
            </div>
        `).join('');
    }
    cartSubtotal.textContent = `Rs. ${cartTotal()}`;

    const mobileCartCountEl = document.getElementById('mobileCartCount');
    if (mobileCartCountEl) mobileCartCountEl.textContent = totalQty;
}
renderCart();

const cartItemsEl = document.getElementById('cartItems');
if (cartItemsEl) {
    cartItemsEl.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const id = btn.dataset.id;
        if (btn.dataset.act === 'inc') changeQty(id, 1);
        if (btn.dataset.act === 'dec') changeQty(id, -1);
        if (btn.dataset.act === 'remove') removeItem(id);
    });
}

/* Delegate "add to cart" clicks across menu + deals grids */
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-btn');
    if (!btn) return;
    addToCart({
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: Number(btn.dataset.price),
        img: btn.dataset.img,
    });
});

/* ---------------- CART DRAWER OPEN/CLOSE ---------------- */
const cartDrawer = document.getElementById('cartDrawer');
const overlay = document.getElementById('overlay');

function openCart() {
    if (cartDrawer) cartDrawer.classList.add('open');
    if (overlay) overlay.classList.add('show');
}
function closeCart() {
    if (cartDrawer) cartDrawer.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
}

const cartOpenBtn = document.getElementById('cartOpenBtn');
const cartCloseBtn = document.getElementById('cartCloseBtn');
if (cartOpenBtn) cartOpenBtn.addEventListener('click', openCart);
if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
if (overlay) overlay.addEventListener('click', () => { closeCart(); closeCheckout(); });

/* ---------------- NAV: mobile menu + close button + outside click ---------------- */
const mobileNav = document.getElementById('mobileNav');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileCloseBtn = document.getElementById('mobileCloseBtn');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (mobileNav) mobileNav.classList.toggle('open');
    });
}

if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', () => {
        if (mobileNav) mobileNav.classList.remove('open');
    });
}

// Close mobile menu when clicking anywhere outside the sidebar
document.addEventListener('click', (e) => {
    if (
        mobileNav &&
        mobileNav.classList.contains('open') &&
        !mobileNav.contains(e.target) &&
        (!mobileMenuBtn || !mobileMenuBtn.contains(e.target))
    ) {
        mobileNav.classList.remove('open');
    }
});

document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelectorAll('[data-nav]').forEach(l => l.classList.remove('active'));
        document.querySelectorAll(`[data-nav][href="${link.getAttribute('href')}"]`).forEach(l => l.classList.add('active'));
        if (mobileNav) mobileNav.classList.remove('open');
    });
});

/* ---------------- ORDER NOW → open cart (or checkout if items exist) ---------------- */
const orderNowBtn = document.getElementById('orderNowBtn');
const checkoutBtn = document.getElementById('checkoutBtn');

if (orderNowBtn) {
    orderNowBtn.addEventListener('click', () => {
        if (cart.length > 0) openCheckout();
        else openCart();
    });
}
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) { showToast('Your cart is empty'); return; }
        closeCart();
        openCheckout();
    });
}

/* ---------------- TOAST ---------------- */
let toastTimer;
function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ---------------- CHECKOUT MODAL ---------------- */
const checkoutOverlay = document.getElementById('checkoutOverlay');
const stepLocation = document.getElementById('stepLocation');
const stepReview = document.getElementById('stepReview');
const stepSuccess = document.getElementById('stepSuccess');

function openCheckout() {
    showStep(stepLocation);
    if (checkoutOverlay) checkoutOverlay.classList.add('show');
}
function closeCheckout() {
    if (checkoutOverlay) checkoutOverlay.classList.remove('show');
}
const checkoutCloseBtn = document.getElementById('checkoutCloseBtn');
if (checkoutCloseBtn) checkoutCloseBtn.addEventListener('click', closeCheckout);

function showStep(step) {
    [stepLocation, stepReview, stepSuccess].forEach(s => {
        if (s) s.classList.add('hidden');
    });
    if (step) step.classList.remove('hidden');
}

/* ----- Geolocation: "Use My Current Location" ----- */
const locationStatus = document.getElementById('locationStatus');
const mapPreview = document.getElementById('mapPreview');
const addressInput = document.getElementById('addressInput');
const locationPillText = document.getElementById('locationPillText');
const useMyLocationBtn = document.getElementById('useMyLocationBtn');

if (useMyLocationBtn) {
    useMyLocationBtn.addEventListener('click', () => {
        if (!navigator.geolocation) {
            if (locationStatus) locationStatus.textContent = 'Geolocation is not supported on this browser.';
            return;
        }
        if (locationStatus) locationStatus.textContent = 'Fetching your current location...';
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                if (locationStatus) locationStatus.textContent = `Location found (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
                if (mapPreview) {
                    mapPreview.classList.add('show');
                    mapPreview.innerHTML = `<iframe src="https://www.google.com/maps?q=${latitude},${longitude}&z=16&output=embed" loading="lazy"></iframe>`;
                }
                if (addressInput && !addressInput.value) {
                    addressInput.value = `Near coordinates ${latitude.toFixed(5)}, ${longitude.toFixed(5)} — please add house/street details.`;
                }
                if (locationPillText) locationPillText.textContent = 'Current location set';
            },
            (err) => {
                if (locationStatus) locationStatus.textContent = 'Could not fetch location — please allow permission or enter your address manually.';
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    });
}

window.addEventListener('load', () => {
    if (navigator.permissions && navigator.geolocation) {
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            if (result.state === 'granted') {
                navigator.geolocation.getCurrentPosition(
                    () => { if (locationPillText) locationPillText.textContent = 'Location detected'; },
                    () => {},
                    { maximumAge: 600000 }
                );
            }
        }).catch(() => {});
    }
});

const locationPill = document.getElementById('locationPill');
if (locationPill) {
    locationPill.addEventListener('click', () => {
        openCheckout();
    });
}

/* ----- Step: Location -> Review ----- */
const toReviewBtn = document.getElementById('toReviewBtn');
const backToLocationBtn = document.getElementById('backToLocationBtn');

if (toReviewBtn) {
    toReviewBtn.addEventListener('click', () => {
        if (addressInput && !addressInput.value.trim()) {
            showToast('Please add a delivery address');
            return;
        }
        const phoneInput = document.getElementById('phoneInput');
        if (phoneInput && !phoneInput.value.trim()) {
            showToast('Please add a phone number');
            return;
        }
        renderReview();
        showStep(stepReview);
    });
}

if (backToLocationBtn) {
    backToLocationBtn.addEventListener('click', () => showStep(stepLocation));
}

function renderReview() {
    const reviewItems = document.getElementById('reviewItems');
    const reviewTotal = document.getElementById('reviewTotal');
    const reviewAddress = document.getElementById('reviewAddress');

    if (reviewItems) {
        reviewItems.innerHTML = cart.map(i => `
            <div class="review-item-row"><span>${i.name} × ${i.qty}</span><span>Rs. ${i.price * i.qty}</span></div>
        `).join('');
    }
    if (reviewTotal) reviewTotal.textContent = `Rs. ${cartTotal()}`;
    if (reviewAddress && addressInput) {
        const phoneInput = document.getElementById('phoneInput');
        reviewAddress.innerHTML = `
            <strong>Deliver to:</strong><br>${addressInput.value}<br><br>
            <strong>Phone:</strong> ${phoneInput ? phoneInput.value : ''}`;
    }
}

/* ----- Step: Place order ----- */
const placeOrderBtn = document.getElementById('placeOrderBtn');
const successCloseBtn = document.getElementById('successCloseBtn');

if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', () => {
        const successMsg = document.getElementById('successMsg');
        if (successMsg) {
            successMsg.textContent = `Order of Rs. ${cartTotal()} placed successfully. Estimated delivery: 35–45 minutes.`;
        }
        showStep(stepSuccess);
        cart = [];
        saveCart();
        renderCart();
    });
}

if (successCloseBtn) {
    successCloseBtn.addEventListener('click', () => {
        closeCheckout();
        if (addressInput) addressInput.value = '';
        const phoneInput = document.getElementById('phoneInput');
        if (phoneInput) phoneInput.value = '';
        if (mapPreview) {
            mapPreview.classList.remove('show');
            mapPreview.innerHTML = '';
        }
        if (locationStatus) locationStatus.textContent = '';
    });
}

/* ---------------- SCROLLSPY (highlight nav on scroll) ---------------- */
const sections = ['home', 'menu', 'deals', 'locations', 'contact'].map(id => document.getElementById(id));
window.addEventListener('scroll', () => {
    let current = 'home';
    sections.forEach(sec => {
        if (!sec) return;
        const top = sec.offsetTop - 140;
        if (window.scrollY >= top) current = sec.id;
    });
    document.querySelectorAll('[data-nav]').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});

/* ---------------- MOBILE NAV ACTIONS ---------------- */
const mobileCartBtn = document.getElementById('mobileCartBtn');
const mobileOrderBtn = document.getElementById('mobileOrderBtn');
const mobileLocationPill = document.getElementById('mobileLocationPill');

if (mobileCartBtn) {
    mobileCartBtn.addEventListener('click', () => {
        if (mobileNav) mobileNav.classList.remove('open');
        openCart();
    });
}
if (mobileOrderBtn) {
    mobileOrderBtn.addEventListener('click', () => {
        if (mobileNav) mobileNav.classList.remove('open');
        if (cart.length > 0) openCheckout();
        else openCart();
    });
}
if (mobileLocationPill) {
    mobileLocationPill.addEventListener('click', () => {
        if (mobileNav) mobileNav.classList.remove('open');
        openCheckout();
    });
}