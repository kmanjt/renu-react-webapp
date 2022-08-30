import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {getFirestore, connectFirestoreEmulator} from 'firebase/firestore';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmVgMqma5yEd8jwx9UfjWRoXR-1eLHgMI",
  authDomain: "renu-prod.firebaseapp.com",
  databaseURL: "https://renu-prod-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "renu-prod",
  storageBucket: "renu-prod.appspot.com",
  messagingSenderId: "453090805983",
  appId: "1:453090805983:web:e1ebb19bfe23d0a01cc16a",
  measurementId: "G-ZMB468JEHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);

export const myFS = getFirestore(app);

export const firebase = getAuth(app);

export default app;