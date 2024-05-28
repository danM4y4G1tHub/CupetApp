const { sequelize } = require("../database/db");
const { DataTypes } = require("sequelize");

// Definición de la tabla TrazaCombustible
const TrazaCombustibleModelo = sequelize.define("TrazaCombustible", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  idUser: {
    type: DataTypes.UUID,
    unique: true,
  },
  fecha: {
    type: DataTypes.DATE,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
  tipoOperacion: {
    type: DataTypes.STRING,
  },
});

// Definición de los métodos de la tabla TrazaCombustible
const TrazaCombustible = {};

TrazaCombustible.crearTraza = (body) => {
  try {
    const fecha = new Date();
    TrazaCombustibleModelo.create(
      body.idUser,
      fecha,
      body.descripcion,
      body.tipoOperacion,
    );
    return true;
  } catch (error) {}
};

module.exports = {
  TrazaCombustible,
  TrazaCombustibleModelo,
};
