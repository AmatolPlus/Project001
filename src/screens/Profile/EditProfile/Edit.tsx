import {Button, Text} from '@/ui';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {styles} from '../Profile.styles';

export default function Edit() {
  const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit screen</Text>
      <Button style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </Button>
    </View>
  );
}
