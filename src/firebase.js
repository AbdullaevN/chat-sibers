// // src/firebase.js
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import {getAuth} from 'firebase/auth'

// const firebaseConfig = {
//     apiKey: "AIzaSyCbmLmetmwLLnPP9-vzF-IoeeNH5X_pa5I",  
//     authDomain: "real-time-chat-fadfd.firebaseapp.com",
//     projectId: "real-time-chat-fadfd",
//     storageBucket: "real-time-chat-fadfd.firebasestorage.app",
//     messagingSenderId: "955411152618",
//     appId: "1:955411152618:web:ea36baabac935ad6b7a193" 
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app)
// export const db = getFirestore(app);
// export {auth, app, db}
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbmLmetmwLLnPP9-vzF-IoeeNH5X_pa5I",
  authDomain: "real-time-chat-fadfd.firebaseapp.com",
  projectId: "real-time-chat-fadfd",
  storageBucket: "real-time-chat-fadfd.appspot.com",
  messagingSenderId: "955411152618",
  appId: "1:955411152618:web:ea36baabac935ad6b7a193",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, app, db };
