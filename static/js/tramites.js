/* ============================================================
   CONFIGURACI�N DE COLONIAS Y PLANTILLAS PNG - ACTUALIZADO
   ============================================================ */

const COLONIAS_DATA = {
  puertojuarez: {
    nombre: "COLONIA PUERTO JU�REZ",
    folio: "PUE-JUA",
    plantilla: "col.juarez.png",
    posiciones: {
      nombreCompleto: { x: 25, y: 62 },
      fechaNacimiento: { x: 40, y: 72 },
      edad: { x: 140, y: 72 },
      domicilio: { x: 40, y: 82 },
      colonia: { x: 40, y: 92 },
      municipio: { x: 150, y: 92 },
      telefono: { x: 40, y: 102 },
      taller: { x: 40, y: 132 },
      horario: { x: 40, y: 142 },
      tutor: { x: 40, y: 168 }
    }
  },
  acozac: {
    nombre: "ACOZAC",
    folio: "ACZ",
    plantilla: "acozac.png",
    posiciones: {
      nombreCompleto: { x: 40, y: 115 },      // AJUSTADO: Nombre completo
      fechaNacimiento: { x: 40, y: 95 },      // AJUSTADO: Fecha nacimiento  
      edad: { x: 120, y: 95 },                // AJUSTADO: Edad
      domicilio: { x: 40, y: 135 },           // AJUSTADO: Domicilio
      colonia: { x: 40, y: 155 },             // AJUSTADO: Colonia
      municipio: { x: 120, y: 155 },          // AJUSTADO: Municipio
      telefono: { x: 40, y: 175 },            // AJUSTADO: Tel�fono
      taller: { x: 40, y: 215 },              // AJUSTADO: Taller
      horario: { x: 40, y: 235 },             // AJUSTADO: Horario
      tutor: { x: 40, y: 275 }                // AJUSTADO: Tutor
    }
  },
  cantera: {
    nombre: "COMUNIDAD LA CANTERA",
    folio: "CAN",
    plantilla: "cantera.png",
    posiciones: {
      nombreCompleto: { x: 28, y: 63 },
      fechaNacimiento: { x: 42, y: 73 },
      edad: { x: 142, y: 73 },
      domicilio: { x: 42, y: 83 },
      colonia: { x: 42, y: 93 },
      municipio: { x: 152, y: 93 },
      telefono: { x: 42, y: 103 },
      taller: { x: 42, y: 133 },
      horario: { x: 42, y: 143 },
      tutor: { x: 42, y: 170 }
    }
  },
  morelos: {
    nombre: "COL. MORELOS",
    folio: "MOR",
    plantilla: "morelos.png",
    posiciones: {
      nombreCompleto: { x: 27, y: 64 },
      fechaNacimiento: { x: 41, y: 74 },
      edad: { x: 141, y: 74 },
      domicilio: { x: 41, y: 84 },
      colonia: { x: 41, y: 94 },
      municipio: { x: 151, y: 94 },
      telefono: { x: 41, y: 104 },
      taller: { x: 41, y: 134 },
      horario: { x: 41, y: 144 },
      tutor: { x: 41, y: 171 }
    }
  },
  guadalupe: {
    nombre: "COLONIA GUADALUPE",
    folio: "GUA",
    plantilla: "guadalupe.png",
    posiciones: {
      nombreCompleto: { x: 26, y: 63 },
      fechaNacimiento: { x: 43, y: 73 },
      edad: { x: 143, y: 73 },
      domicilio: { x: 43, y: 83 },
      colonia: { x: 43, y: 93 },
      municipio: { x: 153, y: 93 },
      telefono: { x: 43, y: 103 },
      taller: { x: 43, y: 133 },
      horario: { x: 43, y: 143 },
      tutor: { x: 43, y: 170 }
    }
  },
  sixtovalencia: {
    nombre: 'CENTRO CULTURAL "SIXTO VALENCIA BURGOS"',
    folio: "SIX",
    plantilla: "sixto_valencia.png",
    posiciones: {
      nombreCompleto: { x: 29, y: 66 },
      fechaNacimiento: { x: 44, y: 76 },
      edad: { x: 144, y: 76 },
      domicilio: { x: 44, y: 86 },
      colonia: { x: 44, y: 96 },
      municipio: { x: 154, y: 96 },
      telefono: { x: 44, y: 106 },
      taller: { x: 44, y: 136 },
      horario: { x: 44, y: 146 },
      tutor: { x: 44, y: 173 }
    }
  }
};

// Variables globales
let coloniaActual = null;
let PREVIEW_BLOB = null;
let hayCambiosSinGuardar = false;
let estaGenerandoPDF = false;

/* ============================================================
   FUNCIONES DE UTILIDAD
   ============================================================ */

function mostrarMensaje(mensaje, tipo = 'info', tiempo = 5000) {
  let contenedor = document.getElementById('mensajes-flotantes');
  if (!contenedor) {
    contenedor = document.createElement('div');
    contenedor.id = 'mensajes-flotantes';
    contenedor.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10001;
            max-width: 400px;
        `;
    document.body.appendChild(contenedor);
  }

  const mensajeDiv = document.createElement('div');
  mensajeDiv.className = `form-message ${tipo}`;
  mensajeDiv.innerHTML = `
        <i class="icono">${tipo === 'exito' ? '?' : tipo === 'error' ? '?' : '??'}</i>
        <span class="texto">${mensaje}</span>
        <button class="cerrar" style="margin-left: auto; background: none; border: none; cursor: pointer; font-size: 1.2rem;">�</button>
    `;

  mensajeDiv.style.cssText = `
        margin-bottom: 10px;
        animation: slideIn 0.3s ease-out;
    `;

  const btnCerrar = mensajeDiv.querySelector('.cerrar');
  btnCerrar.addEventListener('click', () => {
    mensajeDiv.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => mensajeDiv.remove(), 300);
  });

  if (tiempo > 0) {
    setTimeout(() => {
      if (mensajeDiv.parentNode) {
        mensajeDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => mensajeDiv.remove(), 300);
      }
    }, tiempo);
  }

  contenedor.appendChild(mensajeDiv);
}

/* ============================================================
   ABRIR / CERRAR MODAL
   ============================================================ */

function openFormModal(colonia) {
  console.log("Abriendo modal para:", colonia);

  if (!COLONIAS_DATA[colonia]) {
    console.error("Colonia no encontrada:", colonia);
    mostrarMensaje(`? Colonia "${colonia}" no encontrada`, 'error', 3000);
    return;
  }

  coloniaActual = colonia;
  const modal = document.getElementById("formModal");
  const modalSubtitle = document.getElementById("modalDescripcion");

  if (!modal) {
    console.error("Modal no encontrado");
    return;
  }

  if (modalSubtitle) {
    modalSubtitle.textContent = COLONIAS_DATA[colonia].nombre;
  } else {
    const oldSubtitle = document.getElementById("modalSubtitle");
    if (oldSubtitle) {
      oldSubtitle.textContent = COLONIAS_DATA[colonia].nombre;
    }
  }

  modal.style.display = "block";
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    modal.classList.add('modal-visible');
  }, 10);
}

function closeFormModal() {
  if (hayCambiosSinGuardar) {
    if (!confirm('?? Tiene cambios sin guardar. �Est� seguro de querer cancelar?')) {
      return;
    }
  }

  cerrarModalDirectamente();
}

function cerrarModalDirectamente() {
  const modal = document.getElementById("formModal");

  modal.classList.remove('modal-visible');

  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";

    document.getElementById("cedulaForm").reset();

    coloniaActual = null;
    PREVIEW_BLOB = null;
    hayCambiosSinGuardar = false;
  }, 300);
}

/* ============================================================
   MANEJO DE EVENTOS DEL MODAL
   ============================================================ */

window.addEventListener('click', (event) => {
  const modal = document.getElementById("formModal");
  if (event.target === modal) {
    closeFormModal();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const modal = document.getElementById("formModal");
    if (modal.style.display === "block") {
      closeFormModal();
    }
  }
});

/* ============================================================
   FORMULARIO - GENERAR PDF
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("cedulaForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (estaGenerandoPDF) {
      mostrarMensaje('? Ya se est� generando un PDF, espere por favor...', 'advertencia', 2000);
      return;
    }

    if (!coloniaActual) {
      mostrarMensaje('? Primero seleccione una colonia', 'error', 3000);
      return;
    }

    const formData = {
      nombreAlumno: document.getElementById("nombreAlumno").value.trim(),
      apellidoPaterno: document.getElementById("apellidoPaterno").value.trim(),
      apellidoMaterno: document.getElementById("apellidoMaterno").value.trim(),
      edad: document.getElementById("edad").value,
      fechaNacimiento: document.getElementById("fechaNacimiento").value,
      domicilio: document.getElementById("domicilio").value.trim(),
      colonia: document.getElementById("colonia").value.trim(),
      municipio: document.getElementById("municipio").value,
      telefono: document.getElementById("telefono").value.replace(/\D/g, ''),
      tipoTaller: document.getElementById("tipoTaller").value,
      horario: document.getElementById("horario").value,
      nombreTutor: document.getElementById("nombreTutor").value.trim()
    };

    console.log("Datos del formulario:", formData);

    const errores = [];
    if (!formData.nombreAlumno) errores.push('Nombre del alumno es requerido');
    if (!formData.apellidoPaterno) errores.push('Apellido paterno es requerido');
    if (!formData.edad) errores.push('Edad es requerida');
    if (!formData.telefono || formData.telefono.length !== 10) errores.push('Tel�fono debe tener 10 d�gitos');

    if (errores.length > 0) {
      mostrarMensaje('? ' + errores.join(', '), 'error', 5000);
      return;
    }

    await generarPDF(formData);
  });

  const telefonoInput = document.getElementById('telefono');
  if (telefonoInput) {
    telefonoInput.addEventListener('input', function (e) {
      let valor = e.target.value.replace(/\D/g, '');
      if (valor.length > 10) valor = valor.substring(0, 10);

      if (valor.length === 10) {
        e.target.value = valor.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      } else {
        e.target.value = valor;
      }
    });
  }
});

/* ============================================================
   GENERACI�N DEL PDF - FUNCI�N SIMPLIFICADA
   ============================================================ */

async function generarPDF(datos) {
  console.log("Iniciando generaci�n de PDF para:", coloniaActual);
  console.log("Datos a usar:", datos);

  if (!coloniaActual) {
    mostrarMensaje('? No hay colonia seleccionada', 'error', 3000);
    return;
  }

  const info = COLONIAS_DATA[coloniaActual];
  if (!info) {
    mostrarMensaje('? Informaci�n de colonia no encontrada', 'error', 3000);
    return;
  }

  estaGenerandoPDF = true;
  const btnSubmit = document.querySelector('.btn-submit');
  const textoOriginal = btnSubmit ? btnSubmit.innerHTML : 'Generar PDF';

  if (btnSubmit) {
    btnSubmit.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Generando...';
    btnSubmit.disabled = true;
  }

  try {
    const rutaPlantilla = `../static/img/Tramites y Servicios/${info.plantilla}`;
    console.log("Buscando plantilla en:", rutaPlantilla);

    const img = await cargarImagen(rutaPlantilla);

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    doc.addImage(img, "PNG", 0, 0, 210, 297);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);

    const pos = info.posiciones;

    const nombreCompleto = `${datos.nombreAlumno || ''} ${datos.apellidoPaterno || ''} ${datos.apellidoMaterno || ''}`.trim();
    if (nombreCompleto) {
      doc.text(nombreCompleto, pos.nombreCompleto.x, pos.nombreCompleto.y);
    }

    if (datos.fechaNacimiento) {
      const fechaParts = datos.fechaNacimiento.split('-');
      if (fechaParts.length === 3) {
        const fechaFormatoMexico = `${fechaParts[2]}/${fechaParts[1]}/${fechaParts[0]}`;
        doc.text(fechaFormatoMexico, pos.fechaNacimiento.x, pos.fechaNacimiento.y);
      } else {
        doc.text(datos.fechaNacimiento, pos.fechaNacimiento.x, pos.fechaNacimiento.y);
      }
    }

    if (datos.edad) {
      doc.text(datos.edad.toString(), pos.edad.x, pos.edad.y);
    }

    if (datos.domicilio) {
      doc.text(datos.domicilio, pos.domicilio.x, pos.domicilio.y);
    }

    if (datos.colonia) {
      doc.text(datos.colonia, pos.colonia.x, pos.colonia.y);
    }

    if (datos.municipio) {
      doc.text(datos.municipio, pos.municipio.x, pos.municipio.y);
    }

    if (datos.telefono) {
      let telefonoTexto = datos.telefono;
      if (telefonoTexto.length === 10 && !telefonoTexto.includes('(')) {
        telefonoTexto = telefonoTexto.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      }
      doc.text(telefonoTexto, pos.telefono.x, pos.telefono.y);
    }

    if (datos.tipoTaller) {
      doc.text(datos.tipoTaller, pos.taller.x, pos.taller.y);
    }

    if (datos.horario) {
      doc.text(datos.horario, pos.horario.x, pos.horario.y);
    }

    if (datos.nombreTutor) {
      doc.text(datos.nombreTutor, pos.tutor.x, pos.tutor.y);
    }

    doc.setFontSize(7);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Generado: ${new Date().toLocaleDateString('es-MX')} - Portal Institucional Municipal`,
      105,
      290,
      { align: 'center' }
    );

    PREVIEW_BLOB = doc.output("blob");

    const fecha = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const nombreArchivo = `Cedula_${info.folio}_${datos.apellidoPaterno || 'alumno'}_${fecha}.pdf`;

    doc.save(nombreArchivo);

    mostrarMensaje('? PDF generado correctamente', 'exito', 4000);

    setTimeout(() => {
      cerrarModalDirectamente();
    }, 1500);

  } catch (error) {
    console.error('Error al generar PDF:', error);

    let mensajeError = '? Error al generar el PDF';
    if (error.message.includes('Failed to load')) {
      mensajeError = `? No se encontr� la plantilla: ${info.plantilla}`;
    }

    mostrarMensaje(mensajeError, 'error', 5000);
  } finally {
    estaGenerandoPDF = false;
    if (btnSubmit) {
      btnSubmit.innerHTML = textoOriginal;
      btnSubmit.disabled = false;
    }
  }
}

function cargarImagen(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      console.log("Imagen cargada:", src);
      resolve(img);
    };

    img.onerror = () => {
      reject(new Error(`No se pudo cargar la imagen: ${src}`));
    };

    img.src = src;
  });
}

/* ============================================================
   BOT�N VER PDF
   ============================================================ */

function verPDF() {
  if (!PREVIEW_BLOB) {
    mostrarMensaje('? Primero genere un PDF', 'error', 3000);
    return;
  }

  const url = URL.createObjectURL(PREVIEW_BLOB);
  window.open(url, '_blank');
}

/* ============================================================
   INICIALIZACI�N
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const actions = document.querySelector(".form-actions");
  if (actions && !document.getElementById("btnVerPDF")) {
    const btnVer = document.createElement("button");
    btnVer.id = "btnVerPDF";
    btnVer.type = "button";
    btnVer.className = "btn-ver-pdf";
    btnVer.innerHTML = '??? Ver PDF';
    btnVer.onclick = verPDF;
    btnVer.title = "Ver vista previa del PDF generado";

    actions.insertBefore(btnVer, actions.firstChild);
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});




