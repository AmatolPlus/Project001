/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

import {Home, Profile} from '@/screens';
import {ScreenNames} from '@/utils/screenName';
import {Fonts} from '@/utils/fonts';
import {get} from '@/utils/storage';

const ProfileIcon = ({color, size}: any) => (
  <Ionicons name="person" color={color} size={size} />
);

const HomeIcon = ({color, size}: any) => (
  <Ionicons name="home" color={color} size={size} />
);

const token = get('token');

export default function TabStack() {
  const Tab = createBottomTabNavigator();

  const TabBarButton = (
    props: JSX.IntrinsicAttributes & Readonly<TouchableOpacityProps>,
    {navigation}: any,
  ): any => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        {...props}
        onPress={() =>
          token
            ? navigation.navigate(ScreenNames.profile)
            : navigation.navigate(ScreenNames.loginStack)
        }
      />
    );
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarIcon: HomeIcon,
          headerTitle: 'HighFive',
          headerTitleStyle: {...Fonts.title},
        }}
        name={ScreenNames.home}
        component={Home}
      />
      <Tab.Screen
        options={({navigation}) => ({
          tabBarIcon: ProfileIcon,
          tabBarButton: props => {
            return <TabBarButton {...props} navigation={navigation} />;
          },
        })}
        name={ScreenNames.profile}
        component={Profile}
      />
    </Tab.Navigator>
  );
}
