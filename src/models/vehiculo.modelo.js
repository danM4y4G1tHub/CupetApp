const { sequelize } = require("../database/db");
const { DataTypes } = require("sequelize");
const { TicketModelo } = require("./ticket.modelo");

//** Definición de la tabla Vehiculo
const VehiculoModelo = sequelize.define(
  "Vehiculo",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    modelo: {
      type: DataTypes.STRING,
    },
    categoria: {
      type: DataTypes.STRING,
    },
    propiedad: {
      type: DataTypes.STRING,
    },
    tipo: {
      type: DataTypes.STRING,
    },
    matricula: {
      type: DataTypes.STRING,
    },
    capacidad: {
      type: DataTypes.FLOAT,
    },
  },
  { timestamps: false },
);

//** Estableciendo relación entre las tablas Vehiculo y Ticket
VehiculoModelo.hasMany(TicketModelo, {
  foreignKey: "idVe",
  sourceKey: "id",
});
TicketModelo.belongsTo(VehiculoModelo, {
  foreignKey: "idVe",
  targetId: "id",
});

//** Definición de los métodos de la tabla Vehiculo
const Vehiculo = {};

Vehiculo.crearVehiculo = (body) => {
  try {
    VehiculoModelo.create(
      body.modelo,
      body.categoria,
      body.propiedad,
      body.tipo,
      body.matricula,
      body.capacidad,
      body.idUser,
    );
  } catch (error) {
    console.log(error);
    return false;
  }
  return true;
};

Vehiculo.obtenerDatosVehiculo = (idUser) => {
  try {
    const datos = VehiculoModelo.findByPk(idUser);
    return datos;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  Vehiculo,
  VehiculoModelo,
};
