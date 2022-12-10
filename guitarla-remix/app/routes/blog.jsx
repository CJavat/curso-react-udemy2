import { useLoaderData } from "@remix-run/react";
import ListadoPosts from "~/components/ListadoPosts";
import Post from "~/components/Post";
import { getPosts } from "~/models/post.server";
import styled from "~/styles/blog.css";

export function meta() {
  return {
    title: "GuitarLA - Nuestro Blog",
    description: "GuitarLA, Blog de música y ventas de guitarras",
  };
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styled,
    },
  ];
}

export async function loader() {
  const posts = await getPosts();

  return posts.data;
}

export default function Blog() {
  const posts = useLoaderData();

  return (
    <main className="contenedor">
      <ListadoPosts posts={posts} />
    </main>
  );
}
