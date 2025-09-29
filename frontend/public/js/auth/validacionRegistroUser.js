// Validación formulario registro usuario
function mostrarError(campo, mensaje) {
  if (campo.nextElementSibling && campo.nextElementSibling.classList.contains("error-mensaje")) return;
  const error = document.createElement("p");
  error.classList.add("error-mensaje");
  error.textContent = mensaje;
  campo.insertAdjacentElement("afterend", error);
}
