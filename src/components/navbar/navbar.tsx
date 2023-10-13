import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NAVBAR } from '@constants/constants';
import { HomeStack } from '@screens/home/home-stack';
import { NavbarButton } from './navbar-button';
import { CompareStack } from '@screens/compare/compare-stack';
import { FavouritesStack } from '@screens/favourites/favourites-stack';
import { TeamsScreen } from '@screens/teams/teams-screen';
import { TeamsStack } from '@screens/teams/teams-stack';

const Tab = createBottomTabNavigator();
const { HOME, COMPARE, FAVOURITES, TEAMS } = NAVBAR;

export function Navbar() {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        tabBarActiveTintColor: '#000',
        // tabBarShowLabel: false,
        tabBarStyle: {
          paddingHorizontal: 8,
          paddingBottom: 8,
          height: 70,
          borderTopWidth: 1,
          borderTopColor: '#F1F1F1',
          elevation: 0
        },
        headerShadowVisible: false
      }}
    >
      <Tab.Screen
        name='HomeStack'
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavbarButton
              focused={focused}
              icon={HOME}
            />
          ),
          headerShown: false,
          tabBarLabel: 'Home'
        }}
      />
      <Tab.Screen
        name='CompareStack'
        component={CompareStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavbarButton
              focused={focused}
              icon={COMPARE}
            />
          ),
          tabBarLabel: 'Compare',
          headerShown: false
        }}
      />

      <Tab.Screen
        name='FavouritesStack'
        component={FavouritesStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavbarButton
              focused={focused}
              icon={FAVOURITES}
            />
          ),
          headerShown: false,
          tabBarLabel: 'Favourites'
        }}
      />
      <Tab.Screen
        name='TeamsStack'
        component={TeamsStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavbarButton
              focused={focused}
              icon={TEAMS}
            />
          ),
          headerShown: false,
          tabBarLabel: 'Teams'
        }}
      />
    </Tab.Navigator>
  );
}
