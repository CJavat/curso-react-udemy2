import { useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import authContext from "context/auth/authContext";

function Header() {
  // Extraer el usuario autenticado del storage.
  const AuthContext = useContext(authContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = AuthContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <Link href="/">
        <Image
          src="logo.svg"
          alt="React NodeSend Logo"
          width="200"
          height="100"
          className="w-64 mb-8 md:mb-0"
        />
      </Link>

      <div className="">
        {usuario ? (
          <div className="flex items-center">
            <p className="mr-2">Hola {usuario.nombre}</p>
            <button
              type="button"
              className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
              onClick={() => cerrarSesion()}
            >
              Cerrar Sesion
            </button>
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2"
            >
              Iniciar Sesion
            </Link>

            <Link
              href="/crear-cuenta"
              className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
            >
              Crear Una Cuenta
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

//<div className="w-64 mb-8 md:mb-0">
