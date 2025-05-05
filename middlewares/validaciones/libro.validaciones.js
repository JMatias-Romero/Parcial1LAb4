const { check, param, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Autor = require("../../modelos/autor.modelo");

// Middleware para validar errores
const validarErrores = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errors: errores.array() });
  }
  next();
};

// Validar campos obligatorios al crear o editar un libro
const validarCamposLibro = [
  check("titulo", "El titulo es obligatorio").notEmpty(),
  check("genero", "El genero es obligatorio").notEmpty(),
  check("publicacion", "La publicación es obligatoria").notEmpty(),
  check("disponible", "Disponible es obligatorio").notEmpty(),
  validarErrores,
];

//no se puede eliminar un libro asignado a un autor
const verificarLibroAsignadoAAutor = async (req, res, next) => {
  const { id } = req.params;

  try {
    const autorAsignado = await Autor.findOne({ libros: id });

    if (autorAsignado) {
      return res.status(400).json({
        message: "No se puede eliminar el libro, está asignado a un autor",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  validarCamposLibro,
  verificarLibroAsignadoAAutor,
};
