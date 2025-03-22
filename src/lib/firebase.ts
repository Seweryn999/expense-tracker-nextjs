import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInAnonymously,
  User,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiVsbYP7XIMzCKNGFlDJGnsEaGds8dfGg",
  authDomain: "expense-tracker-firebase-d79c8.firebaseapp.com",
  projectId: "expense-tracker-firebase-d79c8",
  storageBucket: "expense-tracker-firebase-d79c8.appspot.com",
  messagingSenderId: "801626640707",
  appId: "1:801626640707:web:dc55c5262ff1628bd91ff6",
  measurementId: "G-BEP7L0M4R6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Logowanie przez Google
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("✅ Zalogowano jako:", result.user.email);
  } catch (error) {
    console.error("❌ Błąd logowania przez Google:", error);
  }
};

// Logowanie anonimowe (gość)
export const signInAsGuest = async () => {
  try {
    const result = await signInAnonymously(auth);
    console.log("✅ Zalogowano anonimowo, ID:", result.user.uid);
  } catch (error) {
    console.error("❌ Błąd anonimowego logowania:", error);
  }
};

// Wylogowanie
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("✅ Wylogowano");
  } catch (error) {
    console.error("❌ Błąd wylogowywania:", error);
  }
};

// Zapis użytkownika do Firestore
export const saveUserToFirestore = async (user: User | null) => {
  if (!user) return;
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email || "Anonimowy",
      isAnonymous: user.isAnonymous,
      createdAt: serverTimestamp(),
    });
    console.log("✅ Użytkownik zapisany w Firestore:", user.uid);
  }
};

// Zapisywanie transakcji
export const logTransaction = async (
  userId: string,
  type: "add" | "edit" | "delete",
  amount: number,
  category: string
) => {
  try {
    await addDoc(collection(db, "transactions"), {
      userId,
      type,
      amount,
      category,
      date: new Date().toISOString(),
      timestamp: serverTimestamp(),
    });
    console.log(
      `✅ Zapisano transakcję: ${type} - ${amount} zł w kategorii ${category}`
    );
  } catch (error) {
    console.error("❌ Błąd zapisu transakcji:", error);
  }
};

// Nasłuchiwanie zmian stanu uwierzytelnienia
onAuthStateChanged(auth, (user) => {
  saveUserToFirestore(user);
});
