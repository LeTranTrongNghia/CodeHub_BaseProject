// Import the functions you need from the SDKs you need
import 'firebase/analytics';
import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDm11T4hzdyiRlz_EtT9lYFi71MkdPGZjI',
	authDomain: 'codehubbase.firebaseapp.com',
	projectId: 'codehubbase',
	storageBucket: 'codehubbase.appspot.com',
	messagingSenderId: '40993432295',
	appId: '1:40993432295:web:20c4fa6b26526e1431b842',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };

//Muon lay du lieu duoc tu facebook thi can
export default firebaseConfig;
