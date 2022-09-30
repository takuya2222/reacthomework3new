import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaTcencQYJp0xAociBxrz58e2CzxMKlQQ",
  authDomain: "reacthomework3new-4bd87.firebaseapp.com",
  projectId: "reacthomework3new-4bd87",
  storageBucket: "reacthomework3new-4bd87.appspot.com",
  messagingSenderId: "1038307213396",
  appId: "1:1038307213396:web:38f83bab4ec33743f86dc1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const db = getFirestore(app);

export default db;