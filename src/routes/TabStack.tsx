/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Home, Profile} from '@/screens';
import {ScreenNames} from '@/utils/screenName';
import {Fonts} from '@/utils/fonts';
import {TouchableOpacity} from 'react-native';
import {get} from '@/utils/storage';

const ProfileIcon = ({color, size}: any) => (
  <Ionicons name="person" color={color} size={size} />
);

const HomeIcon = ({color, size}: any) => (
  <Ionicons name="home" color={color} size={size} />
);

let token = get('token');

export default function TabStack() {
  let Tab = createBottomTabNavigator();

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
          },
        })}
        name={ScreenNames.profile}
        component={Profile}
      />
    </Tab.Navigator>
  );
}
