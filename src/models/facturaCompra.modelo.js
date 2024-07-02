const { sequelize } = require("../database/db");
const { DataTypes } = require("sequelize");

const FacturaCompraModelo = sequelize.define(
  "FacturaCompra",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    litrosComprados: {
      type: DataTypes.FLOAT,
    },
    fechaCompra: {
      type: DataTypes.DATE,
    },
    numeroTarjeta: {
      type: DataTypes.STRING,
    },
    numeroCupon: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false },
);

const FacturaCompra = {};
// Definición de los métodos de la tabla FacturaCompra
FacturaCompra.crearFacturaCompra = (body) => {
  try {
  } catch (error) {}
};

FacturaCompra.actualizarFacturaCompra = (idUser) => {
  try {
  } catch (error) {}
};

FacturaCompra.obtenerVentas = async () => {
  try {
    const datos = await FacturaCompraModelo.findAll({ raw: true });

    return datos;
  } catch (error) {
    console.log(error);
  }
};

FacturaCompra.contarVentas = async () => {
  try {
    const datos = await FacturaCompra.obtenerVentas();
    return datos.length;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  FacturaCompra,
  FacturaCompraModelo,
};
