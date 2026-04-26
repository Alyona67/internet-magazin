const categoryDisplayNames = {
    'AUDIO': 'Audio',
    'COMPUTERS': 'Computers',
    'WEARABLES': 'Wearables',
    'PHOTOGRAPHY': 'Photography',
    'TABLETS': 'Tablets'
};

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');

function starRating(rating) {
    const percent = (rating / 5) * 100;
    return `
        <div class="stars-container">
            <div class="stars-old">★★★★★</div>
            <div class="stars-new" style="width: ${percent}%">★★★★★</div>
        </div>
    `;
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


function displayCategoryProducts() {
    const container = document.getElementById('common-category');

    if (!category) {
        window.location.href = 'categories.html';
        return;
    }

    const categoryProducts = products.filter(p => p.categories === category);
    const displayName = categoryDisplayNames[category] || category;

    let html = '';

    html += `
        <div class = "category-name-top">
            <h3>Category: ${displayName}</h3>
            <p>Here you can find the products of your chosen category</p>
        </div>
    `;
    
    if (categoryProducts.length > 0) {
        html += `<div class = "similar-one-card">`;
        
        categoryProducts.forEach(product => {
            html += `
                <div class = "similar-card">
                    <a href = "card.html?id=${product.id}" class="similar-card-link">
                        <div class = "similar-card-product">
                            <div class = "similar-img">
                                <img src = "${product.image}" alt = "${product.name}" class = "similar-image">
                            </div>

                            <h4>${product.name}</h4>

                            <div class = "similar-stars-rating">
                                <div class = "similar-stars">${starRating(product.rating)}</div>
                                <div class = "similar-rating">(${product.rating})</div>
                            </div>

                            <div class = "similar-price-categories">
                                <div class = "similar-price">$${product.price}</div>
                                <div class = "similar-categories">${product.categories}</div>
                            </div>
                        </div>
                    </a>
                </div>
            `;
        });
        
        html += `</div>`; 
    } 

    container.innerHTML = html;
}

displayCategoryProducts();

updateCartCount();