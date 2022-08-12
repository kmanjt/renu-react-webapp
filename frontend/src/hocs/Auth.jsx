import React, {useEffect, useState, createContext, useContext} from 'react';
import app, { firebase, myFS } from '../firebase-config';
import { 
  getAuth, onAuthStateChanged, 
  signInWithEmailAndPassword, signOut, 
  createUserWithEmailAndPassword,
  updateProfile} from "firebase/auth";
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { storage } from '../firebase-config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [authErrorMessage, setAuthErrorMessage] = useState();

    const createUser = (email, password) => {
      return createUserWithEmailAndPassword(firebase, email, password);
    };

    const logout = () => {
      setUser(null);
      return signOut(firebase);
    };

    const signIn = (email, password) => {
      return signInWithEmailAndPassword(firebase, email, password)
    }

    useEffect(() => {
        if (firebase) {
          const unsubscribe = onAuthStateChanged(firebase, (currentUser) => {
            // if user is null, then we force them to login
            console.log('onAuthStateChanged(): got user', currentUser.email);
            console.log(currentUser)
            setUser(currentUser);
          });
    
          return () => { 
            unsubscribe();
          }
        }
      }, [firebase]);

  

    return (
        <AuthContext.Provider value = {{ signIn, logout, user, createUser}}>
        {children}
        </AuthContext.Provider>
        )
    }

  export const UserAuth = () => {
    return useContext(AuthContext);
  }

  export async function upload(file, user, setLoading) {
    const fileRef = ref(storage, 'images/' + user.uid + '.png');

    setLoading(true);

    const snapshot = await uploadBytes(fileRef, file);
    
    const photoURL = await getDownloadURL(fileRef);

    updateProfile(user, {photoURL});

    setLoading(false);
    alert("File uploaded.");
  }