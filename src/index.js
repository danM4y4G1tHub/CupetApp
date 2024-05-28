const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const morgan = require("morgan");
const session = require("express-session");
const { sequelize, sessionStore } = require("./database/db");
const { urlencoded, json } = require("express");
const { passportInstance } = require("./helpers/passport");

const app = express();

app.use(morgan("dev"));
app.use(urlencoded({ extended: false }));
app.use(json());

// **** Configuración de la Sesión
app.use(
  session({
    secret: "cupetApp-session",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  }),
);

// **** Inicialización de Passport
app.use(passportInstance.passport.initialize());
app.use(passportInstance.passport.session());

/*
 * Motor de plantillas
 */
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  engine({
    defaultLayout: "app",
    extname: ".hbs",
  }),
);

app.set("view engine", ".hbs");

/*
 * Variables globales
 */
app.use((req, res, next) => {
  res.locals.dataUsuario = req.user.dataValues;
  next();
});

/*
 * Rutas
 */
app.use("/", require("./routes/rutas.routes.js").router);

/*
 * Publicas
 */
app.use(express.static(path.join(__dirname, "public")));

/*
 * Servidor y conexión a la Base de Datos
 */

async function main() {
  try {
    // Realiza consulta BD para comprobar conexión
    await sequelize.sync({ force: false });
    console.log("Conexión a la BDs establecida 🚀");

    // Ejecuta el servidor de la aplicación
    app.listen(3000, () => {
      console.log("Servidor ejecutándose 😋");
    });
  } catch (error) {
    console.error("Fallo la conexión a la BDs 😥");
  }
}

main();
