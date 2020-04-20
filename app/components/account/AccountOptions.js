import React, {useState} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {ListItem} from 'react-native-elements'

import Color from '../../../constants/Colors'
import Modal from '../core/Modal'
import ChangeDisplayName from './ChangeDisplayName'
import ChangeEmail from './ChangeEmail'
import ChangePassword from './ChangePassword'

export default function AccountOptions(props){
  const {userInfo, toastRef, setReloadData} = props
  const [modalVisible, setModalVisible] = useState(false)
  const [renderComponent, setRenderComponent] = useState(null)
  const iconNameRight = 'chevron-right'
  const menuOptions = [
    {
      title: 'Cambiar Nombre y Apellido',
      iconNameLeft: 'account-circle',
      onPress: () => selectComponent('displayName')
    },
    {
      title: 'Cambiar Email',
      iconNameLeft: 'at',
      onPress: () => selectComponent('email')
    },
    {
      title: 'Cambiar Contraseña',
      iconNameLeft: 'lock-reset',
      onPress: () => selectComponent('password')
    },
  ]
  
  const selectComponent = key => {
    switch (key) {
      case "displayName":
        setRenderComponent( <ChangeDisplayName 
          displayName={userInfo.displayName} 
          setModalVisible={setModalVisible}
          toastRef={toastRef}
          setReloadData={setReloadData}
        />)
        setModalVisible(true)
        break;
      case "email":
        setRenderComponent(<ChangeEmail 
          email={userInfo.email} 
          setModalVisible={setModalVisible}
          toastRef={toastRef}
          setReloadData={setReloadData}
        />)
        setModalVisible(true)
        break;
      case "password":
        setRenderComponent(<ChangePassword setModalVisible={setModalVisible} toastRef={toastRef} />)
        setModalVisible(true)
        break;
      default:
        break;
    }
  }

  return(
    <View>
      { menuOptions.map( (menu, index) => (
          <ListItem 
            key={index}  
            title={menu.title}
            leftIcon={{type: 'material-community', name: menu.iconNameLeft, color: Color.desactivate}}
            rightIcon={{type: 'material-community', name: iconNameRight, color: Color.desactivateStrong}}
            onPress={menu.onPress}
            containerStyle={index === 0? styles.firstMenu: styles.menuItem}
          />
        ))
      }

      { renderComponent && (
        <Modal isVisible={modalVisible} setIsVisible={setModalVisible} >
          {renderComponent}
        </Modal>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  firstMenu: {
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor: Color.border
  },
  menuItem:{
    borderBottomWidth:1,
    borderColor: Color.border
  }
})