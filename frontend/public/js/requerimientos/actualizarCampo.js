async function actualizarCampo(id, campo, valor, fila) {
  try {
    const cuerpo = { [campo]: valor };
    const respuesta = await fetch(`/requerimientos/${id}/update`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cuerpo),
    });
    const datos = await respuesta.json();
    if (!datos.ok) throw new Error(datos.message || "Error en el servidor");
    if (campo === "status") moverFila(fila, valor);
  } catch (err) {
    alert("Error al actualizar (mira consola)");
  }
}
