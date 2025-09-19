import express from "express";
import Requirement from "../models/requerimientosModel.js"; //  requerimientosModel.js
const router = express.Router();

router.post('/requerimientos', async (req, res) => {
  await Requirement.sync(); // sincroniza el modelo (opcional si ya existe la tabla)

  const createRequirement = await Requirement.create({
    name: 'Orphan URL',        //  nombre
    status: 'commitment',      //  estado
    responsible: 'Pedro Lopez',//  responsable
    created_at: new Date(),    //  fecha
    type: 'T1',                //  tipo
  });

  res.status(201).json({
    ok: true,
    status: 201,
    message: "Requirement created successfully",
    body: createRequirement
  });
});

export default router;
