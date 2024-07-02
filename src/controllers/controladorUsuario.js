const { Usuario } = require("../models/usuario.modelo");

const ControladorUsuario = {};
const cuenta = {
  nombre: "",
  apellidos: "",
  CI: "",
  direccion: "",
  telefono: "",
  email: "",
  usuario: "",
  password: "",
  rol: "",
};

const cuentaDep = {
  nombre: "",
  apellidos: "",
  CI: "",
  direccion: "",
  telefono: "",
  email: "",
  usuario: "",
  password: "",
  rol: "",
};

ControladorUsuario.vistaRegistrarDependiente = (_, res) => {
  res.render("registrarDependiente", { layout: "login" });
};

ControladorUsuario.registrarDependiente = async (req, res) => {
  ControladorUsuario.armarDatosDependiente(req);
  res.render("registrarUsuarioDependiente", { layout: "login" });
};

ControladorUsuario.registrarUsuarioDependiente = async (req, res) => {
  ControladorUsuario.armarDatosDep(req);
  cuentaDep.rol = "Dependiente";
  
  const { rolU, creado } = await Usuario.crearUsuario(cuentaDep);
  if (creado) {
    res.redirect("cargar-panel-control?rol=" + rolU);
  } else {
    // TODO: crear modal con Notificaciones de ERROR
  }
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

ControladorUsuario.eliminarUsuario = async (req, res) => {
  const { id } = req.body;
  if (await Usuario.eliminarUsuario(id)) {
    res.render("panelControl", { admin: true, user: true, login: true });
  }
}

ControladorUsuario.vistaEditarUsuario = async (req, res) => {
  res.render("editarUsuario", {layout: "login"});
};

ControladorUsuario.editarUsuario = async (req, res) => {
  const { body, user } = req;
  if (await Usuario.actualizarUsuario(body)) {
    if (user.rol === "Administrador") {
      res.render("panelControl", { admin: true, user: true, login: true });
    }
    if (user.rol === "Dependiente") {
      res.render("panelControl", { dependiente: true, login: true });
    }
    if (user.rol === "Cliente") {
      res.render("panelControl", { cliente: true, login: true });
    }
  }
};

ControladorUsuario.borrarUsuario = (req, res) => {
  Usuario.eliminarUsuario(req.id);
};

ControladorUsuario.buscarUsuario = (req, res) => {
  res.render("buscar");
};

ControladorUsuario.listarUsuarios = async (_, res) => {
  const datos = await Usuario.obtenerUsuarios();
  datos.forEach(user => {
    if (user.rol === "Cliente" || user.rol === "Administrador") {
      user.editable = false;
    }
    if (user.rol === "Dependiente") {
      user.editable = true;
    }
  })
  res.render("panelControl", { datos, admin: true, user: true, login: true });
};

ControladorUsuario.armarDatosCliente = (req) => {
  cuenta.nombre = req.body.nombre;
  cuenta.apellidos = req.body.apellidos;
  cuenta.CI = req.body.CI;
  cuenta.direccion = req.body.direccion;
  cuenta.telefono = req.body.telefono;
  cuenta.email = req.body.email;
};

ControladorUsuario.armarDatosDependiente = (req) => {
  cuentaDep.nombre = req.body.nombre;
  cuentaDep.apellidos = req.body.apellidos;
  cuentaDep.CI = req.body.CI;
  cuentaDep.direccion = req.body.direccion;
  cuentaDep.telefono = req.body.telefono;
  cuentaDep.email = req.body.email;
};

ControladorUsuario.armarDatosDep = (req) => {
  cuentaDep.usuario = req.body.usuario;
  cuentaDep.password = req.body.password;
};

ControladorUsuario.armarDatos = (req) => {
  cuenta.usuario = req.body.usuario;
  cuenta.password = req.body.password;
};

module.exports = { ControladorUsuario };
