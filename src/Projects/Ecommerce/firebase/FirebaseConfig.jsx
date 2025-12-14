// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCI2DSU0obQQbo9QvwBrzzYBQMY4ot5X94",
  authDomain: "ecommerce-e739b.firebaseapp.com",
  projectId: "ecommerce-e739b",
  storageBucket: "ecommerce-e739b.firebasestorage.app",
  messagingSenderId: "570180370692",
  appId: "1:570180370692:web:4f58daa4368256127f1051"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app)

export {fireDB, auth}