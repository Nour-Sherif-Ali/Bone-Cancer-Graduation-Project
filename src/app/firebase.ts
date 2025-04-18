import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut 
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  setDoc, 
  getDoc
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
    const isDoctor = !!user.medicalCard; 

    

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
      userType: isDoctor ? 'Doctor' : 'Patient',
      medicalCard: isDoctor ? user.medicalCard : null,
      relativeNumber: isDoctor ? null : user.relativeNumber,
      profileImage: photoURL || null,
      createdAt: new Date(),
    });

    toastr.success('User Registered Successfully!');
  } catch (error) {
    toastr.error('Error: ' + (error as Error).message);
  }
}

// ✅ Login with Email/Password



export async function loginUser(email: string, password: string, toastr: ToastrService, router: any) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    const userDocRef = doc(db, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const userType = userData['userType'];

      // ✨ Store in localStorage or use Angular service
      localStorage.setItem('userType', userType);
      localStorage.setItem('uid', uid);

      // ✨ Navigate based on role
      if (userType === 'Doctor') {
        router.navigate(['/doctordashboard']);
      } else {
        router.navigate(['dashboard']);
      }

      toastr.success(`Welcome back, ${userData['name']}!`);
      return userCredential.user;
    } else {
      toastr.error('User data not found.');
      return null;
    }

  } catch (error) {
    if (error instanceof Error) {
      toastr.error(`Error: ${error.message}`);
    } else {
      toastr.error('An unknown error occurred.');
    }
    return null;
  }
}


// ✅ Logout Function
export async function logoutUser(router: any, toastr: ToastrService) {
  try {
    await signOut(auth);

    // 🧹 Clear local storage
    localStorage.removeItem('uid');
    localStorage.removeItem('userType');

    // ✅ Redirect to login page
    router.navigate(['/login']);
    toastr.success('Logged out successfully!');
  } catch (error) {
    console.error('Logout error:', error);
    toastr.error(' Logout failed. Please try again.');
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
      userType: isDoctor ? 'Doctor' : 'Patient',
      createdAt: new Date()
    });

    toastr.success('Signed up successfully with Google!');
    router.navigate(['/home']); // ✅ Change route if needed
  } catch (error) {
    console.error('Google sign-up error:', error);
    toastr.error('Google sign-in failed.');
  }
}