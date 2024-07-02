const { Usuario } = require("../models/usuario.modelo");
const { Combustible } = require("../models/combustible.modelo");
const { FacturaRecepcion } = require("../models/facturaRecepcion.modelo");

const ControladorCombustible = {};

ControladorCombustible.vistaActualizarCombustible = (_, res) => {
  res.render("registrarCombustible", { layout: "login" });
};

ControladorCombustible.crearCombustible = async (req, res) => {
  const { body } = req;
  await Combustible.crearCombustible(body);
  res.redirect("cargar-panel-control");
};

ControladorCombustible.actualizarCombustible = async (req, res, next) => {
  const { body, user } = req;
  const { nombreDistribuidor } = body;
  const { nombre, apellidos } = await Usuario.obtenerNombre(user.id);
  const { idComb, actualizado } = await Combustible.abastecerCombustible(body);
  if (actualizado) {
    const factura = {
      nombreDistribuidor: nombreDistribuidor,
      nombreAdministrador: nombre + " " + apellidos,
      cantidad: body.cantidad,
      idComb: idComb,
    };

    if (await FacturaRecepcion.crearFacturaRecepcion(factura)) {
      next();
    }
  }
};

ControladorCombustible.listarCombustibles = async (_, res) => {
  const datos = await Combustible.obtenerCombustibles();
  res.render("panelControl", { datos, admin: true, comb: true, login: true });
};

ControladorCombustible.despacharCombustible = (req, res) => {
  
}

module.exports = {
  ControladorCombustible,
};
