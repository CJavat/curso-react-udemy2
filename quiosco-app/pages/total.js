import { useEffect, useCallback } from "react";
import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout";
import { formatearDinero } from "../helpers";

export default function Total() {
  const { pedido, nombre, total, setNombre, colocarOrden } = useQuiosco();

  const comprobarPedido = useCallback(() => {
    return pedido.length === 0 || nombre === "" || nombre.length < 3;
  }, [pedido, nombre]);

  useEffect(() => {
    comprobarPedido();
  }, [pedido, comprobarPedido]);

  return (
    <Layout pagina="Total y Confirmar Pedido">
      <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
      <p className="text-2xl my-10">Confirma tu pedido a continuacion:</p>

      <form onSubmit={colocarOrden}>
        <div>
          <label
            htmlFor="nombre"
            className="block uppercase text-slate-800 font-bold text-xl"
          >
            Nombre
          </label>

          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
          />
        </div>

        <div className="mt-10">
          <p className="text-2xl">
            Total a Pagar:{" "}
            <span className="font-bold">${formatearDinero(total)}</span>{" "}
          </p>
        </div>

        <div>
          <input
            type="submit"
            name=""
            value="Confirmar Pedido"
            className={`${
              comprobarPedido()
                ? "bg-indigo-100"
                : "bg-indigo-600 hover:bg-indigo-800"
            }  w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center hover:cursor-pointer`}
            disabled={comprobarPedido()}
          />
        </div>
      </form>
    </Layout>
  );
}
