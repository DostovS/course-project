import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCUWW7Hhca8TZ_oUoZFzoCML1pX37CYj8s",
  authDomain: "announce-ef079.firebaseapp.com",
  projectId: "announce-ef079",
  storageBucket: "announce-ef079.appspot.com",
  messagingSenderId: "992736488553",
  appId: "1:992736488553:web:cb181c330ab067da6606f8",
  measurementId: "G-XYQFT22TXF"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);