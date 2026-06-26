// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API,
  authDomain: "vingo-by-ak.firebaseapp.com",
  projectId: "vingo-by-ak",
  storageBucket: "vingo-by-ak.firebasestorage.app",
  messagingSenderId: "709502665153",
  appId: "1:709502665153:web:3136c22689ed97f1ceef40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)