import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NAVBAR } from '@constants/constants';
import { HomeStack } from '@screens/home/home-stack';
import { NavbarButton } from './navbar-button';
import { CompareStack } from '@screens/compare/compare-stack';
import { FavouritesStack } from '@screens/favourites/favourites-stack';
import { TeamsStack } from '@screens/teams/teams-stack';
import { Colors } from '@constants/styles/colors';
import { AppThemeContext } from 'context/app-theme-context';
import { FontFamily } from '@constants/styles/fontsFamily';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

const { HOME, COMPARE, FAVOURITES, TEAMS } = NAVBAR;

const TabsArr = [
  {
    route: 'HomeStack',
    icon: HOME,
    label: 'pokedex',
    component: HomeStack
  },
  {
    route: 'CompareStack',
    icon: COMPARE,
    label: 'compare',
    component: CompareStack
  },
  {
    route: 'FavouritesStack',
    icon: FAVOURITES,
    label: 'favorites',
    component: FavouritesStack
  },
  {
    route: 'TeamsStack',
    icon: TEAMS,
    label: 'teams',
    component: TeamsStack
  }
];

export function Navbar() {
  const { isDarkMode } = useContext(AppThemeContext);

  const { t } = useTranslation();

  return (
    <Tab.Navigator initialRouteName={'HomeStack'}>
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
            tabBarLabel: t(`navbar.${tab.label}`),
            tabBarStyle: {
              backgroundColor: isDarkMode ? Colors.black : Colors.pureWhite,
              height: 70,
              paddingHorizontal: 10,
              paddingTop: 0,
              paddingBottom: 5
            },
            tabBarLabelStyle: {
              fontFamily: FontFamily.poppinsRegular,
              color: isDarkMode ? Colors.pureWhite : Colors.black
            },
            headerShown: false
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
