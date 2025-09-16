import express from "express";
import Usuario from "../models/usuarios.js";
const router = express.Router();

// Ruta para obtener todos los usuarios

router.post('/usuarios', async (req, res) => {
  await Usuario.sync(); // Sincroniza el modelo con la base de datos

  const createUsuario = await Usuario.create({
    cedula_id: 1922374510,          // cedula_id o id
    nombre: 'Pedro',
    apellido: 'Lopez',
    email: 'pedrolopez@gmail.com',
    password: 'pedro123',
    cargo: 't1'
  });

  res.status(201).json(
    {
      ok: true,
      status: 201,
      message: "Usuario creado exitosamente",
    }
  );

});


export default router; 