const { TrazaCombustible } = require("../models/trazaCombustible.modelo");
const { Usuario } = require("../models/usuario.modelo");

const ControladorTrazas = {};

ControladorTrazas.registrarTraza = async (req, res) => {
  const { user, body } = req;
  const descripcion = "",
    tipoOperacion = "";

  ControladorTrazas.prepararDatos(body, descripcion, tipoOperacion);

  body.idUser = user.id;

  if (await TrazaCombustible.crearTraza(body)) {
    res.redirect("/cargar-panel-control");
  }
};

ControladorTrazas.prepararDatos = (body, descripcion, tipoOperacion) => {
  const { cantidad, tipo } = body;
  if (cantidad > 100) {
    descripcion = "Abastecimiento del Combustible: " + tipo;
    tipoOperacion = "Actualización, incremento del combustible actual";
  } else {
    descripcion = "Despacho del Combustible: " + tipo;
    tipoOperacion = "Actualización, disminución del combustible actual";
  }
  body.descripcion = descripcion;
  body.tipoOperacion = tipoOperacion;
};

ControladorTrazas.listarTrazas = async (_, res) => {
  const datos = await TrazaCombustible.obtenerTrazas();
  const users = await Usuario.obtenerUsuarios();

  datos.forEach((traza) => {
    const user = users.find((user) => user.id === traza.idUser);
    if (user) {
      traza.rol = user.rol;
    }
  });
  res.render("panelControl", { datos, admin: true, traza: true, login: true });
};

module.exports = {
  ControladorTrazas,
};
