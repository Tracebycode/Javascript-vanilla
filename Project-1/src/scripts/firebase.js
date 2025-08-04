import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";




// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8YU_uYWmNAu7fBgXaJhrfRiyMw641R0M",
  authDomain: "taskmanager-e114f.firebaseapp.com",
  projectId: "taskmanager-e114f",
  storageBucket: "taskmanager-e114f.firebasestorage.app",
  messagingSenderId: "238188437660",
  appId: "1:238188437660:web:b23705f0e79e2f85ad8d59",
  measurementId: "G-1P6NYHB6VV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export {db, analytics};