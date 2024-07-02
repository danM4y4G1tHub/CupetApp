const { Combustible } = require("../models/combustible.modelo");
const { FacturaRecepcion } = require("../models/facturaRecepcion.modelo");

const ControladorRecepciones = {};

ControladorRecepciones.listarRecepciones = async (_, res) => {
  const tipos = await Combustible.obtenerCombustibles();
  const datos = await FacturaRecepcion.obtenerFacturasRecepcion();

  datos.forEach((factura) => {
    const comb = tipos.find((comb) => comb.id === factura.idComb);
    if (comb) {
      factura.tipo = comb.tipo;
    }
  });

  res.render("panelControl", {
    datos,
    admin: true,
    recepcion: true,
    login: true,
  });
};

module.exports = {
  ControladorRecepciones,
};
