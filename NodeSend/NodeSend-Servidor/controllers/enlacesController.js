const Enlaces = require("../models/Enlace");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const nuevoEnlace = async (req, res, next) => {
  // Revisar si hay errores.
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // Crear un objeto de Enlace.
  const { nombre_original, password } = req.body;

  const enlace = new Enlaces();
  enlace.url = shortid.generate();
  enlace.nombre = shortid.generate();
  enlace.nombre_original = nombre_original;

  // Si el usuario esta autenticado.
  if (req.usuario) {
    const { password, descargas } = req.body;

    // Asignar a enlace el numero de descargas.
    if (descargas) {
      enlace.descargas = descargas;
    }

    // Asignar un password.
    if (password) {
      const salt = await bcrypt.genSalt(10);
      enlace.password = await bcrypt.hash(password, salt);
    }

    // Asigar el autor.
    enlace.autor = req.usuario.id;
  }

  // Almacenar en la DB.
  try {
    await enlace.save();
    return res.status(200).json({ msg: `${enlace.url}` });
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { nuevoEnlace };