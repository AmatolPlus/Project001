import React, {useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Button, TextInput, Text} from '@/ui';
import {FormState} from './LoginTypes';
import {appConfig} from '@/utils/appConfig';
import {ILoginRequest, useLoginMutation} from '@/services/apis/login.api';
import {ScreenNames} from '@/utils/screenName';
import {Colors} from '@/utils/colors';
import styles from './Login.styles';

const LoginScreen = () => {
  const navigation: any = useNavigation();
  const [login, {isLoading, isError}] = useLoginMutation();

  const [loginForm, setForm] = useState<ILoginRequest>({
    username: undefined,
    mobile_number: undefined,
    country_code: undefined,
    referral_code: undefined,
  });

  const handleFormUpdate = (key: keyof FormState, value: string) => {
    setForm(prevState => ({
      ...prevState,
      [key]: value,
      country_code: '+91',
      referral_code: '',
    }));
  };

  const handleLogin = async () => {
    try {
      const {data}: any = await login(loginForm);
      const {auth_token} = data;
      navigation.navigate(ScreenNames.verifcation, {
        auth_token,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isError) return <></>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{appConfig.name}</Text>
      <TextInput
        onChangeText={val => handleFormUpdate('username', val)}
        style={styles.input}
        label={'Name'}
      />
      <TextInput
        onChangeText={val => handleFormUpdate('mobile_number', val)}
        style={styles.input}
        label={'Phone Number'}
      />
      <Button
        loading={isLoading}
        buttonColor={Colors.success}
        onPress={handleLogin}
        disabled={isLoading}
        style={styles.loginButton}>
        <Text style={styles.loginButtonText}>{'Sign In'}</Text>
      </Button>
    </View>
  );
};

export default LoginScreen;
