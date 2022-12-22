import Usuario from "../models/Usuario.model.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

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

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  // Comprobar si el usuario existe.
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe.");
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar si el usuario esta confirmado.
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta aún no ha sido confirmada.");
    return res.status(403).json({ msg: error.message });
  }

  // Comprobar su password.
  if (await usuario.comprobarPassword(password)) {
    res.status(200).json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      toke: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("El password es incorrecto.");
    return res.status(403).json({ msg: error.message });
  }
};

const confirmar = async (req, res) => {
  console.log(req.params.token);
};

export { registrar, autenticar, confirmar };
