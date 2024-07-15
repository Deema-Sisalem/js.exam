const toggleBtn = document.getElementById('toggle-btn');
const sideNav = document.getElementById('side-nav');
const content = document.getElementById('content');

toggleBtn.addEventListener('click', () => {
    sideNav.classList.toggle('active');
    toggleBtn.classList.toggle('active'); // Add active class to toggle button

    if (sideNav.classList.contains('active')) {
        content.style.marginLeft = '250px'; // Shift content to the right
        toggleBtn.innerHTML = '<i class="fas fa-times"></i>'; // Change to X icon
    } else {
        content.style.marginLeft = '50px'; // Reset content margin
        toggleBtn.innerHTML = '<i class="fas fa-list"></i>'; // Change to list icon
    }
});
