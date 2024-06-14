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
  const { user } = req;

  if (user.rol === "Administrador") {
    res.render("Admin/panelControlAdmin");
  }
  if (user.rol === "Dependiente") {
    res.render("Dependiente/panelControlAdmin");
  }
  if (user.rol === "Cliente") {
    res.render("Client/panelControlAdmin");
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
