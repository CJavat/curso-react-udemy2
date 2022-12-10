import { Outlet } from "@remix-run/react";

import styled from "~/styles/blog.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styled,
    },
  ];
}

export default function Blog() {
  return (
    <main className="contenedor">
      <Outlet />
    </main>
  );
}
