import firebase from 'firebase/app'
import {FIREBASE_CONFIG} from '../config/config'


export const firabaseApp = firebase.initializeApp(FIREBASE_CONFIG)
