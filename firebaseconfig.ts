import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAMF1ZVtW74bfEbYycrNK_SBYBjt-7-bmg",
    authDomain: "dhineshkumar-bf5b8.firebaseapp.com",
    projectId: "dhineshkumar-bf5b8",
    storageBucket: "dhineshkumar-bf5b8.firebasestorage.app",
    messagingSenderId: "1004616852151",
    appId: "1:1004616852151:web:5dabc35146210bf479e332",
    measurementId: "G-DSXDM8G2S7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app, analytics, logEvent}