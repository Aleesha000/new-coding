// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import db from "./firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGgsD0On0LdXrI2ZCDTGc4WR0y3ykeapU",
  authDomain: "first-project-ccadc.firebaseapp.com",
  projectId: "first-project-ccadc",
  storageBucket: "first-project-ccadc.firebasestorage.app",
  messagingSenderId: "418700641894",
  appId: "1:418700641894:web:5caec0bd90e01664cccfa7"
};

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// const db = firebase.firestore();

// export default db;
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

export { db };