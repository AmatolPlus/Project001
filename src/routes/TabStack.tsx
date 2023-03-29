import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import React from 'react';
import {options} from '../utils/navigationConfig';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TabStack() {
  const getTabBarVisibility = route => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const hideOnScreens = ['DetailsScreen', 'EditScreen']; // put here name of screen where you want to hide tabBar
    return hideOnScreens.indexOf(routeName) <= -1;
  };
  let Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      options={({route}) => ({
        tabBarStyle: (route => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? '';
          console.log(routeName);
          if (routeName === 'DetailsScreen' || 'EditScreen') {
            return {display: 'none'};
          }
          return;
        })(route),
      })}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
        name="Home"
        component={HomeStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
        name="Profile"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
}
