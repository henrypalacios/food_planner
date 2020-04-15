import {createStackNavigator} from 'react-navigation-stack'

import PlannedScreen from '../screens/Planned'

const PlannedScreenStack  = createStackNavigator({
    Planned: {
      screen: PlannedScreen,
      navigationOptions: () => ({
        title: 'Programación de Comidas'
      })
    }
})

export default PlannedScreenStack;