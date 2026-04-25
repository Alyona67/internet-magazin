function getCategories() {
    const categories = [...new Set(products.map(p => p.categories))];
    return categories;
}

function getCategoryImage(category) {
    const categoryProducts = products.filter(p => p.categories === category);
    const sortedProducts = [...categoryProducts].sort((a, b) => a.id - b.id);
    return sortedProducts[0].image;
}

function getCategoryCount(category) {
    return products.filter(p => p.categories === category).length;
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

const categoryDisplayNames = {
    'AUDIO': 'Audio',
    'COMPUTERS': 'Computers',
    'WEARABLES': 'Wearables',
    'PHOTOGRAPHY': 'Photography',
    'TABLETS': 'Tablets'
};

function displayCategories() {
    const categoryCard = document.getElementById('categories-cards');
    const categories = getCategories();

    let html = '';

    categories.forEach(category => {
        const categoryImage = getCategoryImage(category);
        const productCount = getCategoryCount(category);
        const categoryName = categoryDisplayNames[category] || category;

        html += `
            <div class = "category-card" onclick = "goToCategory('${category}')">
                <div class = "category-image">
                    <img src = "${categoryImage}" alt = "${categoryName}" class = "category-img">
                </div>

                <div class = "category-card-info">
                    <h3>${categoryName}</h3>
                    <p>${productCount} product${productCount !== 1 ? 's' : ''}</p>
                </div>
            </div>
        `
    })

    categoryCard.innerHTML = html;
}

function goToCategory(category) {
    window.location.href = `category-products.html?category=${encodeURIComponent(category)}`;
}

updateCartCount();

document.addEventListener('DOMContentLoaded', displayCategories);