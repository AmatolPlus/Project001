import React, {memo} from 'react';
import {View} from 'react-native';
import {Text} from '@/ui';
import {styles} from './MaxParticipantsTag.styles';
import {IMaxParticipants} from './MaxParticipants.types';

const MaxParticipantsTag = ({total, joined}: IMaxParticipants) => {
  return (
    <View style={styles.container}>
      <Text style={styles.status}>{total - joined} SPOTS OPEN</Text>
    </View>
  );
};

export default memo(MaxParticipantsTag);
