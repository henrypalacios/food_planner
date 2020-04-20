import React, { useState } from 'react'
import {View, StyleSheet} from 'react-native'
import {Input, Button, Divider} from 'react-native-elements'

import * as firebase from 'firebase'

import {reauthenticate} from '../../util/Api'
import Color from '../../../constants/Colors'
import { validateEmail } from '../../util/Validation'
import { Value } from 'react-native-reanimated'


export default function ChangeEmail(props){
  const {setModalVisible, toastRef} = props
  const [password, setPassword] = useState(null)
  const [newPassword, setNewPassword] = useState(null)
  const [newPasswordRepeat, setNewPasswordRepeat] = useState(null)
  const [error, setError] = useState({})
  const [hidePass, setHidePass] = useState(true)
  const [hideNewPass, setHideNewPass] = useState(true)
  const [hideNewPassRepeat, setHideNewPassRepeat] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const updatePassword = async() => {
    let objError = {}
    setError(objError)
    setIsLoading(true)

    if(!password || !newPassword || ! newPasswordRepeat) {
      const fields = {password, newPassword, newPasswordRepeat}
      Object.keys(fields).map(async(k) => {
        if (!fields[k]) 
          objError[k] = `Este campo no puede estar vacío.`
      })
    } else {
      await reauthenticate(password).then( ()=>{
        serviceUpdatePassword(newPassword)
      }).catch(e => {
        toastRef.current.show('Error al Reautenticar!')
        objError['password'] = 'La contraseña es incorrecta!'
      })
    }

    setError(objError)
    setIsLoading(false)
  }

  const serviceUpdatePassword = async password => {
    await firebase.auth()
    .currentUser
    .updatePassword(password)
    .then(() => {
      toastRef.current.show('!Contraseña Actualizada!')
      setModalVisible(false)
      firebase.auth().signOut()
    }).catch(() => 
      toastRef.current.show('!Error al actualizar Contraseña!')
    )
  }


  return (
    <View style={styles.modalContainer}>
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
      
      <Divider style={styles.divider}/>
      
      <Input 
        placeholder='New Password'
        containerStyle={styles.inputStyle}
        password={true}
        secureTextEntry={hideNewPass}
        onChange={e => setNewPassword(e.nativeEvent.text)}
        rightIcon= {{
          type: 'material-community', 
          name: hideNewPass ? 'eye-outline' : 'eye-off-outline', 
          color: Color.desactivate,
          onPress: () => setHideNewPass(!hideNewPass)
        }}
        errorMessage={error.newPassword}
      />
      <Input 
        placeholder='Repeat Password'
        containerStyle={styles.inputStyle}
        password={true}
        secureTextEntry={hideNewPassRepeat}
        onChange={e => setNewPasswordRepeat(e.nativeEvent.text)}
        rightIcon= {{
          type: 'material-community', 
          name: hideNewPassRepeat ? 'eye-outline' : 'eye-off-outline', 
          color: Color.desactivate,
          onPress: () => setHideNewPassRepeat(!hideNewPassRepeat)
        }}
        errorMessage={error.newPasswordRepeat}
      />

      <Button 
        title= 'Cambiar Password'
        containerStyle = {styles.btnContainer}
        buttonStyle = {styles.btn}
        onPress = {updatePassword}
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
  },

  divider: {
    backgroundColor: Color.main,
		marginTop:20,
    marginBottom:20,
    width:'94%',
    height:3
  }
})