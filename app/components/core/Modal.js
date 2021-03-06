import React from 'react'
import {StyleSheet} from 'react-native'
import {Overlay} from 'react-native-elements'


export default function Modal(props) {
  const {children, isVisible, setIsVisible} = props

  const closeModal = ()=> setIsVisible(false)

  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor='rgba(0,0,0,.5)'
      //overlayBackgroundColor='transparent'
      onBackdropPress={closeModal}
      overlayStyle={styles.overlay}
    >
      {children}
    </Overlay>
  )
}

const styles = StyleSheet.create({
  overlay: {
    height: 'auto',
    width: '90%',
    //backgroundColor: 'white'
  }
})