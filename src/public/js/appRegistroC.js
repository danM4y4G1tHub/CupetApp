/*
 * Expresión regular para validar la password
 */
const expresionNomnbre = /^(?=.*[a-z])(?=.*[A-Z]).{2,30}$/;
const expresionCI = /^(?=.*[^Z0-9]){11}$/;
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
    event.preventDefault();

    const nombre = document.getElementById("nombre");
    const apellidos = document.getElementById("apellidos");
    const CI = document.getElementById("carnet");
    const direccion = document.getElementById("direccion");
    const telefono = document.getElementById("telefono");
    const email = document.getElementById("email");

    if (validarCliente(nombre, apellidos, CI, direccion, telefono, email)) {
      try {
        const response = await fetch("/registrar-cliente", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: nombre.value,
            apellidos: apellidos.value,
            CI: CI.value,
            direccion: direccion.value,
            telefono: telefono.value,
            email: email.value,
          }),
        });

        if (response.ok) {
          console.log("Datos enviados correctamente");
        } else {
          console.error("Error al enviar los datos");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  });

const validarCliente = (
  nombre,
  apellidos,
  CI,
  direccion,
  telefono,
  email,
) => {
  let nombreListo = false;
  let apellidosListo = false;
  let CIListo = false;
  let direccionListo = false;
  let telefonoListo = false;
  let emailListo = false;

  if (nombre.value.length == 0) {
    infoNombre.innerHTML = "El campo no puede estar vacío";
    nombre.style.borderColor = "#dc3545";
    msgNombre.style.color = "#dc3545";
    msgNombre.style.display = "block";
  } else if (nombre.value.match(expresionNomnbre)) {
    nombre.style.borderColor = "#198754";
    msgNombre.style.color = "#198754";
    msgNombre.style.display = "none";
    nombreListo = true;
  }

  if (apellidos.value.length == 0) {
    infoApellido.innerHTML = "El campo no puede estar vacío";
    apellidos.style.borderColor = "#dc3545";
    msgApellido.style.color = "#dc3545";
    msgApellido.style.display = "block";
  } else if (apellidos.value.match(expresionNomnbre)) {
    apellidos.style.borderColor = "#198754";
    msgApellido.style.color = "#198754";
    msgApellido.style.display = "none";
    apellidosListo = true;
  }

  if (CI.value.length == 0) {
    infoCI.innerHTML = "El campo no puede estar vacío";
    CI.style.borderColor = "#dc3545";
    msgCI.style.color = "#dc3545";
    msgCI.style.display = "block";
  } else if (CI.value.match(expresionCI)) {
    CI.style.borderColor = "#198754";
    msgCI.style.color = "#198754";
    msgCI.style.display = "none";
    CIListo = true;
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
    direccionListo = true;
  }

  if (telefono.value.length == 0) {
    infoTelefono.innerHTML = "El campo no puede estar vacío";
    telefono.style.borderColor = "#dc3545";
    msgTelefono.style.color = "#dc3545";
    msgTelefono.style.display = "block";
  } else {
    telefono.style.borderColor = "#198754";
    msgTelefono.style.color = "#198754";
    msgTelefono.style.display = "none";
    telefonoListo = true;
  }

  if (email.value.length == 0) {
    infoEmail.innerHTML = "El campo no puede estar vacío";
    email.style.borderColor = "#dc3545";
    msgEmail.style.color = "#dc3545";
    msgEmail.style.display = "block";
  } else {
    email.style.borderColor = "#198754";
    msgEmail.style.color = "#198754";
    msgEmail.style.display = "none";
    emailListo = true;
  }

  return !!(
    nombreListo &&
    apellidosListo &&
    CIListo &&
    direccionListo &&
    telefonoListo &&
    emailListo
  );
};
