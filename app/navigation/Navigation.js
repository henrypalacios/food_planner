import React from 'react'
import { Icon } from 'react-native-elements'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import Colors from '../../constants/Colors'
import PlannedScreenStack from './PlannedStack'
import TopListsScreenStack from './TopListsScreenStack'
import SearchStack from './SearchStack'
import AccountStack from './AccountStack'

const NavigationStacks = createBottomTabNavigator(
  {
    Planned: {
      screen: PlannedScreenStack,
      navigationOptions: ()=> ({
        tabBarLabel: "Planned",
        tabBarIcon: ({tintColor})=> (
          <Icon type="material-community" name="account-clock-outline" size={22} color={tintColor}/>
        )
      })
    },
    Ranking: {
      screen: TopListsScreenStack,
      navigationOptions: ()=> ({
        tabBarLabel: "Ranking",
        tabBarIcon: ({tintColor})=> (
          <Icon type="material-community" name="star-outline" size={22} color={tintColor}/>
        )
      })
    },
    Search: {
      screen: SearchStack,
      navigationOptions: ()=> ({
        tabBarLabel: "Busqueda",
        tabBarIcon: ({tintColor})=> (
          <Icon type="material-community" name="magnify" size={22} color={tintColor}/>
        )
      })
    },
    Account: {
      screen: AccountStack,
      navigationOptions: ()=> ({
        tabBarLabel: "Account",
        tabBarIcon: ({tintColor})=> (
          <Icon type="material-community" name="account-circle-outline" size={22} color={tintColor}/>
        )
      })
    }
  },
  {
    initialRouteName: 'Planned',
    order: ["Planned", "Ranking", "Search", "Account"],
    tabBarOptions: {
      inactiveTintColor: Colors.tabIconDefault,
      activeTintColor: Colors.tintColor
    }
  }
)

export default createAppContainer(NavigationStacks)