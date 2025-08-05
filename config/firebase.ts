// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnqwu6IeAGpNS89OgjE63fgxj4mmYnoHs",
  authDomain: "aicoach-59934.firebaseapp.com",
  projectId: "aicoach-59934",
  storageBucket: "aicoach-59934.firebasestorage.app",
  messagingSenderId: "118468229382",
  appId: "1:118468229382:web:2e49f58ab8b2e1086cc687",
  measurementId: "G-48RWER530V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const db = getFirestore(app)
const analytics = getAnalytics(app);