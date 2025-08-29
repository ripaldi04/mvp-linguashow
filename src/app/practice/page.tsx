"use client";

import Footer from "@/components/ui/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Practice() {
  const router = useRouter();

  const handleSubmit = () => {
    // logika lain bisa ditaruh di sini (misalnya simpan progress)
    router.push("/result");
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F5F5F5] font-sans">
      {/* Header */}
      <header className="bg-[#1E90FF] py-4 shadow-md flex items-center px-4">
        <Link href="/conversation" className="text-lg text-white hover:text-gray-200">
          ←
        </Link>
        <h1 className="flex-1 text-center text-lg md:text-xl font-semibold text-white">
          Latihan
        </h1>
        <div className="w-6"></div>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-start p-6 space-y-4">
        {/* Audio Player */}
        <div className="w-full max-w-sm bg-white rounded-lg p-4 shadow-md space-y-3">
          <div className="flex items-center space-x-2">
            <button className="bg-gray-300 rounded-full px-2 py-1 text-sm">⏸</button>
            <div className="flex-1 h-1 bg-gray-300 rounded">
              <div className="h-1 bg-[#1E90FF] w-1/2 rounded"></div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="w-4">A</span>
            <div className="flex-1 h-1 bg-gray-300 rounded">
              <div className="h-1 bg-[#1E90FF] w-1/3 rounded"></div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="w-4">B</span>
            <div className="flex-1 h-1 bg-gray-300 rounded">
              <div className="h-1 bg-green-400 w-2/3 rounded"></div>
            </div>
          </div>
        </div>

        {/* Recorder */}
        <div className="w-full max-w-sm bg-white rounded-lg p-4 flex items-center space-x-3 shadow-md">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            🎙
          </div>
          <div className="flex-1 h-1 bg-gray-300 rounded">
            <div className="h-1 bg-red-400 w-1/4 rounded"></div>
          </div>
        </div>

        {/* Progress */}
        <div className="w-full max-w-sm bg-white rounded-lg p-4 shadow-md">
          <p className="text-sm text-gray-700 mb-2">Progress:</p>
          <div className="h-3 bg-gray-300 rounded">
            <div className="h-3 bg-[#1E90FF] w-1/2 rounded"></div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full max-w-sm py-3 bg-[#1E90FF] text-white rounded-lg shadow hover:bg-blue-600 transition transform hover:scale-105"
        >
          Submit Hafalan
        </button>
      </main>
      <Footer />
    </div>
  );
}
