import express from "express";
import { registrar } from "../controllers/usuario.controller.js";
const router = express.Router();

// Autenticación, Registro y Confirmación de Usuarios.
router.post("/", registrar); // Crea un nuevo usuario.

export default router;
