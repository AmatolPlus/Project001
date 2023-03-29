import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, TextInput, Text} from '@/ui';
import styles from './Login.styles';
import {FormState} from './LoginTypes';
import {appConfig} from '@/utils/appConfig';
import {ILoginRequest, useLoginMutation} from '@/services/apis/login.api';
import {ScreenNames} from '@/utils/screenName';
import {useColors} from '@/hooks/rn-paper.hook';
import {Colors} from '@/utils/colors';

const LoginScreen = ({navigation}) => {
  const colors = useColors();
  const [disabled, setDisabled] = useState(false);
  const [loginForm, setForm] = useState<ILoginRequest>({
    username: undefined,
    mobile_number: undefined,
    country_code: undefined,
    referral_code: undefined,
  });
  const [login, {isLoading, error}] = useLoginMutation();

  const handleFormUpdate = (key: keyof FormState, value: string) => {
    setForm(prevState => ({
      ...prevState,
      [key]: value,
      country_code: '+91',
      referral_code: '',
    }));
  };

  const handleLogin = async () => {
    const {data}: any = await login(loginForm);
    const {auth_token} = data;
    console.log(auth_token);
    navigation.navigate(ScreenNames.verifcation, {auth_token});
  };

  if (error) return <></>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{appConfig.name}</Text>
      <TextInput
        onChangeText={val => handleFormUpdate('username', val)}
        style={styles.nameInput}
        label={'Name'}
      />
      <TextInput
        onChangeText={val => handleFormUpdate('mobile_number', val)}
        style={styles.nameInput}
        label={'Phone Number'}
      />
      <Button
        loading={isLoading}
        buttonColor={Colors.success}
        onPress={handleLogin}
        disabled={
          loginForm.mobile_number?.toString().length >= 10 &&
          loginForm.username?.toString().length >= 3
            ? false
            : true
        }
        style={styles.loginButton}>
        <Text>{'Next'}</Text>
      </Button>
    </View>
  );
};

export default LoginScreen;
