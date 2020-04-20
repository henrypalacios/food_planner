import React, {useState} from 'react'
import {View, StyleSheet} from 'react-native'

import {Input, Icon, Button} from 'react-native-elements'
import * as firebase from 'firebase'
import { withNavigation } from 'react-navigation'

import Color from '../../../constants/Colors'
import LoadingSpinner from '../core/Loading'
import { validateEmail } from '../../util/Validation'

function RegisterForm(props){
  const {toastRef, navigation} = props
  const [hidePass, setHidePass] = useState(true)
  const [hideRepeatPass, setHideRepeatPass] = useState(true)
  const [loadingVisible, setLoadingVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [repeatPass, setRepeatPass] = useState('')

  const register = async () => {
    setLoadingVisible(true)
    
    if (!email || !pass || !repeatPass) {
      toastRef.current.show('Campos Vacíos')
    }else {
      if(!validateEmail(email)) {
        toastRef.current.show('El e-mail esta incorrecto.')
      } else if (pass != repeatPass) {
        toastRef.current.show('Los passwords no coinciden.')
      } else {
        await firebase.auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(() => navigation.navigate('MyAccount'))
        .catch(e => toastRef.current.show('Problemas. ' + e))
      }
    }

    setLoadingVisible(false)
  }

  return(
    <View style={styles.formContainer}  >
      <Input
        placeholder='correo@domail.com'
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
      <Input
        placeholder='repetir password'
        password={true}
        secureTextEntry={hideRepeatPass}
        containerStyle={styles.InputForm}
        onChange={e => setRepeatPass(e.nativeEvent.text)}
        rightIcon={
          <Icon 
            type='material-community'
            name={hideRepeatPass ? 'eye-outline' : 'eye-off-outline'}
            iconStyle={styles.iconRight}
            onPress={()=> setHideRepeatPass(!hideRepeatPass)}
            underlayColor='transparent'
          />
        }
      />
      <Button 
        title='Registrar'
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={register}
      />

      <LoadingSpinner text='Creando Cuenta' isVisible={loadingVisible} />
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
    marginTop:50,
    width: '90%'
  },
  btnRegister: {
    backgroundColor: Color.main
  }
})

export default withNavigation(RegisterForm)