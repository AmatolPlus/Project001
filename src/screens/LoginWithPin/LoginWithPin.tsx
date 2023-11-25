import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
} from 'react-native-confirmation-code-field';

import ResetPassword from '@/components/ResetPassword/ResetPassword';

import {Button, Text} from '@/ui';
import {useLoginWithPinMutation} from '@/services/apis/login.api';

import {ScreenNames} from '@/utils/screenName';
import {Colors} from '@/utils/colors';
import {fontSize} from '@/utils/fonts';
import {saveUserInfo} from '@/services/reducers/login.slice';
import {set} from '@/utils/storage';

import styles from './LoginWithPin.styles';
import {FormState, ILoginRequest} from './LoginWithPin.types';

const CELL_COUNT = 6;

const LoginWithPin = () => {
  const [loginForm, setForm] = useState<ILoginRequest>({
    mobile_number: undefined,
    password: undefined,
  });
  const value = loginForm.password;
  const navigation: any = useNavigation();
  const {params}: any = useRoute();
  const [login, {isLoading, error}]: any = useLoginWithPinMutation();
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  let dispatch = useDispatch();

  function isValid() {
    let status = loginForm?.password?.length >= 6;
    return status;
  }

  const handleFormUpdate = (key: keyof FormState, string: string) => {
    setForm((prevState: any) => ({
      ...prevState,
      [key]: string,
    }));
  };

  const handleLogin = async () => {
    try {
      const {data}: any = await login({
        ...loginForm,
        mobile_number: params?.mobile_number,
      });
      if (data) {
        let {token} = data;
        dispatch(saveUserInfo(data));
        set('token', token);
        navigation.replace(ScreenNames.mainStack);
      }
    } catch (e) {}
  };

  const handleMainScreenNavigation = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <AntDesign
        onPress={handleMainScreenNavigation}
        style={styles.close}
        name="closecircle"
        size={fontSize.h1}
        color={Colors.info}
      />
      <Text style={styles.title}>Login Your PIN</Text>
      <Text style={styles.info}>
        Please enter your unique PIN in the designated field below to access
        your account
      </Text>
      <CodeField
        ref={ref}
        value={loginForm.password}
        onChangeText={val => handleFormUpdate('password', val)}
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
      {error && <Text style={styles.error}>{error?.data?.details}</Text>}
      <View style={styles.loginButtonContainer}>
        <View style={styles.resetPasswordContainer}>
          <ResetPassword />
        </View>
        <Button
          className="shadow-lg shadow-danger"
          loading={isLoading}
          onPress={handleLogin}
          buttonColor={Colors.success}
          disabled={!isValid()}
          style={[
            styles.loginButton,
            {backgroundColor: isValid() ? Colors.danger : Colors.dark},
          ]}>
          <Text
            style={{
              ...styles.loginButtonText,
            }}>
            {'Continue'}
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default LoginWithPin;
