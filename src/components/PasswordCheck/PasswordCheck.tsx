import {Button, Text} from '@/ui';
import React, {memo, useCallback, useState} from 'react';
import {View} from 'react-native';
import {styles} from './PasswordCheck.style';
import ChangePasswordModal from '../ChangePasswordModal/ChangePasswordModal';

const PasswordCheck = () => {
  const [visible, setVisible] = useState(false);

  const handleModalToggle = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'You Have not yet set your Password'}</Text>
      <Button onPress={handleModalToggle} style={styles.button}>
        <Text style={styles.buttonText}>Set</Text>
      </Button>
      <ChangePasswordModal
        type="modal"
        isOpen={visible}
        navigation={undefined}
      />
    </View>
  );
};

export default memo(PasswordCheck);
