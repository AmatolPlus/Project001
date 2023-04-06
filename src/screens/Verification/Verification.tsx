import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
} from 'react-native-confirmation-code-field';

import {set} from '@/utils/storage';
import {Button} from '@/ui';
import {OtpState} from '../Login/LoginTypes';
import {
  IValidateRequest,
  useResendOtpMutation,
  useValidateOtpMutation,
} from '@/services/apis/login.api';
import {saveUserInfo} from '@/services/reducers/login.slice';
import {styles} from './Verification.styles';
import Text from '@/ui/Text';
import {ScreenNames} from '@/utils/screenName';
import Snackbar from '@/ui/SnackBar';
import {ResendOtp} from '@/ui/ResendOtp';

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
  const [verify, {isLoading, error}] = useValidateOtpMutation();
  const [resend] = useResendOtpMutation();
  const [OTPStatus, setOTPStatus] = useState('');

  useEffect(() => {
    if (error) {
      setSnackbar(true);
    }
  }, [error]);

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
        set('token', token);
        navigation.dispatch(StackActions.replace(ScreenNames.mainStack));
      }
    } catch (e) {}
  }, [dispatch, navigation, otpForm, verify]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Verfication Code</Text>
      <Text style={styles.info}>
        we have sent a verification code to your number
      </Text>
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
      <View style={styles.resendButtonContainer}>
        <Text style={styles.resendButton} onPress={() => navigation.goBack()}>
          Change Number ?
        </Text>
        <ResendOtp handleResend={handleResend} style={styles.resendButton} />
      </View>
      <Button
        disabled={!handleDisabled() || isLoading}
        loading={isLoading}
        onPress={handleVerification}
        style={styles.submitButton}>
        <Text style={styles.submitButtonText}>{'Confirm'}</Text>
      </Button>
      <Snackbar
        onDismiss={() => {
          setSnackbar(false);
        }}
        visible={showSnackbar}>
        {error?.data.details || OTPStatus}
      </Snackbar>
    </SafeAreaView>
  );
};

export default VerificationScreen;
