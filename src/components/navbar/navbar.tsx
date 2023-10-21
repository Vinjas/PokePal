import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NAVBAR } from '@constants/constants';
import { HomeStack } from '@screens/home/home-stack';
import { NavbarButton } from './navbar-button';
import { CompareStack } from '@screens/compare/compare-stack';
import { FavouritesStack } from '@screens/favourites/favourites-stack';
import { TeamsStack } from '@screens/teams/teams-stack';
import { Colors } from '@constants/styles';

const Tab = createBottomTabNavigator();
const { HOME, COMPARE, FAVOURITES, TEAMS } = NAVBAR;

const TabsArr = [
  { route: 'HomeStack', icon: HOME, label: 'Home', component: HomeStack },
  { route: 'CompareStack', icon: COMPARE, label: 'Compare', component: CompareStack },
  {
    route: 'FavouritesStack',
    icon: FAVOURITES,
    label: 'Favourites',
    component: FavouritesStack
  },
  { route: 'TeamsStack', icon: TEAMS, label: 'Teams', component: TeamsStack }
];

export function Navbar() {
  return (
    <Tab.Navigator
      initialRouteName={'HomeStack'}
      screenOptions={{
        tabBarStyle: {
          paddingHorizontal: 8,
          paddingBottom: 8,
          height: 70,
          elevation: 0,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center'
        },
        tabBarActiveTintColor: Colors.black
      }}
    >
      {TabsArr.map(tab => (
        <Tab.Screen
          key={tab.route}
          name={tab.route}
          component={tab.component}
          options={{
            tabBarIcon: ({ focused }) => (
              <NavbarButton
                focused={focused}
                icon={tab.icon}
              />
            ),
            tabBarLabel: tab.label,
            headerShown: false
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
