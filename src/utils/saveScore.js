import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const saveScore = async (name, score) => {
  try {
    await addDoc(collection(db, "scores"), {
      name,
      score,
      timestamp: serverTimestamp()
    });
  } catch (err) {
    console.error("Error saving score:", err);
  }
};
