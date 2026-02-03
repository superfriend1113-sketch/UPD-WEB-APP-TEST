/**
 * Firebase Environment Configuration Loader
 * Loads and validates Firebase credentials from environment variables
 */

export interface FirebaseEnv {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

/**
 * Load Firebase environment variables
 * @throws Error if required variables are missing
 */
export function loadFirebaseEnv(): FirebaseEnv {
  const env: Partial<FirebaseEnv> = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  if (!validateFirebaseEnv(env)) {
    const missingVars = getMissingVariables(env);
    const errorMessage = `Firebase configuration error: Missing required environment variables: ${missingVars.join(', ')}

Please ensure all required Firebase environment variables are set in your .env.local file.
See .env.example for the required variables.

Troubleshooting:
1. Copy .env.example to .env.local
2. Fill in your Firebase credentials from Firebase Console > Project Settings
3. Restart your development server`;

    console.error(errorMessage);
    throw new Error(`Missing Firebase environment variables: ${missingVars.join(', ')}`);
  }

  return env as FirebaseEnv;
}

/**
 * Validate that all required Firebase environment variables are present
 */
export function validateFirebaseEnv(env: Partial<FirebaseEnv>): env is FirebaseEnv {
  return !!(
    env.apiKey &&
    env.authDomain &&
    env.projectId &&
    env.storageBucket &&
    env.messagingSenderId &&
    env.appId
  );
}

/**
 * Get list of missing environment variables
 */
function getMissingVariables(env: Partial<FirebaseEnv>): string[] {
  const missing: string[] = [];
  
  if (!env.apiKey) missing.push('NEXT_PUBLIC_FIREBASE_API_KEY');
  if (!env.authDomain) missing.push('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
  if (!env.projectId) missing.push('NEXT_PUBLIC_FIREBASE_PROJECT_ID');
  if (!env.storageBucket) missing.push('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET');
  if (!env.messagingSenderId) missing.push('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID');
  if (!env.appId) missing.push('NEXT_PUBLIC_FIREBASE_APP_ID');
  
  return missing;
}
