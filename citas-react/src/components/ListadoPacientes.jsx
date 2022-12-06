import { useEffect } from "react";
import { Paciente } from "./Paciente";

export const ListadoPacientes = ({
  pacientes,
  setPaciente,
  eliminarPaciente,
}) => {
  useEffect(() => {
    console.log("Nuevo paciente.");
  }, [pacientes]);

  return (
    <div className="md:w-1/2 lg:3/5">
      <h2 className="font-black text-3xl text-center">ListadoPacientes</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Administra tus{" "}
        <span className="text-indigo-600 font-bold"> Pacientes y Citas</span>
      </p>
      {pacientes && pacientes.length ? (
        <div className="md:h-screen overflow-y-scroll">
          {pacientes.map((paciente) => (
            <Paciente
              key={paciente.id}
              paciente={paciente}
              setPaciente={setPaciente}
              eliminarPaciente={eliminarPaciente}
            />
          ))}
        </div>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">
            No hay pacientes registrados
          </h2>
          <p className="text-xl mt-5 mb-10 text-center text-indigo-600">
            Comienza agregando pacientes{" "}
            <span className="font-bold"> Y aparecerán en éste lugar.</span>
          </p>
        </>
      )}
    </div>
  );
};
