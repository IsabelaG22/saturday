// Envío login a backend
async function enviarLogin(email, password) {
  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    return await res.json();
  } catch (err) {
    throw new Error("Error en el servidor, intenta más tarde.");
  }
}
