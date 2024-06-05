import { getFirestore } from '@firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBa6X0RE-lqiq6XZD-NQjMDYWlvVfD6LAY',
  authDomain: 'ucu-favorite-share.firebaseapp.com',
  projectId: 'ucu-favorite-share',
  storageBucket: 'ucu-favorite-share.appspot.com',
  messagingSenderId: '1020771733812',
  appId: '1:1020771733812:web:59899a2bfff303406f9561',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth();
