# Escáner de Archivos - Sistema TIC

Este directorio contiene scripts para escanear automáticamente los archivos PDF e imágenes del proyecto y generar los archivos JSON necesarios.

## Scripts Disponibles

### 1. file-scanner.js (Node.js)
Script en JavaScript que escanea las carpetas y genera los JSON.

**Requisitos:**
- Node.js instalado

**Uso:**
```bash
# Instalar dependencias (opcional)
npm install

# Ejecutar escaneo
npm run scan

# O directamente
node scripts/file-scanner.js
```

### 2. file-scanner.py (Python)
Script en Python que hace lo mismo, para quienes no tienen Node.js.

**Requisitos:**
- Python 3.6 o superior

**Uso:**
```bash
python scripts/file-scanner.py
```

## ¿Qué hace el escáner?

1. **Escanea la carpeta `static/pdf/`** recursivamente
2. **Escanea la carpeta `static/img/`** recursivamente
3. **Genera automáticamente:**
   - `data/pdfs.json` con información de todos los PDFs
   - `data/images.json` con información de todas las imágenes

## Información que extrae

Para cada archivo, el escáner extrae:

- **ID único**
- **Título** (generado desde el nombre del archivo)
- **Descripción**
- **Nombre del archivo**
- **Ruta web** (para usar en HTML)
- **Página** (determinada automáticamente por la carpeta)
- **Sección** (carpeta donde está ubicado)
- **Categoría** (basada en palabras clave)
- **Tamaño** (formateado en KB/MB)
- **Fecha** (última modificación)

## Mapeo Automático de Páginas

El escáner detecta automáticamente a qué página pertenece cada archivo basándose en la ruta:

- `transparencia/` → transparencia.html
- `comisiones/` → comisiones.html
- `hayuntamiento/` → hayuntamiento.html
- `turismo/` → turismo.html
- `dif/` → dif.html
- `obras/` → ob.html
- `tramites/` → tramitesyservicios.html
- Y más...

## Categorías Automáticas

Detecta categorías basándose en palabras clave:

- Archivos con "reglamento" → Categoría: Reglamentos
- Archivos con "acta" → Categoría: Actas
- Archivos con "informe" → Categoría: Informes
- Archivos con "transparencia" → Categoría: Transparencia
- Y más...

## Ejemplo de Salida

```
==================================================
ESCÁNER DE ARCHIVOS - Sistema TIC
==================================================

Escaneando PDFs...
Encontrados 211 archivos PDF
✓ Guardado: pdfs.json

Escaneando imágenes...
Encontradas 789 imágenes
✓ Guardado: images.json

==================================================
RESUMEN DEL ESCANEO
==================================================
Total PDFs: 211
Total Imágenes: 789

Distribución de PDFs por página:
  transparencia: 85 PDFs
  comisiones: 42 PDFs
  hayuntamiento: 28 PDFs
  ...

Distribución de imágenes por página:
  turismo: 156 imágenes
  index: 98 imágenes
  dif: 67 imágenes
  ...

✓ Escaneo completado exitosamente
```

## Cuándo ejecutar

Ejecuta el escáner:

- **Después de agregar nuevos PDFs o imágenes** a las carpetas
- **Cuando reorganices archivos** en diferentes carpetas
- **Para actualizar la información** de archivos existentes

## Notas

- Los archivos JSON se sobrescriben cada vez que ejecutas el escáner
- El escáner no modifica tus archivos originales
- Puedes ejecutarlo tantas veces como quieras
- Es seguro y no requiere base de datos


