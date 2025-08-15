import { useEffect, useRef } from 'react';

export const useSound = (src, { loop = false, volume = 1, enabled = true } = {}) => {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.loop = loop;
    audioRef.current.volume = volume;
    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, [src]);

  const play = () => {
    if (audioRef.current && enabled) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return { play, stop, audioRef };
};
