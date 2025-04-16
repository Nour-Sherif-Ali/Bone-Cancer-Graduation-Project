import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  setDoc,
  updateDoc
} from 'firebase/firestore';

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes
} from 'firebase/storage';

import { ToastrService } from 'ngx-toastr';

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCLETnp_eSrS3Ps9bj0VpF-s49_kQNQGds",
  authDomain: "bone-cancer-mti-2025.firebaseapp.com",
  projectId: "bone-cancer-mti-2025",
  storageBucket: "bone-cancer-mti-2025.appspot.com",
  messagingSenderId: "618185250201",
  appId: "1:618185250201:web:2f2e666a225f7577312f08",
  measurementId: "G-1C32T2L75K"
};

// ✅ Init
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const provider = new GoogleAuthProvider();
export { provider, signInWithPopup };

// ✅ Register with Email/Password
export async function registerUserInFirebase(user: any, selectedFile: File | null, toastr: ToastrService) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
    const uid = userCredential.user.uid;
    const isDoctor = !!user.syndicateNumber;

    let photoURL = '';
    if (selectedFile) {
      const fileRef = ref(storage, `profileImages/${uid}/${selectedFile.name}`);
      await uploadBytes(fileRef, selectedFile);
      photoURL = await getDownloadURL(fileRef);
    }

    await setDoc(doc(db, 'users', uid), {
      name: user.name,
      email: user.email,
      gender: user.gender,
      birthdate: user.birthdate,
      mobile: user.mobile,
      Role: isDoctor ? 'Doctor' : 'Patient',
      syndicateNumber: isDoctor ? user.syndicateNumber : null,
      relativeNumber: isDoctor ? null : user.relativeNumber,
      profileImage: photoURL || null,
      createdAt: new Date(),
    });

    toastr.success('User Registered Successfully!');
  } catch (error) {
    toastr.error('Error: ' + (error as Error).message);
  }
}

export async function updateUserData(uid: string, updatedData: any, toastr: ToastrService) {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...updatedData,
      updatedAt: new Date() // إضافة تاريخ التحديث
    });
    toastr.success('User info updated successfully!');
  } catch (error) {
    toastr.error('Error updating user: ' + (error as Error).message);
  }
}

// ✅ Login with Email/Password
export async function loginUser(email: string, password: string, toastr: ToastrService) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    if (error instanceof Error) {
      toastr.error(`Error: ${error.message}`);
    } else {
      toastr.error('An unknown error occurred.');
    }
    return null;
  }
}

// ✅ Login/Register with Google
export async function signUpWithGoogle(toastr: ToastrService, isDoctor: boolean, router: any) {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await setDoc(doc(db, 'users', user.uid), {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      Role: isDoctor ? 'Doctor' : 'Patient',
      createdAt: new Date()
    });

    toastr.success('Signed up successfully with Google!');
    router.navigate(['/home']); // ✅ Change route if needed
  } catch (error) {
    console.error('Google sign-up error:', error);
    toastr.error('Google sign-in failed.');
  }
}