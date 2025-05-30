// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrYv-C0Zba8u0H0FeQ334O60vtkCGH4QU",
  authDomain: "imslp-storage.firebaseapp.com",
  projectId: "imslp-storage",
  storageBucket: "imslp-storage.firebasestorage.app",
  messagingSenderId: "243649322669",
  appId: "1:243649322669:web:d2575b1ef77122fbddf024",
  measurementId: "G-ZP91RRNDQ3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);