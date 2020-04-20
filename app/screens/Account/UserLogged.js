import React, { useState, useEffect, useRef } from 'react'
import {View, StyleSheet} from 'react-native'

import {Button} from 'react-native-elements'
import * as firebase from 'firebase'
import Toast from 'react-native-easy-toast'

import InfoUser from '../../components/account/InfoUser'
import AccountOptions from '../../components/account/AccountOptions'
import Color from '../../../constants/Colors'
import {Toast as ToastStyle} from '../../../constants/ThemeStyles'
import LoadingSpinner from '../../components/core/Loading'

export default function UserLogged(){
  const toastRef = useRef()
  const [userInfo, setUserInfo] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [textLoading, setTextLoading] = useState(null)
  const [reloadData, setReloadData] = useState(false)
  
  useEffect( () => {
    (async() => {
      const user = await firebase.auth().currentUser
      setUserInfo(user.providerData[0])
    })();

    setReloadData(false)
  }, [reloadData]);

  return(
    <View >
      <InfoUser setIsLoading={setIsLoading} 
        setTextLoading={setTextLoading} 
        toastRef={toastRef} 
        userInfo={userInfo} 
        setReloadData={setReloadData}
      />
      <AccountOptions userInfo={userInfo} toastRef={toastRef} setReloadData={setReloadData}/>

      <Button
        title='Cerrar'
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
        onPress={() => firebase.auth().signOut()}
      />
      <Toast ref={toastRef} style={ToastStyle.error} position='top' opacity={0.8} />
      <LoadingSpinner isVisible={isLoading} text={textLoading}/>
    </View>
  )
}

const styles = StyleSheet.create({
  btnCloseSession: {
    marginTop:30,
    borderRadius:0,
    backgroundColor: 'white',
    borderBottomWidth:1,
    borderTopWidth: 1,
    borderColor: Color.border,
    paddingTop: 10,
    paddingBottom: 10
  },
  btnCloseSessionText: {
    color: Color.second
  }
})