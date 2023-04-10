import React, {memo} from 'react';
import {Text} from '@/ui';
import {Withdraw} from '@/ui/Withdraw';
import {View} from 'react-native';
import {styles} from './Wallet.styles';
import {Colors} from '@/utils/colors';
import {IWallet} from './Wallet.types';

const Wallet = ({wallet, onWithdraw, onRefreshWallet}: IWallet) => (
  <View style={styles.walletContainer}>
    <Text style={styles.walletHeader}>Wallet Balance</Text>
    <Text style={styles.walletAmount}>
      ₹ {wallet?.earned_amount === null ? '0' : wallet?.earned_amount}
    </Text>
    <View style={styles.withdrawButtonContainer}>
      <Withdraw currentAmount={0} threshold={0} onWithdraw={onWithdraw} />
      <Text onPress={onRefreshWallet} style={{color: Colors.info}}>
        Refresh Balance
      </Text>
    </View>
  </View>
);
export default memo(Wallet);
