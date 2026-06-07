// ===================================
// JAVASCRIPT PRINCIPAL
// ===================================

// Funci�n para manejar el men� responsive
document.addEventListener("DOMContentLoaded", () => {
  console.log("Portal del Ayuntamiento de Portal Institucional Municipal cargado correctamente")

  // Agregar clase active al link actual
  const currentLocation = window.location.pathname
  const menuItems = document.querySelectorAll(".nav-menu a")

  menuItems.forEach((item) => {
    if (item.getAttribute("href") === currentLocation.split("/").pop()) {
      item.classList.add("active")
    }
  })
})

// Funci�n para smooth scroll
function smoothScroll(target) {
  const element = document.querySelector(target)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Event listeners para links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = this.getAttribute("href")
    smoothScroll(target)
  })
})





