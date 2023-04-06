import React from 'react';
import {Text} from '@/ui';
import {Withdraw} from '@/ui/Withdraw';
import {View} from 'react-native';
import {styles} from './Wallet.styles';
import {Colors} from '@/utils/colors';

interface IWallet {
  wallet: any;
  onRefreshWallet: () => void;
}

const Wallet = ({wallet, onRefreshWallet}: IWallet) => (
  <View style={styles.walletContainer}>
    <Text style={styles.walletHeader}>Wallet Balance</Text>
    <Text style={styles.walletAmount}>
      ₹ {wallet?.earned_amount === null ? '0' : wallet?.earned_amount}
    </Text>
    <View style={styles.withdrawButtonContainer}>
      <Withdraw
        currentAmount={0}
        threshold={0}
        onWithdraw={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Text onPress={onRefreshWallet} style={{color: Colors.info}}>
        Refresh Balance
      </Text>
    </View>
  </View>
);
export default Wallet;
