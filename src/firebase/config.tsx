/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/analytics';
import  'firebase/auth';
import 'firebase/firestore';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAJ5bOTqXs8O0MCJlkHs3J68zxAqfFwFE",
  authDomain: "fir-facebook-fdc7d.firebaseapp.com",
  projectId: "fir-facebook-fdc7d",
  storageBucket: "fir-facebook-fdc7d.appspot.com",
  messagingSenderId: "847980349716",
  appId: "1:847980349716:web:a94a1c7e6f92688e521a01",
  measurementId: "G-G4DEB0CLRQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();


export const logOut= () => {
  const confirm = window.confirm("You want to Logout ?");

  const authCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
          console.log("auth is empty");
          
      }else{
        console.log("unauthorized");
        
      }
    
  })
  if (confirm) {
    signOut(auth);
    localStorage.removeItem("user");
  }
};





