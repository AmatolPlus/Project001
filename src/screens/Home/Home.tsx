import {Button, Text} from '@/ui';
import {ScreenNames} from '@/utils/screenName';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {styles} from './Home.styles';

export default function Home() {
  const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Button
        style={styles.button}
        onPress={() => navigation.navigate(ScreenNames.details)}>
        <Text style={styles.buttonText}>DetailsScreen</Text>
      </Button>
    </View>
  );
}
