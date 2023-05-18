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
import {BorderRadius, Spacing} from '@/utils/constants';
import {width} from '@/utils/Dimension';
import Transactions from '@/screens/Transactions/Transactions';

const ProfileIcon = ({color, size, focused}: any) =>
  focused ? (
    <Ionicons name="md-person" size={Spacing.xl * 1.3} color={Colors.white} />
  ) : (
    <Ionicons name="person-outline" size={size} color={Colors.light} />
  );

const WalletIcon = ({color, size, focused}: any) =>
  focused ? (
    <Ionicons
      name="wallet-sharp"
      size={Spacing.xl * 1.3}
      color={Colors.white}
    />
  ) : (
    <Ionicons name="wallet-outline" size={size} color={Colors.light} />
  );

const HomeIcon = ({color, size, focused}: any) =>
  focused ? (
    <Ionicons name="md-home" color={Colors.white} size={Spacing.xl * 1.3} />
  ) : (
    <Ionicons name="home-outline" size={size} color={Colors.light} />
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
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          marginHorizontal: Spacing.l,
          marginBottom: Spacing.l,
          borderRadius: BorderRadius.l,
          elevation: 2,
          backgroundColor: Colors.dark,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: HomeIcon,
          headerTitle: () => (
            <View
              style={{
                display: 'flex',
                alignSelf: 'center',
                width: width,
              }}>
              <Text
                style={{
                  ...Fonts.title,
                  textAlign: 'center',
                  fontSize: fontSize.title,
                  color: Colors.dark2,
                }}>
                HighFive
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
