"use client";

import Footer from "@/components/ui/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";

export default function Memorize() {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleTogglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      try {
        await audioRef.current.play();
      } catch (err) {
        console.error("Error playing audio:", err);
      }
    }
  };

  const handleSubmit = () => {
    setShowConfirm(true);
  };

  const handleConfirmYes = () => {
    setShowConfirm(false);
    router.push("/vocabulary");
  };

  const handleConfirmNo = () => {
    setShowConfirm(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    // load metadata manual kalau event gagal
    if (audio.readyState >= 1) {
      setDuration(audio.duration);
    }

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen font-sans">
      {/* Kolom Gambar */}
      <div className="relative">
        <img
          src="/images/percakapan 1 crop.png"
          alt="Background"
          className="w-full h-full object-none"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Kolom Konten */}
      <div className="flex flex-col bg-white/90 backdrop-blur-sm">
        {/* Header */}
        <header className="bg-[#1E90FF]/90 py-4 shadow-md flex items-center justify-between px-4">
          <Link
            href="/"
            className="text-lg text-white hover:text-gray-200 transition"
          >
            ←
          </Link>
          <h1 className="text-lg md:text-xl font-semibold text-white text-center flex-1">
            Belajar Percakapan
          </h1>
          <div className="w-12"></div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Di Kelas
          </h2>

          {/* Audio player */}
          <div className="flex items-center space-x-3 mb-6">
            <button
              onClick={handleTogglePlay}
              className="p-2 bg-[#1E90FF] text-white rounded-full hover:bg-blue-600 transition"
            >
              {isPlaying ? "⏸" : "▶"}
            </button>

            <div className="flex-1">
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={(e) => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = Number(e.target.value);
                  }
                }}
                className="w-full accent-[#1E90FF]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleTogglePlay}
              className="w-full py-3 bg-[#1E90FF] text-white rounded-lg shadow hover:bg-blue-600 transition"
            >
              {isPlaying ? "Pause All" : "Play All"}
            </button>
            <button className="w-full py-3 bg-gray-300 text-black rounded-lg shadow hover:bg-gray-400 transition">
              Play Per Dialog
            </button>
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-gray-300 text-black rounded-lg shadow hover:bg-gray-400 transition"
            >
              Lanjutkan
            </button>
          </div>

          {/* Audio hidden */}
          <audio ref={audioRef} src="/audio/001_V2_01.mp3" preload="metadata" />
        </main>

        <Footer />
      </div>
    </div>
  );
}
