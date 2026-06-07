// =========================================================
// == REGISTRO FAMILIAR � PDF DIN�MICO =====================
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    // Intentar localizar la clase jsPDF en las distintas variantes
    const jsPDFLib =
        (window.jspdf && window.jspdf.jsPDF)
        || window.jsPDF
        || null;

    const docsConfig = {
        "inex-hijos": {
            fileName: "Constancia_Inexistencia_Hijos.pdf",
            title: "CONSTANCIA DE INEXISTENCIA DE HIJOS",
            modalTitle: "Constancia de inexistencia de hijos",
            body: [
                "Formato para acreditar que no existen hijos registrados a la fecha de la solicitud.",
                "",
                "DATOS DE LA PERSONA INTERESADA:",
                "Nombre: _________________________________",
                "Fecha de nacimiento: _____________________",
                "Sexo: _________________________________"
            ]
        },
        "inex-registro": {
            fileName: "Constancia_Inexistencia_Registro.pdf",
            title: "CONSTANCIA DE INEXISTENCIA DE REGISTRO",
            modalTitle: "Constancia de inexistencia de registro",
            body: [
                "Constancia para confirmar que no existe inscripci�n previa",
                "en los libros del Registro del Estado Familiar a nombre de la persona solicitante.",
                "",
                "Nombre: _________________________________",
                "Fecha de nacimiento: _____________________",
                "Sexo: _________________________________"
            ]
        },
        "inex-matrimonio": {
            fileName: "Constancia_Inexistencia_Matrimonio.pdf",
            title: "CONSTANCIA DE INEXISTENCIA DE MATRIMONIO",
            modalTitle: "Constancia de inexistencia de matrimonio",
            body: [
                "Formato para manifestar que no se localiza inscripci�n de matrimonio",
                "a nombre de la persona interesada.",
                "",
                "Nombre: _________________________________",
                "Fecha de nacimiento: _____________________",
                "Lugar de registro: _______________________",
                "Nombre del padre: ________________________",
                "Nombre de la madre: ______________________",
                "Sexo: _________________________________",
                "",
                "Nota: En caso de contar con copia del acta de nacimiento,",
                "puede acudir directamente a la Oficial�a del Registro del Estado Familiar."
            ]
        },
        "divorcio": {
            fileName: "Requisitos_Acta_Divorcio.pdf",
            title: "REQUISITOS PARA ACTA DE DIVORCIO",
            modalTitle: "Requisitos para acta de divorcio",
            body: [
                "� Oficio girado por la autoridad competente.",
                "� Tres juegos de copias certificadas expedidas por la autoridad",
                "  judicial y donde la misma cause ejecutoria.",
                "",
                "Pago realizado de acuerdo al Art. 16 de la Ley de Ingresos",
                "del Municipio de Portal Institucional Municipal.",
                "",
                "Tiempo de respuesta: 10 d�as h�biles despu�s del d�a",
                "siguiente de la notificaci�n."
            ]
        },
        "defuncion": {
            fileName: "Requisitos_Acta_Defuncion.pdf",
            title: "REQUISITOS PARA ACTA DE DEFUNCI�N",
            modalTitle: "Requisitos para acta de defunci�n",
            body: [
                "Originales de certificado de defunci�n y 2 copias.",
                "",
                "� 1 copia de INE de la persona que falleci�.",
                "� 1 copia de su acta de nacimiento, persona que falleci�.",
                "� 1 copia de CURP de la persona que falleci�.",
                "� 3 personas para firma del acta con copia de su INE",
                "  (declarante y dos testigos)."
            ]
        },
        "adopcion": {
            fileName: "Requisitos_Inscripcion_Adopcion.pdf",
            title: "REQUISITOS PARA INSCRIPCI�N DE ADOPCI�N",
            modalTitle: "Requisitos para inscripci�n de adopci�n",
            body: [
                "� Oficio girado por la autoridad competente.",
                "� Tres juegos de copias certificadas expedidas por la autoridad",
                "  judicial y donde la misma cause ejecutoria.",
                "",
                "Pago realizado de acuerdo al Art. 16 de la Ley de Ingresos",
                "del Municipio de Portal Institucional Municipal.",
                "",
                "Tiempo de respuesta: 10 d�as h�biles despu�s del d�a",
                "siguiente de la notificaci�n."
            ]
        },
        "anotacion": {
            fileName: "Requisitos_Anotacion_Marginal.pdf",
            title: "REQUISITOS PARA ANOTACI�N MARGINAL",
            modalTitle: "Requisitos para anotaci�n marginal",
            body: [
                "� Oficio girado por la autoridad competente.",
                "� Tres juegos de copias certificadas expedidas por la autoridad",
                "  judicial y donde la misma cause ejecutoria.",
                "",
                "Pago realizado de acuerdo al Art. 16 de la Ley de Ingresos",
                "del Municipio de Portal Institucional Municipal.",
                "",
                "Tiempo de respuesta: 10 d�as h�biles despu�s del d�a",
                "siguiente de la notificaci�n."
            ]
        },
        "concubinato": {
            fileName: "Requisitos_Inscripcion_Concubinato.pdf",
            title: "REQUISITOS PARA INSCRIPCI�N DE CONCUBINATO",
            modalTitle: "Requisitos para inscripci�n de concubinato",
            body: [
                "� Oficio girado por la autoridad competente.",
                "� Tres juegos de copias certificadas expedidas por la autoridad",
                "  judicial y donde la misma cause ejecutoria.",
                "",
                "Pago realizado de acuerdo al Art. 16 de la Ley de Ingresos",
                "del Municipio de Portal Institucional Municipal.",
                "",
                "Tiempo de respuesta: 10 d�as h�biles despu�s del d�a",
                "siguiente de la notificaci�n."
            ]
        },
        "identidad": {
            fileName: "Requisitos_Juicio_Identidad.pdf",
            title: "REQUISITOS JUICIO DE IDENTIDAD",
            modalTitle: "Requisitos juicio de identidad",
            body: [
                "� Oficio girado por la autoridad competente.",
                "� Tres juegos de copias certificadas expedidas por la autoridad",
                "  judicial y donde la misma cause ejecutoria.",
                "",
                "Pago realizado de acuerdo al Art. 16 de la Ley de Ingresos",
                "del Municipio de Portal Institucional Municipal.",
                "",
                "Tiempo de respuesta: 10 d�as h�biles despu�s del d�a",
                "siguiente de la notificaci�n."
            ]
        }
    };

    const modal = document.getElementById("regfam-modal");
    const iframe = document.getElementById("regfam-modal-iframe");
    const modalTitleEl = document.getElementById("regfam-modal-title");
    const downloadBtn = document.getElementById("regfam-modal-download");
    let currentDocType = null;

    function crearDocumento(tipo) {
        const cfg = docsConfig[tipo];
        if (!cfg) return null;

        if (!jsPDFLib) {
            alert("No puedo generar el PDF porque la librer�a jsPDF no se carg� correctamente.");
            return null;
        }

        const doc = new jsPDFLib({
            orientation: "portrait",
            unit: "pt",
            format: "letter"
        });

        const left = 60;
        let y = 60;

        // Encabezado
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text("AYUNTAMIENTO DE Portal Institucional Municipal", left, y);
        y += 14;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text("Registro del Estado Familiar", left, y);

        // L�nea dorada
        y += 20;
        doc.setDrawColor(151, 115, 44);
        doc.setLineWidth(1.2);
        doc.line(left, y, 552, y);
        y += 30;

        // T�tulo
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        const splitTitle = doc.splitTextToSize(cfg.title, 480);
        doc.text(splitTitle, left, y);
        y += 30 + (splitTitle.length - 1) * 18;

        // Cuerpo
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);

        cfg.body.forEach(line => {
            const lines = doc.splitTextToSize(line, 480);
            lines.forEach(l => {
                if (y > 740) {
                    doc.addPage();
                    y = 60;
                }
                doc.text(l, left, y);
                y += 16;
            });
        });

        // Pie
        if (y < 720) y = 720;
        doc.setDrawColor(184, 138, 46);
        doc.setLineWidth(4);
        doc.line(0, 760, 612, 760);

        doc.setFontSize(9);
        doc.setTextColor(80);
        doc.text("Ciudad Demo, México.", left, 750);

        return doc;
    }

    function abrirModalConPdf(tipo) {
        const cfg = docsConfig[tipo];
        if (!cfg) return;

        const doc = crearDocumento(tipo);
        if (!doc) return;

        const blobUrl = doc.output("bloburl");
        iframe.src = blobUrl;
        modalTitleEl.textContent = cfg.modalTitle;
        currentDocType = tipo;

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
    }

    function cerrarModal() {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        iframe.src = "";
        currentDocType = null;
    }

    // Asignar eventos a todos los botones "Ver"
    document.querySelectorAll(".regfam-din-card").forEach(card => {
        const tipo = card.getAttribute("data-doc-type");
        const btn = card.querySelector(".regfam-din-btn-view");
        if (!tipo || !btn) return;

        btn.addEventListener("click", () => {
            abrirModalConPdf(tipo);
        });
    });

    // Bot�n Descargar del modal
    downloadBtn.addEventListener("click", () => {
        if (!currentDocType) return;
        const cfg = docsConfig[currentDocType];
        const doc = crearDocumento(currentDocType);
        if (!doc) return;
        doc.save(cfg.fileName);
    });

    // Cerrar modal al hacer clic en fondo o en la X
    modal.querySelectorAll("[data-close-modal]").forEach(el => {
        el.addEventListener("click", cerrarModal);
    });

    // Cerrar con ESC
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && modal.classList.contains("is-open")) {
            cerrarModal();
        }
    });
});

// =========================================================
// == FIN REGISTRO FAMILIAR � PDF DIN�MICO =================
// =========================================================





