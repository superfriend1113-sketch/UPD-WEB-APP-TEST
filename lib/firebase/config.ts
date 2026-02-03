/**
 * Firebase Client SDK Configuration
 * Initializes and exports Firebase instances for the User Web App
 */

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { loadFirebaseEnv } from './env';

let app: FirebaseApp | undefined;
let firestore: Firestore | undefined;
let storage: FirebaseStorage | undefined;

/**
 * Initialize Firebase with configuration from environment variables
 * Uses singleton pattern to prevent multiple initializations
 */
export function initializeFirebase(): FirebaseApp {
  // Return existing app if already initialized
  const existingApps = getApps();
  if (existingApps.length > 0) {
    app = existingApps[0];
    return app;
  }

  try {
    const config = loadFirebaseEnv();
    
    app = initializeApp({
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      projectId: config.projectId,
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId,
      appId: config.appId,
    });

    console.log('Firebase initialized successfully');
    return app;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Firebase initialization failed:', errorMessage);
    throw new Error(`Firebase initialization failed: ${errorMessage}`);
  }
}

/**
 * Get Firestore instance
 * Initializes Firebase if not already initialized
 */
export function getFirestoreInstance(): Firestore {
  if (!firestore) {
    const firebaseApp = app || initializeFirebase();
    firestore = getFirestore(firebaseApp);
  }
  return firestore;
}

/**
 * Get Storage instance
 * Initializes Firebase if not already initialized
 */
export function getStorageInstance(): FirebaseStorage {
  if (!storage) {
    const firebaseApp = app || initializeFirebase();
    storage = getStorage(firebaseApp);
  }
  return storage;
}

/**
 * Get Firebase App instance
 */
export function getFirebaseApp(): FirebaseApp {
  return app || initializeFirebase();
}

// Initialize Firebase on module load (client-side only)
if (typeof window !== 'undefined') {
  initializeFirebase();
}
