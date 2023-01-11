// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC3Etj3avNu3engqciONUMi-zWb_0H43Gg",
    authDomain: "reactappauth-cea60.firebaseapp.com",
    projectId: "reactappauth-cea60",
    storageBucket: "reactappauth-cea60.appspot.com",
    messagingSenderId: "606926657121",
    appId: "1:606926657121:web:2201cfb7bf2b3845563c20",
    measurementId: "G-5K8T13GDM3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
export {analytics, auth , firestore};