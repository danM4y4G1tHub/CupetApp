const { Usuario } = require("../models/usuario.modelo");
const { Vehiculo } = require("../models/vehiculo.modelo");
const { Combustible } = require("../models/combustible.modelo");
const { Ticket } = require("../models/ticket.modelo");
const { FacturaRecepcion } = require("../models/facturaRecepcion.modelo");

const ControladorEstadisticas = {};

ControladorEstadisticas.mostrarEstadisticas = async () => {
  const estadisticas = {
    usuarios: await Usuario.contarUsuarios(),
    vehiculos: await Vehiculo.contarVehiculos(),
    combustibles: await Combustible.medirCombustibles(),
    tickets: await Ticket.contarTickets(),
    abastecimientos: await FacturaRecepcion.contarRecepciones(),
  };

  res.render("panelControl", {
    estadisticas,
    admin: true,
    login: true,
    tabla: false,
  });
};
