const filterToggleBtn = document.getElementById('filterToggleBtn');
const filtersPanel = document.querySelector('.filters-price-rating');
const closeFiltersBtn = document.getElementById('closeFiltersBtn');
let overlay = null;

function createOverlay() {
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'filter-overlay';
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', () => {
            filtersPanel.classList.remove('open');
            overlay.classList.remove('open');
        });
    }
}

function openFilters() {
    createOverlay();
    filtersPanel.classList.add('open');
    overlay.classList.add('open');
}

function closeFilters() {
    filtersPanel.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
}

if (filterToggleBtn && filtersPanel) {
    filterToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (filtersPanel.classList.contains('open')) {
            closeFilters();
        } else {
            openFilters();
        }
    });
}

if (closeFiltersBtn && filtersPanel) {
    closeFiltersBtn.addEventListener('click', () => {
        closeFilters();
    });
}