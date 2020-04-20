import {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  FACEBOOK_APP_ID
} from 'react-native-dotenv'


module.exports = {
  FIREBASE_CONFIG: {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
  },

  FACEBOOK_CONFIG: { 
    appId: FACEBOOK_APP_ID, 
    permissions: ['public_profile']
  },
}