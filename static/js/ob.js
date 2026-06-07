// =========================================================
// ============ JS OBRA PÚBLICA (MODALES GRANDES) =========
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
    // Abrir modales (mapas y fotos)
    const modalButtons = document.querySelectorAll(".obra-btn-map, .obra-btn-photos");

    modalButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const modalId = btn.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (!modal) return;

            modal.classList.add("is-open");
        });
    });

    // Cerrar modales (click en X o en fondo oscuro)
    const modals = document.querySelectorAll(".obra-modal");

    modals.forEach((modal) => {
        const closeBtn = modal.querySelector(".obra-modal-close");

        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.classList.remove("is-open");
            });
        }

        // Cerrar si se hace click en el fondo oscuro
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("is-open");
            }
        });
    });

    // -------- Inicializar carruseles de fotos --------

    const carousels = document.querySelectorAll(".obra-carousel-large");

    carousels.forEach((carousel) => {
        const images = carousel.querySelectorAll(".obra-carousel-image");
        if (!images.length) return;

        let currentIndex = 0;

        // Si ya hay una imagen con .is-active en HTML, úsala como inicio
        images.forEach((img, i) => {
            if (img.classList.contains("is-active")) {
                currentIndex = i;
            }
        });

        function showImage(index) {
            images.forEach((img, i) => {
                img.classList.toggle("is-active", i === index);
            });
        }

        showImage(currentIndex);

        const prevBtn = carousel.querySelector(".obra-carousel-prev");
        const nextBtn = carousel.querySelector(".obra-carousel-next");

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showImage(currentIndex);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % images.length;
                showImage(currentIndex);
            });
        }
    });
});


// =========================================================
// ========== SECCIÓN DOCUMENTOS OBRA (PDF) JS ============
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
    // Botones que abren los PDFs
    const pdfButtons = document.querySelectorAll(".obra-pdf-btn");

    pdfButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const modalId = btn.getAttribute("data-pdf-modal");
            const modal = document.getElementById(modalId);
            if (!modal) return;

            modal.classList.add("is-open");
        });
    });

    // Modales de PDFs
    const pdfModals = document.querySelectorAll(".obra-pdf-modal");

    pdfModals.forEach((modal) => {
        const closeBtn = modal.querySelector(".obra-pdf-close");

        // Cerrar con la X
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.classList.remove("is-open");
            });
        }

        // Cerrar clic en fondo oscuro
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("is-open");
            }
        });
    });
});

// =========================================================
// ====== FIN SECCIÓN DOCUMENTOS OBRA (PDF) JS ============
// =========================================================

// =========================================================
// ====== SECCIÓN PDFs / LICITACIONES PÚBLICAS JS =========
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
    // Botones que abren PDFs (obra y licitaciones)
    const pdfButtons = document.querySelectorAll(".obra-pdf-btn");

    pdfButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const modalId = btn.getAttribute("data-pdf-modal");
            const modal = document.getElementById(modalId);
            if (!modal) return;

            modal.classList.add("is-open");
        });
    });

    // Modales PDF
    const pdfModals = document.querySelectorAll(".obra-pdf-modal");

    pdfModals.forEach((modal) => {
        const closeBtn = modal.querySelector(".obra-pdf-close");

        // Cerrar con la X
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.classList.remove("is-open");
            });
        }

        // Cerrar clic en el fondo oscuro
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("is-open");
            }
        });
    });
});

// =========================================================
// === FIN SECCIÓN PDFs / LICITACIONES PÚBLICAS JS =========
// =========================================================





