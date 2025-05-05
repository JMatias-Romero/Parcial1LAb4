const express = require("express");
const router = express.Router();

//modelos
const Autor = require("../modelos/autor.modelo");

//controladores
const {
  getAllAutores,
  getAutorById,
  createAutor,
  updateAutor,
  deleteAutor,
} = require("../controladores/autor.controlador");

//middlewares
const validarId = require("../middlewares/validarID");
const {
  validarCamposAutor,
} = require("../middlewares/validaciones/autor.validaciones");

//Rutas
router.get("/", getAllAutores);
router.get("/:id", validarId("id", "Autor"), getAutorById);
router.post("/", validarCamposAutor, createAutor);
router.put("/:id", validarId("id", "Autor"), validarCamposAutor, updateAutor);
router.delete("/:id", validarId("id", "Autor"), deleteAutor);

module.exports = router;
