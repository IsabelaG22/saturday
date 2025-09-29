import express from "express";
import bcrypt from "bcrypt";   // Para comparar contraseñas encriptadas
import User from "../models/usuariosModel.js"; // usuariosModel.js

const router = express.Router();

// Ruta POST para login
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

    // Redirigir según rol
    let redirectUrl = "/";
    if (user.role === "T1") redirectUrl = "/tableroT1";
    else if (user.role === "T2") redirectUrl = "/tableroT2";
    else if (user.role === "admin") redirectUrl = "/requerimientos";

    // 👉 Enviamos también el rol y email al frontend
    res.json({
      success: true,
      redirectUrl,
      role: user.role,
      email: user.email
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
});

export default router;
