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
import Share from 'react-native-share';
import Wallet from '@/components/Wallet';
import ProfileInfo from '@/components/ProfileInfo/ProfileInfo';
import AddressModal from '@/components/AddressModal/AddressModal';
import SocialMediaModal from '@/components/SocialMediaModal/SocialMediaModal';
import ChangePasswordModal from '@/components/ChangePasswordModal/ChangePasswordModal';
import {ScrollView} from 'react-native';
import {RefreshControl} from 'react-native';
import {Colors} from '@/utils/colors';
import {fontSize} from '@/utils/fonts';

export default function Profile() {
  const {data: user, refetch: userRefetch} = useUserDetailsQuery({});
  const {data: wallet, isLoading, refetch} = useWalletAmountQuery({});
  const navigation: any = useNavigation();

  console.log(user);

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

  const handleShareOpen = useCallback(() => {
    Share.open({
      message: 'Invite A Friend',
      url: 'www.google.com',
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  }, []);

  console.log(JSON.stringify(user));

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={userRefetch} />
      }
      style={styles.container}>
      <View style={styles.card}>
        <View>
          <ProfileInfo refetch={userRefetch} data={user} fullName={fullName} />
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
          <Text
            onPress={handleShareOpen}
            style={{
              color: Colors.info,
              fontSize: fontSize.h5,
            }}>
            Invite a Friend
          </Text>
          <Divider style={styles.divider} />
        </View>

        <Button style={styles.logout} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Button>
      </View>
    </ScrollView>
  );
}
