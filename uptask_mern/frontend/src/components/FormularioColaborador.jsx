import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

export default function FormularioColaborador() {
  const [email, setEmail] = useState("");

  const { mostrarAlerta, alerta, submitColaborador } = useProyectos();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      mostrarAlerta({ msg: "El Email es obligatorio", error: true });
      return;
    }

    submitColaborador(email);
  };

  const { msg } = alerta;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}

      <div className="mb-5">
        <label
          htmlFor="email"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Email Colaborador
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email Del Usuario"
          className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value="Buscar Colaborador"
        className="bg-sky-600 hover:bg-sky-700 w-full uppercase text-white p-3 font-bold cursor-pointer transition-colors rounded text-sm "
      />
    </form>
  );
}
