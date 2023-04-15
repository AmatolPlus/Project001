import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
} from 'react-native-confirmation-code-field';

import {Button, Text} from '@/ui';
import {FormState, ILoginRequest} from './LoginWithPin.types';
import {useLoginWithPinMutation} from '@/services/apis/login.api';
import {ScreenNames} from '@/utils/screenName';
import {Colors} from '@/utils/colors';
import styles from './LoginWithPin.styles';
import {fontSize} from '@/utils/fonts';
import {saveUserInfo} from '@/services/reducers/login.slice';
import {useDispatch} from 'react-redux';
import {set} from '@/utils/storage';
import ResetPassword from '@/components/ResetPassword/ResetPassword';

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

  const handleFormUpdate = (key: keyof FormState, value: string) => {
    setForm((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleLogin = async () => {
    console.log(loginForm);
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
    navigation.navigate(ScreenNames.mainStack);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <AntDesign
        onPress={handleMainScreenNavigation}
        style={styles.close}
        name="closecircle"
        size={fontSize.h1}
        color={Colors.dark}
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
              ...styles.loginButtonText,
            }}>
            {'Login'}
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default LoginWithPin;
