"use client";

import Footer from "@/components/ui/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Vocabulary() {
  const router = useRouter();

  const handleSubmit = () => {
    // logika lain bisa ditaruh di sini (misalnya simpan progress)
    router.push("/practice");
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
      <main className="flex-1 flex flex-col items-center justify-center p-6">
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
    </div>
  );
}
