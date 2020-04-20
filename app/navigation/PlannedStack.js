import {createStackNavigator} from 'react-navigation-stack'

import PlannedScreen from '../screens/Planned'
import AddPlanScreen from '../screens/Planned/AddPlan'

const PlannedScreenStack  = createStackNavigator({
    Planned: {
      screen: PlannedScreen,
      navigationOptions: () => ({
        title: 'Programación de Comidas'
      })
    },
    AddPlan: {
      screen: AddPlanScreen,
      navigationOptions: () => ({
        title: 'Add Plan'
      })
    }
})

export default PlannedScreenStack;