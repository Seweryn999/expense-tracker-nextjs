import Link from "next/link";
import { CurrencyDollarIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { logOut, signInWithGoogle } from "@/lib/firebase";

interface User {
  uid: string;
  email: string;
}

export default function Navbar({ user }: { user: User | null }) {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg text-white p-4 flex justify-between items-center">
      <Link
        href="/"
        className="text-2xl font-bold flex gap-2 items-center tracking-wide"
      >
        <CurrencyDollarIcon className="w-8 h-8" />
        Expense Tracker
      </Link>
      <div>
        {user ? (
          <>
            <Link
              href="/dashboard"
              className="text-2xl font-bold flex gap-2 items-center tracking-wide"
            >
              <ChartBarIcon className="w-5 h-5" /> Dashboard
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
  );
}
