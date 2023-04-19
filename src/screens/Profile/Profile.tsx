import React, {useCallback} from 'react';
import {View} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';

import {getFullName} from '@/utils/getFullName';
import {styles} from './Profile.styles';
import {ScreenNames} from '@/utils/screenName';
import {remove} from '@/utils/storage';

import {useWalletAmountQuery} from '@/services/apis/wallet.api';
import {useUserDetailsQuery} from '@/services/apis/login.api';

import {Button, Divider, Text} from '@/ui';

import Wallet from '@/components/Wallet';
import ProfileInfo from '@/components/ProfileInfo/ProfileInfo';
import AddressModal from '@/components/AddressModal/AddressModal';
import SocialMediaModal from '@/components/SocialMediaModal/SocialMediaModal';
import TransactionModal from '@/components/TransactionModal/TransactionModal';
import ChangePasswordModal from '@/components/ChangePasswordModal/ChangePasswordModal';

export default function Profile() {
  const {data: user} = useUserDetailsQuery({});
  const {data: wallet, isLoading, refetch} = useWalletAmountQuery({});
  const navigation: any = useNavigation();

  const fullName = getFullName(user?.first_name, user?.last_name);

  const handleLogout = useCallback(() => {
    remove('token');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: ScreenNames.loginStack}],
      }),
    );
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View>
          <ProfileInfo data={user} fullName={fullName} />
          <Divider style={styles.divider} />
          <Wallet
            wallet={wallet}
            onRefreshWallet={refetch}
            onWithdraw={() => {}}
            loading={isLoading}
          />
          <Divider style={styles.divider} />
          <AddressModal />
          <SocialMediaModal />
          <ChangePasswordModal type="component" />
          <TransactionModal />
          <Divider style={styles.divider} />
          <View>
            <Text style={styles.header}>About me</Text>
            <View style={styles.userBioContainer}>
              <Text>
                <Text style={styles.userBio}>Contact on: </Text>
                {user?.mobile_number}
              </Text>
              <Text>
                <Text style={styles.userBio}>Account type: </Text>
                {user?.category}
              </Text>
              <Text>
                <Text style={styles.userBio}>Hobbies: </Text>
                {user?.hobby}
              </Text>
              <Text>
                <Text style={styles.userBio}>Gender: </Text>
                {user?.gender}
              </Text>
            </View>
          </View>
        </View>
        <Button style={styles.logout} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Button>
      </View>
    </View>
  );
}
