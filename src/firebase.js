import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCz3X7-phypVYBPIJNsUgf3Uzku1aA48eA",
  authDomain: "type-strike-e7cf8.firebaseapp.com",
  projectId: "type-strike-e7cf8",
  storageBucket: "type-strike-e7cf8.firebasestorage.app",
  messagingSenderId: "947329154313",
  appId: "1:947329154313:web:868c41985cb9f1b21127d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
