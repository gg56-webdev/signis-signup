import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

export function useUser() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    let unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsub();
    };
  }, []);

  return { user, loading, login, signUp, logout, resetPassword };
}
