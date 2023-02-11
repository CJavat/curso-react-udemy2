const express = require("express");
const conectarDB = require("./config/db");

// Crear el servidor.
const app = express();

// Conectar a la DB.
conectarDB();

// Puerto de la app.
const PORT = process.env.PORT || 4000;

// Habilitar leer los valores de un body.
app.use(express.json());

// Rutas de la app.
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/enlaces", require("./routes/enlaces"));

// Arrancar la app.
app.listen(PORT, "0.0.0.0", () => {
  console.log(`El servidor esta funcionando n el puerto ${PORT}`);
});
