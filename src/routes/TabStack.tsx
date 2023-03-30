import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Home, Profile} from '@/screens';
import {ScreenNames} from '@/utils/screenName';

const ProfileIcon = ({color, size}: any) => (
  <Ionicons name="person" color={color} size={size} />
);

const HomeIcon = ({color, size}: any) => (
  <Ionicons name="home" color={color} size={size} />
);

export default function TabStack() {
  let Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarIcon: HomeIcon,
        }}
        name={ScreenNames.home}
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ProfileIcon,
        }}
        name={ScreenNames.profile}
        component={Profile}
      />
    </Tab.Navigator>
  );
}
