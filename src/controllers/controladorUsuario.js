const { Usuario } = require("../models/usuario.modelo");

const ControladorUsuario = {};
const usuario = {
  nombre: "",
  apellidos: "",
  CI: "",
  direccion: "",
  telefono: "",
  email: "",
  user: "",
  password: "",
};

ControladorUsuario.vistaRegistrarCliente = (req, res) => {
  res.render("registrarCliente", { layout: "login" });
};

ControladorUsuario.registrarCliente = async (req, res) => {
  usuario.nombre = req.body.nombre;
  usuario.apellidos = req.body.apellidos;
  usuario.CI = req.body.CI;
  usuario.direccion = req.body.direccion;
  usuario.telefono = req.body.telefono;
  usuario.email = req.body.email;
  res.render("registrarUsuario", { layout: "login" });
};

ControladorUsuario.registrarUsuario = async (req, res) => {
  usuario.usuario = req.body.usuario;
  usuario.password = req.body.password;
  if (await Usuario.crearUsuario(usuario)) {
    res.redirect("cargar-panel-control");
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

ControladorUsuario.listarUsuarios = async (req, res) => {
  const datos = await Usuario.obtenerUsuarios();
  res.render("Admin/panelControlAdmin", { datos });
};

module.exports = { ControladorUsuario };
