import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [proyecto, setProyecto] = useState({});
  const [cargando, setCargando] = useState(false);
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
  const [tarea, setTarea] = useState({});
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };

        const { data } = await clienteAxios("/proyectos", config);
        setProyectos(data);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerProyectos();
  }, []);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  const submitProyecto = async (proyecto) => {
    if (proyecto.id) {
      await editarProyecto(proyecto);
    } else {
      await nuevoProyecto(proyecto);
    }
  };

  const editarProyecto = async (proyecto) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/proyectos/${proyecto.id}`,
        proyecto,
        config
      );

      // Sincronizar el State.
      const proyectosActualizados = proyectos.map((proyectoState) =>
        proyectoState._id === data.proyectoAlmacenado._id
          ? data.proyectoAlmacenado
          : proyectoState
      );
      setProyectos(proyectosActualizados);

      // Mostrar alerta.
      setAlerta({ msg: "Proyecto Actualizado Correctamente", error: false });

      // Redireccionar.
      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoProyecto = async (proyecto) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/proyectos", proyecto, config);

      setProyectos([...proyectos, data.proyectoAlmacenado]);

      setAlerta({ msg: "Proyecto Creado Correctamente", error: false });

      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerProyecto = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/proyectos/${id}`, config);
      setProyecto(data);
    } catch (error) {
      console.log(error);
    }
    setCargando(false);
  };

  const eliminarProyecto = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);

      // Sincronizar el State.
      const proyectosActualizados = proyectos.filter(
        (proyectoState) => proyectoState._id !== id
      );
      setProyectos(proyectosActualizados);

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea);
    setTarea({});
  };

  const submitTarea = async (tarea) => {
    if (tarea?.id) {
      await editarTarea(tarea);
    } else {
      await crearTarea(tarea);
    }
  };

  const editarTarea = async (tarea) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/tareas/${tarea.id}`,
        tarea,
        config
      );

      // Agrega la tarea al State.
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = proyectoActualizado.tareas.map(
        (tareaState) => (tareaState._id === data._id ? data : tareaState)
      );
      setProyecto(proyectoActualizado);

      setAlerta({});
      setModalFormularioTarea(false);
    } catch (error) {
      console.log(error);
    }
  };

  const crearTarea = async (tarea) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/tareas", tarea, config);

      // Agrega la tarea al State.
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = [...proyecto.tareas, data];

      setProyecto(proyectoActualizado);
      setAlerta({});
      setModalFormularioTarea(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalEditarTareas = (tarea) => {
    setTarea(tarea);
    setModalFormularioTarea(true);
  };

  const handleModalEliminarTarea = (tarea) => {
    setTarea(tarea);
    setModalEliminarTarea(!modalEliminarTarea);
  };

  const eliminarTarea = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/tareas/${tarea.id}`,
        tarea,
        config
      );

      // Agrega la tarea al State.
      const proyectoActualizado = { ...proyecto };

      setProyecto(proyectoActualizado);
      setAlerta({});
      setModalEliminarTarea(false);
      setTarea({});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        alerta,
        proyecto,
        cargando,
        tarea,
        modalFormularioTarea,
        modalEliminarTarea,
        mostrarAlerta,
        submitProyecto,
        obtenerProyecto,
        eliminarProyecto,
        submitTarea,
        eliminarTarea,
        handleModalTarea,
        handleModalEditarTareas,
        handleModalEliminarTarea,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };

export default ProyectosContext;
