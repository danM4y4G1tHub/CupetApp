const { sequelize } = require("../database/db");
const { DataTypes } = require("sequelize");

// Definición de la tabla Ticket
const TicketModelo = sequelize.define(
  "Ticket",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fecha: {
      type: DataTypes.DATE,
    },
    estado: {
      type: DataTypes.ENUM("Activo", "Anulado", "Cancelado"),
      allowNull: false,
    },
  },
  { timestamps: false },
);

// Definición de los métodos de la tabla Ticket
const Ticket = {};

Ticket.crearTicket = (body) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

Ticket.cambiarEstado = (body) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

Ticket.obtenerDatosTicket = (body) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  Ticket,
  TicketModelo,
};
