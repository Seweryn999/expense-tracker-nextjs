"use client";

import "./globals.css";
import Link from "next/link";
import { auth, signInWithGoogle, logOut } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(auth.currentUser || null);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const isLoginPage = pathname === "/login";

  return (
    <html lang="pl">
      <head>
        <title>Expense Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`min-h-screen font-inter flex flex-col ${
          isLoginPage
            ? "bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 p-0"
            : "bg-gray-50"
        }`}
      >
        {!isLoginPage && (
          <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg text-white p-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold tracking-wide">
              💸 Expense Tracker
            </Link>
            <div>
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="mr-4 hover:text-gray-200 transition"
                  >
                    📈 Dashboard
                  </Link>
                  <button
                    onClick={logOut}
                    className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded shadow"
                  >
                    Wyloguj
                  </button>
                </>
              ) : (
                <button
                  onClick={signInWithGoogle}
                  className="bg-blue-500 hover:bg-blue-700 transition px-4 py-2 rounded shadow"
                >
                  Zaloguj się
                </button>
              )}
            </div>
          </nav>
        )}

        <main
          className={`flex-1 ${
            isLoginPage
              ? "flex items-center justify-center p-0"
              : "container mx-auto py-6 px-4"
          }`}
        >
          {children}
        </main>

        <footer
          className={`text-center text-gray-600 py-4 text-sm border-t ${
            isLoginPage
              ? "bg-transparent text-white bg-opacity-10"
              : "bg-gray-100"
          }`}
        >
          <div className="container mx-auto px-4">
            © {new Date().getFullYear()} Expense Tracker. Wszystkie prawa
            zastrzeżone.
            <br />
            <span
              className={`text-xs ${
                isLoginPage ? "text-gray-200" : "text-gray-400"
              }`}
            >
              Stworzono przez Seweryn Stalinger.
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
