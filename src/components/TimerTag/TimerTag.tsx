import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './TimerTag.styles';
import CountdownTimer from '../CountdownTImer/CountdownTImer';

export default function TimerTag({time}: any) {
  return (
    <View style={styles.container}>
      <View />
      <View style={styles.timerContainer}>
        <Text style={styles.endsOn}>Ends in </Text>
        <CountdownTimer targetDate={time} textStyle={styles.text} />
      </View>
    </View>
  );
}
