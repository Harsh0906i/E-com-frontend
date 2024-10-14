// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "e-com-eb068.firebaseapp.com",
  projectId: "e-com-eb068",
  storageBucket: "e-com-eb068.appspot.com",
  messagingSenderId: "1009397235474",
  appId: "1:1009397235474:web:ca7c5e55643c4b961e7dcb",
  measurementId: "G-7X75K2FT08"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);