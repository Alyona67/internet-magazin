const urlParams = new URLSearchParams(window.location.search);
const productID = parseInt(urlParams.get("id"));

const product = products.find(p => p.id === productID);

function starRating(rating) {
    const percent = (rating / 5) * 100;
    return `
        <div class = "stars-container">
            <div class = "stars-old">★★★★★</div>
            <div class = "stars-new" style = "width: ${percent}%">★★★★★</div>
        </div>
    `;
}

const categoryDisplayNames = {
    'AUDIO': 'Audio',
    'PHOTOGRAPHY': 'Photography',
    'COMPUTERS': 'Computers',
    'WEARABLES': 'Wearables',
    'TABLETS': 'Tablets'
};

function formatKeyName(key) {
    const abbreviations = ['ISO', 'RAM', 'GPS'];
    
    if (abbreviations.includes(key)) {
        return key;  
    }
    
    for (let abbr of abbreviations) {
        if (key.startsWith(abbr)) {
            const rest = key.slice(abbr.length);
            const formattedRest = rest.replace(/([A-Z])/g, ' $1').trim();
            return `${abbr} ${formattedRest.charAt(0).toUpperCase() + formattedRest.slice(1)}`;
        }
    }
    
    let formatted = key.replace(/([A-Z])/g, ' $1');
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    return formatted.trim();
}

function renderKeyHighlights(highlights) {  
    return `
        <div class = "key-highlights">
            <h3>Key Highlights</h3>
            <div class = "ul-highlights">
                <ul>
                    ${Object.entries(highlights).map(([key, value]) => `
                        <li><strong>${formatKeyName(key)}:</strong> ${value}</li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;
}

function listspecification(element) {
    const parent = element.parentElement;
    const content = parent.querySelector('.specification-content');
    const arrow = element.querySelector('.arrow');
    
    content.classList.toggle('active');
    arrow.classList.toggle('active');
}

const similarProduct = document.querySelector('.product-one-categorie')


const productDescription = document.getElementById("card-description");


function updateQuantity(change) {
    const quantityInput = document.getElementById('quantity-number');
    if (quantityInput) {
        let newValue = parseInt(quantityInput.value) + change;
        if (newValue < 1) newValue = 1;
        if (newValue > 1000) newValue = 1000;
        quantityInput.value = newValue;
    }
}

function addToCart() {
    const quantity = parseInt(document.getElementById('quantity-number').value);
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    showAddToCartAnimation();
    
    updateCartCount();
}

function showAddToCartAnimation() {
    const button = document.querySelector('.button-add-cart');
    if (button) {
        button.classList.add('added');
        setTimeout(() => {
            button.classList.remove('added');
        }, 500);
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    
    if (cartCountElement) {
        if (totalItems > 0) {
            
            const displayText = totalItems > 99 ? '99+' : totalItems;
            cartCountElement.textContent = displayText;
            cartCountElement.classList.add('active');
            cartCountElement.classList.add('bump');
            setTimeout(() => {
                cartCountElement.classList.remove('bump');
            }, 200);
        } else {
            cartCountElement.classList.remove('active');
        }
    }
}

window.updateQuantity = updateQuantity;
window.addToCart = addToCart;
window.updateCartCount = updateCartCount;

if (product) {
    const stars = starRating(product.rating);

    const similar = products.filter(p =>
        p.categories === product.categories && p.id != product.id
    );

    productDescription.innerHTML = `
        <div class = "product-card">
            <div class = "top-descriptions">
                <div class = "products-top"><a href = "main.html">Products</a></div>
                <div class = "vector-one"><p>❯</p></div>
                <div class = "categorie-top">${categoryDisplayNames[product.categories] || product.categories}</div>
                <div class = "vector-two"><p>❯</p></div>
                <div class = "name-top">${product.name}</div>
            </div>

            <div class = "bottom-descriptions">
                <div class = "product-img">
                    <div class = "gallery-img-big">
                        <button class = "gallery-last" onclick= "changeImage(-1)">❮</button>
                        <div class = "product-img-big">
                            <img src = "${product.image}" alt = "Big Photo" class = "product-img-biggest" id = "mainImage">
                        </div>
                        <button class = "gallery-next" onclick = "changeImage(1)">❯</button>
                    </div>

                    <div class = "product-img-little" id = "littleimg">
                        <img src = "${product.image}" class = "littleimg" data-index = "0">
                        <img src = "${product.image}" class = "littleimg" data-index = "1">
                        <img src = "${product.image}" class = "littleimg" data-index = "2">
                    </div>
                </div>

                <div class = "product-text-description">
                    <h1>${product.name}</h1>

                    <div class = "product-stars-rating">
                        <div class = "product-stars">${stars}</div>
                        <div class = "product-rating">(${product.rating})</div>
                    </div>

                    <p>${product.reviews}</p>

                    <div class = "product-price">
                        <h1>$${product.price}</h1>
                        <p>Free shipping</p>
                    </div>

                    ${renderKeyHighlights(product.KeyHighlights)}

                    <div class = "product-description">
                        <h1>Description</h1>
                        <div class = "product-full-description">${product.description}</div>
                    </div>

                    <div class = "product-quantity">
                        <h6>Quantity</h6>
                        <div class = "quantity">
                            <button class = "button-minus" onclick = "updateQuantity(-1)">-</button>
                            <input type = "number" id = "quantity-number" value = "1" min = "1" max = "1000" readonly>
                            <button class = "button-plus" onclick = "updateQuantity(1)">+</button>
                        </div>
                    </div>

                    <div class = "btn-add-cart">
                        <button class = "button-add-cart" onclick = "addToCart()">
                            <img src = "images/cart1.png" alt = "cart icon" class = "cart-icon">
                            Add to Cart
                        </button>
                    </div>

                    <div class = "specification-product">
                        <div class = "specification-top" onclick = "listspecification(this)">
                            <h3>Technical Specifications</h3>
                            <span id = "specification-arrow" class = "arrow">∨</span>
                        </div>

                        <div class = "specification-content">
                            ${Object.entries(product.specifications).map(([key, value]) => `
                                <div class = "specification-row">
                                    <span class = "specification-key">${formatKeyName(key)}</span>
                                    <span class = "specification-value">${value}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        ${similar.length > 0 ? `
            <div class = "product-one-categorie">
                <div class = "similar-name-top">
                    <h3>Related Products</h3>
                </div>
                <div class = "similar-one-card">
                    ${similar.slice(0, 5).map(item => `
                        <div class= "similar-card">
                            <a href ="card.html?id=${item.id}" class = "similar-card-link">
                                <div class = "similar-card-product">
                                    <div class = "similar-img">
                                        <img src = "${item.image}" alt = "${item.name}" class = "similar-image">
                                    </div>

                                    <h4>${item.name}</h4>

                                    <div class = "similar-stars-rating">
                                        <div class = "similar-stars">${starRating(item.rating)}</div>
                                        <div class = "similar-rating">(${item.rating})</div>
                                    </div>

                                    <div class = "similar-price-categories">
                                        <div class = "similar-price">$${item.price}</div>
                                        <div class = "similar-categories">${item.categories}</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
    `;

    const littleimg = [
        product.image,          
        product.image, 
        product.image  
    ];

    let currentIndex = 0;       

    const mainImage = document.getElementById('mainImage');
    const littleimgElements = document.querySelectorAll('.littleimg');

    function updateGallery() {
        mainImage.src = littleimg[currentIndex];
        
        littleimgElements.forEach((thumb, index) => {
            if (index === currentIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    function changeImage(direction) {
        currentIndex = (currentIndex + direction + littleimg.length) % littleimg.length;
        updateGallery();
    }

    window.changeImage = changeImage;

    function setActiveImage(index) {
        currentIndex = index;
        updateGallery();
    }

    littleimgElements.forEach((thumb, index) => {
        thumb.addEventListener('click', () => setActiveImage(index));
    });

    updateGallery();
}


updateCartCount();



