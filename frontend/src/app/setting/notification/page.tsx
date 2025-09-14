"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/ui/Footer";

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string; // bisa string tanggal format ISO
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Pengingat Latihan",
    message: "Jangan lupa latihan hari ini!",
    date: "2024-06-10T09:00:00Z",
    read: false,
  },
  {
    id: 2,
    title: "Update Materi",
    message: "Materi baru sudah tersedia di modul 5.",
    date: "2024-06-09T15:30:00Z",
    read: true,
  },
  {
    id: 3,
    title: "Selamat!",
    message: "Anda telah menyelesaikan modul 3 dengan baik.",
    date: "2024-06-08T12:00:00Z",
    read: false,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
          Notifikasi
        </h1>
        <div className="w-10" />
      </header>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Daftar Notifikasi</h2>
          <button
            onClick={markAllAsRead}
            disabled={notifications.every((n) => n.read)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              notifications.every((n) => n.read)
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            aria-disabled={notifications.every((n) => n.read)}
          >
            Tandai Semua Terbaca
          </button>
        </div>

        {notifications.length === 0 && (
          <p className="text-center text-gray-500">Belum ada notifikasi.</p>
        )}

        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className={`p-4 rounded-xl shadow-md cursor-pointer transition-colors ${
                notif.read ? "bg-white" : "bg-blue-50 border border-blue-300"
              } hover:bg-blue-100`}
              onClick={() => toggleRead(notif.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleRead(notif.id);
                }
              }}
              aria-pressed={notif.read}
              aria-label={`${notif.title}, ${notif.read ? "terbaca" : "belum terbaca"}`}
            >
              <div className="flex justify-between items-center">
                <h3
                  className={`text-lg font-semibold ${
                    notif.read ? "text-gray-800" : "text-blue-700"
                  }`}
                >
                  {notif.title}
                </h3>
                {!notif.read && (
                  <span className="inline-block w-3 h-3 bg-blue-600 rounded-full" aria-hidden="true" />
                )}
              </div>
              <p className="mt-1 text-gray-700">{notif.message}</p>
              <time className="mt-2 block text-xs text-gray-500">{formatDate(notif.date)}</time>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
}
