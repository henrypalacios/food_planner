import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Avatar} from 'react-native-elements'

import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import * as firebase from 'firebase'

import {parseEmail} from '../../util/Parser'

export default function InfoUser(props){
  const {
    userInfo: {uid, photoURL, email, displayName},
    setReloadData,
    toastRef,
    setIsLoading, setTextLoading
  } = props

  
  const changeAvatar = async() => {
    const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    const permissionCameraRoll = resultPermission.permissions.cameraRoll.status 

    if (permissionCameraRoll == 'denied') {
      toastRef.current.show('Permiso Denegado')
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      })

      if (result.cancelled)
      toastRef.current.show('Has cerrado la galeria sin seleccionar!')
      else
        uploadImage(result.uri, uid).then(() => {
          updateUserAvatar(uid)
        }).catch(() => setIsLoading(false))
    }
  }

  const uploadImage = async(path, nameImage) => {
    setTextLoading('Subiendo Imagen')
    setIsLoading(true)
    const response = await fetch(path)
    const blob = await response.blob()

    const ref = await firebase
      .storage()
      .ref()
      .child(`avatar/${nameImage}`)
    
    return ref.put(blob)
  }

  const updateUserAvatar = uid => {
    firebase.storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then( async result => {
        const update = {photoURL: result}

        await firebase.auth().currentUser.updateProfile(update)
        setReloadData(true)
        setIsLoading(false)
      })
      .catch(() => toastRef.current.show('Error al recuperar URL avatar del Servidor'))

  }
  
  return(
    <View style={styles.viewInfoUser}>
      <Avatar rounded showEditButton
        size='large' 
        onEditPress={changeAvatar}
        containerStyle={styles.avatar}
        source={{
          uri: photoURL? photoURL : `https://api.adorable.io/avatars/100/${email}.png`
        }}
      />

      <View>
      <Text style={styles.displayName}>
        {displayName? displayName: parseEmail(email).name}
      </Text>
      <Text>
        {email? email: 'Social Login'}
      </Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  viewInfoUser:{
    justifyContent:'center',
    alignItems: 'center',
    paddingTop:30,
    paddingBottom:30,
    flexDirection: 'row',
    //backgroundColor: '#f2f2f2'
  },
  avatar: {
    marginRight:30
  },
  displayName:{
    textTransform: 'uppercase',
    fontWeight:'bold'
  }
})