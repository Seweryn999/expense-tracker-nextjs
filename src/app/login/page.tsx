"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error) {
      console.error("❌ Błąd logowania:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) router.push("/dashboard");
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="bg-white shadow-xl rounded-lg p-10 max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Witaj w <span className="text-indigo-600">Expense Tracker</span>!
        </h1>
        <p className="text-gray-600 mb-6">
          Zaloguj się wygodnie za pomocą konta Google i zacznij efektywnie
          zarządzać swoimi wydatkami.
        </p>
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-4 rounded-md shadow-md transition duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "🔄 Logowanie..." : "Zaloguj się przez Google 🚀"}
        </button>
        <p className="text-xs text-gray-400 mt-6">
          Twoje dane są bezpieczne, logowanie jest realizowane przez usługę
          Google OAuth.
        </p>
      </div>
    </div>
  );
}
