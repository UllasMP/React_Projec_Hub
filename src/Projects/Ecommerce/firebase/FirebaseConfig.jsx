// Import the functions you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Load Firebase config from GitHub secret
console.log("RAW ENV:", import.meta.env.VITE_FIREBASE_CONFIG);

let firebaseConfig;

try {
  firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
  console.log("PARSED CONFIG:", firebaseConfig);
} catch (e) {
  console.error("JSON PARSE FAILED:", e);
}

const app = initializeApp(firebaseConfig);


// Initialize Firebase


const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
