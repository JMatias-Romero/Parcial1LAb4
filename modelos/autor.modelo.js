const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const autorSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  nacionalidad: {
    type: String,
    required: true,
  },
  libros: {
    type: Schema.Types.ObjectId,
    ref: "Libro",
    default: null,
  },
});

module.exports = mongoose.model("Autor", autorSchema);
