// assets/js/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import {
  getAuth,
 GoogleAuthProvider,
 signInWithPopup,
 createUserWithEmailAndPassword,
 signInWithEmailAndPassword,
 sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import {
getFirestore,
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";


// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSbA3wbJZUMnhcp3Ygj5zngIl9qLmY6TI",
  authDomain: "auth-ui-87be7.firebaseapp.com",
  projectId: "auth-ui-87be7",
  storageBucket: "auth-ui-87be7.firebasestorage.app",
  messagingSenderId: "539053762326",
  appId: "1:539053762326:web:d86caee24d52fa9c755237",
  measurementId: "G-G33XEM9V8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Auth setup
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
auth,
db,
doc,
setDoc,
provider,
signInWithPopup,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
sendPasswordResetEmail
};
