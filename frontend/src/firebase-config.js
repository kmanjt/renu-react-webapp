import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRLXur7Aruh_EADjxKRsWtA-HY0P-G_ao",
  authDomain: "renu-22cf0.firebaseapp.com",
  databaseURL: "https://renu-22cf0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "renu-22cf0",
  storageBucket: "renu-22cf0.appspot.com",
  messagingSenderId: "478924071511",
  appId: "1:478924071511:web:d5cd8a215a9cd724bb7912",
  measurementId: "G-F0J0XM9SJQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app);