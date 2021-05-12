import firebase from "firebase/app";
import { firebaseConfig } from "./firebase.config";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
export const provider = new firebase.auth.GoogleAuthProvider();
