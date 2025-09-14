import Footer from "@/components/ui/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans w-full min-h-screen flex flex-col bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-[#1E90FF] py-4 text-center shadow-lg">
        <h1 className="text-lg md:text-xl font-bold text-white">Beranda</h1>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
        <a
          href="/conversation"
          className="w-full sm:w-80 px-6 py-4 text-center bg-[#1E90FF] rounded-lg text-white font-medium shadow-md hover:shadow-lg transition transform hover:scale-105"
        >
          Mulai Belajar
        </a>
        <a
          href="/progress"
          className="w-full sm:w-80 px-6 py-4 text-center bg-[#1E90FF] rounded-lg text-white font-medium shadow-md hover:shadow-lg transition transform hover:scale-105"
        >
          Progress Saya
        </a>
        <a
          href="/setting"
          className="w-full sm:w-80 px-6 py-4 text-center bg-[#1E90FF] rounded-lg text-white font-medium shadow-md hover:shadow-lg transition transform hover:scale-105"
        >
          Pengaturan
        </a>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
