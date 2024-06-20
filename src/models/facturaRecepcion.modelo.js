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

FacturaRecepcion.crearFacturaRecepcion = async (body) => {
  try {
    const datos = await FacturaRecepcionModelo.create(
      {
        nombreEstablecimiento: "Oro Negro",
        nombreDistribuidor: body.nombreDistribuidor,
        nombreAdministrador: body.nombreAdministrador,
        cantidadCombustible: body.cantidad,
        idComb: body.idComb,
      },
      {
        raw: true,
      },
    );
    console.log({ datos });
    // return true;
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

FacturaRecepcion.obtenerFacturasRecepcion = async () => {
  try {
    const datos = await FacturaRecepcionModelo.findAll({ raw: true });
    return datos;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  FacturaRecepcion,
  FacturaRecepcionModelo,
};
