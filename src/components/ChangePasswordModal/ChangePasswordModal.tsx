import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  Pressable,
  ToastAndroid,
  View,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import {Portal} from 'react-native-paper';
import {Button, TextInput, Modal, Image} from '@/ui';
import {styles} from './ChangePasswordModal.styles';
import {validatePassword} from '@/utils/validatePassword';
import {Colors} from '@/utils/colors';
import {
  useUpdatePasswordMutation,
  useUpdateUserDetailsMutation,
} from '@/services/apis/login.api';
import {IChangePassword} from './ChangePasswordModal.types';
import {ScreenNames} from '@/utils/screenName';
import {ScrollView} from 'react-native';

const ChangePasswordModal = ({isOpen, type, navigation}: IChangePassword) => {
  const [password, setPassword] = useState({
    first_name: '',
    last_name: '',
    old_password: '',
    password1: '',
    password2: '',
    profile_id: '',
  });
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const isValid = validatePassword({
    ...password,
    type,
  });
  const [update, {error}]: any = useUpdatePasswordMutation({});
  const [updateUser, {error: userNameError}]: any =
    useUpdateUserDetailsMutation({});

  const handleToggleChangePasswordModal = useCallback(() => {
    if (type === 'component') {
      setShowPasswordModal(!showPasswordModal);
    } else {
      ToastAndroid.show(
        'Enter the New Password before You Proceed',
        ToastAndroid.LONG,
      );
    }
  }, [showPasswordModal, type]);

  const handleUpdateUserName = useCallback(async () => {
    console.log(password.profile_id);
    try {
      await updateUser({
        first_name: password.first_name,
        last_name: password.last_name,
        profile_id: password.profile_id,
      });
    } catch (e: any) {
      console.log(e);
    }
  }, [
    password.first_name,
    password.last_name,
    password.profile_id,
    updateUser,
  ]);

  const handlePasswordChange = useCallback(
    (key: string, value: string) => {
      setPassword({
        ...password,
        [key]: value,
      });
    },
    [password],
  );

  useEffect(() => {
    if (isOpen) {
      setShowPasswordModal(isOpen);
    }
  }, [isOpen]);

  useEffect(() => {
    setValid(isValid.valid);
  }, [isValid]);

  const handleSubmit = useCallback(async () => {
    if (valid && !userNameError) {
      setValid(false);
      try {
        if (type === 'modal') {
          await handleUpdateUserName();
        }
        let data = await update(password);

        if (userNameError?.data?.details || data?.error) {
          return ToastAndroid.show(
            userNameError?.data?.details || `${data?.error?.data?.details}`,
            ToastAndroid.LONG,
          );
        } else {
          handleToggleChangePasswordModal(),
            navigation.replace(ScreenNames.mainStack);
          type === 'component' && handleToggleChangePasswordModal();
          ToastAndroid.show('Password Updated Successfully', ToastAndroid.LONG);
        }
      } catch (e) {}
      setLoading(!loading);
    }
  }, [
    valid,
    loading,
    type,
    update,
    password,
    userNameError,
    handleUpdateUserName,
    navigation,
    handleToggleChangePasswordModal,
  ]);

  if (error) {
    return <></>;
  }

  return (
    <View>
      {type === 'component' && (
        <Pressable onPress={handleToggleChangePasswordModal}>
          <Text style={styles.link}>Change PIN</Text>
        </Pressable>
      )}
      <Portal>
        <Modal
          className="h-full "
          visible={showPasswordModal}
          onDismiss={handleToggleChangePasswordModal}>
          <ScrollView className={'h-full bg-primary '}>
            <KeyboardAvoidingView
              behavior="padding"
              className="bg-primary h-full px-4 ">
              <Text className="text-3xl mb-2 color-info font-sans-bold text-center mt-4">
                HIGHFIVE
              </Text>

              <Image
                source={require('@/assets/images/login.jpeg')}
                className="h-48"
              />
              <View className="bg-white p-6 rounded-xl shadow-info shadow-xl mt-4">
                <Text className="color-info text-xl text-center mb-2 font-sans-bold ">
                  {type === 'component'
                    ? 'Change Password'
                    : 'COMPLETE PROFILE'}{' '}
                </Text>
                <View>
                  {type === 'component' && (
                    <TextInput
                      mode="outlined"
                      activeOutlineColor={Colors.info}
                      maxLength={6}
                      keyboardType={'number-pad'}
                      onChangeText={val =>
                        handlePasswordChange('old_password', val)
                      }
                      placeholder="Old PIN"
                    />
                  )}
                  {type !== 'component' && (
                    <>
                      <TextInput
                        mode="outlined"
                        activeOutlineColor={Colors.info}
                        onChangeText={val => {
                          handlePasswordChange('profile_id', val);
                          handleUpdateUserName();
                        }}
                        className="bg-whitecolor-info"
                        onBlur={handleUpdateUserName}
                        placeholder="User Name"
                      />
                      <Text
                        className={
                          userNameError
                            ? ' color-danger mt-2 mb-2'
                            : ' color-info mt-2 mb-2'
                        }>
                        {!userNameError
                          ? 'username should consist atleast one capital letter and @'
                          : userNameError?.data?.details}
                      </Text>
                      <TextInput
                        activeOutlineColor={Colors.info}
                        mode="outlined"
                        onChangeText={val =>
                          handlePasswordChange('first_name', val)
                        }
                        className="bg-white mb-4 color-info"
                        placeholder="First Name"
                      />
                      <TextInput
                        activeOutlineColor={Colors.info}
                        mode="outlined"
                        onChangeText={val =>
                          handlePasswordChange('last_name', val)
                        }
                        className="bg-white mb-4 color-info"
                        placeholder="Last Name"
                      />
                    </>
                  )}
                  <TextInput
                    maxLength={6}
                    activeOutlineColor={Colors.info}
                    mode="outlined"
                    keyboardType={'number-pad'}
                    className="bg-white mb-4 color-info"
                    onChangeText={val => handlePasswordChange('password1', val)}
                    placeholder="New PIN"
                  />
                  <TextInput
                    activeOutlineColor={Colors.info}
                    maxLength={6}
                    mode="outlined"
                    keyboardType={'number-pad'}
                    className="bg-white mb-4 color-info"
                    onChangeText={val => handlePasswordChange('password2', val)}
                    placeholder="Confirm PIN"
                  />
                </View>
                {error && (
                  <Text className="color-danger font-bold">
                    {error?.data?.details || userNameError?.data?.details}
                  </Text>
                )}
                <Button
                  loading={loading}
                  onPress={handleSubmit}
                  className={
                    valid && !userNameError
                      ? 'color-danger shadow-danger shadow-xl bg-danger'
                      : 'bg-secondary rounded-md p-1 color-primary '
                  }>
                  <Text className="color-white">{'Confirm'}</Text>
                </Button>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </Modal>
      </Portal>
    </View>
  );
};

export default memo(ChangePasswordModal);
