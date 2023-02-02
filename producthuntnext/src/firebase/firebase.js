import { initializeApp } from "firebase/app";
import firebaseConfig from "./config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";

class Firebase {
  constructor() {
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
  }

  // Registra un usuario.
  async registrar(nombre, email, password) {
    const nuevoUsuario = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    return await updateProfile(nuevoUsuario.user, { displayName: nombre });
  }

  // Iniciar sesión del usuario.
  async login(email, password) {
    const usuarioLogin = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    return await updateProfile(usuarioLogin.user, { displayName: email });
  }

  // Cerrar sesión del usuario.
  async cerrarSesion() {
    const auth = getAuth();
    const sesionCerrada = await signOut(auth);
    console.log(sesionCerrada);
  }
}

const firebase = new Firebase();
export default firebase;
