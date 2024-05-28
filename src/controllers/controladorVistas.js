const ControladorVistas = {};

ControladorVistas.index = (req, res) => {
  res.render("bienvenida", { layout: "paginaWeb" });
};

ControladorVistas.panelControl = (req, res) => {
  res.render("panelControl");
};

module.exports = { ControladorVistas };
