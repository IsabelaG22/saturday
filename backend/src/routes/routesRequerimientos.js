import express from "express";
import Requirement from "../models/requerimientosModel.js"; //  requerimientosModel.js
const router = express.Router();
import User from "../models/usuariosModel.js";

router.post("/requerimientos", async (req, res) => {
  try {
    await Requirement.sync(); // opcional si la tabla ya existe

    const createRequirement = await Requirement.create({
      name: "Nueva página-rediseño",   // nombre
      description: "Ayuda creando página cuenta del mar", // descripción
      status: "compromiso",                   // estado inicial
      responsible: null,              // responsable
      typology: "T2",                         // T1 o T2
      start_date: null,                       // aún no inicia
      end_date: null,                         // aún no termina
      created_at: new Date(),                 // fecha de creación
    });

    res.status(201).json({
      ok: true,
      status: 201,
      message: "Requirement created successfully",
      body: createRequirement
    });
  } catch (error) {
    console.error("❌ Error creando requerimiento:", error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error creando requerimiento",
      error: error.message
    });
  }
});



// Tablero T1
router.get("/tableroT1", async (req, res) => {
  try {
    // Requerimientos SOLO de tipología T1
    const reqs = await Requirement.findAll({
      where: { typology: "T1" }
    });

    // Usuarios SOLO con role T1
    const usersRaw = await User.findAll({
      where: { role: "T1" }
    });

    // Convertir a objetos planos
    const users = usersRaw.map(u => u.toJSON ? u.toJSON() : u);

    // Asociar cada requerimiento con user responsable
    const requerimientos = reqs.map(r => {
      const rr = r.toJSON ? r.toJSON() : r;
      const match = users.find(u => {
        const fullname = `${(u.first_name || "").trim()}${u.last_name ? " " + u.last_name.trim() : ""}`.trim();
        return fullname && (
          fullname === (rr.responsible || "").trim() ||
          u.first_name === (rr.responsible || "").trim()
        );
      });
      rr.responsible_id = match ? match.id_document : null; // 👈 ojo: usa la PK real
      return rr;
    });

    const estados = ["compromiso", "implementacion", "qa/revision"];

    res.render("tableroT1", {
      requerimientos,
      users,
      estados
    });
  } catch (error) {
    console.error("❌ Error cargando tablero T1:", error);
    res.status(500).send("Error cargando tablero T1");
  }
});

// ✅ Actualizar responsable de un requerimiento
router.put("/requerimientos/:id/responsable", async (req, res) => {
  try {
    const { id } = req.params;
    const { responsible } = req.body;

    const reqUpdated = await Requirement.update(
      { responsible },
      { where: { id } }
    );

    if (reqUpdated[0] === 0) {
      return res.status(404).json({ ok: false, message: "Requerimiento no encontrado" });
    }

    res.json({ ok: true, message: "Responsable actualizado correctamente" });
  } catch (error) {
    console.error("❌ Error actualizando responsable:", error);
    res.status(500).json({ ok: false, message: "Error en el servidor" });
  }
});





// Tablero T2
// ✅ Ruta tablero T2
router.get("/tableroT2", async (req, res) => {
  try {
    // Traer requerimientos SOLO de typology T2
    const reqs = await Requirement.findAll({
      where: { typology: "T2" }
    });

    // Traer usuarios con cargo/rol T2
    const usersRaw = await User.findAll({
      where: { role: "T2" }   // 👈 ajusta "role" si tu campo se llama "cargo"
    });

    const users = usersRaw.map(u => u.toJSON ? u.toJSON() : u);

    // Asociar requerimiento con usuario responsable
    const requerimientos = reqs.map(r => {
      const rr = r.toJSON ? r.toJSON() : r;

      const match = users.find(u => {
        const fullname = `${(u.first_name || "").trim()}${u.last_name ? ' ' + u.last_name.trim() : ''}`.trim();
        return fullname && (
          fullname === (rr.responsible || "").trim() ||
          u.id === rr.responsible_id // si ya lo tienes guardado como id
        );
      });

      rr.responsible_id = match ? match.id : null;
      return rr;
    });

    const estados = ["compromiso", "implementacion", "qa/revision"];

    res.render("tableroT2", {
      requerimientos,
      users,
      estados
    });
  } catch (error) {
    console.error("❌ Error cargando tablero T2:", error);
    res.status(500).send("Error cargando tablero T2");
  }
});


// ✅ Actualizar requerimiento (estado o responsable)
// backend/routes/requerimientos.js
router.patch("/requerimientos/:id/update", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, responsible } = req.body;

    const requerimiento = await Requirement.findByPk(id);
    if (!requerimiento) {
      return res.status(404).json({ ok: false, message: "Requerimiento no encontrado" });
    }

    // 👇 Actualiza estado
    if (status) {
      requerimiento.status = status;

      if (status === "implementacion" && !requerimiento.start_date) {
        requerimiento.start_date = new Date();
      }
      if (status === "qa/revision" && !requerimiento.end_date) {
        requerimiento.end_date = new Date();
      }
    }

    // 👇 Actualiza responsable (texto)
    if (responsible !== undefined) {
      requerimiento.responsible = responsible;
    }

    await requerimiento.save();

    res.json({ ok: true, message: "Requerimiento actualizado", requerimiento });
  } catch (error) {
    console.error("❌ Error actualizando requerimiento:", error);
    res.status(500).json({ ok: false, message: "Error actualizando requerimiento" });
  }
});





export default router;
