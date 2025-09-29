// Modal registro requerimiento
function inicializarModalRequerimiento() {
  const modal = document.getElementById("registroRequirementModal");
  const openModalBtn = document.getElementById("openModal");
  const closeModalBtn = document.getElementById("closeModal");

  openModalBtn.addEventListener("click", () => { modal.style.display = "flex"; });
  closeModalBtn.addEventListener("click", () => { modal.style.display = "none"; });
  window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });
}
document.addEventListener("DOMContentLoaded", inicializarModalRequerimiento);
