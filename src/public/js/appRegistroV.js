/*
 * Expresión regular para validar la password
 */
const expresion =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

/*
 *  Validacion de campos para el registro de Usuario
 */
const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("nombre");
const CI = document.getElementById("nombre");
const direccion = document.getElementById("nombre");
const telefono = document.getElementById("nombre");
const email = document.getElementById("email");

document
  .getElementById("formulario-usuario")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); //! Evita el envío del formulario

    //* Variables para el trabajar con el campo: Usuario
    const user = document.getElementById("usuario");
    const msgUser = document.getElementById("mensaje-usuario");
    const info = document.getElementById("info");

    //* Llama a la función que valida el campo: Usuario
    validarUsuario(user, msgUser, info);

    //* Variables para trabajar con el campo: Password
    const pass = document.getElementById("password");
    const msgPass = document.getElementById("mensaje-password");
    const fort = document.getElementById("fortaleza");

    //* Llama a la función que valida el campo: Password
    validarPassword(pass, msgPass, fort);

    //* Si todo esta bien envia los datos al Backe-nd

    try {
      const response = await fetch("/registrar-usuario", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // El envío fue exitoso, puedes mostrar un mensaje al usuario
        console.log("Datos enviados correctamente");
      } else {
        // Hubo un error en el envío, maneja el error según tus necesidades
        console.error("Error al enviar los datos");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  });

const validarUsuario = (user, msgUser, info) => {
  if (user.value.length == 0) {
    info.innerHTML = "El campo no puede estar vacío";
    user.style.borderColor = "#dc3545";
    msgUser.style.color = "#dc3545";
    msgUser.style.display = "block";
  } else if (user.value.length < 6) {
    info.innerHTML = "El usuario debe ser de 6 caracteres como mínimo";
    user.style.borderColor = "#dc3545";
    msgUser.style.color = "#dc3545";
    msgUser.style.display = "block";
  } else {
    user.style.borderColor = "#198754";
    msgUser.style.color = "#198754";
    msgUser.style.display = "none";
  }
};

const validarPassword = (pass, msgPass, fort) => {
  if (pass.value.length == 0) {
    fort.innerHTML = "La Password no puede estar vacía";
    pass.style.borderColor = "#dc3545";
    msgPass.style.color = "#dc3545";
    msgPass.style.display = "block";
  } else if (pass.value.length == 8 && pass.value.match(expresion)) {
    fort.innerHTML = "La Password tiene una fortaleza media";
    pass.style.borderColor = "#ffc107";
    msgPass.style.color = "#ffc107";
    msgPass.style.display = "block";
  } else if (pass.value.length > 8 && pass.value.match(expresion)) {
    fort.innerHTML = "La Password tiene una fortaleza media";
    pass.style.borderColor = "#ffc107";
    msgPass.style.color = "#ffc107";
    msgPass.style.display = "block";
  } else if (pass.value.match(expresion)) {
    fort.innerHTML = "La Password es fuerte";
    pass.style.borderColor = "#198754";
    msgPass.style.color = "#198754";
    msgPass.style.display = "block";
  } else {
    fort.innerHTML =
      "debe tener alguno (*/=!.-+@$%&), Mayúsculas, minúsculas y números, ser > 8 y < 15";
    pass.style.borderColor = "#dc3545";
    msg.style.color = "#dc3545";
    msg.style.display = "block";
  }
};
