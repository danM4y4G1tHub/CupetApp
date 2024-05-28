/*
 * Expresión regular para validar la password
 */
const expresion =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

/*
 *  Validacion de campos
 */
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault(); // Evita el envío del formulario
  const user = document.getElementById("usuario");
  const msgUser = document.getElementById("mensaje-usuario");
  const pass = document.getElementById("password");
  const msgPass = document.getElementById("mensaje-password");
  const fort = document.getElementById("fortaleza");

  console.log(`Valor de Usuario: ${user.value}`);
  console.log(`Valor de Password: ${pass}`);

  // Validar campo Usuario
  if (user.value.length == 0) {
    fort.innerHTML = "El campo no puede estar vacío";
    user.style.borderColor = "#dc3545";
    msgUser.style.color = "#dc3545";
    msgUser.style.display = "block";
  } else if (user.value.length < 6) {
    fort.innerHTML = "El usuario debe ser de 6 caracteres como mínimo";
    user.style.borderColor = "#dc3545";
    msgUser.style.color = "#dc3545";
    msgUser.style.display = "block";
  } else {
    user.style.borderColor = "#198754";
    msgUser.style.color = "#198754";
    msgUser.style.display = "none";
  }

  // Para validar contraseña
  if (pass.value.length == 0) {
    fort.innerHTML = "no puede estar vacía";
    pass.style.borderColor = "#dc3545";
    msgPass.style.color = "#dc3545";
    msgPass.style.display = "block";
  } else if (pass.value.length == 8 && pass.value.match(expresion)) {
    fort.innerHTML = "tiene una fortaleza media";
    pass.style.borderColor = "#ffc107";
    msgPass.style.color = "#ffc107";
    msgPass.style.display = "block";
  } else if (pass.value.length > 8) {
    fort.innerHTML = "es muy fuerte";
    pass.style.borderColor = "#198754";
    msgPass.style.color = "#198754";
    msgPass.style.display = "block";
  } else {
    msgPass.style.display = "none";
  }

  if (pass.value.match(expresion)) {
    const formData = new FormData(this); // Obtiene los datos del formulario
    //   try {
    //     const response = await fetch("/registrar-usuario", {
    //       method: "POST",
    //       body: formData,
    //     });

    //     if (response.ok) {
    //       // El envío fue exitoso, puedes mostrar un mensaje al usuario
    //       console.log("Datos enviados correctamente");
    //     } else {
    //       // Hubo un error en el envío, maneja el error según tus necesidades
    //       console.error("Error al enviar los datos");
    //     }
    //   } catch (error) {
    //     console.error("Error en la solicitud:", error);
    //   }
  } else {
    fort.innerHTML =
      "debe tener alguno (*/=!.-+@$%&), Mayúsculas, minúsculas y números";
    pass.style.borderColor = "#dc3545";
    msg.style.color = "#dc3545";
    msg.style.display = "block";
  }
});
