/*
 * Expresión regular para validar la password
 */
const expresionNomnbre = /^(?=.*[a-z])(?=.*[A-Z]).{2,15}$/;
const expresionCI = /^(?=.*[^a-zA-Z0-9]){1}$/;
const expresionTelefono = /^(?=.*[^a-zA-Z0-9]){11}$/;
const expresion =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

// Variables para los emnsajes
const msgNombre = document.getElementById("mensaje-nombre");
const msgApellido = document.getElementById("mensaje-apellidos");
const msgCI = document.getElementById("mensaje-CI");
const msgDireccion = document.getElementById("mensaje-direccion");
const msgTelefono = document.getElementById("mensaje-telefono");
const msgEmail = document.getElementById("mensaje-email");

// Variables para el span
const infoNombre = document.getElementById("infoNombre");
const infoApellido = document.getElementById("infoApellidos");
const infoCI = document.getElementById("infoCI");
const infoDireccion = document.getElementById("infoDireccion");
const infoTelefono = document.getElementById("infoTelefono");
const infoEmail = document.getElementById("infoEmail");

/*
 *  Validacion de campos para el registro de Usuario
 */
document
  .getElementById("formulario-cliente")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); //! Evita el envío del formulario

    //     //* Variables para el trabajar con el campo: Nombre
    const nombre = document.getElementById("nombre");
    //     //* Variables para el trabajar con el campo: Apellidos
    const apellidos = document.getElementById("apellidos");
    //     //* Variables para el trabajar con el campo: CI
    const CI = document.getElementById("CI");
    //     //* Variables para el trabajar con el campo: direccion
    const direccion = document.getElementById("direccion");
    //     //* Variables para el trabajar con el campo: telefono
    const telefono = document.getElementById("telefono");
    //     //* Variables para el trabajar con el campo: email
    const email = document.getElementById("email");

    //     //* Llama a la función que valida todos los campos
    validarCliente(nombre, apellidos, CI, direccion, telefono, email);

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

const validarCliente = (nombre, apellidos, CI, direccion, telefono, email) => {
  if (nombre.value.length == 0) {
    infoNombre.innerHTML = "El campo no puede estar vacío";
    nombre.style.borderColor = "#dc3545";
    msgNombre.style.color = "#dc3545";
    msgNombre.style.display = "block";
  }
  if (nombre.value.match(expresionNomnbre)) {
    nombre.style.borderColor = "#198754";
    msgNombre.style.color = "#198754";
    msgNombre.style.display = "none";
  }
  if (apellidos.value.length == 0) {
    infoApellido.innerHTML = "El campo no puede estar vacío";
    apellidos.style.borderColor = "#dc3545";
    msgApellido.style.color = "#dc3545";
    msgApellido.style.display = "block";
  }
  if (apellidos.value.match(expresionNomnbre)) {
    apellidos.style.borderColor = "#198754";
    msgApellido.style.color = "#198754";
    msgApellido.style.display = "none";
  }
  if (CI.value.length == 0) {
    infoCI.innerHTML = "El campo no puede estar vacío";
    CI.style.borderColor = "#dc3545";
    msgCI.style.color = "#dc3545";
    msgCI.style.display = "block";
  }
  if (CI.value.match(expresionCI)) {
    CI.style.borderColor = "#198754";
    msgCI.style.color = "#198754";
    msgCI.style.display = "none";
  }

  if (direccion.value.length == 0) {
    infoDireccion.innerHTML = "El campo no puede estar vacío";
    direccion.style.borderColor = "#dc3545";
    msgDireccion.style.color = "#dc3545";
    msgDireccion.style.display = "block";
  } else {
    direccion.style.borderColor = "#198754";
    msgDireccion.style.color = "#198754";
    msgDireccion.style.display = "none";
  }

  if (telefono.value.length == 0) {
    infoTelefono.innerHTML = "El campo no puede estar vacío";
    telefono.style.borderColor = "#dc3545";
    msgTelefono.style.color = "#dc3545";
    msgTelefono.style.display = "block";
  }

  if (email.value.length == 0) {
    infoEmail.innerHTML = "El campo no puede estar vacío";
    email.style.borderColor = "#dc3545";
    msgEmail.style.color = "#dc3545";
    msgEmail.style.display = "block";
  }
};
