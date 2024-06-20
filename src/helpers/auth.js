const auth = {};

auth.logeado = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/autenticar-usuario");
  }
};

auth.noLogeado = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/autenticar-usuario");
  }
};

module.exports = { auth };
