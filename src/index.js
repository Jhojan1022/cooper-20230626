const express = require("express");
const cookieParser = require('cookie-parser');
const session = require('express-session');
let morgan = require("morgan")
let usuariosController = require("./controllers/usuarios")
let miactividadController = require("./controllers/miactividadController")
let actividadesController = require("./controllers/actividadesController")
let horariosController = require("./controllers/horariosController")
let mirendimientoController = require("./controllers/mirendimientoController")
let informesController = require("./controllers/informesController")
let administradorController = require("./controllers/administradorController")
let coordinacionController = require("./controllers/coordinacionesController")

let app = express();

const port = 9000;
// sessiones
app.use(session({
    secret: 'colfondos',
    resave: false,
    saveUninitialized: false
}));

// Motores de vistas

app.set("view engine", "ejs")
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/views/public'));
app.use(morgan('combined'))

function logger(req, res, next) {
    if (req.path == '/login' || req.path == '/validationLogin' && req.session.user == undefined) {
        next()
    } else if (req.session.user == undefined) {
        req.path = '/login'
        res.render('login')
    } else {
        next()
    }
}

app.use(logger)

app.get("/login", usuariosController.loginView)
app.all("/validationLogin", usuariosController.login)
app.get("/", usuariosController.usuarios)
app.get("/mi_actividad", miactividadController.miactividadView)
app.get("/administrador", administradorController.adminstradorView)
app.get("/getActivities", actividadesController.getActividades)
app.get("/miRendimiento", mirendimientoController.miRendimientoView)
app.get("/informes", informesController.informesView)

app.all("/createUser", usuariosController.createUser);
app.all("/ingresoLaboral", horariosController.registrarIngreso);
app.all("/salidaLaboral", horariosController.registrarSalida);
app.all("/iniciarActividad", actividadesController.iniciarActividad);
app.all("/finalizarActividad", actividadesController.finalizarActividad);
app.all("/cerrarActividades", actividadesController.cerrarActividades);
app.all("/actualizarActividad", actividadesController.actualizaActividad);
app.all("/justificarAusencia", actividadesController.ausenciaJustificada);
app.all("/crearCoordinacion", coordinacionController.crearCoordinacion);
app.all("/crearActividad", actividadesController.crearActividad);

const server = app.listen(port || process.env.port, () => {
    server.timeout = 30000; // Establece el tiempo de espera a 30 segundos
    console.log("Servidor en puerto " + port);
});