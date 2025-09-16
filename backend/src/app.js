import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

import indexRoutes from './routes/routes.js'; 
// import { connectDB } from './config/dbconfig.js'; 

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('views', join(__dirname, '../../frontend/views/pages/'));
app.set('view engine', 'ejs');
app.use(express.static(join(__dirname, '../../frontend/public')));

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Rutas
app.use(indexRoutes);

// Arranque del servidor
const PORT = process.env.PORT || 3000;


  app.listen(PORT, () => {
    console.log(`---------------------------Servidor corriendo en http://localhost:${PORT}------------------`);
  });
//   connectDB().then(() => {
// });
