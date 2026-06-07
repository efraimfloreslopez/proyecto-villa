// =========================================
// Mapeo de c�digos a nombres de archivos PDF
// =========================================
const pdfFileMap = {
  'COM-DA-001': 'ACTA_DE_PRIMER_SESION_ORDINARIA_DE_COMISION_DE_DESARROLLO_AGROPECUARIO_17122024.pdf',
  'COM-MR-001': 'PRIMERA_SESION_EXTRAORDINARIA_DE_LA_COMISION_DE_MEJORA_REGULATORIA_26122024.pdf',
  'COM-MR-002': 'ACTA_DE_SEGUNDA_SESION_EXTRAORDINARIA_DE_COMISION_MEJORA_REGULATORIA_30122024 (1).pdf',
  'COM-MR-003': 'ACTA_DE_SEGUNDA_SESION_EXTRAORDINARIA_DE_COMISION_MEJORA_REGULATORIA_30122024.pdf',
  'COM-PC-001': 'ACTA_DE_PRIMER_SESION_ORDINARIA_DE_COMISION_DE_PROTECCION_CIVIL_14112024.pdf',
  'COM-DH-002': 'ACTA_DE_SEGUNDA_SESION_ORDINARIA_DE_COMISION_DE_DERECHOS_HUMANOS_ATENCION_A_LAS_PERSONAS_CON_DISCAPACIDAD_Y_DE_IGUALDAD_DE_GENERO_2012025.pdf',
  'COM-PA-003': 'ACTA_DE_TERCERA_SESION_ORDINARIA_DE_LA_COMISION_DE_PREVENCION_CONTRA_LAS_ADICCIONES_10012025.pdf',
  'COM-OP-001': 'ACTA_DE_PRIMERA_SESION_ORDINARIA_DE_LA_COMISION_DE_OBRAS_PUBLICAS_ASENTAMIENTOS_HUMANOS_DESARROLLO_URBANO_Y_ORDENAMIENTO_TERRITORIAL_17122024.pdf',
  'COM-DE-002': 'ACTA_DE_SEGUNDA_SESION_ORDINARIA_DE_LA_COMISION_DE_DESARROLLO_ECONOMICO_06012025.pdf',
  'COM-SP-001': 'PRIMERA_SESION_ORDINARIA_DE_LA_COMISION_DE_SEGURIDAD_PUBLICA_TRANSITO_Y_VIALIDAD_14112024.pdf',
  'COM-SP-002': 'ACTA_DE_SEGUNDA_SESION_ORDINARIA_DE_COMISION_DE_SEGURIDAD_PUBLICA_TRANSITO_Y_VIALIDAD_21022025.pdf',
  'COM-AM-003': 'ACTA_DE_TERCERA_SESION_ORDINARIA_DE_LA_COMISION_DE_ADULTOS_MAYORES_23012025.pdf',
  'COM-NJ-001': 'PRIMERA_SESION_ORDINARIA_DE_LA_COMISION_DE_NIEZ_Y_JUVENTUD_14112024.pdf',
  'COM-CO-001': 'ACTA_DE_PRIMERA_SESION_ORDINARIA_DE_LA_COMISION_DE_COMERCIO_14112024.pdf',
  'COM-NJ-002': 'ACTA_DE_LA_SEGUNDA_SESION_ORDINARIA_DE_LA_COMISION_NIEZ_JUVENTUDDEPORTE__COMERCIO_Y_ABASTO_Y_TURISMO_31122024.pdf',
  'COM-TR-001': 'PRIMERA_SESION_ORDINARIA_DE_LA_COMISION_DE_TRANSPARENCIA_Y_ACCESO_A_LA_INFORMACION_PUBLICA_23012025.pdf'
};

// =========================================
// Variable global para el c�digo actual
// =========================================
let currentDocumentCode = '';

// =========================================
// Ver documento en modal
// =========================================
function viewDocument(code, title) {
  currentDocumentCode = code;

  if (!pdfFileMap[code]) {
    alert(`?? Error: No se encontr� el archivo PDF.\nC�digo: ${code}`);
    console.error('Documento no encontrado:', code);
    return false;
  }

  const pdfFileName = pdfFileMap[code];
  // ?? Ruta correcta desde template/comisiones.html
  const pdfPath = `#demo-pdfComisiones/${encodeURIComponent(pdfFileName)}`;

  const modal = document.getElementById('pdfModal');
  const pdfFrame = document.getElementById('pdfFrame');

  document.getElementById('modalTitle').textContent = title;
  pdfFrame.src = pdfPath;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  // Verificar si el archivo existe
  checkFileExists(pdfPath, code, title);
}

// =========================================
// Descargar documento
// =========================================
function downloadDocument(code) {
  const docCode = code || currentDocumentCode;
  if (!pdfFileMap[docCode]) return alert('Documento no encontrado.');

  const fileName = pdfFileMap[docCode];
  const link = document.createElement('a');
  link.href = `#demo-pdfComisiones/${encodeURIComponent(fileName)}`;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// =========================================
// Cerrar modal
// =========================================
function closePdfModal() {
  const modal = document.getElementById('pdfModal');
  modal.style.display = 'none';
  document.getElementById('pdfFrame').src = '';
  document.body.style.overflow = 'auto';
}

// =========================================
// Verificar si el archivo existe
// =========================================
function checkFileExists(url, code, title) {
  // Demo: simula verificaci�n de archivo sin conexi�n HTTP real
  if (window.mockAPI) {
    window.mockAPI.checkFileExists(url).then(result => {
      if (!result.ok) showFileError(code, title);
    });
  }
}

// =========================================
// Mostrar error si no existe el archivo
// =========================================
function showFileError(code, title) {
  const pdfFrame = document.getElementById('pdfFrame');
  pdfFrame.src = '';

  const errorHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f8f9fa; }
        .error-container { text-align: center; padding: 40px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 80%; }
        .error-icon { font-size: 48px; margin-bottom: 20px; }
        .error-title { color: #dc3545; margin-bottom: 15px; }
        .error-message { color: #666; margin-bottom: 10px; }
        .error-code { background: #f8f9fa; padding: 10px; border-radius: 4px; font-family: monospace; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="error-container">
        <div class="error-icon">???</div>
        <h2 class="error-title">Archivo no encontrado</h2>
        <p class="error-message">No se pudo cargar el documento PDF.</p>
        <p class="error-message"><strong>Documento:</strong> ${title}</p>
        <div class="error-code">C�digo: ${code}</div>
        <p class="error-message">Verifica que el archivo exista en la carpeta:</p>
        <p class="error-message" style="font-size: 12px; color: #999;">#demo-pdfComisiones/</p>
      </div>
    </body>
    </html>
  `;

  pdfFrame.srcdoc = errorHtml;
}

// =========================================
// Testear existencia de PDFs (opcional)
// =========================================
async function testAllPdfFiles() {
  for (const code in pdfFileMap) {
    const path = `#demo-pdfComisiones/${encodeURIComponent(pdfFileMap[code])}`;
    try {
      const res = await window.mockAPI.checkFileExists(path);
      console.log(`${code}: ${res.ok ? '? OK' : '? NO ENCONTRADO'} - ${pdfFileMap[code]} (demo)`);

    } catch (e) {
      console.log(`${code}: ? ERROR - ${pdfFileMap[code]}`);
    }
  }
}

// =========================================
// Inicializaci�n de eventos
// =========================================
document.addEventListener('DOMContentLoaded', function () {
  const closeModalBtn = document.getElementById('closeModalBtn');
  if (closeModalBtn) closeModalBtn.addEventListener('click', closePdfModal);

  const closeBtnModal = document.getElementById('closeBtnModal');
  if (closeBtnModal) closeBtnModal.addEventListener('click', closePdfModal);

  const downloadBtnModal = document.getElementById('downloadBtnModal');
  if (downloadBtnModal) downloadBtnModal.addEventListener('click', function () {
    downloadDocument(currentDocumentCode);
  });

  const pdfModal = document.getElementById('pdfModal');
  if (pdfModal) {
    pdfModal.addEventListener('click', function (e) {
      if (e.target === this) closePdfModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePdfModal();
  });
});





