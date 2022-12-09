import { Link } from "@remix-run/react";
import Logo from "../../public/img/logo.svg";
import { Navegacion } from "./Navegacion";

export const Header = () => {
  return (
    <header className="header">
      <div className="contenedor barra">
        <Link to="/">
          <img className="logo" src={Logo} alt="Logo" />
        </Link>

        <Navegacion />
      </div>
    </header>
  );
};
