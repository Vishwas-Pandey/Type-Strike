import React, { useState, useEffect, useRef } from "react";
import InputBox from "../components/InputBox";
import ScoreBoard from "../components/ScoreBoard";
import Bug from "../components/Bug";
import GameOver from "../components/GameOver";
import StartScreen from "../components/StartScreen";
import PauseMenu from "../components/PauseMenu";
import { generate } from "random-words";
import { useSound } from "../useSound";
import { saveScore } from "../utils/saveScore";
import Leaderboard from "../components/LeaderBoard";


const bgSound = "/Sounds/Bg_Sound.mp3";
const comboSound = "/Sounds/combo.mp3";
const popSound = "/Sounds/pop sound.mp3";
const missSound = "/Sounds/miss.mp3";
const pauseSound = "/Sounds/Pause.mp3";
const gameOverSound = "/Sounds/Game_Over.mp3";
const tickSound = "/Sounds/tick.mp3";
const goSound = "/Sounds/go.mp3";
const highScoreSound = "/Sounds/highscore_sound.wav";

const TypingGame = () => {
  const bugIntervalRef = useRef(null);
  const highScoreSoundPlayed = useRef(false);
  const gameStartHighScore = useRef(0);
  const isFirstGame = useRef(true);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [countdown, setCountdown] = useState(null);
  const [input, setInput] = useState("");
  const [bugs, setBugs] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [gameState, setGameState] = useState("start");
  const [streak, setStreak] = useState(0);
  const [playerName, setPlayerName] = useState("");


  const { play: playBg, stop: stopBg } = useSound(bgSound, {
    loop: true,
    volume: 0.5,
    enabled: soundEnabled,
  });
  const { play: playCombo } = useSound(comboSound, {
    volume: 1.0,
    enabled: soundEnabled,
    interrupt: true,
  });
  const { play: playPop } = useSound(popSound, { enabled: soundEnabled });
  const { play: playMiss } = useSound(missSound, { enabled: soundEnabled });
  const { play: playPause } = useSound(pauseSound, { enabled: soundEnabled });
  const { play: playGameOver } = useSound(gameOverSound, {
    enabled: soundEnabled,
  });
  const { play: playTick } = useSound(tickSound, {
    volume: 1.0,
    enabled: soundEnabled,
    interrupt: true,
  });
  const { play: playGo } = useSound(goSound, {
    volume: 1.0,
    enabled: soundEnabled,
    interrupt: true,
  });
  const { play: playHighScore } = useSound(highScoreSound, {
    volume: 1.0,
    enabled: soundEnabled,
    interrupt: true,
  });

  const generateBug = () => ({
    id: Math.random().toString(36).substr(2, 9),
    word: generate(),
    left: Math.random() * 70 + 5,
  });

  const generateInitialBugs = () => {
    const numBugs = 1;
    const spacing = 70 / (numBugs + 1);
    return Array.from({ length: numBugs }, (_, i) => ({
      id: Math.random().toString(36).substr(2, 9),
      word: generate(),
      left: (i + 1) * spacing,
    }));
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && gameState === "playing") {
        setIsPaused((p) => {
          const nowPaused = !p;
          nowPaused ? (playPause(), stopBg()) : playBg();
          return nowPaused;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gameState]);

  useEffect(() => {
    if (gameState === "playing" && !isPaused) {
      bugIntervalRef.current = setInterval(
        () => setBugs((bs) => [...bs, generateBug()]),
        4000
      );
    } else {
      clearInterval(bugIntervalRef.current);
    }
    return () => clearInterval(bugIntervalRef.current);
  }, [gameState, isPaused]);

  useEffect(() => {
    const onVis = () => {
      if (document.hidden && gameState === "playing") {
        setIsPaused(true);
        stopBg();
        playPause();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [gameState]);

  useEffect(() => {
  if (lives <= 0) {
    setGameState("gameover");
    setBugs([]);
    stopBg();
    playGameOver();

    // 💾 Save to Firebase
    if (playerName && score > 0) {
      saveScore(playerName, score);
    }
  }
}, [lives]);

  useEffect(() => {
    if (gameState === "playing") playBg();
    return () => stopBg();
  }, [gameState]);

  const handleStart = () => {
    stopBg();
    highScoreSoundPlayed.current = false;
    gameStartHighScore.current = highScore;
    if (gameState === "gameover") isFirstGame.current = false;
    

    let count = 3;
    setCountdown(count);
    playTick();
    const timer = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
        playTick();
      } else if (count === 0) {
        setCountdown("GO!");
        playGo();
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setCountdown(null);
          setScore(0);
          setLives(3);
          setBugs(generateInitialBugs());
          setGameState("playing");
          setStreak(0);
        }, 1000);
      }
    }, 1000);
  };

  const handleSubmit = () => {
  if (isPaused || gameState !== "playing") return;

  const idx = bugs.findIndex((b) => b.word === input.trim().toLowerCase());

  if (idx !== -1) {
    playPop();
    setBugs((bs) => bs.filter((_, i) => i !== idx));
    const newStreak = streak + 1;
    const points = 10 + newStreak;

    setScore((prev) => {
      const newScore = prev + points;

      if (
        newScore > gameStartHighScore.current &&
        !highScoreSoundPlayed.current &&
        !isFirstGame.current
      ) {
        playHighScore();
        highScoreSoundPlayed.current = true;
      }

      setHighScore((oldHS) => (newScore > oldHS ? newScore : oldHS));
      return newScore;
    });

    setStreak(newStreak);
  } else {
    playMiss();
    setLives((l) => Math.max(0, l - 1));
    // setStreak(0);
    console.log("Wrong word, no penalty");
  }

  setInput("");
};

  const handleResume = () => {
    setIsPaused(false);
    playBg();
  };
  const handleRestart = () => {
    stopBg();
    highScoreSoundPlayed.current = false;
    gameStartHighScore.current = highScore;
    isFirstGame.current = false;
    setScore(0);
    setLives(3);
    setBugs(generateInitialBugs());
    setGameState("playing");
    setIsPaused(false);
    setStreak(0);
    playBg();
  };
  const handleQuit = () => {
    setGameState("start");
    setIsPaused(false);
    stopBg();
  };

  if (countdown !== null) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white text-7xl font-extrabold animate-pulse">
        {countdown}
      </div>
    );
  }

  if (gameState === "start") {
  return (
    <StartScreen
      onStart={handleStart}
      soundEnabled={soundEnabled}
      toggleSound={() => setSoundEnabled((s) => !s)}
      setPlayerName={setPlayerName}
    />
  );
}

  if (gameState === "gameover") {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center p-6 gap-4">
      <h1 className="text-4xl font-bold">Game Over</h1>

      <div className="text-lg font-semibold mt-2">
        🏆 Session High Score: {highScore}
      </div>

      <Leaderboard />

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleStart}
          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg text-white font-semibold"
        >
          Restart
        </button>
        <button
          onClick={handleQuit}
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg text-white font-semibold"
        >
          Quit
        </button>
      </div>
    </div>
  );
}


  return (
    <div className="relative min-h-screen w-screen bg-gradient-to-b from-indigo-900 via-black to-indigo-800 text-white flex flex-col bg-stars overflow-hidden">
      <div className="fixed top-6 right-6 z-50 text-right">
        <ScoreBoard score={score} lives={lives} streak={streak} />
        <p className="text-sm text-white mt-1">🏆 High Score: {highScore}</p>
      </div>

      {isPaused && (
        <PauseMenu
          onResume={handleResume}
          onRestart={handleRestart}
          onQuit={handleQuit}
          soundEnabled={soundEnabled}
          toggleSound={() => setSoundEnabled((s) => !s)}
        />
      )}

      <div className="relative flex-1 overflow-hidden w-full flex justify-center items-start">
        {bugs.map((bug) => (
          <Bug
            key={bug.id}
            word={bug.word}
            left={bug.left}
            fallSpeed={Math.max(2, 20 - score * 0.1)}
            isPaused={isPaused}
            onFallComplete={() => {
              playMiss();
              setBugs((bs) => bs.filter((b) => b.id !== bug.id));
              setLives((l) => Math.max(0, l - 1));
              setStreak(0);
            }}
          />
        ))}
      </div>

      <div className="w-full flex justify-center mt-10 mb-16">
        <InputBox
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
      </div>
    </div>
  );
};

export default TypingGame;
