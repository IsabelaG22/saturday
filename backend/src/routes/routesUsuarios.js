import express from "express";
import User from "../models/usuariosModel.js"; // usuariosModel.js
const router = express.Router();
import bcrypt from "bcrypt";


// GET all users
// Vista de usuarios
router.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await User.findAll(); // Obtener todos los usuarios
    res.render("usuarios", { usuarios }); // Renderizar vista
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).send("Error en el servidor");
  }
});

// POST Crear nuevo usuario
router.post("/usuarios", async (req, res) => {
  try {
    await User.sync(); // opcional si la tabla ya existe

    const { id_document, first_name, last_name, email, password, role } = req.body;

    // Verificar si ya existe el correo
    const userExist = await User.findOne({ where: { email } });
    if (userExist) {
      return res.send(`
        <script>
          alert("El correo ya está registrado");
          window.history.back(); // vuelve al formulario
        </script>
      `);
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    await User.create({
      id_document,
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role
    });

    // ✅ Registro exitoso → redirige al inicio
    return res.send(`
      <script>
        alert("Usuario registrado con éxito");
        window.location.href = "/";
      </script>
    `);

  } catch (error) {
    console.error("Error en registro:", error);
    return res.send(`
      <script>
        alert("Error en el servidor");
        window.history.back();
      </script>
    `);
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
