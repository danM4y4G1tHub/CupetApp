const { sequelize } = require("../database/db");
const { DataTypes } = require("sequelize");
const { TicketModelo } = require("./ticket.modelo");
const { FacturaRecepcionModelo } = require("./facturaRecepcion.modelo");
const { FacturaCompraModelo } = require("./facturaCompra.modelo");

// Definición de la tabla Combustible
const CombustibleModelo = sequelize.define(
  "Combustible",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cantidad: {
      type: DataTypes.FLOAT,
    },
    tipo: {
      type: DataTypes.STRING,
    },
    precio: {
      type: DataTypes.FLOAT,
    },
  },
  { timestamps: false },
);

// Estableciendo relación entre las tablas Combustible y Ticket
CombustibleModelo.hasMany(TicketModelo, {
  foreignKey: "idComb",
  sourceKey: "id",
});
TicketModelo.belongsTo(CombustibleModelo, {
  foreignKey: "idComb",
  targetId: "id",
});

// Estableciendo relación entre las tablas Combustible y FacturaRecepcion
CombustibleModelo.hasMany(FacturaRecepcionModelo, {
  foreignKey: "idComb",
  sourceKey: "id",
});
FacturaRecepcionModelo.belongsTo(CombustibleModelo, {
  foreignKey: "idComb",
  targetId: "id",
});

// Estableciendo relación entre las tablas Combustible y FacturaCompra
CombustibleModelo.hasMany(FacturaCompraModelo, {
  foreignKey: "idComb",
  sourceKey: "id",
});
FacturaCompraModelo.belongsTo(CombustibleModelo, {
  foreignKey: "idComb",
  targetId: "id",
});

// Definición de los métodos de la tabla Combustible
const Combustible = {};

Combustible.despacharCombustible = (body) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

Combustible.abastecerCombustible = (body) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

Combustible.consultarCantidadCombustible = () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  Combustible,
  CombustibleModelo,
};
