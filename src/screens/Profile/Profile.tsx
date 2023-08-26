import React, {useCallback, useEffect, useState} from 'react';
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
import {
  useUpdateUserDetailsMutation,
  useUserDetailsQuery,
} from '@/services/apis/login.api';

import {Button, Divider, Text} from '@/ui';
import Wallet from '@/components/Wallet';
import ProfileInfo from '@/components/ProfileInfo/ProfileInfo';
import AddressModal from '@/components/AddressModal/AddressModal';
import SocialMediaModal from '@/components/SocialMediaModal/SocialMediaModal';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import ChangePasswordModal from '@/components/ChangePasswordModal/ChangePasswordModal';
import {ScrollView} from 'react-native';
import {RefreshControl} from 'react-native';
import UserDetails from '@/components/UserDetail/UserDetails';
import PersnolInformation from '@/components/PersnolInformation/PersnolInformation';
import PrivateInformation from '@/components/PrivateInformation/PrivateInformation';
import {FormData} from '@/components/UserDetailsModal/UserDetailModal.types';

export default function Profile() {
  const {data: user, refetch: userRefetch} = useUserDetailsQuery({});
  const {data: wallet, isLoading, refetch} = useWalletAmountQuery({});
  const [form, setForm] = useState<FormData>({
    first_name: '',
    last_name: '',
    email: '',
    hobby: '',
    birthday: '',
    gender: '',
    mobile_number: '',
  });
  const [update, {error}]: any = useUpdateUserDetailsMutation();
  const navigation: any = useNavigation();

  const fullName = getFullName(user?.first_name, user?.last_name);

  const handleChange = (key: keyof FormData, value: string) => {
    setForm(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = useCallback(() => {
    try {
      update(form);
      refetch();
      if (error) {
        console.log(error);
      } else {
        ToastAndroid.show(
          'User Details Updated SuccessFully',
          ToastAndroid.LONG,
        );
      }
    } catch (e) {}
  }, [form, refetch, error, update]);

  useEffect(() => {
    setForm(user);
  }, [user]);

  console.log(form);

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
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={userRefetch} />
      }
      style={styles.container}>
      <View style={styles.card}>
        <View>
          <ProfileInfo refetch={userRefetch} data={user} fullName={fullName} />
          <PersnolInformation
            form={form}
            refetch={userRefetch}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
          <PrivateInformation
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
          <ChangePasswordModal type="component" />
          <Button style={styles.logout} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
