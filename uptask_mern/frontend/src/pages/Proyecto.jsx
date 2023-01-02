import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import ModalFormularioTarea from "../components/ModalFormularioTarea";
import Tarea from "../components/Tarea";
import useProyectos from "../hooks/useProyectos";
import Alerta from "../components/Alerta";
import Colaborador from "../components/Colaborador";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";

export default function Proyecto() {
  const params = useParams();

  const { proyecto, cargando, alerta, obtenerProyecto, handleModalTarea } =
    useProyectos();
  const { nombre } = proyecto;

  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);

  const { msg } = alerta;

  return cargando ? (
    "Cargando..."
  ) : (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{nombre}</h1>

        <div className="flex items-center gap-1 text-gray-400 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>

          <Link
            to={`/proyectos/editar/${params.id}`}
            className="uppercase font-bold"
          >
            Editar
          </Link>
        </div>
      </div>

      <button
        type="button"
        className="text-sm px-5 py-3 mt-5 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center flex gap-2 justify-center items-center"
        onClick={handleModalTarea}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        Nueva Tarea
      </button>

      <p className="font-bold text-xl mt-10">Tareas del Proyecto</p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/3 lg:w-1/4">
          {msg && <Alerta alerta={alerta} />}
        </div>
      </div>

      <div className="bg-white shadow mt-10 rounded-lg">
        {proyecto.tareas?.length ? (
          proyecto.tareas?.map((tarea) => (
            <Tarea key={tarea._id} tarea={tarea} />
          ))
        ) : (
          <p className="text-center my-5 p-10">
            No hay tareas en éste proyecto
          </p>
        )}
      </div>

      <div className="flex items-center justify-between mt-10">
        <p className="font-bold text-xl">Colaboradores</p>

        <Link
          to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
          className="text-gray-400 hover:text-black uppercase font-bold"
        >
          Añadir
        </Link>
      </div>

      <div className="bg-white shadow mt-10 rounded-lg">
        {proyecto.colaboradores?.length ? (
          proyecto.colaboradores?.map((colaborador) => (
            <Colaborador key={colaborador._id} colaborador={colaborador} />
          ))
        ) : (
          <p className="text-center my-5 p-10">
            No hay colaboradores en éste proyecto
          </p>
        )}
      </div>

      <ModalFormularioTarea />
      <ModalEliminarTarea />
      <ModalEliminarColaborador />
    </>
  );
}
