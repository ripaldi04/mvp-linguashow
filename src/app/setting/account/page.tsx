"use client";

import Link from "next/link";
import Footer from "@/components/ui/Footer";

export default function AccountPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-[#1E90FF] py-4 text-center shadow-lg flex items-center px-6">
        <Link
          href="/setting"
          className="text-lg text-white hover:text-gray-200 transition"
          aria-label="Back to settings"
        >
          ←
        </Link>
        <h1 className="flex-1 text-center text-lg md:text-xl font-bold text-white">
          Akun
        </h1>
        <div className="w-10" />
      </header>

      {/* Content */}
      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto space-y-10 sm:px-12 lg:px-16">
        {/* Grid 2 kolom untuk Profil dan Email di desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profil */}
          <section className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
              Profil
            </h2>
            <form className="flex flex-col space-y-6 flex-grow">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nama Lengkap
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Nama Anda"
                  className="mt-1 w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition"
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  className="mt-1 w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition"
                />
              </div>
              <button
                type="submit"
                className="mt-auto w-full py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Simpan Profil
              </button>
            </form>
          </section>

          {/* Email */}
          <section className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
              Email
            </h2>
            <form className="flex flex-col space-y-6 flex-grow">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="email@domain.com"
                  className="mt-1 w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition"
                />
              </div>
              <button
                type="submit"
                className="mt-auto w-full py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Simpan Email
              </button>
            </form>
          </section>
        </div>

        {/* Ganti Password full width */}
        <section className="bg-white rounded-2xl shadow-md p-6 max-w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
            Ganti Password
          </h2>
          <form className="flex flex-col space-y-6 max-w-lg mx-auto">
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password Lama
              </label>
              <input
                id="oldPassword"
                type="password"
                placeholder="********"
                className="mt-1 w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password Baru
              </label>
              <input
                id="newPassword"
                type="password"
                placeholder="********"
                className="mt-1 w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Konfirmasi Password Baru
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="********"
                className="mt-1 w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition"
              />
            </div>
            <button
              type="submit"
              className="w-full max-w-md py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 mx-auto"
            >
              Ganti Password
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
