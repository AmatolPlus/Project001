import React, {useCallback} from 'react';
import {ToastAndroid, View} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';

import {getFullName} from '@/utils/getFullName';
import {styles} from './Profile.styles';
import {ScreenNames} from '@/utils/screenName';
import {remove} from '@/utils/storage';

import {
  useGetCreditMutation,
  useWalletAmountQuery,
} from '@/services/apis/wallet.api';
import {useUserDetailsQuery} from '@/services/apis/login.api';

import {Button, Divider, Text} from '@/ui';
import Wallet from '@/components/Wallet';
import ProfileInfo from '@/components/ProfileInfo/ProfileInfo';
import AddressModal from '@/components/AddressModal/AddressModal';
import SocialMediaModal from '@/components/SocialMediaModal/SocialMediaModal';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import ChangePasswordModal from '@/components/ChangePasswordModal/ChangePasswordModal';
import {ScrollView} from 'react-native';
import {RefreshControl} from 'react-native';

export default function Profile() {
  const {data: user, refetch: userRefetch} = useUserDetailsQuery({});
  const [getCredits] = useGetCreditMutation({});
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

  const handleGetCredit = useCallback(async () => {
    try {
      let credit_data: any = await getCredits({});
      if (credit_data?.data?.detail) {
        return ToastAndroid.show(credit_data?.data?.detail, ToastAndroid.LONG);
      } else {
        return ToastAndroid.show(
          credit_data?.error?.data?.detail,
          ToastAndroid.LONG,
        );
      }
      // eslint-disable-next-line no-catch-shadow
    } catch (error) {
      console.log(error);
    }
  }, [getCredits]);

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
          <Text onPress={handleGetCredit} style={styles.link}>
            Get Credits
          </Text>
          <AddressModal />
          <SocialMediaModal />
          <ChangePasswordModal type="component" />
          <PrivacyPolicy />

          <Divider style={styles.divider} />
        </View>

        <Button style={styles.logout} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Button>
      </View>
    </ScrollView>
  );
}
