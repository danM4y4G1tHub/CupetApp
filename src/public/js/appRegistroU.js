/*
 * Expresión regular para validar la password
 */
const expresion =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

//* Variables para el trabajar con el campo: Usuario
const user = document.getElementById("usuario");
const msgUser = document.getElementById("mensaje-usuario");
const info = document.getElementById("info");

//* Variables para trabajar con el campo: Password
const pass = document.getElementById("password");
const msgPass = document.getElementById("mensaje-password");
const fort = document.getElementById("fortaleza");

document
  .getElementById("formulario-usuario")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); //! Evita el envío del formulario

    //* Llama a las funciones que validan Usuario y Password
    if (validarUsuario() && validarPassword()) {
      try {
        await fetch("/registrar-usuario", {
          method: "POST",
          body: formData,
        });
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  });

const validarUsuario = () => {
  const largo = user.value.length;
  if (largo >= 6) {
    user.style.borderColor = "#198754";
    msgUser.style.color = "#198754";
    msgUser.style.display = "none";

    return true;
  }

  if (largo == 0) {
    info.innerHTML = "El campo no puede estar vacío";
    user.style.borderColor = "#dc3545";
    msgUser.style.color = "#dc3545";
    msgUser.style.display = "block";

    return false;
  } else if (largo < 6) {
    info.innerHTML = "El usuario debe ser de 6 caracteres como mínimo";
    user.style.borderColor = "#dc3545";
    msgUser.style.color = "#dc3545";
    msgUser.style.display = "block";

    return false;
  }
};

const validarPassword = () => {
  const largo = pass.value.length;

  if (pass.value.match(expresion)) {
    fort.innerHTML = "Fortaleza alta";
    pass.style.borderColor = "#198754";
    msgPass.style.color = "#198754";
    msgPass.style.display = "block";

    return true;
  } else if (largo == 0) {
    fort.innerHTML = "La Password no puede estar vacía";
    pass.style.borderColor = "#dc3545";
    msgPass.style.color = "#dc3545";
    msgPass.style.display = "block";

    return false;
  } else if (largo == 8 && largo <= 10 && pass.value.match(expresion)) {
    fort.innerHTML = "Fortaleza media";
    pass.style.borderColor = "#ffc107";
    msgPass.style.color = "#ffc107";
    msgPass.style.display = "block";

    return false;
  } else {
    fort.innerHTML =
      "Debe tener algún: (*/=!.-+@$%&), Mayúsculas, minúsculas y números, ser >= 8 y <= 15";
    pass.style.borderColor = "#dc3545";
    msgPass.style.color = "#dc3545";
    msgPass.style.display = "block";

    return false;
  }
};
