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

Vehiculo.crearVehiculo = async (body) => {
  try {
    const vehiculo = await VehiculoModelo.create(body);

    return {
      idV: vehiculo.id,
      modelo: vehiculo.modelo,
      categoria: vehiculo.categoria,
      propiedad: vehiculo.propiedad,
      tipo: vehiculo.tipo,
      matricula: vehiculo.matricula,
      capacidad: vehiculo.capacidad,
      idUser: vehiculo.idUser,
      creado: true,
    };
  } catch (error) {
    console.log(error);
  }
};

Vehiculo.obtenerDatosVehiculo = (idUser) => {
  try {
    const datos = VehiculoModelo.findByPk(idUser);
    return datos;
  } catch (error) {
    console.log(error);
  }
};

Vehiculo.obtenerVehiculos = () => {
  try {
    const datos = VehiculoModelo.findAll({
      raw: true,
      attributes: [
        "modelo",
        "categoria",
        "propiedad",
        "tipo",
        "matricula",
        "capacidad",
      ],
    });

    return datos;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  Vehiculo,
  VehiculoModelo,
};
