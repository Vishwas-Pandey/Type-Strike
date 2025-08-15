import React from "react";

const ScoreBoard = ({ score, lives, streak }) => {
  return (
    <div className="text-right text-white space-y-1 text-lg font-semibold">
      <p>Score: {score}</p>
      <p>Lives: {lives}</p>
      <p className="text-yellow-400">🔥 Streak: {streak}</p>
    </div>
  );
};

export default ScoreBoard;
