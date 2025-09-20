// public/js/tablero.js

async function actualizarCampo(id, campo, valor, fila) {
  try {
    const body = (campo === "responsible") ? { responsibleId: valor } : { [campo]: valor };
    const res = await fetch(`/requerimientos/${id}/update`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.message || "Error server");

    if (campo === "status") moverFila(fila, valor);
  } catch (err) {
    console.error("Error actualizando:", err);
    alert("Error actualizando (mira consola)");
  }
}

function moverFila(fila, nuevoEstado) {
  const compromBody = document.getElementById("compromiso-body");
  const implemBody = document.getElementById("implementacion-body");
  const qaBody = document.getElementById("qa-body");

  if (!compromBody || !implemBody || !qaBody) return; // protege si no existe el tablero

  fila.classList.add("fade-out");
  setTimeout(() => {
    if (nuevoEstado === "compromiso") compromBody.appendChild(fila);
    if (nuevoEstado === "implementacion") implemBody.appendChild(fila);
    if (nuevoEstado === "qa/revision") qaBody.appendChild(fila);

    fila.classList.remove("fade-out");
    fila.classList.add("fade-in");
    setTimeout(() => fila.classList.remove("fade-in"), 600);
  }, 450);
}

// Escucha cambios en selects
document.body.addEventListener("change", e => {
  const target = e.target;
  if (target.classList.contains("estado-select")) {
    actualizarCampo(target.dataset.id, "status", target.value, target.closest("tr"));
  }
  if (target.classList.contains("responsable-select")) {
    actualizarCampo(target.dataset.id, "responsible", target.value, target.closest("tr"));
  }
});

// Escucha actualización de responsables
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".responsable-select").forEach(select => {
    select.addEventListener("change", async (e) => {
      const requirementId = e.target.dataset.id;
      const newResponsible = e.target.value;

      try {
        const res = await fetch(`/requerimientos/${requirementId}/responsable`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ responsible: newResponsible })
        });

        const data = await res.json();
        if (data.ok) {
          console.log("✅ Responsable actualizado en la BD");
        } else {
          console.error("⚠️ Error:", data.message);
        }
      } catch (err) {
        console.error("❌ Error en fetch:", err);
      }
    });
  });
});
