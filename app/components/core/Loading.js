import React from 'react'
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import {Overlay} from 'react-native-elements'

import Color from '../../../constants/Colors'
import MyOverlay from '../Overlay'

export default function Loading(props) {
  const {isVisible, text} = props
  
  return(
    <Overlay 
      isVisible={isVisible}
      windowBackgroundColor='rgba(255,255,255, .8)'
      overlayBackgroundColor='transparent'
      overlayStyle={styles.card}
    >
      <View style={styles.wraperIndicator}>
        <ActivityIndicator size='large' color={Color.tintColor}/>
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  card: {
    height: 100,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth:1,
    borderColor: Color.main
  },
  wraperIndicator:{
    flex:1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  text:{
    textTransform: 'uppercase',
    color: Color.main,
    marginTop: 12,
    textAlign: 'center',
    fontSize: 13
  }
})