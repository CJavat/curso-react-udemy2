import Usuario from "../models/Usuario.model.js";
import generarId from "../helpers/generarId.js";

const registrar = async (req, res) => {
  // Evitar registros duplicados.
  const { email } = req.body;
  const existeUsuarios = await Usuario.findOne({ email });

  if (existeUsuarios) {
    const error = new Error("Usuario ya registrado.");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    const usuarioAlmacenado = await usuario.save();

    res.status(200).json({
      status: "success",
      usuarioAlmacenado,
    });
  } catch (error) {
    console.log(error);
  }
};

export { registrar };
