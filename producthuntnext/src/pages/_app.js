import App from "next/app";
import firebase, { FirebaseContext } from "../firebase";
import useAutenticacion from "../hooks/useAutenticacion";

const MyApp = (props) => {
  const usuario = useAutenticacion();
  // console.log(usuario);
  const { Component, pageProps } = props;
  console.log("FIREBASEEEE -> ", firebase);
  return (
    <FirebaseContext.Provider value={{ firebase, usuario }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
};

export default MyApp;
