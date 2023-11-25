import React, {useCallback, useEffect, useState} from 'react';
import {
  Linking,
  ScrollView,
  RefreshControl,
  ToastAndroid,
  View,
} from 'react-native';
import {useNavigation, CommonActions} from '@react-navigation/native';

import PersnolInformation from '@/components/PersnolInformation/PersnolInformation';
import PrivateInformation from '@/components/PrivateInformation/PrivateInformation';
import ProfileInfo from '@/components/ProfileInfo/ProfileInfo';
import ChangePasswordModal from '@/components/ChangePasswordModal/ChangePasswordModal';

import {getFullName} from '@/utils/getFullName';
import {styles} from './Profile.styles';
import {ScreenNames} from '@/utils/screenName';
import {remove} from '@/utils/storage';

import {
  useUpdateUserDetailsMutation,
  useUserDetailsQuery,
} from '@/services/apis/login.api';

import {Button, Text} from '@/ui';
import {FormData} from '@/components/UserDetailsModal/UserDetailModal.types';
import ErrorPage from '@/components/ErrorPage/ErrorPage';

export default function Profile() {
  const {
    data: user,
    refetch,
    error: userError,
    isError,
    isLoading,
  } = useUserDetailsQuery({});
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

  const handleOpenPrivacyPolicy = useCallback(() => {
    Linking.openURL('https://site.highfive.one/policy');
  }, []);

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

  const handleLogout = useCallback(() => {
    remove('token');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: ScreenNames.loginStack}],
      }),
    );
  }, [navigation]);

  if (isError) {
    return <ErrorPage onReload={refetch} error={error} />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      style={styles.container}>
      <View style={styles.card}>
        <View>
          <ProfileInfo refetch={refetch} data={user} fullName={fullName} />
          <PersnolInformation
            form={form}
            refetch={refetch}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
          <PrivateInformation
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
          <Text style={styles.link} onPress={handleOpenPrivacyPolicy}>
            Privacy Policy
          </Text>
          <ChangePasswordModal type="component" />

          <Button style={styles.logout} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
