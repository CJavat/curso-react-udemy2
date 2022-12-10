import { useLoaderData } from "@remix-run/react";
import ListadoPosts from "~/components/ListadoPosts";
import { getPosts } from "~/models/post.server";

export function meta() {
  return {
    title: "GuitarLA - Nuestro Blog",
    description: "GuitarLA, Blog de música y ventas de guitarras",
  };
}

export async function loader() {
  const posts = await getPosts();

  return posts.data;
}

export default function Blog() {
  const posts = useLoaderData();

  return <ListadoPosts posts={posts} />;
}
