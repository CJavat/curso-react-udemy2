import useProyectos from "../hooks/useProyectos";

export default function Proyectos() {
  const { proyectos } = useProyectos();

  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>

      <div className=""></div>
    </>
  );
}
