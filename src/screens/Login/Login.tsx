import React, {useCallback, useState} from 'react';
import {View, Alert, BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Button, TextInput, Text, Image} from '@/ui';
import {FormState} from './LoginTypes';
import {ILoginRequest, useLoginMutation} from '@/services/apis/login.api';
import {ScreenNames} from '@/utils/screenName';
import {Colors} from '@/utils/colors';
import styles from './Login.styles';
import {fontSize} from '@/utils/fonts';
import {useBackHandler} from '@/hooks/useBackHandler';

const LoginScreen = () => {
  const [loginForm, setForm] = useState<ILoginRequest>({
    mobile_number: undefined,
    country_code: undefined,
    referral_code: undefined,
  });
  const navigation: any = useNavigation();
  const [login, {isLoading, error, isError}] = useLoginMutation();
  function isValid() {
    const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
    let status = phoneRegex.test(`${loginForm?.mobile_number}`);
    return status;
  }

  useBackHandler();

  const handleFormUpdate = (key: keyof FormState, value: string) => {
    setForm((prevState: any) => ({
      ...prevState,
      [key]: value,
      country_code: '+91',
      referral_code: '',
    }));
  };

  const handleLoginWithPinNavigation = useCallback(() => {
    navigation.navigate(ScreenNames.loginWithPin, {
      mobile_number: loginForm.mobile_number,
    });
  }, [loginForm.mobile_number, navigation]);

  const handleLogin = useCallback(async () => {
    try {
      const {data}: any = await login(loginForm);
      if (data) {
        const {auth_token, pin_required} = await data;
        if (!pin_required) {
          navigation.navigate(ScreenNames.verifcation, {
            auth_token,
          });
        } else {
          handleLoginWithPinNavigation();
        }
      }
    } catch (e) {}
  }, [handleLoginWithPinNavigation, login, loginForm, navigation]);

  const handleMainScreenNavigation = useCallback(() => {
    Alert.alert(
      'Confirm Exit',
      'Are you sure you want to close the app?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Exit',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ],
      {cancelable: false},
    );
  }, []);

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
        onPress={handleMainScreenNavigation}
        style={styles.close}
        name="closecircle"
        size={fontSize.h1}
        color={Colors.dark}
      />
      <View>
        <Image
          style={{width: 200, height: 60}}
          resizeMode="contain"
          source={require('@/assets/images/highfive_launch.jpeg')}
        />
        <View style={styles.inputContainer}>
          <TextInput
            maxLength={10}
            mode="outlined"
            outlineColor={Colors.grey}
            activeOutlineColor={Colors.dark}
            onChangeText={val => handleFormUpdate('mobile_number', val)}
            style={styles.input}
            label={'Phone Number'}
            keyboardType={'phone-pad'}
          />
        </View>
      </View>
      <View>
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
              color: isValid() ? Colors.white : Colors.white,
              ...styles.loginButtonText,
            }}>
            {'Login'}
          </Text>
        </Button>
      </View>
      <Text style={styles.footer}>Facing Any Issue? Contact us</Text>
    </View>
  );
};

export default LoginScreen;
