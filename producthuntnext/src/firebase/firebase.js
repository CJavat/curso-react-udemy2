import { initializeApp } from "firebase/app";
import firebaseConfig from "./config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
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

    // return await nuevoUsuario.user.updateProfile.displayName({
    //   displayName: nombre,
    // });

    return await updateProfile(nuevoUsuario.user, { displayName: nombre });
  }
}

const firebase = new Firebase();
export default firebase;
