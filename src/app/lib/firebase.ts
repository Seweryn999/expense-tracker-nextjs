// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiVsbYP7XIMzCKNGFlDJGnsEaGds8dfGg",
  authDomain: "expense-tracker-firebase-d79c8.firebaseapp.com",
  projectId: "expense-tracker-firebase-d79c8",
  storageBucket: "expense-tracker-firebase-d79c8.firebasestorage.app",
  messagingSenderId: "801626640707",
  appId: "1:801626640707:web:dc55c5262ff1628bd91ff6",
  measurementId: "G-BEP7L0M4R6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
