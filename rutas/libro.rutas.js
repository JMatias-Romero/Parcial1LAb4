const express = require("express");
const router = express.Router();

//modelos
const Libro = require("../modelos/libro.modelo");

//controladores
const {
  getAllLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro,
} = require("../controladores/libro.controlador");

//middlewares
const validarId = require("../middlewares/validarID");
const {
  validarCamposLibro,
  verificarLibroAsignadoAAutor,
} = require("../middlewares/validaciones/libro.validaciones");

//Rutas
router.get("/", getAllLibros);
router.get("/:id", validarId("id", "Libro"), getLibroById);
router.post("/", validarCamposLibro, createLibro);
router.put("/:id", validarId("id", "Libro"), validarCamposLibro, updateLibro);
router.delete(
  "/:id",
  validarId("id", "Libro"),
  verificarLibroAsignadoAAutor,
  deleteLibro
);

module.exports = router;
