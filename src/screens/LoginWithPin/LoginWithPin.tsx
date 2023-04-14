import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Button, TextInput, Text} from '@/ui';
import {FormState, ILoginRequest} from './LoginWithPin.types';
import {appConfig} from '@/utils/appConfig';
import {useLoginWithPinMutation} from '@/services/apis/login.api';
import {ScreenNames} from '@/utils/screenName';
import {Colors} from '@/utils/colors';
import styles from './LoginWithPin.styles';
import {fontSize} from '@/utils/fonts';
import {saveUserInfo} from '@/services/reducers/login.slice';
import {useDispatch} from 'react-redux';
import {set} from '@/utils/storage';
import ResetPassword from '@/components/ResetPassword/ResetPassword';

const LoginWithPin = () => {
  const [loginForm, setForm] = useState<ILoginRequest>({
    mobile_number: undefined,
    password: undefined,
  });
  const navigation: any = useNavigation();
  const [login, {isLoading, error}]: any = useLoginWithPinMutation();
  let dispatch = useDispatch();

  function isValid() {
    const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;

    let status =
      phoneRegex.test(`${loginForm?.mobile_number}`) &&
      loginForm?.password?.length >= 6;
    return status;
  }

  const handleFormUpdate = (key: keyof FormState, value: string) => {
    setForm((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const {data}: any = await login(loginForm);
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
      <View>
        <Text style={styles.title}>{appConfig.name}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            outlineColor={Colors.grey}
            selectionColor={Colors.dark}
            activeOutlineColor={Colors.dark}
            onChangeText={val => handleFormUpdate('mobile_number', val)}
            style={styles.input}
            label={'Mobile Number'}
          />
          <TextInput
            mode="outlined"
            outlineColor={Colors.grey}
            activeOutlineColor={Colors.dark}
            onChangeText={val => handleFormUpdate('password', val)}
            style={styles.input}
            label={'Password'}
            keyboardType={'phone-pad'}
          />
        </View>
      </View>
      {error && <Text style={styles.error}>{error?.data?.details}</Text>}
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
              color: isValid() ? Colors.dark : Colors.white,
              ...styles.loginButtonText,
            }}>
            {'Login'}
          </Text>
        </Button>
        <View style={styles.resetPasswordContainer}>
          <ResetPassword />
        </View>
      </View>
    </View>
  );
};

export default LoginWithPin;
