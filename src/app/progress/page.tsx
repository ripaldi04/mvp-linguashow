"use client";

import Footer from "@/components/ui/Footer";
import Link from "next/link";

interface Module {
  id: number;
  title: string;
  progress: number; // 0-100
}

export default function ProgressPage() {
  const modules: Module[] = Array.from({ length: 16 }, (_, i) => {
    if (i < 5) return { id: i + 1, title: `Module ${i + 1}`, progress: 100 };
    if (i === 5) return { id: i + 1, title: `Module ${i + 1}`, progress: 50 };
    return { id: i + 1, title: `Module ${i + 1}`, progress: 0 };
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-[#1E90FF] py-5 shadow-md flex items-center px-6">
        <Link
          href="/"
          className="text-white text-3xl font-bold hover:text-blue-300 transition"
          aria-label="Back to home"
        >
          ←
        </Link>
        <h1 className="flex-1 text-center text-2xl md:text-3xl font-extrabold text-white tracking-wide">
          Progress Latihan
        </h1>
        <div className="w-10" />
      </header>

      {/* Content */}
      <main className="flex-1 p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modules.map((module) => {
            let status = "";
            let statusColor = "";
            let progressColor = "";
            let statusIcon = null;

            if (module.progress === 0) {
              status = "Belum Mulai";
              statusColor = "bg-gray-100 text-gray-700";
              progressColor = "bg-gray-400";
              statusIcon = (
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12" y2="16" />
                </svg>
              );
            } else if (module.progress < 100) {
              status = "Sedang Berjalan";
              statusColor = "bg-yellow-100 text-yellow-800";
              progressColor = "bg-yellow-500";
              statusIcon = (
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 20l9-12H3l9 12z" />
                </svg>
              );
            } else {
              status = "Selesai";
              statusColor = "bg-green-100 text-green-700";
              progressColor = "bg-green-500";
              statusIcon = (
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              );
            }

            return (
              <article
                key={module.id}
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex flex-col"
                title={`${module.progress}% progress`}
                tabIndex={0}
                aria-label={`${module.title}, status: ${status}, progress ${module.progress} percent`}
              >
                <header className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 truncate">
                    {module.title}
                  </h2>
                  <span
                    className={`inline-flex items-center space-x-2 text-sm font-semibold px-3 py-1 rounded-full ${statusColor}`}
                  >
                    {statusIcon}
                    <span>{status}</span>
                  </span>
                </header>
                <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-5 rounded-full transition-all duration-700 ease-in-out ${progressColor}`}
                    style={{ width: `${module.progress}%` }}
                  />
                </div>
                <p className="mt-3 text-right text-sm font-medium text-gray-700">
                  {module.progress}%
                </p>
              </article>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
