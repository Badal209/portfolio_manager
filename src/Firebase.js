// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyBX8lFRAQStKbzQOlrEVCSe5vldshLn4fI",
  authDomain: "fir-646b6.firebaseapp.com",
  // databaseURL: "https://fir-646b6-default-rtdb.firebaseio.com",
  projectId: "fir-646b6",
  storageBucket: "fir-646b6.appspot.com",
  messagingSenderId: "320931224943",
  appId: "1:320931224943:web:121a8163fc3a932a411c9a",
});

export const auth = getAuth();

export const db = getFirestore();

export default app;
