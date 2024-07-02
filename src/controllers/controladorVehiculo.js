const { Vehiculo } = require("../models/vehiculo.modelo");

const ControladorVehiculo = {};

ControladorVehiculo.vistaRegistrarVehiculo = (req, res) => {
  res.render("registrarVehiculo", { layout: "login" });
};

ControladorVehiculo.registrarVehiculo = async (req, res) => {
  const { body, user } = req;
  body.idUser = user.id;
  const datos = await Vehiculo.crearVehiculo(req.body);
  let auto = false;
  let camion = false;
  let moto = false;
  let omnibus = false;

  if (datos.categoria === "Automovil") {
    auto = true;
  }
  if (datos.categoria === "Motocicleta") {
    moto = true;
  }
  if (datos.categoria === "Camión") {
    camion = true;
  }
  if (datos.categoria === "Omnibus") {
    omnibus = true;
  }

  if (datos.creado) {
    res.render("panelControl", {
      datos,
      cliente: true,
      login: true,
      auto,
      moto,
      camion,
      omnibus,
    });
  }
};

ControladorVehiculo.listarVehiculos = async (req, res) => {
  const { user } = req;
  const datos = await Vehiculo.obtenerVehiculos();
  if (user.rol === "Dependiente") {
    res.render("panelControl", {
      datos,
      dependiente: true,
      movil: true,
      login: true,
    });
  }
  if (user.rol === "Administrador") {
    res.render("panelControl", {
      datos,
      admin: true,
      movil: true,
      login: true,
    });
  }
};

ControladorVehiculo.verVehiculo = async (req, res) => {
  const { user } = req;
  const datos = await Vehiculo.obtenerDatosVehiculo(user.id);
  let auto = false;
  let camion = false;
  let moto = false;
  let omnibus = false;

  if (datos === null) {
    res.redirect("/cargar-panel-control");
  } else {
    if (datos.categoria === "Automovil") {
      auto = true;
    }
    if (datos.categoria === "Motocicleta") {
      moto = true;
    }
    if (datos.categoria === "Camión") {
      camion = true;
    }
    if (datos.categoria === "Omnibus") {
      omnibus = true;
    }

    res.render("panelControl", {
      vehiculo: true,
      datos,
      auto,
      moto,
      camion,
      omnibus,
      cliente: true,
      login: true,
    });
  }
};

module.exports = { ControladorVehiculo };
