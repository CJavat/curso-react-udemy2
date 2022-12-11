import Image from "next/image";
import Layout from "../components/layout";
import styles from "../styles/nosotros.module.css";

export default function Nosotros() {
  return (
    <Layout
      title={"Nosotros"}
      description={"Sobre nosotros, GuitarLA, Tienda de musica "}
    >
      <main className="contenedor">
        <h2 className="heading"> Nosotros </h2>
      </main>

      <div className={styles.contenido}>
        <Image
          src="/img/nosotros.jpg"
          width={1000}
          height={800}
          alt="Imagen sobre nosotros"
        />

        <div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset
          </p>
          <p>
            It uses a dictionary of over 200 Latin words, combined with a
            handful of model sentence structures, to generate Lorem Ipsum which
            looks reasonable. The generated Lorem Ipsum is therefore always free
            from repetition, injected humour, or non-characteristic words etc.
            paragraphs words bytes lists Start with Lorem ipsum dolor sit
            amet...
          </p>
        </div>
      </div>
    </Layout>
  );
}
