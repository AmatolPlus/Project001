import {Button, Text} from '@/ui';
import {ScreenNames} from '@/utils/screenName';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {styles} from './Profile.styles';

export default function Profile() {
  const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile screen</Text>
      <Button
        style={styles.button}
        onPress={() => navigation.navigate(ScreenNames.edit)}>
        <Text style={styles.buttonText}>Edit Screen</Text>
      </Button>
    </View>
  );
}
