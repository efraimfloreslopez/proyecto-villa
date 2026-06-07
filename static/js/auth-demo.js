// Auth Demo — Autenticación simulada para portafolio
// [PRIVACIDAD] Sin validación en servidor; solo localStorage en el navegador.
const AUTH_CONFIG = {
    user: "admin@municipio.demo",
    pass: "demo",
    sessionKey: "portfolio_session"
};

const Auth = {
    login: (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === AUTH_CONFIG.user && password === AUTH_CONFIG.pass) {
                    localStorage.setItem(AUTH_CONFIG.sessionKey, JSON.stringify({
                        email: email,
                        loginTime: new Date().getTime(),
                        role: "admin"
                    }));
                    resolve({ success: true });
                } else {
                    reject({ success: false, message: "Credenciales inválidas para la demo." });
                }
            }, 800);
        });
    },

    logout: () => {
        localStorage.removeItem(AUTH_CONFIG.sessionKey);
        window.location.href = "login.html";
    },

    isLoggedIn: () => {
        const session = localStorage.getItem(AUTH_CONFIG.sessionKey);
        if (!session) return false;
        const data = JSON.parse(session);
        const now = new Date().getTime();
        if (now - data.loginTime > 2 * 60 * 60 * 1000) {
            Auth.logout();
            return false;
        }
        return true;
    },

    protectPage: () => {
        if (!Auth.isLoggedIn()) {
            window.location.href = "login.html";
        }
    },

    getUserEmail: () => {
        const session = localStorage.getItem(AUTH_CONFIG.sessionKey);
        if (!session) return "admin@municipio.demo";
        try { return JSON.parse(session).email || "admin@municipio.demo"; }
        catch { return "admin@municipio.demo"; }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('gestion-') || path.includes('dashboard') || path.includes('editor')) {
        Auth.protectPage();
    }
});
