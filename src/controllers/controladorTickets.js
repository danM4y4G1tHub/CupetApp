const { Combustible } = require("../models/combustible.modelo");
const { Ticket } = require("../models/ticket.modelo");
const { Vehiculo } = require("../models/vehiculo.modelo");
const { ControladorVehiculo } = require("../controllers/controladorVehiculo");

const ControladorTicket = {};

let acumuladoB94 = 0;
let acumuladoB90 = 0;
let acumuladoB83 = 0;
let acumuladoDR = 0;

ControladorTicket.solicitudTicket = async (req, res) => {
  const { user } = req;

  const ve = await Vehiculo.obtenerDatosVehiculo(user.id);

  const ticket = {
    idU: user.id,
    idV: ve.id,
    idC: "",
    tipoComb: ve.tipo,
    cantidad: Number(ve.capacidad),
    fecha: "",
    estado: "",
  };

  await ControladorTicket.asignarTurno(ticket, res);
};

ControladorTicket.asignarTurno = async (ticket, res) => {
  const fecha = new Date();

  if (ticket.tipoComb === "Gasolina B94") {
    const { id, cantidad } = await Combustible.obtenerCombustible(
      ticket.tipoComb,
    );
    ticket.idC = id;
    acumuladoB94 += Number(ticket.cantidad);
    if (acumuladoB94 < cantidad) {
      ticket.estado = "Activo";
      ticket.fecha = fecha;
    } else {
      ticket.estado = "Pendiente";
      const dia = fecha.getDay() + 10;
      fecha.setDate(dia);
      ticket.fecha = fecha;
    }
  }
  if (ticket.tipoComb === "Gasolina B90") {
    const { id, cantidad } = await Combustible.obtenerCombustible(
      ticket.tipoComb,
    );
    ticket.idC = id;
    acumuladoB90 += Number(ticket.cantidad);
    if (acumuladoB90 < cantidad) {
      ticket.estado = "Activo";
      ticket.fecha = fecha;
    } else {
      ticket.estado = "Pendiente";
      const dia = fecha.getDay() + 10;
      fecha.setDate(dia);
      ticket.fecha = fecha;
    }
  }
  if (ticket.tipoComb === "Gasolina B83") {
    const { id, cantidad } = await Combustible.obtenerCombustible(
      ticket.tipoComb,
    );
    ticket.idC = id;
    acumuladoB83 += Number(ticket.cantidad);
    if (acumuladoB83 < cantidad) {
      turticketno.estado = "Activo";
      ticket.fecha = fecha;
    } else {
      ticket.estado = "Pendiente";
      const dia = fecha.getDay() + 10;
      fecha.setDate(dia);
      ticket.fecha = fecha;
    }
  }
  if (ticket.tipoComb === "Diesel Regular") {
    const { id, cantidad } = await Combustible.obtenerCombustible(
      ticket.tipoComb,
    );
    ticket.idC = id;
    acumuladoDR += Number(ticket.cantidad);
    if (acumuladoDR < cantidad) {
      ticket.estado = "Activo";
      ticket.fecha = fecha;
    } else {
      ticket.estado = "Pendiente";
      const dia = fecha.getDay() + 10;
      fecha.setDate(dia);
      ticket.fecha = fecha;
    }
  }
  if (await Ticket.crearTicket(ticket)) {
    res.redirect("/cargar-panel-control");
  }
};

ControladorTicket.verTicket = async (req, res) => {
  const { user } = req;
  const datos = await Ticket.obtenerDatosTicket(user.id);
  const info = await Vehiculo.obtenerDatosVehiculo(user.id);

  if (datos !== null) {
    const turnoC = {
      categoria: info.categoria,
      estado: datos.estado,
      fecha: datos.fecha
    }
    res.render("panelControl", {
      turnoC,
      ticket: true,
      cliente: true,
      login: true,
    });
  } else {
    res.redirect("/cargar-panel-control");
  }
};

module.exports = {
  ControladorTicket,
};
