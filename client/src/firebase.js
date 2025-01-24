// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-64bbd.firebaseapp.com",
  projectId: "real-estate-64bbd",
  storageBucket: "real-estate-64bbd.firebasestorage.app",
  messagingSenderId: "58976681415",
  appId: "1:58976681415:web:550e2a8e4bd34980a02de2",
  measurementId: "G-K3DML995VL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);