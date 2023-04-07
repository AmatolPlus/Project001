import React, {memo} from 'react';
import {View} from 'react-native';
import {Text} from '@/ui';
import {styles} from './MaxParticipantsTag.styles';

interface IJoinTag {
  total: number;
  joined: number;
}

const MaxParticipantsTag = ({total, joined}: IJoinTag) => {
  return (
    <View style={styles.container}>
      <Text style={styles.status}>{total - joined} SPOTS OPEN</Text>
    </View>
  );
};

export default memo(MaxParticipantsTag);
