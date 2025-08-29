"use client";

import Link from "next/link";
import { PartyPopper, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import Footer from "@/components/ui/Footer";

export default function Result() {
  const router = useRouter();

  const navVocabulary = () => {
    // logika lain bisa ditaruh di sini (misalnya simpan progress)
    router.push("/vocabulary");
  };
  
  const navPractice = () => {
    // logika lain bisa ditaruh di sini (misalnya simpan progress)
    router.push("/practice");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Header */}
      <header className="bg-[#1E90FF] py-4 shadow-md flex items-center justify-between px-4">
        {/* Back button kiri */}
        <Link
          href="/"
          className="text-lg text-white hover:text-gray-200 transition"
        >
          ←
        </Link>

        {/* Title di tengah */}
        <h1 className="text-lg md:text-xl font-semibold text-white text-center flex-1">
          Hasil Evaluasi
        </h1>

        {/* Spacer biar title tetap center */}
        <div className="w-12"></div>
      </header>

      {/* Content */}
      <main className="flex-1 p-6 space-y-4">
        {/* Success Message */}
        <div className="p-4 bg-green-100 rounded-lg text-center text-gray-800 flex items-center justify-center space-x-2">
          <PartyPopper className="w-5 h-5 text-green-600" />
          <p>Selamat, hafalan Anda benar tanpa kesalahan!</p>
        </div>

        <button 
          onClick={navVocabulary} 
          className="w-full bg-[#1E90FF] rounded-lg py-3 font-medium text-white hover:bg-blue-600 transition transform hover:scale-102"
        >
          Lanjut ke Percakapan
        </button>

        {/* Error Message */}
        <div className="p-4 bg-red-100 rounded-lg text-center text-gray-800 flex items-center justify-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <p>Masih ada kesalahan, coba ulangi lagi.</p>
        </div>

        <button 
          onClick={navPractice} 
          className="w-full bg-gray-300 rounded-lg py-3 font-medium text-black hover:bg-gray-400 transition transform hover:scale-102"
        >
          Ulang Hafalan
        </button>
      </main>
      <Footer />
    </div>
  );
}
