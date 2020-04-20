import React, {useState} from 'react'
import {View, StyleSheet} from 'react-native'

import {Input, Icon, Button} from 'react-native-elements'
import * as firebase from 'firebase'
import { withNavigation } from 'react-navigation'

import Color from '../../../constants/Colors'
import LoadingSpinner from '../core/Loading'
import { validateEmail } from '../../util/Validation'

function LoginForm(props){
  const {toastRef, navigation} = props
  const [hidePass, setHidePass] = useState(true)
  const [loadingVisible, setLoadingVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const login = async() => {
    setLoadingVisible(true)
    
    if (!email || !pass ) {
      toastRef.current.show('Todos los Campos son Obligatorios')
    }else {
      if(!validateEmail(email)) {
        toastRef.current.show('Email malo')
      } else {
        await firebase.auth()
        .signInWithEmailAndPassword(email, pass)
        .then(() => navigation.navigate('MyAccount'))
        .catch(e => toastRef.current.show('Email o Password Incorrectos'))
      }
    }

    setLoadingVisible(false)
  }

  return(
    <View style={styles.formContainer}  >
      <Input
        placeholder='Correo Electronico'
        containerStyle={styles.InputForm}
        onChange={e => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon 
            type='material-community'
            name='at'
            iconStyle={styles.iconRight}
            reverseColor='red'
          />
        }
      />
      <Input
        placeholder='password'
        password={true}
        secureTextEntry={hidePass}
        containerStyle={styles.InputForm}
        onChange={e => setPass(e.nativeEvent.text)}
        rightIcon={
          <Icon 
            type='material-community'
            name={hidePass ? 'eye-outline' : 'eye-off-outline'}
            iconStyle={styles.iconRight}
            onPress={()=> setHidePass(!hidePass)}
            underlayColor='transparent'
          />
        }
      />

      <Button 
        title='Iniciar Sesión'
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={login}
      />

      <LoadingSpinner text='Autenticando...' isVisible={loadingVisible} />
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer:{
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
    alignItems:'center',
  },
  InputForm: {
    width:'100%',
    marginTop:20
  },
  iconRight: {
    color: Color.desactivateStrong
  },
  btnContainerRegister: {
    marginTop:30,
    width: '90%'
  },
  btnRegister: {
    backgroundColor: Color.third
  }
})

export default withNavigation(LoginForm)