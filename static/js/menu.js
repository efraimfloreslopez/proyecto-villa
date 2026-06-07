let menuOpen = false

function toggleMenu() {
    const navMenu = document.getElementById("navMenu")
    const hamburger = document.querySelector(".hamburger")
    const body = document.body

    menuOpen = !menuOpen

    navMenu.classList.toggle("active")
    hamburger.classList.toggle("active")
    body.classList.toggle("menu-open")
}

function toggleSubmenu(event) {
    if (window.innerWidth <= 1280) {
        // Solo prevenir default en el enlace padre "ÁREAS", no en los hijos
        const clickedElement = event.target
        const isParentLink = clickedElement.closest('.has-submenu > a') ||
            clickedElement.classList.contains('has-submenu')

        if (isParentLink) {
            event.preventDefault()
            event.stopPropagation()

            const submenuItem = event.currentTarget
            const submenuId = submenuItem.getAttribute("data-submenu-id")

            // Cerrar otros submenús abiertos
            document.querySelectorAll(".has-submenu").forEach((item) => {
                const itemId = item.getAttribute("data-submenu-id")
                if (itemId !== submenuId && item.classList.contains("active")) {
                    item.classList.remove("active")
                }
            })

            submenuItem.classList.toggle("active")
        }
        // Si es un enlace hijo del submenú, dejarlo navegar normalmente
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const closeBtn = document.querySelector(".menu-close-btn")
    if (closeBtn) {
        closeBtn.addEventListener("click", (e) => {
            e.stopPropagation()
            toggleMenu()
        })
    }

    // Solo cerrar menú en enlaces que NO son del submenú
    document.querySelectorAll(".main-nav > ul > li > a").forEach((link) => {
        // Excluir el enlace de ÁREAS (que tiene submenú)
        const parentLi = link.parentElement
        if (!parentLi.classList.contains('has-submenu')) {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 768 && menuOpen) {
                    toggleMenu()
                }
            })
        }
    })

    // Para los enlaces del submenú, permitir navegación y luego cerrar
    document.querySelectorAll(".submenu a").forEach((link) => {
        link.addEventListener("click", (e) => {
            // No prevenir el default - permitir la navegación
            e.stopPropagation() // Evitar que se cierre el submenú antes de navegar

            // Pequeño delay para asegurar que la navegación inicie
            if (window.innerWidth <= 768 && menuOpen) {
                setTimeout(() => {
                    toggleMenu()
                }, 100)
            }
        })
    })
})

document.addEventListener("click", (event) => {
    const mainNav = document.querySelector(".main-nav")
    const body = document.body

    // Cerrar menú móvil si se hace clic fuera
    if (body.classList.contains("menu-open") && !mainNav.contains(event.target) && window.innerWidth <= 768) {
        toggleMenu()
    }

    // Cerrar submenú en tablet si se hace clic fuera
    if (window.innerWidth > 768 && window.innerWidth <= 1280) {
        const allSubmenus = document.querySelectorAll(".has-submenu")
        allSubmenus.forEach((submenu) => {
            if (!submenu.contains(event.target)) {
                submenu.classList.remove("active")
            }
        })
    }
})

window.addEventListener("resize", () => {
    const navMenu = document.getElementById("navMenu")
    const hamburger = document.querySelector(".hamburger")
    const body = document.body

    if (window.innerWidth > 768) {
        navMenu.classList.remove("active")
        hamburger.classList.remove("active")
        body.classList.remove("menu-open")
        menuOpen = false
    }

    if (window.innerWidth > 1280) {
        document.querySelectorAll(".has-submenu").forEach((item) => {
            item.classList.remove("active")
        })
    }
})




