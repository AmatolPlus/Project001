import React from 'react';
import {View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Button from './Button';
import Modal from './Modal';
import Text from './Text';

interface IJoinEventModal {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const JoinEventConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
}: IJoinEventModal) => {
  return (
    <Modal visible={isOpen}>
      <Text>I agree to pay </Text>
      <Text>100 </Text>
      <View>
        <Button buttonColor={Colors.success} onPress={onConfirm}>
          <Text>Confirm</Text>
        </Button>
        <Button buttonColor={Colors.danger} onPress={onClose}>
          <Text>Cancel</Text>
        </Button>
      </View>
    </Modal>
  );
};

export default JoinEventConfirmModal;
