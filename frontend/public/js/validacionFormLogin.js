document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let valido = true;

    // Resetear mensajes previos
    emailError.textContent = "";
    passwordError.textContent = "";

    // --- VALIDACIONES FRONTEND ---
    if (email.value.trim() === "") {
      emailError.textContent = "*El correo es obligatorio.";
      valido = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      emailError.textContent = "Ingresa un correo válido.";
      valido = false;
    }

    if (password.value.trim() === "") {
      passwordError.textContent = "*La contraseña es obligatoria.";
      valido = false;
    } else if (password.value.length < 6) {
      passwordError.textContent = "La contraseña debe tener mínimo 6 caracteres.";
      valido = false;
    }

    // --- SI HAY ERRORES, NO SE MANDA AL BACKEND ---
    if (!valido) return;

    // --- LOGIN BACKEND ---
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.value.trim(),
          password: password.value.trim()
        })
      });

      const data = await res.json();

      if (data.success) {
        // 👉 NUEVO: Guardar datos del usuario en localStorage
        localStorage.setItem("user", JSON.stringify({
          email: data.email,
          role: data.role
        }));

        // Redirigir según rol
        window.location.href = data.redirectUrl; 
      } else {
        alert("Error: " + data.message);
      }

    } catch (err) {
      alert("Error en el servidor, intenta más tarde.");
    }
  });
});
