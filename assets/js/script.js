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

// Close profile dropdown when clicking outside
document.addEventListener('click', (e) => {
    const profileDropdown = document.querySelector('#profile-dropdown');
    const profileTrigger = document.querySelector('#profile-trigger');
    const signinTrigger = document.querySelector('#signin-trigger');
    
    if (profileDropdown && !profileDropdown.contains(e.target) && !profileTrigger?.contains(e.target) && !signinTrigger?.contains(e.target)) {
        profileDropdown.classList.remove('active');
    }
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

// --- Live Search Logic ---
// Build index of food items on demand
const getFoodItemsIndex = () => {
    const items = [];
    document.querySelectorAll('.box-container .box, .speciality .box').forEach(box => {
        const titleEl = box.querySelector('h3');
        const imgEl = box.querySelector('img');
        const priceEl = box.querySelector('.price');
        
        if (titleEl) {
            const name = titleEl.textContent.trim();
            const img = imgEl ? imgEl.getAttribute('src') : '';
            let priceText = '₹150';
            if (priceEl) {
                priceText = priceEl.textContent.trim();
            } else {
                // Find potential parent pricing or fall back
                const boxSpan = box.querySelector('.content span');
                if (boxSpan && boxSpan.textContent.includes('₹')) {
                    priceText = boxSpan.textContent.trim();
                }
            }
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
        searchResults.innerHTML = '<div style="padding: 15px; font-size: 1.5rem; text-align: center; color: #747d8c;">No dishes found. Try searching for burger, pizza, ice-cream...</div>';
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
            
            // Add temporary highlight effect
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

// Parse and clean price text to raw integer
const cleanPriceVal = (priceText) => {
    let cleanText = priceText.replace(/[^0-9-]/g, ''); // keep numbers and dashes
    if (cleanText.includes('-')) {
        cleanText = cleanText.split('-')[0]; // take min price in range
    }
    return parseInt(cleanText) || 150;
};

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
    // Intercept clicks on popular section order buttons
    document.querySelectorAll('.popular .box .btn, .gallery .box .btn, .speciality .box .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const box = btn.closest('.box');
            if (box) {
                const heading = box.querySelector('h3');
                const img = box.querySelector('img');
                const priceEl = box.querySelector('.price');
                
                if (heading && img) {
                    const foodName = heading.textContent.trim();
                    const foodImg = img.getAttribute('src');
                    let priceText = '₹150';
                    
                    if (priceEl) {
                        priceText = priceEl.textContent;
                    } else {
                        const boxSpan = box.querySelector('.content span');
                        if (boxSpan && boxSpan.textContent.includes('₹')) {
                            priceText = boxSpan.textContent;
                        }
                    }
                    
                    const priceVal = cleanPriceVal(priceText);
                    addToCart(foodName, priceVal, foodImg);
                }
            }
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