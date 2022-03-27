import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTxKMhCNnk7ghktgHnYxxQ1RfU4xgo_aA",
  authDomain: "crown-db-dba55.firebaseapp.com",
  projectId: "crown-db-dba55",
  storageBucket: "crown-db-dba55.appspot.com",
  messagingSenderId: "861826715891",
  appId: "1:861826715891:web:4e8d0f9a1132f1a827a786",
  measurementId: "G-3DRKD6YDSX",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    console.log("User Auth don't exist");
    return;
  }
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdDate = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdDate,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createAuthUserWithEmailAndPassword(auth, email, password);
};

export default firebase;
