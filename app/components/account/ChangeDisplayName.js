import React, { useState } from 'react'
import {View, StyleSheet} from 'react-native'
import {Input, Button} from 'react-native-elements'

import * as firebase from 'firebase'

import Color from '../../../constants/Colors'


export default function ChangeDisplayName(props){
  const {displayName, setModalVisible, setReloadData, toastRef} = props
  const [newDisplayName, setNewDisplayName] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const updateDisplayName = value => {
    setError(null)

    if(!newDisplayName || newDisplayName==displayName) {
      setError('No has actualizado el nombre.')
    }else {
      setIsLoading(true)
      const update = {displayName: newDisplayName}

      firebase.auth()
        .currentUser
        .updateProfile(update)
        .then(() =>{
          setIsLoading(false)
          setReloadData(true)
          toastRef.current.show('Usuario Actualizado')
          setModalVisible(false)
        })
        .catch(e => {
          toastRef.current.show(e)
          setError('Error al actualizar.')
          setIsLoading(false)
        })
    }
  } 
  return (
    <View style={styles.modalContainer}>
      <Input 
        placeholder='Nombre y Apellido'
        containerStyle={styles.inputStyle}
        defaultValue={displayName && displayName}
        onChange={e => setNewDisplayName(e.nativeEvent.text)}
        rightIcon= {
          {type: 'material-community', name:'account-circle-outline', color: Color.desactivate}
        }
        errorMessage={error}
      />
      <Button 
        title= 'Cambiar Nombre'
        containerStyle = {styles.btnContainer}
        buttonStyle = {styles.btn}
        onPress = {updateDisplayName}
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