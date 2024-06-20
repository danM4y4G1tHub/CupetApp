const express = require("express");
const { auth } = require("../helpers/auth");
const { ControladorVistas } = require("../controllers/controladorVistas");
const {
  ControladorAutenticar,
} = require("../controllers/controladorAutenticar");
const { ControladorUsuario } = require("../controllers/controladorUsuario");
const { ControladorVehiculo } = require("../controllers/controladorVehiculo");
const {
  ControladorCombustible,
} = require("../controllers/controladorCombustible");
const {
  ControladorRecepciones,
} = require("../controllers/controladorRecepcion");

const router = express.Router();

// Rutas para Vistas
router
  .get("/", ControladorVistas.index)
  .get(
    "/cargar-panel-control",
    auth.logeado,
    ControladorAutenticar.cargarPanelControl,
  )
  .get("/autenticar-usuario", ControladorAutenticar.autenticarUsuario)
  .post("/autenticar-usuario", ControladorAutenticar.autenticar)
  .get("/cerrar-sesion", ControladorAutenticar.cerrarSesion)
  .get("/registrar-cliente", ControladorUsuario.vistaRegistrarCliente)
  .post("/registrar-cliente", ControladorUsuario.registrarCliente)
  .post("/registrar-usuario", ControladorUsuario.registrarUsuario)
  .get("/listar-usuarios", auth.logeado, ControladorUsuario.listarUsuarios)
  .get(
    "/registrar-vehiculo",
    auth.logeado,
    ControladorVehiculo.vistaRegistrarVehiculo,
  )
  .post(
    "/registrar-vehiculo",
    auth.logeado,
    ControladorVehiculo.registrarVehiculo,
  )
  .get("/listar-vehiculos", auth.logeado, ControladorVehiculo.listarVehiculos)
  .get("/pedir-ticket", auth.noLogeado)
  .get(
    "/listar-combustibles",
    auth.logeado,
    ControladorCombustible.listarCombustibles,
  )
  .get(
    "/recepcionar-combustible",
    auth.logeado,
    ControladorCombustible.vistaActualizarCombustible,
  )
  .post(
    "/recepcionar-combustible",
    auth.logeado,
    ControladorCombustible.actualizarCombustible,
  )
  .get("/listar-recepciones", ControladorRecepciones.listarRecepciones);

// Rutas para Estadisticas

// TODO: hacer pagina 404
// .get("/*", (req, res) => {
//   return res.json({ message: "404" });
// });

module.exports = { router };
