import {ToastAndroid, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Modal, TextInput, Button, Text} from '@/ui';
import {styles} from './ResetPassword.styles';
import {Portal} from 'react-native-paper';
import {
  useConfirmResetPasswordMutation,
  useResetPasswordMutation,
} from '@/services/apis/login.api';
import {Colors} from '@/utils/colors';

const ResetPassword = () => {
  const [resetValue, setResetValue] = useState({
    mobile_number: '',
    auth_token: '',
    otp: '',
    password1: '',
    password2: '',
  });
  const [visible, setVisible] = useState(false);
  const [reset, {error: resetError}]: any = useResetPasswordMutation({});
  const [confirm, {error: confirmError}]: any = useConfirmResetPasswordMutation(
    {},
  );

  const handleModal = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const handleChange = (key: string, value: string) => {
    setResetValue({
      ...resetValue,
      [key]: value,
    });
  };

  const handleReset = useCallback(async () => {
    let {data}: any = await reset({
      mobile_number: resetValue.mobile_number,
    });
    setResetValue({
      ...resetValue,
      auth_token: data?.auth_token,
    });
  }, [reset, resetValue]);

  const handleConfirmReset = useCallback(async () => {
    let data: any = await confirm({
      auth_token: resetValue.auth_token,
      otp: resetValue.otp,
      password1: resetValue.password1,
      password2: resetValue.password2,
    });
    if (!data?.error) {
      handleModal();
    }
    if (data) {
      ToastAndroid.show('Password Changed Successfully', ToastAndroid.LONG);
    }
  }, [confirm, handleModal, resetValue]);

  let isMobileNumberValid =
    resetValue.mobile_number.trim().length !== 10 ? false : true;

  let isFormValid =
    resetValue.otp.trim().length !== 0 &&
    resetValue.password1.trim().length !== 0 &&
    resetValue.password2.trim().length !== 0
      ? true
      : false;

  return (
    <View>
      <Text onPress={handleModal} style={styles.link}>
        Forgot Password ?
      </Text>
      <Portal>
        <Modal onDismiss={handleModal} style={styles.modal} visible={visible}>
          <View style={styles.container}>
            {resetValue.auth_token ? (
              <>
                <TextInput
                  mode="outlined"
                  outlineColor={Colors.info}
                  activeOutlineColor={Colors.info}
                  value={resetValue.otp}
                  onChangeText={val => handleChange('otp', val)}
                  style={styles.input}
                  keyboardType="number-pad"
                  maxLength={6}
                  label={'Enter the OTP'}
                />
                <TextInput
                  mode="outlined"
                  value={resetValue.password1}
                  onChangeText={val => handleChange('password1', val)}
                  style={styles.input}
                  outlineColor={Colors.info}
                  activeOutlineColor={Colors.info}
                  keyboardType="number-pad"
                  maxLength={10}
                  label={'New Password'}
                />
                <TextInput
                  mode="outlined"
                  value={resetValue.password2}
                  onChangeText={val => handleChange('password2', val)}
                  style={styles.input}
                  outlineColor={Colors.info}
                  activeOutlineColor={Colors.info}
                  keyboardType="number-pad"
                  maxLength={10}
                  label={'Confirm New Password'}
                />
                {confirmError && (
                  <Text style={styles.error}>
                    {confirmError?.data?.details}
                  </Text>
                )}

                <Button
                  style={[
                    styles.button,
                    {
                      backgroundColor: isFormValid ? Colors.info : Colors.grey,
                    },
                  ]}
                  onPress={handleConfirmReset}>
                  <Text style={styles.buttonText}>Reset</Text>
                </Button>
              </>
            ) : (
              <>
                <TextInput
                  onChangeText={val => handleChange('mobile_number', val)}
                  style={styles.input}
                  value={resetValue.mobile_number}
                  outlineColor={Colors.info}
                  activeOutlineColor={Colors.info}
                  keyboardType="number-pad"
                  maxLength={10}
                  label={'Enter Your Mobile Number'}
                />
                {resetError && (
                  <Text style={styles.error}>{resetError?.data?.details}</Text>
                )}
                <Button
                  style={[
                    styles.button,
                    {
                      backgroundColor: isMobileNumberValid
                        ? Colors.info
                        : Colors.grey,
                    },
                  ]}
                  onPress={handleReset}>
                  <Text style={styles.buttonText}>Next</Text>
                </Button>
              </>
            )}
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default ResetPassword;
