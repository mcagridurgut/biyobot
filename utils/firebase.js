import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzXmec_jUWRNKNKK7PXE7XMcH9_sFR-Fc",
  authDomain: "biyobo.firebaseapp.com",
  databaseURL: "https://biyobo-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "biyobo",
  storageBucket: "biyobo.appspot.com",
  messagingSenderId: "893931688198",
  appId: "1:893931688198:web:ad080ec477f6bbc4e10e87",
  measurementId: "G-JZ09JFGH6K",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
