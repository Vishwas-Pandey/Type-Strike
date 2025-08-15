const PauseMenu = ({ onResume, onRestart, onQuit, soundEnabled, toggleSound }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 text-white z-50">
      <h2 className="text-3xl font-bold mb-6">Game Paused</h2>

      <button
        onClick={onResume}
        className="bg-blue-600 px-6 py-3 rounded mb-4 hover:bg-blue-700 transition"
      >
        Resume
      </button>

      <button
        onClick={onRestart}
        className="bg-yellow-600 px-6 py-3 rounded mb-4 hover:bg-yellow-700 transition"
      >
        Restart
      </button>

      <button
        onClick={onQuit}
        className="bg-red-600 px-6 py-3 rounded mb-4 hover:bg-red-700 transition"
      >
        Quit
      </button>

      <button
        onClick={toggleSound}
        className="mt-4 text-sm text-gray-300 hover:text-white"
      >
        Sound: {soundEnabled ? "On 🔊" : "Off 🔇"}
      </button>
    </div>
  );
};

export default PauseMenu;
