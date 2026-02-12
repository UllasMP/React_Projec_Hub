// Import the functions you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// 🔐 Load Firebase config from single JSON env secret
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
