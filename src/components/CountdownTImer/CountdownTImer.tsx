import React, {useState, useEffect, useMemo} from 'react';
import {View} from 'react-native';
import {Text} from '@/ui';

import {ICountdownTimer} from './CountdownTImer.types';
import {styles} from './CountdownTImer.styles';

const CountdownTimer = ({targetDate, textStyle}: ICountdownTimer) => {
  const [remainingTime, setRemainingTime] = useState(targetDate - Date.now());

  useEffect(() => {
    let animationFrameId: number;
    function tick() {
      const newRemainingTime = targetDate - Date.now();
      if (newRemainingTime <= 0) {
        setRemainingTime(0);
      } else {
        setRemainingTime(newRemainingTime);
        animationFrameId = requestAnimationFrame(tick);
      }
    }

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [targetDate]);

  const days = useMemo(
    () => Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
    [remainingTime],
  );
  const hours = useMemo(
    () => Math.floor((remainingTime / (1000 * 60 * 60)) % 24),
    [remainingTime],
  );
  const minutes = useMemo(
    () => Math.floor((remainingTime / (1000 * 60)) % 60),
    [remainingTime],
  );
  const seconds = useMemo(
    () => Math.floor((remainingTime / 1000) % 60),
    [remainingTime],
  );

  return (
    <View style={styles.container}>
      <Text style={textStyle}>{days}D </Text>
      <Text style={textStyle}>{hours}H </Text>
      <Text style={textStyle}>{minutes}M </Text>
      {/* <Text style={textStyle}>{seconds}S</Text> */}
    </View>
  );
};

export default CountdownTimer;
