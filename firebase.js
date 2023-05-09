import * as firebase from "firebase"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth } ;