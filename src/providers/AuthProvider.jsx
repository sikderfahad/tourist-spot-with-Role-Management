import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { fetchUserRole } from "../hooks/fetchRole";
import { storeUserInFirestore } from "../hooks/storeUserInFirestore";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const getRoleData = fetchUserRole();
  console.log("get role data info: ", getRoleData);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const googleLogin = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      await storeUserInFirestore(res?.user);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const githubLogin = async () => {
    setLoading(true);
    return await signInWithPopup(auth, githubProvider).finally(() =>
      setLoading(false)
    );
  };

  const signIn = async (email, pass) => {
    setLoading(true);
    return await signInWithEmailAndPassword(auth, email, pass).finally(() =>
      setLoading(false)
    );
  };

  const signup = async (email, pass) => {
    setLoading(true);
    return await createUserWithEmailAndPassword(auth, email, pass).finally(() =>
      setLoading(false)
    );
  };

  const userProfile = async (userDoc) => {
    setLoading(true);
    return await updateProfile(auth.currentUser, userDoc).finally(() =>
      setLoading(false)
    );
  };

  const logout = async () => {
    setLoading(true);
    return await signOut(auth).finally(() => setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        try {
          const userId = currentUser.uid;
          if (!userId) throw new Error("User UID is undefined");

          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setRole(docSnap.data().role);
          } else {
            console.warn("No such document for user:", userId);
            setRole("user"); // Default role
          }
        } catch (error) {
          console.error("Error fetching user role:", error.message);
        }
      } else {
        setRole(null);
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    role,
    loading,
    googleLogin,
    githubLogin,
    signIn,
    signup,
    userProfile,
    logout,
  };

  return <AuthContext.Provider value={value}>{children} </AuthContext.Provider>;
};

export default AuthProvider;
