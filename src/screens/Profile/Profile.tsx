import {Text} from '@/ui';
import {Withdraw} from '@/ui/Withdraw';

import React from 'react';
import {View} from 'react-native';
import {styles} from './Profile.styles';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile screen</Text>
      <Withdraw onWithdraw={() => {}} currentAmount={98} threshold={99} />
    </View>
  );
}
