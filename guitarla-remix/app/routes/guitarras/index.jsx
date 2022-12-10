import { useLoaderData } from "@remix-run/react";
import ListadoGuitarras from "~/components/ListadoGuitarras";
import { getGuitarras } from "~/models/guitarras.server";

export function meta() {
  return {
    title: "GuitarraLA - Tienda de Guitarras",
    description: "GuitarraLA - Nuestra colección de guitarras",
  };
}

export async function loader() {
  const guitarras = await getGuitarras();

  return guitarras.data;
}

export default function Tienda() {
  const guitarras = useLoaderData();

  return <ListadoGuitarras guitarras={guitarras} />;
}
