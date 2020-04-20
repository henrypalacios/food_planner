import React, {useRef} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-easy-toast'

import RegisterForm from '../../components/account/RegisterForm'
import {Toast as ToastStyle} from '../../../constants/ThemeStyles'

export default function Register(){
  const toastRef = useRef()

  return(
    <KeyboardAwareScrollView>
      <Image
        source={require('../../../assets/logo.png')}
        style={styles.image}
        resizeMode='contain'
      />

      <View style={styles.viewForm}>
        <RegisterForm toastRef={toastRef}/>
      </View>
      <Toast ref={toastRef} style={ToastStyle.error} position='top' opacity={0.8} fadeOutDuration={3000}/>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    height:100,
    width: '100%',
    marginTop:40
  },
  viewForm:{
    marginLeft: 30,
    marginRight: 30
  },
  toastError: {
    padding:10,
    backgroundColor:'red',
    alignItems:'center',
    width: '80%'
  }
})