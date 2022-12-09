import { Navegacion } from "./Navegacion";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="contenedor">
        <Navegacion />

        <p className="copyright">
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};
