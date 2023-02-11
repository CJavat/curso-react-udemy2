import Image from "next/image";
import Link from "next/link";

function Header() {
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
      </div>
    </header>
  );
}

export default Header;

//<div className="w-64 mb-8 md:mb-0">
