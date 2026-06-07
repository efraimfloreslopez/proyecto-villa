/** ===========================================================
 *  FORMULARIO POEL � VER O DESCARGAR PDF (CON MANEJO DE ERRORES)
 *  ===========================================================
 */

const PDF_URL = "#demo-pdfpoel_formato-formulario_consulta_villa.pdf";

// Verificar si el PDF existe (simulado en demo)
async function checkPDFExists() {
    try {
        if (window.mockAPI) {
            const result = await window.mockAPI.checkFileExists(PDF_URL);
            return result.ok;
        }
        return true;
    } catch (error) {
        console.error("Error al verificar PDF:", error);
        return true;
    }
}

// Ver PDF en nueva ventana
async function viewFormPDF() {
    const exists = await checkPDFExists();

    if (!exists) {
        alert("?? El archivo PDF no se encuentra.\n\n" +
            "Por favor, contacta al administrador o usa el formulario en l�nea.");
        return;
    }

    // Abrir en nueva ventana
    const newWindow = window.open(PDF_URL, '_blank');

    if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
        // Si el navegador bloque� la ventana emergente
        alert("?? Tu navegador bloque� la ventana emergente.\n\n" +
            "Por favor:\n" +
            "1. Permite ventanas emergentes para este sitio\n" +
            "2. O haz clic derecho en 'Descargar PDF' ? 'Guardar enlace como'");
    }
}

// Descargar PDF
async function downloadFormPDF() {
    const exists = await checkPDFExists();

    if (!exists) {
        alert("?? El archivo PDF no se encuentra.\n\n" +
            "Por favor, contacta al administrador.");
        return;
    }

    const link = document.createElement("a");
    link.href = PDF_URL;
    link.download = "POEL_Formulario_Consulta_Villa.pdf";

    // Forzar descarga incluso si el nombre es igual
    link.setAttribute('download', '');

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Mensaje de confirmaci�n
    setTimeout(() => {
        alert("? PDF descargado correctamente.\n\n" +
            "Archivo: POEL_Formulario_Consulta_Villa.pdf");
    }, 300);
}

// Alias para consistencia
function downloadOnly() {
    downloadFormPDF();
}
// OPCI�N: Ver PDF en modal (m�s elegante)
function viewFormPDFModal() {
    // Crear modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    // Contenido del modal
    modal.innerHTML = `
        <div style="background: white; border-radius: 10px; padding: 20px; max-width: 90%; max-height: 90%;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <h3 style="margin: 0;">Formulario POEL</h3>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                        style="background: none; border: none; font-size: 20px; cursor: pointer;">
                    ?
                </button>
            </div>
            <iframe src="${PDF_URL}" 
                    style="width: 80vw; height: 80vh; border: none;"
                    title="Formulario POEL">
            </iframe>
            <div style="margin-top: 10px; text-align: center;">
                <button onclick="downloadFormPDF()" 
                        style="background: #2c3e50; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                    ?? Descargar PDF
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

// Verificar al cargar la p�gina
document.addEventListener('DOMContentLoaded', async () => {
    const exists = await checkPDFExists();
    if (!exists) {
        console.warn("?? El PDF no est� disponible en:", PDF_URL);
    }
});




