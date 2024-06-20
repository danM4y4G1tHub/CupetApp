const { Usuario } = require("../models/usuario.modelo");

const ControladorUsuario = {};
const cuenta = {
  nombre: "",
  apellidos: "",
  CI: "",
  direccion: "",
  telefono: "",
  email: "",
  user: "",
  password: "",
};

ControladorUsuario.vistaRegistrarCliente = (_, res) => {
  res.render("registrarCliente", { layout: "login" });
};

ControladorUsuario.registrarCliente = async (req, res) => {
  ControladorUsuario.armarDatosCliente(req);
  res.render("registrarUsuario", { layout: "login" });
};

ControladorUsuario.registrarUsuario = async (req, res) => {
  ControladorUsuario.armarDatos(req, "");
  const { rolU, creado } = await Usuario.crearUsuario(cuenta);
  if (creado) {
    res.redirect("cargar-panel-control?rol=" + rolU);
  } else {
    // TODO: crear modal con Notificaciones de ERROR
  }
};

ControladorUsuario.editarUsuario = (req, res) => {
  Usuario.actualizarUsuario(req.body);
};

ControladorUsuario.borrarUsuario = (req, res) => {
  Usuario.eliminarUsuario(req.id);
};

ControladorUsuario.buscarUsuario = (req, res) => {
  res.render("buscar");
};

ControladorUsuario.listarUsuarios = async (_, res) => {
  const datos = await Usuario.obtenerUsuarios();
  res.render("panelControl", { datos, admin: true, user: true });
};

ControladorUsuario.armarDatosCliente = (req) => {
  cuenta.nombre = req.body.nombre;
  cuenta.apellidos = req.body.apellidos;
  cuenta.CI = req.body.CI;
  cuenta.direccion = req.body.direccion;
  cuenta.telefono = req.body.telefono;
  cuenta.email = req.body.email;
};

ControladorUsuario.armarDatos = (req) => {
  cuenta.user = req.body.usuario;
  cuenta.password = req.body.password;
};

module.exports = { ControladorUsuario };
