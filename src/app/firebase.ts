import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc , updateDoc, setDoc } from 'firebase/firestore';
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

export async function registerUserInFirebase(user: any) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
    const uid = userCredential.user.uid;

    const isDoctor = !!user.syndicateNumber; // لو فيه syndicateNumber معناها دكتور

    await setDoc(doc(db, 'users', uid), {
      name: user.name,
      email: user.email,
      gender: user.gender,
      birthdate: user.birthdate,
      mobile: user.mobile,
      Role: isDoctor ? 'Doctor' : 'Patient',
      syndicateNumber: isDoctor ? user.syndicateNumber : null,
      relativeNumber: isDoctor ? null : user.relativeNumber,
      createdAt: new Date(),
    });

    alert('User Registered Successfully!');
  } catch (error) {
    if (error instanceof Error) {
      alert(`Error: ${error.message}`);
    } else {
      alert('An unknown error occurred.');
    }
  }
}


// دالة لتسجيل دخول المستخدم (لمساعدتك لاحقًا في الـ login)
export async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    if (error instanceof Error) {
      alert(`Error: ${error.message}`);
    } else {
      alert('An unknown error occurred.');
    }
    return null; // Ensure a return value in all code paths
  }
}