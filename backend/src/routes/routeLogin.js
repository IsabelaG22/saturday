import express from "express";
import bcrypt from "bcrypt";   // Para comparar contraseñas encriptadas
import Requirement from "../models/requerimientosModel.js"; //  requerimientosModel.js
const router = express.Router();


// Ruta POST para login
// --- LOGIN ---
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ success: false, message: "Usuario no encontrado" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
    }

    // Redirigir según el rol
    let redirectUrl = "/";
    if (user.role === "t1") redirectUrl = "/t1";
    else if (user.role === "t2") redirectUrl = "/t2";
    else if (user.role === "admin") redirectUrl = "/admin";

    res.json({ success: true, redirectUrl });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
});

export default router;
