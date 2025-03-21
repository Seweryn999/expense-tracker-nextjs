"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        router.push("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="container mx-auto text-center p-10">
      <h1 className="text-3xl font-bold mb-4">💰 Expense Tracker</h1>
      <p className="text-lg mb-6">
        Zarządzaj swoimi finansami łatwo i skutecznie.
      </p>

      {user ? (
        <p className="text-green-600 text-lg font-bold">
          ✅ Jesteś zalogowany jako {user.email}!
        </p>
      ) : (
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-500 text-white p-3 rounded-lg text-lg"
        >
          Zaloguj się
        </button>
      )}
    </div>
  );
}
