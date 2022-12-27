import { useContext } from "react";
import ProyectosContext from "../context/PyectosProvider";

const useProyectos = () => {
  return useContext(ProyectosContext);
};

export default useProyectos;
