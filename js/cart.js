const categoryDisplayNames = {
    'AUDIO': 'Audio',
    'PHOTOGRAPHY': 'Photography',
    'COMPUTERS': 'Computers',
    'WEARABLES': 'Wearables',
    'TABLETS': 'Tablets'
};

let appliedPromoCode = null;

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);  
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();  
    updateCartCount();  
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        let newQuantity = cart[index].quantity + change;
        
        if (newQuantity < 1) {
            return;  
        }
        
        cart[index].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        updateCartCount();
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    
    if (cartCountElement) {
        if (totalItems > 0) {
            const displayText = totalItems > 99 ? '99+' : totalItems;
            cartCountElement.textContent = displayText;
            cartCountElement.classList.add('active');
        } else {
            cartCountElement.classList.remove('active');
        }
    }
}

function applyPromo() {
    const promoInput = document.getElementById('promoInput');
    const code = promoInput.value.trim().toUpperCase();
    const errorElement = document.getElementById('promoError');
    
    if (code === 'SAVE10') {
        appliedPromoCode = 'SAVE10';
        displayCart();  
    } else if (code !== '') {
        if (errorElement) {
            const hint = document.querySelector('.promo-hint');
            if (hint) hint.style.display = 'none';
            
            errorElement.textContent = 'Invalid code. Try "SAVE10"';
            errorElement.style.display = 'block';
        }
    }
}


function displayCart() {
    const cartContainer = document.getElementById('cart-container');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let promoCode = appliedPromoCode; 
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <main class = "empty-cart">
                <div class = "empty-cart-top">
                    <h1>Your Cart is Empty</h1>
                    <p>Add some amazing products to get started!</p>
                </div>
                <div class = "empty-cart-btn">
                    <button class = "button" onclick = "location.href = 'main.html'">
                        Continue Shopping
                    </button>
                </div>
            </main>
        `;
        updateCartCount();
        return;

    } else if (cart.length > 0) {

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const html = `
            <main class = "cart-with-product">
                <h2>Shopping Cart</h2>
                <div class = "cart-two-columns">
                    <div class = "main-cart-all-products">
                        <div class = "main-cart-header"></div>
                        ${cart.map((item, index) => {
                            const fullProduct = products.find(p => p.id === item.id);
                            const categoryName = categoryDisplayNames[fullProduct?.categories] || fullProduct?.categories || '';
                            return `
                            <div class = "main-cart-item">
                                <div class = "cart-item-column-one">
                                    <img src = "${item.image}" class = "main-cart-item-img">
                                </div>

                                <div class = "cart-item-two">
                                    <div class = "cart-item-column-two">
                                        <div class = "name-and-category">
                                            <a href = "card.html?id=${item.id}" class = "cart-product-name-link">
                                                <h6>${item.name}</h6>
                                            </a>
                                            <p>${categoryName}</p>
                                        </div>

                                        <div class = "main-cart-item-quantity">
                                            <button class = "cart-qty-btn" onclick = "updateQuantity(${index}, -1)" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                                            <span>${item.quantity}</span>
                                            <button class = "cart-qty-btn" onclick = "updateQuantity(${index}, 1)">+</button>
                                        </div>
                                    </div>

                                    <div class = "cart-item-column-three">
                                        <img src = "images/delete.png" class = "cart-item-delete" onclick = "removeFromCart(${index})">
                                        <div class = "cart-item-product-price">
                                            <div class = "cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                                            <div class = "main-cart-item-price">$${item.price} each</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `}).join('')}
                    </div>

                    <div class = "summary-information">
                        <div class = "order-summary">
                            <h2>Order Summary</h2>

                            <div class = "summ">
                                <div class = "subtotal">
                                    <p>Subtotal</p>
                                    <span>$${total.toFixed(2)}</span>
                                </div>

                                ${promoCode === 'SAVE10' ? `
                                    <div class = "sale-ten">
                                        <p class = "succ-promo">Discount (SAVE10)</p>
                                        <span>-$${(total * 0.1).toFixed(2)}</span>
                                    </div>
                                ` : ''}

                                ${promoCode === 'SAVE10' ? `
                                    <div class = "tax">
                                        <p>Tax (8%)</p>
                                        <span>$${((total - (total * 0.1)) * 0.08).toFixed(2)}</span>
                                    </div>
                                ` : `
                                    <div class = "tax">
                                        <p>Tax (8%)</p>
                                        <span>$${(total * 0.08).toFixed(2)}</span>
                                    </div>
                                `}
                            </div>

                            ${promoCode === 'SAVE10' ? `
                                <div class = "all-total">
                                    <h6>Total</h6>
                                    <span>$${(total - (total * 0.1) + ((total - (total * 0.1)) * 0.08)).toFixed(2)}</span>
                                </div>
                            ` : `
                                <div class = "all-total">
                                    <h6>Total</h6>
                                    <span>$${(total + (total * 0.08)).toFixed(2)}</span>
                                </div>
                            `}

                            <div class = "promo-code">
                                <h6>Promo Code</h6>
                                <div class = "promo-input">
                                    <input type = "text" placeholder = "Enter code" id = "promoInput" ${promoCode === 'SAVE10' ? 'disabled' : ''}>
                                    <button class = "apply-btn" onclick = "applyPromo()" ${promoCode === 'SAVE10' ? 'disabled' : ''}>Apply</button>
                                </div>
                                ${promoCode === 'SAVE10' ? `
                                    <p class = "promo-success-message">Promo code applied successfully!</p>
                                ` : `
                                    <p class = "promo-hint">Try code "SAVE10" for 10% off</p>
                                `}
                                <p id = "promoError" class = "promo-error"></p>
                            </div>

                            <div class = "proceed-btn">
                                <button class = "proceed-button" onclick = "checkout()">Proceed to Checkout</button>
                            </div>
                        </div>

                        <div class = "shipping-information">
                            <div class = "shipping-information-top">
                                <img src = "images/car.png" alt = "Delivery" class = "delivery">
                                <h3>Shipping Information</h3>
                            </div>

                            <div class = "shipping-information-middle">
                                <img src = "images/geo.png" alt = "GeoShop" class = "geo-shop">

                                <div class = "address-shop">
                                    <h6>Delivery Address</h6>
                                    <p>123 Tech Street</p>
                                    <p>San Francisco, CA 94105</p>
                                </div>
                            </div>

                            <div class = "shipping-information-buttom">
                                <h5>Estimated Delivery</h5>
                                <p>3-5 business days</p>
                                <h6>Free shipping on orders over $50</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        `;

        cartContainer.innerHTML = html;
        updateCartCount();
    }
}

displayCart();

