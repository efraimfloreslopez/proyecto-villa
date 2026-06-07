cat > README.md << 'EOF'
# Portal Institucional Municipal

Rediseño de portal gubernamental municipal — **proyecto de demostración para portafolio profesional**.

> **Aviso:** Este repositorio contiene únicamente código frontend estático con datos ficticios. No está conectado a ningún sistema en producción. Los nombres, contactos y documentos son de demostración.

## Características
- **Diseño responsivo** — Adaptado a móvil, tablet y escritorio
- **Accesibilidad WCAG** — Contraste, navegación por teclado y estructura semántica
- **Usabilidad** — Menú claro, directorio municipal, transparencia y trámites
- **Panel administrativo demo** — CMS simulado con gestión de contenidos (sin persistencia real)
- **Editor de páginas demo** — Interfaz tipo VS Code con Monaco Editor (solo simulación)

## Stack tecnológico

| Capa          | Tecnología                          |
|---------------|-------------------------------------|
| Marcado       | HTML5 semántico                     |
| Estilos       | CSS3 (variables, Grid, Flexbox)     |
| Interactividad| JavaScript vanilla (ES6+)           |
| Demo API      | `mock-api.js` (datos en memoria)    |
| Auth demo     | `auth-demo.js` (localStorage)       |

## Estructura del proyecto
template/          # Páginas HTML públicas y panel admin
├── index.html
├── login.html
├── gestion-*.html
└── secondary_views/
static/
├── css/
├── js/
└── img/
scripts/           # Utilidades de desarrollo

## Cómo ejecutar localmente

### Opción 1 — Live Server (VS Code)
- Click derecho en `template/index.html` → **Open with Live Server**

### Opción 2 — Node.js
```bash
npx serve .
### Opción 3 — Python
Bashpython -m http.server 8080
Abre: http://localhost:8080/template/index.html
Panel administrativo (demo)

URL: template/login.html
Email: admin@municipio.demo
Contraseña: demo
