// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBL6mitPmtyzffNkYidB9Qyw6BrDJT7qg",
  authDomain: "firststorage-a8d96.firebaseapp.com",
  projectId: "firststorage-a8d96",
  storageBucket: "firststorage-a8d96.appspot.com",
  messagingSenderId: "1074142842957",
  appId: "1:1074142842957:web:a7642b8272bb3662d04c04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);