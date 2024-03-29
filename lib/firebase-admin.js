import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';
import { encrypted } from './service-account.enc';
import { decrypt } from '../utils/decrypt';

let admin;
if (!getApps().length) {
  const { private_key } = decrypt(encrypted);
  admin = initializeApp({
    credential: cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: private_key,
      // process.env.NODE_ENV === 'development'
      //   ? process.env.FIREBASE_PRIVATE_KEY
      //   : JSON.parse(process.env.FIREBASE_PRIVATE_KEY),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    }),
    databaseURL: 'https://fingerate-default-rtdb.asia-southeast1.firebasedatabase.app',
  });
}

export default admin;
export const db = getFirestore(admin);
export const auth = getAuth(admin);
export const rtd = getDatabase(admin);
