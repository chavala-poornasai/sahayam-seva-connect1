'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore'

let auth: Auth;
let db: Firestore;

// Initialize Firebase on module load
function initializeFirebaseInstance() {
  if (!getApps().length) {
    let firebaseApp;
    try {
      firebaseApp = initializeApp();
    } catch (e) {
      if (process.env.NODE_ENV === "production") {
        console.warn('Automatic initialization failed. Falling back to firebase config object.', e);
      }
      firebaseApp = initializeApp(firebaseConfig);
    }

    auth = getAuth(firebaseApp);
    db = getFirestore(firebaseApp);
  } else {
    const firebaseApp = getApp();
    auth = getAuth(firebaseApp);
    db = getFirestore(firebaseApp);
  }
}

// Initialize on import
initializeFirebaseInstance();

// Export function for client provider
export function initializeFirebase() {
  return {
    firebaseApp: getApp(),
    auth,
    firestore: db,
  };
}

// Export initialized instances
export { auth, db };

export * from './provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
