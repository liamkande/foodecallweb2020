import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAvcRWynRCX82hpFw4BaUftV54LjQHDXSI",
  authDomain: "food-e-call-nativeapp.firebaseapp.com",
  databaseURL: "https://food-e-call-nativeapp.firebaseio.com",
  projectId: "food-e-call-nativeapp",
  storageBucket: "food-e-call-nativeapp.appspot.com",
  messagingSenderId: "920243376910",
  appId: "1:920243376910:web:665c29c5f3d27e2725fd5f"
};

firebase.initializeApp(config);
 
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithRedirect(provider);

export default firebase;
