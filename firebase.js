// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWPaxZEEo9k1Fl_oKjRAdRkE2e_1C1CzI",
  authDomain: "rd-sound-cloud.firebaseapp.com",
  databaseURL: "https://rd-sound-cloud-default-rtdb.firebaseio.com",
  projectId: "rd-sound-cloud",
  storageBucket: "rd-sound-cloud.appspot.com",
  messagingSenderId: "633642292761",
  appId: "1:633642292761:web:4dcbb25f1feb5aceadfc88",
  measurementId: "G-Z0WWMQFYXG",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
