#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
File Scanner - Genera JSON automáticamente desde las carpetas
Escanea PDFs e imágenes y crea los archivos JSON necesarios
"""

import os
import json
from datetime import datetime
from pathlib import Path

class FileScanner:
    def __init__(self):
        self.base_dir = Path(__file__).parent.parent
        self.pdf_dir = self.base_dir / 'static' / 'pdf'
        self.img_dir = self.base_dir / 'static' / 'img'
        self.data_dir = self.base_dir / 'data'
        
        self.pdfs = []
        self.images = []

    def scan_directory(self, directory, file_extensions):
        """Escanear directorio recursivamente"""
        files = []
        
        try:
            for root, dirs, filenames in os.walk(directory):
                for filename in filenames:
                    ext = Path(filename).suffix.lower()
                    if ext in file_extensions:
                        full_path = Path(root) / filename
                        stat = full_path.stat()
                        
                        # Ruta relativa desde el directorio base
                        rel_path = full_path.relative_to(directory)
                        
                        files.append({
                            'filename': filename,
                            'path': str(rel_path),
                            'full_path': str(full_path),
                            'size': stat.st_size,
                            'modified': datetime.fromtimestamp(stat.st_mtime)
                        })
        except Exception as e:
            print(f"Error escaneando {directory}: {e}")
        
        return files

    def format_file_size(self, bytes_size):
        """Formatear tamaño de archivo"""
        if bytes_size == 0:
            return '0 Bytes'
        
        k = 1024
        sizes = ['Bytes', 'KB', 'MB', 'GB']
        i = 0
        size = bytes_size
        
        while size >= k and i < len(sizes) - 1:
            size /= k
            i += 1
        
        return f"{round(size, 2)} {sizes[i]}"

    def determine_page_from_path(self, file_path):
        """Determinar página basándose en la ruta"""
        path_lower = str(file_path).lower()
        
        page_map = {
            'transparencia': 'transparencia',
            'aviso': 'transparencia',
            'privacidad': 'transparencia',
            'cuenta': 'transparencia',
            'presupuesto': 'transparencia',
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
            'archivo': 'transparencia',
            'armonizacion': 'transparencia',
            'contraloria': 'transparencia',
            'informes': 'transparencia',
            'normatividad': 'transparencia',
            'obligaciones': 'transparencia',
            'planeacion': 'transparencia',
            'licitaciones': 'transparencia',
            'inventarios': 'transparencia',
            'mejora': 'transparencia',
            'arco': 'transparencia',
            'multideportivo': 'multideportivo',
            'pcivil': 'pcivil',
            'ubr': 'ubr',
            'poel': 'poel',
            'registrofamiliar': 'registrofamiliar'
        }

        for key, value in page_map.items():
            if key in path_lower:
                return value

        return 'index'

    def determine_category(self, file_path, filename):
        """Determinar categoría"""
        path_lower = str(file_path).lower()
        name_lower = filename.lower()

        categories = {
            'reglamento': 'Reglamentos',
            'acta': 'Actas',
            'informe': 'Informes',
            'transparencia': 'Transparencia',
            'presupuesto': 'Presupuesto',
            'contrato': 'Contratos',
            'convocatoria': 'Convocatorias'
        }

        for key, value in categories.items():
            if key in path_lower or key in name_lower:
                return value

        return 'General'

    def generate_title(self, filename):
        """Generar título legible"""
        # Remover extensión
        title = Path(filename).stem
        
        # Reemplazar guiones y guiones bajos
        title = title.replace('-', ' ').replace('_', ' ')
        
        # Capitalizar
        title = ' '.join(word.capitalize() for word in title.split())
        
        return title

    def scan_pdfs(self):
        """Escanear PDFs"""
        print('Escaneando PDFs...')
        pdf_files = self.scan_directory(self.pdf_dir, ['.pdf'])
        
        print(f'Encontrados {len(pdf_files)} archivos PDF')
        
        self.pdfs = []
        for index, file in enumerate(pdf_files, 1):
            # Convertir ruta a formato web
            web_path = f"../static/pdf/{file['path'].replace(os.sep, '/')}"
            
            pdf_data = {
                'id': str(index),
                'title': self.generate_title(file['filename']),
                'description': f"Documento PDF - {self.generate_title(file['filename'])}",
                'filename': file['filename'],
                'path': web_path,
                'page': self.determine_page_from_path(file['path']),
                'section': Path(file['path']).parent.name if Path(file['path']).parent.name != '.' else 'general',
                'category': self.determine_category(file['path'], file['filename']),
                'size': self.format_file_size(file['size']),
                'uploadDate': file['modified'].strftime('%Y-%m-%d')
            }
            self.pdfs.append(pdf_data)

        return self.pdfs

    def scan_images(self):
        """Escanear imágenes"""
        print('Escaneando imágenes...')
        image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']
        image_files = self.scan_directory(self.img_dir, image_extensions)
        
        print(f'Encontradas {len(image_files)} imágenes')
        
        self.images = []
        for index, file in enumerate(image_files, 1):
            # Convertir ruta a formato web
            web_path = f"../static/img/{file['path'].replace(os.sep, '/')}"
            
            image_data = {
                'id': str(index),
                'title': self.generate_title(file['filename']),
                'description': f"Imagen - {self.generate_title(file['filename'])}",
                'filename': file['filename'],
                'path': web_path,
                'page': self.determine_page_from_path(file['path']),
                'section': Path(file['path']).parent.name if Path(file['path']).parent.name != '.' else 'general',
                'category': self.determine_category(file['path'], file['filename']),
                'alt': self.generate_title(file['filename']),
                'size': self.format_file_size(file['size']),
                'uploadDate': file['modified'].strftime('%Y-%m-%d')
            }
            self.images.append(image_data)

        return self.images

    def scan_videos(self):
        """Escanear videos en static/video y static/img"""
        print('Escaneando videos...')
        video_extensions = {'.mp4', '.webm', '.ogg', '.mov'}
        self.videos = []
        
        # Directorios a escanear
        scan_dirs = [
            self.base_dir / 'static' / 'video',
            self.base_dir / 'static' / 'img'
        ]

        found_files = []

        for scan_dir in scan_dirs:
            if not scan_dir.exists():
                continue
                
            for root, _, files in os.walk(scan_dir):
                for file in files:
                    file_path = Path(root) / file
                    if file_path.suffix.lower() in video_extensions:
                        found_files.append(file_path)

        print(f'Encontrados {len(found_files)} videos')
        
        for index, file_path in enumerate(found_files, 1):
            # Calcular ruta relativa para web
            # Si está en static/video
            if 'static\\video' in str(file_path) or 'static/video' in str(file_path):
                try:
                    rel_path = file_path.relative_to(self.base_dir / 'static' / 'video')
                    web_path = f"../static/video/{rel_path.as_posix()}"
                except:
                    web_path = f"../static/video/{file_path.name}"
            # Si está en static/img
            elif 'static\\img' in str(file_path) or 'static/img' in str(file_path):
                try:
                    rel_path = file_path.relative_to(self.base_dir / 'static' / 'img')
                    web_path = f"../static/img/{rel_path.as_posix()}"
                except:
                    web_path = f"../static/img/{file_path.name}"
            else:
                web_path = f"../static/{file_path.name}"

            video_data = {
                'id': str(index),
                'title': self.generate_title(file_path.name),
                'description': f"Video - {self.generate_title(file_path.name)}",
                'filename': file_path.name,
                'url': web_path,
                'path': web_path,
                'page': self.determine_page_from_path(str(file_path)),
                'section': file_path.parent.name if file_path.parent.name != '.' else 'general',
                'category': 'Video',
                'size': self.format_file_size(file_path.stat().st_size),
                'uploadDate': datetime.fromtimestamp(file_path.stat().st_mtime).strftime('%Y-%m-%d'),
                'thumbnail': '../static/img/video-placeholder.jpg'
            }
            self.videos.append(video_data)

        return self.videos

    def save_json(self, filename, data):
        """Guardar JSON"""
        # Crear directorio data si no existe
        self.data_dir.mkdir(parents=True, exist_ok=True)
        
        file_path = self.data_dir / filename
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f'✓ Guardado: {filename}')

    def run(self):
        """Ejecutar escaneo completo"""
        print('=' * 50)
        print('ESCÁNER DE ARCHIVOS - Sistema TIC')
        print('=' * 50)
        print()

        try:
            # Escanear PDFs
            self.scan_pdfs()
            self.save_json('pdfs.json', {'pdfs': self.pdfs})
            
            # Escanear imágenes
            self.scan_images()
            self.save_json('images.json', {'images': self.images})

            # Escanear videos
            self.scan_videos()
            self.save_json('videos.json', {'videos': self.videos})

            # Generar resumen
            print()
            print('=' * 50)
            print('RESUMEN DEL ESCANEO')
            print('=' * 50)
            print(f'Total PDFs: {len(self.pdfs)}')
            print(f'Total Imágenes: {len(self.images)}')
            print()
            
            # Distribución por página
            print('Distribución de PDFs por página:')
            pdfs_by_page = {}
            for pdf in self.pdfs:
                page = pdf['page']
                pdfs_by_page[page] = pdfs_by_page.get(page, 0) + 1
            
            for page, count in sorted(pdfs_by_page.items(), key=lambda x: x[1], reverse=True):
                print(f'  {page}: {count} PDFs')

            print()
            print('Distribución de imágenes por página:')
            images_by_page = {}
            for img in self.images:
                page = img['page']
                images_by_page[page] = images_by_page.get(page, 0) + 1
            
            for page, count in sorted(images_by_page.items(), key=lambda x: x[1], reverse=True):
                print(f'  {page}: {count} imágenes')

            print()
            print('✓ Escaneo completado exitosamente')
            print()

        except Exception as e:
            print(f'Error durante el escaneo: {e}')
            import traceback
            traceback.print_exc()

if __name__ == '__main__':
    scanner = FileScanner()
    scanner.run()


