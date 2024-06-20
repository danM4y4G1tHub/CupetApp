const { sequelize } = require("../database/db");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

const { VehiculoModelo } = require("./vehiculo.modelo");
const { TicketModelo } = require("./ticket.modelo");
const { FacturaCompraModelo } = require("./facturaCompra.modelo");

//** Definición de la tabla Usuario
const UsuarioModelo = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    apellidos: {
      type: DataTypes.STRING,
    },
    CI: {
      type: DataTypes.STRING,
      unique: true,
    },
    direccion: {
      type: DataTypes.STRING,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    usuario: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    rol: {
      type: DataTypes.ENUM("Cliente", "Dependiente", "Administrador"),
      allowNull: false,
    },
  },
  { timestamps: false },
);

//** Encripta la contraseña antes de guardarla en la Base de Datos
UsuarioModelo.beforeCreate(async (user) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;
});

//** Estableciendo relación entre las tablas Vehiculo y Usuario
UsuarioModelo.hasMany(VehiculoModelo, {
  foreignKey: "idUser",
  sourceKey: "id",
});
VehiculoModelo.belongsTo(UsuarioModelo, {
  foreignKey: "idUser",
  targetId: "id",
});

//** Estableciendo relación entre las tablas Vehiculo y Ticket
UsuarioModelo.hasMany(TicketModelo, {
  foreignKey: "idUser",
  sourceKey: "id",
});
TicketModelo.belongsTo(UsuarioModelo, {
  foreignKey: "idUser",
  targetId: "id",
});

//** Estableciendo relación entre las tablas Vehiculo y FacturaCompra
UsuarioModelo.hasMany(FacturaCompraModelo, {
  foreignKey: "idUser",
  sourceKey: "id",
});
FacturaCompraModelo.belongsTo(UsuarioModelo, {
  foreignKey: "idUser",
  targetId: "id",
});

//** Definición de los métodos de la tabla Usuario
const Usuario = {};

Usuario.crearUsuario = async (cuenta) => {
  try {
    const newUser = await UsuarioModelo.create({
      nombre: cuenta.nombre,
      apellidos: cuenta.apellidos,
      CI: cuenta.CI,
      direccion: cuenta.direccion,
      telefono: cuenta.telefono,
      email: cuenta.email,
      usuario: cuenta.user,
      password: cuenta.password,
      rol: "Cliente",
    });

    if (newUser === null) return false;

    return { rolU: newUser.rol, creado: true };
  } catch (error) {
    console.log(error);
    return false;
  }
};

Usuario.validarUsuario = async (usuario) => {
  try {
    const user = await UsuarioModelo.findOne({
      where: {
        usuario,
      },
      raw: true,
      attributes: ["id", "usuario", "rol"],
    });
    if (user) {
      const datos = {
        id: user.id,
        usuario: user.usuario,
        rol: user.rol,
        existe: true,
      };
      return datos;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

Usuario.validarPassword = async (usuario, password) => {
  try {
    const pass = await UsuarioModelo.findOne({
      where: { usuario },
      raw: true,
      attributes: ["password"],
    });
    const correcto = await bcrypt.compare(password, pass.password);
    if (correcto) return true;

    return false;
  } catch (error) {
    console.log(error);
  }
};

Usuario.obtenerUsuario = async (id) => {
  try {
    return await UsuarioModelo.findByPk(id, {
      attributes: ["id", "usuario", "rol"],
      raw: true,
    });
  } catch (error) {
    console.log(error);
  }
};

Usuario.obtenerUsuarios = async () => {
  try {
    const datos = await UsuarioModelo.findAll({
      raw: true,
      attributes: [
        "id",
        "nombre",
        "apellidos",
        "CI",
        "direccion",
        "telefono",
        "rol",
      ],
    });
    return datos;
  } catch (error) {
    console.log(error);
  }
};

Usuario.actualizarUsuario = async (id, usuario, password) => {
  return true;
};

Usuario.eliminarUsuario = async (id) => {
  return true;
};

Usuario.obtenerNombre = async (id) => {
  try {
    return await UsuarioModelo.findByPk(id, {
      raw: true,
      attributes: ["nombre"],
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  Usuario,
  UsuarioModelo,
};
