import React, {useEffect, useState} from 'react';
import {canJoinEvent} from '@/utils/event';
import {View} from 'react-native';
import {Text} from '@/ui';
import {styles} from './JoinTag.style';

interface IJoinTag {
  days: number;
  occupancy: number;
  thresholdOccupancy: number;
}

const JoinTag = ({days, occupancy, thresholdOccupancy}: IJoinTag) => {
  const [live, setLive] = useState(true);

  useEffect(() => {
    setLive(canJoinEvent(days, occupancy, thresholdOccupancy));
  }, [days, occupancy, thresholdOccupancy]);

  return live ? (
    <View style={styles.container}>
      <Text style={styles.status}>Live</Text>
    </View>
  ) : (
    <></>
  );
};

export default JoinTag;
