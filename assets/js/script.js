// Loader fadeout
function loader() {
    const loaderContainer = document.querySelector('.loader-container');
    if (loaderContainer) {
        loaderContainer.classList.add('fade-out');
    }
}

function fadeOut() {
    setTimeout(loader, 1500);
}

window.addEventListener('load', fadeOut);

// Scroll interactions
window.onscroll = () => {
    const scrollTop = document.querySelector('#scroll-top');
    if (scrollTop) {
        if (window.scrollY > 60) {
            scrollTop.classList.add('active');
        } else {
            scrollTop.classList.remove('active');
        }
    }

    // Close any open dropdowns/drawers on scroll
    const profileDropdown = document.querySelector('#profile-dropdown');
    if (profileDropdown) {
        profileDropdown.classList.remove('active');
    }
};

// --- Modal and Drawer Toggles ---
const toggleModal = (modalId, action) => {
    const modal = document.querySelector(`#${modalId}`);
    if (modal) {
        if (action === 'open') {
            modal.classList.add('active');
        } else {
            modal.classList.remove('active');
        }
    }
};

// Search Overlay Trigger
document.querySelector('#search-trigger')?.addEventListener('click', () => toggleModal('search-overlay', 'open'));
document.querySelector('#close-search-btn')?.addEventListener('click', () => toggleModal('search-overlay', 'close'));

// Cart Drawer Trigger
document.querySelector('#cart-trigger')?.addEventListener('click', () => toggleModal('cart-drawer', 'open'));
document.querySelector('#close-cart-btn')?.addEventListener('click', () => toggleModal('cart-drawer', 'close'));

// Sign In Modal Trigger
document.querySelector('#signin-trigger')?.addEventListener('click', () => {
    const isUserSignedIn = document.querySelector('#signin-text').textContent !== 'Sign In';
    if (isUserSignedIn) {
        // Toggle profile dropdown instead
        document.querySelector('#profile-dropdown')?.classList.toggle('active');
    } else {
        toggleModal('signin-modal', 'open');
    }
});
document.querySelector('#close-signin-btn')?.addEventListener('click', () => toggleModal('signin-modal', 'close'));

// Location Modal Trigger
document.querySelector('#location-selector-trigger')?.addEventListener('click', () => toggleModal('location-modal', 'open'));
document.querySelector('#close-location-btn')?.addEventListener('click', () => toggleModal('location-modal', 'close'));

// Profile Trigger (Hamburger)
document.querySelector('#profile-trigger')?.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelector('#profile-dropdown')?.classList.toggle('active');
});

// Close profile and time dropdown when clicking outside
document.addEventListener('click', (e) => {
    const profileDropdown = document.querySelector('#profile-dropdown');
    const profileTrigger = document.querySelector('#profile-trigger');
    const signinTrigger = document.querySelector('#signin-trigger');
    
    if (profileDropdown && !profileDropdown.contains(e.target) && !profileTrigger?.contains(e.target) && !signinTrigger?.contains(e.target)) {
        profileDropdown.classList.remove('active');
    }

    const timeDropdown = document.querySelector('#delivery-time-dropdown');
    const timeTrigger = document.querySelector('#delivery-time-trigger');
    if (timeDropdown && !timeDropdown.contains(e.target) && !timeTrigger?.contains(e.target)) {
        timeDropdown.classList.remove('active');
        const chevron = document.querySelector('#delivery-time-chevron');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
    }
});

// --- Delivery Time Selection Logic ---
const timeTrigger = document.querySelector('#delivery-time-trigger');
const timeDropdown = document.querySelector('#delivery-time-dropdown');
const timeChevron = document.querySelector('#delivery-time-chevron');

timeTrigger?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = timeDropdown?.classList.toggle('active');
    if (timeChevron) {
        timeChevron.style.transform = isActive ? 'rotate(180deg)' : 'rotate(0deg)';
    }
});

const timeItems = document.querySelectorAll('#delivery-time-dropdown ul li');
timeItems.forEach(item => {
    item.addEventListener('click', () => {
        const timeVal = item.getAttribute('data-time');
        if (timeTrigger) {
            timeTrigger.innerHTML = `${timeVal} <i class="fas fa-chevron-down" id="delivery-time-chevron"></i>`;
        }
        timeDropdown?.classList.remove('active');
        const chevron = document.querySelector('#delivery-time-chevron');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
    });
});


// --- Location Selector Logic ---
const locations = document.querySelectorAll('.location-list li');
locations.forEach(item => {
    item.addEventListener('click', () => {
        const fullLoc = item.getAttribute('data-loc');
        const commaIdx = fullLoc.indexOf(',');
        if (commaIdx !== -1) {
            const mainLoc = fullLoc.substring(0, commaIdx).trim();
            const subLoc = fullLoc.substring(commaIdx + 1).trim();
            
            const currentMain = document.querySelector('#current-main-loc');
            const currentSub = document.querySelector('#current-sub-loc');
            
            if (currentMain) currentMain.textContent = mainLoc;
            if (currentSub) currentSub.textContent = subLoc;
        }
        toggleModal('location-modal', 'close');
    });
});

// --- Promo Banner Carousel Slider ---
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dots .dot');
const totalSlides = slides.length;

const showSlide = (index) => {
    if (index >= totalSlides) currentSlide = 0;
    else if (index < 0) currentSlide = totalSlides - 1;
    else currentSlide = index;
    
    const track = document.querySelector('.carousel-track');
    if (track) {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
    });
};

document.querySelector('#next-slide')?.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

document.querySelector('#prev-slide')?.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => showSlide(idx));
});

// Auto slide-show transition every 5 seconds
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);


// --- Restaurant Brands Category Filters ---
const brandCards = document.querySelectorAll('.brand-card');
const menuGroups = document.querySelectorAll('.restaurant-menu-group');

brandCards.forEach(card => {
    card.addEventListener('click', () => {
        brandCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        const filter = card.getAttribute('data-filter');
        
        menuGroups.forEach(group => {
            if (filter === 'all' || group.getAttribute('data-brand') === filter) {
                group.style.display = 'block';
            } else {
                group.style.display = 'none';
            }
        });
    });
});


// --- Live Search Logic ---
// Build index of food items on demand
const getFoodItemsIndex = () => {
    const items = [];
    document.querySelectorAll('.box-container .box').forEach(box => {
        const titleEl = box.querySelector('h3');
        const imgEl = box.querySelector('img');
        const priceEl = box.querySelector('.price');
        
        if (titleEl) {
            const name = titleEl.textContent.trim();
            const img = imgEl ? imgEl.getAttribute('src') : '';
            let priceText = priceEl ? priceEl.textContent.trim() : '₹150';
            items.push({ name, img, priceText, element: box });
        }
    });
    return items;
};

const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');

searchInput?.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    if (!searchResults) return;
    
    if (query.length === 0) {
        searchResults.innerHTML = '';
        return;
    }
    
    const items = getFoodItemsIndex();
    const matches = items.filter(item => item.name.toLowerCase().includes(query));
    
    searchResults.innerHTML = '';
    
    if (matches.length === 0) {
        searchResults.innerHTML = '<div style="padding: 15px; font-size: 1.5rem; text-align: center; color: #747d8c;">No dishes found. Try searching for burger, pizza, wrap, or biryani...</div>';
        return;
    }
    
    matches.forEach(match => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'search-result-item';
        itemDiv.innerHTML = `
            <img src="${match.img}" alt="${match.name}">
            <div class="search-result-info">
                <div class="search-result-title">${match.name}</div>
                <div class="search-result-price">${match.priceText}</div>
            </div>
            <i class="fas fa-chevron-right" style="color: #ff3838; font-size: 1.5rem;"></i>
        `;
        
        itemDiv.addEventListener('click', () => {
            toggleModal('search-overlay', 'close');
            match.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Highlight result box
            match.element.style.outline = '4px solid #ff3838';
            match.element.style.transition = 'outline 0.3s ease';
            setTimeout(() => {
                match.element.style.outline = 'none';
            }, 2000);
        });
        
        searchResults.appendChild(itemDiv);
    });
});

// --- Dynamic Cart Logic ---
let cart = [];

const updateCartUI = () => {
    const cartCountEl = document.querySelector('#cart-count');
    const cartItemsContainer = document.querySelector('#cart-items');
    const cartTotalEl = document.querySelector('#cart-total-price');
    
    if (cartCountEl) {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        cartCountEl.textContent = totalItems;
    }
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-msg">
                <i class="fas fa-shopping-basket"></i>
                <p>Your cart is empty. Add some delicious food!</p>
            </div>
        `;
        if (cartTotalEl) cartTotalEl.textContent = '₹0';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    let totalAmt = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        totalAmt += itemTotal;
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price}</div>
            </div>
            <div class="cart-item-qty">
                <div class="qty-btn minus" data-index="${index}">-</div>
                <span class="qty-val">${item.qty}</span>
                <div class="qty-btn plus" data-index="${index}">+</div>
            </div>
        `;
        
        cartItemsContainer.appendChild(itemDiv);
    });
    
    if (cartTotalEl) cartTotalEl.textContent = `₹${totalAmt}`;
    
    // Add quantity adjustments listeners
    cartItemsContainer.querySelectorAll('.qty-btn.minus').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-index'));
            if (cart[idx].qty > 1) {
                cart[idx].qty--;
            } else {
                cart.splice(idx, 1);
            }
            updateCartUI();
        });
    });
    
    cartItemsContainer.querySelectorAll('.qty-btn.plus').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-index'));
            cart[idx].qty++;
            updateCartUI();
        });
    });
};

const addToCart = (name, price, img) => {
    const existingIdx = cart.findIndex(item => item.name === name);
    if (existingIdx !== -1) {
        cart[existingIdx].qty++;
    } else {
        cart.push({ name, price, img, qty: 1 });
    }
    updateCartUI();
    toggleModal('cart-drawer', 'open');
};

// Wire the popular foods and specials order buttons to add to cart
const setupOrderButtons = () => {
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const name = btn.getAttribute('data-name');
            const price = parseInt(btn.getAttribute('data-price')) || 150;
            const brand = btn.getAttribute('data-brand') || '';
            const box = btn.closest('.box');
            const imgEl = box?.querySelector('img');
            const img = imgEl ? imgEl.getAttribute('src') : 'assets/images/loader.gif';
            
            const displayName = brand ? `${name} [${brand}]` : name;
            addToCart(displayName, price, img);
        });
    });
};

setupOrderButtons();

// --- Sign In Logic ---
const signinForm = document.querySelector('#signin-form');
signinForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#signin-email')?.value || 'Guest';
    const username = email.split('@')[0];
    
    const signinText = document.querySelector('#signin-text');
    const signinIcon = document.querySelector('#signin-icon');
    
    if (signinText) {
        signinText.textContent = username.charAt(0).toUpperCase() + username.slice(1);
    }
    if (signinIcon) {
        signinIcon.className = 'fas fa-user';
        signinIcon.style.color = '#ff3838';
    }
    
    toggleModal('signin-modal', 'close');
    signinForm.reset();
});

// Profile Dropdown links handler
document.querySelector('#profile-logout-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    const signinText = document.querySelector('#signin-text');
    const signinIcon = document.querySelector('#signin-icon');
    
    if (signinText) signinText.textContent = 'Sign In';
    if (signinIcon) {
        signinIcon.className = 'fas fa-user-circle';
        signinIcon.style.color = '';
    }
    
    document.querySelector('#profile-dropdown')?.classList.remove('active');
    alert('Logged out successfully!');
});

document.querySelector('#profile-orders-btn')?.addEventListener('click', () => {
    document.querySelector('#profile-dropdown')?.classList.remove('active');
});

document.querySelector('#profile-settings-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#profile-dropdown')?.classList.remove('active');
    alert('Profile Settings menu is under construction.');
});

// --- Checkout Logic ---
document.querySelector('#cart-checkout-btn')?.addEventListener('click', () => {
    if (cart.length === 0) return;
    
    // Clear cart
    cart = [];
    updateCartUI();
    
    // Close drawer
    toggleModal('cart-drawer', 'close');
    
    // Show success modal
    const successModal = document.querySelector('#order-success-modal');
    if (successModal) {
        successModal.classList.add('active');
    }
});

// Original order form success model wiring remains functional
const orderForm = document.querySelector('#order-form');
const successModal = document.querySelector('#order-success-modal');
const closeModalBtn = document.querySelector('#close-modal-btn');

if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (successModal) {
            successModal.classList.add('active');
        }
        orderForm.reset();
    });
}

if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
    });
}