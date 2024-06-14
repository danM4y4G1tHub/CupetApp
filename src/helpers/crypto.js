const { log } = require("console");
const crypto = require("crypto");
const { password } = require("pg/lib/defaults");

// * Datos necesarios para encriptar la contraseña
const algoritmo = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const encriptar = (password) => {
  const cipher = crypto.createCipheriv(algoritmo, key, iv);
  const passwordEncriptada = Buffer.concat([
    cipher.update(password),
    cipher.final(),
  ]);

  return {
    iv: iv.toString("hex"),
    encriptada: passwordEncriptada.toString("hex"),
  };
};

const desencriptar = (password) => {
  const iv = Buffer.from(password.iv, "hex");
  const encriptada = Buffer.from(password.encriptada, "hex");

  const passwordDesencriptada = crypto.createDecipheriv(algoritmo, key, iv);
  return Buffer.concat([
    passwordDesencriptada.update(encriptada),
    passwordDesencriptada.final(),
  ]).toString();
};

const coinciden = (passwordClara, passwordOculta) => {
  if (passwordClara === desencriptar(passwordOculta)) {
    return true;
  }
  return false;
};

module.exports = {
  encriptar,
  coinciden,
};
