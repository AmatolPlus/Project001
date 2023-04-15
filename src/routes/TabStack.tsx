/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Home, Profile} from '@/screens';
import {ScreenNames} from '@/utils/screenName';
import {Fonts, fontSize} from '@/utils/fonts';
import {TouchableOpacity} from 'react-native';
import {get} from '@/utils/storage';
import {Colors} from '@/utils/colors';
import {options} from '@/utils/navigationConfig';

const ProfileIcon = ({color, size}: any) => (
  <Ionicons name="person" color={color} size={size} />
);

const HomeIcon = ({color, size}: any) => (
  <Ionicons name="home" color={color} size={size} />
);

export default function TabStack() {
  const [sessionToken, setSessionToken] = useState('');
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    let token = get('token');
    setSessionToken(`${token}`);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: HomeIcon,
          headerTitle: 'HighFive',
          headerTitleStyle: {
            ...Fonts.title,
            fontSize: fontSize.title,
            color: Colors.dark2,
          },
        }}
        name={ScreenNames.home}
        component={Home}
      />
      <Tab.Screen
        options={({navigation}) => ({
          ...options,
          tabBarIcon: ProfileIcon,
          tabBarButton: props => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                {...props}
                onPress={() => {
                  sessionToken !== 'undefined'
                    ? navigation.navigate(ScreenNames.profile)
                    : navigation.navigate(ScreenNames.loginStack);
                }}
              />
            );
          },
        })}
        name={ScreenNames.profile}
        component={Profile}
      />
    </Tab.Navigator>
  );
}
