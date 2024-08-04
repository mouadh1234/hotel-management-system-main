import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey:'AIzaSyBT6HHMCPARSqdK-qVM3M6JE2j6_LvzF5I',
  authDomain: "hotel-managment-8637d.firebaseapp.com",
  projectId: "hotel-managment-8637d",
  storageBucket: "hotel-managment-8637d.appspot.com",
  messagingSenderId: "441601844846",
  appId: "1:441601844846:web:3d462a0eb50e33368ee87f",
  measurementId:"G-QRJGFBQB4T",
  // apiKey:'AIzaSyBT6HHMCPARSqdK-qVM3M6JE2j6_LvzF5I',
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
  // measurementId:process.env.FIREBASE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
