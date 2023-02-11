const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const {
  subirArchivo,
  eliminarArchivo,
} = require("../controllers/archivosController");

router.post("/", auth, subirArchivo);

module.exports = router;
