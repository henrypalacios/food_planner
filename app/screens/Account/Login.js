import React, {useRef} from 'react'
import {StyleSheet, View, ScrollView, Image, Text} from 'react-native'

import {Divider} from 'react-native-elements'
import Toast from 'react-native-easy-toast'

import Color from '../../../constants/Colors'
import LoginForm from '../../components/account/LoginForm'
import LoginFacebook from '../../components/account/LoginFacebook'

export default function Login(props){
  const {navigation} = props
  const toastRef = useRef()
  
  const goRegister= () => {
    navigation.navigate('Register')
  }

  return(
    <ScrollView style={styles.viewContainer} centerContent={true}>
      <Image
        source={require('../../../assets/logo.png')}
        style={styles.image}
        resizeMode='contain'
      />
      <View style={styles.formsSection}>
				<View >
					<LoginForm toastRef={toastRef}/>
				</View>
				
				<View style={styles.registerSection}>
          <CreateAccount goRegister={goRegister}/>
					<Divider style={styles.divider}/>
					<LoginFacebook navigation={navigation} toastRef={toastRef} />
				</View>
			</View>

      <Toast ref={toastRef} position='center' opacity={0.8}/>
    </ScrollView>
  )
}

function CreateAccount(props) {
  const {goRegister} = props
  
  return(
    <Text style={styles.textRegister}>
      Si tienes un <Text style={{fontWeight:'bold'}}>@soicos,</Text> y no estas aquí.{' '}
      <Text style={styles.btnRegister} onPress={goRegister}>
        ¡Registrate!
      </Text>
    </Text>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    marginLeft:40,
		marginRight: 40,
		flex:1
  },
  image: {
    height:100,
    width: '100%',
    marginTop:40
	},
	formsSection: {
		flex:1,
		flexDirection: 'column',
		justifyContent:'space-between'
	},

	registerSection: {
    marginTop:50,
	},
  textRegister: {
    marginTop:20,
    marginLeft: 10,
    marginRight: 10,
  },
  btnRegister: {
    fontWeight: 'bold',
    color: Color.main
  },

  divider: {
    backgroundColor: Color.main,
		
		marginTop:40,
		marginBottom:40
  }
})