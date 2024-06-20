const { Usuario } = require("../models/usuario.modelo");
const { Combustible } = require("../models/combustible.modelo");
const { FacturaRecepcion } = require("../models/facturaRecepcion.modelo");

const ControladorCombustible = {};

ControladorCombustible.vistaActualizarCombustible = (_, res) => {
  res.render("registrarCombustible", { layout: "login" });
};

ControladorCombustible.actualizarCombustible = async (req, res) => {
  const { body, user } = req;
  const { nombreDistribuidor } = body;
  const { nombre } = await Usuario.obtenerNombre(user.id);
  const { idComb, actualizado } = await Combustible.abastecerCombustible(body);
  if (actualizado) {
    const factura = {
      nombreDistribuidor: nombreDistribuidor,
      nombreAdministrador: nombre,
      cantidad: body.cantidad,
      idComb: idComb,
    };
    await FacturaRecepcion.crearFacturaRecepcion(factura);
  }

  res.redirect("/cargar-panel-control");
};

ControladorCombustible.listarCombustibles = async (_, res) => {
  const datos = await Combustible.obtenerCombustibles();
  res.render("panelControl", { datos, admin: true, comb: true });
};

module.exports = {
  ControladorCombustible,
};
