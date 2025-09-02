"use client";

import Footer from "@/components/ui/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Vocabulary() {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = () => {
    setShowConfirm(true); // tampilkan modal konfirmasi
  };

  const handleConfirmYes = () => {
    setShowConfirm(false);
    router.push("/practice"); // lanjut ke halaman practice
  };

  const handleConfirmNo = () => {
    setShowConfirm(false); // tutup modal, tetap di halaman
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F5F5F5] font-sans">
      {/* Header */}
      <header className="bg-[#1E90FF] py-4 shadow-md flex items-center px-4">
        <Link
          href="/conversation"
          className="text-lg text-white hover:text-gray-200 transition"
        >
          ←
        </Link>
        <h1 className="flex-1 text-center text-lg md:text-xl font-semibold text-white">
          Kosakata Baru
        </h1>
        <div className="w-6"></div>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-4 text-gray-800 space-y-2">
          <p>
            <span className="font-bold">Kata:</span> “Assalamu’alaikum”
          </p>
          <p>
            <span className="font-bold">Arti:</span> “Semoga keselamatan”
          </p>
          <p>
            <span className="font-bold">Sinonim:</span> -
          </p>
          <p>
            <span className="font-bold">Antonim:</span> -
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full max-w-sm py-3 bg-[#1E90FF] text-white rounded-lg shadow hover:bg-blue-600 transition transform hover:scale-105"
        >
          Lanjutkan
        </button>
      </main>
      <Footer />

      {/* Modal Konfirmasi */}
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
                className="flex-1 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
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
