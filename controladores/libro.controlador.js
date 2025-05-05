const Libro = require("../modelos/libro.modelo");
const Autor = require("../modelos/autor.modelo");

// GET /libros → Obtener todos los libros
const getAllLibros = async (req, res) => {
  try {
    const libros = await Libro.find();
    res.status(200).json(libros);
  } catch (error) {
    console.error("Error en getAllLibros: ", error);
    res.status(500).json({ message: "Error al obtener los libros", error });
  }
};

// GET /libro/:id → Obtener un libro por ID
const getLibroById = async (req, res) => {
  try {
    const { id } = req.params;
    const libro = await Libro.findById(id);

    if (!libro) {
      return res.status(404).json({ message: "libro no encontrado" });
    }

    res.status(200).json(libro);
  } catch (error) {
    console.error("Error en getLibroById:", error);
    res.status(500).json({ message: "Error al obtener el libro", error });
  }
};

// POST /libro → Crear un nuevo libro
const createLibro = async (req, res) => {
  try {
    const { titulo, resumen, genero, publicacion, disponible } = req.body;

    const nuevoLibro = new Libro({
      titulo,
      resumen,
      genero,
      publicacion,
      disponible,
    });

    const libroGuardado = await nuevoLibro.save();
    res.status(201).json(libroGuardado);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el libro", error });
  }
};

//actualizar libro
const updateLibro = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const libroEditado = await Libro.findByIdAndUpdate(id, datosActualizados, {
      new: true,
    });

    if (!libroEditado) {
      return res.status(404).json({ message: "libro no encontrado" });
    }

    res.status(200).json(libroEditado);
  } catch (error) {
    console.error("Error en updateLibro:", error);
    res.status(500).json({ message: "Error al actualizar el libro", error });
  }
};

//eliminar un libro
const deleteLibro = async (req, res) => {
  try {
    const { id } = req.params;

    const libroEliminado = await Libro.findByIdAndDelete(id);

    if (!libroEliminado) {
      return res.status(404).json({ message: "libro no encontrado" });
    }

    res.status(200).json({ message: "libro eliminado correctamente" });
  } catch (error) {
    console.error("Error en deleteLibro:", error);
    res.status(500).json({ message: "Error al eliminar el libro", error });
  }
};

module.exports = {
  getAllLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro,
};
