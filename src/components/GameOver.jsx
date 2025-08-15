import React from "react";

const GameOver = ({ score, onRestart, onQuit }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white space-y-6">
      <h1 className="text-4xl font-bold">Game Over</h1>
      <p className="text-xl">Your Score: {score}</p>
      <div className="flex justify-center gap-x-6 mt-6">
        <button
          onClick={onRestart}
          className="bg-yellow-500 text-black px-6 py-3 rounded-md text-lg hover:bg-yellow-400 transition"
        >
          Play Again
        </button>
        <button
          onClick={onQuit}
          className="bg-red-600 px-6 py-3 rounded-md text-white text-lg hover:bg-red-500 transition"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default GameOver;
