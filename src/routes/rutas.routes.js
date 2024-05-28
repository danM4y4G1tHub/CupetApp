const express = require("express");
const { ControladorVistas } = require("../controllers/controladorVistas");
const {
  ControladorAutenticar,
} = require("../controllers/controladorAutenticar");
const { ControladorUsuario } = require("../controllers/controladorUsuario");
const { ControladorVehiculo } = require("../controllers/controladorVehiculo");

const router = express.Router();

router
  .get("/", ControladorVistas.index)
  .get("/registrar-cliente", ControladorUsuario.vistaRegistrarCliente)
  .post("/registrar-cliente", ControladorUsuario.registrarCliente)
  .post("/registrar-usuario", ControladorUsuario.registrarUsuario)
  .get("/autenticar-usuario", ControladorAutenticar.autenticarUsuario)
  .post("/autenticar-usuario", ControladorAutenticar.autenticar)
  .get("/cargar-panel-control", ControladorAutenticar.cargarPanelControl)
  .get("/listar-usuarios", ControladorUsuario.listarUsuarios)
  .get("/cerrar-sesion", ControladorAutenticar.cerrarSesion)
  .get("/registrar-vehiculo", ControladorVehiculo.vistaRegistrarVehiculo)
  .post("/registrar-vehiculo", ControladorVehiculo.registrarVehiculo)
  .get("/listar-vehiculos", ControladorVehiculo.listarVehiculos)
  .get("/pedir-ticket")
  .get("/panel-control", ControladorVistas.panelControl);

module.exports = { router };
