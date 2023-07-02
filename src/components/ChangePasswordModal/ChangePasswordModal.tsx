import React, {memo, useCallback, useEffect, useState} from 'react';
import {Pressable, ToastAndroid, View} from 'react-native';
import {Portal} from 'react-native-paper';

import {Button, TextInput, Modal, Text} from '@/ui';
import {styles} from './ChangePasswordModal.styles';
import {validatePassword} from '@/utils/validatePassword';
import {Colors} from '@/utils/colors';
import {
  useUpdatePasswordMutation,
  useUpdateUserDetailsMutation,
} from '@/services/apis/login.api';
import {IChangePassword} from './ChangePasswordModal.types';
import {ScreenNames} from '@/utils/screenName';

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

  const handleUpdateUserName = useCallback(() => {
    console.log(password.profile_id);
    try {
      updateUser({
        first_name: password.first_name,
        last_name: password.last_name,
        profile_id: password.profile_id,
      });
      console.log(userNameError);
    } catch (e: any) {
      console.log(e);
    }
  }, [
    password.first_name,
    password.last_name,
    password.profile_id,
    updateUser,
    userNameError,
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
    setLoading(!loading);
    if (valid) {
      setValid(false);
      try {
        if (type === 'modal') {
          handleUpdateUserName();
        }
        let data = await update(password);
        if (data?.error) {
          ToastAndroid.show(`${data?.error?.data?.details}`, ToastAndroid.LONG);
        }
        if (!data?.error) {
          ToastAndroid.show('Password Updated Successfully', ToastAndroid.LONG);
          handleToggleChangePasswordModal();
        }

        type === 'modal' && navigation.replace(ScreenNames.mainStack);
        type === 'component' && handleToggleChangePasswordModal();
      } catch (e) {}
      setLoading(!loading);
    }
  }, [
    handleToggleChangePasswordModal,
    handleUpdateUserName,
    loading,
    navigation,
    password,
    type,
    update,
    valid,
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
          style={styles.modal}
          visible={showPasswordModal}
          onDismiss={handleToggleChangePasswordModal}>
          <View style={styles.card}>
            {type === 'component' ? (
              <Text style={styles.header}>Change Password</Text>
            ) : (
              <Text style={styles.header}>Complete Profile</Text>
            )}
            <View>
              {type === 'component' && (
                <TextInput
                  mode="outlined"
                  maxLength={6}
                  keyboardType={'number-pad'}
                  onChangeText={val =>
                    handlePasswordChange('old_password', val)
                  }
                  style={styles.input}
                  placeholder="Old Password"
                />
              )}
              {type !== 'component' && (
                <>
                  <TextInput
                    mode="outlined"
                    onChangeText={val =>
                      handlePasswordChange('profile_id', val)
                    }
                    style={styles.input}
                    placeholder="User Name"
                  />
                  <Text style={styles.info}>
                    Username should only have alphabets and , @ + - _
                  </Text>
                  <TextInput
                    mode="outlined"
                    onChangeText={val =>
                      handlePasswordChange('first_name', val)
                    }
                    style={styles.input}
                    placeholder="First Name"
                  />
                  <TextInput
                    mode="outlined"
                    onChangeText={val => handlePasswordChange('last_name', val)}
                    style={styles.input}
                    placeholder="Last Name"
                  />
                </>
              )}
              <TextInput
                maxLength={6}
                mode="outlined"
                keyboardType={'number-pad'}
                onChangeText={val => handlePasswordChange('password1', val)}
                style={styles.input}
                placeholder="New Password"
              />
              <TextInput
                maxLength={6}
                mode="outlined"
                keyboardType={'number-pad'}
                onChangeText={val => handlePasswordChange('password2', val)}
                style={styles.input}
                placeholder="Confirm Password"
              />
            </View>
            {error ||
              (userNameError && (
                <Text style={styles.error}>
                  {error?.data?.details || userNameError?.data?.details}
                </Text>
              ))}

            <Button
              loading={loading}
              onPress={valid ? handleSubmit : () => {}}
              buttonColor={valid ? Colors.success : Colors.grey}
              style={styles.updateButton}>
              <Text style={styles.updateText}>{'Confirm'}</Text>
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default memo(ChangePasswordModal);
