// import express from "express";
// import sequelize from "./config/database.js";
// import Usuario from "./models/Usuario.js";

// const app = express();
// app.use(express.json());

// // RUTA DE PRUEBA
// app.get("/", (req, res) => {
//   res.send("API funcionando 🚀");
// });

// // Sincronizar la base de datos y levantar servidor
// sequelize.sync({ force: false })  // force: true borra y recrea tablas
//   .then(() => {
//     console.log("✅ Conectado a la base de datos MySQL");
//     app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
//   })
//   .catch(err => console.error("❌ Error de conexión:", err));
