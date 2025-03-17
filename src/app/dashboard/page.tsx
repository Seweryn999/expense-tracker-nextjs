"use client";

import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="container mx-auto text-center p-10">
      <h1 className="text-3xl font-bold mb-4">📊 Dashboard</h1>
      {user ? (
        <p className="text-lg">Witaj, {user.email}!</p>
      ) : (
        <p className="text-red-500 text-lg">⏳ Przekierowywanie...</p>
      )}
    </div>
  );
}
