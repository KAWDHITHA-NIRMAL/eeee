// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBlI4LowrZO_zTgNZ4c5jI4O6ElxcxxXSc",
  authDomain: "edu-lanka-9792d.firebaseapp.com",
  projectId: "edu-lanka-9792d",
  storageBucket: "edu-lanka-9792d.firebasestorage.app",
  messagingSenderId: "769214395220",
  appId: "1:769214395220:web:439e9cc46244ceb1148ec1",
  measurementId: "G-3Y9H0VJLM7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
