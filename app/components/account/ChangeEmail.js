import React, { useState } from 'react'
import {View, StyleSheet} from 'react-native'
import {Input, Button} from 'react-native-elements'

import * as firebase from 'firebase'

import {reauthenticate} from '../../util/Api'
import Color from '../../../constants/Colors'
import { validateEmail } from '../../util/Validation'


export default function ChangeEmail(props){
  const {email, setModalVisible, setReloadData, toastRef} = props
  const [newEmail, setNewEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState({})
  const [hidePass, setHidePass] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const updateEmail = async() => {
    setError({})
    setIsLoading(true)

    if(!newEmail || email==newEmail || !validateEmail(newEmail)) {
      setError({email: 'No hay un nuevo email.'})
    } else if (!password){
      setError({password: 'No se puede cambiar email sin reauntenticación'})
    } else {
      await reauthenticate(password).then( ()=>{
        serviceUpdateEmail(newEmail)
      }).catch(e => {
        toastRef.current.show(e)
        setError({password: 'La contraseña es incorrecta!'})
      })
    }

    setIsLoading(false)
  }
  const serviceUpdateEmail = async(email) => {
    await firebase
      .auth()
      .currentUser
      .updateEmail(email)
      .then( () => {
        setReloadData(true)
        toastRef.current.show('Email Actualizado Correctamente')
        setModalVisible(false)
      }).catch(e => {
        toastRef.current.show(e)
        setError({email: 'Error al actualizar Email'})
      })
  }

  return (
    <View style={styles.modalContainer}>
      <Input 
        placeholder='Correo Electronico'
        containerStyle={styles.inputStyle}
        defaultValue={email && email}
        onChange={e => setNewEmail(e.nativeEvent.text)}
        rightIcon= {
          {type: 'material-community', name:'at', color: Color.desactivate}
        }
        errorMessage={error.email}
      />
      <Input 
        placeholder='Password'
        containerStyle={styles.inputStyle}
        password={true}
        secureTextEntry={hidePass}
        onChange={e => setPassword(e.nativeEvent.text)}
        rightIcon= {{
          type: 'material-community', 
          name: hidePass ? 'eye-outline' : 'eye-off-outline', 
          color: Color.desactivate,
          onPress: () => setHidePass(!hidePass)
        }}
        errorMessage={error.password}
      />

      <Button 
        title= 'Cambiar Email'
        containerStyle = {styles.btnContainer}
        buttonStyle = {styles.btn}
        onPress = {updateEmail}
        loading={isLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    alignItems:'center',
    paddingTop:10,
    paddingBottom:10
  },
  inputStyle: {
    marginBottom:10
  },
  btnContainer: {
    marginTop: 20,
    width: '90%'
  },
  btn:{
    backgroundColor: Color.main
  }
})