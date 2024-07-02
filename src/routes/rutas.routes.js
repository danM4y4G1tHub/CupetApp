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
const { ControladorTrazas } = require("../controllers/controladorDeTrazas");
const { ControladorTicket } = require("../controllers/controladorTickets")

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
  .get("/registrar-dependiente", ControladorUsuario.vistaRegistrarDependiente)
  .get("/editar-usuario", ControladorUsuario.vistaEditarUsuario)
  .post("/registrar-cliente", ControladorUsuario.registrarCliente)
  .post("/registrar-usuario", ControladorUsuario.registrarUsuario)
  .post(
    "/registrar-dependiente",
    auth.logeado,
    ControladorUsuario.registrarDependiente,
  )
  .post(
    "/registrar-usuario-dependiente",
    ControladorUsuario.registrarUsuarioDependiente,
  )
  .post("/eliminar-usuario", ControladorUsuario.eliminarUsuario)
  .post("/editar-usuario", ControladorUsuario.editarUsuario)
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
  .get("/ver-vehiculo", ControladorVehiculo.verVehiculo)
  .get("/ver-ticket", ControladorTicket.verTicket)
  .get("/listar-vehiculos", auth.logeado, ControladorVehiculo.listarVehiculos)
  .get("/pedir-ticket", auth.logeado, ControladorTicket.solicitudTicket)
  .get("/listar-ventas", auth.logeado)
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
    ControladorTrazas.registrarTraza,
  )
  .post("/atender-cliente", ControladorCombustible.despacharCombustible)
  .get("/listar-recepciones", ControladorRecepciones.listarRecepciones)
  .get("/listar-trazas", auth.logeado, ControladorTrazas.listarTrazas);
// .get(
//   "estadisticas",
//   ControladorUsuario,
//   ControladorVehiculo,
//   ControladorCombustible,
// );

// Rutas para Estadisticas

// TODO: hacer pagina 404
// .get("/*", (req, res) => {
//   return res.json({ message: "404" });
// });

module.exports = { router };
