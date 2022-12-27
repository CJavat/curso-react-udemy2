import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import proyectoRoutes from "./routes/proyecto.routes.js";
import tareaRoutes from "./routes/tarea.routes.js";
import cors from "cors";

const app = express();
app.use(express.json());
dotenv.config();
conectarDB();

// Configurar CORS.
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      // Puede consultar la API.
      callback(null, true);
    } else {
      // No esta permitido.
      callback(new Error("Error de Cors."));
    }
  },
};

app.use(cors(corsOptions));

//! Routing.
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareaRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}...`);
});
