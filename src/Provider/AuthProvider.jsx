// import {
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import React, { createContext, useEffect, useState } from "react";
// import { auth } from "../../firebase.config";
// import Loader from "../components/Loader";

// export const AuthContext = createContext();
// const googleProvider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   console.log(user);
//   const [loading, setLoading] = useState(true);

//   const createUser = (email, password, additionalData) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const signInUser = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };
//   const updateCurrentUser = (name, image) => {
//     setLoading(true);
//     return updateProfile(auth.currentUser, {
//       displayName: name,
//       photoURL: image,
//     });
//   };

//   const signInWithGoogle = () => {
//     return signInWithPopup(auth, googleProvider);
//   };

//   const signOutUser = () => {
//     return signOut(auth);
//   };

//   // Monitor the auth state change
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const authInfo = {
//     loading,
//     user,
//     createUser,
//     signInUser,
//     signOutUser,
//     signInWithGoogle,
//     updateCurrentUser,
//     setLoading,
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//       )}
//     </>
//   );
// };
// export default AuthProvider;

//manage user upddate

// import {
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "../../firebase.config";
// import Loader from "../components/Loader";

// export const AuthContext = createContext();

// const googleProvider = new GoogleAuthProvider();

// export const useAuth = () => useContext(AuthContext);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const signInUser = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const updateCurrentUser = (name, image) => {
//     setLoading(true);
//     return updateProfile(auth.currentUser, {
//       displayName: name,
//       photoURL: image,
//     });
//   };

//   const signInWithGoogle = () => {
//     setLoading(true);
//     return signInWithPopup(auth, googleProvider);
//   };

//   const signOutUser = () => {
//     setLoading(true);
//     return signOut(auth);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   const authInfo = {
//     loading,
//     user,
//     createUser,
//     signInUser,
//     signOutUser,
//     signInWithGoogle,
//     updateCurrentUser,
//     setLoading,
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//       )}
//     </>
//   );
// };

// export default AuthProvider;

//update for booked users

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase.config";

import axios from "axios";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For error state

  const createUser = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const signInUser = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const updateCurrentUser = async (name, image) => {
    setLoading(true);
    setError(null);
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: image,
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const { user } = userCredential;
      // If user data is missing, prompt user to update profile
      if (!user.displayName || !user.photoURL) {
        // Optionally, set a flag to prompt the user to complete their profile
        console.log("Please update your profile.");
      }
      return userCredential;
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        const user = { email: currentUser.email };
        axios
          .post("https://task-trade-server.vercel.app/jwt", user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
            setLoading(false);
          });
      } else {
        axios
          .post(
            "https://task-trade-server.vercel.app/logout",
            {},
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("logout", res.data);
            setLoading(false);
          });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    loading,
    user,
    error,
    createUser,
    signInUser,
    signOutUser,
    signInWithGoogle,
    updateCurrentUser,
    setLoading,
    setError, // Optionally expose error setter to allow setting from outside
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          {/* DaisyUI Spinner */}
          <span className="loading loading-spinner loading-lg text-blue-500"></span>

          {/* Uncomment this to use React Spinners instead */}
          {/* <ClipLoader color="#2563eb" size={50} /> */}
        </div>
      ) : (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
      )}
    </>
  );
};

export default AuthProvider;
