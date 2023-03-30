import {Button, Text} from '@/ui';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {styles} from './Details.styles';

export default function Details() {
  const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Details screen</Text>
      <Button style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Button>
    </View>
  );
}
