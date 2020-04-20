import React from 'react'
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native'
import {withNavigation} from 'react-navigation'

import {Button} from 'react-native-elements'

import Color from '../../../constants/Colors'

function UserGuest(props){
  const {navigation} = props
  
  return(
    <ScrollView style={styles.container} centerContent={true}>
      <Image
        source={require('../../../assets/food_planner.png')}
        style={styles.image}
        resizeMode='contain'
      />
      <Text style={styles.mainText}>Consulta el Itinerario</Text>
      <Text style={styles.descriptionText}>
        ¿Como apoyamos a los cocineros Soiquers? 
        Busca el Itinerario y califica el servicio de otros para motivarlos.
      </Text>
      <View style={styles.wrapButtons}>
        <Button
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btnStyle}
          title="Iniciar Sesión"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </ScrollView>
  )
}

export default withNavigation(UserGuest)

const styles = StyleSheet.create({
  container:{
    marginLeft:30,
    marginRight:30
  },
  image:{
    height:300,
    width:'100%',
    marginBottom: 40
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom:10,
    textAlign: 'center'
  },
  descriptionText: {
    marginBottom:40,
    textAlign: 'center'
  },
  wrapButtons: {
    flex:1,
    alignItems: 'center'
  },
  btnContainer: {
    width: '70%'
  },
  btnStyle:{
    backgroundColor: Color.main
  }
})