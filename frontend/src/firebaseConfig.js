import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

// Your Firebase configuration object (get this from Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyAyGpuxZUz0kfyQiqEGjlIk311KZQZCA9s",
    authDomain: "sing-project-7899f.firebaseapp.com",
    projectId: "sing-project-7899f",
    storageBucket: "sing-project-7899f.appspot.com",
    messagingSenderId: "380738226550",
    appId: "1:380738226550:web:115aefcde925dabb2b1257"
  };

  //Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const googleProvider = new GoogleAuthProvider();