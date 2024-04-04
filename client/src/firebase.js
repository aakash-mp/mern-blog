// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-ed500.firebaseapp.com",
  projectId: "mern-blog-ed500",
  storageBucket: "mern-blog-ed500.appspot.com",
  messagingSenderId: "367534714664",
  appId: "1:367534714664:web:ae8229b73627fd95baea1d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

