const { sequelize } = require("../database/db");
const { DataTypes } = require("sequelize");

// Definición de la tabla FacturaRecepcion
const FacturaRecepcionModelo = sequelize.define(
  "FacturaRecepcion",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombreEstablecimiento: {
      type: DataTypes.STRING,
    },
    nombreDistribuidor: {
      type: DataTypes.STRING,
    },
    nombreAdministrador: {
      type: DataTypes.STRING,
    },
    cantidadCombustible: {
      type: DataTypes.FLOAT,
    },
  },
  { timestamps: false },
);

// Definición de los métodos de la tabla FacturaRecepcion
const FacturaRecepcion = {};

FacturaRecepcion.crearFacturaRecepcion = (body) => {
  try {
    FacturaRecepcionModelo.create(
      body.nombreEstablecimiento,
      body.nombreDistribuidor,
      body.nombreAdministrador,
      body.cantidadCombustible,
      body.idUser,
      body.idComb,
    );
    return true;
  } catch (error) {
    console.log(error);
  }
};

FacturaRecepcion.actualizarFacturaRecepcion = (body) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

FacturaRecepcion.obtenerDatosFacturaRecepcion = (id) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  FacturaRecepcion,
  FacturaRecepcionModelo,
};
