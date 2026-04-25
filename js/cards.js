function starRating(rating) {
    const percent = (rating / 5) * 100;
    return `
        <div class = "stars-container">
            <div class = "stars-old">★★★★★</div>
            <div class = "stars-new" style = "width: ${percent}%">★★★★★</div>
        </div>
    `;
}

function displayDeals() {
    const dealsGrid = document.getElementById("deals-cards");

    if(!dealsGrid) {
        console.error("Элементы не найдены");
        return;
    }

    const dealsProducts = products.filter(product => product.oldPrice);

    if(dealsProducts.length === 0) {
        dealsGrid.innerHTML = "<p>Нет товаров со скидкой</p>";
        return;
    }

    let html = "";

    dealsProducts.forEach(product => {
        const stars = starRating(product.rating);

        const discountPercent = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

        html += `
            <a href ="card.html?id=${product.id}" class = "deal-card-link">
                <div class = "deal-card">
                    <div class = "deal-img">
                        <img src = "${product.image}" alt = "${product.name}" class = "deal-image">
                    </div>

                    <h1>${product.name}</h1>

                    <div class = "deal-stars-rating">
                        <div class = "deal-stars">${stars}</div>
                        <div class = "deal-rating">(${product.rating})</div>
                    </div>

                    <div class = "deal-price-categories">
                        <div class = "deal-price">$${product.price}</div>
                        <div class = "deal-categories">${product.categories}</div>
                    </div>
                    
                    <div class = "deal-sale">Save ${discountPercent}%</div>
                </div>
            </a>
        `;
    });

    dealsGrid.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", displayDeals);

