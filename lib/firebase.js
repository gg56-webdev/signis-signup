// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyABvB-B8OH6IaA1Qwe3foKgGts5WAYPYa0',
  authDomain: 'fingerate.firebaseapp.com',
  databaseURL: 'https://fingerate-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'fingerate',
  storageBucket: 'fingerate.appspot.com',
  messagingSenderId: '660504480149',
  appId: '1:660504480149:web:9ce6b18335c0f3e4940e9c',
  measurementId: 'G-J2LQNZBPWY',
};

// Initialize Firebase

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

export const auth = getAuth(app);
export const db = getFirestore(app);
