import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LoginScreen, VerificationScreen} from '../screens';
import {options} from '../utils/navigationConfig';

export default function MainStack() {
  let Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
    </Stack.Navigator>
  );
}
