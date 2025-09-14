"use client";

import Footer from "@/components/ui/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";

export default function Conversation() {
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

  const handlePlayPerDialog = () => {
    // Logic untuk memutar per dialog
    console.log("Playing per dialog");
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
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-[#1E90FF] py-4 text-center shadow-lg flex items-center px-4">
        <Link
          href="/"
          className="text-white text-2xl font-bold hover:text-[#9ecfff]"
        >
          ←
        </Link>
        <h1 className="flex-1 text-center text-lg md:text-xl font-bold text-white">
          Percakapan
        </h1>
        <div className="w-8" />
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Kolom Gambar */}
          <div className="order-1 lg:order-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src="/images/percakapan 1 crop.png"
                alt="Conversation Scene"
                className="w-full h-64 lg:h-99 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Di Kelas
                </h2>
                <p className="text-gray-600 text-sm">
                  Percakapan antara guru dan murid di dalam kelas
                </p>
              </div>
            </div>
          </div>

          {/* Kolom Konten */}
          <div className="order-2 lg:order-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* Audio Player */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Audio Player
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <button
                      onClick={handleTogglePlay}
                      className="flex-shrink-0 w-12 h-12 bg-[#1E90FF] text-white rounded-full hover:bg-[#1a7fdf] transition-colors flex items-center justify-center"
                    >
                      {isPlaying ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
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
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>
                  </div>
                </div>
              </div>



              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleTogglePlay}
                  className="w-full py-3 bg-[#1E90FF] text-white rounded-lg hover:bg-[#1a7fdf] transition-colors font-medium"
                >
                  {isPlaying ? "⏸ Pause Audio" : "▶ Play Audio"}
                </button>
                <button
                  onClick={handlePlayPerDialog}
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  🎵 Play Per Dialog
                </button>
                <button
                  onClick={handleSubmit}
                  className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  ➡ Lanjutkan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          {/* Overlay transparan + blur */}
          <div
            className="absolute inset-0 bg-white/20 backdrop-blur-sm transition-opacity"
            onClick={handleConfirmNo}
          ></div>

          {/* Box Modal */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 flex flex-col items-center animate-fadeIn scale-100">
            {/* Icon */}
            <div className="bg-gradient-to-tr from-blue-400 to-blue-600 rounded-full p-5 mb-6 drop-shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Judul */}
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center leading-snug">
              Apakah Anda sudah paham?
            </h3>

            {/* Buttons */}
            <div className="flex gap-5 w-full">
              <button
                onClick={handleConfirmYes}
                className="flex-1 py-3 bg-[#1E90FF] text-white rounded-xl shadow-lg hover:bg-[#1a7fdf] transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#9ecfff]"
              >
                Ya
              </button>
              <button
                onClick={handleConfirmNo}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl shadow-lg hover:bg-gray-200 transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                Belum
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Audio hidden */}
      <audio ref={audioRef} src="/audio/001_V2_01.mp3" preload="metadata" />
      
      <Footer />
    </div>
  );
}
