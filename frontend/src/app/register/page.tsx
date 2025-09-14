"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/ui/Footer";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validasi dasar
    if (formData.password !== formData.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password harus minimal 8 karakter");
      setIsLoading(false);
      return;
    }

    if (!formData.agreeTerms) {
      setError("Anda harus menyetujui syarat dan ketentuan");
      setIsLoading(false);
      return;
    }

    // Simulasi pendaftaran
    setTimeout(() => {
      setIsLoading(false);
      // Redirect ke halaman login setelah berhasil mendaftar
      router.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-[#1E90FF] py-4 text-center shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            <h1 className="text-xl font-bold text-white ml-2">LinguaShow</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Register Header */}
            <div className="bg-[#1E90FF] px-6 py-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-2">Daftar Akun Baru</h2>
              <p className="text-blue-100">
                Bergabunglah dengan LinguaShow untuk belajar bahasa Indonesia
              </p>
            </div>

            {/* Register Form */}
            <div className="p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="fullName"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent placeholder-gray-400"
                    placeholder="Masukkan nama lengkap Anda"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent placeholder-gray-400"
                    placeholder="Masukkan email Anda"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent placeholder-gray-400"
                    placeholder="Minimal 8 karakter"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Konfirmasi Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent placeholder-gray-400"
                    placeholder="Masukkan password yang sama"
                    required
                  />
                </div>

                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#1E90FF] focus:ring-[#1E90FF] border-gray-300 rounded"
                    required
                  />
                  <label
                    htmlFor="agreeTerms"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Saya menyetujui{" "}
                    <a href="#" className="text-[#1E90FF] hover:underline">
                      Syarat dan Ketentuan
                    </a>{" "}
                    serta{" "}
                    <a href="#" className="text-[#1E90FF] hover:underline">
                      Kebijakan Privasi
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 rounded-lg text-white font-medium transition ${
                    isLoading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-[#1E90FF] hover:bg-[#1a7fdf] transform hover:scale-105"
                  }`}
                >
                  {isLoading ? "Memproses..." : "Daftar Sekarang"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Sudah punya akun?{" "}
                  <Link href="/" className="text-[#1E90FF] font-medium">
                    Masuk di sini
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}