import {createStackNavigator} from 'react-navigation-stack'

import TopProvider from '../screens/TopProvider'

const topListsScreenStack  = createStackNavigator({
    TopProvider: {
      screen: TopProvider,
      navigationOptions: () => ({
        title: 'Ranking Providers'
      })
    }
})

export default topListsScreenStack;