import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCY0q7Vi2DilfchzORuridC7FQgr0INJeA',
  authDomain: 'crypto-guru-ed9c7.firebaseapp.com',
  projectId: 'crypto-guru-ed9c7',
  storageBucket: 'crypto-guru-ed9c7.appspot.com',
  messagingSenderId: '943943580469',
  appId: '1:943943580469:web:2473399219db48c1f26a7c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
