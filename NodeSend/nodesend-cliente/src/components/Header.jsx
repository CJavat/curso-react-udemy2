import Image from "next/image";

function Header() {
  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <Image
        src="logo.svg"
        alt="React NodeSend Logo"
        width="200"
        height="100"
      />
    </header>
  );
}

export default Header;

//<div className="w-64 mb-8 md:mb-0">
