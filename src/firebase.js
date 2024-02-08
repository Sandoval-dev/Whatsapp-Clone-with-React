// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfIeIM8KW9Emeerf5TEEVsQ5Qj4pYq-b0",
  authDomain: "whatsapp-2f5f5.firebaseapp.com",
  projectId: "whatsapp-2f5f5",
  storageBucket: "whatsapp-2f5f5.appspot.com",
  messagingSenderId: "883887163436",
  appId: "1:883887163436:web:7658f9c5310751e69a2989"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();


