import React, {memo, useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Portal} from 'react-native-paper';

import {Modal, Text} from '@/ui';
import {IPasswordModal} from './PasswordModal.types';
import {styles} from './PasswordModal.styles';
import TextInput from '@/ui/TextInput';
import {validatePassword} from '@/utils/validatePassword';
import {Colors} from '@/utils/colors';
import {useUpdatePasswordMutation} from '@/services/apis/login.api';

const PasswordModal = ({visible, onClose}: IPasswordModal) => {
  const [password, setPassword] = useState({
    old_password: '',
    password1: '',
    password2: '',
  });
  const [valid, setValid] = useState(false);
  const isValid = validatePassword(password);
  const [update, {error}] = useUpdatePasswordMutation({});

  const handlePasswordChange = (key: string, value: string) => {
    setPassword({
      ...password,
      [key]: value,
    });
  };

  useEffect(() => {
    setValid(isValid.valid);
  }, [isValid]);

  const handleSubmit = useCallback(async () => {
    setValid(false);
    try {
      await update(password);
      if (!error) {
        onClose();
      }
    } catch (error) {}
  }, [error, onClose, password, update]);

  return (
    <Portal>
      <Modal style={styles.modal} visible={visible} onDismiss={onClose}>
        <View style={styles.card}>
          <View>
            <TextInput
              keyboardType={'number-pad'}
              onChangeText={val => handlePasswordChange('old_password', val)}
              style={styles.input}
              placeholder="Old Password"
            />
            <TextInput
              keyboardType={'number-pad'}
              onChangeText={val => handlePasswordChange('password1', val)}
              style={styles.input}
              placeholder="New Password"
            />
            <TextInput
              keyboardType={'number-pad'}
              onChangeText={val => handlePasswordChange('password2', val)}
              style={styles.input}
              placeholder="Confirm Password"
            />
          </View>
          {error && <Text style={styles.error}>{error?.data?.details}</Text>}

          <Button
            onPress={() => (valid ? handleSubmit() : null)}
            buttonColor={valid ? Colors.success : Colors.danger}
            style={styles.updateButton}>
            <Text style={styles.updateText}>{'Confirm'}</Text>
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default memo(PasswordModal);
