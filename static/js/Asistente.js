const CHAT_EMAIL = "contacto@municipio.demo";
const MAX_PALABRAS_SUG = 300;

function toggleAssistant() {
  const panel = document.getElementById("assistantPanel");
  if (!panel) return;
  panel.classList.toggle("chat-open");
}

function openChatView(view) {
  const views = document.querySelectorAll(".chat-view");
  views.forEach((v) => v.classList.remove("chat-view-active"));

  switch (view) {
    case "queja":
      document
        .getElementById("chatViewQueja")
        .classList.add("chat-view-active");
      break;
    case "sugerencia":
      document
        .getElementById("chatViewSugerencia")
        .classList.add("chat-view-active");
      break;
    case "contacto":
      document
        .getElementById("chatViewContacto")
        .classList.add("chat-view-active");
      break;
    case "horarios":
      document
        .getElementById("chatViewHorarios")
        .classList.add("chat-view-active");
      break;
    default:
      document
        .getElementById("chatViewMenu")
        .classList.add("chat-view-active");
  }
}

function enviarQueja(event) {
  event.preventDefault();

  const nombre = document.getElementById("quejaNombre").value.trim();
  const correo = document.getElementById("quejaCorreo").value.trim();
  const area = document.getElementById("quejaArea").value.trim();
  const descripcion = document
    .getElementById("quejaDescripcion")
    .value.trim();

  if (!nombre || !correo || !area || !descripcion) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const asunto = "Queja ciudadana - Sitio web Portal Institucional Municipal";
  const cuerpo =
    "Se ha recibido una QUEJA desde el sitio web.\n\n" +
    "Nombre: " +
    nombre +
    "\n" +
    "Correo de contacto: " +
    correo +
    "\n" +
    "�rea seleccionada: " +
    area +
    "\n\n" +
    "Descripci�n de la queja:\n" +
    descripcion +
    "\n";

  const mailto =
    "mailto:" +
    CHAT_EMAIL +
    "?subject=" +
    encodeURIComponent(asunto) +
    "&body=" +
    encodeURIComponent(cuerpo);

  window.location.href = mailto;

  alert("Tu queja ser� enviada mediante tu aplicaci�n de correo.");
  openChatView("menu");
}

function contarPalabras(texto) {
  if (!texto) return 0;
  return texto
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function actualizarContadorSugerencia() {
  const textarea = document.getElementById("sugTexto");
  const texto = textarea.value;
  const usadas = contarPalabras(texto);
  const restantes = Math.max(0, MAX_PALABRAS_SUG - usadas);
  const spanRestantes = document.getElementById("sugRestantes");

  if (spanRestantes) {
    spanRestantes.textContent = restantes;
  }

  if (usadas > MAX_PALABRAS_SUG) {
    const palabras = texto.trim().split(/\s+/).slice(0, MAX_PALABRAS_SUG);
    textarea.value = palabras.join(" ");
  }
}

function enviarSugerencia(event) {
  event.preventDefault();

  const nombre = document.getElementById("sugNombre").value.trim();
  const texto = document.getElementById("sugTexto").value.trim();

  if (!texto) {
    alert("Por favor escribe tu sugerencia.");
    return;
  }

  const palabras = contarPalabras(texto);
  if (palabras > MAX_PALABRAS_SUG) {
    alert(
      "La sugerencia debe tener m�ximo " + MAX_PALABRAS_SUG + " palabras."
    );
    return;
  }

  const asunto = "Sugerencia ciudadana - Sitio web Portal Institucional Municipal";
  const cuerpo =
    "Se ha recibido una SUGERENCIA desde el sitio web.\n\n" +
    (nombre ? "Nombre: " + nombre + "\n\n" : "") +
    "Sugerencia:\n" +
    texto +
    "\n";

  const mailto =
    "mailto:" +
    CHAT_EMAIL +
    "?subject=" +
    encodeURIComponent(asunto) +
    "&body=" +
    encodeURIComponent(cuerpo);

  window.location.href = mailto;

  alert("Tu sugerencia ser� enviada mediante tu aplicaci�n de correo.");
  openChatView("menu");
}





