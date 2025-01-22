// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMF1ZVtW74bfEbYycrNK_SBYBjt-7-bmg",
    authDomain: "dhineshkumar-bf5b8.firebaseapp.com",
    projectId: "dhineshkumar-bf5b8",
    storageBucket: "dhineshkumar-bf5b8.firebasestorage.app",
    messagingSenderId: "1004616852151",
    appId: "1:1004616852151:web:5dabc35146210bf479e332",
    measurementId: "G-DSXDM8G2S7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);