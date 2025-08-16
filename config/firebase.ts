
// import { initializeApp } from "firebase/app";
// import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyDnqwu6IeAGpNS89OgjE63fgxj4mmYnoHs",
//   authDomain: "aicoach-59934.firebaseapp.com",
//   projectId: "aicoach-59934",
//   storageBucket: "aicoach-59934.firebasestorage.app",
//   messagingSenderId: "118468229382",
//   appId: "1:118468229382:web:2e49f58ab8b2e1086cc687",
//   measurementId: "G-48RWER530V"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// })
// export const db = getFirestore(app)
// const analytics = getAnalytics(app);

import { Platform } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported as analyticsIsSupported } from "firebase/analytics";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, setPersistence ,  initializeAuth, getReactNativePersistence} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnqwu6IeAGpNS89OgjE63fgxj4mmYnoHs",
  authDomain: "aicoach-59934.firebaseapp.com",
  projectId: "aicoach-59934",
  storageBucket: "aicoach-59934.firebasestorage.app",
  messagingSenderId: "118468229382",
  appId: "1:118468229382:web:2e49f58ab8b2e1086cc687",
  measurementId: "G-48RWER530V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
let auth;
if (Platform.OS === "web") {
  auth = getAuth(app);

  // Dynamically import browserLocalPersistence (TS-safe)
  import("firebase/auth").then((authModule: any) => {
    setPersistence(auth, authModule.browserLocalPersistence);
  });
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

export { auth };

// Firestore
export const db = getFirestore(app);

// Analytics (only on web)
let analytics: any;
analyticsIsSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});
export { analytics };


