import {Edit, Profile} from '@/screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {options} from '../utils/navigationConfig';

export default function ProfileStack() {
  let Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="ProfileScreen" component={Profile} />
      <Stack.Screen name="EditScreen" component={Edit} />
    </Stack.Navigator>
  );
}
