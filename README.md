# 💸 Expense Tracker (Next.js + Firebase + TailwindCSS)

**Expense Tracker** to aplikacja webowa umożliwiająca zarządzanie codziennymi wydatkami w prosty, szybki i przyjemny sposób. Projekt został stworzony przy użyciu nowoczesnych technologii takich jak **Next.js 14**, **Firebase**, **TypeScript** oraz **TailwindCSS**.

---

## 🚀 Funkcjonalności

- ✅ **Logowanie przez konto Google**
- 📝 **Dodawanie, edytowanie i usuwanie wydatków**
- 📊 **Interaktywne wykresy** przedstawiające wydatki według kategorii
- 🔄 **Automatyczna synchronizacja danych** dzięki Firebase Firestore
- 📱 **Responsywny design** (Mobile first)

---

## 📦 Technologie

- [Next.js 14](https://nextjs.org/)
- [React 18](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)
- [Recharts](https://recharts.org/)

---

## 💻 Instalacja

```bash
git clone <url-twojego-repozytorium>
cd expense-tracker-nextjs
npm install
Utwórz plik .env.local w głównym katalogu projektu i dodaj do niego dane z Firebase:

env
Kopiuj
Edytuj
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
Uruchom aplikację lokalnie:

bash
Kopiuj
Edytuj
npm run dev
Aplikacja będzie dostępna na http://localhost:3000.

📁 Struktura projektu
css
Kopiuj
Edytuj
src/
├── app
│   ├── dashboard
│   ├── login
│   ├── layout.tsx
│   └── page.tsx
│
├── components
│   ├── ExpenseChart.tsx
│   ├── ExpenseEditForm.tsx
│   ├── ExpenseForm.tsx
│   ├── ExpenseList.tsx
│   ├── ExpenseListItem.tsx
│   └── layout
│       ├── Footer.tsx
│       └── Navbar.tsx
│
├── hooks
│   └── useExpenses.ts
│
└── lib
    └── firebase.ts
🎯 Plany na przyszłość
🔐 Rozbudowa autoryzacji i dodatkowe metody logowania
📅 Integracja kalendarza wydatków
📲 Aplikacja mobilna (React Native lub PWA)
🧪 Testy jednostkowe oraz integracyjne
🙋‍♂️ Autor
Seweryn Stalinger
📫 seweryn.webdev@gmail.com

```
