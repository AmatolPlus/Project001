import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './TimerTag.styles';
import CountdownTimer from '../CountdownTImer/CountdownTImer';

export default function TimerTag({time}: any) {
  return (
    <View style={styles.container}>
      <CountdownTimer targetDate={time} textStyle={styles.text} />
    </View>
  );
}
