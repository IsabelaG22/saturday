function moverFila(fila, nuevoEstado) {
  const compromiso = document.getElementById("compromiso-body");
  const implementacion = document.getElementById("implementacion-body");
  const qa = document.getElementById("qa-body");
  if (!compromiso || !implementacion || !qa) return;
  fila.classList.add("fade-out");
  setTimeout(() => {
    if (nuevoEstado === "compromiso") compromiso.appendChild(fila);
    if (nuevoEstado === "implementacion") implementacion.appendChild(fila);
    if (nuevoEstado === "qa/revision") qa.appendChild(fila);
    fila.classList.remove("fade-out");
    fila.classList.add("fade-in");
    setTimeout(() => fila.classList.remove("fade-in"), 600);
  }, 450);
}
