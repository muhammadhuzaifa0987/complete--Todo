import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

//configure firebase
const firebaseConfig = {
    apiKey: "AIzaSyDDI02mLG4frGRerIodYR2B7zJLX-RKQVI",
    authDomain: "first-firebase-project-d07af.firebaseapp.com",
    projectId: "first-firebase-project-d07af",
    storageBucket: "first-firebase-project-d07af.appspot.com",
    messagingSenderId: "715305896838",
    appId: "1:715305896838:web:c32f2bf6271f9cfb043a07"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Auth
const auth = getAuth();

export {
  app,
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setDoc,
  getDoc,
};