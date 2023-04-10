import React, {memo} from 'react';
import {View} from 'react-native';
import {Text} from '@/ui';
import {styles} from './JoinTag.style';
import {IJoinTag} from './JoinTag.types';

const JoinTag = ({isLive}: IJoinTag) => {
  if (!isLive) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.status}>Live</Text>
    </View>
  );
};

export default memo(JoinTag);
