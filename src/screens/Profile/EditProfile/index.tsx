import {Button, Text} from '@/ui';
import React from 'react';
import {View} from 'react-native';

export default function Edit({navigation}) {
  return (
    <View>
      <Button onPress={() => navigation.navigate('DetailsScreen')}>
        <Text>go to DetailsScreen</Text>
      </Button>
    </View>
  );
}
