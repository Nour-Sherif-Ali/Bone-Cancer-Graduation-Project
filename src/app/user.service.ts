// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { auth, db } from './../app/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  constructor() {
    this.initUser();
  }

  private initUser() {
    onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        
        // Listen for real-time updates
        onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            this.userDataSubject.next({ uid: user.uid, ...docSnap.data() });
          }
        });
      } else {
        this.userDataSubject.next(null);
      }
    });
  }

  getCurrentUser() {
    return auth.currentUser;
  }
}
