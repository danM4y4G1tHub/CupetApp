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
    async (req, usuario, password, done) => {
      const user = await Usuario.validarUsuario(usuario);
      if (user.existe) {
        if (await Usuario.validarPassword(usuario, password)) {
          console.log(`Existe`);
          done(null, user);
        } else {
          console.log(`No existe`);
          done(null, false);
        }
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await Usuario.obtenerUsuario(id);
  done(null, user);
});

module.exports = { passport };
