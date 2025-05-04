
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCstyAaduamK6Hof6sF41YTSDvF58yoLhY",
  authDomain: "explorenation-d16e0.firebaseapp.com",
  projectId: "explorenation-d16e0",
  storageBucket: "explorenation-d16e0.firebasestorage.app",
  messagingSenderId: "592747877083",
  appId: "1:592747877083:web:7d88a187770b29639c72fe",
  measurementId: "G-2K01E8RLN3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);