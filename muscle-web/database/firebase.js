import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import Reg from "@/app/register/page";

const firebaseConfig = {
  apiKey: "AIzaSyABb9qSkmIWlCKxu3T2attOcV2HGD7T_AU",
  authDomain: "login-db-de29c.firebaseapp.com",
  projectId: "login-db-de29c",
  storageBucket: "login-db-de29c.appspot.com",
  messagingSenderId: "509482063082",
  appId: "1:509482063082:web:27ea8586cc4b03ff8df393",
  measurementId: "G-TBF6GWFZGT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
export const auth = getAuth();
export const database = getFirestore(app);
export default app;