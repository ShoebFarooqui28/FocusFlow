"use client";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const presets = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 10 * 60,
};

type Mode = "pomodoro" | "shortBreak" | "longBreak";

const Page = () => {
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [timeLeft, setTimeLeft] = useState<number>(presets[mode]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Update timer value when mode changes
    setTimeLeft(presets[mode]);
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [mode]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      const playAudio = async () => {
        try {
          await audioRef.current?.play();
        } catch (error) {
          console.error("Failed to play audio:", error);
        }
      };
      playAudio();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // adjust as needed
    }
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleStart = () => setIsRunning(true);

  const handlePause = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(presets[mode]);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center">
      {/* Timer */}
      <h1 className="text-8xl md:text-9xl lg:text-9xl font-bold text-center text-[#FAF9F6] drop-shadow">
        {formatTime(timeLeft)}
      </h1>

      {/* Controls */}
      <div className="bg-[#FAF9F6] p-4 flex flex-row gap-3 rounded-md mt-8 shadow-md z-1">
        <button
          onClick={handleStart}
          className={`${
            isRunning ? "text-[#770737]" : "text-black"
          } cursor-pointer`}
        >
          <Play />
        </button>
        <button
          onClick={handlePause}
          className={`${
            !isRunning ? "text-[#770737]" : "text-black"
          } cursor-pointer`}
        >
          <Pause />
        </button>
        <button onClick={handleReset} className="cursor-pointer">
          <RotateCcw />
        </button>
      </div>

      {/* Mode Buttons */}
      <div className="flex flex-col md:flex-row gap-4 mt-8 z-1">
        <button
          onClick={() => setMode("pomodoro")}
          className={`px-4 py-2 rounded-4xl shadow-md transition-all duration-200 ${
            mode === "pomodoro"
              ? "bg-[#770737] text-[#FAF9F6]"
              : "bg-white text-black"
          }`}
        >
          Pomodoro
        </button>
        <button
          onClick={() => setMode("shortBreak")}
          className={`px-4 py-2 rounded-4xl shadow-md transition-all duration-200 ${
            mode === "shortBreak"
              ? "bg-[#770737] text-[#FAF9F6]"
              : "bg-[#FAF9F6] text-black"
          }`}
        >
          Short Break
        </button>
        <button
          onClick={() => setMode("longBreak")}
          className={`px-4 py-2 rounded-4xl shadow-md transition-all duration-200 ${
            mode === "longBreak"
              ? "bg-[#770737] text-[#FAF9F6]"
              : "bg-[#FAF9F6] text-black"
          }`}
        >
          Long Break
        </button>
      </div>

      <audio ref={audioRef} src="/alert.wav" preload="auto" />
    </div>
  );
};

export default Page;
