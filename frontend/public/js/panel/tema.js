const toggle = document.getElementById("cambioTema");
const body = document.body;
function aplicarTema(tema) {
  if (tema === "dark") {
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
  } else {
    body.classList.add("light-mode");
    body.classList.remove("dark-mode");
  }
  localStorage.setItem("tema", tema);
}
document.addEventListener("DOMContentLoaded", () => {
  const temaGuardado = localStorage.getItem("tema") || "light";
  aplicarTema(temaGuardado);
});
toggle.addEventListener("click", () => {
  if (body.classList.contains("dark-mode")) {
    aplicarTema("light");
  } else {
    aplicarTema("dark");
  }
});
