// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaSgRYq3wgNgfqkmPHGzz1OpFC2MTyA8E",
  authDomain: "netflix-demo-c9e5e.firebaseapp.com",
  projectId: "netflix-demo-c9e5e",
  storageBucket: "netflix-demo-c9e5e.appspot.com",
  messagingSenderId: "297715810159",
  appId: "1:297715810159:web:2c8c447557a1d7bc06f29a",
  measurementId: "G-MV1YCN5S8N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
