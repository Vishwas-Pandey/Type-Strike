import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

const LeaderBoard = () => {
  const [topScores, setTopScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const q = query(
          collection(db, "scores"),
          orderBy("score", "desc"),
          limit(3)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => doc.data());
        setTopScores(data);
        console.log("Top scores fetched:", data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="mt-6 text-white">
      <h2 className="text-xl font-bold mb-2">🏆 Top 3 Scores</h2>
      <ul className="space-y-1">
        {topScores.map((entry, index) => (
          <li key={index}>
            {index + 1}. <strong>{entry.name}</strong>: {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderBoard;
