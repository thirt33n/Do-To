// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDGTuErHeaauv2JblzDVpMuTcH8WLmSkw8",
  authDomain: "do-to-5a8f1.firebaseapp.com",
  projectId: "do-to-5a8f1",
  storageBucket: "do-to-5a8f1.appspot.com",
  messagingSenderId: "789138911769",
  appId: "1:789138911769:web:6701ab4b5d7d5a6d9af088",
  measurementId: "G-4T5WWF53FY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);