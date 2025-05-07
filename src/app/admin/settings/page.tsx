"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear any authentication tokens or session data here
    // For example, localStorage.clear();
    // Then redirect to login or home page
    router.push('/login'); // Assuming /login is the login page
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">About SafeMove</h2>
        <p>
          SafeMove is a platform designed to manage student trips, emergencies, and settings efficiently.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Account</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </section>

      {/* Additional settings options can be added here */}
    </main>
  );
}
