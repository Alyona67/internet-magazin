function starRating(rating) {
    const percent = (rating / 5) * 100;
    return `
        <div class = "stars-container">
            <div class = "stars-old">★★★★★</div>
            <div class = "stars-new" style = "width: ${percent}%">★★★★★</div>
        </div>
    `;
}

function renderProductCard(product) {
    const stars = starRating(product.rating);
    
    return `
        <div class = "filter-product-card">
            <a href="card.html?id=${product.id}" class = "filter-product-card-link">
                <div class = "filter-product-img">
                    <img src = "${product.image}" alt = "${product.name}" class = "filter-product-image">
                </div>

                <h3>${product.name}</h3>

                <div class = "filter-product-rating">
                    ${stars}
                    <p>(${product.rating})</p>
                </div>

                <div class = "filter-product-price-category">
                    <p class = "filter-new-price">$${product.price}</p>
                    <p class = "filter-product-category">${product.categories}</p>
                </div>
            </a>
        </div>
    `;
}

let currentProducts = [...products];

function displayProducts(productsToShow) {
    const allProduct = document.getElementById('filters-all-products');
    const productCountElement = document.getElementById('product-count');
    
    if (productCountElement) {
        productCountElement.textContent = `${productsToShow.length} products`;
    }

    if (productsToShow.length === 0) {
        allProduct.innerHTML = `
            <div class = "no-products-found">
                <h3>No products found</h3>
                <p>Try adjusting your filters</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    for (let i = 0; i < productsToShow.length; i++) {
        html += renderProductCard(productsToShow[i]);
    }
    
    allProduct.innerHTML = html;
}


function filterAndSortProducts() {
    let filtered = [...products];
    
    const selectedRatings = Array.from(document.querySelectorAll('input[name="rating"]:checked')).map(cb => parseInt(cb.value));
    if (selectedRatings.length > 0) {
        filtered = filtered.filter(product => {
            return selectedRatings.some(rating => product.rating >= rating);
        });
    }
    
    const minVal = parseInt(sliderMin.value);
    const maxVal = parseInt(sliderMax.value);
    filtered = filtered.filter(product => product.price >= minVal && product.price <= maxVal);
    
    const sortValue = document.getElementById('panel').value;
    switch(sortValue) {
        case 'name-a-z':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-z-a':
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price-low-high':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high-low':
            filtered.sort((a, b) => b.price - a.price);
            break;
    }
    
    currentProducts = filtered;
    displayProducts(currentProducts);
}


function updatePriceRange() {
    let minValue = parseInt(sliderMin.value);
    let maxValue = parseInt(sliderMax.value);
    
    if (minValue > maxValue) {
        sliderMin.value = maxValue;
        sliderMax.value = minValue;
        minPrice.textContent = maxValue;
        maxPrice.textContent = minValue;
    } else {
        minPrice.textContent = minValue;
        maxPrice.textContent = maxValue;
    }
    
    filterAndSortProducts();
}


const sliderMin = document.getElementById('sliderMin');
const sliderMax = document.getElementById('sliderMax');
const minPrice = document.getElementById('minPrice');
const maxPrice = document.getElementById('maxPrice');
const sliderTrack = document.querySelector('.slider-track');

function updateSliderColor(minVal, maxVal) {
    if (!sliderTrack) return;
    
    const minPercent = (minVal / 3000) * 100;
    const maxPercent = (maxVal / 3000) * 100;
    
    sliderTrack.style.background = `linear-gradient(to right, 
        #f9f9f9 0%, 
        #f9f9f9 ${minPercent}%, 
        #252525 ${minPercent}%, 
        #252525 ${maxPercent}%, 
        #f9f9f9 ${maxPercent}%, 
        #f9f9f9 100%)`;
}


function updatePriceRange() {
    let minValue = parseInt(sliderMin.value);
    let maxValue = parseInt(sliderMax.value);
    
    if (minValue > maxValue) {
        sliderMin.value = maxValue;
        sliderMax.value = minValue;
        minPrice.textContent = maxValue;
        maxPrice.textContent = minValue;
        minValue = maxValue;
        maxValue = minValue;
    } else {
        minPrice.textContent = minValue;
        maxPrice.textContent = maxValue;
    }
    
    updateSliderColor(minValue, maxValue);
    filterAndSortProducts();  
}


function initSlider() {
    updateSliderColor(0, 3000);
}

sliderMin.addEventListener('input', updatePriceRange);
sliderMax.addEventListener('input', updatePriceRange);

document.addEventListener('DOMContentLoaded', function() {
    initSlider();
});


function handleTrackClick(event) {
    const track = document.querySelector('.slider-track');
    const priceSlider = document.querySelector('.price-slider');
    if (!track || !priceSlider) return;
    
    const rect = track.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const trackWidth = rect.width;
    
    const clickValue = Math.round((clickX / trackWidth) * 3000);
    
    let minVal = parseInt(sliderMin.value);
    let maxVal = parseInt(sliderMax.value);
    
    const distToMin = Math.abs(clickValue - minVal);
    const distToMax = Math.abs(clickValue - maxVal);
    
    if (distToMin <= distToMax) {
        if (clickValue < maxVal) {
            sliderMin.value = clickValue;
        } else {
            sliderMin.value = maxVal - 1;
        }
    } 

    else {
        if (clickValue > minVal) {
            sliderMax.value = clickValue;
        } else {
            sliderMax.value = minVal + 1;
        }
    }
    
    minPrice.textContent = sliderMin.value;
    maxPrice.textContent = sliderMax.value;
    
    updateSliderColor(parseInt(sliderMin.value), parseInt(sliderMax.value));
    
    filterAndSortProducts();
}

document.querySelector('.slider-track').addEventListener('click', handleTrackClick);


function clearFilters() {
    document.querySelectorAll('input[name="rating"]').forEach(cb => cb.checked = false);
    
    sliderMin.value = 0;
    sliderMax.value = 3000;
    minPrice.textContent = 0;
    maxPrice.textContent = 3000;

    updateSliderColor(0, 3000);
    filterAndSortProducts();
}


function init() {
    if (sliderMin) sliderMin.addEventListener('input', updatePriceRange);
    if (sliderMax) sliderMax.addEventListener('input', updatePriceRange);
    
    document.querySelectorAll('input[name="rating"]').forEach(cb => {
        cb.addEventListener('change', filterAndSortProducts);
    });
    
    const sortSelect = document.getElementById('panel');
    if (sortSelect) sortSelect.addEventListener('change', filterAndSortProducts);
    
    filterAndSortProducts();
}

document.addEventListener('DOMContentLoaded', init);