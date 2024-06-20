import routesLabels from "./constants/routesLabels.js";

const breadcrumbHtml = document.getElementById("breadcrumb");
// Crear el elemento <i> para el icono
const inicioListItem = document.createElement("li");
inicioListItem.className = "breadcrumb-item"; // Añadir la clase breadcrumb-item
const inicioLink = document.createElement("a");
inicioLink.href = "/";
inicioLink.textContent = "Inicio"; // Texto del enlace

// Crear el elemento <i> para el icono
const inicioIcon = document.createElement("i");
inicioIcon.className = "bi bi-signpost-split-fill"; // Clase del icono

// Agregar el icono al enlace
inicioLink.prepend(inicioIcon);

// Agregar el enlace al elemento <li>
inicioListItem.appendChild(inicioLink);

// Insertar el elemento <li> al principio del breadcrumb
breadcrumbHtml.insertBefore(inicioListItem, breadcrumbHtml.firstChild);

const pathName = window.location.pathname;
const pathNameSplitted = pathName.split("/");

pathNameSplitted.forEach((path, index) => {
  if (!path) return;

  // Creamos el elemento <li> con la clase breadcrumb-item
  const listItem = document.createElement("li");
  listItem.className = "breadcrumb-item"; // Añadimos la clase breadcrumb-item

  // Verificamos si el elemento es el último del breadcrumb
  const isActive = index === pathNameSplitted.length - 1;

  // Creamos el elemento <a> o <span> para el nombre de la ruta
  let linkOrSpan = document.createElement(isActive ? "span" : "a"); // Si es el último, usamos span, de lo contrario, un enlace
  linkOrSpan.href = pathName.split(path)[0] + path; // Establecemos el href solo si no es el último elemento
  linkOrSpan.textContent = routesLabels[path] || path; // Asignamos el texto del nombre de la ruta

  // Si el elemento es activo, añadimos el atributo aria-current="page"
  if (isActive) {
    linkOrSpan.setAttribute("aria-current", "page");
    listItem.classList.add("active"); // Añadimos la clase active
  }

  // Agregamos el nombre de la ruta al <li>
  listItem.appendChild(linkOrSpan);

  // Agregamos el <li> al breadcrumbHtml
  breadcrumbHtml.appendChild(listItem);
});
