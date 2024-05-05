// Import the functions you need from the SDKs you need
import 'firebase/analytics';
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STRORAGE_BUCKET ,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ,
  appId: "1:40993432295:web:20c4fa6b26526e1431b842"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore =- getFirestore(app);

export { app, auth, firestore };

//Muon lay du lieu duoc tu facebook thi can
export default firebaseConfig;