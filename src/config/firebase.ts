import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';



const firebaseConfig = {
  apiKey: "AIzaSyCQvIfgFxxMEfU7k89l5v5HUYwNeiHc0B8",
  authDomain: "sherlife-6785f.firebaseapp.com",
  projectId: "sherlife-6785f",
  storageBucket: "sherlife-6785f.firebasestorage.app",
  messagingSenderId: "546955186207",
  appId: "1:546955186207:web:5e589be41963caa86c852a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
