const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//rutas
const libroRutas = require("./rutas/libro.rutas");
const autorRutas = require("./rutas/autor.rutas");

const app = express();
app.use(express.json());

// Conexión a MongoDB
const { MONGO_URL, MONGO_DB_NAME, PORT } = process.env;

mongoose
  .connect(MONGO_URL, { dbName: MONGO_DB_NAME })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.log("Error al conectar a MongoDB", err));

// Usar rutas
app.use("/libros", libroRutas);
app.use("/autores", autorRutas);

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
