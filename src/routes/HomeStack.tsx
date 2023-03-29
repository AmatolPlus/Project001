import {Details, Home} from '@/screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {options} from '../utils/navigationConfig';

export default function HomeStack() {
  let Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="DetailsScreen" component={Details} />
    </Stack.Navigator>
  );
}
