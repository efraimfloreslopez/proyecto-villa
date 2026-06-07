# Portal Institucional Municipal

Rediseño de portal gubernamental municipal — **proyecto de demostración para portafolio profesional**.

> ?? **Aviso:** Este repositorio contiene únicamente código frontend estático con datos ficticios. No está conectado a ningún sistema en producción. Los nombres, contactos y documentos son de demostración.

## Características

- **Diseño responsivo** — Adaptado a móvil, tablet y escritorio
- **Accesibilidad WCAG** — Contraste, navegación por teclado y estructura semántica
- **Usabilidad** — Menú claro, directorio municipal, transparencia y trámites
- **Panel administrativo demo** — CMS simulado con gestión de contenidos (sin persistencia real)
- **Editor de páginas demo** — Interfaz tipo VS Code con Monaco Editor (solo simulación)

## Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Marcado | HTML5 semántico |
| Estilos | CSS3 (variables, Grid, Flexbox) |
| Interactividad | JavaScript vanilla (ES6+) |
| Demo API | `mock-api.js` (datos en memoria) |
| Auth demo | `auth-demo.js` (localStorage) |

## Estructura del proyecto

```
??? template/              # Páginas HTML públicas y panel admin
?   ??? index.html         # Página principal
?   ??? login.html         # Acceso demo al panel
?   ??? gestion-*.html     # Módulos administrativos (demo)
?   ??? secondary_views/   # Áreas municipales y subsecciones
??? static/
?   ??? css/               # Hojas de estilo
?   ??? js/                # Scripts (mock-api, managers, loaders)
?   ??? img/               # Placeholders SVG (sin fotos reales)
??? scripts/               # Utilidades de desarrollo
??? index.html             # Redirección a template/index.html
```

## Cómo ejecutar localmente

### Opción 1 — Live Server (VS Code / Cursor)

1. Abre la carpeta del proyecto
2. Click derecho en `template/index.html` ? **Open with Live Server**

### Opción 2 — Servidor estático con Node

```bash
npx serve .
# Abre http://localhost:3000/template/index.html
```

### Opción 3 — Python

```bash
python -m http.server 8080
# Abre http://localhost:8080/template/index.html
```

## Panel administrativo (demo)

| Campo | Valor |
|-------|-------|
| URL | `template/login.html` |
| Email | `admin@municipio.demo` |
| Contraseña | `demo` |

Desde el panel puedes explorar:

- Gestión de funcionarios, PDFs, imágenes, videos y publicaciones
- Editor de código con explorador de archivos (guardado simulado)
- Dashboard con estadísticas de demostración

**Ningún cambio se persiste.** Todo opera sobre `mock-api.js` en el navegador.

## Despliegue en GitHub Pages

1. Sube el repositorio a GitHub
2. En **Settings ? Pages**, selecciona la rama `main` y carpeta `/ (root)`
3. La URL raíz redirige automáticamente a `template/index.html`

## Privacidad y seguridad

Cambios aplicados respecto al sitio original:

- `[PRIVACIDAD]` Eliminados `api.php`, `server.py` e `index.php`
- Datos de funcionarios reemplazados por nombres ficticios
- Imágenes y PDFs reales excluidos (`.gitignore`) — solo placeholders SVG
- Credenciales de producción removidas
- Enlaces a redes sociales reales neutralizados
- Protección básica anti-inspección en páginas públicas (disuasión visual)

## Licencia

MIT — Uso libre con fines educativos y de portafolio.

---

*Desarrollado como demostración de habilidades en diseño web institucional, accesibilidad y arquitectura frontend.*
