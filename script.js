// ShopVista JavaScript functionality
async function submitToN8n(formData) {
    const n8nWebhookUrl = 'https://shivank924.app.n8n.cloud/webhook-test/a0d1a233-1613-4615-a027-9b4f7a370e1f';
    
    const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
        throw new Error('Failed to submit feedback');
    }
    
    return response.json();
}
document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    initCarousel();
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const secondaryNav = document.querySelector('.secondary-nav');
    
    if (mobileMenuToggle && secondaryNav) {
        mobileMenuToggle.addEventListener('click', function() {
            secondaryNav.classList.toggle('mobile-menu-open');
        });
    }

    // Search functionality
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                // In a real application, this would redirect to search results
                console.log('Searching for:', searchTerm);
                alert(`Searching for: ${searchTerm}`);
            }
        });
    }

    // Enhanced Cart functionality
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.querySelector('.cart-total');
    let cartItems = [];
    let cartTotalAmount = 0;

    // Cart data structure
    const cart = {
        items: [],
        total: 0,
        itemCount: 0
    };

    // Initialize cart from localStorage
    function initCart() {
        const savedCart = localStorage.getItem('shopVistaCart');
        if (savedCart) {
            cart.items = JSON.parse(savedCart);
            updateCartDisplay();
        }
        
        // Initialize user session
        const userSession = localStorage.getItem('shopVistaUser');
        if (userSession) {
            cart.user = JSON.parse(userSession);
        }
    }

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('shopVistaCart', JSON.stringify(cart.items));
    }

    // Update cart display
    function updateCartDisplay() {
        cart.itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
        cart.total = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        if (cartCount) {
            cartCount.textContent = cart.itemCount;
            cartCount.style.display = cart.itemCount > 0 ? 'flex' : 'none';
            
            // Add animation when cart count changes
            cartCount.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 200);
        }

        // Update cart total in header if element exists
        if (cartTotal) {
            cartTotal.textContent = `$${cart.total.toFixed(2)}`;
        }
    }

    // Category card click handlers
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            console.log('Category clicked:', categoryName);
            // In a real application, this would navigate to the category page
            alert(`Navigating to ${categoryName} category`);
        });
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Focus search input with Ctrl+K or Cmd+K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
            }
        }
    });

    // Initialize cart
    initCart();

    // Product functionality
    initProductFeatures();
    
    // Cart dropdown functionality
    initCartDropdown();
    
    // Footer functionality
    initFooterFeatures();
    
    // Search and filter functionality
    initSearchAndFilter();
    
    // Feedback form functionality
    initFeedbackForm();
    
    // Back to top functionality
    initBackToTop();
    
    // Checkout functionality
    initCheckout();
    
    // User account functionality
    initUserAccounts();
    
    // Wishlist functionality
    initWishlist();
});

// Carousel functionality
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let autoSlideInterval;

    // Function to show specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    // Function to go to next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    // Function to go to previous slide
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    // Function to start auto-slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Function to stop auto-slide
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners for navigation arrows
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide(); // Restart auto-slide after manual navigation
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide(); // Restart auto-slide after manual navigation
        });
    }

    // Event listeners for dot indicators
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide(); // Restart auto-slide after manual navigation
        });
    });

    // Pause auto-slide on hover
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        }
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for a swipe
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - go to next slide
                nextSlide();
            } else {
                // Swipe right - go to previous slide
                prevSlide();
            }
            stopAutoSlide();
            startAutoSlide();
        }
    }

    // CTA button functionality
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const buttonText = button.textContent;
            console.log('CTA clicked:', buttonText);
            // In a real application, this would navigate to the appropriate page
            alert(`Navigating to: ${buttonText}`);
        });
    });

    // Start auto-slide
    startAutoSlide();

    // Initialize first slide
    showSlide(0);
}

// Product functionality
function initProductFeatures() {
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click event
            
            const productId = this.getAttribute('data-product-id');
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            
            // Add to cart
            addToCart(productId, productTitle, productPrice);
            
            // Update button state
            this.classList.add('added');
            this.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.classList.remove('added');
                this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
            }, 2000);
        });
    });

    // Product card click functionality
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the add to cart button
            if (e.target.closest('.add-to-cart-btn')) {
                return;
            }
            
            const productId = this.getAttribute('data-product-id');
            const productTitle = this.querySelector('.product-title').textContent;
            
            // In a real application, this would navigate to the product detail page
            console.log('Product clicked:', productTitle);
            alert(`Viewing product: ${productTitle}`);
        });
    });

    // Wishlist functionality (optional)
    addWishlistFunctionality();
}

// Enhanced Add to cart function
function addToCart(productId, productTitle, productPrice) {
    // Parse price to number
    const price = parseFloat(productPrice.replace('$', '').replace(',', ''));
    
    // Check if item already exists in cart
    const existingItem = cart.items.find(item => item.id === productId);
    
    if (existingItem) {
        // Increase quantity if item already exists
        existingItem.quantity += 1;
    } else {
        // Add new item to cart
        cart.items.push({
            id: productId,
            title: productTitle,
            price: price,
            quantity: 1,
            addedAt: new Date().toISOString()
        });
    }
    
    // Update cart display and save to localStorage
    updateCartDisplay();
    saveCart();
    
    // Show success message with animation
    showNotification(`${productTitle} added to cart!`, 'success');
    
    // Add visual feedback animation
    animateCartAddition(productId);
    
    // Add flying animation
    createFlyingAnimation(productId);
    
    console.log('Cart updated:', cart);
}

// Animate cart addition
function animateCartAddition(productId) {
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    if (productCard) {
        // Add a subtle bounce animation to the product card
        productCard.style.transform = 'scale(1.02)';
        productCard.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            productCard.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Animate cart icon
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.1) rotate(5deg)';
        cartIcon.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    }
}

// Create flying animation from product to cart
function createFlyingAnimation(productId) {
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    const cartIcon = document.querySelector('.cart-icon');
    
    if (productCard && cartIcon) {
        // Get positions
        const productRect = productCard.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();
        
        // Create flying element
        const flyingItem = document.createElement('div');
        flyingItem.className = 'flying-item';
        flyingItem.innerHTML = '<i class="fas fa-shopping-cart" style="color: white; font-size: 16px; line-height: 40px; text-align: center;"></i>';
        
        // Set initial position
        flyingItem.style.left = (productRect.left + productRect.width / 2 - 20) + 'px';
        flyingItem.style.top = (productRect.top + productRect.height / 2 - 20) + 'px';
        
        document.body.appendChild(flyingItem);
        
        // Calculate end position
        const endX = cartRect.left + cartRect.width / 2 - 20;
        const endY = cartRect.top + cartRect.height / 2 - 20;
        
        // Animate to cart
        setTimeout(() => {
            flyingItem.style.left = endX + 'px';
            flyingItem.style.top = endY + 'px';
        }, 50);
        
        // Remove element after animation
        setTimeout(() => {
            if (flyingItem.parentNode) {
                flyingItem.parentNode.removeChild(flyingItem);
            }
        }, 800);
    }
}

// Wishlist functionality
function addWishlistFunctionality() {
    // Add wishlist buttons to product cards
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productImage = card.querySelector('.product-image');
        
        // Create wishlist button
        const wishlistBtn = document.createElement('button');
        wishlistBtn.className = 'wishlist-btn';
        wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
        wishlistBtn.setAttribute('aria-label', 'Add to wishlist');
        
        // Position the wishlist button
        wishlistBtn.style.cssText = `
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 3;
        `;
        
        // Add hover effect
        wishlistBtn.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 1)';
            this.style.transform = 'scale(1.1)';
        });
        
        wishlistBtn.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.9)';
            this.style.transform = 'scale(1)';
        });
        
        // Add click functionality
        wishlistBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const icon = this.querySelector('i');
            const isWishlisted = icon.classList.contains('fas');
            
            if (isWishlisted) {
                icon.className = 'far fa-heart';
                this.style.color = '#666';
                showNotification('Removed from wishlist', 'info');
            } else {
                icon.className = 'fas fa-heart';
                this.style.color = '#e74c3c';
                showNotification('Added to wishlist', 'success');
            }
        });
        
        productImage.appendChild(wishlistBtn);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-size: 0.875rem;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Cart dropdown functionality
function initCartDropdown() {
    const cartLink = document.querySelector('.cart-link');
    const cartSection = document.querySelector('.cart-section');
    
    if (cartLink && cartSection) {
        // Create cart dropdown
        const cartDropdown = document.createElement('div');
        cartDropdown.className = 'cart-dropdown';
        cartDropdown.innerHTML = `
            <div class="cart-dropdown-header">
                <h3>Shopping Cart</h3>
                <span class="cart-item-count">0 items</span>
            </div>
            <div class="cart-dropdown-items" id="cartDropdownItems">
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            </div>
            <div class="cart-dropdown-footer">
                <div class="cart-total-display">
                    <span>Total: <strong class="cart-total-amount">$0.00</strong></span>
                </div>
                <button class="checkout-btn">Proceed to Checkout</button>
            </div>
        `;
        
        cartSection.appendChild(cartDropdown);
        
        // Add hover functionality
        cartSection.addEventListener('mouseenter', showCartDropdown);
        cartSection.addEventListener('mouseleave', hideCartDropdown);
        
        // Add click functionality for mobile
        cartLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.innerWidth <= 768) {
                toggleCartDropdown();
            }
        });
    }
}

// Show cart dropdown
function showCartDropdown() {
    const cartDropdown = document.querySelector('.cart-dropdown');
    if (cartDropdown && window.innerWidth > 768) {
        updateCartDropdown();
        cartDropdown.style.display = 'block';
        setTimeout(() => {
            cartDropdown.classList.add('show');
        }, 10);
    }
}

// Hide cart dropdown
function hideCartDropdown() {
    const cartDropdown = document.querySelector('.cart-dropdown');
    if (cartDropdown && window.innerWidth > 768) {
        cartDropdown.classList.remove('show');
        setTimeout(() => {
            cartDropdown.style.display = 'none';
        }, 300);
    }
}

// Toggle cart dropdown (for mobile)
function toggleCartDropdown() {
    const cartDropdown = document.querySelector('.cart-dropdown');
    if (cartDropdown) {
        if (cartDropdown.classList.contains('show')) {
            hideCartDropdown();
        } else {
            updateCartDropdown();
            cartDropdown.style.display = 'block';
            setTimeout(() => {
                cartDropdown.classList.add('show');
            }, 10);
        }
    }
}

// Update cart dropdown content
function updateCartDropdown() {
    const cartDropdownItems = document.getElementById('cartDropdownItems');
    const cartItemCount = document.querySelector('.cart-item-count');
    const cartTotalAmount = document.querySelector('.cart-total-amount');
    
    if (cartDropdownItems && cartItemCount && cartTotalAmount) {
        if (cart.items.length === 0) {
            cartDropdownItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
            cartItemCount.textContent = '0 items';
        } else {
            cartDropdownItems.innerHTML = cart.items.map(item => `
                <div class="cart-dropdown-item">
                    <div class="item-info">
                        <h4>${item.title}</h4>
                        <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
                    </div>
                    <div class="item-actions">
                        <button class="remove-item-btn" data-product-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
            
            cartItemCount.textContent = `${cart.itemCount} item${cart.itemCount !== 1 ? 's' : ''}`;
            
            // Add event listeners to remove buttons
            cartDropdownItems.querySelectorAll('.remove-item-btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const productId = this.getAttribute('data-product-id');
                    removeFromCart(productId);
                });
            });
        }
        
        cartTotalAmount.textContent = `$${cart.total.toFixed(2)}`;
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart.items = cart.items.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCart();
    updateCartDropdown();
    showNotification('Item removed from cart', 'info');
}

// Footer functionality
function initFooterFeatures() {
    // Footer link functionality
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent;
            console.log('Footer link clicked:', linkText);
            // In a real application, this would navigate to the appropriate page
            showNotification(`Navigating to: ${linkText}`, 'info');
        });
    });

    // Legal links functionality
    const legalLinks = document.querySelectorAll('.legal-link');
    legalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent;
            console.log('Legal link clicked:', linkText);
            showNotification(`Opening: ${linkText}`, 'info');
        });
    });

    // Social media links functionality
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('aria-label');
            console.log('Social media link clicked:', platform);
            showNotification(`Opening ${platform} page`, 'info');
        });
    });

    // Footer logo click
    const footerLogo = document.querySelector('.footer-logo .logo-link');
    if (footerLogo) {
        footerLogo.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Footer logo clicked - returning to homepage');
            showNotification('Returning to homepage', 'info');
            // In a real application, this would scroll to top or navigate to homepage
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Add hover effects to social media icons
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Search suggestions (placeholder for future implementation)
const searchSuggestions = [
    'laptop',
    'smartphone',
    'headphones',
    'books',
    'clothing',
    'home decor',
    'kitchen appliances',
    'fitness equipment'
];

// Add search suggestions functionality
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    const debouncedSearch = debounce(function(value) {
        // In a real application, this would fetch search suggestions from an API
        console.log('Search suggestions for:', value);
    }, 300);

    searchInput.addEventListener('input', function() {
        debouncedSearch(this.value);
    });
}

// Search and Filter functionality
function initSearchAndFilter() {
    const searchInput = document.getElementById('productSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const ratingFilter = document.getElementById('ratingFilter');
    const clearSearch = document.getElementById('clearSearch');
    const resetFilters = document.getElementById('resetFilters');
    const resultsCount = document.getElementById('resultsCount');
    const productCards = document.querySelectorAll('.product-card');

    // Debounced search function
    const debouncedSearch = debounce(filterProducts, 300);

    // Event listeners
    searchInput.addEventListener('input', debouncedSearch);
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
    ratingFilter.addEventListener('change', filterProducts);
    
    clearSearch.addEventListener('click', clearSearchInput);
    resetFilters.addEventListener('click', resetAllFilters);

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value;
        const selectedPrice = priceFilter.value;
        const selectedRating = ratingFilter.value;

        let visibleCount = 0;

        productCards.forEach(card => {
            const productTitle = card.querySelector('.product-title').textContent.toLowerCase();
            const productCategory = card.getAttribute('data-category');
            const productPrice = parseFloat(card.getAttribute('data-price'));
            const productRating = parseInt(card.getAttribute('data-rating'));

            // Search filter
            const matchesSearch = searchTerm === '' || productTitle.includes(searchTerm);

            // Category filter
            const matchesCategory = selectedCategory === 'all' || productCategory === selectedCategory;

            // Price filter
            let matchesPrice = true;
            if (selectedPrice !== 'all') {
                switch (selectedPrice) {
                    case '0-50':
                        matchesPrice = productPrice < 50;
                        break;
                    case '50-100':
                        matchesPrice = productPrice >= 50 && productPrice < 100;
                        break;
                    case '100-200':
                        matchesPrice = productPrice >= 100 && productPrice < 200;
                        break;
                    case '200-500':
                        matchesPrice = productPrice >= 200 && productPrice < 500;
                        break;
                    case '500+':
                        matchesPrice = productPrice >= 500;
                        break;
                }
            }

            // Rating filter
            const matchesRating = selectedRating === 'all' || productRating >= parseInt(selectedRating);

            // Show/hide card based on all filters
            if (matchesSearch && matchesCategory && matchesPrice && matchesRating) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Update results count
        updateResultsCount(visibleCount);
    }

    function clearSearchInput() {
        searchInput.value = '';
        filterProducts();
        searchInput.focus();
    }

    function resetAllFilters() {
        searchInput.value = '';
        categoryFilter.value = 'all';
        priceFilter.value = 'all';
        ratingFilter.value = 'all';
        filterProducts();
        showNotification('Filters reset', 'info');
    }

    function updateResultsCount(count) {
        const text = count === 1 ? '1 product found' : `${count} products found`;
        resultsCount.textContent = text;
    }

    // Initialize
    filterProducts();
}

// Feedback form functionality
function initFeedbackForm() {
    const feedbackForm = document.getElementById('feedbackForm');
    const submitBtn = document.getElementById('submitFeedback');
    const resetBtn = document.getElementById('resetFeedback');
    const feedbackSuccess = document.getElementById('feedbackSuccess');

    // Form validation
    const formFields = {
        name: document.getElementById('feedbackName'),
        email: document.getElementById('feedbackEmail'),
        message: document.getElementById('feedbackMessage'),
        consent: document.getElementById('feedbackConsent')
    };

    const errorFields = {
        name: document.getElementById('nameError'),
        email: document.getElementById('emailError'),
        message: document.getElementById('messageError'),
        consent: document.getElementById('consentError')
    };

    // Real-time validation
    Object.keys(formFields).forEach(fieldName => {
        const field = formFields[fieldName];
        const errorField = errorFields[fieldName];

        field.addEventListener('blur', () => validateField(fieldName));
        field.addEventListener('input', () => clearFieldError(fieldName));
    });

    // Form submission
    feedbackForm.addEventListener('submit', handleFormSubmission);
    resetBtn.addEventListener('click', resetForm);

    function validateField(fieldName) {
        const field = formFields[fieldName];
        const errorField = errorFields[fieldName];
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (!field.value.trim()) {
                    errorMessage = 'Name is required';
                    isValid = false;
                } else if (field.value.trim().length < 2) {
                    errorMessage = 'Name must be at least 2 characters';
                    isValid = false;
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!field.value.trim()) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!emailRegex.test(field.value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;

            case 'message':
                if (!field.value.trim()) {
                    errorMessage = 'Message is required';
                    isValid = false;
                } else if (field.value.trim().length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                    isValid = false;
                }
                break;

            case 'consent':
                if (!field.checked) {
                    errorMessage = 'You must agree to the privacy policy';
                    isValid = false;
                }
                break;
        }

        if (!isValid) {
            errorField.textContent = errorMessage;
            field.style.borderColor = '#e74c3c';
        } else {
            clearFieldError(fieldName);
        }

        return isValid;
    }

    function clearFieldError(fieldName) {
        const field = formFields[fieldName];
        const errorField = errorFields[fieldName];
        errorField.textContent = '';
        field.style.borderColor = '#ddd';
    }

    function validateForm() {
        let isFormValid = true;
        Object.keys(formFields).forEach(fieldName => {
            if (!validateField(fieldName)) {
                isFormValid = false;
            }
        });
        return isFormValid;
    }

    async function handleFormSubmission(e) {
        e.preventDefault();

        if (!validateForm()) {
            showNotification('Please fix the errors in the form', 'error');
            return;
        }

        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            // Collect form data
            const formData = {
                name: formFields.name.value.trim(),
                email: formFields.email.value.trim(),
                subject: document.getElementById('feedbackSubject').value || 'General Feedback',
                message: formFields.message.value.trim(),
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                url: window.location.href
            };

            // Simulate API call (replace with actual n8n webhook URL)
            await submitToN8n(formData);

            // Show success message
            feedbackForm.style.display = 'none';
            feedbackSuccess.style.display = 'block';
            showNotification('Feedback submitted successfully!', 'success');

        } catch (error) {
            console.error('Error submitting feedback:', error);
            showNotification('Failed to submit feedback. Please try again.', 'error');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Feedback';
        }
    }

    async function submitToN8n(formData) {
        // This is where you would integrate with your n8n webhook
        // For now, we'll simulate the API call
        
        // Replace this URL with your actual n8n webhook URL
        const n8nWebhookUrl = 'https://your-n8n-instance.com/webhook/feedback';
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In a real implementation, you would do:
        // const response = await fetch(n8nWebhookUrl, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData)
        // });
        
        // if (!response.ok) {
        //     throw new Error('Failed to submit feedback');
        // }
        
        console.log('Feedback data to be sent to n8n:', formData);
    }

    function resetForm() {
        feedbackForm.reset();
        Object.keys(errorFields).forEach(fieldName => {
            clearFieldError(fieldName);
        });
        feedbackForm.style.display = 'block';
        feedbackSuccess.style.display = 'none';
        showNotification('Form reset', 'info');
    }
}

// Back to Top functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Smooth scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Checkout functionality
function initCheckout() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.items.length === 0) {
                showNotification('Your cart is empty!', 'error');
                return;
            }
            openCheckoutModal();
        });
    }
}

function openCheckoutModal() {
    // Create checkout modal
    const modal = document.createElement('div');
    modal.className = 'checkout-modal';
    modal.innerHTML = `
        <div class="checkout-modal-content">
            <div class="checkout-header">
                <h2>Checkout</h2>
                <button class="close-checkout" aria-label="Close checkout">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="checkout-body">
                <div class="checkout-section">
                    <h3>Shipping Information</h3>
                    <form id="shippingForm">
                        <div class="form-row">
                            <input type="text" placeholder="First Name" required>
                            <input type="text" placeholder="Last Name" required>
                        </div>
                        <input type="email" placeholder="Email" required>
                        <input type="text" placeholder="Address" required>
                        <div class="form-row">
                            <input type="text" placeholder="City" required>
                            <input type="text" placeholder="State" required>
                            <input type="text" placeholder="ZIP Code" required>
                        </div>
                    </form>
                </div>
                <div class="checkout-section">
                    <h3>Payment Information</h3>
                    <form id="paymentForm">
                        <input type="text" placeholder="Card Number" required>
                        <div class="form-row">
                            <input type="text" placeholder="MM/YY" required>
                            <input type="text" placeholder="CVV" required>
                        </div>
                        <input type="text" placeholder="Cardholder Name" required>
                    </form>
                </div>
                <div class="checkout-section">
                    <h3>Order Summary</h3>
                    <div class="order-items">
                        ${cart.items.map(item => `
                            <div class="order-item">
                                <span>${item.title} x${item.quantity}</span>
                                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="order-total">
                        <strong>Total: $${cart.total.toFixed(2)}</strong>
                    </div>
                </div>
            </div>
            <div class="checkout-footer">
                <button class="place-order-btn">Place Order</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.close-checkout').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.place-order-btn').addEventListener('click', () => {
        processOrder();
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function processOrder() {
    const shippingForm = document.getElementById('shippingForm');
    const paymentForm = document.getElementById('paymentForm');
    
    if (!shippingForm.checkValidity() || !paymentForm.checkValidity()) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Simulate order processing
    showNotification('Processing your order...', 'info');
    
    setTimeout(() => {
        // Create order
        const order = {
            id: Date.now(),
            items: [...cart.items],
            total: cart.total,
            date: new Date().toISOString(),
            status: 'confirmed'
        };
        
        // Save order to localStorage
        const orders = JSON.parse(localStorage.getItem('shopVistaOrders') || '[]');
        orders.push(order);
        localStorage.setItem('shopVistaOrders', JSON.stringify(orders));
        
        // Clear cart
        cart.items = [];
        cart.total = 0;
        cart.itemCount = 0;
        saveCart();
        updateCartDisplay();
        updateCartDropdown();
        
        // Close modal
        const modal = document.querySelector('.checkout-modal');
        if (modal) {
            document.body.removeChild(modal);
        }
        
        showNotification('Order placed successfully! Order ID: ' + order.id, 'success');
    }, 2000);
}

// User Account functionality
function initUserAccounts() {
    const accountSection = document.querySelector('.account-section');
    if (accountSection) {
        accountSection.addEventListener('click', (e) => {
            e.preventDefault();
            const user = JSON.parse(localStorage.getItem('shopVistaUser') || 'null');
            if (user) {
                showUserMenu();
            } else {
                showLoginModal();
            }
        });
    }
}

function showLoginModal() {
    const modal = document.createElement('div');
    modal.className = 'login-modal';
    modal.innerHTML = `
        <div class="login-modal-content">
            <div class="login-header">
                <h2>Sign In</h2>
                <button class="close-login" aria-label="Close login">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="login-body">
                <div class="login-tabs">
                    <button class="login-tab active" data-tab="signin">Sign In</button>
                    <button class="login-tab" data-tab="signup">Sign Up</button>
                </div>
                <div class="login-form-container">
                    <form id="signinForm" class="login-form active">
                        <input type="email" placeholder="Email" required>
                        <input type="password" placeholder="Password" required>
                        <button type="submit" class="login-btn">Sign In</button>
                    </form>
                    <form id="signupForm" class="login-form">
                        <input type="text" placeholder="Full Name" required>
                        <input type="email" placeholder="Email" required>
                        <input type="password" placeholder="Password" required>
                        <input type="password" placeholder="Confirm Password" required>
                        <button type="submit" class="login-btn">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.close-login').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Tab switching
    modal.querySelectorAll('.login-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            modal.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
            modal.querySelectorAll('.login-form').forEach(f => f.classList.remove('active'));
            tab.classList.add('active');
            modal.querySelector(`#${tabName}Form`).classList.add('active');
        });
    });
    
    // Form submissions
    modal.querySelector('#signinForm').addEventListener('submit', (e) => {
        e.preventDefault();
        handleSignIn(modal);
    });
    
    modal.querySelector('#signupForm').addEventListener('submit', (e) => {
        e.preventDefault();
        handleSignUp(modal);
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function handleSignIn(modal) {
    const form = modal.querySelector('#signinForm');
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    
    // Simulate authentication
    showNotification('Signing in...', 'info');
    
    setTimeout(() => {
        const user = {
            id: Date.now(),
            email: email,
            name: email.split('@')[0],
            signupDate: new Date().toISOString()
        };
        
        localStorage.setItem('shopVistaUser', JSON.stringify(user));
        updateUserDisplay(user);
        document.body.removeChild(modal);
        showNotification('Welcome back!', 'success');
    }, 1000);
}

function handleSignUp(modal) {
    const form = modal.querySelector('#signupForm');
    const name = form.querySelector('input[placeholder="Full Name"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    const confirmPassword = form.querySelector('input[placeholder="Confirm Password"]').value;
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    // Simulate registration
    showNotification('Creating account...', 'info');
    
    setTimeout(() => {
        const user = {
            id: Date.now(),
            name: name,
            email: email,
            signupDate: new Date().toISOString()
        };
        
        localStorage.setItem('shopVistaUser', JSON.stringify(user));
        updateUserDisplay(user);
        document.body.removeChild(modal);
        showNotification('Account created successfully!', 'success');
    }, 1000);
}

function updateUserDisplay(user) {
    const accountSection = document.querySelector('.account-section .nav-link');
    if (accountSection) {
        accountSection.innerHTML = `
            <span class="nav-text">Hello, ${user.name}</span>
            <span class="nav-subtext">Account & Lists</span>
        `;
    }
}

function showUserMenu() {
    const user = JSON.parse(localStorage.getItem('shopVistaUser'));
    const modal = document.createElement('div');
    modal.className = 'user-menu-modal';
    modal.innerHTML = `
        <div class="user-menu-content">
            <div class="user-info">
                <h3>Welcome, ${user.name}</h3>
                <p>${user.email}</p>
            </div>
            <div class="user-menu-options">
                <button class="user-menu-btn" onclick="viewOrders()">
                    <i class="fas fa-box"></i> Your Orders
                </button>
                <button class="user-menu-btn" onclick="viewWishlist()">
                    <i class="fas fa-heart"></i> Wishlist
                </button>
                <button class="user-menu-btn" onclick="viewAccount()">
                    <i class="fas fa-user"></i> Account Settings
                </button>
                <button class="user-menu-btn logout-btn" onclick="logout()">
                    <i class="fas fa-sign-out-alt"></i> Sign Out
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function viewOrders() {
    const orders = JSON.parse(localStorage.getItem('shopVistaOrders') || '[]');
    if (orders.length === 0) {
        showNotification('No orders found', 'info');
    } else {
        showNotification(`You have ${orders.length} order(s)`, 'info');
    }
}

function viewWishlist() {
    showNotification('Wishlist feature coming soon!', 'info');
}

function viewAccount() {
    showNotification('Account settings coming soon!', 'info');
}

function logout() {
    localStorage.removeItem('shopVistaUser');
    const accountSection = document.querySelector('.account-section .nav-link');
    if (accountSection) {
        accountSection.innerHTML = `
            <span class="nav-text">Hello, Sign in</span>
            <span class="nav-subtext">Account & Lists</span>
        `;
    }
    showNotification('Signed out successfully', 'success');
}

// Wishlist functionality
function initWishlist() {
    // Add wishlist buttons to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const productImage = card.querySelector('.product-image');
        if (productImage) {
            const wishlistBtn = document.createElement('button');
            wishlistBtn.className = 'wishlist-btn';
            wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
            wishlistBtn.setAttribute('aria-label', 'Add to wishlist');
            
            productImage.appendChild(wishlistBtn);
            
            wishlistBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = card.getAttribute('data-product-id');
                const productTitle = card.querySelector('.product-title').textContent;
                const productPrice = parseFloat(card.getAttribute('data-price'));
                const productImage = card.querySelector('img').src;
                
                toggleWishlist(productId, productTitle, productPrice, productImage, wishlistBtn);
            });
        }
    });
}

function toggleWishlist(productId, title, price, image, button) {
    let wishlist = JSON.parse(localStorage.getItem('shopVistaWishlist') || '[]');
    const existingItem = wishlist.find(item => item.id === productId);
    
    if (existingItem) {
        // Remove from wishlist
        wishlist = wishlist.filter(item => item.id !== productId);
        button.innerHTML = '<i class="far fa-heart"></i>';
        button.classList.remove('active');
        showNotification('Removed from wishlist', 'info');
    } else {
        // Add to wishlist
        wishlist.push({
            id: productId,
            title: title,
            price: price,
            image: image,
            dateAdded: new Date().toISOString()
        });
        button.innerHTML = '<i class="fas fa-heart"></i>';
        button.classList.add('active');
        showNotification('Added to wishlist', 'success');
    }
    
    localStorage.setItem('shopVistaWishlist', JSON.stringify(wishlist));
}

function viewWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('shopVistaWishlist') || '[]');
    
    if (wishlist.length === 0) {
        showNotification('Your wishlist is empty', 'info');
        return;
    }
    
    // Create wishlist modal
    const modal = document.createElement('div');
    modal.className = 'wishlist-modal';
    modal.innerHTML = `
        <div class="wishlist-modal-content">
            <div class="wishlist-header">
                <h2>Your Wishlist</h2>
                <button class="close-wishlist" aria-label="Close wishlist">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="wishlist-body">
                <div class="wishlist-items">
                    ${wishlist.map(item => `
                        <div class="wishlist-item">
                            <img src="${item.image}" alt="${item.title}">
                            <div class="wishlist-item-info">
                                <h4>${item.title}</h4>
                                <p class="wishlist-price">$${item.price.toFixed(2)}</p>
                                <button class="add-to-cart-from-wishlist" data-product-id="${item.id}">
                                    <i class="fas fa-shopping-cart"></i> Add to Cart
                                </button>
                            </div>
                            <button class="remove-from-wishlist" data-product-id="${item.id}">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelector('.close-wishlist').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelectorAll('.remove-from-wishlist').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = btn.getAttribute('data-product-id');
            removeFromWishlist(productId);
            modal.querySelector(`[data-product-id="${productId}"]`).closest('.wishlist-item').remove();
        });
    });
    
    modal.querySelectorAll('.add-to-cart-from-wishlist').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = btn.getAttribute('data-product-id');
            const item = wishlist.find(item => item.id === productId);
            if (item) {
                addToCart(productId, item.title, item.price);
                showNotification('Added to cart from wishlist', 'success');
            }
        });
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function removeFromWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('shopVistaWishlist') || '[]');
    wishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem('shopVistaWishlist', JSON.stringify(wishlist));
    showNotification('Removed from wishlist', 'info');
}

// Category filtering functionality
function filterByCategory(category) {
    const productCards = document.querySelectorAll('.product-card');
    const resultsCount = document.getElementById('resultsCount');
    const categoryFilter = document.getElementById('categoryFilter');
    
    let visibleCount = 0;
    
    productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        // Map category names to match product data attributes
        const categoryMapping = {
            'laptops': 'electronics',
            'smartphones': 'electronics', 
            'audio': 'electronics',
            'tv': 'electronics',
            'cameras': 'electronics',
            'gaming': 'electronics',
            'fiction': 'books',
            'education': 'books',
            'business': 'books',
            'health': 'books',
            'children': 'books',
            'history': 'books',
            'mens': 'fashion',
            'womens': 'fashion',
            'kids': 'fashion',
            'athletic': 'fashion',
            'shoes': 'fashion',
            'accessories': 'fashion',
            'furniture': 'home-garden',
            'decor': 'home-garden',
            'garden': 'home-garden',
            'kitchen': 'home-garden',
            'bedding': 'home-garden',
            'tools': 'home-garden'
        };
        
        const mappedCategory = categoryMapping[category] || category;
        
        if (cardCategory === mappedCategory) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update results count
    if (resultsCount) {
        resultsCount.textContent = `${visibleCount} product${visibleCount !== 1 ? 's' : ''} found`;
    }
    
    // Update category filter dropdown if it exists
    if (categoryFilter) {
        const categoryMapping = {
            'laptops': 'electronics',
            'smartphones': 'electronics', 
            'audio': 'electronics',
            'tv': 'electronics',
            'cameras': 'electronics',
            'gaming': 'electronics',
            'fiction': 'books',
            'education': 'books',
            'business': 'books',
            'health': 'books',
            'children': 'books',
            'history': 'books',
            'mens': 'fashion',
            'womens': 'fashion',
            'kids': 'fashion',
            'athletic': 'fashion',
            'shoes': 'fashion',
            'accessories': 'fashion',
            'furniture': 'home-garden',
            'decor': 'home-garden',
            'garden': 'home-garden',
            'kitchen': 'home-garden',
            'bedding': 'home-garden',
            'tools': 'home-garden'
        };
        
        const mappedCategory = categoryMapping[category] || category;
        categoryFilter.value = mappedCategory;
    }
    
    // Show notification
    const categoryNames = {
        'laptops': 'Laptops & Computers',
        'smartphones': 'Smartphones',
        'audio': 'Audio & Headphones',
        'tv': 'TV & Home Theater',
        'cameras': 'Cameras & Photography',
        'gaming': 'Gaming',
        'fiction': 'Fiction Books',
        'education': 'Education Books',
        'business': 'Business Books',
        'health': 'Health & Wellness',
        'children': 'Children\'s Books',
        'history': 'History & Biography',
        'mens': 'Men\'s Clothing',
        'womens': 'Women\'s Clothing',
        'kids': 'Kids\' Clothing',
        'athletic': 'Athletic Wear',
        'shoes': 'Shoes',
        'accessories': 'Accessories',
        'furniture': 'Furniture',
        'decor': 'Home Décor',
        'garden': 'Garden & Outdoor',
        'kitchen': 'Kitchen & Dining',
        'bedding': 'Bedding & Bath',
        'tools': 'Tools & Hardware'
    };
    
    const categoryName = categoryNames[category] || category;
    showNotification(`Filtering by ${categoryName}`, 'info');
    
    // Scroll to products section
    const productsSection = document.querySelector('.products-section');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}
