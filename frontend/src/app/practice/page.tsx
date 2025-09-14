"use client";

import Footer from "@/components/ui/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Practice() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState<any>(null);
  const [showConfirm, setShowConfirm] = useState(false); // state modal

  // Speech Recognition
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognitionClass =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      alert("Browser Anda tidak mendukung Speech Recognition");
      return;
    }

    const rec = new SpeechRecognitionClass();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "ar-SA"; // bahasa Arab
    // rec.lang = "en-US"; // bahasa inggris

    rec.onresult = (event: any) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) setTranscript(finalTranscript);
    };

    rec.onend = () => {
      setIsRecording(false);
    };

    setRecognition(rec);
  }, []);

  const handleMicClick = () => {
    if (!recognition) return;

    if (!isRecording) {
      recognition.start();
      setIsRecording(true);
    } else {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = () => {
    setShowConfirm(true); // tampilkan modal konfirmasi
  };

  const handleConfirmYes = () => {
    setShowConfirm(false);
    router.push("/result"); // lanjut ke halaman result
  };

  const handleConfirmNo = () => {
    setShowConfirm(false); // tetap di halaman practice
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-[#1E90FF] py-4 text-center shadow-lg flex items-center px-4">
        <Link
          href="/vocabulary"
          className="text-lg text-white hover:text-gray-200 transition"
        >
          ←
        </Link>
        <h1 className="flex-1 text-center text-lg md:text-xl font-bold text-white">
          Latihan
        </h1>
        <div className="w-8" />
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-start p-6 space-y-6">
        {/* Audio Player */}
        <section className="w-full max-w-md bg-white rounded-xl p-6 shadow-lg space-y-5">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Audio Progress
          </h2>

          {/* Progress bar A */}
          <div className="flex items-center space-x-3">
            <span className="w-6 text-gray-600 font-medium">A</span>
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-3 bg-[#1E90FF] rounded-full w-1/3 transition-all duration-300"></div>
            </div>
          </div>

          {/* Progress bar B */}
          <div className="flex items-center space-x-3">
            <span className="w-6 text-gray-600 font-medium">B</span>
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-3 bg-green-500 rounded-full w-2/3 transition-all duration-300"></div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-6 mt-4">
            <button
              aria-label="Pause"
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full p-3 shadow-md transition"
            >
              ⏸
            </button>
          </div>
        </section>

        {/* Mic Recorder */}
        <section className="w-full max-w-md bg-white rounded-xl p-6 flex flex-col items-center shadow-lg">
          <button
            onClick={handleMicClick}
            aria-label={isRecording ? "Stop recording" : "Start recording"}
            className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl transition-shadow duration-300 focus:outline-none focus:ring-4 ${
              isRecording
                ? "bg-red-600 text-white shadow-lg shadow-red-400 animate-pulse"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            🎤
          </button>

          <p className="mt-4 text-gray-600 text-center text-sm italic min-h-[2rem]">
            {transcript || "Tekan tombol mikrofon dan mulai latihan..."}
          </p>
        </section>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full max-w-md py-3 bg-[#1E90FF] text-white rounded-xl shadow-lg hover:bg-[#1a7fdf] transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#9ecfff]"
        >
          Submit Hafalan
        </button>
      </main>

      <Footer />

      {/* Modal Konfirmasi */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-white/30 backdrop-blur-sm"
            onClick={handleConfirmNo}
          ></div>

          {/* Modal Box */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 flex flex-col items-center animate-fadeIn scale-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center leading-snug">
              Apakah Anda yakin dan mengumpulkan hafalan?
            </h3>
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
    </div>
  );
}
