// ../static/js/pcivil-rally.js
document.addEventListener('DOMContentLoaded', () => {
    const images = Array.from(document.querySelectorAll('.pcivil-rally-image'));
    const dots = Array.from(document.querySelectorAll('.pcivil-rally-dot'));
    const btnPrev = document.querySelector('.pcivil-rally-prev');
    const btnNext = document.querySelector('.pcivil-rally-next');

    if (!images.length || !btnPrev || !btnNext) return;

    let current = 0;

    function goTo(index) {
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;

        images.forEach(img => img.classList.remove('pcivil-rally-image-active'));
        dots.forEach(dot => dot.classList.remove('pcivil-rally-dot-active'));

        images[index].classList.add('pcivil-rally-image-active');
        if (dots[index]) dots[index].classList.add('pcivil-rally-dot-active');

        current = index;
    }

    btnPrev.addEventListener('click', () => {
        goTo(current - 1);
    });

    btnNext.addEventListener('click', () => {
        goTo(current + 1);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = Number(dot.dataset.index || 0);
            goTo(index);
        });
    });

    // Asegura que inicie en la primera imagen
    goTo(0);
});





