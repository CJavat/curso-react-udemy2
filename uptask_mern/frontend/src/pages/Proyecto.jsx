import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";

export default function Proyecto() {
  const params = useParams();

  const { obtenerProyecto, proyecto, cargando } = useProyectos();
  const { nombre } = proyecto;

  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);

  return cargando ? (
    "Cargando..."
  ) : (
    <div>
      <h1 className="font-black text-4xl">{nombre}</h1>
    </div>
  );
}
