import React, { useState, useEffect } from "react";
import { useSound } from "../useSound";

const startScreenSound = "/Sounds/StartScreen.mp3";

const StartScreen = ({ onStart, soundEnabled, toggleSound, setPlayerName }) => {
  const [showAbout, setShowAbout] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [showNamePrompt, setShowNamePrompt] = useState(false);

  const { play: playLobby, stop: stopLobby } = useSound(startScreenSound, {
    loop: true,
    volume: 0.5,
  });

  useEffect(() => {
    if (soundEnabled) playLobby();
    else stopLobby();
    return () => stopLobby();
  }, [soundEnabled]);

  const handleStartClick = () => {
    setShowNamePrompt(true);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    stopLobby();
    setPlayerName(nameInput.trim());
    onStart();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stars text-white px-6 text-center">
      <h1 className="text-5xl font-extrabold mb-10 tracking-wide"> ⌨️ Type Strike</h1>

      {!showNamePrompt ? (
        <>
          <p className="text-lg text-gray-300 italic mb-6">
         Strike fast. Type faster. Dominate the board!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
            <button
              onClick={handleStartClick}
              className="w-48 bg-green-600 px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition"
            >
              Start Game
            </button>
            <button
              onClick={toggleSound}
              className="w-48 bg-slate-800 px-6 py-3 rounded-lg text-lg font-medium hover:bg-slate-700"
            >
              Sound: {soundEnabled ? "On 🔊" : "Off 🔇"}
            </button>
            <button
              onClick={() => setShowAbout((p) => !p)}
              className="w-48 bg-purple-600 px-6 py-3 rounded-lg text-lg font-medium hover:bg-purple-700"
            >
              {showAbout ? "Hide About" : "About"}
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleNameSubmit} className="w-full max-w-md">
          <p className="mb-4 text-xl text-gray-300">Enter your name to begin:</p>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="w-full p-3 bg-transparent border border-gray-400 text-white font-bold rounded-lg text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Your Name"
            autoFocus
          />
          <button
            type="submit"
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg"
          >
            Start
          </button>
        </form>
      )}

      {showAbout && (
        <div className="max-w-xl mt-8 text-gray-300 text-sm sm:text-base">
          <p><strong className="text-white">Type Strike</strong> is a high-speed typing challenge where every keystroke counts. Eliminate targets, rack up points, and climb the global leaderboard!</p>
        </div>
      )}
    </div>
  );
};

export default StartScreen;
