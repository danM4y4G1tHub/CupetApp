const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { Usuario } = require("../models/usuario.modelo");

passport.use(
  "autenticar",
  new LocalStrategy(
    {
      usernameField: "usuario",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (_, usuario, password, done) => {
      const user = await Usuario.validarUsuario(usuario);
      if (user.existe) {
        if (await Usuario.validarPassword(usuario, password)) {
          done(null, user);
        } else {
          done(null, false);
        }
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (idU, done) => {
  const cuenta = await Usuario.obtenerUsuario(idU);
  done(null, cuenta);
});

module.exports = { passport };
