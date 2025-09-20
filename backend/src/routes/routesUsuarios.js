import express from "express";
import User from "../models/usuariosModel.js"; // usuariosModel.js
const router = express.Router();
import bcrypt from "bcrypt";


// GET all users
router.get('/usuarios', async (req, res) => {
  const users = await User.findAll(); // Busca todos los usuarios
  res.status(200).json({
    ok: true,
    status: 200,
    message: "Users retrieved successfully",
    body: users
  });
});

// POST Crear nuevo usuario
router.post("/usuarios", async (req, res) => {
  try {
    await User.sync(); // opcional si la tabla ya existe

     const { id_document, first_name, last_name, email, password, role } = req.body;


    // Verificar si ya existe el correo
    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return res.status(400).json({ success: false, message: "El correo ya está registrado" });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await User.create({
      id_document,
      first_name,
      last_name,
      email,
      password: hashedPassword, // Guardamos encriptada
      role
    });

    res.json({ success: true, message: "Usuario registrado con éxito", user: newUser });

  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
});

// PUT update user (ejemplo de estructura)
// router.put('/users/:id_card', async (req, res) => {
//   try {
//     const { first_name, last_name, email, password, role } = req.body;

//     const updated = await User.update(
//       { first_name, last_name, email, password, role },
//       { where: { id_card: req.params.id_card } }
//     );

//     if (updated[0] === 0) {
//       return res.status(404).send("User not found");
//     }

//     res.status(200).send("User updated successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error updating user");
//   }
// });

export default router;
