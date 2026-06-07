document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.tv-track');
    const slides = document.querySelectorAll('.tv-slide');
    const prevBtn = document.querySelector('.tv-prev');
    const nextBtn = document.querySelector('.tv-next');
    const dots = document.querySelectorAll('.tv-dot');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let isTransitioning = false;

    // Detectar si es móvil
    function isMobile() {
        return window.innerWidth < 1024;
    }

    // Actualizar vista
    function updateView() {
        if (isMobile()) {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        } else {
            track.style.transform = 'translateX(0)';
            currentIndex = 0;
        }

        // Actualizar dots
        dots.forEach((dot, idx) => {
            dot.classList.toggle('tv-dot-active', idx === currentIndex);
        });
    }

    // Navegar a slide específico
    function goToSlide(index) {
        if (!isMobile() || isTransitioning) return;

        isTransitioning = true;
        const total = slides.length;

        if (index < 0) {
            currentIndex = total - 1;
        } else if (index >= total) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        updateView();

        setTimeout(() => {
            isTransitioning = false;
        }, 600);
    }

    // Eventos de navegación
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
    }

    // Eventos de dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const idx = parseInt(dot.dataset.index, 10);
            goToSlide(idx);
        });
    });

    // Asegurar autoplay de videos
    slides.forEach(slide => {
        const video = slide.querySelector('video');
        if (video) {
            video.muted = true;
            video.loop = true;
            video.autoplay = true;
            video.playsInline = true;

            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Ignorar errores de autoplay
                });
            }
        }
    });

    // Soporte para gestos táctiles (swipe)
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        if (!isMobile()) return;
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', (e) => {
        if (!isMobile()) return;
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe izquierda - siguiente
                goToSlide(currentIndex + 1);
            } else {
                // Swipe derecha - anterior
                goToSlide(currentIndex - 1);
            }
        }
    }

    // Inicializar y actualizar en resize
    updateView();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateView();
        }, 250);
    });
});


// ../static/js/catalogo.js
document.addEventListener('DOMContentLoaded', () => {
    const frame = document.getElementById('catalogoFrame');
    const btnPrev = document.querySelector('.catalogo-nav-prev');
    const btnNext = document.querySelector('.catalogo-nav-next');
    const pageLabel = document.getElementById('catalogoPageLabel');

    // RUTA BASE DEL CATÁLOGO
    const baseSrc = '../static/img/turismo/catalogo.pdf';

    // AJUSTA ESTE VALOR AL NÚMERO REAL DE PÁGINAS
    const maxPages = 10; // <-- cámbialo según tu PDF

    let currentPage = 1;

    function updateViewer() {
        // Intentamos que se vea cada página "completa"
        const params =
            '#page=' + currentPage +
            '&toolbar=0' +
            '&navpanes=0' +
            '&scrollbar=0' +
            '&zoom=page-fit';

        frame.src = baseSrc + params;

        pageLabel.textContent = `Página ${currentPage} de ${maxPages}`;

        btnPrev.disabled = currentPage === 1;
        btnNext.disabled = currentPage === maxPages;
    }

    btnPrev.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateViewer();
        }
    });

    btnNext.addEventListener('click', () => {
        if (currentPage < maxPages) {
            currentPage++;
            updateViewer();
        }
    });

    // Inicializa en la página 1
    updateViewer();
});





