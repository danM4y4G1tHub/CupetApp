const passport = require("passport");
const ControladorAutenticar = {};

ControladorAutenticar.autenticarUsuario = async (req, res) => {
  // Construye la vista del formulario para autenticarse
  res.render("autenticar", { layout: "login" });
};

ControladorAutenticar.autenticar = (req, res, next) => {
  passport.authenticate("autenticar", {
    successRedirect: "/cargar-panel-control",
    failureRedirect: "/autenticar-usuario",
  })(req, res, next);
};

ControladorAutenticar.cargarPanelControl = async (req, res) => {
  // Toma los datos del usuario que se autentico
  const { user } = req;

  // Verifica si el usuario es nuevo o no
  if (user === null) {
    const rolU = req.query.rolU;
    if (rolU === "Administrador") {
      res.render("panelControl", { admin: true, login: true });
    }
    if (rolU === "Dependiente") {
      res.render("panelControl", { dependiente: true, login: true });
    }
    if (rolU === "Cliente") {
      res.render("panelControl", { cliente: true, login: true });
    }
  } else {
    if (user.rol === "Administrador") {
      res.render("panelControl", { admin: true, login: true });
    }
    if (user.rol === "Dependiente") {
      res.render("panelControl", { dependiente: true, login: true });
    }
    if (user.rol === "Cliente") {
      res.render("panelControl", { cliente: true, login: true });
    }
  }
};

ControladorAutenticar.cerrarSesion = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports = {
  ControladorAutenticar,
};
