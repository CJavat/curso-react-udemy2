import express from "express";
import {
  registrar,
  autenticar,
  confirmar,
} from "../controllers/usuario.controller.js";
const router = express.Router();

// Autenticación, Registro y Confirmación de Usuarios.
router.post("/", registrar); // Crea un nuevo usuario.
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);

export default router;
