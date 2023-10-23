// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realthor-d5143.firebaseapp.com",
  projectId: "realthor-d5143",
  storageBucket: "realthor-d5143.appspot.com",
  messagingSenderId: "531608118159",
  appId: "1:531608118159:web:b6afd9335dbba1a9ad61fa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);