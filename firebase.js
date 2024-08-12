// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBs09LFX6BpilQ4Txgfo6NMaQUfJPl7wws",
  authDomain: "pantry-app-5ed17.firebaseapp.com",
  projectId: "pantry-app-5ed17",
  storageBucket: "pantry-app-5ed17.appspot.com",
  messagingSenderId: "285395824502",
  appId: "1:285395824502:web:2c529571d12d1734c1d457",
  measurementId: "G-KB0976Z093"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export {app , firestore}