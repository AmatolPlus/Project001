import {View, Text, TextInput} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Button, Image} from '@/ui';
import {useNavigation} from '@react-navigation/native';
import {useBackHandler} from '@/hooks/useBackHandler';
import {useLoginMutation} from '@/services/apis/login.api';
import {ScreenNames} from '@/utils/screenName';
import {ILoginRequest, FormState} from '../Login/LoginTypes';
import {Colors} from '@/utils/colors';

export default function SignIn() {
  const [loginForm, setForm] = useState<ILoginRequest>({
    mobile_number: undefined,
    country_code: undefined,
    referral_code: undefined,
  });
  const navigation = useNavigation();
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

  return (
    <View className="flex flex-1 px-8 w-full justify-center bg-primary">
      <View className="">
        <Text className="text-center color-info text-3xl mb-8 font-sans-bold">
          HIGHFIVE
        </Text>
      </View>
      <Image
        resizeMode="contain"
        className="h-48"
        source={require('@/assets/images/login.jpeg')}
      />
      <View className="flex-col mt-12">
        <Text className="font-sans-bold color-info text-center text-xl">
          OTP Verification
        </Text>
        <Text className="color-info font-sans text-center text-8xs mt-2">
          We will send you an{' '}
          <Text className="font-sans-bold color-info">One Time Password</Text>{' '}
          on this mobile number
        </Text>
      </View>
      <View className="mt-12">
        <Text className="text-center font-sans-bold color-info text-xl">
          {' '}
          Enter Your Number
        </Text>
        <TextInput
          onChangeText={val => handleFormUpdate('mobile_number', val)}
          keyboardType="number-pad"
          maxLength={10}
          placeholder="+91  00000 00000"
          className="mt-4 text-center font-sans-bold text-xl bg-primary color-info border-b-secondary p-1 border-b-2"
        />
        <Text className="color-danger font-sans-bold text-8xs text-center mt-8">
          Facing Any Issue? Contact Us
        </Text>
        {error && (
          <Text className="color-danger font-sans-bold text-8xs text-center mt-8">
            {error}
          </Text>
        )}

        <Button
          loading={isLoading}
          onPress={handleLogin}
          disabled={!isValid()}
          buttonColor={Colors.danger}
          className={
            isValid() || !error
              ? 'bg-danger rounded-md p-2 mt-5'
              : 'rounded-md p-2 mt-5 bg-zinc-600'
          }>
          <Text className="color-white font-sans-bold">GET OTP</Text>
        </Button>
      </View>
    </View>
  );
}
