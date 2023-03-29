import {
  IValidateRequest,
  useValidateOtpMutation,
} from '@/services/apis/login.api';
import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import Text from '@/ui/Text';
import {styles} from './Verification.styles';
import {useDispatch} from 'react-redux';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
} from 'react-native-confirmation-code-field';
import {Button} from '@/ui';
import {saveUserInfo} from '@/services/login.slice';
import {setUserToken} from '@/utils/storage';

const CELL_COUNT = 6;

const VerificationScreen = () => {
  const route = useRoute();
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  let value = otpForm.otp;
  const {auth_token}: any = route.params;
  let dispatch = useDispatch();
  const [verify, {isLoading, error, data}] = useValidateOtpMutation();
  const [otpForm, setForm] = useState<IValidateRequest>({
    otp: undefined,
    auth_token,
  });

  const handleFormUpdate = (key: keyof OtpState, value: string) => {
    setForm(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleVerification = () => {
    console.log(otpForm);
    verify(otpForm)
      .then(_data => {
        dispatch(saveUserInfo(_data.data));
        let token = _data?.data?.token;
        setUserToken(token);
      })
      .catch(e => console.log(e));
  };

  if (error) {
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
