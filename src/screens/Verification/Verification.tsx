import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
} from 'react-native-confirmation-code-field';
import ChangePasswordModal from '@/components/ChangePasswordModal/ChangePasswordModal';

import {Button, Snackbar, Image} from '@/ui';
import {set} from '@/utils/storage';
import {
  IValidateRequest,
  useResendOtpMutation,
  useValidateOtpMutation,
} from '@/services/apis/login.api';
import {saveUserInfo} from '@/services/reducers/login.slice';
import {ScreenNames} from '@/utils/screenName';

import {OtpState} from '../Login/LoginTypes';
import {styles} from './Verification.styles';

const CELL_COUNT = 6;

const VerificationScreen = () => {
  const navigation: any = useNavigation();
  const route = useRoute();
  const {auth_token}: any = route.params;
  const [otpForm, setForm] = useState<IValidateRequest>({
    otp: undefined,
    auth_token,
  });
  const [showSnackbar, setSnackbar] = useState(false);
  const value = otpForm.otp;
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const dispatch = useDispatch();
  const [verify, {error}]: any = useValidateOtpMutation();
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [resend] = useResendOtpMutation();
  const [OTPStatus, setOTPStatus] = useState('');

  useEffect(() => {
    if (error) {
      setSnackbar(true);
    }
  }, [error]);

  const handleToggleChangePasswordModal = useCallback(() => {
    setShowChangePasswordModal(!showChangePasswordModal);
  }, [showChangePasswordModal]);

  const handleFormUpdate = (key: keyof OtpState, formValue: string) => {
    setForm(prevState => ({
      ...prevState,
      [key]: formValue,
    }));
  };

  const handleResend = useCallback(async () => {
    try {
      let {data}: any = await resend({
        auth_token,
      });

      setOTPStatus(data?.detail);
      setSnackbar(true);
    } catch (e) {}
  }, [auth_token, resend]);

  function handleDisabled() {
    let otpRegx = /^\d{0,6}$/;
    return otpRegx.test(`${otpForm.otp}`);
  }

  const handleVerification = useCallback(async () => {
    try {
      let {data}: any = await verify(otpForm);
      if (data) {
        let token = data?.token;
        dispatch(saveUserInfo(data));
        await set('token', token);
        if (!data?.password_configured) {
          handleToggleChangePasswordModal();
        } else {
          navigation.replace(ScreenNames.mainStack);
        }
      }
    } catch (e) {}
  }, [dispatch, handleToggleChangePasswordModal, navigation, otpForm, verify]);

  return (
    <SafeAreaView className="flex flex-1 px-8 w-full justify-center bg-primary">
      <View className="">
        <Text className="text-center color-info text-3xl mb-8  font-sans-bold">
          HIGHFIVE
        </Text>
      </View>
      <Image
        className="h-48"
        source={require('@/assets/images/verification.jpeg')}
        resizeMode="contain"
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
      <View className="mt-8">
        <CodeField
          ref={ref}
          value={otpForm.otp}
          onChangeText={val => handleFormUpdate('otp', val)}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}>
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />

        <Text className="color-info font-sans-bold text-center mt-4">
          Dont't recive the OTP ?{'  '}
          <Text className="color-danger" onPress={handleResend}>
            RESEND OTP
          </Text>
        </Text>
        <Button
          onPress={handleVerification}
          className={
            handleDisabled()
              ? 'bg-danger rounded-md p-2 mt-5'
              : 'rounded-md p-2 mt-5 bg-zinc-600'
          }>
          <Text className="color-white font-sans-bold">VERIFY AND PROCEED</Text>
        </Button>
      </View>

      <ChangePasswordModal
        type={'modal'}
        isOpen={showChangePasswordModal}
        navigation={navigation}
      />
      <Snackbar
        onDismiss={() => {
          setSnackbar(false);
        }}
        className="w-full absolute bottom-2 left-6"
        visible={showSnackbar}>
        {error?.data.details || OTPStatus}
      </Snackbar>
    </SafeAreaView>
  );
};

export default VerificationScreen;
