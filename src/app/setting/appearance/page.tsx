"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/ui/Footer";

const themes = [
  {
    id: "light",
    title: "Mode Terang",
    description: "Tema dengan latar belakang terang dan teks gelap.",
    icon: (
      <svg
        className="w-10 h-10 text-yellow-400"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
  {
    id: "dark",
    title: "Mode Gelap",
    description: "Tema dengan latar belakang gelap dan teks terang.",
    icon: (
      <svg
        className="w-10 h-10 text-gray-700"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    ),
  },
];

const languages = [
  { id: "id", title: "Bahasa Indonesia" },
  { id: "en", title: "English" },
];

export default function AppearancePage() {
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedLanguage, setSelectedLanguage] = useState("id");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-blue-600 py-4 shadow-md flex items-center px-6">
        <Link
          href="/setting"
          className="text-white text-3xl font-bold hover:text-blue-300 transition"
          aria-label="Back to settings"
        >
          ←
        </Link>
        <h1 className="flex-1 text-center text-2xl md:text-3xl font-extrabold text-white tracking-wide">
          Tampilan / Tema
        </h1>
        <div className="w-10" />
      </header>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto p-6 space-y-12">
        {/* Pilih Tema */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
            Pilih Tema
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {themes.map((theme) => {
              const isSelected = selectedTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-shadow focus:outline-none focus:ring-4 ${
                    isSelected
                      ? "border-blue-600 shadow-lg bg-blue-50"
                      : "border-gray-300 hover:shadow-md bg-white"
                  }`}
                  aria-pressed={isSelected}
                >
                  {theme.icon}
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{theme.title}</h3>
                  <p className="mt-2 text-center text-gray-600">{theme.description}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Pilih Bahasa */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
            Pilih Bahasa
          </h2>
          <div className="flex flex-wrap gap-4">
            {languages.map((lang) => {
              const isSelected = selectedLanguage === lang.id;
              return (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`px-6 py-3 rounded-full border-2 font-semibold transition focus:outline-none focus:ring-4 ${
                    isSelected
                      ? "border-blue-600 bg-blue-50 text-blue-700 shadow"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                  aria-pressed={isSelected}
                >
                  {lang.title}
                </button>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
