import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();

  const logout = async () => {
    const { signOut } = await import('firebase/auth');
    signOut(auth);
  };

  const login = async (email, password) => {
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    await signInWithEmailAndPassword(auth, email, password);
  };

  const getUserDocRef = async (userId) => {
    const [{ db }, { doc }] = await Promise.all([import('../lib/firebase'), import('firebase/firestore')]);
    return doc(db, 'users_signis', userId);
  };

  const signUp = async (email, password, userData) => {
    const [{ createUserWithEmailAndPassword }, { setDoc, serverTimestamp }] = await Promise.all([
      import('firebase/auth'),
      import('firebase/firestore'),
    ]);
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(await getUserDocRef(user.uid), { ...userData, created_at: serverTimestamp() });
  };

  const resetPassword = async (email) => {
    const { sendPasswordResetEmail } = await import('firebase/auth');
    await sendPasswordResetEmail(auth, email);
  };

  const getUserDoc = async (userId) => {
    const { getDoc } = await import('firebase/firestore');
    setUserData((await getDoc(await getUserDocRef(userId))).data());
  };

  useEffect(() => {
    const unsubFromAuth = onAuthStateChanged(auth, async (user) => {
      if (user) await getUserDoc(user.uid);
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubFromAuth();
    };
  }, []);

  return { user, userData, loading, login, signUp, logout, resetPassword };
}
