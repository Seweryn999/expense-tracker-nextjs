"use client"; 

import "./globals.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "./lib/firebase";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    return () => unsubscribe();
  }, []);

  return (
    <html lang="pl">
      <body className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4 flex justify-between">
          <Link href="/" className="text-lg font-bold">
            💰 Expense Tracker
          </Link>
          <div>
            {user ? (
              <>
                <Link href="/dashboard" className="mr-4">
                  Dashboard
                </Link>
                <button
                  onClick={async () => {
                    await auth.signOut();
                    router.push("/login");
                  }}
                  className="bg-red-500 px-3 py-1 rounded"
                >
                  Wyloguj
                </button>
              </>
            ) : (
              <Link href="/login" className="bg-blue-500 px-3 py-1 rounded">
                Zaloguj się
              </Link>
            )}
          </div>
        </nav>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
