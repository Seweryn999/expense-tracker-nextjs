export default function Footer({ isLoginPage }: { isLoginPage: boolean }) {
  return (
    <footer
      className={`text-center text-gray-600 py-4 text-sm border-t ${
        isLoginPage ? "bg-transparent text-white" : "bg-gray-100"
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
          Stworzono przez Twoje imię i nazwisko.
        </span>
      </div>
    </footer>
  );
}
