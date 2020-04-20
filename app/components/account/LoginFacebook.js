import React, {useState} from 'react'
import {View, StyleSheet} from 'react-native'

import * as Facebook from 'expo-facebook'
import {SocialIcon} from 'react-native-elements'
import * as firebase from 'firebase'

import {FACEBOOK_CONFIG} from '../../config/config'
import LoadingSpinner from '../core/Loading'


export default function LoginFacebook(props) {
  const {toastRef, navigation} = props
  const [loadingVisible, setLoadingVisible] = useState(false)

  const facebookLogin = async() => {
    try {
      await Facebook.initializeAsync(FACEBOOK_CONFIG.appId);
      const { type, token} = await Facebook.logInWithReadPermissionsAsync({
        permissions: FACEBOOK_CONFIG.permissions,
      });
      
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        // console.log((await response.json()).name)
        //alert('Logged in!', `Hi ${(await response.json()).name}!`);
        return {type, token}
      } else {
        toastRef.current.show('Inicio Cancelado!')
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  const login = async() =>{
    setLoadingVisible(true)
    const {type, token} = await facebookLogin()

    if (token){
      const credentials = firebase.auth.FacebookAuthProvider.credential(token)

      await firebase.auth()
        .signInWithCredential(credentials)
        .then(() => navigation.navigate('MyAccount'))
        .catch(() => toastRef.current.show('Error accediendo con Facebook'))
    }

    setLoadingVisible(false)
  }

  return (
    <View style={styles.btnContainer}>
      <SocialIcon 
        title='Ingresar con Facebook'
        button
        type='facebook'
        onPress={login}
        raised={false}
        style={styles.facebook}
    />

    <LoadingSpinner isVisible={loadingVisible} />
    </View>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    flex:1,
    alignItems:'center'
  },
  facebook: {
    height:45, width: '90%', borderRadius:5
  }
})