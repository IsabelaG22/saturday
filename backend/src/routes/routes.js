import { Router } from 'express';  //Llamamos solo al modulo router que se encuentra en express
import usuarioRoutes from "./routesUsuarios.js";
import requerimientoRouter from './routesRequerimientos.js';
import loginRouter from './routeLogin.js'
const router = Router();

router.get('/', (req, res) => res.render('index')); //con el metodo get, le decimos que cuando alguien entre a la raiz del servidor, le envie un mensaje que seria el send
// router.get('/tablero-t1', (req, res) => res.render('tableroT1'));
// router.get('/tablero-t2', (req, res) => res.render('tableroT2'));
router.get('/tableros', (req, res) => res.render('panelTableros'));

router.get("/admin", (req, res) => {
    res.render("pantallaAdmin"); // EJS con vista para admin
});


router.use(usuarioRoutes); // aquí conectas todas las rutas de usuarios
router.use(requerimientoRouter); // aquí conectas todas las rutas de requerimientos
router.use(loginRouter)



export default router; //exportamos el router para usarlo en app.js