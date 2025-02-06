
//// Import from Firebase that we will need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



//my firebase data
const firebaseConfig = {
  apiKey: "AIzaSyCbmLmetmwLLnPP9-vzF-IoeeNH5X_pa5I",  // API key to access Firebase
  authDomain: "real-time-chat-fadfd.firebaseapp.com",
  projectId: "real-time-chat-fadfd",
  storageBucket: "real-time-chat-fadfd.appspot.com",
  messagingSenderId: "955411152618",
  appId: "1:955411152618:web:ea36baabac935ad6b7a193",
};

const app = initializeApp(firebaseConfig); // initialize the Firebase app with the specified configuration
const db = getFirestore(app); // create a database with Firestore
const auth = getAuth(app);  // create an object for authentication
const googleProvider = new GoogleAuthProvider();


export { auth, app, db,googleProvider };  //export our objects to use them in other places
