const { check, param, validationResult } = require("express-validator");
const mongoose = require("mongoose");

// Middleware para validar errores
const validarErrores = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errors: errores.array() });
  }
  next();
};

// Validar campos obligatorios al crear o editar un autor
const validarCamposAutor = [
  check("nombre", "El nombre es obligatorio").notEmpty(),
  check("nacionalidad", "La nacionalidad es obligatoria").notEmpty(),
  check(
    "fechaNacimiento",
    "La fecha de nacimiento es obligatoria y debe ser válida"
  )
    .notEmpty()
    .isISO8601(),
  validarErrores,
];

module.exports = {
  validarCamposAutor,
};
