const { Sequelize } = require("sequelize");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Configuración para conecter el ORM Sequelize con Postgres
const sequelize = new Sequelize("CupetApp", "postgres", "Hawkeye", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    idle: 1000,
  },
});

// Configuración para crear las sesiones en la Base de Datos
const sessionStore = new SequelizeStore({
  db: sequelize,
});

module.exports = {
  sequelize,
  sessionStore,
};
