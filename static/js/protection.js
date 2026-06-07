/**
 * Protección básica para sitio de demostración (portafolio).
 * [NOTA] Disuasión visual únicamente — no sustituye seguridad real del servidor.
 */
(function () {
    'use strict';

    const isAdminPage = () => {
        const p = window.location.pathname.toLowerCase();
        return p.includes('gestion-') || p.includes('login') || p.includes('dashboard') || p.includes('editor');
    };

    if (isAdminPage()) return;

    document.addEventListener('contextmenu', (e) => e.preventDefault());

    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        if (key === 'f12') { e.preventDefault(); return; }
        if (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(key)) { e.preventDefault(); return; }
        if (e.ctrlKey && key === 'u') { e.preventDefault(); return; }
    });

    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') e.preventDefault();
    });
})();
