import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Button, TextInput, Text} from '@/ui';
import {FormState} from './LoginTypes';
import {appConfig} from '@/utils/appConfig';
import {ILoginRequest, useLoginMutation} from '@/services/apis/login.api';
import {ScreenNames} from '@/utils/screenName';
import {Colors} from '@/utils/colors';
import styles from './Login.styles';
import {fontSize} from '@/utils/fonts';
import ResetPassword from '@/components/ResetPassword/ResetPassword';

const LoginScreen = () => {
  const [loginForm, setForm] = useState<ILoginRequest>({
    username: undefined,
    mobile_number: undefined,
    country_code: undefined,
    referral_code: undefined,
  });
  const navigation: any = useNavigation();
  const [login, {isLoading, error, isError}] = useLoginMutation();

  function isValid() {
    const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
    const nameRegex = /^[a-zA-Z]{3,}$/;
    let status =
      phoneRegex.test(`${loginForm?.mobile_number}`) &&
      nameRegex.test(`${loginForm?.username}`);
    return status;
  }

  const handleFormUpdate = (key: keyof FormState, value: string) => {
    setForm((prevState: any) => ({
      ...prevState,
      [key]: value,
      country_code: '+91',
      referral_code: '',
    }));
  };

  const handleLogin = async () => {
    try {
      const {data}: any = await login(loginForm);
      if (data) {
        const {auth_token} = data;
        navigation.navigate(ScreenNames.verifcation, {
          auth_token,
        });
      }
    } catch (e) {}
  };

  const handleNavigation = useCallback(() => {
    navigation.navigate(ScreenNames.mainStack);
  }, [navigation]);

  if (isError) {
    return (
      <>
        <Text>{JSON.stringify(error)}</Text>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <AntDesign
        onPress={() => handleNavigation()}
        style={styles.close}
        name="closecircle"
        size={fontSize.h1}
        color={Colors.dark}
      />
      <Text style={styles.title}>{appConfig.name}</Text>
      <TextInput
        mode="outlined"
        outlineColor={Colors.grey}
        selectionColor={Colors.dark}
        activeOutlineColor={Colors.dark}
        onChangeText={val => handleFormUpdate('username', val)}
        style={styles.input}
        label={'Name'}
      />
      <TextInput
        mode="outlined"
        outlineColor={Colors.grey}
        activeOutlineColor={Colors.dark}
        onChangeText={val => handleFormUpdate('mobile_number', val)}
        style={styles.input}
        label={'Phone Number'}
        keyboardType={'phone-pad'}
      />
      <View>
        <View style={styles.loginButtonContainer}>
          <ResetPassword />
          <Button
            loading={isLoading}
            onPress={handleLogin}
            buttonColor={Colors.success}
            disabled={!isValid()}
            style={[
              styles.loginButton,
              {backgroundColor: isValid() ? Colors.success : Colors.dark},
            ]}>
            <Text
              style={{
                color: isValid() ? Colors.dark : Colors.white,
                ...styles.loginButtonText,
              }}>
              {'Sign In'}
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
