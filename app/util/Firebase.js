import firebase from 'firebase/app'
import {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
} from 'react-native-dotenv'


const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
  };

  export const firabaseApp = firebase.initializeApp(firebaseConfig)
