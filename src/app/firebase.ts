import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc , updateDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCLETnp_eSrS3Ps9bj0VpF-s49_kQNQGds",
  authDomain: "bone-cancer-mti-2025.firebaseapp.com",
  projectId: "bone-cancer-mti-2025",
  storageBucket: "bone-cancer-mti-2025.firebasestorage.app",
  messagingSenderId: "618185250201",
  appId: "1:618185250201:web:2f2e666a225f7577312f08",
  measurementId: "G-1C32T2L75K"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

