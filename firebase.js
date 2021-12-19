// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA2WcUjunnwDk5geSIRWa253Q5-2APQKyI",
    authDomain: "pilltracker-22d6f.firebaseapp.com",
    projectId: "pilltracker-22d6f",
    storageBucket: "pilltracker-22d6f.appspot.com",
    messagingSenderId: "1032909443346",
    appId: "1:1032909443346:web:005eaeb41b54db0a67a3cb",
    measurementId: "G-MWK87DGK05"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig)
}else{
    app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export {auth, firestore};
