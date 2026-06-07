// File Scanner - Genera JSON automáticamente desde las carpetas
// Escanea PDFs e imágenes y crea los archivos JSON necesarios

const fs = require('fs');
const path = require('path');

class FileScanner {
    constructor() {
        this.baseDir = path.join(__dirname, '..');
        this.pdfDir = path.join(this.baseDir, 'static', 'pdf');
        this.imgDir = path.join(this.baseDir, 'static', 'img');
        this.dataDir = path.join(this.baseDir, 'data');

        this.pdfs = [];
        this.images = [];
    }

    // Escanear directorio recursivamente
    scanDirectory(dir, fileType, basePath = '') {
        const files = [];

        try {
            const items = fs.readdirSync(dir);

            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);

                if (stat.isDirectory()) {
                    // Escanear subdirectorio
                    const subFiles = this.scanDirectory(fullPath, fileType, path.join(basePath, item));
                    files.push(...subFiles);
                } else if (stat.isFile()) {
                    const ext = path.extname(item).toLowerCase();

                    // Verificar si es el tipo de archivo que buscamos
                    if (fileType === 'pdf' && ext === '.pdf') {
                        files.push({
                            filename: item,
                            path: path.join(basePath, item),
                            fullPath: fullPath,
                            size: stat.size,
                            modified: stat.mtime
                        });
                    } else if (fileType === 'image' && ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
                        files.push({
                            filename: item,
                            path: path.join(basePath, item),
                            fullPath: fullPath,
                            size: stat.size,
                            modified: stat.mtime
                        });
                    }
                }
            }
        } catch (error) {
            console.error(`Error escaneando ${dir}:`, error.message);
        }

        return files;
    }

    // Formatear tamaño de archivo
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    // Determinar página basándose en la ruta
    determinePageFromPath(filePath) {
        const pathLower = filePath.toLowerCase();

        // Mapeo de carpetas a páginas
        const pageMap = {
            'transparencia': 'transparencia',
            'comisiones': 'comisiones',
            'hayuntamiento': 'hayuntamiento',
            'ayuntamiento': 'hayuntamiento',
            'directorio': 'directoriomunicipal',
            'turismo': 'turismo',
            'dif': 'dif',
            'obras': 'ob',
            'obra': 'ob',
            'tramites': 'tramitesyservicios',
            'servicios': 'tramitesyservicios',
            'archivo': 'ArchivoMunicipal',
            'armonizacion': 'ArmonizacionContable',
            'contraloria': 'ContraloriaInterna',
            'informes': 'Informesdegobierno',
            'normatividad': 'Normatividad',
            'obligaciones': 'ObligacionesdeTransparencia',
            'planeacion': 'Planeacion'
        };

        for (const [key, value] of Object.entries(pageMap)) {
            if (pathLower.includes(key)) {
                return value;
            }
        }

        return 'index'; // Por defecto
    }

    // Determinar categoría basándose en la ruta o nombre
    determineCategory(filePath, filename) {
        const pathLower = filePath.toLowerCase();
        const nameLower = filename.toLowerCase();

        if (pathLower.includes('reglamento') || nameLower.includes('reglamento')) {
            return 'Reglamentos';
        } else if (pathLower.includes('acta') || nameLower.includes('acta')) {
            return 'Actas';
        } else if (pathLower.includes('informe') || nameLower.includes('informe')) {
            return 'Informes';
        } else if (pathLower.includes('transparencia') || nameLower.includes('transparencia')) {
            return 'Transparencia';
        } else if (pathLower.includes('presupuesto') || nameLower.includes('presupuesto')) {
            return 'Presupuesto';
        } else if (pathLower.includes('contrato') || nameLower.includes('contrato')) {
            return 'Contratos';
        } else if (pathLower.includes('convocatoria') || nameLower.includes('convocatoria')) {
            return 'Convocatorias';
        }

        return 'General';
    }

    // Generar título legible desde el nombre del archivo
    generateTitle(filename) {
        // Remover extensión
        let title = filename.replace(/\.[^/.]+$/, '');

        // Reemplazar guiones y guiones bajos con espacios
        title = title.replace(/[-_]/g, ' ');

        // Capitalizar primera letra de cada palabra
        title = title.replace(/\b\w/g, l => l.toUpperCase());

        return title;
    }

    // Escanear PDFs y generar JSON
    async scanPDFs() {
        console.log('Escaneando PDFs...');
        const pdfFiles = this.scanDirectory(this.pdfDir, 'pdf');

        console.log(`Encontrados ${pdfFiles.length} archivos PDF`);

        this.pdfs = pdfFiles.map((file, index) => {
            const relativePath = path.relative(this.baseDir, file.fullPath).replace(/\\/g, '/');
            const webPath = '../' + relativePath.replace('static/', 'static/');

            return {
                id: (index + 1).toString(),
                title: this.generateTitle(file.filename),
                description: `Documento PDF - ${this.generateTitle(file.filename)}`,
                filename: file.filename,
                path: webPath,
                page: this.determinePageFromPath(file.path),
                section: path.dirname(file.path).split(path.sep).pop() || 'general',
                category: this.determineCategory(file.path, file.filename),
                size: this.formatFileSize(file.size),
                uploadDate: file.modified.toISOString().split('T')[0]
            };
        });

        return this.pdfs;
    }

    // Escanear imágenes y generar JSON
    async scanImages() {
        console.log('Escaneando imágenes...');
        const imageFiles = this.scanDirectory(this.imgDir, 'image');

        console.log(`Encontradas ${imageFiles.length} imágenes`);

        this.images = imageFiles.map((file, index) => {
            const relativePath = path.relative(this.baseDir, file.fullPath).replace(/\\/g, '/');
            const webPath = '../' + relativePath.replace('static/', 'static/');

            return {
                id: (index + 1).toString(),
                title: this.generateTitle(file.filename),
                description: `Imagen - ${this.generateTitle(file.filename)}`,
                filename: file.filename,
                path: webPath,
                page: this.determinePageFromPath(file.path),
                section: path.dirname(file.path).split(path.sep).pop() || 'general',
                category: this.determineCategory(file.path, file.filename),
                alt: this.generateTitle(file.filename),
                size: this.formatFileSize(file.size),
                uploadDate: file.modified.toISOString().split('T')[0]
            };
        });

        return this.images;
    }

    // Guardar JSON
    saveJSON(filename, data) {
        // Crear directorio data si no existe
        if (!fs.existsSync(this.dataDir)) {
            fs.mkdirSync(this.dataDir, { recursive: true });
        }

        const filePath = path.join(this.dataDir, filename);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`? Guardado: ${filename}`);
    }

    // Ejecutar escaneo completo
    async run() {
        console.log('='.repeat(50));
        console.log('ESCÁNER DE ARCHIVOS - Sistema TIC');
        console.log('='.repeat(50));
        console.log('');

        try {
            // Escanear PDFs
            await this.scanPDFs();
            this.saveJSON('pdfs.json', { pdfs: this.pdfs });

            // Escanear imágenes
            await this.scanImages();
            this.saveJSON('images.json', { images: this.images });

            // Generar resumen
            console.log('');
            console.log('='.repeat(50));
            console.log('RESUMEN DEL ESCANEO');
            console.log('='.repeat(50));
            console.log(`Total PDFs: ${this.pdfs.length}`);
            console.log(`Total Imágenes: ${this.images.length}`);
            console.log('');

            // Mostrar distribución por página
            console.log('Distribución de PDFs por página:');
            const pdfsByPage = {};
            this.pdfs.forEach(pdf => {
                pdfsByPage[pdf.page] = (pdfsByPage[pdf.page] || 0) + 1;
            });
            Object.entries(pdfsByPage).sort((a, b) => b[1] - a[1]).forEach(([page, count]) => {
                console.log(`  ${page}: ${count} PDFs`);
            });

            console.log('');
            console.log('Distribución de imágenes por página:');
            const imagesByPage = {};
            this.images.forEach(img => {
                imagesByPage[img.page] = (imagesByPage[img.page] || 0) + 1;
            });
            Object.entries(imagesByPage).sort((a, b) => b[1] - a[1]).forEach(([page, count]) => {
                console.log(`  ${page}: ${count} imágenes`);
            });

            console.log('');
            console.log('? Escaneo completado exitosamente');
            console.log('');

        } catch (error) {
            console.error('Error durante el escaneo:', error);
        }
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    const scanner = new FileScanner();
    scanner.run();
}

module.exports = FileScanner;





