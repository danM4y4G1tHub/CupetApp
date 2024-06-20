const { FacturaRecepcion } = require("../models/facturaRecepcion.modelo");

const ControladorRecepciones = {};

ControladorRecepciones.listarRecepciones = async (_, res) => {
  const datos = await FacturaRecepcion.obtenerFacturasRecepcion();
  res.render("panelControl", { datos, admin: true, recepcion: true });
};

module.exports = {
  ControladorRecepciones,
};
