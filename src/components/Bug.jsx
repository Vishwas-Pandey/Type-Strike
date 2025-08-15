import React, { useEffect, useRef } from "react";

const Bug = ({ word, left, fallSpeed, onFallComplete, isPaused }) => {
  const bugRef = useRef(null);

  useEffect(() => {
    const bug = bugRef.current;
    if (!bug || isPaused) return;

    const handleAnimationEnd = () => {
      onFallComplete?.();
    };

    bug.addEventListener("animationend", handleAnimationEnd);
    return () => {
      bug.removeEventListener("animationend", handleAnimationEnd);
    };
  }, [onFallComplete, isPaused]);

  return (
    <div
      ref={bugRef}
      className="absolute font-bold flex items-center justify-center text-white"
      style={{
        left: `${left}%`,
        backgroundColor: "#f87171",
        filter: "drop-shadow(0 0 10px red)",
        width: "6rem",
        height: "6rem",
        borderRadius: "50%",
        animation: `fall ${fallSpeed}s linear forwards`,
        animationPlayState: isPaused ? "paused" : "running",
      }}
    >
      {word}
    </div>
  );
};

export default Bug;
