import { getPost } from "~/models/post.server";
import { useLoaderData } from "@remix-run/react";
import { formatearFecha } from "~/utils/helpers";
import styles from "~/styles/blog.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export function meta({ data }) {
  if (!data) {
    return {
      title: `Entrada no encontrada`,
      description: `Guitarras, venta de guitarras, guitarra no encontrada`,
    };
  }

  return {
    title: `GuitarLA - ${data.data[0].attributes.titulo}`,
    description: `Guitarras, venta de guitarras, entrada ${data.data[0].attributes.titulo}`,
  };
}

export async function loader({ params }) {
  const { postsUrl } = params;
  const post = await getPost(postsUrl);

  if (post.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Entrada no encontrada",
    });
  }

  return post;
}

export default function Post() {
  const post = useLoaderData();
  const { titulo, contenido, imagen, publishedAt } = post?.data[0]?.attributes;

  return (
    <article className="post mt-3">
      <img
        className="imagen"
        src={imagen.data.attributes.formats.medium.url}
        alt={`Imagen blog ${titulo}`}
      />
      <div className="contenido">
        <h3 className="">{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>
        <p className="texto">{contenido}</p>
      </div>
    </article>
  );
}
