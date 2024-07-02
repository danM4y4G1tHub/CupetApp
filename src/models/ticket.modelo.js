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
      type: DataTypes.ENUM("Activo", "Pendiente", "Anulado", "Cancelado"),
      allowNull: false,
    },
  },
  { timestamps: false },
);

// Definición de los métodos de la tabla Ticket
const Ticket = {};

Ticket.crearTicket = async (body) => {
  try {
    const ticket = await TicketModelo.create({
      fecha: body.fecha,
      estado: body.estado,
      idVe: body.idV,
      idUser: body.idU,
      idComb: body.idC,
    });
    if (ticket != null) {
      return true;
    }
    return false;
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

Ticket.obtenerDatosTicket = async (idU) => {
  try {
    const datos = await TicketModelo.findOne({
      where: { idUser: idU },
      raw: true,
    });
    return datos;
  } catch (error) {
    console.log(error);
  }
};

Ticket.contarTickets = async () => {
  try {
    const datos = await TicketModelo.findAll();
    const tickets = {
      activos: 0,
      anulados: 0,
    };

    datos.forEach((ticket) => {
      if (ticket.estado === "Activo") {
        tickets.activos++;
      }
      if (ticket.estado === "") {
        tickets.anulados++;
      }
    });

    return tickets;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  Ticket,
  TicketModelo,
};
