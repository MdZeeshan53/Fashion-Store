const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', function () {
    navMenu.classList.toggle('active');
    const icon = this.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.querySelector('i').classList.remove('fa-times');
        mobileToggle.querySelector('i').classList.add('fa-bars');
    });
});
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
const searchIcon = document.getElementById('searchIcon');
searchIcon.addEventListener('click', function () {
    const searchTerm = prompt('What are you looking for?');
    if (searchTerm) {
        alert(`Searching for: "${searchTerm}"\nThis would redirect to search results in a real application.`);
    }
});
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.querySelector('.cart-count');
const cartDropdown = document.getElementById('cartDropdown');
const cartItemsList = document.getElementById('cartItemsList');
let cartItems = 0;
let cartProducts = [];

function updateCartCount() {
    cartCount.textContent = cartItems;
}

function removeCartProduct(productName) {
    const index = cartProducts.indexOf(productName);
    if (index === -1) return;

    cartProducts.splice(index, 1);
    cartItems = Math.max(0, cartItems - 1);
    updateCartCount();
    updateCartList();
    showNotification(`"${productName}" removed from cart.`, 'info');
}

function updateCartList() {
    cartItemsList.innerHTML = '';
    if (cartProducts.length === 0) {
        cartItemsList.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
        return;
    }

    const counts = cartProducts.reduce((acc, name) => {
        acc[name] = (acc[name] || 0) + 1;
        return acc;
    }, {});

    Object.entries(counts).forEach(([productName, quantity]) => {
        const item = document.createElement('div');
        item.className = 'cart-item';

        const title = document.createElement('span');
        title.textContent = productName;
        title.className = 'cart-item-name';

        const controls = document.createElement('div');
        controls.className = 'cart-item-controls';

        const qty = document.createElement('span');
        qty.textContent = `x${quantity}`;
        qty.className = 'cart-item-qty';

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'cart-item-remove';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            removeCartProduct(productName);
        });

        controls.appendChild(qty);
        controls.appendChild(removeBtn);
        item.appendChild(title);
        item.appendChild(controls);
        cartItemsList.appendChild(item);
    });
}

cartIcon.addEventListener('click', function (e) {
    e.stopPropagation();
    cartDropdown.classList.toggle('active');
});

document.addEventListener('click', function (e) {
    if (!e.target.closest('#cartDropdown') && !e.target.closest('#cartIcon')) {
        cartDropdown.classList.remove('active');
    }
});

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.type = 'button';
    button.addEventListener('click', function (e) {
        e.stopPropagation();
        const card = this.closest('.product-item, .bestseller-card');
        if (!card) return;

        const productNameEl = card.querySelector('.product-name, .bestseller-name');
        const productName = productNameEl ? productNameEl.textContent : 'Product';
        cartItems++;
        cartCount.textContent = cartItems;
        cartProducts.push(productName);
        updateCartList();
        cartDropdown.classList.add('active');
        cartIcon.classList.add('pulse');
        setTimeout(() => {
            cartIcon.classList.remove('pulse');
        }, 500);
        showNotification(`"${productName}" added to cart!`, 'success');
    });
});

document.querySelectorAll('.quick-view').forEach(button => {
    button.addEventListener('click', function (e) {
        e.stopPropagation();
        const productName = this.closest('.product-item').querySelector('.product-name').textContent;
        showNotification(`Opening quick view for "${productName}"`, 'info');
    });
});
const testimonialsSlider = document.getElementById('testimonialsSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.testimonial-card').length;
function updateSlider() {
    testimonialsSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}
nextBtn.addEventListener('click', function () {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
});
prevBtn.addEventListener('click', function () {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
});
dots.forEach((dot, index) => {
    dot.addEventListener('click', function () {
        currentSlide = index;
        updateSlider();
    });
});
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}, 5000);
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const emailInput = this.querySelector('.newsletter-input');
    const email = emailInput.value.trim();

    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    emailInput.value = '';
    console.log('Newsletter subscription:', email);
});
function animateOnScroll() {
    const elements = document.querySelectorAll('.category-card, .product-item, .bestseller-card, .feature-card');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (elementPosition < screenPosition) {
            element.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}


window.addEventListener('load', () => {
    document.querySelectorAll('.hero-left, .hero-center, .hero-right').forEach(el => {
        el.classList.add('animate');
    });

   
    animateOnScroll();
});
window.addEventListener('scroll', animateOnScroll);
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 9999;
                transform: translateX(150%);
                transition: transform 0.3s ease;
                max-width: 350px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            `;

    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#F44336';
    } else {
        notification.style.backgroundColor = '#2196F3';
    }
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}
const style = document.createElement('style');
style.textContent = `
            .pulse {
                animation: pulse 0.5s ease;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
document.head.appendChild(style);
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function () {
        const categoryName = this.querySelector('.category-name').textContent;
        showNotification(`Browsing ${categoryName} category`, 'info');
    });
});
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function () {
        const productName = this.querySelector('h3').textContent;
        showNotification(`Viewing ${productName} details`, 'info');
    });
});
document.querySelector('.offer-btn').addEventListener('click', function () {
    showNotification('Redirecting to special offers...', 'info');
});
