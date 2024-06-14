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
  console.log({ user, hashedPassword });
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

Usuario.crearUsuario = async (usuario) => {
  try {
    await UsuarioModelo.create({
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      CI: usuario.CI,
      direccion: usuario.direccion,
      telefono: usuario.telefono,
      email: usuario.email,
      usuario: usuario.usuario,
      password: usuario.password,
      rol: "Administrador",
    });
    return true;
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
    console.log({ pass });
    const correcto = await bcrypt.compare(password, pass.password);
    if (correcto) return true;

    return false;
  } catch (error) {
    console.log(error);
  }
};

Usuario.obtenerUsuario = async (id) => {
  try {
    const datos = await UsuarioModelo.findByPk(id, {
      attributes: ["id", "usuario", "rol"],
    });

    return datos;
  } catch (error) {
    console.log(error);
  }
};

Usuario.obtenerUsuarios = async () => {
  try {
    const datos = await UsuarioModelo.findAll();
    console.log(`Datos de los usuarios: ${datos}`);

    // return datos.defaultValue;
  } catch (error) {}
};

Usuario.actualizarUsuario = async (id, usuario, password) => {
  return true;
};

Usuario.eliminarUsuario = async (id) => {
  return true;
};

module.exports = {
  Usuario,
  UsuarioModelo,
};
