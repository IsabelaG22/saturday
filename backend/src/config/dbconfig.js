// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config();

// let connection;

// export async function connectDB() {
//   if (!connection) {
//     try {
//       connection = await mysql.createConnection({
//         host: process.env.DB_HOST || "127.0.0.1",
//         user: process.env.DB_USER || "root",
//         password: process.env.DB_PASSWORD || "",
//         database: process.env.DB_NAME || "saturday",
//       });

//       console.log("✅ Conectado a la base de datos MySQL");

//       // Crear tabla si no existe
//       await connection.execute(`
//   CREATE TABLE IF NOT EXISTS usuarios (
//     Idcedula INT PRIMARY KEY NOT NULL,
//     foto VARCHAR(255) NULL,
//     nombre VARCHAR(100) NOT NULL,
//     email VARCHAR(100) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     cargo VARCHAR(100) NOT NULL
//   )
// `);


//       console.log("✅ Tabla 'usuarios' verificada/creada");
//     } catch (error) {
//       console.error("❌ Error al conectar a la base de datos:", error);
//       process.exit(1);
//     }
//   }
//   return connection;
// }
