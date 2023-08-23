import {View, Text} from 'react-native';
import React from 'react';

import {styles} from './RankTag.styles';
import {IRankTag} from './RankTag.types';

export default function RankTag({rank}: IRankTag) {
  return (
    <View style={styles.container}>
      <Text style={styles.status}>#{rank}</Text>
    </View>
  );
}
