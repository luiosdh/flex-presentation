document.addEventListener('DOMContentLoaded', function () {
    const toggleImg = document.querySelector('#toggleImg');
    const img = document.querySelector('#img');
    if (toggleImg) {
        toggleImg.addEventListener('click', () => {
            if (img.classList.contains('collapsed')) {
                img.classList.remove('collapsed');
                toggleImg.innerHTML = 'Cerrar imagen';
            } else {
                img.classList.add('collapsed');
                toggleImg.innerHTML = 'Abrir imagen';
            }
        });
    }
});
