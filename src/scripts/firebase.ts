import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCrYv-C0Zba8u0H0FeQ334O60vtkCGH4QU",
  authDomain: "imslp-storage.firebaseapp.com",
  projectId: "imslp-storage",
  storageBucket: "imslp-storage.firebasestorage.app",
  messagingSenderId: "243649322669",
  appId: "1:243649322669:web:d2575b1ef77122fbddf024",
  measurementId: "G-ZP91RRNDQ3"
};

export const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export const auth = getAuth(firebaseApp);
export const usersRef = collection(db, 'users')