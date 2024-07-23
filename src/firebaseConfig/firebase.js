
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCzAG3AvZ2JGzVzLT1pGrsZK0Ei_uTTpYs",
  authDomain: "crud-jefer.firebaseapp.com",
  projectId: "crud-jefer",
  storageBucket: "crud-jefer.appspot.com",
  messagingSenderId: "683844052293",
  appId: "1:683844052293:web:b98166cc3f69bee45b4a2c"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);