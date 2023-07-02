import React, {memo} from 'react';
import {View} from 'react-native';

import {Text} from '@/ui';
import {styles} from './JoinTag.style';
import {IJoinTag} from './JoinTag.types';
import {Colors} from '@/utils/colors';

const JoinTag = ({isLive}: IJoinTag) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: !isLive ? '30%' : '40%',
          backgroundColor: !isLive ? Colors.success : Colors.info,
        },
      ]}>
      {!isLive ? (
        <Text style={styles.status}>Live</Text>
      ) : (
        <Text style={styles.status}>Completed</Text>
      )}
    </View>
  );
};

export default memo(JoinTag);
