require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Habilitar carpeta Public
app.use(express.static(path.resolve(__dirname, "../public")));

//Configuración global de rutas
app.use(require("./routes/index"));

mongoose.connect(process.env.URLDB, (err, res) => {
  if (err) throw err;
  console.log("Base de datos ONLINE");
});

app.listen(process.env.PORT, () => console.log("Escuchando puerto", process.env.PORT));
