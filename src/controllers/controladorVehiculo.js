const { Vehiculo } = require("../models/vehiculo.modelo");

const ControladorVehiculo = {};

ControladorVehiculo.vistaRegistrarVehiculo = (req, res) => {
  res.render("registrarVehiculo", { layout: "login" });
};

ControladorVehiculo.registrarVehiculo = async (req, res) => {
  const { body, user } = req;
  body.idUser = user.id;
  const vehiculo = await Vehiculo.crearVehiculo(req.body);

  if (vehiculo.creado) {
    res.redirect("/cargar-panel-control");
  }
};

ControladorVehiculo.listarVehiculos = async (req, res) => {
  const datos = await Vehiculo.obtenerVehiculos();
  res.render("panelControl", { datos, admin: true, movil: true });
};

module.exports = { ControladorVehiculo };
