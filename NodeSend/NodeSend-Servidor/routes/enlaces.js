const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const { check } = require("express-validator");

const { nuevoEnlace } = require("../controllers/enlacesController");

router.post(
  "/",
  [
    check("nombre", "Sube un archivo").not().isEmpty(),
    check("nombre_original", "Sube un archivo").not().isEmpty(),
  ],
  auth,
  nuevoEnlace
);

module.exports = router;
