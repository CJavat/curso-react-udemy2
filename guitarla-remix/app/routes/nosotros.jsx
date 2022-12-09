import imagen from "../../public/img/nosotros.jpg";
import styles from "~/styles/nostros.css";

export function meta() {
  return {
    title: "GuitarLA - Sobre Nosotros",
    description: "Venta de guitarras, blog de música.",
  };
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel: "preload",
      href: imagen,
      as: "image",
    },
  ];
}

export default function Nosotros() {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading ">Nosotros</h2>
      <div className="contenido">
        <img src={imagen} alt="Imagen sobre nosotros" />
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            commodi enim assumenda fugit eveniet suscipit perspiciatis tempore
            et ipsam unde illo vitae atque, modi voluptate beatae maxime ipsum
            eius architecto.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            commodi enim assumenda fugit eveniet suscipit perspiciatis tempore
            et ipsam unde illo vitae atque, modi voluptate beatae maxime ipsum
            eius architecto.
          </p>
        </div>
      </div>
    </main>
  );
}
