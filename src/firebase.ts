import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  throw new Error('process.env.FIREBASE_API_KEY is not set')
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "notesync-940ad.firebaseapp.com",
  projectId: "notesync-940ad",
  storageBucket: "notesync-940ad.firebasestorage.app",
  messagingSenderId: "1046882851170",
  appId: "1:1046882851170:web:25a08e5d1025c3d116743b",
  measurementId: "G-F1YT62KC77"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp(); 

const db = getFirestore(app);

export { db };
