// Validación frontend login
function validarLogin(email, password, emailError, passwordError) {
  let valido = true;
  emailError.textContent = "";
  passwordError.textContent = "";

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
  return valido;
}
