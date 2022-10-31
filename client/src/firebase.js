import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTnZZumjZF201b0RVTMyvAcSwBgId-njc",
  authDomain: "itransition-4defc.firebaseapp.com",
  projectId: "itransition-4defc",
  storageBucket: "itransition-4defc.appspot.com",
  messagingSenderId: "833955997087",
  appId: "1:833955997087:web:146467076ba690fae589aa",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);