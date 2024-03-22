// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-concours.firebaseapp.com",
  projectId: "mern-concours",
  storageBucket: "mern-concours.appspot.com",
  messagingSenderId: "429806470234",
  appId: "1:429806470234:web:79bf6fccfa3b1da90b4463"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);