/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text} from '@/ui';

import {Home, Profile} from '@/screens';
import {ScreenNames} from '@/utils/screenName';
import {Fonts, fontSize} from '@/utils/fonts';
import {TouchableOpacity, View} from 'react-native';
import {get} from '@/utils/storage';
import {Colors} from '@/utils/colors';
import {options} from '@/utils/navigationConfig';
import {height, width} from '@/utils/Dimension';

import Transactions from '@/screens/Transactions/Transactions';

const ProfileIcon = ({color, size, focused}: any) =>
  focused ? (
    <Ionicons name="md-person" size={size} color={Colors.purple} />
  ) : (
    <Ionicons name="person-outline" size={size} color={Colors.dark2} />
  );

const WalletIcon = ({color, size, focused}: any) =>
  focused ? (
    <Ionicons name="wallet-sharp" size={size} color={Colors.purple} />
  ) : (
    <Ionicons name="wallet-outline" size={size} color={Colors.dark2} />
  );

const HomeIcon = ({color, size, focused}: any) =>
  focused ? (
    <Ionicons name="md-home" color={Colors.purple} size={size} />
  ) : (
    <Ionicons name="home-outline" size={size} color={Colors.dark2} />
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
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,

        tabBarInactiveTintColor: Colors.dark2,
        tabBarActiveTintColor: Colors.purple,
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={{
                ...Fonts.h3,
                fontSize: fontSize.s1,
                color: Colors.purple,
                marginBottom: 4,
              }}>
              {focused ? route.name : ''}
            </Text>
          );
        },
        tabBarLabelStyle: {
          ...Fonts.sub1,
          marginBottom: 12,
        },
        tabBarStyle: {
          padding: 18,
          backgroundColor: Colors.white,
          height: height / 11,
        },
      })}>
      <Tab.Screen
        options={{
          tabBarIcon: HomeIcon,
          headerStyle: {
            backgroundColor: Colors.light,
          },
          headerTitle: () => (
            <View
              style={{
                display: 'flex',
                alignSelf: 'center',
                width: width,
                backgroundColor: Colors.light,
              }}>
              <Text
                style={{
                  ...Fonts.title,
                  textAlign: 'center',
                  fontSize: fontSize.title,
                  color: Colors.info,
                }}>
                HIGHFIVE
              </Text>
            </View>
          ),
        }}
        name={ScreenNames.home}
        component={Home}
      />
      <Tab.Screen
        options={({navigation}) => ({
          ...options,
          tabBarIcon: WalletIcon,
        })}
        name={ScreenNames.transactions}
        component={Transactions}
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
