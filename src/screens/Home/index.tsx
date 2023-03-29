import {Button, Text} from '@/ui';
import React from 'react';
import {View} from 'react-native';

export default function Home({navigation}) {
  return (
    <View>
      <Button onPress={() => navigation.navigate('DetailsScreen')}>
        <Text>go to DetailsScreen</Text>
      </Button>
      <Text>Home screen</Text>
    </View>
  );
}
