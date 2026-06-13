import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApxIf6OhQn18p_oRH5TM8QxYH2t3Wsmmw",
  authDomain: "webaurixsite.firebaseapp.com",
  projectId: "webaurixsite",
  storageBucket: "webaurixsite.appspot.com",
  messagingSenderId: "1057936914192",
  appId: "1:1057936914192:web:2ffba7c6b4f0b58b909795",
  measurementId: "G-LGHYQCWFQD",
};

const app = initializeApp(firebaseConfig);
export const db   = getFirestore(app);
export const auth = getAuth(app);
