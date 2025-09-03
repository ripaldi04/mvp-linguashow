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
      <header className="bg-[#1E90FF] py-4 text-center shadow-lg flex items-center px-4">
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
      <main className="flex-1 flex flex-col items-center p-6 space-y-8">
        <h2 className="text-xl font-bold text-gray-800">Kosakata dari Percakapan "Di Kelas"</h2>
        
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kartu Kosakata 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-gray-800 space-y-3 border-l-4 border-[#1E90FF] hover:transform hover:scale-105 transition duration-300">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#1E90FF]">Assalamu'alaikum</h3>
            </div>
            <p className="text-gray-700 font-medium">Semoga keselamatan dan rahmat Allah beserta Anda</p>
            <div className="pt-2 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Contoh:</span> Assalamu'alaikum, selamat pagi Bu Guru.
              </p>
            </div>
            <div className="flex justify-end">
              <button className="text-[#1E90FF] hover:text-[#1a7fdf] text-sm font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
                </svg>
                Dengarkan
              </button>
            </div>
          </div>

          {/* Kartu Kosakata 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-gray-800 space-y-3 border-l-4 border-[#1E90FF] hover:transform hover:scale-105 transition duration-300">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#1E90FF]">Wa'alaikumsalam</h3>
            </div>
            <p className="text-gray-700 font-medium">Dan semoga keselamatan dan rahmat Allah juga beserta Anda</p>
            <div className="pt-2 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Contoh:</span> Wa'alaikumsalam, selamat pagi juga Budi.
              </p>
            </div>
            <div className="flex justify-end">
              <button className="text-[#1E90FF] hover:text-[#1a7fdf] text-sm font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
                </svg>
                Dengarkan
              </button>
            </div>
          </div>

          {/* Kartu Kosakata 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-gray-800 space-y-3 border-l-4 border-[#1E90FF] hover:transform hover:scale-105 transition duration-300">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#1E90FF]">Guru</h3>
            </div>
            <p className="text-gray-700 font-medium">Orang yang pekerjaannya mengajar</p>
            <div className="pt-2 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Contoh:</span> Bu Siti adalah guru bahasa Indonesia.
              </p>
            </div>
            <div className="flex justify-end">
              <button className="text-[#1E90FF] hover:text-[#1a7fdf] text-sm font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
                </svg>
                Dengarkan
              </button>
            </div>
          </div>

          {/* Kartu Kosakata 4 */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-gray-800 space-y-3 border-l-4 border-[#1E90FF] hover:transform hover:scale-105 transition duration-300">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#1E90FF]">Murid</h3>
            </div>
            <p className="text-gray-700 font-medium">Orang yang sedang belajar atau bersekolah</p>
            <div className="pt-2 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Contoh:</span> Budi adalah murid kelas 5 SD.
              </p>
            </div>
            <div className="flex justify-end">
              <button className="text-[#1E90FF] hover:text-[#1a7fdf] text-sm font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
                </svg>
                Dengarkan
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-8 w-full max-w-md py-4 bg-[#1E90FF] text-white rounded-xl shadow-lg hover:bg-[#1a7fdf] transition transform hover:scale-105 text-lg font-medium"
        >
          Lanjutkan ke Latihan
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
