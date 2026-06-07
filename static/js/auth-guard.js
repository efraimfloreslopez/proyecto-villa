/**
 * [PRIVACIDAD] Guard de autenticación unificado — delega en auth-demo.js
 */
(function () {
    'use strict';

    const publicPages = ['login.html'];
    const currentPath = window.location.pathname.toLowerCase();
    const isPublic = publicPages.some(page => currentPath.includes(page));
    const isProtected = currentPath.includes('gestion-') ||
        currentPath.includes('dashboard') ||
        currentPath.includes('editor-paginas');

    if (!isPublic && isProtected && window.Auth && !Auth.isLoggedIn()) {
        document.documentElement.style.display = 'none';
        const loginPath = currentPath.includes('secondary_views') ? '../login.html' : 'login.html';
        window.location.replace(loginPath);
    }
})();
