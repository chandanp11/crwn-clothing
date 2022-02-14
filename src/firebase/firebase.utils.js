import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBTxKMhCNnk7ghktgHnYxxQ1RfU4xgo_aA",
  authDomain: "crown-db-dba55.firebaseapp.com",
  projectId: "crown-db-dba55",
  storageBucket: "crown-db-dba55.appspot.com",
  messagingSenderId: "861826715891",
  appId: "1:861826715891:web:4e8d0f9a1132f1a827a786",
  measurementId: "G-3DRKD6YDSX",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
