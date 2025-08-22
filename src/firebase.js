// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBYcr46yGftOv8izesWxeIDjN-ETamDcw",
  authDomain: "type-strike-a20f7.firebaseapp.com",
  projectId: "type-strike-a20f7",
  storageBucket: "type-strike-a20f7.appspot.com", 
  messagingSenderId: "833787177872",
  appId: "1:833787177872:web:5c15360d84b38530b26115"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
