import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDP2zIjRcUV4HEVxf5ixyesx_J-FTNo6WA",
  authDomain: "movie-dashboard-6ed71.firebaseapp.com",
  projectId: "movie-dashboard-6ed71",
  storageBucket: "movie-dashboard-6ed71.firebasestorage.app",
  messagingSenderId: "241900401229",
  appId: "1:241900401229:web:c7a14a4aad5ae27295e204",
  measurementId: "G-GZ50SCBGZR"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 

const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;