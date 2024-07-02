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

TrazaCombustible.crearTraza = async (body) => {
  try {
    await TrazaCombustibleModelo.create({
      idUser: body.idUser,
      fecha: new Date(),
      descripcion: body.descripcion,
      tipoOperacion: body.tipoOperacion,
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};

TrazaCombustible.obtenerTrazas = async () => {
  try {
    const datos = await TrazaCombustibleModelo.findAll({
      raw: true,
    });

    return datos;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  TrazaCombustible,
};
