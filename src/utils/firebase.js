// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIxLOMvdfvDqv58EG3MGX1l5X-Lu8tXzk",
  authDomain: "netflixgpt-ae2f7.firebaseapp.com",
  projectId: "netflixgpt-ae2f7",
  storageBucket: "netflixgpt-ae2f7.appspot.com",
  messagingSenderId: "67065047811",
  appId: "1:67065047811:web:967f76f5ecab7efd029736",
  measurementId: "G-PM475WMN50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()