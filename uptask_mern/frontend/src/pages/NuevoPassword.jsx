import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

export default function NuevoPassword() {
  const params = useParams();
  const { token } = params;

  const [password, setPassword] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [passwordModificado, setPasswordModificado] = useState(false);

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const { data } = await clienteAxios(
          `/usuarios/olvide-password/${token}`
        );
        setTokenValido(true);
      } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: "El password debe ser minimo de 6 caracteres.",
        error: true,
      });
      return;
    }

    try {
      const url = `/usuarios/olvide-password/${token}`;

      const { data } = await clienteAxios.post(url, { password });
      setAlerta({ msg: data.msg, error: false });
      setPasswordModificado(true);
      setPassword("");
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reestablece tu pasword y no pierdas acceso a tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Nuevo Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Escribe tu nuevo Password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Guardar nuevo password"
            className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}
      <div>
        {passwordModificado && (
          <Link
            to="/"
            className="block text-center my-5 text-slate-500 uppercase text-sm"
          >
            <span className="text-sky-600 font-bold"> Inicia Sesión</span>
          </Link>
        )}
      </div>
    </>
  );
}
