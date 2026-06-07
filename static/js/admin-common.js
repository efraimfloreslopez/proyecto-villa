/**
 * [PRIVACIDAD] Utilidades admin — sesión demo vía auth-demo.js
 */
if (window.Auth && !Auth.isLoggedIn()) {
    window.location.href = "login.html";
}

document.addEventListener('DOMContentLoaded', () => {
    const userEl = document.getElementById('userName');
    if (userEl && window.Auth) userEl.textContent = Auth.getUserEmail();

    document.querySelectorAll('[data-user-email]').forEach(el => {
        if (window.Auth) el.textContent = Auth.getUserEmail();
    });
});

const menuToggle = document.getElementById("menuToggle");
const closeSidebar = document.getElementById("closeSidebar");
const sidebar = document.querySelector(".sidebar");

if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => sidebar.classList.add("active"));
}
if (closeSidebar && sidebar) {
    closeSidebar.addEventListener("click", () => sidebar.classList.remove("active"));
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (window.Auth) Auth.logout();
    });
}

function logout() {
    if (window.Auth) Auth.logout();
}

window.addEventListener("click", (e) => {
    document.querySelectorAll(".modal").forEach((modal) => {
        if (e.target === modal) modal.style.display = "none";
    });
});
