const auth = {};

auth.logeado = (req, res, next) => {
  if (req.estaAutenticado()) {
    next();
  } else {
    res.redirect("/autenticar-usuario");
  }
};

auth.noLogeado = (req, res, next) => {
  if (!req.estaAutenticado()) {
    next();
  } else {
    res.redirect("/autenticar-usuario");
  }
};

module.exports = { auth };
