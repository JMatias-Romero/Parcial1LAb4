const Libro = require("../modelos/libro.modelo");
const Autor = require("../modelos/autor.modelo");

// GET /autores → Obtener todos los autores
const getAllAutores = async (req, res) => {
  try {
    const autores = await Autor.find().populate("libros");
    res.status(200).json(autores);
  } catch (error) {
    console.error("Error en getAllAutores: ", error);
    res.status(500).json({ message: "Error al obtener los autores", error });
  }
};

// GET /autor/:id → Obtener un autor por ID
const getAutorById = async (req, res) => {
  try {
    const { id } = req.params;
    const autor = await Autor.findById(id).populate("libros");

    if (!autor) {
      return res.status(404).json({ message: "autor no encontrado" });
    }

    res.status(200).json(autor);
  } catch (error) {
    console.error("Error en getAutorById:", error);
    res.status(500).json({ message: "Error al obtener el autor", error });
  }
};

// POST /autor → Crear un nuevo autor
const createAutor = async (req, res) => {
  try {
    const { nombre, bio, fechaNacimiento, nacionalidad, libros } = req.body;

    const nuevoAutor = new Autor({
      nombre,
      bio,
      fechaNacimiento,
      nacionalidad,
      libros,
    });

    const autorGuardado = await nuevoAutor.save();
    res.status(201).json(autorGuardado);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el autor", error });
  }
};

//actualizar autor
const updateAutor = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const autorEditado = await Autor.findByIdAndUpdate(id, datosActualizados, {
      new: true,
    });

    if (!autorEditado) {
      return res.status(404).json({ message: "autor no encontrado" });
    }

    res.status(200).json(autorEditado);
  } catch (error) {
    console.error("Error en updateAutor:", error);
    res.status(500).json({ message: "Error al actualizar el autor", error });
  }
};

//eliminar un autor
const deleteAutor = async (req, res) => {
  try {
    const { id } = req.params;

    const autorEliminado = await Autor.findByIdAndDelete(id);

    if (!autorEliminado) {
      return res.status(404).json({ message: "autor no encontrado" });
    }

    res.status(200).json({ message: "autor eliminado correctamente" });
  } catch (error) {
    console.error("Error en deleteAutor:", error);
    res.status(500).json({ message: "Error al eliminar el autor", error });
  }
};

module.exports = {
  getAllAutores,
  getAutorById,
  createAutor,
  updateAutor,
  deleteAutor,
};
