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
import {BorderRadius, Spacing} from '@/utils/constants';

const ProfileIcon = ({color, size, focused}: any) =>
  focused ? (
    <Ionicons name="md-person" size={Spacing.xl * 1.3} color={color} />
  ) : (
    <Ionicons name="person-outline" size={size} color={color} />
  );

const HomeIcon = ({color, size, focused}: any) =>
  focused ? (
    <Ionicons name="md-home" color={color} size={Spacing.xl * 1.3} />
  ) : (
    <Ionicons name="home-outline" size={size} color={color} />
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
        tabBarActiveTintColor: Colors.dark2,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderRadius: BorderRadius.s,
        },
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
