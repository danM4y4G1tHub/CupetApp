const { Vehiculo } = require("../models/vehiculo.modelo");

const ControladorVehiculo = {};

ControladorVehiculo.vistaRegistrarVehiculo = () => {
  res.render("registrarVehiculo", { layout: "login" });
};

ControladorVehiculo.registrarVehiculo = async (req, res, next) => {
  if (await Vehiculo.crearVehiculo(req.body)) {
    res.redirect("/perfil-usuario");
  }
};

ControladorVehiculo.listarVehiculos = async (req, res) => {};

module.exports = { ControladorVehiculo };
