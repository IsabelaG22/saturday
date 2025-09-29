document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("No has iniciado sesión");
    window.location.href = "/";
    return;
  }
  if (user.role === "admin") {
    const usuariosLink = document.getElementById("usuariosLink");
    if (usuariosLink) usuariosLink.style.display = "block";
    const requerimientosLink = document.getElementById("requerimientosLink");
    if (requerimientosLink) requerimientosLink.style.display = "block";
  }
});
