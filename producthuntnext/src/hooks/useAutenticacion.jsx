import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function useAutenticacion() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsuscribe = onAuthStateChanged(auth, (usuario) => {
      if (usuario) {
        setUsuarioAutenticado(usuario);
      } else {
        setUsuarioAutenticado(null);
      }
    });

    return () => unsuscribe();
  }, []);

  return usuarioAutenticado;
}

export default useAutenticacion;
