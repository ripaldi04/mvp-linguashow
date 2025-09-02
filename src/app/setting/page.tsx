"use client";

import Footer from "@/components/ui/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

const menus = [
  {
    id: "account",
    title: "Akun",
    description: "Kelola profil, email, password, dan akun Anda",
    icon: (
      <svg
        className="w-6 h-6 text-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
        <path d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
      </svg>
    ),
    route: "/setting/account",
  },
  {
    id: "notifications",
    title: "Notifikasi",
    description: "Atur notifikasi push, email, dan reminder",
    icon: (
      <svg
        className="w-6 h-6 text-yellow-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M18 8a6 6 0 00-12 0v5H4l4 4h8l4-4h-2V8z" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
    route: "/setting/notification",
  },
  {
    id: "appearance",
    title: "Tampilan / Tema",
    description: "Ganti tema, mode gelap/terang, dan bahasa aplikasi",
    icon: (
      <svg
        className="w-6 h-6 text-purple-600"
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
    route: "/setting/appearance", 
  },
];

export default function SettingsPage() {
  const router = useRouter();

  const handleMenuClick = (route: string) => {
    router.push(route);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-blue-600 py-4 shadow-md flex items-center px-6">
        <Link
          href="/"
          className="text-white text-3xl font-bold hover:text-blue-300 transition"
          aria-label="Back to home"
        >
          ←
        </Link>
        <h1 className="flex-1 text-center text-2xl md:text-3xl font-extrabold text-white tracking-wide">
          Pengaturan
        </h1>
        <div className="w-10" />
      </header>

      {/* Content */}
      <main className="flex-1 p-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {menus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => handleMenuClick(menu.route)}
              className="flex items-start space-x-4 p-5 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <div className="flex-shrink-0">{menu.icon}</div>
              <div className="text-left">
                <h2 className="text-lg font-semibold text-gray-900">{menu.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{menu.description}</p>
              </div>
            </button>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
