import Usuario from "../models/Usuario.model.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro } from "../helpers/email.js";

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
    await usuario.save();

    // Enviar el email de confirmacion.
    emailRegistro({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });

    res.status(200).json({
      status: "success",
      msg: "Usuario Creado Correctamente, Revisa tu email para confirmar tu cuenta.",
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
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("El password es incorrecto.");
    return res.status(403).json({ msg: error.message });
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({ token });

  if (!usuarioConfirmar) {
    const error = new Error("Token no válido.");
    return res.status(403).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = "";
    await usuarioConfirmar.save();
    res
      .status(200)
      .json({ status: "success", msg: "Usuario Confirmado Correctamente." });
  } catch (error) {
    console.log(error);
  }
};

const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe.");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuario.token = generarId();
    await usuario.save();
    res.status(200).json({
      status: "success",
      msg: "Hemos enviado un email con las instrucciones.",
    });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await Usuario.findOne({ token });
  if (tokenValido) {
    res
      .status(200)
      .json({ status: "success", msg: "Token válido y el usuario existe." });
  } else {
    const error = new Error("Token no válido.");
    return res.status(404).json({ msg: error.message });
  }
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await Usuario.findOne({ token });
  if (usuario) {
    usuario.password = password;
    usuario.token = "";
    await usuario.save();

    try {
      res
        .status(200)
        .json({ status: "success", msg: "Password Modificado Correctamente." });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token no válido.");
    return res.status(404).json({ msg: error.message });
  }
};

const perfil = async (req, res) => {
  const { usuario } = req;

  res.json(usuario);
};

export {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
};
