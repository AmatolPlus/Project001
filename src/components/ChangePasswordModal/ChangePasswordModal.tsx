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
  });
  const [valid, setValid] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const isValid = validatePassword(password);
  const [update, {error}]: any = useUpdatePasswordMutation({});
  const [updateUserName, {error: userNameError}]: any =
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
    try {
      updateUserName({
        first_name: password.first_name,
        last_name: password.last_name,
      });
    } catch (error) {}
  }, [password.first_name, password.last_name, updateUserName]);

  const handlePasswordChange = (key: string, value: string) => {
    setPassword({
      ...password,
      [key]: value,
    });
  };

  useEffect(() => {
    if (isOpen) {
      setShowPasswordModal(isOpen);
    }
  }, [isOpen]);

  useEffect(() => {
    setValid(isValid.valid);
  }, [isValid]);

  const handleSubmit = useCallback(async () => {
    if (valid) {
      setValid(false);
      try {
        handleUpdateUserName();
        let data = await update(password);
        if (!data?.error) {
          handleToggleChangePasswordModal();
          type === 'modal' && navigation.replace(ScreenNames.mainStack);
        }
      } catch (e) {}
    }
  }, [
    handleToggleChangePasswordModal,
    handleUpdateUserName,
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
            <View>
              {type === 'component' && (
                <TextInput
                  mode="outlined"
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
                      handlePasswordChange('first_name', val)
                    }
                    style={styles.input}
                    placeholder="Username"
                  />
                  <TextInput
                    mode="outlined"
                    onChangeText={val => handlePasswordChange('last_name', val)}
                    style={styles.input}
                    placeholder="Username"
                  />
                </>
              )}
              <TextInput
                mode="outlined"
                keyboardType={'number-pad'}
                onChangeText={val => handlePasswordChange('password1', val)}
                style={styles.input}
                placeholder="New Password"
              />
              <TextInput
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
              onPress={handleSubmit}
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
