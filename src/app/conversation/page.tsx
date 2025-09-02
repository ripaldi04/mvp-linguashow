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

  const handleTogglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
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

  // Update waktu audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
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
    <div className="w-full min-h-screen flex flex-col bg-[#F5F5F5] font-sans">
      {/* Header */}
      <header className="bg-[#1E90FF] py-4 shadow-md flex items-center justify-between px-4">
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

      {/* Content */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Di Kelas
        </h2>

        {/* Audio player */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleTogglePlay}
            className="p-2 bg-[#1E90FF] text-white rounded-full hover:bg-blue-600 transition"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <div className="flex-1">
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-[#1E90FF] rounded-full"
                style={{
                  width: duration ? `${(currentTime / duration) * 100}%` : "0%",
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Conversation dengan background image */}
        <div className="relative bg-white rounded-xl shadow overflow-hidden">
          <img
            src="/images/percakapan 1.png"
            alt="Di Kelas"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="relative p-4">
            <p>
              <strong>A:</strong> Assalamu’alaikum
            </p>
            <p>
              <strong>B:</strong> Wa’alaikumussalam
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleTogglePlay}
            className="w-full py-3 bg-[#1E90FF] text-white rounded-lg shadow hover:bg-blue-600 transition transform hover:scale-102"
          >
            {isPlaying ? "Pause All" : "Play All"}
          </button>
          <button className="w-full py-3 bg-gray-300 text-black rounded-lg shadow hover:bg-gray-400 transition transform hover:scale-102">
            Play Per Dialog
          </button>
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-gray-300 text-black rounded-lg shadow hover:bg-gray-400 transition transform hover:scale-102"
          >
            Lanjutkan
          </button>
        </div>

        {/* Audio Element (hidden) */}
        <audio ref={audioRef} src="/audio/001_V2_01.mp3" preload="auto" />
      </main>
      <Footer />

      {/* Modal Konfirmasi */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div
            className="absolute inset-0 bg-white/20 backdrop-blur-sm transition-opacity"
            onClick={handleConfirmNo}
          ></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Apakah Anda yakin sudah paham?
            </h3>
            <div className="flex gap-5 w-full">
              <button
                onClick={handleConfirmYes}
                className="flex-1 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition"
              >
                Ya
              </button>
              <button
                onClick={handleConfirmNo}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl shadow-lg hover:bg-gray-200 transition"
              >
                Belum
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
