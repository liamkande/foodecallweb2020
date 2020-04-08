import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import uuid from 'uuid'


const config = {
  apiKey: "AIzaSyAvcRWynRCX82hpFw4BaUftV54LjQHDXSI",
  authDomain: "food-e-call-nativeapp.firebaseapp.com",
  databaseURL: "https://food-e-call-nativeapp.firebaseio.com",
  projectId: "food-e-call-nativeapp",
  storageBucket: "food-e-call-nativeapp.appspot.com",
  messagingSenderId: "920243376910",
  appId: "1:920243376910:web:665c29c5f3d27e2725fd5f"
}

firebase.initializeApp(config)
 

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
 
  const userRef = firestore.doc(`admins/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email} = userAuth
    const createdAt = new Date();
    const adminId = userAuth.uid
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        adminId,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating admin User', error.message)
    }
  }

  return userRef
};


export const createRestaurantProfileDocument = async (additionalData) => {
  const id = uuid.v4()

  const userRef = firestore.doc(`restaurants/${id}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    
    const createdAt = new Date()
    try {
      await userRef.set({
    
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating restaurant form', error.message)
    }
  }
 

  return userRef
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithRedirect(provider)

export const storage = firebase.storage()

export default firebase


