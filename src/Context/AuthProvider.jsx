import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.init";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";
import Loading from "../Components/Loading/Loading";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe;
    };
  }, []);

  const verifyEmail = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const resetPasswordMail = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logOutUser = () => {
    return signOut(auth);
  };

  const userInfo = {
    createUser,
    loginUser,
    user,
    loading,
    verifyEmail,
    resetPasswordMail,
    signInWithGoogle,
    logOutUser,
    updateUserProfile,
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
