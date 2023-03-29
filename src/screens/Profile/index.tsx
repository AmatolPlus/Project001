import {Button, Text} from '@/ui';
import React from 'react';
import {View} from 'react-native';

export default function Profile({navigation}) {
  return (
    <View>
      <Button onPress={() => navigation.navigate('DetailsScreen')}>
        <Text>go to DetailsScreen</Text>
      </Button>
      <Text>Profile screen</Text>
    </View>
  );
}
