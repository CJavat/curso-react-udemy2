import Layout from "../components/layout";
import Link from "next/link";

export default function Pagina404() {
  return (
    <Layout title="Page Not Found">
      <p className="error">Pagina no encontrada </p>
      <p className="error">ERROR: 404 </p>

      <Link className="error-enlace" href="/">
        Ir a Inicio
      </Link>
    </Layout>
  );
}
