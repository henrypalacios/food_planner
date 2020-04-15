import {createStackNavigator} from 'react-navigation-stack'

import AccountScreen from '../screens/Account'

const AccountScreenStack  = createStackNavigator({
    AccountScreen: {
      screen: AccountScreen,
      navigationOptions: () => ({
        title: 'Account'
      })
    }
})

export default AccountScreenStack;