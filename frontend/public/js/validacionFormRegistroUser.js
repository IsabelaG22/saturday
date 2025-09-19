document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector(".formulario-registro");
    const inputDocumento = document.getElementById("id_documento");

    // 🔹 Restringir a máximo 10 dígitos en vivo
    inputDocumento.addEventListener("input", () => {
        // Quitar cualquier carácter que no sea número
        inputDocumento.value = inputDocumento.value.replace(/\D/g, "");

        // Limitar a máximo 10 dígitos
        if (inputDocumento.value.length > 10) {
            inputDocumento.value = inputDocumento.value.slice(0, 10);
        }
    });

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        let valido = true;

        // Limpiar errores previos
        formulario.querySelectorAll(".error-mensaje").forEach(el => el.remove());

        formulario.querySelectorAll("input, select").forEach(campo => {
            // Si está vacío → mensaje obligatorio
            if (!campo.value.trim()) {
                mostrarError(campo, "*Este campo es obligatorio");
                valido = false;
            } else {
                // Validar cédula (solo números y máximo 10 dígitos)
                if (campo.id === "id_documento") {
                    if (!/^\d{1,10}$/.test(campo.value)) {
                        mostrarError(campo, "La cédula debe tener solo números y máximo 10 dígitos");
                        valido = false;
                    }
                }

                // Validar nombre y apellido (solo letras y espacios)
                if (campo.id === "nombre" || campo.id === "apellido") {
                    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(campo.value)) {
                        mostrarError(campo, "Solo se permiten letras");
                        valido = false;
                    }
                }

                // Validar email
                if (campo.type === "email") {
                    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!regexCorreo.test(campo.value)) {
                        mostrarError(campo, "Ingresa un correo válido");
                        valido = false;
                    }
                }

                // Validar contraseña (mínimo 6 caracteres)
                if (campo.type === "password") {
                    if (campo.value.length < 6) {
                        mostrarError(campo, "La contraseña debe tener al menos 6 caracteres");
                        valido = false;
                    }
                }
            }
        });

        if (valido) {
            formulario.submit();
        }
    });

    function mostrarError(campo, mensaje) {
        // Si ya existe un mensaje de error, no lo duplicamos
        if (campo.nextElementSibling && campo.nextElementSibling.classList.contains("error-mensaje")) {
            return;
        }

        const error = document.createElement("p");
        error.classList.add("error-mensaje");
        error.textContent = mensaje;
        campo.insertAdjacentElement("afterend", error);
    }
});
