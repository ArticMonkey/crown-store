import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAT4K6J_0CChVALIK4P1lE55HFuQ9Z7iE8",
  authDomain: "crwn-db-ffd61.firebaseapp.com",
  databaseURL: "https://crwn-db-ffd61.firebaseio.com",
  projectId: "crwn-db-ffd61",
  storageBucket: "crwn-db-ffd61.appspot.com",
  messagingSenderId: "747787249293",
  appId: "1:747787249293:web:6269f7b95bf9ec723aa4c4",
  measurementId: "G-LWGH6DW120"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
