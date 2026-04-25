document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (burgerBtn && navMenu) {
        burgerBtn.onclick = function() {
            burgerBtn.classList.toggle('active');
            navMenu.classList.toggle('open');
        };
        
        const links = navMenu.querySelectorAll('a');
        links.forEach(function(link) {
            link.onclick = function() {
                burgerBtn.classList.remove('active');
                navMenu.classList.remove('open');
            };
        });
    }
});