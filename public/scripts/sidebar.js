document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const burgerSidebar = document.querySelector('.burger-sidebar');
    burgerSidebar.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar-open');
    });
});
