// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZrbF-XNoqiPIj_C_lZKF4AHy2ZzTe4wI",
  authDomain: "tourist-spot-9429c.firebaseapp.com",
  projectId: "tourist-spot-9429c",
  storageBucket: "tourist-spot-9429c.firebasestorage.app",
  messagingSenderId: "223640889981",
  appId: "1:223640889981:web:0793a6fa5e70216c3e5f14",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
