import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LoginScreen, LoginWithPin, VerificationScreen} from '../screens';
import {options} from '../utils/navigationConfig';
import {ScreenNames} from '@/utils/screenName';

export default function LoginStack() {
  let Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name={ScreenNames.login} component={LoginScreen} />
      <Stack.Screen
        name={ScreenNames.verifcation}
        component={VerificationScreen}
      />
      <Stack.Screen name={ScreenNames.loginWithPin} component={LoginWithPin} />
    </Stack.Navigator>
  );
}
