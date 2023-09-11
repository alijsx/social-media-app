import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKo3J4Sp8qMYpkhbWTSDQpbyf6jJbK7Ww",
  authDomain: "for-testing-2baf5.firebaseapp.com",
  databaseURL: "https://for-testing-2baf5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "for-testing-2baf5",
  storageBucket: "for-testing-2baf5.appspot.com",
  messagingSenderId: "652138421847",
  appId: "1:652138421847:web:dd798d1095346df020cd12",
  measurementId: "G-Z6B0Q153KL"
};
const firebaseConfig = {
 
};

const app = initializeApp(firebaseConfig);
const googleAuthProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, db, googleAuthProvider, storage };
