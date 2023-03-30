import React, {useCallback, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
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
  useValidateOtpMutation,
} from '@/services/apis/login.api';
import {saveUserInfo} from '@/services/reducers/login.slice';
import {styles} from './Verification.styles';
import Text from '@/ui/Text';
import {ScreenNames} from '@/utils/screenName';

const CELL_COUNT = 6;

const VerificationScreen = () => {
  const navigation: any = useNavigation();
  const route = useRoute();
  const {auth_token}: any = route.params;
  const [otpForm, setForm] = useState<IValidateRequest>({
    otp: undefined,
    auth_token,
  });
  const value = otpForm.otp;
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const dispatch = useDispatch();
  const [verify, {isLoading, isError}] = useValidateOtpMutation();

  const handleFormUpdate = (key: keyof OtpState, value: string) => {
    setForm(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleVerification = useCallback(async () => {
    try {
      let {data}: any = await verify(otpForm);
      dispatch(saveUserInfo(data));
      let token = data?.token;
      set('token', token);
      navigation.dispatch(StackActions.replace(ScreenNames.mainStack));
    } catch (error) {}
  }, [dispatch, navigation, otpForm, verify]);

  if (isError) {
    return <></>;
  }
  return (
    <SafeAreaView style={styles.Container}>
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
      <Button
        loading={isLoading}
        onPress={handleVerification}
        style={styles.submitButton}>
        <Text style={styles.submitButtonText}>{'Submit'}</Text>
      </Button>
    </SafeAreaView>
  );
};

export default VerificationScreen;
