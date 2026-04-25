const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        searchInput.classList.toggle('active');
                
        if (searchInput.classList.contains('active')) {
            searchInput.focus();
        }
    });


    document.addEventListener('click', function(e) {
        if (!searchBtn.contains(e.target) && !searchInput.contains(e.target)) {
            searchInput.classList.remove('active');
        }
    });
}