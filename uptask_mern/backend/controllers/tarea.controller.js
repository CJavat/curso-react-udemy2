import Proyecto from "../models/Proyecto.model.js";
import Tarea from "../models/Tarea.model.js";

const agregarTarea = async (req, res) => {
  const { proyecto } = req.body;

  const existeProyecto = await Proyecto.findById(proyecto);
  if (!existeProyecto) {
    const error = new Error("El proyecto no existe.");
    return res.status(404).json({ status: "error", msg: error.message });
  }

  if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes los permisos para añadir tareas.");
    return res.status(403).json({ status: "error", msg: error.message });
  }

  try {
    const tareaAlmacenada = await Tarea.create(req.body);

    // Almacenar el ID en el proyecto.
    existeProyecto.tareas.push(tareaAlmacenada._id);
    await existeProyecto.save();

    res.json(tareaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const obtenerTarea = async (req, res) => {
  const { id } = req.params;
  const tarea = await Tarea.findById(id).populate("proyecto");

  if (!tarea) {
    const error = new Error("Tarea no encontrada.");
    return res.status(404).json({ status: "error", msg: error.message });
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida.");
    return res.status(403).json({ status: "error", msg: error.message });
  }

  res.status(200).json({ status: "success", tarea });
};

const actualizarTarea = async (req, res) => {
  const { id } = req.params;
  const tarea = await Tarea.findById(id).populate("proyecto");

  if (!tarea) {
    const error = new Error("Tarea no encontrada.");
    return res.status(404).json({ status: "error", msg: error.message });
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida.");
    return res.status(403).json({ status: "error", msg: error.message });
  }

  tarea.nombre = req.body.nombre || tarea.nombre;
  tarea.descripcion = req.body.descripcion || tarea.descripcion;
  tarea.prioridad = req.body.prioridad || tarea.prioridad;
  tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

  try {
    const tareaAlmacenada = await tarea.save();
    res.status(200).json(tareaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const eliminarTarea = async (req, res) => {
  const { id } = req.params;
  const tarea = await Tarea.findById(id).populate("proyecto");

  if (!tarea) {
    const error = new Error("Tarea no encontrada.");
    return res.status(404).json({ status: "error", msg: error.message });
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida.");
    return res.status(403).json({ status: "error", msg: error.message });
  }

  try {
    await tarea.deleteOne();
    res.status(200).json({ status: "success", msg: "La tarea se eliminó." });
  } catch (error) {
    console.log(error);
  }
};

const cambiarTarea = async (req, res) => {};

export {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarTarea,
};
