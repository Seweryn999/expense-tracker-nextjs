"use client";

import { auth } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("✅ Zalogowano jako:", result.user.email);
      router.push("/dashboard");
    } catch (error) {
      console.error("❌ Błąd logowania:", error);
      alert("Błąd logowania! Sprawdź konsolę.");
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="container mx-auto text-center p-10">
      <h1 className="text-3xl font-bold mb-4">🔑 Logowanie</h1>
      <button
        onClick={login}
        className="bg-blue-500 text-white p-3 rounded-lg text-lg"
      >
        Zaloguj się przez Google
      </button>
    </div>
  );
}
